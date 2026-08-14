// casa-panel — custom panel element for panel_custom.
//
// Mounts dash_neumo.html in a same-origin iframe and bridges it to the
// real `hass` object this element receives from Home Assistant:
//   - hass.states is pushed down into the iframe on every change, throttled
//     (a HA session updates hass far more often than the UI needs to redraw).
//   - service calls and history/statistics lookups requested by the iframe
//     (via ha-backend.js) are relayed back up here, executed against the real
//     hass, and the result is posted back down.
//
// The iframe boundary exists because dash_neumo.html runs its own
// React (loaded from unpkg) which must not collide with the HA frontend's
// own React/webcomponents in the same document.

// HA serves /local/ with long cache headers, so a deploy needs an explicit
// cache-bust or browsers keep serving the stale page/module — including
// after a HACS update, which is exactly when a user is most likely to load
// a stale mix of old and new files. VERSION is the single source of truth
// for that: it threads through the iframe src below, and dash_neumo*.html
// reuses the same `v` query param to bust every script it loads in turn
// (discovery.js, config, i18n, ha-backend-*). Keep it aligned with the git
// tag on release (and with configuration.yaml's panel_custom module_url
// ?v= for manual installs — the module and the page it loads must
// cache-bust together or a stale module can point at a fresh page's
// mismatched API).
const VERSION = '1.4.0';
console.info(`[live_dashboard] v${VERSION}`);

const FLUSH_MS = 600;
const CALL_TIMEOUT_MS = 15000;

// The custom element's tag name has to be known synchronously the moment
// this module runs (it's what panel_custom.name in configuration.yaml
// must match) but it also has to be unique per install, so two copies of
// this dashboard — a live one and a side-by-side test one, say — can be
// registered in the same browser tab without customElements.define()
// throwing a "name already used" collision. Deriving it from this module's
// own folder (the same `config/www/<folder>/` the user picked when they
// copied panel.js there) solves both at once with no config to keep in
// sync: `panel_custom.name` just has to be `<folder>-panel`.
const FOLDER_NAME = new URL('.', import.meta.url).pathname.split('/').filter(Boolean).pop();
const PANEL_TAG = FOLDER_NAME + '-panel';

// Below this width the phone layout (dash_neumo_mobile.html) loads instead
// of the desktop one. Decided once at mount from the host's innerWidth (not
// the iframe's) — see connectedCallback for why it's not re-evaluated on
// resize.
const MOBILE_BREAKPOINT_PX = 820;

function toPlainStates(states) {
  const out = {};
  for (const id in states) {
    const e = states[id];
    out[id] = { state: e.state, attributes: e.attributes };
  }
  return out;
}

// --- history / statistics -------------------------------------------------
// `_today` sensors are daily counters that reset to 0 at midnight, so a
// simple average over the period is meaningless. We ask the recorder's
// long-term statistics for the daily `sum` (which accounts for resets) and
// diff consecutive days. Long-term statistics are not purged by the default
// recorder config, so this works even when raw history has already been
// purged past `recorder.purge_keep_days`. If statistics are unavailable for
// the entity (never generated), we fall back to the last raw sample of each
// calendar day from history/history_during_period.

// Local calendar day, not UTC: these "_today" counters reset at local
// midnight, and bucketing by UTC day would catch the wrong end of the cycle
// whenever the browser's timezone offset isn't a multiple of 24h (e.g. CEST).
function isoDay(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

async function fetchDailyCounterHistory(hass, entityId, days) {
  const end = new Date();
  const start = new Date(end.getTime() - (days + 1) * 86400000);

  // The entity's own raw state at the end of a day already IS that day's
  // total (it resets to 0 at midnight on the source side), so it needs no
  // diffing. Prefer it over the statistics-based diff below: some cloud-
  // scraped sources (e.g. FusionSolar) occasionally report a value slightly
  // lower than the previous poll due to server-side lag, which the recorder
  // mistakes for a meter reset and "sum" then wrongly restarts accumulating
  // from that dip, undercounting the day. Raw history isn't affected by that
  // since it's just the last recorded sample, not a running total.
  const raw = await fetchDailyLastSample(hass, entityId, days, start, end);

  let statsDeltas = null;
  try {
    const stats = await hass.callWS({
      type: 'recorder/statistics_during_period',
      start_time: start.toISOString(),
      end_time: end.toISOString(),
      statistic_ids: [entityId],
      period: 'day',
      types: ['sum']
    });
    const rows = (stats && stats[entityId]) || [];
    if (rows.length >= 2) {
      const deltas = [];
      for (let i = 1; i < rows.length; i++) {
        const a = rows[i - 1].sum;
        const b = rows[i].sum;
        deltas.push(a != null && b != null ? Math.max(0, b - a) : null);
      }
      if (deltas.some((v) => v != null)) {
        statsDeltas = deltas.slice(-days);
        while (statsDeltas.length < days) statsDeltas.unshift(null);
      }
    }
  } catch (e) {
    console.warn('[casa-panel] statistics_during_period failed for', entityId, e);
  }

  // Raw history is purged after `recorder.purge_keep_days` (10 by default),
  // so it only covers the most recent days; long-term statistics fill in
  // whatever is older than that.
  const out = raw.map((v, i) => (v != null ? v : statsDeltas ? statsDeltas[i] : null));

  let prev = 0;
  return out.map((v) => {
    if (v != null && !isNaN(v)) { prev = v; return prev; }
    return prev;
  });
}

async function fetchDailyLastSample(hass, entityId, days, start, end) {
  const hist = await hass.callWS({
    type: 'history/history_during_period',
    start_time: start.toISOString(),
    end_time: end.toISOString(),
    entity_ids: [entityId],
    minimal_response: true,
    no_attributes: true,
    significant_changes_only: false
  });
  const rows = (hist && hist[entityId]) || [];
  const byDay = new Map();
  for (const r of rows) {
    const v = parseFloat(r.s !== undefined ? r.s : r.state);
    if (isNaN(v)) continue;
    const tsRaw = r.lu !== undefined ? r.lu * 1000 : (r.last_updated ? Date.parse(r.last_updated) : null);
    if (tsRaw == null) continue;
    byDay.set(isoDay(new Date(tsRaw)), v);
  }
  // i=0 is today (callers treat the last array entry as "today", e.g. to
  // label bars): the window is the last `days` calendar days ending today,
  // not ending yesterday.
  const out = [];
  for (let i = days - 1; i >= 0; i--) {
    const day = isoDay(new Date(end.getTime() - i * 86400000));
    out.push(byDay.has(day) ? byDay.get(day) : null);
  }
  return out;
}

async function fetchRawHistory(hass, entityId, hours) {
  const end = new Date();
  const start = new Date(end.getTime() - hours * 3600000);
  const hist = await hass.callWS({
    type: 'history/history_during_period',
    start_time: start.toISOString(),
    end_time: end.toISOString(),
    entity_ids: [entityId],
    minimal_response: true,
    no_attributes: true,
    significant_changes_only: false
  });
  const rows = (hist && hist[entityId]) || [];
  const out = [];
  for (const r of rows) {
    const v = parseFloat(r.s !== undefined ? r.s : r.state);
    if (!isNaN(v)) out.push(v);
  }
  const MAX_POINTS = 200;
  if (out.length <= MAX_POINTS) return out;
  const step = out.length / MAX_POINTS;
  const sampled = [];
  for (let i = 0; i < MAX_POINTS; i++) sampled.push(out[Math.floor(i * step)]);
  return sampled;
}

const DAILY_COUNTER_RE = /_today$|lettura_giornaliera/;

async function fetchHistory(hass, entityId, points) {
  if (DAILY_COUNTER_RE.test(entityId)) {
    return fetchDailyCounterHistory(hass, entityId, Math.max(1, points || 30));
  }
  return fetchRawHistory(hass, entityId, Math.max(1, points || 48));
}

// Today's delta for an entity sourced from HA's own Energy dashboard prefs
// or found by device_class/state_class auto-discovery (see discovery.js).
// Unlike an explicit config.js `*Today` field — which is assumed to be a
// sensor whose live *state* already equals today's running total, read
// directly with no fetch at all — these are always the Energy dashboard's
// own lifetime-cumulative statistics sensors. Reading their raw state would
// return the lifetime total, not today's share of it, so this always goes
// through the statistics `sum` diff (the same technique
// fetchDailyCounterHistory falls back to), never the raw-last-sample path.
async function fetchTodayStatsDelta(hass, entityId) {
  const end = new Date();
  const start = new Date(end.getTime() - 2 * 86400000);
  const stats = await hass.callWS({
    type: 'recorder/statistics_during_period',
    start_time: start.toISOString(),
    end_time: end.toISOString(),
    statistic_ids: [entityId],
    period: 'day',
    types: ['sum']
  });
  const rows = (stats && stats[entityId]) || [];
  if (rows.length < 2) return null;
  const a = rows[rows.length - 2].sum;
  const b = rows[rows.length - 1].sum;
  return a != null && b != null ? Math.max(0, b - a) : null;
}

// --- element ----------------------------------------------------------------

class CasaPanel extends HTMLElement {
  constructor() {
    super();
    this._hass = null;
    this._iframe = null;
    this._ready = false;
    this._timer = null;
    this._lastFlush = 0;
    this._onMessage = this._onMessage.bind(this);
  }

  connectedCallback() {
    if (this._iframe) return;
    CasaPanel._connected = true;
    // ha-panel-custom appends this element with no explicit height on any
    // ancestor, so height:100% has nothing to resolve against, and 100vh
    // overshoots below the HA toolbar. Anchor the host to the panel area
    // itself with position:absolute + inset 0 (no shadow root here, so this
    // goes on the element directly rather than :host) — then height:100% on
    // the iframe has a real box to fill, without guessing the toolbar height.
    this.style.cssText = 'display:block;position:absolute;top:0;left:0;right:0;bottom:0;';
    const iframe = document.createElement('iframe');
    iframe.title = 'Casa';
    iframe.style.cssText = 'border:0;width:100%;height:100%;display:block;position:relative;z-index:0;';
    // Decided once here, from the host window's width, not the iframe's —
    // re-checking on resize (e.g. on-screen keyboard, iOS rotation) would
    // reload the iframe mid-session and drop whatever state the user is in.
    const page = window.innerWidth < MOBILE_BREAKPOINT_PX ? 'dash_neumo_mobile.html' : 'dash_neumo.html';
    iframe.src = new URL(`./${page}?v=${VERSION}`, import.meta.url).href;
    this._iframe = iframe;
    this._targetOrigin = window.location.origin;
    this.appendChild(iframe);

    // This panel is edge-to-edge with no HA toolbar above it, so if the
    // user's profile has the sidebar set to always-hidden there is normally
    // no hamburger left anywhere to get it back. Provide one here that fires
    // HA's own public "hass-toggle-menu" event (bubbles + composed, the same
    // way HA's built-in menu button and third-party cards trigger it) so the
    // sidebar opens as a temporary overlay regardless of the docked state.
    const menuButton = document.createElement('button');
    menuButton.type = 'button';
    menuButton.title = 'Apri menu';
    menuButton.setAttribute('aria-label', 'Apri menu');
    menuButton.style.cssText = 'position:absolute;top:12px;left:12px;z-index:2147483647;width:40px;height:40px;border:0;border-radius:50%;background:rgba(0,0,0,.35);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;pointer-events:auto;';
    menuButton.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z"/></svg>';
    menuButton.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('hass-toggle-menu', { bubbles: true, composed: true }));
    });
    this.appendChild(menuButton);

    window.addEventListener('message', this._onMessage);
  }

  disconnectedCallback() {
    window.removeEventListener('message', this._onMessage);
    if (this._timer) { clearTimeout(this._timer); this._timer = null; }
  }

  set hass(hass) {
    this._hass = hass;
    this._schedule();
  }
  get hass() { return this._hass; }

  // Required by the panel_custom contract; unused here.
  set panel(v) { this._panel = v; }
  get panel() { return this._panel; }
  set narrow(v) { this._narrow = v; }
  set route(v) { this._route = v; }

  _schedule() {
    if (!this._ready) return;
    const now = Date.now();
    const elapsed = now - this._lastFlush;
    if (elapsed >= FLUSH_MS) {
      this._flush();
    } else if (!this._timer) {
      this._timer = setTimeout(() => { this._timer = null; this._flush(); }, FLUSH_MS - elapsed);
    }
  }

  _flush() {
    this._lastFlush = Date.now();
    if (!this._hass || !this._iframe) return;
    this._iframe.contentWindow.postMessage(
      { type: 'casa:hass-states', states: toPlainStates(this._hass.states), language: this._hass.language },
      this._targetOrigin
    );
  }

  _reply(id, type, payload) {
    if (!this._iframe) return;
    this._iframe.contentWindow.postMessage(
      Object.assign({ type, id }, payload), this._targetOrigin
    );
  }

  async _handleCall(msg) {
    if (!this._hass) {
      this._reply(msg.id, 'casa:call-result', { ok: false, error: 'hass not ready' });
      return;
    }
    try {
      await this._hass.callService(msg.domain, msg.service, msg.data || {});
      this._reply(msg.id, 'casa:call-result', { ok: true });
    } catch (e) {
      this._reply(msg.id, 'casa:call-result', { ok: false, error: (e && e.message) || String(e) });
    }
  }

  async _handleHistory(msg) {
    if (!this._hass) {
      this._reply(msg.id, 'casa:history-result', { ok: false, error: 'hass not ready' });
      return;
    }
    try {
      const result = await fetchHistory(this._hass, msg.entity_id, msg.points);
      this._reply(msg.id, 'casa:history-result', { ok: true, result });
    } catch (e) {
      this._reply(msg.id, 'casa:history-result', { ok: false, error: (e && e.message) || String(e) });
    }
  }

  // Auto-discovery (dash_neumo*.html / discovery.js) needs the area/device/
  // entity registries, not just states — states alone don't carry area
  // membership. Registries change rarely within a session (adding a device,
  // renaming an area), so one fetch per panel load is cached and reused
  // rather than re-fetched on every request from the iframe.
  async _handleRegistries(msg) {
    if (!this._hass) {
      this._reply(msg.id, 'casa:registries-result', { ok: false, error: 'hass not ready' });
      return;
    }
    try {
      if (!this._registriesPromise) {
        this._registriesPromise = Promise.all([
          this._hass.callWS({ type: 'config/area_registry/list' }),
          this._hass.callWS({ type: 'config/device_registry/list' }),
          this._hass.callWS({ type: 'config/entity_registry/list' })
        ]).then(([areas, devices, entities]) => ({ areas, devices, entities }));
        this._registriesPromise.catch(() => { this._registriesPromise = null; });
      }
      const result = await this._registriesPromise;
      this._reply(msg.id, 'casa:registries-result', { ok: true, result });
    } catch (e) {
      this._registriesPromise = null;
      this._reply(msg.id, 'casa:registries-result', { ok: false, error: (e && e.message) || String(e) });
    }
  }

  // Home Assistant's own Energy dashboard config (config/energy panel) —
  // when the user has already mapped their solar/grid sensors there, the
  // Fotovoltaico ring reuses that instead of asking for it again in
  // config.js. Cached the same way as registries: it's a per-session config
  // read, not live telemetry, and doesn't need re-fetching on every request.
  async _handleEnergyPrefs(msg) {
    if (!this._hass) {
      this._reply(msg.id, 'casa:energy-prefs-result', { ok: false, error: 'hass not ready' });
      return;
    }
    try {
      if (!this._energyPrefsPromise) {
        this._energyPrefsPromise = this._hass.callWS({ type: 'energy/get_prefs' });
        this._energyPrefsPromise.catch(() => { this._energyPrefsPromise = null; });
      }
      const result = await this._energyPrefsPromise;
      this._reply(msg.id, 'casa:energy-prefs-result', { ok: true, result });
    } catch (e) {
      // Not an error worth logging: this throws whenever the installation
      // has no Energy dashboard configured at all, which is a normal,
      // common case (falls through to auto-discovery, then to no ring).
      this._energyPrefsPromise = null;
      this._reply(msg.id, 'casa:energy-prefs-result', { ok: false, error: (e && e.message) || String(e) });
    }
  }

  async _handleEnergyToday(msg) {
    if (!this._hass) {
      this._reply(msg.id, 'casa:energy-today-result', { ok: false, error: 'hass not ready' });
      return;
    }
    try {
      const result = await fetchTodayStatsDelta(this._hass, msg.entity_id);
      this._reply(msg.id, 'casa:energy-today-result', { ok: true, result });
    } catch (e) {
      this._reply(msg.id, 'casa:energy-today-result', { ok: false, error: (e && e.message) || String(e) });
    }
  }

  _onMessage(e) {
    if (!this._iframe || e.source !== this._iframe.contentWindow) return;
    const d = e.data;
    if (!d || typeof d !== 'object') return;
    if (d.type === 'casa:ready') {
      this._ready = true;
      this._flush();
    } else if (d.type === 'casa:call') {
      this._handleCall(d);
    } else if (d.type === 'casa:history') {
      this._handleHistory(d);
    } else if (d.type === 'casa:registries') {
      this._handleRegistries(d);
    } else if (d.type === 'casa:energy-prefs') {
      this._handleEnergyPrefs(d);
    } else if (d.type === 'casa:energy-today') {
      this._handleEnergyToday(d);
    }
  }
}

customElements.define(PANEL_TAG, CasaPanel);

// Self-diagnosis for the single most common install mistake: `name:` in
// panel_custom not matching PANEL_TAG. When that happens, Home Assistant
// creates a DOM element under a tag nothing here has defined — connected-
// Callback above never runs at all, so nothing inside the class could ever
// report the problem. This has to live here instead: module scope, checked
// against a flag connectedCallback sets on success, on a timer. Loading
// module_url itself doesn't depend on name: matching (that's a separate
// step HA does after), so this code always runs even when the mismatch is
// exactly what's wrong — turning a blank/black panel with an empty console
// into a message that names the fix.
setTimeout(() => {
  if (CasaPanel._connected) return;
  const msg = `[live_dashboard] nessun <${PANEL_TAG}> istanziato dopo 2s — ` +
    `verifica che name: in panel_custom sia esattamente "${PANEL_TAG}" ` +
    `(cartella rilevata: ${FOLDER_NAME})`;
  console.error(msg);
  try {
    const banner = document.createElement('div');
    banner.textContent = msg;
    banner.style.cssText = 'position:fixed;top:16px;left:16px;z-index:2147483647;max-width:min(520px,calc(100vw - 32px));background:#a83e2b;color:#fff;font:600 13px/1.5 system-ui,sans-serif;padding:14px 16px;border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,.35);white-space:pre-line';
    document.body.appendChild(banner);
  } catch (e) { /* document.body not ready — the console.error above still ran */ }
}, 2000);

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
// React (vendored in ./vendor/ since v1.9.0) which must not collide with the HA frontend's
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
const VERSION = '2.0.0';
console.info(`[live_dashboard] v${VERSION}`);

async function resolveAssetVersion() {
  try {
    const r = await fetch(new URL('./version.json', import.meta.url).href, { cache: 'no-store' });
    if (r.ok) {
      const j = await r.json();
      if (j && typeof j.version === 'string' && j.version) return j.version;
    }
  } catch (e) { /* missing or unreadable: fall back to this module's VERSION */ }
  return VERSION;
}

// v2 — what the iframe may ask HA for through the generic bridge (see
// _handleWs/_handleSubscribe): the camera WebRTC handshake, nothing else.
const WS_ALLOWED = new Set(['camera/capabilities', 'camera/webrtc/get_client_config', 'camera/webrtc/candidate',
  'live_dashboard/config/get', 'live_dashboard/config/set']);
const SUB_ALLOWED = new Set(['camera/webrtc/offer']);

const FLUSH_MS = 600;
// v1.9.0 — after the first full snapshot only changed entities cross the
// iframe boundary (see _flush). A full snapshot is still re-sent this
// often, as a safety net against anything the reference diff could miss.
const FULL_RESYNC_MS = 5 * 60 * 1000;
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
// v2 — when this file runs from a www/ subfolder (a 2.0 release zip that
// HACS extracted as a 1.x *Dashboard*, loaded through the zip's top-level
// panel.js bridge), the element is still named after the folder above it,
// so the 1.x panel_custom `name: live_dashboard-panel` keeps matching.
const PATH_PARTS = new URL('.', import.meta.url).pathname.split('/').filter(Boolean);
const FOLDER_NAME = PATH_PARTS[PATH_PARTS.length - 1] === 'www' && PATH_PARTS.length > 1
  ? PATH_PARTS[PATH_PARTS.length - 2] : PATH_PARTS[PATH_PARTS.length - 1];
// 1.x HACS Dashboard install updated to 2.0: served from /local/community/.
// Supported (it keeps working) but shown as "to migrate" in the dashboard.
const LEGACY_HACS_DASHBOARD = /\/(community|hacsfiles)\//.test(new URL('.', import.meta.url).pathname);
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
  const now = new Date();
  // Anchored to local midnight (yesterday's, so the window always spans a
  // full yesterday-bucket plus today's-so-far bucket) rather than a raw
  // "48 hours ago" offset — a day/DST boundary can otherwise land the start
  // time mid-bucket and leave `rows` one entry short of the two this needs.
  const localMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const start = new Date(localMidnight.getTime() - 86400000);
  const stats = await hass.callWS({
    type: 'recorder/statistics_during_period',
    start_time: start.toISOString(),
    end_time: now.toISOString(),
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

// Hourly deltas for the last 24 hours (v1.8.0's ring strip), for whichever
// role statistic_ids are passed — same 'sum'-diff technique as the two
// functions above, just bucketed by hour instead of day, and merging
// multiple ids per role (a role can legitimately have more than one
// contributing sensor, same as _resolveEnergyDaily's sumToday). One extra
// bucket is fetched (25h window) so the oldest included hour still has a
// prior sum to diff against — without it the first real hour would come
// back null instead of a value.
async function fetchHourlyEnergy(hass, idsByRole) {
  const allIds = Array.from(new Set(
    [].concat(idsByRole.production || [], idsByRole.gridImport || [], idsByRole.gridExport || [], idsByRole.consumption || [])
  ));
  if (!allIds.length) return null;
  const end = new Date();
  const start = new Date(end.getTime() - 25 * 3600000);
  const stats = await hass.callWS({
    type: 'recorder/statistics_during_period',
    start_time: start.toISOString(),
    end_time: end.toISOString(),
    statistic_ids: allIds,
    period: 'hour',
    types: ['sum']
  });
  const roleDeltas = (ids) => {
    if (!ids || !ids.length) return null;
    const byHour = new Map();
    for (const id of ids) {
      const rows = (stats && stats[id]) || [];
      for (const r of rows) {
        if (r.sum == null) continue;
        byHour.set(r.start, (byHour.get(r.start) || 0) + r.sum);
      }
    }
    const keys = Array.from(byHour.keys()).sort();
    if (keys.length < 2) return null;
    const out = new Map();
    for (let i = 1; i < keys.length; i++) {
      const a = byHour.get(keys[i - 1]), b = byHour.get(keys[i]);
      out.set(keys[i], Math.max(0, b - a));
    }
    return out;
  };
  const production = roleDeltas(idsByRole.production);
  const gridImport = roleDeltas(idsByRole.gridImport);
  const gridExport = roleDeltas(idsByRole.gridExport);
  const consumption = roleDeltas(idsByRole.consumption);
  if (!production && !gridImport) return null;
  const allHours = new Set();
  [production, gridImport, gridExport, consumption].forEach((m) => { if (m) for (const k of m.keys()) allHours.add(k); });
  const sortedHours = Array.from(allHours).sort().slice(-24);
  if (!sortedHours.length) return null;
  return sortedHours.map((hourStart) => ({
    hourStart,
    production: production ? (production.has(hourStart) ? production.get(hourStart) : null) : null,
    gridImport: gridImport ? (gridImport.has(hourStart) ? gridImport.get(hourStart) : null) : null,
    gridExport: gridExport ? (gridExport.has(hourStart) ? gridExport.get(hourStart) : null) : null,
    consumption: consumption ? (consumption.has(hourStart) ? consumption.get(hourStart) : null) : null
  }));
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
    // entity_id -> the hass.states object last posted to the iframe. null
    // means "next flush is a full snapshot" (first one, or after the iframe
    // (re)announced itself with casa:ready).
    this._sentRefs = null;
    this._lastFull = 0;
    this._sentLanguage = null;
    this._subs = new Map(); // iframe subscription id -> HA unsubscribe promise
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
    this._iframe = iframe;
    // v2 — the page's ?v= comes from version.json, fetched past the cache,
    // not from this module's own VERSION: Home Assistant serves /local/ with
    // a 31-day cache and this module is pinned by panel_custom's module_url,
    // so a new release of the pages (the part that changes) reaches every
    // tablet on its next load without editing configuration.yaml or
    // restarting HA. VERSION stays as the fallback when version.json can't
    // be read.
    resolveAssetVersion().then((v) => {
      if (this._iframe === iframe) iframe.src = new URL(`./${page}?v=${encodeURIComponent(v)}`, import.meta.url).href;
    });
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
    this._closeAllSubs();
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

  // v1.9.0 — differential push. Home Assistant replaces an entity's object
  // in hass.states when that entity changes and keeps the same object when
  // it doesn't, so comparing references finds exactly what changed without
  // reading a single attribute. Before this, every flush structured-cloned
  // the whole hass.states (hundreds to thousands of entities, attributes
  // included) into the iframe every 600 ms, and re-rendered the dashboard
  // even when the hass update was about something it never shows. Now an
  // update that touches nothing posts nothing, and one that touches a light
  // posts one light.
  _flush() {
    this._lastFlush = Date.now();
    if (!this._hass || !this._iframe) return;
    const states = this._hass.states;
    const language = this._hass.language;
    const embedIframe = window.self !== window.top;
    // v2 — how this panel was installed: the integration registers it with
    // config.install = 'integration'; a hand-written panel_custom block has
    // no such key. Shown in Diagnostica -> Environment.
    const install = (this._panel && this._panel.config && this._panel.config.install)
      || (LEGACY_HACS_DASHBOARD ? 'hacs_dashboard' : 'panel_custom');
    // v2 — the shared configuration (integration) can only be written by an
    // administrator: the dashboard needs to know who's looking.
    const u = this._hass.user;
    const user = u ? { isAdmin: !!u.is_admin, name: u.name || '' } : null;
    if (this._sentRefs && this._lastFlush - this._lastFull < FULL_RESYNC_MS) {
      const changed = {};
      const removed = [];
      let n = 0;
      for (const id in states) {
        if (this._sentRefs.get(id) !== states[id]) {
          const e = states[id];
          changed[id] = { state: e.state, attributes: e.attributes };
          this._sentRefs.set(id, e);
          n++;
        }
      }
      for (const id of this._sentRefs.keys()) {
        if (!(id in states)) { removed.push(id); this._sentRefs.delete(id); }
      }
      if (!n && !removed.length && language === this._sentLanguage) return;
      this._sentLanguage = language;
      this._iframe.contentWindow.postMessage(
        { type: 'casa:hass-states-delta', changed, removed, language, embedIframe, install, user },
        this._targetOrigin
      );
      return;
    }
    this._sentRefs = new Map();
    for (const id in states) this._sentRefs.set(id, states[id]);
    this._lastFull = this._lastFlush;
    this._sentLanguage = language;
    this._iframe.contentWindow.postMessage(
      {
        type: 'casa:hass-states', states: toPlainStates(states), language,
        // v1.8.1 — whether *this* custom element (not the dash_neumo*.html
        // iframe it mounts, which is always nested by construction) is
        // itself running inside a frame, i.e. whether panel_custom's own
        // `embed_iframe: true` (see README) actually took effect for this
        // install. A support-issue-shaped question ("is embed_iframe on?")
        // that the Diagnostica panel can answer without the user reading
        // their own configuration.yaml.
        embedIframe, install, user
      },
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

  async _handleEnergyHourly(msg) {
    if (!this._hass) {
      this._reply(msg.id, 'casa:energy-hourly-result', { ok: false, error: 'hass not ready' });
      return;
    }
    try {
      const result = await fetchHourlyEnergy(this._hass, msg.ids || {});
      this._reply(msg.id, 'casa:energy-hourly-result', { ok: true, result });
    } catch (e) {
      this._reply(msg.id, 'casa:energy-hourly-result', { ok: false, error: (e && e.message) || String(e) });
    }
  }

  // frontend/get_user_data returns { value } (null if the key was never
  // set) rather than the value directly — HA's own convention for this
  // websocket command, unlike callWS results elsewhere in this file that
  // return their payload bare.
  async _handleUserDataGet(msg) {
    if (!this._hass) {
      this._reply(msg.id, 'casa:user-data-get-result', { ok: false, error: 'hass not ready' });
      return;
    }
    try {
      // v1.8.1: key is caller-supplied (irrigation end-times use a key
      // separate from prefs' 'live_dashboard') — default kept for callers
      // still on the pre-v1.8.1 no-arg contract.
      const result = await this._hass.callWS({ type: 'frontend/get_user_data', key: msg.key || 'live_dashboard' });
      this._reply(msg.id, 'casa:user-data-get-result', { ok: true, result: (result && result.value) || null });
    } catch (e) {
      this._reply(msg.id, 'casa:user-data-get-result', { ok: false, error: (e && e.message) || String(e) });
    }
  }

  async _handleUserDataSet(msg) {
    if (!this._hass) {
      this._reply(msg.id, 'casa:user-data-set-result', { ok: false, error: 'hass not ready' });
      return;
    }
    try {
      await this._hass.callWS({ type: 'frontend/set_user_data', key: msg.key || 'live_dashboard', value: msg.value });
      this._reply(msg.id, 'casa:user-data-set-result', { ok: true });
    } catch (e) {
      this._reply(msg.id, 'casa:user-data-set-result', { ok: false, error: (e && e.message) || String(e) });
    }
  }

  // v1.5.4: the live-camera fix. camera/stream is the only websocket command
  // that knows how to turn ANY camera integration (RTSP/ONVIF/generic — the
  // majority of the installed base, none of which serve MJPEG) into a
  // playable URL, by asking HA's own `stream` component to repackage it as
  // HLS. Callers (dash_neumo*.html) treat a rejection here as a normal,
  // silent "fall back to snapshot polling" signal, not an error to surface —
  // see this file's fetchDailyCounterHistory for the same "no Energy
  // dashboard configured" reasoning applied to a different optional feature.
  async _handleCameraStream(msg) {
    if (!this._hass) {
      this._reply(msg.id, 'casa:camera-stream-result', { ok: false, error: 'hass not ready' });
      return;
    }
    try {
      const result = await this._hass.callWS({ type: 'camera/stream', entity_id: msg.entity_id, format: 'hls' });
      this._reply(msg.id, 'casa:camera-stream-result', { ok: true, result });
    } catch (e) {
      this._reply(msg.id, 'casa:camera-stream-result', { ok: false, error: (e && e.message) || String(e) });
    }
  }

  // v2 — generic Home Assistant WS bridge, for the camera WebRTC layer.
  // One-shot commands and subscriptions are relayed for an explicit list of
  // types only: the iframe is same-origin, so this isn't a security
  // boundary, but it keeps what the dashboard can ask HA for written down
  // in one place.
  async _handleWs(msg) {
    const req = msg.msg || {};
    if (!this._hass || !WS_ALLOWED.has(req.type)) {
      this._reply(msg.id, 'casa:ws-result', { ok: false, error: !this._hass ? 'hass not ready' : 'ws type not allowed: ' + req.type });
      return;
    }
    try {
      const result = await this._hass.callWS(req);
      this._reply(msg.id, 'casa:ws-result', { ok: true, result });
    } catch (e) {
      this._reply(msg.id, 'casa:ws-result', { ok: false, error: (e && e.message) || String(e) });
    }
  }

  // Each event HA sends on the subscription is posted to the iframe as it
  // arrives ('casa:sub-event'); a failure to subscribe is posted the same
  // way with `error` set, so the iframe has one place to listen.
  _handleSubscribe(msg) {
    const req = msg.msg || {};
    const post = (payload) => {
      if (this._iframe) this._iframe.contentWindow.postMessage(Object.assign({ type: 'casa:sub-event', id: msg.id }, payload), this._targetOrigin);
    };
    if (!this._hass || !SUB_ALLOWED.has(req.type)) {
      post({ error: !this._hass ? 'hass not ready' : 'subscription type not allowed: ' + req.type });
      return;
    }
    const unsub = this._hass.connection.subscribeMessage((event) => post({ event }), req);
    this._subs.set(msg.id, unsub);
    unsub.catch((e) => {
      this._subs.delete(msg.id);
      post({ error: (e && e.message) || String(e) });
    });
  }

  _handleUnsubscribe(msg) {
    const unsub = this._subs.get(msg.id);
    this._subs.delete(msg.id);
    if (unsub) unsub.then((fn) => fn(), () => {});
  }

  _closeAllSubs() {
    for (const unsub of this._subs.values()) unsub.then((fn) => fn(), () => {});
    this._subs.clear();
  }

  _onMessage(e) {
    if (!this._iframe || e.source !== this._iframe.contentWindow) return;
    const d = e.data;
    if (!d || typeof d !== 'object') return;
    if (d.type === 'casa:ready') {
      this._ready = true;
      this._sentRefs = null; // a (re)loaded iframe has no copy to patch: send everything
      this._closeAllSubs(); // nobody is listening to a previous page's subscriptions
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
    } else if (d.type === 'casa:energy-hourly') {
      this._handleEnergyHourly(d);
    } else if (d.type === 'casa:user-data-get') {
      this._handleUserDataGet(d);
    } else if (d.type === 'casa:user-data-set') {
      this._handleUserDataSet(d);
    } else if (d.type === 'casa:camera-stream') {
      this._handleCameraStream(d);
    } else if (d.type === 'casa:ws') {
      this._handleWs(d);
    } else if (d.type === 'casa:subscribe') {
      this._handleSubscribe(d);
    } else if (d.type === 'casa:unsubscribe') {
      this._handleUnsubscribe(d);
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

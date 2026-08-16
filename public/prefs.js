// prefs.js — per-user settings-panel overrides (v1.5.0): persistence and
// export-text generation. Visibility *resolution* (what's actually hidden,
// given config.js + these overrides) lives in discovery.js — this file only
// knows how to read/write the raw preferences object and turn it into a
// pasteable config.js snippet. No HA registry/entity knowledge here.
//
// Storage: Home Assistant's own per-user store
// (frontend/get_user_data / set_user_data, key 'live_dashboard') is the
// primary target — it follows the user between the wall tablet and their
// phone. It's reached through the same 3-hop postMessage relay every other
// HA call in this app uses (see ha-backend-panel.js / panel.js), so it's
// simply two more methods on the `backend` object callers already have.
// Demo mode's backend doesn't implement those two methods at all, and any
// real-HA failure (older HA, no permission) throws — both cases fall
// through to the same localStorage branch below, so demo mode gets its
// required "must work from file://" behavior for free, with no special
// casing anywhere in this file.
//
// Classic script, not an ES module — see the note at the top of
// discovery.js for why (dynamic import() breaks demo mode under file://).
(function () {

const STORAGE_KEY = 'live_dashboard_prefs';
const USER_DATA_KEY = 'live_dashboard';

const DEFAULT_PREFS = { v: 1 };

function readLocal() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return Object.assign({}, DEFAULT_PREFS);
    const parsed = JSON.parse(raw);
    // A prefs object from a future/unrecognized version, or corrupted
    // storage, degrades to defaults rather than crashing the boot — same
    // "never fail loud on stored user data" spirit as mergeConfig() does
    // for a broken config.js.
    if (!parsed || typeof parsed !== 'object' || parsed.v !== 1) return Object.assign({}, DEFAULT_PREFS);
    return parsed;
  } catch (e) {
    return Object.assign({}, DEFAULT_PREFS);
  }
}

function writeLocal(prefs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    return true;
  } catch (e) {
    // Private browsing / storage quota — nothing more this layer can do;
    // the caller's UI is responsible for telling the user saving failed.
    return false;
  }
}

async function load(backend) {
  if (backend && backend.userDataGet) {
    try {
      const value = await backend.userDataGet();
      if (value && typeof value === 'object' && value.v === 1) return { prefs: value, storage: 'hass' };
      if (value == null) return { prefs: Object.assign({}, DEFAULT_PREFS), storage: 'hass' };
      // Unrecognized shape from the user's HA account — fall through to
      // localStorage rather than trust it, same reasoning as readLocal().
    } catch (e) {
      console.warn('[casa] frontend/get_user_data unavailable, falling back to localStorage:', e.message || e);
    }
  }
  return { prefs: readLocal(), storage: 'local' };
}

async function save(backend, prefs) {
  if (backend && backend.userDataSet) {
    try {
      await backend.userDataSet(prefs);
      return 'hass';
    } catch (e) {
      console.warn('[casa] frontend/set_user_data failed, falling back to localStorage:', e.message || e);
    }
  }
  writeLocal(prefs);
  return 'local';
}

// A valid, re-loadable config.js — comments are nice-to-have, not the bar;
// round-tripping through discoverRooms/discoverCameras unchanged is.
function exportText(cfg, prefs, known) {
  const resolved = window.CasaDiscovery.buildExportedConfig(cfg, prefs, known);
  const body = JSON.stringify(resolved, null, 2);
  return `window.CASA_CONFIG = ${body};\n`;
}

// Plain-text serialization for the Diagnostica panel's "Copia diagnostica"
// button (v1.5.1) — lives here, not in dash_neumo*.html, because both
// template files already load this file as a shared script and each would
// otherwise duplicate the exact same formatting logic. Callers do all the
// i18n (`t()`) themselves and pass in already-resolved label strings — this
// function only lays them out, so it stays language-agnostic like the rest
// of this file.
function padCol(s, w) { s = String(s == null ? '' : s); return s.length >= w ? s + '  ' : s + ' '.repeat(w - s.length); }

function diagRowLine(cols, widths) {
  return cols.map((c, i) => i === cols.length - 1 ? c : padCol(c, widths[i])).join('');
}

function diagText(d) {
  const lines = [];
  lines.push(d.configHeading, d.configSummary);
  d.configAttempts.forEach((a) => lines.push('  ' + diagRowLine([a.pathLabel, a.verdictLabel], [40])));
  if (d.configOutsideIframeNote) lines.push(d.configOutsideIframeNote);
  lines.push('');

  lines.push(d.instantHeading);
  d.instantRows.forEach((r) => {
    lines.push(diagRowLine([r.roleLabel, r.idLabel, r.valueLabel, r.verdictLabel], [14, 34, 14]));
    if (r.unitWarnLabel) lines.push('  ⚠ ' + r.unitWarnLabel);
  });
  lines.push('');

  lines.push(d.dailyHeading);
  if (d.dailyPrefsFailedNote) lines.push(d.dailyPrefsFailedNote);
  d.dailyRows.forEach((r) => {
    lines.push(diagRowLine([r.roleLabel, r.sourceLabel, r.idsLabel, r.valueLabel], [14, 34, 34]));
    if (r.counterWarnLabel) lines.push('  ⚠ ' + r.counterWarnLabel);
  });
  lines.push('');

  lines.push(d.envHeading);
  d.envRows.forEach((r) => lines.push('  ' + padCol(r.label, 28) + r.value));

  return lines.join('\n') + '\n';
}

// Resolves true only on an actual successful copy — a caller must still
// have a `<textarea readonly>` fallback ready for `false`/rejection
// (insecure context over plain HTTP, permission denied, or the API simply
// not existing), per the spec's "never fail to just showing the text".
async function copyToClipboard(text) {
  try {
    if (!navigator.clipboard || !navigator.clipboard.writeText) return false;
    await navigator.clipboard.writeText(text);
    return true;
  } catch (e) {
    return false;
  }
}

window.CasaPrefs = { DEFAULT_PREFS, USER_DATA_KEY, load, save, exportText, diagText, copyToClipboard };

})();

// ===========================================================================
//  HA BACKEND — PANEL (panel_custom) IMPLEMENTATION
//
//  CONTRACT
//    export const BACKEND_KIND: string
//    export async function connect(handlers, readyTimeoutMs) -> backend
//    backend.call(domain, service, data) -> Promise<void>
//    backend.history(entity_id, points) -> Promise<number[]>   oldest -> newest
//    backend.registries() -> Promise<{ areas, devices, entities }>
//    backend.energyPrefs() -> Promise<object|null>   raw energy/get_prefs response
//    backend.energyToday(entity_id) -> Promise<number|null>   today's stats delta
//    backend.close() -> void
//
//  This file runs INSIDE the iframe that panel.js (the casa-panel custom
//  element) mounts, in its own window/realm — it has no direct reference to
//  the real `hass` object, which lives in the parent document. Every call is
//  therefore relayed to the parent via postMessage and awaited there:
//    connect()      waits for the first 'casa:hass-states' message
//    call()         posts 'casa:call'          -> parent runs hass.callService(...)
//    history()      posts 'casa:history'       -> parent runs hass.callWS(...)
//    registries()   posts 'casa:registries'    -> parent runs hass.callWS(...) x3
//    energyPrefs()  posts 'casa:energy-prefs'   -> parent runs hass.callWS('energy/get_prefs')
//    energyToday()  posts 'casa:energy-today'   -> parent runs hass.callWS('recorder/statistics_during_period')
//  panel.js answers with the matching '*-result' message, matched back up by
//  a request id.
//
//  connect() is given a timeout by ha-backend.js (the dispatcher): if this
//  page is opened directly (not inside panel.js's iframe), no parent will
//  ever answer 'casa:ready' and this would hang forever — the caller races
//  it against a timeout and falls back to the demo backend instead.
//
//  Classic script, not an ES module (see discovery.js's top comment for why)
//  — wrapped in an IIFE since it shares one global scope with every other
//  file loaded via loadScript() in dash_neumo*.html, and ha-backend-demo.js
//  declares its own same-named BACKEND_KIND / connect.
// ===========================================================================

(function () {

const BACKEND_KIND = 'panel';

const CALL_TIMEOUT_MS = 15000;

function normalizeData(data) {
  const t = (data && data.target) || {};
  const entity_id = t.entity_id !== undefined ? t.entity_id : (data && data.entity_id);
  const out = Object.assign({}, data);
  delete out.target;
  if (entity_id !== undefined) out.entity_id = entity_id;
  return out;
}

async function connect(handlers, readyTimeoutMs) {
  const pending = new Map();
  let reqId = 0;

  function onMessage(e) {
    if (e.source !== window.parent) return;
    const d = e.data;
    if (!d || typeof d !== 'object') return;

    if (d.type === 'casa:hass-states') {
      handlers.onStates(Object.assign({}, d.states));
      if (handlers.onLanguage && d.language) handlers.onLanguage(d.language);
      return;
    }
    if (d.type === 'casa:call-result' || d.type === 'casa:history-result' || d.type === 'casa:registries-result'
      || d.type === 'casa:energy-prefs-result' || d.type === 'casa:energy-today-result') {
      const p = pending.get(d.id);
      if (!p) return;
      pending.delete(d.id);
      clearTimeout(p.timeout);
      if (d.ok) p.resolve(d.result);
      else p.reject(new Error(d.error || 'richiesta fallita'));
    }
  }
  window.addEventListener('message', onMessage);

  handlers.onStatus('connecting');
  await new Promise((resolve, reject) => {
    let settled = false;
    function onFirstStates(e) {
      if (settled) return;
      if (e.source !== window.parent) return;
      if (e.data && e.data.type === 'casa:hass-states') {
        settled = true;
        window.removeEventListener('message', onFirstStates);
        onMessage(e);
        resolve();
      }
    }
    window.addEventListener('message', onFirstStates);
    window.parent.postMessage({ type: 'casa:ready' }, window.location.origin);
    if (readyTimeoutMs) {
      setTimeout(() => {
        if (settled) return;
        settled = true;
        window.removeEventListener('message', onFirstStates);
        window.removeEventListener('message', onMessage);
        reject(new Error('no hass within ' + readyTimeoutMs + 'ms'));
      }, readyTimeoutMs);
    }
  });
  handlers.onStatus('connected');

  function send(type, payload) {
    return new Promise((resolve, reject) => {
      const id = ++reqId;
      const timeout = setTimeout(() => {
        pending.delete(id);
        reject(new Error('timeout in attesa della risposta da Home Assistant'));
      }, CALL_TIMEOUT_MS);
      pending.set(id, { resolve, reject, timeout });
      window.parent.postMessage(Object.assign({ type, id }, payload), window.location.origin);
    });
  }

  return {
    kind: BACKEND_KIND,

    call: function (domain, service, data) {
      return send('casa:call', { domain, service, data: normalizeData(data) });
    },

    history: function (entity_id, points) {
      return send('casa:history', { entity_id, points });
    },

    registries: function () {
      return send('casa:registries', {});
    },

    energyPrefs: function () {
      return send('casa:energy-prefs', {});
    },

    energyToday: function (entity_id) {
      return send('casa:energy-today', { entity_id });
    },

    close: function () {
      window.removeEventListener('message', onMessage);
      for (const p of pending.values()) { clearTimeout(p.timeout); p.reject(new Error('backend closed')); }
      pending.clear();
    }
  };
}

window.CasaBackendPanel = { BACKEND_KIND, connect };

})();

// ===========================================================================
//  HA BACKEND — DISPATCHER
//
//  Picks the real implementation at runtime instead of being one:
//    - `?demo` anywhere in the page URL forces the demo backend.
//    - opened directly (not inside panel.js's iframe — window.parent === window,
//      as is the case straight from file://) also goes to the demo backend,
//      since there is no host to answer the panel protocol.
//    - otherwise it tries the panel backend, but bounded by READY_TIMEOUT_MS:
//      if no parent answers 'casa:ready' in time (stale iframe, wrong host,
//      module loaded outside panel_custom), it falls back to the demo
//      backend rather than leaving the page stuck on "connecting" forever.
//
//  Classic script, not an ES module — see the note at the top of
//  discovery.js for why (dynamic import() is blocked by Chrome's CORS
//  policy on file://, which breaks the "must open from file://" demo-mode
//  requirement), and why this is wrapped in an IIFE (shared global scope
//  with every other file loaded via loadScript() in dash_neumo*.html).
//  dash_neumo.html / dash_neumo_mobile.html load this file,
//  ha-backend-panel.js and ha-backend-demo.js all up front via plain
//  <script> tags before calling window.CasaBackend.connect().
// ===========================================================================

(function () {

const READY_TIMEOUT_MS = 1800;

function isDemoRequested() {
  try {
    return new URLSearchParams(window.location.search).has('demo');
  } catch (e) {
    return false;
  }
}

async function connect(handlers) {
  if (isDemoRequested() || window.parent === window) {
    return window.CasaBackendDemo.connect(handlers);
  }
  try {
    return await window.CasaBackendPanel.connect(handlers, READY_TIMEOUT_MS);
  } catch (e) {
    console.warn('[casa] panel backend unavailable, falling back to demo mode:', e.message || e);
    return window.CasaBackendDemo.connect(handlers);
  }
}

window.CasaBackend = { BACKEND_KIND: 'auto', connect };

})();

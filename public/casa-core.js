// casa-core.js — the dashboard's logic, shared by dash_neumo.html (wall
// tablet) and dash_neumo_mobile.html (phone). v2: before this file each page
// carried its own copy of every method below (85 of 86 were identical), so
// every fix had to be made twice. The pages now keep only their layout:
// their template, their initial `state` and their own renderVals().
//
// Classic script, not an ES module, for the same reason as discovery.js:
// demo mode runs from file://, where module imports are blocked. Loaded by
// a <script> in each page's <head> *before* support.js, because the runtime
// evaluates the page's `class Component extends …` right after React loads,
// and that class extends CasaCore.base(DCLogic) defined here.
(function () {

// Defaults mirror live_dashboard_config.example.js — see that file for what each key does.
// A missing/broken config.js degrades to this, never to a crash.
const DEFAULT_CONFIG = {
  rooms: { order: [], hide: [], max: 12, icons: {} },
  alarm: null, modes: null, people: [], weather: null, quickActions: null,
  energy: null, irrigation: null, vehicle: null, appliances: null, cameras: null, weatherStation: null, language: null,
  // Settings-panel-related (v1.5.0): config-level hide lists the panel's
  // per-user overrides layer on top of — see the note in
  // live_dashboard_config.example.js for how the two relate.
  entities: { hide: [] }, modules: { hide: [] }
};
function mergeConfig(user) {
  const u = user || {};
  return Object.assign({}, DEFAULT_CONFIG, u, {
    rooms: Object.assign({}, DEFAULT_CONFIG.rooms, u.rooms || {}),
    entities: Object.assign({}, DEFAULT_CONFIG.entities, u.entities || {}),
    modules: Object.assign({}, DEFAULT_CONFIG.modules, u.modules || {})
  });
}
// Classic <script> tag injection instead of dynamic import(): Chrome blocks
// ES module fetches (including import()) from file:// origins entirely
// (each file: URL is a unique opaque origin under its CORS check), which
// would silently break demo mode's "must open from file://" requirement.
// Plain <script src> tags aren't subject to that restriction, so discovery.js
// / i18n.js / the ha-backend-*.js trio / config.js are all loaded this way
// and expose themselves as window.Casa* globals instead of module exports.
// panel.js cache-busts this file itself via `?v=` on the iframe src (see
// VERSION there), but that alone doesn't stop the browser from serving
// a stale cached copy of the scripts *this* file loads below — discovery.js,
// config.js, the i18n/backend files. Reusing the same `v` here means one
// VERSION bump busts the whole chain, not just this file.
const ASSET_V = new URLSearchParams(location.search).get('v');
function bust(src) { return ASSET_V ? `${src}?v=${ASSET_V}` : src; }

function loadScript(src) {
  return new Promise((resolve) => {
    const s = document.createElement('script');
    s.src = src;
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false); // config.js is optional — a 404 is not an error
    document.head.appendChild(s);
  });
}

// Demo scenario bar (see CLAUDE.md) — switching writes `scenario` into the
// URL and reloads. The demo backend has no state worth preserving across a
// reload (see ha-backend-demo.js), so a full reload is the clean path rather
// than something to work around.
function switchScenario(id) {
  const url = new URL(window.location.href);
  url.searchParams.set('scenario', id);
  window.location.replace(url.toString());
}

// Tried in order, first hit wins. HACS overwrites the plugin's own folder
// on every update, so a config.js living next to panel.js would be wiped
// out by the next update — `/local/live_dashboard_config.js` (config/www/
// root, outside any HACS-managed subfolder) is the recommended location
// going forward. The other two exist purely for back-compat: installs that
// followed an earlier HACS layout, and manual installs that still keep
// config.js next to panel.js. All three are plain <script> tags (see the
// file:// note above), not dynamic import(), so a missing one is a silent
// 404 via loadScript's onerror, never a console error.
// The two /local/ candidates only ever resolve when Home Assistant itself
// is serving this page — i.e. when panel.js has embedded it in an iframe
// (same signal ha-backend.js already uses to detect "not really installed
// under HA" for demo mode: window.parent === window). Opened directly
// (file://, or `?demo` for local testing) they can never succeed, so
// skip them there — each is a <script> 404, which the browser logs to the
// console as a network-level error no matter how the code handles it, and
// there's no point paying that cost for two paths that can't possibly hit.
const CONFIG_PATHS = window.parent !== window
  ? ['/local/live_dashboard_config.js', '/local/community/live_dashboard/config.js', './config.js']
  : ['./config.js'];
// Captures the same trail the console.info below already announced, as
// plain data instead of a formatted string — the Diagnostica panel (v1.5.1)
// renders this without re-running any of the loading logic. `defined: null`
// on an attempt means loadScript itself returned false (404 at that path,
// never got the chance to define CASA_CONFIG); `defined: false` with
// `loadScript: true` is the "file served but not executed" case (a syntax
// error still fires the script tag's `load` event — the fetch succeeded,
// only parsing failed).
async function loadUserConfig() {
  const attempts = [];
  for (const path of CONFIG_PATHS) {
    const loaded = await loadScript(bust(path));
    const defined = loaded ? !!window.CASA_CONFIG : null;
    attempts.push({ path, loadScript: loaded, defined });
    if (loaded && window.CASA_CONFIG) {
      console.info(`[live_dashboard] config caricata da ${path}`);
      return { config: window.CASA_CONFIG, diag: { attempts, resolvedPath: path, insideIframe: window.parent !== window } };
    }
  }
  return { config: {}, diag: { attempts, resolvedPath: null, insideIframe: window.parent !== window } };
}


// v2 — README section a 1.x HACS Dashboard user is pointed to.
const MIGRATION_GUIDE_URL = 'https://github.com/mbonny95/live_dashboard#upgrading-from-1x';

// v2 — parse the shared-config JSON editor's text. Returns { config } or
// { error: 'invalidJson' | 'notObject', detail }: the dashboard stores what
// window.CASA_CONFIG would be, so it must be a plain JSON object.
function parseSharedConfigText(text) {
  let v;
  try { v = JSON.parse(text); }
  catch (e) { return { error: 'invalidJson', detail: (e && e.message) || '' }; }
  if (!v || typeof v !== 'object' || Array.isArray(v)) return { error: 'notObject' };
  return { config: v };
}

// The runtime hands each page its DCLogic base class; the shared component
// class is built on top of it once and reused (the runtime may re-evaluate
// a page's script, it always passes the same DCLogic).
let Base = null;
function base(DCLogic) {
  if (Base) return Base;
  Base = class CasaComponentBase extends DCLogic {
  // Safe synchronous defaults: the first render happens before
  // componentDidMount's dynamic imports resolve, so these must already be
  // usable — _boot() below replaces them and forces a re-render via setState.
  cfg = mergeConfig({});
  registries = { areas: [], devices: [], entities: [] };
  discovery = null;
  // Diagnostica panel (v1.5.1) — null until _boot() resolves, and the panel
  // must render something sensible even if it never does (discovery/backend
  // failure is exactly the case this screen exists for).
  configDiag = null;
  energyDiag = null;
  // v1.8.1 — see onEmbedIframe above (null = not yet known / demo backend
  // never sends it, distinct from a real false).
  panelEmbedIframe = null;
  // v2 — 'integration' (custom_components/live_dashboard) or 'panel_custom'
  // (manual YAML install); null in demo mode. Sent by panel.js.
  panelInstall = null;
  // v2 — { isAdmin, name } of the Home Assistant user, sent by panel.js.
  panelUser = null;
  // v2 — the raw config read from live_dashboard_config.js (for "import
  // into Home Assistant") and what the integration returned.
  fileConfig = null;
  sharedConfigInfo = null;
  // Ring buffer of the last 20 call() outcomes — Diagnostica's "Recent
  // actions" section reads this directly, same instance-field-not-state
  // pattern as camDiag (mutated in place, a setState elsewhere in the same
  // call() triggers the re-render that picks it up).
  _actionLog = [];
  // Auto-close deadlines for irrigation valves started from this dashboard
  // — { [valveEntityId]: endsAtEpochMs } — loaded from frontend/user_data
  // (or localStorage in demo mode) at boot, in state (not an instance
  // field) because SETTINGS_SET_ROOM-style renders need to react to it.
  _irrigationLastClosed = {};
  // Guards against _checkIrrigationEnds() double-firing turn_off for the
  // same valve when two 15s ticks land close enough together that the
  // first tick's setState hasn't flushed before the second tick reads
  // state (observed under a fast-forwarded clock in testing; a real 15s
  // gap makes it very unlikely, but the guard is cheap and turn_off
  // isn't a call worth sending twice).
  _irrigationClosing = new Set();
  t = (key) => key;
  // Static-label dictionary, exposed to the template as `S`. A Proxy
  // returning '' for any key — not a plain {} — because the real i18n
  // strings only load asynchronously in _boot(), so React's very first
  // (synchronous, pre-mount) render always happens against this default.
  // A plain {} makes every `S.xxx` in whatever renders on that first pass
  // resolve to `undefined`, and the template runtime logs a permanent
  // "never resolved" warning for each one it ever sees undefined once —
  // confirmed on a real install (title/body/cta of the empty-areas card,
  // section headers) even though the real strings arrive moments later
  // and the text shown to the user is correct throughout. Returning ''
  // instead of undefined is what `t()` two lines below already does for
  // the exact same reason; this makes S.* consistent with it.
  strings = new Proxy({}, { get: () => '' });
  // `&bare` (see CLAUDE.md) hides the scenario bar for README screenshots —
  // read once at construction, same lifetime as ASSET_V above.
  bare = new URLSearchParams(location.search).has('bare');

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ now: Date.now() });
      // Ring strip (v1.8.0): re-fetch only when the wall clock has actually
      // crossed into a new hour since the last fetch — hourly statistics
      // don't change any faster than that, so this rides the existing 15s
      // tick instead of its own timer.
      const hourKey = Math.floor(Date.now() / 3600000);
      if (this._hourlyEnergyHourKey !== undefined && hourKey !== this._hourlyEnergyHourKey) this._loadHourlyEnergy();
      // Irrigation auto-close (v1.8.1) — see _checkIrrigationEnds().
      this._checkIrrigationEnds();
    }, 15000);
    this._onVisibility = () => {
      if (document.visibilityState === 'hidden') { this._stopSnapTimer(); this._camStopFastPoll(); }
      else {
        this._startSnapTimer();
        if (this.state.cam && this.state.camStreamLayer === 'snapshot') this._camStartFastPoll(this.state.cam);
      }
    };
    document.addEventListener('visibilitychange', this._onVisibility);
    this._boot().catch((e) => { console.error('[casa] backend load failed', e); this.setState({ status: 'error' }); });
  }

  // Camera previews are re-fetched (not just re-authenticated — the proxy
  // grabs a fresh frame from the camera on every request) by cache-busting
  // the <img> src on a timer. Suspended while the tab/page is hidden: on the
  // wall tablet this is the difference between a real refresh cadence and a
  // continuous background fetch nobody is looking at.
  // camHomeTiles (v1.4.9) can now put up to 4 <img> snapshots on the Casa
  // card instead of always 1 — same single snapTick timer, so it's still one
  // synchronized refresh, just up to 4 parallel requests instead of 1 every
  // `seconds`. Left at the same cadence as the tab on purpose: the
  // Sorveglianza tab has already fired one simultaneous request per camera
  // (up to 6+ today) on this same timer since cameras shipped, so 4 on the
  // home card is a smaller burst than what the tab already does routinely —
  // not a new traffic ceiling to worry about. Revisit this if `gridTab`
  // installs with many more cameras report otherwise.
  _startSnapTimer() {
    this._stopSnapTimer();
    if (document.visibilityState === 'hidden') return;
    const seconds = (this.cfg.cameras && this.cfg.cameras.snapshotInterval) || 10;
    this.snapTimer = setInterval(() => this.setState({ snapTick: Date.now() }), Math.max(2, seconds) * 1000);
  }
  _stopSnapTimer() { if (this.snapTimer) { clearInterval(this.snapTimer); this.snapTimer = null; } }

  _openCam(id) {
    this.camCloseAt = Date.now() + 120000;
    if (this.camTimer) clearInterval(this.camTimer);
    this.camTimer = setInterval(() => {
      if (Date.now() >= this.camCloseAt) this._closeCam();
      else this.setState({});
    }, 1000);
    this.setState({ cam: id, camStreamLayer: null, camStreamUrl: null, camStillSrc: null });
    this._camStartStream(id);
  }
  _closeCam() {
    if (this.camTimer) { clearInterval(this.camTimer); this.camTimer = null; }
    this._camStopFastPoll();
    this._camStopWebRtc();
    if (this._hlsInstance) { try { this._hlsInstance.destroy(); } catch (e) { /* already torn down */ } this._hlsInstance = null; }
    // Invalidates any in-flight camera/stream request from _camStartStream
    // so a slow response for a camera the user already closed (or switched
    // away from) can't land afterwards and flip the now-wrong stream on.
    this.camStreamReqId = (this.camStreamReqId || 0) + 1;
    this._camVideoRefKey = null;
    this._camVideoRefFn = null;
    this._hlsVideo = null;
    this._hlsUrl = null;
    this.setState({ cam: null, camStreamLayer: null, camStreamUrl: null, camPlayingUrl: null, camStillSrc: null });
  }
  _revealCam(id) {
    this.setState({ camRevealed: Object.assign({}, this.state.camRevealed, { [id]: true }) });
  }

  // --- camera live view (v1.5.4) --------------------------------------------
  // See CLAUDE.md's v1.5.4 spec, point 1, for the full "why": camera/proxy_
  // stream (the old approach, string-substituted from the preview URL) only
  // ever serves MJPEG, which RTSP/ONVIF/generic cameras — most of the
  // installed base — never expose, so their detail view was a black
  // rectangle. Three layers, first one that works wins, no error ever shown
  // for a layer that doesn't — a rectangle isn't a bug report, it's a dead
  // end, so this always degrades to *something moving* instead:
  //   1. camera/stream in HLS format, played natively (<video src>) —
  //      Safari/iOS/many iOS webviews only; the only layer that is a real
  //      live stream.
  //   2. same URL, played via the vendored hls.js (public/vendor/
  //      hls.light.min.js, shipped since v1.9.0) — Chrome/Android/most
  //      companion apps, which have no native HLS.
  //   3. camera_proxy stills (the same endpoint the previews already use
  //      successfully), cache-busted at a fast interval, only while the
  //      detail view is open — see _camStartFastPoll.
  async _camStartStream(id, opts) {
    this.camStreamReqId = (this.camStreamReqId || 0) + 1;
    const reqId = this.camStreamReqId;
    const o = opts || {};
    const diag = Object.assign({ wsAttempted: false, wsOk: null, wsError: null, layer: null }, o.carryDiag || {});
    // v2 — WebRTC first, when Home Assistant offers it for this camera (its
    // built-in go2rtc, or the camera's own integration): the same path HA's
    // own camera card uses, live in a second or two with no HLS segments to
    // build. Needs the backend's generic WS bridge (panel only; the demo has
    // no cameras to stream) and a browser with RTCPeerConnection. Anything
    // short of a playing frame falls back to the HLS layers below — see
    // _camStartWebRtc and _camLayerFailed('webrtc').
    if (!o.skipWebRtc && this.be && this.be.ws && this.be.subscribe && typeof RTCPeerConnection !== 'undefined') {
      let caps = null;
      try { caps = await this.be.ws({ type: 'camera/capabilities', entity_id: id }); } catch (e) { /* older HA, or not a camera with capabilities */ }
      if (reqId !== this.camStreamReqId) return;
      if (caps && Array.isArray(caps.frontend_stream_types) && caps.frontend_stream_types.includes('web_rtc')) {
        diag.layer = 'webrtc';
        this._setCamDiag(id, diag);
        this.setState({ camStreamLayer: 'webrtc', camStreamUrl: 'webrtc:' + id + ':' + reqId, camPlayingUrl: null });
        this._camStartWebRtc(id, reqId);
        return;
      }
    }
    if (this.be && this.be.cameraStream) {
      diag.wsAttempted = true;
      try {
        const result = await this.be.cameraStream(id);
        const url = result && result.url;
        diag.wsOk = !!url;
        if (reqId === this.camStreamReqId && url) {
          // v1.9.0 — hls.js first wherever Media Source exists (Chrome,
          // Firefox, Android, desktop Safari, iOS 17.1+), native HLS only
          // where hls.js can't run. The old order trusted canPlayType():
          // Chrome now answers "maybe" for HLS but its native player can't
          // parse the fMP4/HEVC streams Home Assistant produces for many
          // cameras (seen on a real Imou: DEMUXER_ERROR_COULD_NOT_PARSE),
          // while hls.js plays the same stream fine.
          if (window.MediaSource || window.ManagedMediaSource) {
            const hlsReady = await this._ensureHlsJs();
            if (reqId !== this.camStreamReqId) return;
            if (hlsReady && window.Hls.isSupported()) {
              diag.layer = 'hlsjs';
              this._setCamDiag(id, diag);
              this.setState({ camStreamLayer: 'hlsjs', camStreamUrl: url, camPlayingUrl: null });
              return;
            }
          }
          if (this._camCanNative()) {
            diag.layer = 'hls-native';
            this._setCamDiag(id, diag);
            this.setState({ camStreamLayer: 'hls-native', camStreamUrl: url, camPlayingUrl: null });
            return;
          }
        }
      } catch (e) {
        diag.wsOk = false;
        diag.wsError = (e && e.message) || String(e);
      }
    }
    if (reqId !== this.camStreamReqId) return;
    diag.layer = 'snapshot';
    this._setCamDiag(id, diag);
    this.setState({ camStreamLayer: 'snapshot', camStreamUrl: null });
    this._camStartFastPoll(id);
  }

  // v1.9.0 — one stable ref callback per (layer, url). A fresh arrow on
  // every render made React detach and re-run the ref each time, and the
  // detail view re-renders every second (the auto-close countdown) plus on
  // every state push: each run re-set `src` (or re-attached hls.js), which
  // restarts the media load. Measured on a real camera: 14 reloads in 10 s,
  // playback never past 0.45 s — a "Live" that was really a stuttering
  // first frame. Also mutes for real: React doesn't reliably reflect the
  // template's `muted` attribute, so camera audio played out loud.
  _camVideoRef(layer, url) {
    const key = layer + '|' + url;
    if (this._camVideoRefKey === key && this._camVideoRefFn) return this._camVideoRefFn;
    this._camVideoRefKey = key;
    this._camVideoRefFn = (el) => {
      if (!el) return;
      el.muted = true;
      el.defaultMuted = true;
      if (!el._casaPlayingHook) {
        el._casaPlayingHook = true;
        el.addEventListener('playing', () => {
          const cur = el.getAttribute('data-url');
          if (cur && this.state.camPlayingUrl !== cur) this.setState({ camPlayingUrl: cur });
        });
        // Native layer only: hls.js reports its own failures (see
        // _attachHlsJs), and a <video> error under hls.js is hls.js's to
        // recover from.
        el.addEventListener('error', () => {
          if (el.getAttribute('data-layer') === 'hls-native') {
            this._camLayerFailed('hls-native', el.error ? el.error.message || String(el.error.code) : null);
          }
        });
      }
      el.setAttribute('data-url', url || '');
      el.setAttribute('data-layer', layer);
      if (layer === 'webrtc') {
        const w = this._camWebRtc;
        if (w && el.srcObject !== w.stream) el.srcObject = w.stream;
      } else if (layer === 'hlsjs') {
        if (el.srcObject) el.srcObject = null;
        if (this._hlsInstance && this._hlsVideo === el && this._hlsUrl === url) return;
        this._attachHlsJs(el, url);
        this._hlsVideo = el;
        this._hlsUrl = url;
      } else if (url && el.getAttribute('src') !== url) {
        if (el.srcObject) el.srcObject = null;
        el.setAttribute('src', url);
      }
    };
    return this._camVideoRefFn;
  }

  // v2 — WebRTC session with Home Assistant, the same handshake as HA's own
  // ha-web-rtc-player (frontend 2026.11): client config -> peer connection
  // with recvonly audio+video -> offer over the camera/webrtc/offer
  // subscription -> session id, answer and remote candidates come back as
  // events; local candidates go up with camera/webrtc/candidate once the
  // session id is known (queued until then). Audio tracks are dropped: the
  // live view is muted by design (v1.9.0). No frame within
  // WEBRTC_START_TIMEOUT_MS, an error event, or a failed ICE connection ->
  // _camLayerFailed('webrtc'), which retries the HLS path.
  async _camStartWebRtc(id, reqId) {
    this._camStopWebRtc();
    const WEBRTC_START_TIMEOUT_MS = 12000;
    const s = { id, reqId, pc: null, stream: new MediaStream(), sessionId: null, queue: [], sub: null, timer: null };
    this._camWebRtc = s;
    const live = () => this._camWebRtc === s && this.camStreamReqId === reqId && this.state.cam === id;
    const fail = (why) => { if (live()) this._camLayerFailed('webrtc', why ? String(why) : null); };
    const sendCandidate = (c) => {
      this.be.ws({ type: 'camera/webrtc/candidate', entity_id: id, session_id: s.sessionId, candidate: c.toJSON() }).catch(() => {});
    };
    try {
      const cfg = await this.be.ws({ type: 'camera/webrtc/get_client_config', entity_id: id });
      if (!live()) return;
      const pc = new RTCPeerConnection((cfg && cfg.configuration) || {});
      s.pc = pc;
      if (cfg && cfg.dataChannel) pc.createDataChannel(cfg.dataChannel);
      pc.ontrack = (e) => {
        if (e.track.kind === 'video' && !s.stream.getTracks().includes(e.track)) s.stream.addTrack(e.track);
      };
      pc.onicecandidate = (e) => {
        const c = e.candidate;
        if (!c || !c.candidate) return;
        if (s.sessionId) sendCandidate(c); else s.queue.push(c);
      };
      pc.oniceconnectionstatechange = () => { if (pc.iceConnectionState === 'failed') fail('ICE failed'); };
      pc.addTransceiver('audio', { direction: 'recvonly' });
      pc.addTransceiver('video', { direction: 'recvonly' });
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      if (!live()) return;
      s.sub = this.be.subscribe({ type: 'camera/webrtc/offer', entity_id: id, offer: offer.sdp }, async (ev, err) => {
        if (!live()) return;
        if (err) { fail(err); return; }
        if (!ev) return;
        if (ev.type === 'session') {
          s.sessionId = ev.session_id;
          s.queue.splice(0).forEach(sendCandidate);
        } else if (ev.type === 'answer') {
          if (['stable', 'closed'].includes(pc.signalingState)) return;
          try { await pc.setRemoteDescription({ type: 'answer', sdp: ev.answer }); } catch (e) { fail(e && e.message); }
        } else if (ev.type === 'candidate') {
          const c = ev.candidate || {};
          try {
            await pc.addIceCandidate(c.sdpMid || c.sdpMLineIndex != null ? c : { candidate: c.candidate, sdpMid: '0' });
          } catch (e) { /* one bad candidate is not a failed session */ }
        } else if (ev.type === 'error') {
          fail(ev.message || ev.code);
        }
      });
      s.timer = setTimeout(() => {
        if (live() && this.state.camPlayingUrl !== this.state.camStreamUrl) fail('timeout');
      }, WEBRTC_START_TIMEOUT_MS);
    } catch (e) {
      fail((e && e.message) || e);
    }
  }

  _camStopWebRtc() {
    const s = this._camWebRtc;
    if (!s) return;
    this._camWebRtc = null;
    clearTimeout(s.timer);
    if (s.sub) s.sub.unsubscribe();
    if (s.pc) { try { s.pc.close(); } catch (e) { /* already closed */ } }
    s.stream.getTracks().forEach((t) => t.stop());
  }

  _camCanNative() {
    return !!document.createElement('video').canPlayType('application/vnd.apple.mpegurl');
  }

  // v1.9.0 — a layer that was chosen but fails while playing (hls.js fatal
  // error, <video> error event) steps down instead of leaving a black box:
  // hls.js -> native HLS (if the browser has it) -> fast stills. Recorded in
  // Diagnostica, so "why is my camera only showing previews" has an answer.
  _camLayerFailed(layer, detail) {
    const id = this.state.cam;
    if (!id || this.state.camStreamLayer !== layer) return;
    if (layer === 'webrtc') {
      // Back to the start of the ladder, minus WebRTC: camera/stream + HLS.
      this._camStopWebRtc();
      this._camStartStream(id, { skipWebRtc: true, carryDiag: { failedLayer: 'webrtc', failDetail: detail || null } });
      return;
    }
    if (this._hlsInstance) { try { this._hlsInstance.destroy(); } catch (e) { /* already torn down */ } this._hlsInstance = null; }
    this._hlsVideo = null;
    this._hlsUrl = null;
    const diag = Object.assign({}, (this.camDiag || {})[id], { failedLayer: layer, failDetail: detail || null });
    if (layer === 'hlsjs' && this.state.camStreamUrl && this._camCanNative()) {
      diag.layer = 'hls-native';
      this._setCamDiag(id, diag);
      this.setState({ camStreamLayer: 'hls-native', camPlayingUrl: null });
      return;
    }
    diag.layer = 'snapshot';
    this._setCamDiag(id, diag);
    this.setState({ camStreamLayer: 'snapshot', camStreamUrl: null, camPlayingUrl: null, camStillSrc: null });
    this._camStartFastPoll(id);
  }

  _setCamDiag(id, diag) {
    this.camDiag = Object.assign({}, this.camDiag, { [id]: diag });
  }

  // Lazily loads the vendored hls.js (v1.9.0, ~390 KB) exactly once per
  // session, the first time a camera detail opens on a browser with Media
  // Source — never paid by installs that never open one. Resolves false
  // only if vendor/ is missing (a half-copied manual install), in which
  // case the fast-still layer takes over as before.
  _ensureHlsJs() {
    if (window.Hls) return Promise.resolve(true);
    if (!this._hlsJsLoadPromise) {
      this._hlsJsLoadPromise = loadScript(bust('./vendor/hls.light.min.js')).then((ok) => ok && !!window.Hls);
    }
    return this._hlsJsLoadPromise;
  }

  // Ref callback for the <video> element in the 'hlsjs' layer — MSE playback
  // needs a live HTMLVideoElement to attach to, unlike the native-HLS layer
  // where `src` alone (via _bindAttr) is enough.
  _attachHlsJs(video, url) {
    if (this._hlsInstance) { try { this._hlsInstance.destroy(); } catch (e) { /* already torn down */ } this._hlsInstance = null; }
    if (!video || !url || !window.Hls) return;
    const hls = new window.Hls();
    hls.on(window.Hls.Events.ERROR, (evt, data) => {
      if (data && data.fatal && this._hlsInstance === hls) this._camLayerFailed('hlsjs', data.details || data.type);
    });
    hls.loadSource(url);
    hls.attachMedia(video);
    this._hlsInstance = hls;
  }

  // Tier 3 fallback: the same camera_proxy stills the previews already use
  // (never camera_proxy_stream — that's the endpoint that only works for
  // MJPEG cameras and was the root cause here), re-fetched fast enough to
  // read as "something is moving" without pretending to be a real live feed
  // — see the "anteprima aggiornata" badge in render(). Only ever runs while
  // the detail view is open on this exact camera (checked on every tick, not
  // just at start, since _openCam can move to a different camera while this
  // timer is still alive) and suspended in the background the same way the
  // slower preview timer already is.
  // v1.9.0 — load-chained instead of a fixed 400 ms timer: the next still
  // is requested only after the previous one arrived, and preloaded off
  // screen so the shown frame is swapped, never blanked. A fixed timer
  // replaced the URL faster than a slow camera could answer (measured: one
  // still = 8.5 s on a real ONVIF camera), so no frame ever finished.
  _camStartFastPoll(id) {
    this._camStopFastPoll();
    if (document.visibilityState === 'hidden') return;
    const gen = this._camStillGen;
    const step = () => {
      if (gen !== this._camStillGen || this.state.cam !== id || this.state.camStreamLayer !== 'snapshot') return;
      const pic = this.at(id, 'entity_picture');
      if (!pic) { this.camFastTimer = setTimeout(step, 1500); return; }
      const url = pic + (pic.indexOf('?') === -1 ? '?' : '&') + '_cb=' + Date.now();
      const pre = new Image();
      pre.onload = () => {
        if (gen !== this._camStillGen) return;
        this.setState({ camStillSrc: url });
        this.camFastTimer = setTimeout(step, 400);
      };
      pre.onerror = () => { if (gen === this._camStillGen) this.camFastTimer = setTimeout(step, 1500); };
      pre.src = url;
    };
    // Next tick, not now: callers set camStreamLayer: 'snapshot' right
    // before calling this, and that setState hasn't landed yet.
    this.camFastTimer = setTimeout(step, 0);
  }
  _camStopFastPoll() {
    this._camStillGen = (this._camStillGen || 0) + 1;
    if (this.camFastTimer) { clearTimeout(this.camFastTimer); this.camFastTimer = null; }
  }

  async _boot() {
    await Promise.all([
      loadScript(bust('./discovery.js')),
      loadScript(bust('./prefs.js')),
      loadScript(bust('./i18n.js')),
      loadScript(bust('./i18n/it.js')),
      loadScript(bust('./i18n/en.js')),
      loadScript(bust('./ha-backend-panel.js')),
      loadScript(bust('./ha-backend-demo.js')),
      loadScript(bust('./ha-backend.js'))
    ]);
    const { config: userConfig, diag: configDiag } = await loadUserConfig();

    const discovery = window.CasaDiscovery;
    const be = await window.CasaBackend.connect({
      onStates: (s) => this.setState({ st: s }),
      onStatus: (s) => this.setState({ status: s }),
      onLanguage: (l) => this.setState({ hassLanguage: l }),
      // v1.8.1 — instance field, not state: read once by diagEnvironment()
      // on the next render an unrelated setState already triggers (onStates
      // fires in the same tick this app receives its first hass-states push
      // that carries it), same "no extra render just for this" reasoning as
      // camDiag elsewhere in this file.
      onEmbedIframe: (v) => { this.panelEmbedIframe = v; },
      onInstall: (v) => { this.panelInstall = v; },
      onUser: (u) => { this.panelUser = u; }
    });
    const kind = be.kind;
    // v2 — shared configuration stored in Home Assistant by the integration.
    // When set (a non-empty object) it wins over live_dashboard_config.js;
    // the file stays the fallback, and the only source for manual installs.
    let sharedInfo = null;
    if (kind !== 'demo' && this.panelInstall === 'integration' && be.ws) {
      try { sharedInfo = await be.ws({ type: 'live_dashboard/config/get' }); }
      catch (e) { sharedInfo = { error: (e && e.message) || String(e) }; }
    }
    const sharedCfg = sharedInfo && sharedInfo.config && typeof sharedInfo.config === 'object'
      && Object.keys(sharedInfo.config).length ? sharedInfo.config : null;
    configDiag.source = sharedCfg ? 'ha' : (configDiag.resolvedPath ? 'file' : 'none');
    configDiag.shared = sharedInfo;
    this.fileConfig = userConfig;
    this.sharedConfigInfo = sharedInfo;
    // The demo backend ships its own config so Energy/Irrigation/Vehicle/
    // alarm/modes are all visible without anyone writing a config.js.
    const cfg = mergeConfig(kind === 'demo' ? window.CasaBackendDemo.DEMO_CONFIG : (sharedCfg || userConfig));
    let registries = { areas: [], devices: [], entities: [] };
    if (be.registries) {
      try { registries = await be.registries(); }
      catch (e) { console.warn('[casa] registries unavailable — rooms will stay empty', e); }
    }
    const lang = window.CasaI18n.resolveLang(cfg, this.state.hassLanguage);
    const strings = window.CasaI18n.getStrings(lang);
    const t = window.CasaI18n.makeT(strings);

    // Assigned together, synchronously (no `await` between any of these) —
    // a hass-states push can land at any point during the awaits above and
    // trigger an unrelated re-render (onStates -> setState), which reads
    // these same instance fields directly in renderVals(). Assigning them
    // one at a time as each finished let that re-render catch `cfg` already
    // real (so e.g. hasEnergy/hasAlarm/hasNoAreas evaluate true) while
    // `strings`/`registries` were still their pre-boot defaults — exactly
    // what produced "S.xxx never resolved" warnings and briefly-unresolved
    // icon/src bindings on a real install: a card rendering before it had
    // real strings or real room data to render with.
    this.discovery = discovery;
    this.be = be;
    this.kind = kind;
    this.cfg = cfg;
    this.registries = registries;
    this.t = t;
    this.strings = strings; // exposed to the template as `S` for static labels — see renderVals()
    this.lang = lang;
    this.configDiag = configDiag; // Diagnostica panel (v1.5.1) — see loadUserConfig()

    this.energyDaily = await this._resolveEnergyDaily().catch((e) => {
      console.warn('[casa] energy source resolution failed', e);
      return null;
    });
    this.energyDiag = this.energyDaily && this.energyDaily.diag; // Diagnostica panel (v1.5.1)
    const { prefs, storage } = await window.CasaPrefs.load(be).catch(() => ({ prefs: { v: 1 }, storage: 'local' }));
    this.setState({ prefs, prefsStorage: storage }); // force a re-render now that cfg/registries/t/prefs are real
    this._loadHistory();
    this._loadHourlyEnergy();
    this._loadIrrigationEnds();
    this._startSnapTimer();
  }

  // Irrigation auto-close (v1.8.1) — loads whatever deadlines were saved
  // by any client (this one on a previous visit, or another one entirely)
  // and immediately checks them once: a valve whose time already passed
  // while nothing was open gets closed on the very next dashboard that
  // opens, not only on that dashboard's next 15s tick.
  async _loadIrrigationEnds() {
    try {
      const ends = await window.CasaPrefs.loadIrrigationEnds(this.be);
      this.setState({ irrigationEnds: ends || {} });
      this._checkIrrigationEnds(ends || {});
    } catch (e) {
      console.warn('[live_dashboard] irrigation end-times unavailable', e);
    }
  }

  // Ring strip (v1.8.0) — the same statistic_ids _resolveEnergyDaily() just
  // resolved (config.js first, then HA Energy prefs, then auto-discovery),
  // fetched at hour resolution instead of daily. One call per view-open
  // (here, and again only when the wall clock crosses into a new hour — see
  // the setInterval in componentDidMount), never on every 15s/state tick:
  // hourly statistics only change once an hour anyway. this.state.hourlyEnergy
  // stays `undefined` until this resolves at least once (distinct from
  // `null`, which means "resolved, but no statistics were found" — the
  // Diagnostica row below tells the two apart).
  async _loadHourlyEnergy() {
    this._hourlyEnergyHourKey = Math.floor(Date.now() / 3600000);
    if (!this.be || !this.be.energyHourly) return;
    const en = this.cfg.energy || {};
    const resolved = (this.energyDaily && this.energyDaily.diag && this.energyDaily.diag.resolvedIds) || {};
    const ids = {
      production: en.productionToday ? [en.productionToday] : (resolved.production || []),
      gridImport: en.gridToday ? [en.gridToday] : (resolved.gridImport || []),
      gridExport: en.gridExportToday ? [en.gridExportToday] : (resolved.gridExport || []),
      consumption: en.consumptionToday ? [en.consumptionToday] : []
    };
    if (!ids.production.length && !ids.gridImport.length && !ids.gridExport.length && !ids.consumption.length) {
      this.setState({ hourlyEnergy: null });
      return;
    }
    try {
      const result = await this.be.energyHourly(ids);
      this.setState({ hourlyEnergy: result });
    } catch (e) {
      // "Mai una card rotta" — a failed fetch leaves whatever was already
      // showing (including the very first `undefined`, which just keeps the
      // strip hidden) rather than surfacing an error in the card itself.
      console.warn('[live_dashboard] hourly energy fetch failed', e);
    }
  }

  // Resolves today's production/grid-import/grid-export totals for the
  // Fotovoltaico ring, for whichever of the three config.energy doesn't
  // already set explicitly (config.js always wins where it's set — this
  // never overrides it, only fills gaps). Two fallback sources, tried in
  // order, first one that yields an entity id for a given role wins:
  //   1. Home Assistant's own Energy dashboard prefs (energy/get_prefs) —
  //      if the user already mapped their sensors there, reuse it rather
  //      than asking again in config.js.
  //   2. device_class/state_class + name heuristic auto-discovery, for
  //      installs with no Energy dashboard configured at all.
  // Both sources give back *statistics* entity ids (lifetime-cumulative
  // sensors), never a live "today" state the way an explicit config.js
  // `*Today` field is assumed to be — so those go through energyToday()'s
  // statistics delta, fetched once here at boot, not on every render.
  async _resolveEnergyDaily() {
    const cfgEn = this.cfg.energy || {};
    const needProd = !cfgEn.productionToday;
    const needGrid = !cfgEn.gridToday;
    const needExport = !cfgEn.gridExportToday;

    const source = {
      production: needProd ? null : 'config',
      gridImport: needGrid ? null : 'config',
      gridExport: needExport ? null : 'config'
    };
    let prodIds = [], gridIds = [], exportIds = [];
    let rawSources = [];
    let prefsFailed = false; // Diagnostica panel (v1.5.1) — read below, not used to change resolution

    if (needProd || needGrid || needExport) {
      if (this.be.energyPrefs) {
        try {
          const prefs = await this.be.energyPrefs();
          if (prefs && Array.isArray(prefs.energy_sources)) rawSources = prefs.energy_sources;
          const mapped = this.discovery.mapEnergyPrefs ? this.discovery.mapEnergyPrefs(prefs) : null;
          if (mapped) {
            if (needProd && mapped.production.length) { prodIds = mapped.production; source.production = 'ha-prefs'; }
            if (needGrid && mapped.gridImport.length) { gridIds = mapped.gridImport; source.gridImport = 'ha-prefs'; }
            if (needExport && mapped.gridExport.length) { exportIds = mapped.gridExport; source.gridExport = 'ha-prefs'; }
          }
        } catch (e) {
          // A real failure (unsupported command, permissions, ...) —
          // distinct from "call succeeded, no Energy dashboard configured"
          // (mapped above is just null then, no exception). Worth logging:
          // this one means auto-discovery has to carry the whole load, not
          // just fill a gap HA prefs left.
          prefsFailed = true;
          console.warn('[live_dashboard] energy/get_prefs failed:', (e && e.message) || e);
        }
      }

      if ((needProd && !prodIds.length) || (needGrid && !gridIds.length) || (needExport && !exportIds.length)) {
        if (this.discovery.discoverEnergyEntities) {
          const guess = this.discovery.discoverEnergyEntities(this.state.st, this.registries);
          if (guess) {
            if (needProd && !prodIds.length && guess.production) { prodIds = [guess.production]; source.production = 'auto'; }
            if (needGrid && !gridIds.length && guess.gridImport) { gridIds = [guess.gridImport]; source.gridImport = 'auto'; }
            if (needExport && !exportIds.length && guess.gridExport) { exportIds = [guess.gridExport]; source.gridExport = 'auto'; }
          }
        }
      }
    }

    // Summed, not just the first id: HA prefs can legitimately list more
    // than one solar array or grid contract feeding the same role, and
    // each is a real contribution. A single id is just the n=1 case. A
    // stats lookup that finds nothing for one particular id doesn't poison
    // the sum — only "found nothing for any id" reports as unresolved.
    const sumToday = async (ids) => {
      if (!ids.length || !this.be.energyToday) return null;
      const vals = await Promise.all(ids.map((id) => this.be.energyToday(id).catch(() => null)));
      const known = vals.filter((v) => v != null);
      return known.length ? known.reduce((a, b) => a + b, 0) : null;
    };
    const [prodToday, gridToday, gridExportToday] = await Promise.all([
      sumToday(prodIds), sumToday(gridIds), sumToday(exportIds)
    ]);

    // One line per role naming exactly where it came from and what it
    // resolved to — a ring showing a wrong or missing number is otherwise
    // indistinguishable from one that couldn't find its sensors at all.
    // When a role stays unresolved, "nessuna fonte trovata" alone doesn't
    // tell the user *why* — so if energy/get_prefs did return a source of
    // the right type but this code didn't recognize its shape, list the
    // keys actually present on it. Lets an install with a schema we don't
    // know about yet self-diagnose instead of filing a silent issue, same
    // spirit as the panel_custom tag-mismatch guard.
    const keysFor = (type) => {
      const matches = rawSources.filter((s) => s && s.type === type);
      if (!matches.length) return null;
      const keys = new Set();
      matches.forEach((s) => Object.keys(s).forEach((k) => keys.add(k)));
      return Array.from(keys).join(', ');
    };
    const fmtVal = (v) => v == null ? 'non risolto' : this.dec(v, 2) + ' kWh';
    const line = (role, src, cfgId, ids, val, diagType) => {
      if (src === 'config') return '  ' + role + ': config.js → ' + cfgId + ' (valore letto dal vivo)';
      if (!src) {
        const keys = keysFor(diagType);
        return '  ' + role + ': nessuna fonte trovata' +
          (keys ? '\n    sorgente ' + diagType + ' trovata, chiavi: ' + keys : '');
      }
      return '  ' + role + ': ' + src + ' → ' + ids.join(' + ') + ' → ' + fmtVal(val);
    };
    console.info(
      '[live_dashboard] energia\n' +
      line('produzione', source.production, cfgEn.productionToday, prodIds, prodToday, 'solar') + '\n' +
      line('prelievo', source.gridImport, cfgEn.gridToday, gridIds, gridToday, 'grid') + '\n' +
      line('immissione', source.gridExport, cfgEn.gridExportToday, exportIds, gridExportToday, 'grid')
    );

    // Diagnostica panel (v1.5.1) — the same facts the console.info above
    // just formatted into a string, captured as plain data instead so the
    // panel can render them without re-running any resolution logic.
    const diag = {
      source: Object.assign({}, source),
      cfgIds: { production: cfgEn.productionToday || null, gridImport: cfgEn.gridToday || null, gridExport: cfgEn.gridExportToday || null },
      resolvedIds: { production: prodIds, gridImport: gridIds, gridExport: exportIds },
      values: { production: prodToday, gridImport: gridToday, gridExport: gridExportToday },
      rawSources, prefsFailed
    };
    return { prodToday, gridToday, gridExportToday, diag };
  }

  _loadHistory() {
    if (!this.be) return;
    const jobs = [];
    ((this.cfg.irrigation && this.cfg.irrigation.zones) || []).forEach((z, i) => {
      if (z.moisture) jobs.push(this.be.history(z.moisture, 48).then((v) => ['zone' + i, v]));
    });
    const en = this.cfg.energy;
    if (en && en.productionToday) jobs.push(this.be.history(en.productionToday, 30).then((v) => ['prod', v]));
    if (en && en.gridToday) jobs.push(this.be.history(en.gridToday, 30).then((v) => ['grid', v]));
    if (en && en.gridExportToday) jobs.push(this.be.history(en.gridExportToday, 30).then((v) => ['exp', v]));
    Promise.all(jobs).then((results) => {
      const hist = {};
      results.forEach((pair) => { hist[pair[0]] = pair[1]; });
      this.setState({ hist });
    });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this._stopSnapTimer();
    if (this.camTimer) clearInterval(this.camTimer);
    document.removeEventListener('visibilitychange', this._onVisibility);
    if (this.be) this.be.close();
  }

  s(id) { const e = this.state.st[id]; return e ? e.state : 'unknown'; }
  at(id, k) { const e = this.state.st[id]; return e && e.attributes ? e.attributes[k] : undefined; }
  fn(id) { return this.at(id, 'friendly_name') || id; }
  unit(id) { return this.at(id, 'unit_of_measurement') || ''; }
  isOn(id) { return this.s(id) === 'on'; }
  n(id) { const v = parseFloat(this.s(id)); return isNaN(v) ? null : v; }
  dec(v, d) { return v === null || v === undefined ? '—' : Number(v).toLocaleString(this.lang === 'it' ? 'it-IT' : 'en-GB', { minimumFractionDigits: d, maximumFractionDigits: d }); }
  val(id, d, u) {
    const v = this.n(id);
    if (v === null) return '—';
    return this.dec(v, d === undefined ? 1 : d) + (u === undefined ? (this.unit(id) ? ' ' + this.unit(id) : '') : u);
  }
  // Instantaneous power (W/kW/MW), normalized to the user's "powerUnit" pref
  // (auto/W/kW) regardless of which of those three units the sensor itself
  // reports in — inverters/EMs split roughly evenly between W and kW, and
  // forcing a literal " kW" at every call site (v1.5.2 and earlier) is wrong
  // by 1000x for half of them with no error surfaced anywhere. An
  // unrecognized unit is shown as-is, un-converted — an honest number in a
  // strange unit beats a wrong one in the expected unit.
  powerVal(id) {
    const v = this.n(id);
    if (v === null) return '—';
    const watts = this.toWatts(id);
    if (watts === null) return this.dec(v, 1) + (this.unit(id) ? ' ' + this.unit(id) : '');
    return this.formatWatts(watts);
  }
  // Split out of powerVal() (v1.6.0) so the house-consumption derivation
  // below can combine several sensors in a common unit before formatting —
  // powerVal() itself is unchanged in behavior, just reassembled from these
  // two halves. null means the sensor's unit isn't W/kW/MW (unrecognized —
  // see powerVal()'s own comment on why that's shown raw, never converted).
  toWatts(id) {
    const v = this.n(id);
    if (v === null) return null;
    const u = this.unit(id).trim().toLowerCase();
    const scale = u === 'kw' ? 1000 : u === 'mw' ? 1000000 : u === 'w' ? 1 : null;
    return scale === null ? null : v * scale;
  }
  formatWatts(watts) {
    if (watts === null || watts === undefined) return '—';
    const pref = this.PREFS().powerUnit || 'auto';
    const useKw = pref === 'kw' || (pref === 'auto' && Math.abs(watts) >= 1000);
    return useKw ? this.dec(watts / 1000, 1) + ' kW' : this.dec(watts, 0) + ' W';
  }
  // --- house consumption, derived (v1.6.0) ------------------------------
  // consumo casa = produzione + prelievo - immissione + scaricaBatteria -
  // caricaBatteria. Only ever runs when config.energy.consumption is unset
  // — an explicit sensor always wins, even if it disagrees with this (it's
  // the user's install, not ours). Needs production, gridImport *and*
  // gridExport all resolved; with any of the three missing this returns
  // `derived: false` rather than a partial sum — see CLAUDE.md v1.6.0,
  // "Quando derivare". Battery terms are additive extras: no battery
  // config at all just drops them (batteryTermUsed stays false), which is
  // the normal case for an install with no battery.
  deriveConsumption() {
    const en = (this.cfg && this.cfg.energy) || {};
    if (en.consumption) return { watts: null, derived: false, batteryTermUsed: false };
    const prod = this.toWatts(en.production);
    const imp = this.toWatts(en.gridImport);
    const exp = this.toWatts(en.gridExport);
    if (prod === null || imp === null || exp === null) return { watts: null, derived: false, batteryTermUsed: false };
    let battTerm = 0, batteryTermUsed = false;
    const bat = en.battery || {};
    if (bat.chargePower && bat.dischargePower) {
      // Two separate always-positive sensors (v1.6.0, point 1) — no sign
      // ambiguity, so no convention pref and no plausibility check apply.
      const c = this.toWatts(bat.chargePower), d = this.toWatts(bat.dischargePower);
      if (c !== null || d !== null) { battTerm = (d || 0) - (c || 0); batteryTermUsed = true; }
    } else if (bat.power) {
      const bp = this.toWatts(bat.power);
      if (bp !== null) {
        const sign = this.batteryPowerSign();
        const chargeW = sign === 'charge' ? Math.max(0, bp) : Math.max(0, -bp);
        const dischargeW = sign === 'charge' ? Math.max(0, -bp) : Math.max(0, bp);
        battTerm = dischargeW - chargeW;
        batteryTermUsed = true;
      }
    }
    const watts = prod + imp - exp + battTerm;
    return { watts, derived: true, batteryTermUsed };
  }
  // A derived consumption that comes out negative is never shown as a
  // number — see CLAUDE.md v1.6.0: "preferiamo un numero assente a un
  // numero verosimile e sbagliato". Sampled here (not on every render —
  // renderVals() runs on any UI interaction, not just new sensor data;
  // this instance-field buffer is throttled to one sample per ~10s) so
  // batterySignSuspect below can tell a single noisy blip apart from a
  // sustained wrong-sign convention. Only sampled when a battery term
  // actually participated — a plain production+import-export derivation
  // going negative would mean broken sensors, not an inverted convention,
  // and isn't this checkpoint's job to diagnose.
  _sampleBatterySign(negative) {
    if (!this._batterySignBuffer) this._batterySignBuffer = [];
    const now = Date.now();
    const last = this._batterySignBuffer[this._batterySignBuffer.length - 1];
    if (last && now - last.t < 10000) return;
    this._batterySignBuffer.push({ t: now, negative });
    const cutoff = now - 180000;
    this._batterySignBuffer = this._batterySignBuffer.filter((s) => s.t >= cutoff);
  }
  batterySignVerdict() {
    const buf = this._batterySignBuffer || [];
    const n = buf.length;
    const negShare = n ? buf.filter((s) => s.negative).length / n : 0;
    return { samples: n, suspect: n >= 5 && negShare > 0.5 };
  }
  // Settings -> Energia (v1.5.4). Default 3W matches the "a plug measuring
  // 0.4W with the relay closed is standby, not a running appliance" reading
  // in CLAUDE.md's v1.5.4 spec, point 2.
  plugThresholdW() {
    const v = this.PREFS().plugThreshold;
    return (typeof v === 'number' && v > 0) ? v : 3;
  }
  // Three-tier plug state (off/active-standby/running-with-load), shared by
  // the room panel's switch rows and the "on now" list so they never
  // disagree — see discovery.js's classifySwitchPower for the level rules.
  // `level: null` (no usable power sensor on this switch's device) falls
  // back to the plain binary reading unchanged from v1.5.3 — a switch with
  // no way to know more isn't a problem to flag.
  plugStatus(switchId, powerId) {
    if (!this.discovery) return { level: null, watts: null, on: this.isOn(switchId), sub: this.isOn(switchId) ? this.t('switch.running') : this.t('switch.off') };
    const c = this.discovery.classifySwitchPower(this.state.st, switchId, powerId, this.plugThresholdW());
    let sub;
    if (c.level === 'running') sub = this.t('switch.running') + ' · ' + this.powerVal(powerId);
    else if (c.level === 'active') sub = this.t('switch.active');
    else sub = c.relayOn ? this.t('switch.running') : this.t('switch.off');
    return { level: c.level, watts: c.watts, on: c.relayOn, sub };
  }
  // v1.8.1 — the single point every service call goes through, so every
  // one can be logged (Diagnostica → Recent actions, the ring buffer a
  // support issue is now asked to paste) and every failure can reach the
  // screen (the toast below). Previously fire-and-forget: `this.be.call()`
  // was invoked but its promise never read, so a real timeout or a
  // rejected service call and a genuine success were indistinguishable
  // from here — reported as "the buttons don't respond, no console
  // errors" because nothing ever surfaced the rejection at all. This
  // always resolves (never rejects) precisely so it stays safe to call
  // fire-and-forget exactly like before, for the many call sites in this
  // file that still do.
  call(domain, service, data) {
    if (!this.be) return Promise.resolve({ ok: false, outcome: 'error', error: 'backend not ready' });
    const rawId = data && (data.entity_id !== undefined ? data.entity_id : (data.target && data.target.entity_id));
    const entityLabel = Array.isArray(rawId) ? rawId.join(', ') : (rawId || null);
    const entry = { t: Date.now(), domain, service, entity_id: entityLabel, outcome: 'pending', error: null, ms: null };
    this._actionLog = [entry].concat(this._actionLog).slice(0, 20);
    this.setState({ actionLogTick: Date.now() });
    const start = Date.now();
    return Promise.resolve(this.be.call(domain, service, data)).then(
      () => {
        entry.outcome = 'ok';
        entry.ms = Date.now() - start;
        this.setState({ actionLogTick: Date.now() });
        return { ok: true };
      },
      (err) => {
        // .code, not the error message text — ha-backend-panel.js's real
        // 15s timeout (and the demo's `call-timeout` scenario) both set
        // it explicitly for exactly this comparison.
        entry.outcome = (err && err.code === 'timeout') ? 'timeout' : 'error';
        entry.error = (err && err.message) || String(err);
        entry.ms = Date.now() - start;
        this.setState({ actionLogTick: Date.now() });
        this._showActionToast(entityLabel, entry.outcome);
        return { ok: false, outcome: entry.outcome, error: entry.error };
      }
    );
  }
  // Toast on failure only — a successful action is already visible in the
  // state that just changed, so a toast there would just be noise. One at
  // a time: a new failure replaces whatever toast is already showing and
  // restarts the 6s auto-close, rather than queuing.
  _showActionToast(entityLabel, outcome) {
    const firstId = entityLabel ? entityLabel.split(',')[0].trim() : null;
    const name = firstId ? this.fn(firstId) : this.t('toast.genericTarget');
    const reason = outcome === 'timeout' ? this.t('toast.timeout') : this.t('toast.error');
    if (this._toastTimer) clearTimeout(this._toastTimer);
    this.setState({ toast: { text: name + ' — ' + reason } });
    this._toastTimer = setTimeout(() => { this._toastTimer = null; this.setState({ toast: null }); }, 6000);
  }
  cover(id, service, extra) { this.call('cover', service, Object.assign({ entity_id: id }, extra || {})); }
  // Generic "run this valve for N minutes" for irrigation zones: two
  // standard switch calls (no per-duration helper entity required in HA),
  // plus (v1.8.1) a persisted deadline so the close isn't only a setTimeout
  // living in this one tab — see _checkIrrigationEnds().
  runValve(id, minutes) {
    const started = this.call('switch', 'turn_on', { entity_id: id });
    setTimeout(() => this.call('switch', 'turn_off', { entity_id: id }), minutes * 60000);
    return started.then((res) => {
      if (res && res.ok) {
        const endsAt = Date.now() + minutes * 60000;
        const next = Object.assign({}, this.state.irrigationEnds, { [id]: endsAt });
        this.setState({ irrigationEnds: next });
        window.CasaPrefs.saveIrrigationEnds(this.be, next).catch(() => {});
      }
      return res;
    });
  }
  // The persisted-deadline side of runValve(): every 15s (piggybacked on
  // the tick componentDidMount already runs) and once at boot, close any
  // valve whose time is up — from *whichever* client happens to be open,
  // not only the one that started it — and drop any entry whose valve
  // turns out to already be off (closed by hand, by HA, or by the fast-path
  // setTimeout above). _irrigationLastClosed is read-only bookkeeping for
  // the Diagnostica row below; it's never persisted, so it only covers
  // auto-closes this session actually witnessed.
  // `endsOverride`: setState isn't guaranteed synchronous in this
  // framework, so a caller that just set irrigationEnds (namely
  // _loadIrrigationEnds(), right after its own setState) passes the fresh
  // value directly instead of risking a read of the pre-setState state.
  _checkIrrigationEnds(endsOverride) {
    const ends = endsOverride || this.state.irrigationEnds || {};
    const ids = Object.keys(ends);
    if (!ids.length) return;
    const next = Object.assign({}, ends);
    const now = Date.now();
    let changed = false;
    for (const id of ids) {
      const st = this.s(id);
      if (st === 'off') { this._irrigationClosing.delete(id); delete next[id]; changed = true; continue; }
      if (st === 'on' && now >= next[id] && !this._irrigationClosing.has(id)) {
        this._irrigationClosing.add(id);
        this.call('switch', 'turn_off', { entity_id: id }).then(() => this._irrigationClosing.delete(id));
        this._irrigationLastClosed = Object.assign({}, this._irrigationLastClosed, { [id]: now });
        delete next[id];
        changed = true;
      }
    }
    if (changed) {
      this.setState({ irrigationEnds: next });
      window.CasaPrefs.saveIrrigationEnds(this.be, next).catch(() => {});
    }
  }

  spark(arr, w, h) {
    if (!arr || !arr.length) return '';
    const lo = Math.min.apply(null, arr), hi = Math.max.apply(null, arr);
    const span = hi - lo || 1;
    return arr.map((v, i) => {
      const x = (i / (arr.length - 1)) * w;
      const y = h - ((v - lo) / span) * (h - 4) - 2;
      return x.toFixed(1) + ',' + y.toFixed(1);
    }).join(' ');
  }

  // `href` on <use>, `src` on <img>, `points` on <polyline> are acted on by
  // the browser's native HTML parser the instant it's parsed — even inert-
  // looking template text like "{{ m.icon }}" gets treated as a literal
  // URL/geometry value and acted on immediately (confirmed empirically:
  // network requests for these fire ~30ms after navigation start, and a
  // malformed `points` value logs a console error — both well before this
  // component ever mounts, and unaffected by the `x-dc{display:none}` rule
  // support.js already injects, which does stop CSS-driven fetches like a
  // background-image but not these). The fix is to never write these
  // attribute names with `{{ }}` in the raw markup at all: the markup
  // (via `ref="{{ xRef }}"`) omits the real attribute entirely, and this
  // callback sets it imperatively once React has mounted a real node with
  // a real value to give it.
  // v1.9.0 — idempotent: the ref runs again on every render (a new arrow
  // each time), and re-setting `src` to the *same* value still restarts an
  // <img>/<video> load. On a camera whose snapshot takes seconds, that
  // aborted every load before it finished — nothing ever showed.
  _bindAttr(name, value) {
    return (el) => {
      if (!el) return;
      if (value == null || value === '') { if (el.hasAttribute(name)) el.removeAttribute(name); }
      else if (el.getAttribute(name) !== String(value)) el.setAttribute(name, value);
    };
  }

  // Rooms come from Home Assistant's area/device/entity registries (see
  // discovery.js), not from a hardcoded list — config.rooms only tunes the
  // result (order/hide/max/icons). No discovery yet (still booting) or no
  // registries available at all -> empty, same as "no rooms configured".
  ROOMS_RESULT() {
    if (!this.discovery) return { rooms: [], overflow: [] };
    const prefs = this.PREFS(), ch = this.CONFIG_HIDDEN(), d = this.discovery;
    return d.discoverRooms(this.state.st, this.registries, this.cfg, {
      isHidden: (r) => !d.resolveVisible(r.id, prefs.rooms, ch.rooms),
      order: (prefs.order && prefs.order.rooms && prefs.order.rooms.length) ? prefs.order.rooms : undefined
    });
  }

  // --- settings panel (v1.5.0) — visibility resolution glue -----------------
  // The three-state formula itself (config.js vs. the panel's per-user
  // overrides) lives in discovery.js (resolveVisible), shared with the
  // mobile layout; these just read this.state.prefs/this.cfg and hand
  // discovery.js what it needs, the same instance-field-reading pattern
  // ROOMS_RESULT()/ALARM_ID()/etc. already use.
  PREFS() { return this.state.prefs || { v: 1 }; }
  CONFIG_HIDDEN() {
    const cfg = this.cfg;
    return {
      rooms: new Set(((cfg.rooms && cfg.rooms.hide) || []).map(String)),
      entities: new Set((cfg.entities && cfg.entities.hide) || []),
      cameras: new Set((cfg.cameras && cfg.cameras.hide) || []),
      modules: new Set((cfg.modules && cfg.modules.hide) || [])
    };
  }
  MODULE_VISIBLE(key) {
    if (!this.discovery) return true;
    return this.discovery.resolveVisible(key, this.PREFS().modules, this.CONFIG_HIDDEN().modules);
  }
  // Duck-typed as a Set (`.has(id)`) rather than materialized, since there's
  // no fixed universe of entity ids to enumerate up front — applyEntityVisibility
  // (discovery.js) only ever calls `.has()`.
  ENTITY_HIDDEN_SET() {
    const prefs = this.PREFS(), ch = this.CONFIG_HIDDEN(), d = this.discovery;
    return { has: (id) => !!d && !d.resolveVisible(id, prefs.entities, ch.entities) };
  }
  // Persists immediately on every toggle (no separate save step, matching
  // every other control in this app) — fire-and-forget against the backend,
  // `prefsStorage` updated from whichever storage actually ended up used.
  SAVE_PREFS(prefs) {
    this.setState({ prefs });
    if (this.be) {
      window.CasaPrefs.save(this.be, prefs).then((storage) => this.setState({ prefsStorage: storage }));
    }
  }

  // Long-press-to-hide (600ms) / right-click, delegated at the room-panel
  // drawer level rather than bound per-row: every row (lights/switches/
  // appliances/sensors/media/extras) carries a `data-entity-id` attribute
  // instead of its own three event handlers — one set of handlers here
  // covers all of them, and covers new row kinds for free if any are ever
  // added. `e.target.closest(...)` finds which row (if any) the press/click
  // landed on; presses on the drawer's padding/header are ignored (closest
  // returns null). Covers don't carry `data-entity-id` (v1.5.2): the row
  // holds the position slider, the dashboard's most frequent continuous
  // drag, and a stray long-press mid-drag used to fire the hide-entity menu
  // instead of a position change — removed rather than merely guarded,
  // since hiding a cover is already one tap away in the settings panel.
  _lpEntityId(e) {
    const el = e.target && e.target.closest && e.target.closest('[data-entity-id]');
    return el ? el.getAttribute('data-entity-id') : null;
  }
  // A drag is not a long-press: `pointermove` past a 10px threshold from
  // the `pointerdown` origin cancels the pending timer, same as `pointerup`
  // or `pointercancel` (Android fires the latter once it takes the gesture
  // over for scrolling). Once cancelled it stays cancelled for the rest of
  // this gesture — the timer is only re-armed on the next `pointerdown`.
  _panelLpDown(e) {
    const id = this._lpEntityId(e);
    if (!id) { this._lpOrigin = null; return; }
    if (this._lpTimer) clearTimeout(this._lpTimer);
    this._lpOrigin = { x: e.clientX, y: e.clientY };
    this._lpTimer = setTimeout(() => { this._lpTimer = null; this.setState({ longMenu: id }); }, 600);
  }
  _panelLpMove(e) {
    if (!this._lpTimer || !this._lpOrigin) return;
    if (Math.hypot(e.clientX - this._lpOrigin.x, e.clientY - this._lpOrigin.y) > 10) {
      clearTimeout(this._lpTimer);
      this._lpTimer = null;
    }
  }
  _panelLpUp() {
    if (this._lpTimer) { clearTimeout(this._lpTimer); this._lpTimer = null; }
    this._lpOrigin = null;
  }
  _panelLpMenu(e) {
    const id = this._lpEntityId(e);
    if (!id) return;
    e.preventDefault();
    this._panelLpUp();
    this.setState({ longMenu: id });
  }

  // --- settings panel (v1.5.0) — mutation helpers ---------------------------
  // Every one of these reads-modifies-saves this.state.prefs in one shot —
  // no separate "dirty" step, matching how every other control in this app
  // already persists (a light switch calls a service the instant it's
  // tapped, not on some later "save" action).
  SETTINGS_SET_ROOM(id, val) {
    const p = this.PREFS();
    this.SAVE_PREFS(Object.assign({}, p, { rooms: Object.assign({}, p.rooms, { [id]: val }) }));
  }
  SETTINGS_CLEAR_ROOM(id) {
    const p = this.PREFS();
    const rooms = Object.assign({}, p.rooms); delete rooms[id];
    this.SAVE_PREFS(Object.assign({}, p, { rooms }));
  }
  SETTINGS_MOVE_ROOM(orderIds, id, dir) {
    const idx = orderIds.indexOf(id);
    const j = idx + dir;
    if (idx < 0 || j < 0 || j >= orderIds.length) return;
    const next = orderIds.slice();
    const tmp = next[idx]; next[idx] = next[j]; next[j] = tmp;
    const p = this.PREFS();
    this.SAVE_PREFS(Object.assign({}, p, { order: Object.assign({}, p.order, { rooms: next }) }));
  }
  // Casa home section order (v1.7.0) — alarm/energy/cameras, the three cards
  // that already appear as a linear stack on both desktop and mobile. Rooms
  // and onNow/quick-actions stay fixed on both formats and aren't part of
  // this. `config.js`'s cfg.sections.order proposes an installation default;
  // the panel's prefs.order.sections overrides it per user (same hierarchy
  // as visibility) and is fused with the default via mergeSectionOrder so a
  // section missing from a saved list lands next to its default neighbours,
  // not at the end.
  SECTION_ORDER_DEFAULT_RESOLVED() {
    if (!this.discovery) return ['alarm', 'energy', 'cameras'];
    const cfgOrder = ((this.cfg.sections && this.cfg.sections.order) || [])
      .filter((id) => this.discovery.SECTION_ORDER_DEFAULT.includes(id));
    return cfgOrder.length ? this.discovery.mergeSectionOrder(cfgOrder, this.discovery.SECTION_ORDER_DEFAULT) : this.discovery.SECTION_ORDER_DEFAULT;
  }
  SECTION_ORDER() {
    if (!this.discovery) return ['alarm', 'energy', 'cameras'];
    const base = this.SECTION_ORDER_DEFAULT_RESOLVED();
    const saved = (this.PREFS().order && this.PREFS().order.sections) || [];
    return saved.length ? this.discovery.mergeSectionOrder(saved, base) : base;
  }
  SETTINGS_MOVE_SECTION(orderIds, id, dir) {
    const idx = orderIds.indexOf(id);
    const j = idx + dir;
    if (idx < 0 || j < 0 || j >= orderIds.length) return;
    const next = orderIds.slice();
    const tmp = next[idx]; next[idx] = next[j]; next[j] = tmp;
    const p = this.PREFS();
    this.SAVE_PREFS(Object.assign({}, p, { order: Object.assign({}, p.order, { sections: next }) }));
  }
  SETTINGS_RESET_SECTIONS() {
    const p = this.PREFS();
    const order = Object.assign({}, p.order); delete order.sections;
    this.SAVE_PREFS(Object.assign({}, p, { order }));
    this.setState({ sectionResetConfirm: false });
  }
  SETTINGS_SET_ENTITY(id, val) {
    const p = this.PREFS();
    this.SAVE_PREFS(Object.assign({}, p, { entities: Object.assign({}, p.entities, { [id]: val }) }));
  }
  SETTINGS_CLEAR_ENTITY(id) {
    const p = this.PREFS();
    const entities = Object.assign({}, p.entities); delete entities[id];
    this.SAVE_PREFS(Object.assign({}, p, { entities }));
  }
  SETTINGS_SET_CAMERA(id, val) {
    const p = this.PREFS();
    this.SAVE_PREFS(Object.assign({}, p, { cameras: Object.assign({}, p.cameras, { [id]: val }) }));
  }
  SETTINGS_CLEAR_CAMERA(id) {
    const p = this.PREFS();
    const cameras = Object.assign({}, p.cameras); delete cameras[id];
    this.SAVE_PREFS(Object.assign({}, p, { cameras }));
  }
  // hideUntilTap is a flat array, not a three-state map (see discovery.js's
  // discoverCameras comment) — once this key exists at all (even empty), it
  // fully replaces config.js's own hideUntilTap list.
  SETTINGS_TOGGLE_TAPGATE(id, cfgTapGatedList) {
    const p = this.PREFS();
    const cur = p.hideUntilTap !== undefined ? p.hideUntilTap : cfgTapGatedList;
    const now = cur.includes(id);
    const next = now ? cur.filter((x) => x !== id) : cur.concat([id]);
    this.SAVE_PREFS(Object.assign({}, p, { hideUntilTap: next }));
  }
  SETTINGS_SET_MODULE(key, val) {
    const p = this.PREFS();
    this.SAVE_PREFS(Object.assign({}, p, { modules: Object.assign({}, p.modules, { [key]: val }) }));
  }
  // 'auto' | 'w' | 'kw' — read by powerVal(). Daily kWh totals are untouched
  // by this setting; only instantaneous power display honors it.
  SETTINGS_SET_POWER_UNIT(unit) {
    const p = this.PREFS();
    this.SAVE_PREFS(Object.assign({}, p, { powerUnit: unit }));
  }
  // Watts — read by plugStatus() (see discovery.js's classifySwitchPower).
  SETTINGS_SET_PLUG_THRESHOLD(watts) {
    const p = this.PREFS();
    this.SAVE_PREFS(Object.assign({}, p, { plugThreshold: watts }));
  }
  // 'charge' | 'discharge' — which sign a single signed battery-power sensor
  // uses for charging. Only meaningful when config.energy.battery.power is
  // set and chargePower/dischargePower aren't (see deriveConsumption()) —
  // two separate always-positive sensors need no convention at all.
  batteryPowerSign() {
    const v = this.PREFS().batteryPowerSign;
    return v === 'discharge' ? 'discharge' : 'charge';
  }
  SETTINGS_SET_BATTERY_SIGN(sign) {
    const p = this.PREFS();
    this.SAVE_PREFS(Object.assign({}, p, { batteryPowerSign: sign === 'discharge' ? 'discharge' : 'charge' }));
  }
  SETTINGS_RESET() { this.SAVE_PREFS({ v: 1 }); }
  SETTINGS_LONG_HIDE(id) {
    this.SETTINGS_SET_ENTITY(id, false);
    this.setState({ longMenu: null });
  }

  // Unfiltered by visibility (isHidden always false) — screen 1 needs to
  // list every room, hidden or not, so a hidden one still has a row with a
  // switch to un-hide it. Order still respects the panel's own reorder
  // override when present, same as the live ROOMS_RESULT().
  ALL_ROOMS_RESULT() {
    if (!this.discovery) return { rooms: [], overflow: [] };
    const prefs = this.PREFS(), d = this.discovery;
    return d.discoverRooms(this.state.st, this.registries, this.cfg, {
      isHidden: () => false,
      order: (prefs.order && prefs.order.rooms && prefs.order.rooms.length) ? prefs.order.rooms : undefined
    });
  }
  // Same reasoning for cameras: screen 1 needs every camera, not just the
  // ones currently visible on the live dashboard.
  ALL_CAMERAS_RESULT() {
    if (!this.discovery) return [];
    return this.discovery.discoverCameras(this.state.st, this.registries, this.cfg, { isHidden: () => false, isTapGated: () => false });
  }

  // --- Diagnostica panel (v1.5.1) --------------------------------------------
  // Three independent read-only reports, each tolerant of everything it
  // reads being at its pre-boot default — this screen exists specifically
  // for when discovery/backend/config didn't come up cleanly, so it can
  // never assume the happy path already ran.

  // One row per instantaneous energy role. Exactly four verdicts:
  // 'ok' · 'unconfigured' · 'missing' (id not a key in states — a refuso,
  // almost always) · 'unavailable' (exists but unavailable/unknown). The
  // kWh-on-a-power-role check rides along as `unitWarn` on an otherwise-'ok'
  // row rather than as a fifth verdict.
  diagEnergyInstant() {
    const en = this.cfg.energy || {};
    const roles = [
      ['production', en.production], ['consumption', en.consumption],
      ['gridImport', en.gridImport], ['gridExport', en.gridExport],
      ['battery.power', en.battery && en.battery.power], ['battery.soc', en.battery && en.battery.soc],
      ['inverterStatus', en.inverterStatus]
    ];
    return roles.map(([role, id]) => {
      if (!id) return { role, id: null, valueLabel: '—', verdict: 'unconfigured', unitWarn: false };
      if (!(id in this.state.st)) return { role, id, valueLabel: '—', verdict: 'missing', unitWarn: false };
      const s = this.s(id);
      if (s === 'unavailable' || s === 'unknown') return { role, id, valueLabel: s, verdict: 'unavailable', unitWarn: false };
      const isPowerRole = role !== 'battery.soc' && role !== 'inverterStatus';
      const unitWarn = isPowerRole && this.at(id, 'device_class') === 'energy';
      const valueLabel = isPowerRole ? this.powerVal(id) : (this.unit(id) ? this.val(id, 2) : s);
      return { role, id, valueLabel, verdict: 'ok', unitWarn };
    });
  }

  // Turns this.energyDiag (captured by _resolveEnergyDaily(), see there) into
  // rows — no re-resolution, just reading what's already been decided. Only
  // the three roles that function actually resolves (production/gridImport/
  // gridExport) — consumptionToday has no fallback-resolution behind it
  // today, same as the live ring/tiles.
  diagEnergyDaily() {
    const ed = this.energyDiag;
    if (!ed) return { prefsFailed: false, rows: [] };
    const rows = ['production', 'gridImport', 'gridExport'].map((role) => {
      const src = ed.source[role];
      const ids = src === 'config' ? (ed.cfgIds[role] ? [ed.cfgIds[role]] : []) : ed.resolvedIds[role];
      const counterWarn = ids.some((id) => this.at(id, 'state_class') === 'total_increasing' && !this.at(id, 'last_reset'));
      // config source is read live off the sensor's raw state (see renderVals
      // — `en.productionToday ? this.n(en.productionToday) : edDaily.prodToday`),
      // never through ed.values — that field only ever gets filled by the
      // ha-prefs/auto fallbacks, so reading it for a 'config' row would show
      // "—" on a sensor that's actually working fine.
      const value = src === 'config' ? (ids[0] ? this.n(ids[0]) : null) : ed.values[role];
      return { role, source: src, ids, value, counterWarn };
    });
    return { prefsFailed: ed.prefsFailed, rows };
  }

  // Which settings tab to land on when the panel opens (v1.5.3) — "diagnostics
  // reused, not rewritten": same verdicts diagEnergyInstant()/diagEnergyDaily()/
  // configDiag already compute, just reduced to a single yes/no per tab. Runs
  // at click time, before settingsOpen flips true, so it reads the diag
  // methods directly rather than the *Rows arrays renderVals() builds (those
  // only exist once the panel is already open). Tab order matches the
  // segmented control; Energia wins over Diagnostica when both have a
  // problem, since it comes first there. Rooms/cameras have no diagnosed
  // failure mode today, so they never contribute.
  _settingsProblemTab() {
    const instantBad = this.diagEnergyInstant().some((r) => r.verdict === 'missing' || r.verdict === 'unavailable' || r.unitWarn);
    const daily = this.diagEnergyDaily();
    const dailyBad = daily.prefsFailed || daily.rows.some((r) => r.counterWarn);
    if (instantBad || dailyBad || this.batterySignVerdict().suspect) return 'energia';
    const cd = this.configDiag;
    if (cd && cd.attempts.some((a) => a.loadScript && a.defined === false)) return 'diagnostica';
    return null;
  }

  diagEnvironment() {
    const roomsRes = this.ALL_ROOMS_RESULT(); // already null-guards on !this.discovery, above
    return {
      version: ASSET_V || null,
      backend: this.kind || null,
      insideIframe: window.parent !== window,
      embedIframe: this.panelEmbedIframe,
      install: this.panelInstall,
      lang: this.lang || null,
      areaCount: (this.registries.areas || []).length,
      entityCount: (this.registries.entities || []).length,
      roomCount: roomsRes.rooms.length + roomsRes.overflow.length,
      cameraCount: this.ALL_CAMERAS_RESULT().length,
      prefsOutcome: !this.energyDiag ? 'unknown' : this.energyDiag.prefsFailed ? 'failed' : 'ok',
      reactSource: window.CASA_REACT_SOURCE || null
    };
  }

  // Appliances (washer/dryer/...) have no generic HA domain, so unlike
  // rooms/lights/covers this is explicit config, matched to a room by
  // resolving `status`'s own area — see live_dashboard_config.example.js. `idleStates`
  // lets "off" mean whatever the integration's vocabulary uses for it
  // (a text sensor like "power_off", or a binary_sensor's "off").
  applianceState(a) {
    const DEFAULT_IDLE = ['off', 'power_off', 'idle', 'unavailable', 'unknown'];
    const stateRaw = this.s(a.status);
    const idle = (a.idleStates || DEFAULT_IDLE).indexOf(stateRaw) !== -1;
    const label = (a.stateLabels && a.stateLabels[stateRaw]) || stateRaw;
    return { stateRaw, idle, label };
  }

  applianceItems(roomId) {
    if (!this.discovery || !this.MODULE_VISIBLE('appliances')) return [];
    return (this.cfg.appliances || [])
      .filter((a) => this.discovery.resolveEntityArea(a.status, this.registries) === roomId)
      .map((a) => {
        const { idle, label } = this.applianceState(a);
        const energy = a.energyToday ? this.val(a.energyToday, 0) : null;
        const sub = idle
          ? (energy ? this.t('common.off') + ' · ' + this.t('appliance.energyToday', { val: energy }) : this.t('common.off'))
          : label;
        const applianceIcon = a.icon || '#i-wash';
        return {
          id: a.status, name: a.name, icon: applianceIcon, iconRef: this._bindAttr('href', applianceIcon), stroke: idle ? 'var(--tx2)' : 'var(--acc)', sub,
          hasPowerOff: !!a.powerSwitch,
          powerOff: a.powerSwitch ? () => this.call('switch', 'turn_off', { entity_id: a.powerSwitch }) : () => {}
        };
      });
  }

  roomSummary(r) {
    const bits = [];
    const lOn = (r.lights || []).filter((id) => this.isOn(id)).length;
    if ((r.lights || []).length) bits.push(lOn ? this.t('room.lightsOnCount', { n: lOn }) : this.t('room.lightsOff'));
    const cs = (r.covers || []).map((id) => this.at(id, 'current_position')).filter((p) => p !== undefined);
    if (cs.length === 1) bits.push(this.t('room.coverPct', { pct: cs[0] }));
    else if (cs.length > 1) {
      const open = cs.filter((p) => p > 0).length;
      bits.push(open ? this.t('room.coversOpenCount', { open, total: cs.length }) : this.t('room.coversClosed'));
    }
    // Room summary says "X in corso", so it must mean the same thing the
    // room panel's "in funzione" does (v1.5.4): a plug merely energized at
    // standby isn't "in corso" any more than an appliance that's plugged in
    // but off is. No power sensor at all -> level stays null -> falls back
    // to the old plain-relay reading, unchanged from v1.5.3.
    (r.switches || []).forEach((sw) => {
      const plug = this.plugStatus(sw[0], sw[3]);
      if (plug.level === 'running' || (plug.level === null && plug.on)) bits.push(this.t('room.switchRunning', { name: sw[1] }));
    });
    if ((r.media || []).some((id) => this.s(id) === 'playing')) bits.push(this.t('room.tvOn'));
    if ((r.vacuum || []).some((v) => this.s(v[0]) === 'cleaning')) bits.push(this.t('room.vacuumRunning'));
    (this.MODULE_VISIBLE('appliances') ? (this.cfg.appliances || []) : []).forEach((a) => {
      if (this.discovery && this.discovery.resolveEntityArea(a.status, this.registries) === r.id && !this.applianceState(a).idle) {
        bits.push(this.t('room.switchRunning', { name: a.name }));
      }
    });
    return bits.slice(0, 2).join(' · ') || this.t('room.nothingActive');
  }

  ALARM_ID() { return this.discovery ? this.discovery.discoverAlarm(this.state.st, this.cfg, this.registries) : null; }

  ALARM(id) {
    const s = this.s(id);
    const map = {
      disarmed: [this.t('alarm.disarmed'), 'ok'], armed_home: [this.t('alarm.armedHome'), 'warn'],
      armed_away: [this.t('alarm.armedAway'), 'warn'], armed_night: [this.t('alarm.armedNight'), 'warn'],
      armed_vacation: [this.t('alarm.armedVacation'), 'warn'],
      arming: [this.t('alarm.arming'), 'warn'], pending: [this.t('alarm.pending'), 'alert'], triggered: [this.t('alarm.triggered'), 'alert']
    };
    return map[s] || [s, 'warn'];
  }

  // v2 — Settings panel + Diagnostica view-model (v1.5.0 / v1.5.1 and
  // later additions), shared by both layouts: until v2 each page's
  // renderVals carried its own copy. `ctx` = the renderVals locals this
  // block reads; the returned names are the ones the templates use.
  vmSettingsDiag(ctx) {
    const { hasAlarm, alarmId, alarmNeedsCodeArm, alarmNeedsCodeDisarm, supp, batterySign, camList, consumptionDisplayWatts, en, gridT, prodT, hasEnergy, hasNewRing, irrZones } = ctx;
    // --- settings panel (v1.5.0) --------------------------------------------
    // Screen 1 (rooms/cameras/sections) and screen 2 (one room's entity
    // catalog) are only computed while the drawer is actually open — cheap
    // insurance against doing this work on every 15s clock tick otherwise.
    const prefsNow = this.PREFS();
    const chNow = this.CONFIG_HIDDEN();
    let settingsRooms = [], settingsCameras = [], settingsModules = [], settingsSectionOrder = [], settingsRoomDetail = null;
    let doExport = () => {};
    if (this.state.settingsOpen && this.discovery) {
      const d = this.discovery;
      const allRoomsRes = this.ALL_ROOMS_RESULT();
      const allRoomsList = allRoomsRes.rooms.concat(allRoomsRes.overflow);
      const roomOrderIds = allRoomsList.map((r) => r.id);
      const allCamsList = this.ALL_CAMERAS_RESULT();
      const camCfgNow = this.cfg.cameras || {};
      const cfgTapGatedList = (camCfgNow.hideUntilTap || []).map(String);
      // "diverso dal config": only when the panel's override actually
      // changes the outcome vs. config.js alone — a redundant override that
      // happens to agree with config.js is not shown as a mismatch.
      const diffFrom = (prefsMap, key, configHiddenSet) =>
        !!prefsMap && Object.prototype.hasOwnProperty.call(prefsMap, key) && prefsMap[key] !== !configHiddenSet.has(key);

      settingsRooms = allRoomsList.map((r, idx) => {
        const visible = d.resolveVisible(r.id, prefsNow.rooms, chNow.rooms);
        const total = (r.catalog || []).length;
        const hidden = (r.catalog || []).filter((e) => !d.resolveVisible(e.id, prefsNow.entities, chNow.entities)).length;
        const diff = diffFrom(prefsNow.rooms, r.id, chNow.rooms);
        const canUp = idx > 0, canDown = idx < allRoomsList.length - 1;
        return {
          id: r.id, name: r.name, icon: r.icon, iconRef: this._bindAttr('href', r.icon),
          stroke: visible ? 'var(--acc)' : 'var(--tx2)',
          countLabel: this.t('settings.entityCount', { n: total, m: hidden }),
          visible, toggle: () => this.SETTINGS_SET_ROOM(r.id, !visible),
          thumbLeft: visible ? '20px' : '2px', thumbColor: visible ? 'var(--acc)' : 'var(--nu-d)',
          diff, diffOff: !diff, clearDiff: (e) => { if (e) e.stopPropagation(); this.SETTINGS_CLEAR_ROOM(r.id); },
          upOpacity: canUp ? '1' : '.35', downOpacity: canDown ? '1' : '.35',
          up: () => this.SETTINGS_MOVE_ROOM(roomOrderIds, r.id, -1),
          down: () => this.SETTINGS_MOVE_ROOM(roomOrderIds, r.id, 1),
          open: () => this.setState({ settingsRoom: r.id })
        };
      });

      settingsCameras = allCamsList.map((c) => {
        const visible = d.resolveVisible(c.id, prefsNow.cameras, chNow.cameras);
        const tapGated = prefsNow.hideUntilTap !== undefined ? prefsNow.hideUntilTap.includes(c.id) : cfgTapGatedList.includes(c.id);
        const diff = diffFrom(prefsNow.cameras, c.id, chNow.cameras);
        return {
          id: c.id, name: c.name, area: c.area,
          visible, toggle: () => this.SETTINGS_SET_CAMERA(c.id, !visible),
          thumbLeft: visible ? '20px' : '2px',
          diff, diffOff: !diff, clearDiff: () => this.SETTINGS_CLEAR_CAMERA(c.id),
          tapGated, toggleTapGate: () => this.SETTINGS_TOGGLE_TAPGATE(c.id, cfgTapGatedList)
        };
      });

      // Module labels reuse existing tab/static strings instead of adding a
      // parallel set of translations — "Sorveglianza"/"Elettrodomestici" etc.
      // already exist as tab.cameras / S.appliances.
      const moduleLabels = { energy: this.t('tab.energy'), irrigation: this.t('tab.irrigation'), cameras: this.t('tab.cameras'),
        appliances: this.strings.appliances, vehicle: this.t('tab.vehicle') };
      settingsModules = window.CasaDiscovery.MODULE_KEYS.map((key) => {
        const active = d.resolveVisible(key, prefsNow.modules, chNow.modules);
        return { key, label: moduleLabels[key], active, toggle: () => this.SETTINGS_SET_MODULE(key, !active) };
      });

      // Casa home section order (v1.7.0) — same row pattern as settingsRooms
      // above, without the visibility toggle: alarm has none at all (it only
      // ever shows when an alarm entity exists), and energy/cameras already
      // have theirs in the "Sezioni" pill list right below. `dim` here is
      // read-only feedback, not a control.
      const sectionMeta = {
        alarm: { label: this.strings.alarm, icon: '#i-shield', dim: !hasAlarm },
        energy: { label: this.strings.solar, icon: '#i-solar', dim: !d.resolveVisible('energy', prefsNow.modules, chNow.modules) },
        cameras: { label: this.strings.surveillance, icon: '#i-cam', dim: !d.resolveVisible('cameras', prefsNow.modules, chNow.modules) }
      };
      const sectionOrderIds = this.SECTION_ORDER();
      settingsSectionOrder = sectionOrderIds.map((id, idx) => {
        const m = sectionMeta[id];
        const canUp = idx > 0, canDown = idx < sectionOrderIds.length - 1;
        return {
          id, label: m.label, iconRef: this._bindAttr('href', m.icon), dimOpacity: m.dim ? '.45' : '1',
          upOpacity: canUp ? '1' : '.35', downOpacity: canDown ? '1' : '.35',
          up: () => this.SETTINGS_MOVE_SECTION(sectionOrderIds, id, -1),
          down: () => this.SETTINGS_MOVE_SECTION(sectionOrderIds, id, 1)
        };
      });

      if (this.state.settingsRoom) {
        const r = allRoomsList.find((x) => x.id === this.state.settingsRoom);
        if (r) {
          const entities = (r.catalog || []).map((e) => {
            const visible = d.resolveVisible(e.id, prefsNow.entities, chNow.entities);
            const reason = e.reasonKind === 'domain'
              ? this.t('settings.reasonDomain', { domain: e.reasonValue })
              : this.t('settings.reasonDeviceClass', { dc: e.reasonValue });
            const diff = diffFrom(prefsNow.entities, e.id, chNow.entities);
            return {
              id: e.id, name: e.name, reason, visible, nameColor: visible ? 'var(--tx)' : 'var(--tx2)',
              toggle: () => this.SETTINGS_SET_ENTITY(e.id, !visible), thumbLeft: visible ? '20px' : '2px',
              diff, diffOff: !diff, clearDiff: () => this.SETTINGS_CLEAR_ENTITY(e.id)
            };
          }).sort((a, b) => a.name.localeCompare(b.name));
          settingsRoomDetail = { id: r.id, name: r.name, icon: r.icon, iconRef: this._bindAttr('href', r.icon), entities, hasEntities: entities.length > 0 };
        }
      }

      // "Esporta come config.js": a plain-object snapshot of cfg with every
      // resolved hide/order list substituted in (discovery.js's
      // buildExportedConfig), serialized and offered for clipboard copy —
      // never written to disk, this page has no way to do that (see the
      // v1.5.0 spec's "Esporta come config.js" section).
      doExport = async () => {
        const known = {
          roomIds: allRoomsList.map((r) => r.id),
          entityIds: Array.from(new Set(allRoomsList.reduce((acc, r) => acc.concat((r.catalog || []).map((e) => e.id)), []))),
          cameraIds: allCamsList.map((c) => c.id)
        };
        const text = window.CasaPrefs.exportText(this.cfg, prefsNow, known);
        const copied = await window.CasaPrefs.copyToClipboard(text);
        this.setState({ exportSheet: { text, copied } });
      };
    }

    // --- diagnostics panel (v1.5.1) -----------------------------------------
    // Deliberately its own `if`, not folded into the block above: that one
    // is gated on `this.discovery` because rooms/cameras/modules have
    // nothing to show without it, but Diagnostica's whole reason to exist is
    // explaining *why* discovery/config/energy resolution came up empty —
    // it must compute regardless of whether any of that succeeded. Still
    // gated on `settingsOpen` alone, same "don't redo this on every 15s
    // clock tick" reasoning as the block above.
    let diagConfigAttempts = [], diagConfigSummary = '', diagConfigOutsideIframe = false;
    let diagEnergyInstantRows = [], diagEnergyDailyRows = [], diagPrefsFailed = false, diagEnvRows = [];
    let diagActionRows = [], hasDiagActions = false, diagIrrigationRows = [], hasDiagIrrigationRows = false;
    let diagCameraRows = [], diagRingValue = '', diagHourlyValue = '', diagAlarmRows = [];
    let diagReasonGroups = [], diagReasonTotalLabel = '', hasDiagReasonGroups = false, diagHasHighSeverityReason = false;
    let hasDiagDuplicateDevices = false, diagDuplicateDevices = [], diagDuplicateDevicesTitle = '';
    let doDiag = () => {};
    let settingsTabs = [], powerUnitOptions = [], plugThresholdOptions = [];
    let showBatterySignControl = false, batterySignOptions = [], batterySignLiveLabel = '', batterySignSuspect = false, batterySignInvert = () => {};
    if (this.state.settingsOpen) {
      const S = this.strings;
      const roleLabelKeys = { production: 'diagRoleProduction', consumption: 'diagRoleConsumption', gridImport: 'diagRoleGridImport', gridExport: 'diagRoleGridExport',
        'battery.power': 'diagRoleBatteryPower', 'battery.soc': 'diagRoleBatterySoc', inverterStatus: 'diagRoleInverterStatus' };
      const verdictLabelKeys = { ok: 'diagVerdictOk', unconfigured: 'diagVerdictUnconfigured', missing: 'diagVerdictMissing', unavailable: 'diagVerdictUnavailable' };
      const sourceLabelKeys = { config: 'diagSourceConfig', 'ha-prefs': 'diagSourceHaPrefs', auto: 'diagSourceAuto' };

      const cd = this.configDiag;
      diagConfigAttempts = cd ? cd.attempts.map((a) => ({
        path: a.path,
        verdictLabel: a.defined === null ? S.diagConfigVerdictMissing : a.defined ? S.diagConfigVerdictOk : S.diagConfigVerdictNotExecuted,
        tone: a.loadScript && a.defined === false ? 'warn' : ''
      })) : [];
      const notExecuted = !!cd && !cd.resolvedPath && cd.attempts.some((a) => a.loadScript && a.defined === false);
      diagConfigSummary = !cd ? '' : cd.source === 'ha' ? this.t('diag.configFromHa', { when: this._fmtStamp(cd.shared && cd.shared.updated_at), who: (cd.shared && cd.shared.updated_by) || '—' })
        : cd.resolvedPath ? this.t('diag.configResolved', { path: cd.resolvedPath }) : notExecuted ? S.diagConfigNotExecutedMsg : S.diagConfigNotFound;
      diagConfigOutsideIframe = !!cd && !cd.insideIframe;

      diagEnergyInstantRows = this.diagEnergyInstant().map((r) => ({
        role: r.role, roleLabel: S[roleLabelKeys[r.role]],
        idLabel: r.id || S.diagNotConfiguredLabel,
        valueLabel: r.valueLabel, verdictLabel: S[verdictLabelKeys[r.verdict]],
        tone: (r.verdict === 'missing' || r.verdict === 'unavailable') ? 'warn' : '',
        unitWarn: r.unitWarn
      }));

      const dailyRaw = this.diagEnergyDaily();
      diagPrefsFailed = dailyRaw.prefsFailed;
      diagEnergyDailyRows = dailyRaw.rows.map((r) => ({
        role: r.role, roleLabel: S[roleLabelKeys[r.role]],
        sourceLabel: r.source ? S[sourceLabelKeys[r.source]] : S.diagSourceNone,
        idsLabel: r.ids.length ? r.ids.join(' + ') : S.diagNotConfiguredLabel,
        valueLabel: r.value == null ? '—' : this.dec(r.value, 2) + ' kWh',
        counterWarn: r.counterWarn
      }));

      // Recent actions (v1.8.1) — the ring buffer call() maintains, turned
      // into rows. Placed above Environment both here and in the copy-
      // diagnostics text (prefs.js's diagText) — this is the section a
      // support issue is asked to paste, so it should be the first thing a
      // reader hits, not buried under config/energy diagnostics that were
      // already fine on the reporting install.
      const outcomeLabel = (o) => o === 'ok' ? S.diagActionOk : o === 'timeout' ? S.diagActionTimeout : o === 'error' ? S.diagActionError : S.diagActionPending;
      diagActionRows = this._actionLog.map((e) => ({
        time: new Date(e.t).toLocaleTimeString(this.lang === 'it' ? 'it-IT' : 'en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        domainService: e.domain + '.' + e.service,
        entityId: e.entity_id || '—',
        outcome: e.outcome,
        outcomeLabel: outcomeLabel(e.outcome),
        tone: (e.outcome === 'error' || e.outcome === 'timeout') ? 'warn' : '',
        msLabel: e.ms != null ? e.ms + 'ms' : '—'
      }));
      hasDiagActions = true;

      // Irrigation (v1.8.1) — one row per zone that has something to
      // report: an active deadline, or one this session watched expire.
      // Zones with neither (never run, or `buttons`-only — see runValve's
      // comment) contribute nothing, same "only what's actionable" spirit
      // as the discard-reason groups above.
      const hhmm = (ms) => new Date(ms).toLocaleTimeString(this.lang === 'it' ? 'it-IT' : 'en-GB', { hour: '2-digit', minute: '2-digit' });
      diagIrrigationRows = irrZones.filter((z) => z.valve).map((z) => {
        const endsAt = (this.state.irrigationEnds || {})[z.valve];
        const lastClosed = this._irrigationLastClosed[z.valve];
        if (endsAt != null) return { name: z.name, value: this.t('irrigation.diagEndsAt', { time: hhmm(endsAt) }) };
        if (lastClosed != null) return { name: z.name, value: this.t('irrigation.diagClosedAt', { time: hhmm(lastClosed) }) };
        return null;
      }).filter(Boolean);
      hasDiagIrrigationRows = diagIrrigationRows.length > 0;

      const env = this.diagEnvironment();
      diagEnvRows = [
        { label: S.diagEnvVersion, value: env.version || S.diagEnvVersionDev },
        { label: S.diagEnvBackend, value: env.backend === 'demo' ? S.diagEnvBackendDemo : env.backend === 'panel' ? S.diagEnvBackendPanel : (env.backend || '—') },
        { label: S.diagEnvIframe, value: env.insideIframe ? S.diagEnvIframeYes : S.diagEnvIframeNo },
        // env.backend === 'demo' never sends embedIframe at all (see
        // ha-backend-demo.js — there is no real panel_custom config to
        // report on), so null there reads distinctly from a real false.
        { label: S.diagEnvInstall, value: env.backend === 'demo' ? S.diagEnvNotApplicableDemo : env.install === 'integration' ? S.diagEnvInstallIntegration : env.install === 'hacs_dashboard' ? S.diagEnvInstallLegacy : env.install === 'panel_custom' ? S.diagEnvInstallPanelCustom : S.diagEnvUnknown },
        { label: S.diagEnvEmbedIframe, value: env.backend === 'demo' ? S.diagEnvNotApplicableDemo : env.embedIframe === true ? S.diagEnvEmbedIframeYes : env.embedIframe === false ? S.diagEnvEmbedIframeNo : S.diagEnvUnknown },
        { label: S.diagEnvLang, value: env.lang || '—' },
        { label: S.diagEnvRuntime, value: env.reactSource === 'local' ? S.diagEnvRuntimeLocal : env.reactSource === 'cdn' ? S.diagEnvRuntimeCdn : S.diagEnvUnknown },
        { label: S.diagEnvAreas, value: String(env.areaCount) },
        { label: S.diagEnvEntities, value: String(env.entityCount) },
        { label: S.diagEnvRooms, value: String(env.roomCount) },
        { label: S.diagEnvCameras, value: String(env.cameraCount) },
        { label: S.diagEnvPrefsOutcome, value: env.prefsOutcome === 'ok' ? S.diagEnvPrefsOk : env.prefsOutcome === 'failed' ? S.diagEnvPrefsFailed : S.diagEnvPrefsUnknown }
      ];

      // v1.5.4, point 5 — three diagnostics rows that answer exactly the
      // questions that cost real debugging time this release: which camera
      // layer actually activated (and whether camera/stream itself even
      // answered), which energy ring is live and why the fallback one might
      // be showing instead, and what the alarm entity/capabilities/code
      // situation is. camDiag is populated by _camStartStream as each
      // camera detail is opened — a camera never opened this session has no
      // entry yet, shown as "not opened" rather than a false failure.
      const camLayerLabelKeys = { 'webrtc': 'diagCamLayerWebrtc', 'hls-native': 'diagCamLayerNative', 'hlsjs': 'diagCamLayerHlsjs', 'snapshot': 'diagCamLayerSnapshot' };
      diagCameraRows = camList.map((c) => {
        const d = (this.camDiag || {})[c.id];
        if (!d) return { label: c.name, value: S.diagCamNotOpened };
        const layerLabel = S[camLayerLabelKeys[d.layer]] || d.layer || '—';
        // WebRTC never asks for camera/stream (v2): saying it was "not
        // available" would point at a problem that isn't there.
        const wsLabel = d.layer === 'webrtc' && !d.wsAttempted ? ''
          : !d.wsAttempted ? S.diagCamWsNotAttempted : d.wsOk ? S.diagCamWsOk : S.diagCamWsFailed;
        const fellBack = d.failedLayer ? ' · ' + S.diagCamFellBack + ' ' + (S[camLayerLabelKeys[d.failedLayer]] || d.failedLayer)
          + (d.failDetail ? ' (' + d.failDetail + ')' : '') : '';
        return { label: c.name, value: layerLabel + (wsLabel ? ' · ' + wsLabel : '') + fellBack };
      });

      diagRingValue = !hasEnergy ? S.diagRingNoEnergy
        : hasNewRing ? S.diagRingDoubleLabel
        : prodT == null ? this.t('diag.ringMissing', { field: S.diagRoleProduction })
        : gridT == null ? this.t('diag.ringMissing', { field: S.diagRoleGridImport })
        : S.diagRingSingleGeneric;

      // Diagnostica's dashboard counterpart for the hourly strip's three
      // silent outcomes (CLAUDE.md: no console-only message for the end
      // user). `undefined` (never resolved — fetch in flight, or no backend
      // support) is distinct from `null` (resolved, no statistics found for
      // any configured id): the loading state doesn't accuse the install of
      // anything.
      diagHourlyValue = !hasEnergy ? S.diagHourlyNoEnergy
        : this.state.hourlyEnergy === undefined ? S.diagHourlyLoading
        : this.state.hourlyEnergy === null ? S.diagHourlyMissing
        : this.state.hourlyEnergy.length < 24 ? this.t('diag.hourlyPartial', { n: this.state.hourlyEnergy.length })
        : S.diagHourlyFull;

      if (hasAlarm) {
        const capLabels = [];
        if (supp & 1) capLabels.push(this.t('alarm.btnHome'));
        if (supp & 2) capLabels.push(this.t('alarm.btnAway'));
        if (supp & 4) capLabels.push(this.t('alarm.btnNight'));
        if (supp & 16) capLabels.push(this.t('alarm.btnCustom'));
        if (supp & 32) capLabels.push(this.t('alarm.btnVacation'));
        diagAlarmRows = [
          { label: S.diagAlarmEntity, value: alarmId },
          { label: S.diagAlarmFoundVia, value: (this.cfg && this.cfg.alarm) ? S.diagSourceConfig : S.diagSourceDomain },
          { label: S.diagAlarmCapabilities, value: capLabels.length ? capLabels.join(', ') : S.diagAlarmDisarmOnly },
          { label: S.diagAlarmCodeRequired, value: (alarmNeedsCodeArm || alarmNeedsCodeDisarm) ? S.diagVerdictYes : S.diagVerdictNo }
        ];
      }

      // Diagnostica — why an entity doesn't show up (v1.7.1). discoverRooms's
      // discardLog (see discovery.js) already has every discard reason;
      // this just groups it, orders the groups by severity (not by count —
      // the biggest group is almost always the least interesting
      // "diagnostic entity" one), and turns each into a collapsible block.
      // Unfiltered (isHidden always false, like ALL_ROOMS_RESULT) — a
      // discard reason must be visible regardless of what the user has
      // chosen to hide, since hiding is a deliberate choice and this screen
      // is about problems, not preferences.
      if (this.discovery) {
        const REASON_ORDER = ['no_area', 'unknown_area', 'no_registry_entry', 'no_state',
          'claimed_by_module', 'empty_room', 'hidden_by', 'disabled_by', 'diagnostic_category', 'config_category'];
        const REASON_LABEL_KEYS = {
          no_area: 'diagReasonNoArea', unknown_area: 'diagReasonUnknownArea', no_registry_entry: 'diagReasonNoRegistryEntry',
          no_state: 'diagReasonNoState', claimed_by_module: 'diagReasonClaimedByModule', empty_room: 'diagReasonEmptyRoom',
          hidden_by: 'diagReasonHiddenBy', disabled_by: 'diagReasonDisabledBy',
          diagnostic_category: 'diagReasonDiagnosticCategory', config_category: 'diagReasonConfigCategory'
        };
        const REASON_EXPLAIN_KEYS = { no_area: 'diagReasonNoAreaBody', unknown_area: 'diagReasonUnknownAreaBody', no_registry_entry: 'diagReasonNoRegistryEntryBody' };
        const HIGH_SEVERITY_REASONS = ['no_area', 'unknown_area', 'no_registry_entry'];
        const claimModuleLabels = {
          energy: this.t('tab.energy'), irrigation: this.t('tab.irrigation'), weatherStation: S.diagModuleWeatherStation,
          vehicle: this.t('tab.vehicle'), appliances: S.appliances, cameras: this.t('tab.cameras'),
          alarm: S.alarm, weather: S.diagModuleWeather, modes: S.houseMode, people: S.diagModulePeople, quickActions: S.quickActions
        };

        const discardLog = this.ALL_ROOMS_RESULT().discardLog || [];
        const byReason = {};
        discardLog.forEach((d) => { (byReason[d.reason] = byReason[d.reason] || []).push(d); });

        diagReasonTotalLabel = this.t('diag.reasonsTotal', { n: discardLog.length });
        diagHasHighSeverityReason = HIGH_SEVERITY_REASONS.some((r) => byReason[r] && byReason[r].length);
        const groupsOpen = this.state.diagReasonGroupsOpen || {};
        diagReasonGroups = REASON_ORDER.filter((r) => byReason[r] && byReason[r].length).map((reasonCode) => {
          const entries = byReason[reasonCode];
          const open = groupsOpen[reasonCode] !== false; // default open once the outer section is opened
          return {
            reason: reasonCode,
            label: S[REASON_LABEL_KEYS[reasonCode]],
            count: entries.length,
            hasExplain: !!REASON_EXPLAIN_KEYS[reasonCode],
            explain: REASON_EXPLAIN_KEYS[reasonCode] ? S[REASON_EXPLAIN_KEYS[reasonCode]] : '',
            open, chevRotate: open ? 'rotate(180deg)' : 'rotate(0deg)',
            toggle: () => this.setState({ diagReasonGroupsOpen: Object.assign({}, groupsOpen, { [reasonCode]: !open }) }),
            rows: entries.map((d) => ({
              name: d.name,
              entityIdLabel: d.entity_id || '—',
              hasReasonExtra: reasonCode === 'claimed_by_module',
              reasonExtra: reasonCode === 'claimed_by_module'
                ? this.t('diag.reasonClaimedByModule', { module: claimModuleLabels[d.module] || d.module || '—' })
                : ''
            }))
          };
        });
        hasDiagReasonGroups = diagReasonGroups.length > 0;

        const dupPairs = this.discovery.findDuplicateDevices(this.registries) || [];
        hasDiagDuplicateDevices = dupPairs.length > 0;
        if (hasDiagDuplicateDevices) {
          diagDuplicateDevicesTitle = this.t('diag.duplicateDevicesTitle', { n: dupPairs.length });
          diagDuplicateDevices = dupPairs.map((p) => ({
            line: this.t('diag.duplicateDeviceLine', {
              from: p.withoutArea.name_by_user || p.withoutArea.name || p.withoutArea.model || p.withoutArea.id,
              to: p.withArea.name_by_user || p.withArea.name || p.withArea.model || p.withArea.id
            })
          }));
        }
      }

      // Settings panel navigation (v1.5.3): four flat tabs instead of one
      // long scroll. "hasIssue" reuses the same *Rows this block already
      // computed (see the diagnostics comment above) rather than
      // re-deriving verdicts — kept in sync with _settingsProblemTab()'s
      // criteria (missing/unavailable/unitWarn/counterWarn/prefsFailed/
      // config-load warn), which decides the tab on open, before these
      // rows exist yet. Rooms/cameras have no diagnosed failure mode.
      const settingsTabDefs = [['stanze', S.rooms, false], ['energia', this.t('tab.energy'),
        diagEnergyInstantRows.some((r) => r.tone === 'warn' || r.unitWarn) || diagPrefsFailed || diagEnergyDailyRows.some((r) => r.counterWarn) || batterySign.suspect]];
      if (settingsCameras.length > 0) settingsTabDefs.push(['camere', S.settingsCameras, false]);
      if (this.panelInstall === 'integration') settingsTabDefs.push(['config', S.sharedTab, false]);
      settingsTabDefs.push(['diagnostica', S.diagTitle, diagConfigAttempts.some((a) => a.tone === 'warn') || diagHasHighSeverityReason]);
      settingsTabs = settingsTabDefs.map(([key, label, hasIssue]) => ({
        key, label, hasIssue, sel: (this.state.settingsTab || 'stanze') === key,
        go: () => this.setState({ settingsTab: key })
      }));

      const curPowerUnit = prefsNow.powerUnit || 'auto';
      powerUnitOptions = [['auto', S.settingsPowerUnitAuto], ['w', S.settingsPowerUnitW], ['kw', S.settingsPowerUnitKw]]
        .map(([key, label]) => ({ key, label, sel: curPowerUnit === key, set: () => this.SETTINGS_SET_POWER_UNIT(key) }));
      const curPlugThreshold = this.plugThresholdW();
      plugThresholdOptions = [1, 3, 5, 10]
        .map((w) => ({ key: String(w), label: w + ' W', sel: curPlugThreshold === w, set: () => this.SETTINGS_SET_PLUG_THRESHOLD(w) }));

      // Battery power sign convention (v1.6.0) — only meaningful when a
      // single signed sensor is driving the consumption derivation above
      // (deriveConsumption()): two separate always-positive sensors need no
      // convention, and if config.energy.consumption is set directly the
      // derivation never runs at all, so there's nothing here to tune.
      const bat = en.battery || {};
      showBatterySignControl = !!(bat.power && !(bat.chargePower && bat.dischargePower) && !en.consumption);
      const curBatterySign = this.batteryPowerSign();
      batterySignOptions = [['charge', S.settingsBatterySignCharge], ['discharge', S.settingsBatterySignDischarge]]
        .map(([key, label]) => ({ key, label, sel: curBatterySign === key, set: () => this.SETTINGS_SET_BATTERY_SIGN(key) }));
      batterySignLiveLabel = this.t('settingsBatterySignLive', { val: this.formatWatts(consumptionDisplayWatts) });
      batterySignSuspect = batterySign.suspect;
      batterySignInvert = () => this.SETTINGS_SET_BATTERY_SIGN(curBatterySign === 'charge' ? 'discharge' : 'charge');

      doDiag = async () => {
        const text = window.CasaPrefs.diagText({
          configHeading: S.diagConfigHeading, configSummary: diagConfigSummary,
          configAttempts: diagConfigAttempts.map((a) => ({ pathLabel: a.path, verdictLabel: a.verdictLabel })),
          configOutsideIframeNote: diagConfigOutsideIframe ? S.diagConfigOutsideIframe : null,
          instantHeading: S.diagEnergyInstantHeading,
          instantRows: diagEnergyInstantRows.map((r) => ({ roleLabel: r.roleLabel, idLabel: r.idLabel, valueLabel: r.valueLabel, verdictLabel: r.verdictLabel, unitWarnLabel: r.unitWarn ? S.diagUnitMismatch : null })),
          dailyHeading: S.diagEnergyDailyHeading,
          dailyPrefsFailedNote: diagPrefsFailed ? S.diagPrefsFailedMsg : null,
          dailyRows: diagEnergyDailyRows.map((r) => ({ roleLabel: r.roleLabel, sourceLabel: r.sourceLabel, idsLabel: r.idsLabel, valueLabel: r.valueLabel, counterWarnLabel: r.counterWarn ? S.diagCounterWarn : null })),
          actionsHeading: S.diagActionsHeading, actionsEmptyLabel: S.diagActionsEmpty, actionRows: diagActionRows,
          envHeading: S.environment,
          envRows: diagEnvRows,
          reasonsHeading: S.diagReasonsHeading, reasonsTotalLabel: diagReasonTotalLabel,
          reasonGroups: diagReasonGroups.map((g) => ({
            label: g.label, count: g.count,
            rows: g.rows.map((r) => ({ name: r.name, entityIdLabel: r.entityIdLabel, reasonExtra: r.reasonExtra }))
          })),
          duplicateDevicesTitle: hasDiagDuplicateDevices ? diagDuplicateDevicesTitle : null,
          duplicateDeviceLines: diagDuplicateDevices.map((p) => p.line)
        });
        const copied = await window.CasaPrefs.copyToClipboard(text);
        this.setState({ diagSheet: { text, copied } });
      };
    }
    return {
      settingsRooms, settingsCameras, settingsModules, settingsSectionOrder, settingsRoomDetail, doExport,
      diagConfigAttempts, diagConfigSummary, diagConfigOutsideIframe, diagEnergyInstantRows, diagEnergyDailyRows, diagPrefsFailed,
      diagEnvRows, diagActionRows, hasDiagActions, diagIrrigationRows, hasDiagIrrigationRows, diagCameraRows,
      diagRingValue, diagHourlyValue, diagAlarmRows, diagReasonGroups, diagReasonTotalLabel, hasDiagReasonGroups,
      hasDiagDuplicateDevices, diagDuplicateDevices, diagDuplicateDevicesTitle, doDiag, settingsTabs, powerUnitOptions,
      plugThresholdOptions, showBatterySignControl, batterySignOptions, batterySignLiveLabel, batterySignSuspect, batterySignInvert
    };
  }

  // v2 — alarm card + PIN pad view-model (supported_features buttons,
  // code_format gating, v1.9.0 PIN pad), shared by both layouts.
  vmAlarm(ctx) {
    const { alarmId, hasAlarm } = ctx;
    const al = hasAlarm ? this.ALARM(alarmId) : ['', 'ok'];
    const alarmSt = hasAlarm ? this.s(alarmId) : 'disarmed';
    // Alarm buttons follow the entity's supported_features bitmask instead of
    // assuming which arm modes exist — different alarm integrations declare
    // different subsets (see discovery.js comments / README/TROUBLESHOOTING).
    const feat = hasAlarm ? Number(this.at(alarmId, 'supported_features')) : NaN;
    const supp = isNaN(feat) ? 0 : feat;
    // A code_format-declaring entity fails `failed to perform action` if we
    // call arm/disarm without `code` — same profile as the cover
    // SET_POSITION guard elsewhere in this file. So a gated action never
    // goes out without a code: since v1.9.0 it opens the PIN pad (see
    // alarmGuardedCall below); before that it was a no-op with a note,
    // never a service call that silently fails. code_arm_required
    // only ever softens *arming* — HA's alarm_control_panel model has no
    // equivalent bypass for disarm, so disarm is gated on code_format alone.
    const alarmCodeFormat = hasAlarm ? this.at(alarmId, 'code_format') : null;
    const alarmCodeArmRequired = hasAlarm ? this.at(alarmId, 'code_arm_required') : undefined;
    const alarmNeedsCodeArm = !!alarmCodeFormat && alarmCodeArmRequired !== false;
    const alarmNeedsCodeDisarm = !!alarmCodeFormat;
    // v1.9.0 — PIN pad. A gated action opens the pad instead of doing
    // nothing. The code lives only in this.state.pin while the pad is open:
    // never stored, never logged (call() records entity and service, not
    // data), never shown in clear. code_format 'number' gets a keypad;
    // anything else ('text', or an old-style regex) a password field with
    // the system keyboard, since a digits-only pad couldn't type it.
    const alarmGuardedCall = (service, needsCode, label) => needsCode
      ? () => this.setState({ pin: { service, label, value: '', busy: false, error: false } })
      : () => this.call('alarm_control_panel', service, { entity_id: alarmId });
    const pin = hasAlarm ? this.state.pin : null;
    const pinOpen = !!pin;
    const pinNumeric = alarmCodeFormat === 'number';
    const pinSet = (patch) => { if (this.state.pin) this.setState({ pin: Object.assign({}, this.state.pin, patch) }); };
    const pinCancel = () => this.setState({ pin: null });
    const pinSubmit = () => {
      const p = this.state.pin;
      if (!p || p.busy || !p.value) return;
      pinSet({ busy: true, error: false });
      // Pad stays open until HA answers: a wrong code clears the digits and
      // says so here, next to where it was typed, on top of call()'s toast.
      this.call('alarm_control_panel', p.service, { entity_id: alarmId, code: p.value }).then((res) => {
        if (!this.state.pin) return;
        if (res && res.ok) this.setState({ pin: null });
        else pinSet({ busy: false, error: true, value: '' });
      });
    };
    const pinDigit = (d) => () => { const p = this.state.pin; if (p && !p.busy && p.value.length < 12) pinSet({ value: p.value + d, error: false }); };
    const pinBack = () => { const p = this.state.pin; if (p && !p.busy) pinSet({ value: p.value.slice(0, -1) }); };
    const pinKeys = !pinOpen || !pinNumeric ? [] : ['1', '2', '3', '4', '5', '6', '7', '8', '9']
      .map((d) => ({ label: d, aria: d, run: pinDigit(d), isOk: false }))
      .concat([
        { label: '⌫', aria: this.strings.pinBackspace, run: pinBack, isOk: false },
        { label: '0', aria: '0', run: pinDigit('0'), isOk: false },
        { label: pin.busy ? '…' : 'OK', aria: this.strings.pinConfirm, run: pinSubmit, isOk: true }
      ]);
    const alarmBtns = hasAlarm ? [{ label: this.t('alarm.disarmed'), sel: alarmSt === 'disarmed', run: alarmGuardedCall('alarm_disarm', alarmNeedsCodeDisarm, this.t('alarm.disarmed')) }] : [];
    if (hasAlarm) [[1, 'armed_home', 'alarm_arm_home', this.t('alarm.btnHome')],
     [2, 'armed_away', 'alarm_arm_away', this.t('alarm.btnAway')],
     [4, 'armed_night', 'alarm_arm_night', this.t('alarm.btnNight')],
     [16, 'armed_custom_bypass', 'alarm_arm_custom_bypass', this.t('alarm.btnCustom')],
     [32, 'armed_vacation', 'alarm_arm_vacation', this.t('alarm.btnVacation')]].forEach((b) => {
      if (supp & b[0]) alarmBtns.push({ label: b[3], sel: alarmSt === b[1], run: alarmGuardedCall(b[2], alarmNeedsCodeArm, b[3]) });
    });
    const alarmCodeNote = hasAlarm && (alarmNeedsCodeArm || alarmNeedsCodeDisarm) ? this.t('alarm.codeRequired') : '';
    return {
      al, alarmSt, supp, alarmNeedsCodeArm, alarmNeedsCodeDisarm, pin,
      pinOpen, pinNumeric, pinSet, pinCancel, pinSubmit, pinKeys,
      alarmBtns, alarmCodeNote
    };
  }

  // v2 — camera detail overlay view-model: which live layer is showing,
  // the video ref, the still URL, the Connecting/Live badge and the
  // auto-close countdown (v1.5.4, v1.9.0). Shared by both layouts.
  vmCameraDetail(ctx) {
    const { camList } = ctx;
    const camCur = camList.find((c) => c.id === this.state.cam) || null;
    const camOpen = !!camCur;
    // v1.5.4: layered live view — see _camStartStream for the full strategy.
    // camStreamSrc (tier 3 only) re-reads camCur.picture on every fast tick
    // rather than caching the URL once, same as the preview tiles above: the
    // token inside entity_picture expires, and re-reading it from the live
    // states object (refreshed on every hass push) is what keeps this alive
    // past the first few minutes instead of quietly dying.
    const camStreamLayer = camOpen ? this.state.camStreamLayer : null;
    const camStreamUrl = camOpen ? this.state.camStreamUrl : null;
    const camLayerVideo = camStreamLayer === 'webrtc' || camStreamLayer === 'hls-native' || camStreamLayer === 'hlsjs';
    const camLayerSnapshot = camStreamLayer === 'snapshot' && camCur && !!camCur.picture;
    const camStreamSrc = camLayerSnapshot
      ? (this.state.camStillSrc || camCur.picture + (camCur.picture.indexOf('?') === -1 ? '?' : '&') + '_cb=' + this.state.snapTick)
      : '';
    const camNoStream = camOpen && !camLayerVideo && !camLayerSnapshot;
    const camVideoRef = camLayerVideo ? this._camVideoRef(camStreamLayer, camStreamUrl) : null;
    const camShowBadge = camLayerVideo || camLayerSnapshot;
    // "Live" only once frames actually play: Home Assistant can take 15 s or
    // more to start a stream on first request, and a black box labeled Live
    // reads as broken.
    const camVideoPlaying = camLayerVideo && this.state.camPlayingUrl === camStreamUrl;
    const camBadgeLabel = camStreamLayer === 'snapshot' ? this.t('cameras.snapshotBadge')
      : camVideoPlaying ? this.strings.live : this.strings.camConnecting;
    const camRemainingS = camOpen ? Math.max(0, Math.ceil((this.camCloseAt - Date.now()) / 1000)) : 0;
    const camCountdown = Math.floor(camRemainingS / 60) + ':' + String(camRemainingS % 60).padStart(2, '0');
    return {
      camCur, camOpen, camLayerVideo, camLayerSnapshot, camStreamSrc, camNoStream,
      camVideoRef, camShowBadge, camBadgeLabel, camCountdown
    };
  }

  // v2 — daily energy ring view-model (v1.4.0 double ring): autoconsumo /
  // consumo casa derivation, which rings can be drawn, their SVG dash
  // segments and the legend. Shared by both layouts; the colours follow
  // the energy role grammar in CLAUDE.md (sage = sun, terracotta = grid).
  vmEnergyRing(ctx) {
    const { consT, energyEmptyState, exportT, gridT, prodT } = ctx;
    let autoconsumo = null;
    if (consT != null && gridT != null) autoconsumo = Math.max(0, consT - gridT);
    else if (prodT != null && exportT != null) autoconsumo = Math.max(0, prodT - exportT);
    const consumoCasa = consT != null ? consT : (autoconsumo != null && gridT != null ? autoconsumo + gridT : null);
    // Declares itself (v1.6.0) rather than silently mixing a derived number
    // in with measured ones — see kwhConsumedLabel below, and deriveConsumption()
    // above for the same principle applied to the instantaneous tile.
    const dailyConsumptionDerived = consT == null && consumoCasa != null;

    // Outer ring needs production too (not just autoconsumo + prelievo) —
    // deliberately stricter than the math alone requires, so "no production
    // sensor at all" degrades to the old single ring rather than a new-style
    // ring built from consumption+grid alone with no solar data behind it.
    const hasOuterRing = prodT != null && gridT != null && autoconsumo != null && consumoCasa != null && consumoCasa > 0;
    // Inner ring additionally needs immissione — absent (not a zero-value
    // empty ring) when the install has no export sensor, per the spec this
    // was built against: an empty ring reads as broken, not as "zero".
    const hasInnerRing = hasOuterRing && exportT != null && prodT > 0;
    // energyEmptyState (case b, above) wins over either ring — showing a
    // ring built from whatever partial data resolved would contradict the
    // "entity doesn't exist" explanation sitting right next to it.
    const hasNewRing = hasOuterRing && !energyEmptyState;

    const RING_GAP = 5, ORC = 540.4, IRC = 389.6; // circumferences for r=86 / r=62
    // A segment whose share is small enough that the gap eats the whole
    // thing (dash length rounds down to 0) still needs *some* stroke-cap —
    // "round" draws a full circular dot at that point regardless of how
    // short the dash is (confirmed: an exactly-0 dash with a round cap is
    // not invisible, it's a dot of diameter = stroke-width, sitting right
    // on the ring at an arbitrary boundary point). "butt" draws nothing for
    // a 0-length dash, which is what "no visible segment" should look like.
    const ringSeg = (value, shareTotal, C, offsetAcc) => {
      const full = shareTotal > 0 ? C * (Math.max(0, value || 0) / shareTotal) : 0;
      const dash = Math.max(0, full - RING_GAP);
      return { dasharray: dash.toFixed(1) + ' ' + C.toFixed(1), dashoffset: (-offsetAcc).toFixed(1), full, cap: dash > 0 ? 'round' : 'butt' };
    };
    let outerSelf = null, outerGrid = null, innerSelf = null, innerFeed = null;
    if (hasOuterRing) {
      outerSelf = ringSeg(autoconsumo, consumoCasa, ORC, 0);
      outerGrid = ringSeg(gridT, consumoCasa, ORC, outerSelf.full);
    }
    if (hasInnerRing) {
      innerSelf = ringSeg(autoconsumo, prodT, IRC, 0);
      innerFeed = ringSeg(exportT, prodT, IRC, innerSelf.full);
    }
    const ringLegend = [];
    if (hasOuterRing) {
      ringLegend.push({ color: 'var(--sage)', label: this.t('energy.selfConsumptionLabel'), val: this.dec(autoconsumo, 1) + ' kWh', num: this.dec(autoconsumo, 1), short: this.t('energy.selfShort') });
      ringLegend.push({ color: 'var(--acc)', label: this.strings.fromGrid, val: this.dec(gridT, 1) + ' kWh', num: this.dec(gridT, 1), short: this.t('energy.gridShort') });
    }
    if (hasInnerRing) {
      ringLegend.push({ color: 'var(--feed)', label: this.t('energy.feedIn'), val: this.dec(exportT, 1) + ' kWh', num: this.dec(exportT, 1), short: this.t('energy.feedShort') });
    }
    return {
      autoconsumo, consumoCasa, dailyConsumptionDerived, hasOuterRing, hasInnerRing, hasNewRing,
      outerSelf, outerGrid, innerSelf, innerFeed, ringLegend
    };
  }

  // v2 — hourly strip under the ring (v1.8.0): 24 stacked bars with the
  // same role grammar as the ring, axis ticks and the solar peak label.
  // Shared by both layouts.
  vmHourlyStrip(ctx) {
    const { hasNewRing } = ctx;
    let hourlyBars = [], hourlyAxisLabels = [], hasHourlyStrip = false, hourlyPeakLabel = '';
    if (hasNewRing && this.state.hourlyEnergy && this.state.hourlyEnergy.length) {
      const raw = this.state.hourlyEnergy.map((h) => {
        let auto = null;
        if (h.consumption != null && h.gridImport != null) auto = Math.max(0, h.consumption - h.gridImport);
        else if (h.production != null && h.gridExport != null) auto = Math.max(0, h.production - h.gridExport);
        return {
          hourStart: h.hourStart,
          auto: auto != null ? auto : 0,
          grid: h.gridImport != null ? h.gridImport : 0,
          feed: h.gridExport != null ? h.gridExport : 0
        };
      });
      const maxTotal = Math.max.apply(null, [0.001].concat(raw.map((r) => r.auto + r.grid + r.feed)));
      const TOP_RADIUS = '3px 3px 0 0', NO_RADIUS = '0';
      // Plain fixed-point, not this.dec() — that formats with the current
      // locale (it-IT renders a decimal comma), which would break the CSS
      // percentage this feeds straight into a style= hole.
      const pct = (v) => ((v / maxTotal) * 100).toFixed(2) + '%';
      hourlyBars = raw.map((r) => {
        const hasFeed = r.feed > 0, hasGrid = r.grid > 0, hasAuto = r.auto > 0;
        const hourLabel = String(new Date(r.hourStart).getHours()).padStart(2, '0') + ':00';
        return {
          hasFeed, hasGrid, hasAuto,
          feedH: pct(r.feed), gridH: pct(r.grid), autoH: pct(r.auto),
          feedRadius: hasFeed ? TOP_RADIUS : NO_RADIUS,
          gridRadius: !hasFeed && hasGrid ? TOP_RADIUS : NO_RADIUS,
          autoRadius: !hasFeed && !hasGrid && hasAuto ? TOP_RADIUS : NO_RADIUS,
          title: hourLabel + ' · ' + this.t('energy.selfConsumptionLabel') + ' ' + this.dec(r.auto, 2) + ' kWh'
            + ' · ' + this.strings.fromGrid + ' ' + this.dec(r.grid, 2) + ' kWh'
            + ' · ' + this.t('energy.feedIn') + ' ' + this.dec(r.feed, 2) + ' kWh'
        };
      });
      hasHourlyStrip = true;
      // Six-hour ticks by bar POSITION (0, 6, 12, 18, last) labeled with that
      // bar's actual clock hour — right, not assumed, when the window isn't
      // midnight-aligned or history is partial (fewer than 24 bars).
      const axisPositions = [0, 6, 12, 18, raw.length - 1].filter((i, idx, arr) => i >= 0 && i < raw.length && arr.indexOf(i) === idx);
      hourlyAxisLabels = axisPositions.map((i) => String(new Date(raw[i].hourStart).getHours()).padStart(2, '0'));
      let peakIdx = -1, peakVal = -1;
      raw.forEach((r, i) => { const solar = r.auto + r.feed; if (solar > peakVal) { peakVal = solar; peakIdx = i; } });
      if (peakIdx !== -1 && peakVal > 0) {
        hourlyPeakLabel = this.t('energy.hourlyPeak', { time: String(new Date(raw[peakIdx].hourStart).getHours()).padStart(2, '0') + ':00' });
      }
    }
    return {
      hourlyBars, hourlyAxisLabels, hasHourlyStrip, hourlyPeakLabel
    };
  }

  // v2 — energy empty state, case b (v1.6.0): configured energy entities
  // that don't exist in Home Assistant, shown by id instead of an empty
  // card. Shared by both layouts.
  vmEnergyEmpty(ctx) {
    const { en, gridT, hasEnergy, prodT } = ctx;
    const energyMissingIds = [];
    if (hasEnergy) {
      ['production', 'consumption', 'gridImport', 'gridExport'].forEach((role) => {
        const id = en[role];
        if (id && !(id in this.state.st)) energyMissingIds.push(id);
      });
      if (en.battery) {
        ['soc', 'power', 'chargePower', 'dischargePower'].forEach((k) => {
          const id = en.battery[k];
          if (id && !(id in this.state.st)) energyMissingIds.push(id);
        });
      }
    }
    const energyHasLiveData = (en.production && this.n(en.production) !== null) ||
      (en.consumption && this.n(en.consumption) !== null) ||
      (en.gridImport && this.n(en.gridImport) !== null) ||
      prodT !== null || gridT !== null;
    const energyEmptyState = hasEnergy && energyMissingIds.length > 0 && !energyHasLiveData;
    const ENERGY_MISSING_SHOWN = 3;
    const energyMissingLabel = energyMissingIds.slice(0, ENERGY_MISSING_SHOWN).join(' · ') +
      (energyMissingIds.length > ENERGY_MISSING_SHOWN ? ' ' + this.t('energyEmpty.more', { n: energyMissingIds.length - ENERGY_MISSING_SHOWN }) : '');
    const openEnergySettings = () => this.setState({ settingsOpen: true, settingsRoom: null, settingsTab: 'energia' });
    return {
      energyEmptyState, energyMissingLabel, openEnergySettings
    };
  }

  // v2 — instantaneous house consumption (v1.6.0 derivation, battery
  // sign sampling and verdict). Shared by both layouts.
  vmLiveConsumption(ctx) {
    const { en, hasEnergy } = ctx;
    const consumeResult = hasEnergy ? this.deriveConsumption() : { watts: null, derived: false, batteryTermUsed: false };
    if (consumeResult.batteryTermUsed) this._sampleBatterySign(consumeResult.watts !== null && consumeResult.watts < 0);
    const consumptionDisplayWatts = (consumeResult.watts !== null && consumeResult.watts >= 0) ? consumeResult.watts : null;
    const consumptionIsDerived = consumeResult.derived;
    const consumptionVal = en.consumption ? this.powerVal(en.consumption) : this.formatWatts(consumptionDisplayWatts);
    const consumptionLabel = consumptionIsDerived ? this.t('energy.consumptionNowDerived') : this.t('energy.consumptionNow');
    const batterySign = this.batterySignVerdict();
    return {
      consumptionDisplayWatts, consumptionVal, consumptionLabel, batterySign
    };
  }

  // v2 — "Configurazione" settings tab (integration installs only): where the
  // config comes from, and for administrators the ways to store it in Home
  // Assistant for every user and device. Saving reloads the page, so the new
  // config applies exactly as at startup. Shared by both layouts.
  vmSharedConfig() {
    const S = this.strings;
    const info = this.sharedConfigInfo || {};
    const cd = this.configDiag || {};
    const isAdmin = !!(this.panelUser && this.panelUser.isAdmin);
    const st = this.state.shared || {};
    const source = cd.source || 'none';
    const sourceText = source === 'ha'
      ? this.t('shared.sourceHa', { when: this._fmtStamp(info.updated_at), who: info.updated_by || '—' })
      : source === 'file' ? this.t('shared.sourceFile', { path: cd.resolvedPath || '' }) : S.sharedSourceNone;
    const actions = [];
    if (isAdmin) {
      if (source === 'file' && this.fileConfig && Object.keys(this.fileConfig).length) {
        actions.push({ key: 'import', label: S.sharedImport, hint: S.sharedImportHint, run: () => this._sharedSave(this.fileConfig) });
      }
      actions.push({ key: 'panel', label: S.sharedSavePanel, hint: S.sharedSavePanelHint, run: () => this._sharedSave(this._sharedPanelConfig()) });
      actions.push({ key: 'edit', label: S.sharedEdit, hint: S.sharedEditHint, run: () => this._sharedOpenEditor() });
      if (source === 'ha') {
        actions.push(st.resetConfirm
          ? { key: 'reset', label: S.sharedResetConfirm, hint: S.sharedResetHint, run: () => this._sharedSave(null) }
          : { key: 'reset', label: S.sharedReset, hint: S.sharedResetHint, run: () => this.setState({ shared: Object.assign({}, st, { resetConfirm: true }) }) });
      }
    }
    const ed = this.state.sharedEditor;
    return {
      sharedSourceText: sourceText,
      sharedCanEdit: isAdmin,
      sharedReadOnly: !isAdmin,
      sharedActions: st.busy ? [] : actions,
      sharedBusy: !!st.busy,
      sharedHasError: !!st.error,
      sharedErrorText: st.error ? this.t('shared.saveFailed', { error: st.error }) : '',
      sharedEditorOpen: !!ed,
      sharedEditorText: ed ? ed.text : '',
      sharedEditorHasError: !!(ed && ed.error),
      sharedEditorError: ed && ed.error ? ed.error : '',
      sharedEditorSaveLabel: st.busy ? '…' : S.sharedEditorSave,
      sharedEditorInput: (e) => { if (this.state.sharedEditor) this.setState({ sharedEditor: { text: e.target.value, error: null } }); },
      sharedEditorClose: () => this.setState({ sharedEditor: null }),
      sharedEditorSave: () => {
        const cur = this.state.sharedEditor;
        if (!cur) return;
        const parsed = parseSharedConfigText(cur.text);
        if (parsed.error) {
          this.setState({ sharedEditor: { text: cur.text, error: this.t('shared.' + parsed.error, { detail: parsed.detail || '' }) } });
          return;
        }
        this._sharedSave(parsed.config);
      }
    };
  }

  // What "Salva le scelte del pannello per tutti" stores: the same resolved
  // config "Esporta come config.js" produces (config + this user's hide and
  // order choices), built by discovery.js's buildExportedConfig.
  _sharedPanelConfig() {
    const allRoomsRes = this.ALL_ROOMS_RESULT();
    const rooms = allRoomsRes.rooms.concat(allRoomsRes.overflow);
    const known = {
      roomIds: rooms.map((r) => r.id),
      entityIds: Array.from(new Set(rooms.reduce((acc, r) => acc.concat((r.catalog || []).map((e) => e.id)), []))),
      cameraIds: this.ALL_CAMERAS_RESULT().map((c) => c.id)
    };
    return window.CasaDiscovery.buildExportedConfig(this.cfg, this.PREFS(), known);
  }

  _sharedOpenEditor() {
    const info = this.sharedConfigInfo || {};
    const base = (info.config && Object.keys(info.config).length) ? info.config : (this.fileConfig || {});
    this.setState({ sharedEditor: { text: JSON.stringify(base, null, 2), error: null } });
  }

  async _sharedSave(config) {
    if (!this.be || !this.be.ws) return;
    this.setState({ shared: { busy: true, error: null } });
    try {
      await this.be.ws({ type: 'live_dashboard/config/set', config });
      window.location.reload();
    } catch (e) {
      this.setState({ shared: { busy: false, error: (e && e.message) || String(e) } });
    }
  }

  _fmtStamp(iso) {
    if (!iso) return '—';
    const d = new Date(iso);
    if (isNaN(d)) return '—';
    return d.toLocaleString(this.lang === 'it' ? 'it-IT' : 'en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  }

  // v2 — migration notice for a 1.x HACS *Dashboard* install that received
  // the 2.0 update (panel.js reports install = 'hacs_dashboard'). It keeps
  // working; this says how to move to the integration, once per user
  // (dismissed in the per-user prefs, like every other panel choice).
  vmMigration() {
    const show = this.panelInstall === 'hacs_dashboard' && !this.PREFS().migrationNoticeDismissed;
    return {
      migrationShow: show,
      migrationOpenGuide: () => { try { window.open(MIGRATION_GUIDE_URL, '_blank', 'noopener'); } catch (e) { /* popup blocked */ } },
      migrationDismiss: () => this.SAVE_PREFS(Object.assign({}, this.PREFS(), { migrationNoticeDismissed: true }))
    };
  }
  };
  return Base;
}

window.CasaCore = { base, parseSharedConfigText, DEFAULT_CONFIG, mergeConfig, ASSET_V, bust, loadScript, switchScenario, CONFIG_PATHS, loadUserConfig };
})();

// casa-core.js unit tests (v2). Before the shared core these functions lived
// inside each page's <script type="text/x-dc"> and couldn't be reached from
// Node at all; now they load here the same way discovery.js does — the
// shipped file, in a vm sandbox, with a stand-in for the runtime's DCLogic.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pub = (f) => fs.readFileSync(path.join(__dirname, '../public', f), 'utf8');

const window = { CasaDiscovery: null };
window.parent = window;
const sandbox = { window, location: { search: '', href: 'http://localhost/dash_neumo.html' }, URLSearchParams, URL, console };
vm.createContext(sandbox);
vm.runInContext(pub('discovery.js'), sandbox);
vm.runInContext(pub('casa-core.js'), sandbox);
const { CasaCore, CasaDiscovery } = sandbox.window;

// Minimal DCLogic: what the runtime's base class provides that core methods use.
class FakeLogic {
  constructor() { this.props = {}; this.state = {}; this.calls = []; }
  setState(u) { Object.assign(this.state, typeof u === 'function' ? u(this.state) : u); }
}
const Base = CasaCore.base(FakeLogic);

function make({ st = {}, prefs = { v: 1 }, energy = null, lang = 'it' } = {}) {
  const c = new Base();
  c.state = { st, prefs, pin: null };
  c.cfg = Object.assign({}, c.cfg, energy ? { energy } : {});
  c.lang = lang;
  c.discovery = CasaDiscovery;
  c.t = (key) => key;
  c.strings = { pinBackspace: 'back', pinConfirm: 'ok' };
  c.call = (domain, service, data) => { c.calls.push({ domain, service, data }); return Promise.resolve({ ok: true }); };
  return c;
}
const sensor = (state, unit, extra) => ({ state: String(state), attributes: Object.assign({ unit_of_measurement: unit }, extra || {}) });

test('CasaCore exposes base() and the shared helpers', () => {
  assert.equal(typeof CasaCore.base, 'function');
  assert.equal(CasaCore.base(FakeLogic), Base, 'one class per DCLogic, reused');
  for (const k of ['mergeConfig', 'bust', 'loadScript', 'loadUserConfig', 'switchScenario']) assert.equal(typeof CasaCore[k], 'function', k);
});

test('toWatts normalizes W/kW/MW, refuses unknown units', () => {
  const c = make({ st: { 'sensor.a': sensor(1.5, 'kW'), 'sensor.b': sensor(800, 'W'), 'sensor.c': sensor(0.002, 'MW'), 'sensor.d': sensor(5, 'BTU/h') } });
  assert.equal(c.toWatts('sensor.a'), 1500);
  assert.equal(c.toWatts('sensor.b'), 800);
  assert.equal(c.toWatts('sensor.c'), 2000);
  assert.equal(c.toWatts('sensor.d'), null);
  assert.equal(c.toWatts('sensor.missing'), null);
});

test('powerVal / formatWatts follow the power-unit preference', () => {
  const st = { 'sensor.p': sensor(1.25, 'kW'), 'sensor.q': sensor(640, 'W'), 'sensor.r': sensor(5, 'BTU/h') };
  const auto = make({ st });
  assert.equal(auto.powerVal('sensor.p'), '1,3 kW');
  assert.equal(auto.powerVal('sensor.q'), '640 W');
  assert.equal(auto.powerVal('sensor.r'), '5,0 BTU/h', 'unknown unit: shown as-is, never scaled');
  assert.equal(auto.powerVal('sensor.none'), '—');
  // it-IT groups thousands only from 5 digits (ICU minimumGroupingDigits).
  assert.equal(make({ st, prefs: { v: 1, powerUnit: 'w' } }).powerVal('sensor.p'), '1250 W');
  assert.equal(make({ st, prefs: { v: 1, powerUnit: 'kw' } }).powerVal('sensor.q'), '0,6 kW');
});

test('deriveConsumption: production + import - export, battery sign convention', () => {
  const st = { 'sensor.prod': sensor(3, 'kW'), 'sensor.imp': sensor(500, 'W'), 'sensor.exp': sensor(1000, 'W'), 'sensor.bat': sensor(-400, 'W') };
  const energy = { production: 'sensor.prod', gridImport: 'sensor.imp', gridExport: 'sensor.exp' };
  assert.deepEqual({ ...make({ st, energy }).deriveConsumption() }, { watts: 2500, derived: true, batteryTermUsed: false });
  // battery.power, 'charge' convention (positive = charging): -400 W = discharging 400 W into the house
  const withBat = { ...energy, battery: { power: 'sensor.bat' } };
  assert.equal(make({ st, energy: withBat }).deriveConsumption().watts, 2900);
  // the opposite convention reads the same sensor as charging
  assert.equal(make({ st, energy: withBat, prefs: { v: 1, batteryPowerSign: 'discharge' } }).deriveConsumption().watts, 2100);
  // an explicit consumption sensor always wins; a missing term never derives a partial sum
  assert.equal(make({ st, energy: { ...energy, consumption: 'sensor.x' } }).deriveConsumption().derived, false);
  assert.equal(make({ st, energy: { ...energy, gridExport: 'sensor.gone' } }).deriveConsumption().watts, null);
});

test('batterySignVerdict needs at least 5 samples, mostly negative', () => {
  const c = make();
  c._batterySignBuffer = [true, true, true, false].map((negative, i) => ({ t: i, negative }));
  assert.equal(c.batterySignVerdict().suspect, false, '4 samples are not enough');
  c._batterySignBuffer.push({ t: 5, negative: true });
  assert.equal(c.batterySignVerdict().suspect, true);
});

test('plugStatus: three levels from the plug power sensor and the threshold pref', () => {
  const st = { 'switch.p': { state: 'on', attributes: {} }, 'sensor.w': sensor(2, 'W', { device_class: 'power' }) };
  assert.equal(make({ st }).plugStatus('switch.p', 'sensor.w').level, 'active');
  assert.equal(make({ st, prefs: { v: 1, plugThreshold: 1 } }).plugStatus('switch.p', 'sensor.w').level, 'running');
});

test('vmAlarm: a code_format panel opens the PIN pad instead of calling the service', () => {
  const panel = (attrs) => ({ 'alarm_control_panel.home': { state: 'disarmed', attributes: Object.assign({ supported_features: 3 }, attrs) } });
  const free = make({ st: panel({}) });
  const vf = free.vmAlarm({ hasAlarm: true, alarmId: 'alarm_control_panel.home' });
  vf.alarmBtns.find((b) => b.label === 'alarm.btnAway').run();
  assert.deepEqual(free.calls.map((c) => c.service), ['alarm_arm_away'], 'no code needed: calls straight away');
  assert.equal(free.state.pin, null);

  const gated = make({ st: panel({ code_format: 'number' }) });
  const vg = gated.vmAlarm({ hasAlarm: true, alarmId: 'alarm_control_panel.home' });
  vg.alarmBtns.find((b) => b.label === 'alarm.btnAway').run();
  assert.equal(gated.calls.length, 0, 'never calls without a code');
  assert.equal(gated.state.pin.service, 'alarm_arm_away');

  // code_arm_required: false only softens arming — disarm still needs the code
  const softArm = make({ st: panel({ code_format: 'number', code_arm_required: false }) });
  const vs = softArm.vmAlarm({ hasAlarm: true, alarmId: 'alarm_control_panel.home' });
  vs.alarmBtns.find((b) => b.label === 'alarm.btnHome').run();
  vs.alarmBtns.find((b) => b.label === 'alarm.disarmed').run();
  assert.deepEqual(softArm.calls.map((c) => c.service), ['alarm_arm_home']);
  assert.equal(softArm.state.pin.service, 'alarm_disarm');
});

test('vmAlarm: the numeric keypad has 12 keys and submits the code with the service', async () => {
  const st = { 'alarm_control_panel.home': { state: 'armed_away', attributes: { supported_features: 2, code_format: 'number' } } };
  const c = make({ st });
  c.state.pin = { service: 'alarm_disarm', label: 'x', value: '', busy: false, error: false };
  let vm1 = c.vmAlarm({ hasAlarm: true, alarmId: 'alarm_control_panel.home' });
  assert.equal(vm1.pinKeys.length, 12);
  vm1.pinKeys.find((k) => k.label === '4').run();
  vm1.pinKeys.find((k) => k.label === '2').run();
  assert.equal(c.state.pin.value, '42');
  vm1 = c.vmAlarm({ hasAlarm: true, alarmId: 'alarm_control_panel.home' });
  vm1.pinSubmit();
  await new Promise((r) => setTimeout(r, 0));
  assert.deepEqual(JSON.parse(JSON.stringify(c.calls)), [{ domain: 'alarm_control_panel', service: 'alarm_disarm', data: { entity_id: 'alarm_control_panel.home', code: '42' } }]);
  assert.equal(c.state.pin, null, 'pad closes once HA accepts the code');
});

// v2 — camera WebRTC handshake, against a fake RTCPeerConnection and a fake
// backend bridge: the order of messages is what Home Assistant relies on.
test('WebRTC: offer, queued candidates, answer, then fallback on error', async () => {
  const log = [];
  class FakeStream { constructor() { this.tracks = []; } addTrack(t) { this.tracks.push(t); } getTracks() { return this.tracks; } }
  class FakePC {
    constructor(cfg) { this.cfg = cfg; this.signalingState = 'new'; FakePC.last = this; log.push('pc'); }
    createDataChannel(n) { log.push('datachannel:' + n); }
    addTransceiver(kind, o) { log.push('transceiver:' + kind + ':' + o.direction); }
    async createOffer() { return { type: 'offer', sdp: 'v=0 fake-offer' }; }
    async setLocalDescription() { this.signalingState = 'have-local-offer'; }
    async setRemoteDescription(d) { log.push('remote:' + d.type + ':' + d.sdp); this.signalingState = 'stable'; }
    async addIceCandidate(c) { log.push('addIce:' + c.candidate); }
    close() { log.push('close'); }
  }
  let onEvent = null;
  const be = {
    ws: async (msg) => {
      log.push('ws:' + msg.type + (msg.candidate ? ':' + msg.candidate.candidate + '@' + msg.session_id : ''));
      if (msg.type === 'camera/capabilities') return { frontend_stream_types: ['hls', 'web_rtc'] };
      if (msg.type === 'camera/webrtc/get_client_config') return { configuration: { iceServers: [] }, dataChannel: 'dc' };
      return {};
    },
    subscribe: (msg, cb) => { log.push('subscribe:' + msg.type + ':' + msg.offer); onEvent = cb; return { unsubscribe: () => log.push('unsubscribe') }; },
    cameraStream: async () => { throw new Error('no hls in this test'); }
  };
  Object.assign(sandbox, {
    RTCPeerConnection: FakePC, MediaStream: FakeStream, setTimeout, clearTimeout, setInterval, clearInterval,
    document: { visibilityState: 'hidden', createElement: () => ({ canPlayType: () => '' }) }
  });
  const c = make({ st: { 'camera.x': { state: 'idle', attributes: {} } } });
  c.be = be;
  c.state.cam = 'camera.x';
  await c._camStartStream('camera.x');
  for (let i = 0; i < 5; i++) await new Promise((r) => setImmediate(r));
  assert.equal(c.state.camStreamLayer, 'webrtc');
  assert.ok(log.includes('subscribe:camera/webrtc/offer:v=0 fake-offer'));
  assert.ok(log.indexOf('transceiver:audio:recvonly') < log.indexOf('subscribe:camera/webrtc/offer:v=0 fake-offer'));
  assert.ok(log.includes('datachannel:dc'));

  // a local candidate before the session id is queued, then sent with it
  FakePC.last.onicecandidate({ candidate: { candidate: 'local1', toJSON() { return { candidate: 'local1', sdpMid: '0' }; } } });
  assert.ok(!log.some((l) => l.startsWith('ws:camera/webrtc/candidate')));
  await onEvent({ type: 'session', session_id: 'S1' }, null);
  assert.ok(log.includes('ws:camera/webrtc/candidate:local1@S1'));
  await onEvent({ type: 'answer', answer: 'v=0 answer' }, null);
  assert.ok(log.includes('remote:answer:v=0 answer'));
  await onEvent({ type: 'candidate', candidate: { candidate: 'remote1', sdpMLineIndex: 0 } }, null);
  assert.ok(log.includes('addIce:remote1'));

  // an error event closes the session and falls back down the ladder
  await onEvent({ type: 'error', code: 'webrtc_offer_failed', message: 'no stream' }, null);
  for (let i = 0; i < 5; i++) await new Promise((r) => setImmediate(r));
  assert.ok(log.includes('close') && log.includes('unsubscribe'));
  assert.equal(c.state.camStreamLayer, 'snapshot', 'no HLS in this test: ends on stills');
  assert.equal(c.camDiag['camera.x'].failedLayer, 'webrtc');
  assert.equal(c.camDiag['camera.x'].failDetail, 'no stream');
  c._closeCam();
});

test('shared config editor: only a JSON object is accepted', () => {
  const p = CasaCore.parseSharedConfigText;
  assert.equal(p('{ "rooms": { "max": 8 } }').config.rooms.max, 8);
  assert.equal(p('{ rooms: 8 }').error, 'invalidJson');
  assert.equal(p('[1, 2]').error, 'notObject');
  assert.equal(p('null').error, 'notObject');
  assert.equal(p('"text"').error, 'notObject');
});

test('vmSharedConfig: admin actions depend on where the config comes from', () => {
  const c = make();
  c.strings = new Proxy({}, { get: (t, k) => String(k) });
  c.ALL_ROOMS_RESULT = () => ({ rooms: [], overflow: [] });
  c.ALL_CAMERAS_RESULT = () => [];
  c.fileConfig = { rooms: { max: 8 } };
  c.configDiag = { source: 'file', resolvedPath: '/local/live_dashboard_config.js' };
  c.panelUser = { isAdmin: true, name: 'Manuel' };
  let v = c.vmSharedConfig();
  assert.deepEqual(JSON.parse(JSON.stringify(v.sharedActions.map((a) => a.key))), ['import', 'panel', 'edit']);
  assert.equal(v.sharedCanEdit, true);
  c.configDiag = { source: 'ha' };
  c.sharedConfigInfo = { config: { rooms: {} }, updated_at: '2026-11-11T10:00:00Z', updated_by: 'Manuel' };
  v = c.vmSharedConfig();
  assert.deepEqual(JSON.parse(JSON.stringify(v.sharedActions.map((a) => a.key))), ['panel', 'edit', 'reset']);
  c.panelUser = { isAdmin: false, name: 'Sara' };
  v = c.vmSharedConfig();
  assert.equal(v.sharedActions.length, 0);
  assert.equal(v.sharedReadOnly, true);
});

test('vmCasaColumns: the left column goes only when both cards are hidden (issue #3)', () => {
  const all = make().vmCasaColumns();
  assert.equal(JSON.stringify(all), JSON.stringify({ showOnNow: true, showQuickActions: true, showLeftCol: true, casaCols: '3' }));
  const one = make({ prefs: { v: 1, modules: { onNow: false } } }).vmCasaColumns();
  assert.equal(one.showOnNow, false); assert.equal(one.showLeftCol, true); assert.equal(one.casaCols, '3');
  const none = make({ prefs: { v: 1, modules: { onNow: false, quickActions: false } } }).vmCasaColumns();
  assert.equal(none.showLeftCol, false); assert.equal(none.casaCols, '2');
  // "save for everyone" carries the two new switches into modules.hide
  const out = CasaDiscovery.buildExportedConfig({}, { modules: { onNow: false, quickActions: false } }, {});
  assert.equal(JSON.stringify(out.modules.hide), '["onNow","quickActions"]');
});

test('history sheet: History and statistics rows parse to sorted points', () => {
  const h = CasaCore.parseHistoryRows([
    { state: '20.5', last_changed: '2026-11-18T10:00:00Z' },
    { s: 'unavailable', lu: 1795000100 },
    { s: '21', lu: 1795000200 }
  ]);
  assert.equal(h.length, 2);
  assert.equal(h[1].v, 21); assert.equal(h[1].t, 1795000200000);
  const st = CasaCore.parseStatsRows([
    { start: 2000, mean: 19, min: 18, max: 20 },
    { start: '1970-01-01T00:00:01Z', mean: 18.5 },
    { start: 3000, mean: null }
  ]);
  assert.equal(JSON.stringify(st.map((p) => [p.t, p.v, p.lo, p.hi])), '[[1000,18.5,18.5,18.5],[2000,19,18,20]]');
});

test('history sheet: bucketing and chart geometry', () => {
  const pts = Array.from({ length: 1000 }, (_, i) => ({ t: i, v: i % 2 ? 10 : 20 }));
  const b = CasaCore.bucketSeries(pts, 0, 1000, 10);
  assert.equal(b.length, 10);
  assert.ok(b.every((p) => p.v === 15 && p.lo === 10 && p.hi === 20));
  const g = CasaCore.chartGeometry([{ t: 0, v: 10 }, { t: 100, v: 20 }], 0, 100, 300, 120, false);
  const [a, z] = g.line.split(' ').map((s) => s.split(',').map(Number));
  assert.equal(a[0], 0); assert.equal(z[0], 300);
  assert.ok(a[1] > z[1], 'higher value is drawn higher (smaller y)');
  assert.ok(a[1] < 120 && z[1] > 0, 'headroom above and below');
  assert.equal(g.band, '');
  assert.equal(CasaCore.chartGeometry([], 0, 1, 300, 120, false), null);
});

function histHost(wsImpl) {
  const c = make({ st: { 'sensor.t': sensor('21.3', '°C', { device_class: 'temperature', friendly_name: 'Temp' }) } });
  c.calls = [];
  c.setState = (patch) => { c.state = Object.assign({}, c.state, patch); };
  c._bindAttr = (name, value) => value;
  c.be = { ws: wsImpl };
  return c;
}

test('history sheet: 7 days use statistics, and fall back to History without them', async () => {
  const seen = [];
  const withStats = histHost(async (m) => {
    seen.push(m.type);
    if (m.type === 'recorder/statistics_during_period') {
      return { 'sensor.t': Array.from({ length: 168 }, (_, i) => ({ start: Date.now() - (168 - i) * 3600000, mean: 20 + (i % 5), min: 19, max: 26 })) };
    }
    return {};
  });
  withStats.CHIST_OPEN('sensor.t', 'Temp');
  await new Promise((r) => setTimeout(r, 0));
  withStats.CHIST_RANGE('7d');
  await new Promise((r) => setTimeout(r, 0));
  let vm = withStats.vmClimateHistory();
  assert.equal(vm.chistReady, true);
  assert.equal(vm.chistSource, 'hist.source.stats');
  assert.ok(vm.chistBandRef.length > 0, 'min–max band drawn from statistics');
  assert.equal(vm.chistXLabels.length, 7);
  assert.equal(JSON.stringify(seen), '["history/history_during_period","recorder/statistics_during_period"]');

  const noStats = histHost(async (m) => {
    if (m.type === 'recorder/statistics_during_period') return { 'sensor.t': [] };
    return { 'sensor.t': [{ state: '20', last_changed: new Date(Date.now() - 5 * 86400000).toISOString() }, { s: '22', lu: Date.now() / 1000 - 3600 }] };
  });
  noStats.state.chist = { id: 'sensor.t', label: 'Temp', range: '7d' };
  await noStats._chistLoad('sensor.t', '7d');
  vm = noStats.vmClimateHistory();
  assert.equal(vm.chistSource, 'hist.source.historyFallback');
  assert.equal(vm.chistBandRef, '');
  assert.equal(JSON.stringify(vm.chistStats.map((s) => s.val)), '["20,0°","21,1°","22,0°"]');
});

test('history sheet: empty, error, and non-sensor readings', async () => {
  const empty = histHost(async () => ({}));
  empty.st = empty.state.st; empty.state.st['sensor.t'].state = 'unknown';
  assert.equal(empty.CHIST_CAN('sensor.t'), false, 'no number now: not tappable');
  assert.equal(empty.chistTap('weather.home', 'x').histHint, '0');
  const failing = histHost(async () => { throw new Error('boom'); });
  failing.CHIST_OPEN('sensor.t', 'Temp');
  await new Promise((r) => setTimeout(r, 0));
  const vm = failing.vmClimateHistory();
  assert.equal(vm.chistFailed, true);
  assert.equal(vm.chistReady, false);
  failing.CHIST_CLOSE();
  assert.equal(failing.vmClimateHistory().chistOpen, false);
});

test('TVs count as on in any state but off/standby/unavailable/unknown', () => {
  const st = {
    'media_player.samsung': { state: 'on', attributes: {} },
    'media_player.philips': { state: 'on', attributes: { media_title: 'TV8 HD' } },
    'media_player.paused': { state: 'paused', attributes: { media_title: 'Film' } },
    'media_player.idle': { state: 'idle', attributes: { source: 'HDMI 1' } },
    'media_player.off': { state: 'off', attributes: {} },
    'media_player.standby': { state: 'standby', attributes: {} },
    'media_player.gone': { state: 'unavailable', attributes: {} }
  };
  const c = make({ st });
  c.at = (id, a) => (st[id].attributes || {})[a];
  c.s = (id) => st[id].state;
  const on = Object.keys(st).filter((id) => c.MEDIA_ON(id));
  assert.equal(JSON.stringify(on), '["media_player.samsung","media_player.philips","media_player.paused","media_player.idle"]');
  assert.equal(c.mediaSub('media_player.samsung'), 'common.on');
  assert.equal(c.mediaSub('media_player.philips'), 'TV8 HD');
  assert.equal(c.mediaSub('media_player.paused'), 'Film · media.paused');
  assert.equal(c.mediaSub('media_player.idle'), 'HDMI 1');
  assert.equal(c.mediaSub('media_player.off'), 'common.off');
  assert.equal(c.mediaSub('media_player.gone'), 'common.unreachable');
});

test('room summary: what is on comes before lights off and covers', () => {
  const st = {
    'light.a': { state: 'off', attributes: {} },
    'cover.a': { state: 'open', attributes: { current_position: 100 } },
    'media_player.tv': { state: 'on', attributes: {} }
  };
  const c = make({ st });
  c.s = (id) => st[id].state;
  c.at = (id, a) => (st[id].attributes || {})[a];
  assert.equal(c.roomSummary({ lights: ['light.a'], covers: ['cover.a'], media: ['media_player.tv'] }), 'room.tvOn · room.lightsOff');
  st['media_player.tv'].state = 'off';
  assert.equal(c.roomSummary({ lights: ['light.a'], covers: ['cover.a'], media: ['media_player.tv'] }), 'room.lightsOff · room.coverPct');
});

test('vmGardenZone: advice, warnings and record_irrigation buttons', () => {
  const st = {
    'binary_sensor.z_needs': { state: 'on', attributes: { reasons: [{ code: 'deficit_reached_raw', deficit_mm: 24.5, raw_mm: 20 }], warnings: [{ code: 'rain_forecast', forecast_mm: 3.2 }] } },
    'sensor.z_rec': { state: '24.5', attributes: {} },
    'sensor.z_min': { state: '98', attributes: {} },
    'sensor.z_def': { state: '24.5', attributes: { unit_of_measurement: 'mm' } },
    'sensor.z_7d': { state: '0', attributes: {} },
    'sensor.z_last': { state: 'unknown', attributes: {} },
    'sensor.z_soil': { state: 'ok', attributes: { value_pct: 41, entity_id: 'sensor.wh51' } }
  };
  const c = make({ st });
  c.s = (id) => st[id].state;
  c.at = (id, a) => (st[id].attributes || {})[a];
  c.t = (k, p) => k + (p ? JSON.stringify(p) : '');
  const z = { name: 'Zona 1', gi: { deviceId: 'dev1', entities: {
    needs_irrigation: 'binary_sensor.z_needs', recommended_irrigation: 'sensor.z_rec', recommended_minutes_mains: 'sensor.z_min',
    deficit: 'sensor.z_def', irrigation_7d: 'sensor.z_7d', last_irrigation: 'sensor.z_last', soil_moisture_status: 'sensor.z_soil' } } };
  const made = [];
  const vm = c.vmGardenZone(z, (label, key, run) => { made.push({ label, key, run }); return { label }; });
  assert.equal(vm.tone, 'warn');
  assert.ok(vm.advisory.startsWith('irrigation.giWater'));
  assert.ok(vm.urgenza.includes('irrigation.recommendedMin{"n":98}') && vm.urgenza.includes('irrigation.giWarnRain'));
  assert.equal(vm.soil, '41%');
  assert.equal(made.length, 3);
  made[0].run();
  assert.equal(JSON.stringify(c.calls[0]), JSON.stringify({ domain: 'garden_irrigation', service: 'record_irrigation', data: { zone: 'dev1', source: 'mains', minutes: 5 } }));
  st['binary_sensor.z_needs'].state = 'off';
  st['binary_sensor.z_needs'].attributes.reasons = [{ code: 'deficit_below_raw', deficit_mm: 8, raw_mm: 20 }];
  st['binary_sensor.z_needs'].attributes.warnings = [];
  const ok = c.vmGardenZone(z, (label) => ({ label }));
  assert.equal(ok.tone, 'ok');
  assert.ok(ok.advisory.startsWith('irrigation.giNoNeed'));
});

test('IRRIGATION: explicit zones win over Garden Irrigation discovery', () => {
  const c = make();
  c.discovery = { discoverGardenIrrigation: () => ({ zones: [{ deviceId: 'd', name: 'Zona 1', entities: {} }], system: { et0_yesterday: 'sensor.e' } }) };
  c.cfg = { irrigation: null };
  assert.equal(c.IRRIGATION().zones[0].gi.deviceId, 'd');
  assert.equal(c.IRRIGATION().gardenIrrigation.et0_yesterday, 'sensor.e');
  c.cfg = { irrigation: { zones: [{ name: 'Manual', moisture: 'sensor.m' }] } };
  assert.equal(c.IRRIGATION().zones[0].name, 'Manual');
});

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

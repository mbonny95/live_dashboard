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

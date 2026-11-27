// Plain Node, no deps: `node --test tests/`. discovery.js is a classic script
// (window.CasaDiscovery global), loaded via vm so this exercises the exact
// shipped source — same approach as mapEnergyPrefs.test.mjs.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(__dirname, '../public/discovery.js'), 'utf8'), sandbox);
const D = sandbox.window.CasaDiscovery;
// Cross-realm objects (Map, Array from the vm) — compare as plain data.
const plain = (x) => JSON.parse(JSON.stringify(x));

// --- mergeSectionOrder (v1.7.0) -------------------------------------------

test('mergeSectionOrder: empty saved order returns the default', () => {
  assert.deepEqual(plain(D.mergeSectionOrder([], ['alarm', 'energy', 'cameras'])), ['alarm', 'energy', 'cameras']);
  assert.deepEqual(plain(D.mergeSectionOrder(null, ['alarm', 'energy'])), ['alarm', 'energy']);
});

test('mergeSectionOrder: a saved order wins', () => {
  assert.deepEqual(plain(D.mergeSectionOrder(['cameras', 'alarm', 'energy'], ['alarm', 'energy', 'cameras'])),
    ['cameras', 'alarm', 'energy']);
});

test('mergeSectionOrder: a section unknown to the saved order lands next to its default neighbour, not at the end', () => {
  // A future fourth section 'weather' that defaults to right after 'alarm'.
  assert.deepEqual(plain(D.mergeSectionOrder(['energy', 'alarm', 'cameras'], ['alarm', 'weather', 'energy', 'cameras'])),
    ['energy', 'alarm', 'weather', 'cameras']);
});

test('mergeSectionOrder: drops unknown ids and duplicates', () => {
  // 'cameras' (missing from saved) goes right after 'energy', its
  // predecessor in the default order — wherever 'energy' now sits.
  assert.deepEqual(plain(D.mergeSectionOrder(['gone', 'energy', 'energy', 'alarm'], ['alarm', 'energy', 'cameras'])),
    ['energy', 'cameras', 'alarm']);
});

// --- resolveVisible (v1.5.0) ----------------------------------------------

test('resolveVisible: panel choice beats config.js, config.js beats default', () => {
  const configHidden = new Set(['a']);
  assert.equal(D.resolveVisible('a', {}, configHidden), false);
  assert.equal(D.resolveVisible('a', { a: true }, configHidden), true, 'panel can re-show what config.js hides');
  assert.equal(D.resolveVisible('b', { b: false }, configHidden), false);
  assert.equal(D.resolveVisible('c', null, null), true);
});

// --- smart plugs (v1.5.4) -------------------------------------------------

const plugStates = (state, watts, unit = 'W') => ({
  'switch.plug': { state, attributes: {} },
  'sensor.plug_power': { state: String(watts), attributes: { device_class: 'power', unit_of_measurement: unit } }
});

test('classifySwitchPower: off / active / running around the threshold', () => {
  assert.equal(D.classifySwitchPower(plugStates('off', 500), 'switch.plug', 'sensor.plug_power').level, 'off');
  assert.equal(D.classifySwitchPower(plugStates('on', 1.2), 'switch.plug', 'sensor.plug_power').level, 'active');
  assert.equal(D.classifySwitchPower(plugStates('on', 3), 'switch.plug', 'sensor.plug_power').level, 'running', 'default threshold is 3 W, inclusive');
  assert.equal(D.classifySwitchPower(plugStates('on', 8), 'switch.plug', 'sensor.plug_power', 10).level, 'active', 'custom threshold');
});

test('classifySwitchPower: kW is normalized to W', () => {
  const r = D.classifySwitchPower(plugStates('on', 0.75, 'kW'), 'switch.plug', 'sensor.plug_power');
  assert.equal(r.level, 'running');
  assert.equal(r.watts, 750);
});

test('classifySwitchPower: an unknown unit or a non-number is an honest null, never a guess', () => {
  assert.equal(D.classifySwitchPower(plugStates('on', 5, 'VA'), 'switch.plug', 'sensor.plug_power').level, null);
  assert.equal(D.classifySwitchPower(plugStates('on', 'unavailable'), 'switch.plug', 'sensor.plug_power').level, null);
  assert.equal(D.classifySwitchPower(plugStates('on', 5), 'switch.plug', null).level, null);
});

test('powerSensorForSwitch: pairs a switch with the power sensor on the same device', () => {
  const states = plugStates('on', 5);
  const registries = { entities: [
    { entity_id: 'switch.plug', device_id: 'dev1' },
    { entity_id: 'sensor.plug_power', device_id: 'dev1' },
    { entity_id: 'switch.lonely', device_id: 'dev2' }
  ] };
  assert.deepEqual(plain([...D.powerSensorForSwitch(states, registries)]), [['switch.plug', 'sensor.plug_power']]);
});

// --- duplicated Matter devices (v1.7.1) -----------------------------------

test('findDuplicateDevices: matches an area-less copy to its original by serial number', () => {
  const pairs = D.findDuplicateDevices({ devices: [
    { id: 'old', area_id: 'soggiorno', serial_number: 'SN1' },
    { id: 'new', area_id: null, serial_number: 'SN1' },
    { id: 'other', area_id: null, serial_number: 'SN2' }
  ] });
  assert.equal(pairs.length, 1);
  assert.equal(pairs[0].withoutArea.id, 'new');
  assert.equal(pairs[0].withArea.id, 'old');
  assert.equal(pairs[0].matchedBy, 'serial_number');
});

test('findDuplicateDevices: a partial hw/model match stays silent', () => {
  const pairs = D.findDuplicateDevices({ devices: [
    { id: 'a', area_id: 'x', hw_version: '1', model: 'M', via_device_id: 'hub1' },
    { id: 'b', area_id: null, hw_version: '1', model: 'M', via_device_id: 'hub2' }
  ] });
  assert.equal(pairs.length, 0);
});

// --- discoverRooms discard reasons (v1.7.1) -------------------------------

test('discoverRooms: every discarded entity says why', () => {
  const states = {
    'light.kitchen': { state: 'on', attributes: { friendly_name: 'Kitchen' } },
    'light.orphan': { state: 'off', attributes: {} },
    'switch.valve': { state: 'off', attributes: {} }
  };
  const registries = {
    areas: [{ area_id: 'kitchen', name: 'Kitchen' }],
    devices: [],
    entities: [
      { entity_id: 'light.kitchen', area_id: 'kitchen' },
      { entity_id: 'light.orphan' },
      { entity_id: 'light.ghost', area_id: 'kitchen' },
      { entity_id: 'switch.valve', area_id: 'kitchen' }
    ]
  };
  const config = { irrigation: { zones: [{ valve: 'switch.valve' }] } };
  const res = D.discoverRooms(states, registries, config);
  assert.deepEqual(plain(res.rooms.map((r) => r.id)), ['kitchen']);
  assert.deepEqual(plain(res.rooms[0].lights), ['light.kitchen']);
  const reasons = Object.fromEntries(res.discardLog.map((d) => [d.entity_id, d.reason]));
  assert.equal(reasons['light.orphan'], 'no_area');
  assert.equal(reasons['light.ghost'], 'no_state');
  assert.equal(reasons['switch.valve'], 'claimed_by_module');
  assert.equal(res.discardLog.find((d) => d.entity_id === 'switch.valve').module, 'irrigation');
});

test('discoverRooms: no areas at all is an empty result, not a crash', () => {
  assert.deepEqual(plain(D.discoverRooms({}, { areas: [] }, {})), { rooms: [], overflow: [], discardLog: [] });
});

// v2.2.0 — Garden Irrigation 2.x zones, shaped like a real install's registry.
function gardenIrrigationFixture() {
  const st = {};
  const entities = [];
  const add = (id, device, key, state, attributes) => {
    st[id] = { state, attributes: attributes || {} };
    entities.push({ entity_id: id, platform: 'garden_irrigation', device_id: device, translation_key: key, unique_id: device + '_' + key, disabled_by: null });
  };
  add('sensor.garden_irrigation_evapotraspirazione_di_riferimento_ieri', 'sys', 'et0_yesterday', '2.1');
  add('sensor.garden_irrigation_pioggia_ieri', 'sys', 'rain_yesterday', '0.0');
  add('binary_sensor.zona_1_da_irrigare', 'z1', 'needs_irrigation', 'off');
  add('sensor.zona_1_deficit_idrico_del_suolo', 'z1', 'deficit', '12.3');
  add('sensor.zona_1_minuti_consigliati_rete', 'z1', 'recommended_minutes_mains', '0');
  add('sensor.zona_2_deficit_idrico_del_suolo', 'z2', 'deficit', '30.0');
  add('binary_sensor.zona_2_da_irrigare', 'z2', 'needs_irrigation', 'on');
  entities.push({ entity_id: 'sensor.other', platform: 'template', device_id: 'z1', unique_id: 'x_deficit' });
  st['sensor.other'] = { state: '1', attributes: {} };
  const devices = [{ id: 'sys', name: 'Garden Irrigation' }, { id: 'z2', name: 'Zona 2', name_by_user: 'Giardino grande' }, { id: 'z1', name: 'Zona 1' }];
  return { st, registries: { areas: [], devices, entities } };
}

test('discoverGardenIrrigation: zones by device, system apart, by translation_key', () => {
  const { st, registries } = gardenIrrigationFixture();
  const gi = D.discoverGardenIrrigation(st, registries);
  assert.equal(gi.zones.map((z) => z.name).join('|'), 'Giardino grande|Zona 1');
  assert.equal(gi.zones[1].entities.deficit, 'sensor.zona_1_deficit_idrico_del_suolo');
  assert.equal(gi.zones[1].entities.recommended_minutes_mains, 'sensor.zona_1_minuti_consigliati_rete');
  assert.equal(gi.system.et0_yesterday, 'sensor.garden_irrigation_evapotraspirazione_di_riferimento_ieri');
  assert.equal(D.discoverGardenIrrigation(st, { entities: [], devices: [] }), null);
});

test('discoverGardenIrrigation: unique_id suffix when translation_key is missing', () => {
  const { st, registries } = gardenIrrigationFixture();
  registries.entities.forEach((e) => { delete e.translation_key; });
  const gi = D.discoverGardenIrrigation(st, registries);
  assert.equal(gi.zones.length, 2);
  assert.equal(gi.zones[0].entities.needs_irrigation, 'binary_sensor.zona_2_da_irrigare');
});

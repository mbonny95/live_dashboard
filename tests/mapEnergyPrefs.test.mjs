// Plain-Node test, no framework/deps: run with `node tests/mapEnergyPrefs.test.mjs`.
// discovery.js is a classic script (window.CasaDiscovery global, see the note
// at the bottom of that file for why it isn't an ES module) — loaded here via
// vm so this exercises the exact shipped source, not a reimplementation.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = fs.readFileSync(path.join(__dirname, '../public/discovery.js'), 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(src, sandbox);
const { mapEnergyPrefs } = sandbox.window.CasaDiscovery;
// vm runs the sandbox in its own realm, so arrays/objects it returns don't
// share a prototype with this file's — round-trip through JSON so
// assert.deepEqual compares plain data, not cross-realm identity.
const call = (prefs) => JSON.parse(JSON.stringify(mapEnergyPrefs(prefs)));

let passed = 0;
function test(name, fn) {
  fn();
  passed++;
  console.log(`ok - ${name}`);
}

// Real dump from a live install (see the v1.4.3 bug report): grid source
// with stat_energy_from/stat_energy_to directly on the object, no
// flow_from/flow_to arrays at all. This is the shape v1.4.1 didn't handle —
// mapEnergyPrefs found solar (already flat) but silently returned nothing
// for prelievo/immissione, because it only ever looked at flow_from[]/flow_to[].
test('flat grid source (real-world dump)', () => {
  const prefs = {
    energy_sources: [
      {
        type: 'solar',
        stat_energy_from: 'sensor.fusion_solar_installation_ne_320221624_panel_production_lifetime',
        stat_rate: 'sensor.fusion_solar_installation_ne_320221624_panel_production_power',
        config_entry_solar_forecast: null
      },
      {
        type: 'grid',
        stat_energy_from: 'sensor.fusion_solar_installation_ne_320221624_grid_consumption_lifetime',
        stat_energy_to: 'sensor.fusion_solar_installation_ne_320221624_grid_injection_lifetime',
        stat_cost: null,
        stat_compensation: null,
        number_energy_price: 0.2,
        number_energy_price_export: null,
        entity_energy_price: null,
        entity_energy_price_export: null,
        cost_adjustment_day: 0
      }
    ]
  };
  const result = call(prefs);
  assert.deepEqual(result, {
    production: ['sensor.fusion_solar_installation_ne_320221624_panel_production_lifetime'],
    gridImport: ['sensor.fusion_solar_installation_ne_320221624_grid_consumption_lifetime'],
    gridExport: ['sensor.fusion_solar_installation_ne_320221624_grid_injection_lifetime']
  });
});

// The nested/array form (multiple grid contracts, e.g. day/night tariff
// meters) — introduced in v1.4.1, must keep working unchanged.
test('nested grid source (flow_from/flow_to arrays)', () => {
  const prefs = {
    energy_sources: [
      { type: 'solar', stat_energy_from: 'sensor.solar_a' },
      { type: 'solar', stat_energy_from: 'sensor.solar_b' },
      {
        type: 'grid',
        flow_from: [{ stat_energy_from: 'sensor.grid_import_day' }, { stat_energy_from: 'sensor.grid_import_night' }],
        flow_to: [{ stat_energy_to: 'sensor.grid_export' }]
      },
      { type: 'low_carbon', stat_energy_from: 'sensor.low_carbon' }
    ]
  };
  const result = call(prefs);
  assert.deepEqual(result, {
    production: ['sensor.solar_a', 'sensor.solar_b'],
    gridImport: ['sensor.grid_import_day', 'sensor.grid_import_night'],
    gridExport: ['sensor.grid_export']
  });
});

// A mixed install (flat + nested on the same source object) must not double
// count an id that appears in both places.
test('mixed flat + nested on one source, deduped', () => {
  const prefs = {
    energy_sources: [
      {
        type: 'grid',
        stat_energy_from: 'sensor.grid_import',
        stat_energy_to: 'sensor.grid_export',
        flow_from: [{ stat_energy_from: 'sensor.grid_import' }, { stat_energy_from: 'sensor.grid_import_extra' }],
        flow_to: [{ stat_energy_to: 'sensor.grid_export' }]
      }
    ]
  };
  const result = call(prefs);
  assert.deepEqual(result, {
    production: [],
    gridImport: ['sensor.grid_import', 'sensor.grid_import_extra'],
    gridExport: ['sensor.grid_export']
  });
});

test('no energy_sources at all returns null', () => {
  assert.equal(call({ energy_sources: [] }), null);
  assert.equal(call(null), null);
  assert.equal(call({}), null);
});

console.log(`\n${passed} passed`);

// v2 — consistency checks for the Home Assistant integration in
// custom_components/live_dashboard/ (its Python is exercised on a real Home
// Assistant and by hassfest in CI; these catch the drift that would only
// show up after a release).
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const json = (p) => JSON.parse(read(p));
const INT = 'custom_components/live_dashboard/';

test('manifest version == panel.js VERSION (without -dev)', () => {
  const version = read('public/panel.js').match(/const VERSION = '([^']+)'/)[1].replace(/-dev\.\d+$/, '');
  assert.equal(json(INT + 'manifest.json').version, version);
});

test('manifest: domain, single entry, config flow, panel dependencies', () => {
  const m = json(INT + 'manifest.json');
  assert.equal(m.domain, 'live_dashboard');
  assert.equal(m.single_config_entry, true);
  assert.equal(m.config_flow, true);
  for (const dep of ['frontend', 'http', 'panel_custom']) assert.ok(m.dependencies.includes(dep), dep);
  // hassfest: domain and name first, then alphabetical.
  const keys = Object.keys(m);
  assert.deepEqual(keys.slice(0, 2), ['domain', 'name']);
  assert.deepEqual(keys.slice(2), [...keys.slice(2)].sort());
});

test('the panel element name matches what panel.js derives from the served path', () => {
  const c = read(INT + 'const.py');
  const base = c.match(/URL_BASE = "\/([^"]+)"/)[1];
  const element = c.match(/PANEL_ELEMENT = "([^"]+)"/)[1];
  assert.equal(element, base + '-panel', 'panel.js registers <last path segment>-panel');
});

test('hacs.json: zip release for the Integration category', () => {
  const h = json('hacs.json');
  assert.equal(h.zip_release, true);
  assert.equal(h.filename, 'live_dashboard.zip');
  assert.ok(!('content_in_root' in h), 'plugin-only key');
  assert.ok(read('.github/workflows/release.yml').includes('cp -R public/. build/www/'), 'release zip ships public/ as www/');
});

test('translations: en.json == strings.json, it.json has the same keys', () => {
  const strings = json(INT + 'strings.json');
  assert.deepEqual(json(INT + 'translations/en.json'), strings);
  const keys = (o, p = '') => Object.entries(o).flatMap(([k, v]) => (v && typeof v === 'object' ? keys(v, p + k + '.') : [p + k]));
  assert.deepEqual(keys(json(INT + 'translations/it.json')).sort(), keys(strings).sort());
});

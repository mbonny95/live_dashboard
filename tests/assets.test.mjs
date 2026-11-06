// Shipped-asset invariants that nothing else would catch until a user's
// wall tablet showed a blank or half-translated screen.
import test from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pub = (...p) => path.join(__dirname, '../public', ...p);

// v1.9.0 — public/vendor/ must stay byte-identical to the unpkg files
// support.js pins by SRI: if the local copy ever drifts, the CDN fallback
// and the local file would be two different Reacts.
test('vendored React matches the SRI pinned in support.js', () => {
  const support = fs.readFileSync(pub('support.js'), 'utf8');
  const pairs = [
    ['react-18.3.1.production.min.js', /REACT_SRI = "([^"]+)"/],
    ['react-dom-18.3.1.production.min.js', /REACT_DOM_SRI = "([^"]+)"/]
  ];
  for (const [file, re] of pairs) {
    const pinned = support.match(re)[1];
    const actual = 'sha384-' + crypto.createHash('sha384').update(fs.readFileSync(pub('vendor', file))).digest('base64');
    assert.equal(actual, pinned, file);
  }
});

// v1.9.0 — the camera live view's second layer (see _ensureHlsJs) loads
// this exact path; the hash is the one recorded in public/vendor/README.md.
test('vendored hls.js is present, pinned, and where both pages look for it', () => {
  const file = pub('vendor', 'hls.light.min.js');
  const actual = 'sha384-' + crypto.createHash('sha384').update(fs.readFileSync(file)).digest('base64');
  assert.equal(actual, 'sha384-vpNtFjJmrPAaL9LfqByx3MxTVjqrtQ6Ue6UVNnFeghNrhE0uvpydDr3tkTVcBgDz');
  assert.ok(fs.readFileSync(pub('vendor', 'README.md'), 'utf8').includes(actual), 'vendor/README.md records the hash');
  for (const page of ['dash_neumo.html', 'dash_neumo_mobile.html']) {
    assert.ok(fs.readFileSync(pub(page), 'utf8').includes("bust('./vendor/hls.light.min.js')"), page);
  }
});

test('both pages load vendored React before support.js', () => {
  for (const page of ['dash_neumo.html', 'dash_neumo_mobile.html']) {
    const html = fs.readFileSync(pub(page), 'utf8');
    const react = html.indexOf('./vendor/react-18.3.1.production.min.js');
    const dom = html.indexOf('./vendor/react-dom-18.3.1.production.min.js');
    const support = html.indexOf('<script src="./support.js">');
    assert.ok(react > 0 && dom > react && support > dom, page);
  }
});

// Every key in one dictionary must exist in the other: a missing key shows
// the raw key name on screen, in only one of the two languages.
test('it.js and en.js have the same keys', () => {
  const load = (lang) => {
    const sandbox = { window: {} };
    vm.runInNewContext(fs.readFileSync(pub('i18n', lang + '.js'), 'utf8'), sandbox);
    return sandbox.window.CasaStrings[lang];
  };
  const flat = (o, prefix = '') => Object.entries(o).flatMap(([k, v]) =>
    v && typeof v === 'object' && !Array.isArray(v) ? flat(v, prefix + k + '.') : [prefix + k]);
  const it = new Set(flat(load('it')));
  const en = new Set(flat(load('en')));
  assert.deepEqual([...it].filter((k) => !en.has(k)), [], 'in it.js, missing from en.js');
  assert.deepEqual([...en].filter((k) => !it.has(k)), [], 'in en.js, missing from it.js');
});

// One VERSION, in panel.js — the CHANGELOG's newest entry must name it.
test('panel.js VERSION matches the newest CHANGELOG entry', () => {
  const version = fs.readFileSync(pub('panel.js'), 'utf8').match(/const VERSION = '([^']+)'/)[1];
  const changelog = fs.readFileSync(path.join(__dirname, '../CHANGELOG.md'), 'utf8');
  const newest = changelog.match(/^## \[([^\]]+)\]/m)[1];
  assert.equal(newest, version);
});

// v1.9.0 — the pages start with no internet: nothing they load at startup
// may point off-origin. (support.js keeps unpkg URLs only as the fallback
// for a missing vendor/ folder, see the React test above.)
test('pages load no fonts, styles or scripts from the internet', () => {
  for (const page of ['dash_neumo.html', 'dash_neumo_mobile.html']) {
    const html = fs.readFileSync(pub(page), 'utf8');
    assert.ok(!/@import\s+url\(['"]?https?:/i.test(html), page + ': remote @import');
    assert.ok(!/<script[^>]+src=["']https?:/i.test(html), page + ': remote <script src>');
    assert.ok(!/<link[^>]+href=["']https?:/i.test(html), page + ': remote <link href>');
    assert.ok(!/fonts\.(googleapis|gstatic)\.com/.test(html), page + ': Google Fonts');
    for (const m of html.matchAll(/url\('\.\/vendor\/fonts\/([^']+)'\)/g)) {
      assert.ok(fs.existsSync(pub('vendor', 'fonts', m[1])), page + ': missing ' + m[1]);
    }
  }
});

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
  // v2: the camera code lives in casa-core.js, shared by both pages.
  assert.ok(fs.readFileSync(pub('casa-core.js'), 'utf8').includes("bust('./vendor/hls.light.min.js')"), 'casa-core.js');
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
  // Development builds deployed for testing carry a -dev.N suffix.
  assert.equal(newest, version.replace(/-dev\.\d+$/, ''));
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

// v2 — support.js is generated from a dc-runtime source that isn't in this
// repo: it's a frozen dependency, like vendor/. A change here is either an
// accident or a deliberate runtime upgrade that must update this hash.
test('support.js is unchanged (frozen runtime)', () => {
  const actual = 'sha384-' + crypto.createHash('sha384').update(fs.readFileSync(pub('support.js'))).digest('base64');
  assert.equal(actual, 'sha384-xAg2t0rI8+cBnVqE9RknRsPnD0SffYVAeU0LLdbctda9Goznx4uSZzjsKpFk4ncI');
});

// version.json is what the pages' ?v= comes from (see panel.js
// resolveAssetVersion); VERSION is its fallback — they must agree.
test('version.json matches panel.js VERSION', () => {
  const version = fs.readFileSync(pub('panel.js'), 'utf8').match(/const VERSION = '([^']+)'/)[1];
  assert.equal(JSON.parse(fs.readFileSync(pub('version.json'), 'utf8')).version, version);
});

// v2 — the runtime evaluates each page's `class Component extends
// window.CasaCore.base(DCLogic)` right after React loads: casa-core.js must
// be requested before support.js, or CasaCore doesn't exist yet.
test('both pages load casa-core.js before support.js', () => {
  assert.ok(fs.existsSync(pub('casa-core.js')));
  for (const page of ['dash_neumo.html', 'dash_neumo_mobile.html']) {
    const html = fs.readFileSync(pub(page), 'utf8');
    const core = html.indexOf("./casa-core.js");
    const support = html.indexOf('<script src="./support.js">');
    assert.ok(core > 0 && support > core, page);
    assert.ok(html.includes('class Component extends window.CasaCore.base(DCLogic)'), page);
  }
});

// v2 — the point of casa-core.js is that shared logic exists once. A page
// redefining a method the base already has would silently override it for
// that layout only: exactly the "fixed on desktop, still broken on mobile"
// drift this file was created to end.
test('pages do not redefine methods that live in casa-core.js', () => {
  const methodNames = (src) => new Set([...src.matchAll(/^  (?:async )?([A-Za-z_$][\w$]*)\s*\([^)]*\)\s*\{/gm)].map((m) => m[1]));
  const core = methodNames(fs.readFileSync(pub('casa-core.js'), 'utf8'));
  assert.ok(core.size > 80, 'expected the shared methods in casa-core.js');
  for (const page of ['dash_neumo.html', 'dash_neumo_mobile.html']) {
    const html = fs.readFileSync(pub(page), 'utf8');
    const cls = html.slice(html.indexOf('class Component extends window.CasaCore.base(DCLogic)'));
    const clash = [...methodNames(cls.slice(0, cls.indexOf('</script>')))].filter((m) => core.has(m));
    assert.deepEqual(clash, [], page + ' redefines shared methods');
  }
});

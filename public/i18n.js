// i18n.js — language resolution + string lookup. Two dictionaries only
// (it/en, see i18n/it.js and i18n/en.js): hass.language picks one, config.js
// can override it, and anything unrecognized falls back to English.
//
// Classic script (not an ES module): i18n/it.js and i18n/en.js are loaded
// the same way, each setting window.CasaStrings.<lang> — see the note in
// discovery.js about why dynamic import() isn't used here, and why this is
// wrapped in an IIFE (shared global scope with every other loaded file).

(function () {

var CASA_I18N_SUPPORTED = ['it', 'en'];

function casaResolveLang(cfg, hassLanguage) {
  const candidates = [
    cfg && cfg.language,
    hassLanguage,
    (typeof navigator !== 'undefined' && navigator.language) || null
  ];
  for (const c of candidates) {
    if (!c) continue;
    const short = String(c).slice(0, 2).toLowerCase();
    if (CASA_I18N_SUPPORTED.indexOf(short) !== -1) return short;
  }
  return 'en';
}

// i18n/it.js and i18n/en.js are both preloaded as <script> tags before this
// runs (see loadScript() calls in dash_neumo*.html), so the dictionary is
// already sitting on window.CasaStrings — no async load needed.
function casaGetStrings(lang) {
  const dict = window.CasaStrings && window.CasaStrings[lang];
  return dict || (window.CasaStrings && window.CasaStrings.en) || {};
}

// {n} / {name} / ... placeholders, replaced by simple string substitution —
// no plural rules, this UI doesn't need them (counts read fine as "1 luce
// accesa" / "1 light on" either way).
function casaMakeT(strings) {
  return function t(key, vars) {
    let s = strings[key] != null ? strings[key] : key;
    if (vars) for (const k in vars) s = s.split('{' + k + '}').join(vars[k]);
    return s;
  };
}

window.CasaI18n = { resolveLang: casaResolveLang, getStrings: casaGetStrings, makeT: casaMakeT };

})();

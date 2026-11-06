# Mobile Boot and Runtime Loading

> 22 nodes · cohesion 0.13

## Key Concepts

- **_boot()** (18 connections) — `public/dash_neumo_mobile.html`
- **dash_neumo_mobile.html (phone layout)** (10 connections) — `public/dash_neumo_mobile.html`
- **bust()** (5 connections) — `public/dash_neumo_mobile.html`
- **_ensureHlsJs()** (5 connections) — `public/dash_neumo_mobile.html`
- **loadUserConfig()** (5 connections) — `public/dash_neumo_mobile.html`
- **loadScript()** (4 connections) — `public/dash_neumo_mobile.html`
- **window.CASA_REACT_SOURCE** (3 connections) — `public/dash_neumo_mobile.html`
- **mergeConfig()** (3 connections) — `public/dash_neumo_mobile.html`
- **vendor/react-18.3.1 + react-dom UMD script tags** (3 connections) — `public/dash_neumo_mobile.html`
- **connect()** (3 connections) — `public/ha-backend.js`
- **i18n.js** (3 connections) — `public/i18n.js`
- **ASSET_V (?v= cache-bust version)** (2 connections) — `public/dash_neumo_mobile.html`
- **energyDiag (daily energy source resolution)** (2 connections) — `public/dash_neumo_mobile.html`
- **_loadHistory()** (2 connections) — `public/dash_neumo_mobile.html`
- **ha-backend.js** (2 connections) — `public/ha-backend.js`
- **isDemoRequested()** (2 connections) — `public/ha-backend.js`
- **casaGetStrings()** (2 connections) — `public/i18n.js`
- **casaMakeT()** (2 connections) — `public/i18n.js`
- **casaResolveLang()** (2 connections) — `public/i18n.js`
- **CONFIG_PATHS (/local/live_dashboard_config.js first)** (1 connections) — `public/dash_neumo_mobile.html`
- **DEFAULT_CONFIG** (1 connections) — `public/dash_neumo_mobile.html`
- **vendor/hls.light.min.js (lazy)** (1 connections) — `public/dash_neumo_mobile.html`

## Relationships

- [Desktop Component Core](Desktop_Component_Core.md) (13 shared connections)
- [prefs.js Persistence](prefs.js_Persistence.md) (2 shared connections)
- [Registry Discovery](Registry_Discovery.md) (1 shared connections)
- [CasaPanel Host Bridge](CasaPanel_Host_Bridge.md) (1 shared connections)
- [Diagnostica Environment](Diagnostica_Environment.md) (1 shared connections)
- [support.js Runtime](support.js_Runtime.md) (1 shared connections)

## Source Files

- `public/dash_neumo_mobile.html`
- `public/ha-backend.js`
- `public/i18n.js`

## Audit Trail

- EXTRACTED: 79 (98%)
- INFERRED: 2 (2%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
# Graph Report - .  (2026-08-16)

## Corpus Check
- 10 files · ~84,133 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 288 nodes · 449 edges · 35 communities (23 shown, 12 thin omitted)
- Extraction: 90% EXTRACTED · 10% INFERRED · 0% AMBIGUOUS · INFERRED: 43 edges (avg confidence: 0.83)
- Token cost: 40,943 input · 0 output

## Community Hubs (Navigation)
- Templating Runtime (support.js)
- Release History & Config Placement
- CasaPanel Web Component
- Room Discovery (discovery.js)
- Cameras & Script-Loader Modules
- Project Conventions (CLAUDE.md)
- Rooms & Appliances Fixes
- v1.4.9 Camera Grid & Energy Fixes
- Energy Discovery & Diagnostics
- Casa View Screenshot Walkthrough
- Mobile Dashboard Overview
- Demo Backend (ha-backend-demo.js)
- Energy Prefs Unit Test
- GitHub Release Workflow
- README Header Branding
- Energia Tab View
- Irrigazione Tab View
- Panel Backend (ha-backend-panel.js)
- App Icon Assets
- Release Zip Job
- App Icon 512px
- Transparent App Icon
- Camera Icon-Only Placeholder
- Demo Fallback Troubleshooting
- Troubleshooting Guide
- Energy Charts Troubleshooting
- Empty Rooms Troubleshooting
- Surveillance Tab Troubleshooting
- Blank Panel Troubleshooting

## God Nodes (most connected - your core abstractions)
1. `CasaPanel` - 17 edges
2. `discoverRooms()` - 13 edges
3. `Component.renderVals()` - 12 edges
4. `walk()` - 10 edges
5. `CLAUDE.md — Istruzioni Progetto Dashboard Domotica` - 10 edges
6. `walkXImport()` - 9 edges
7. `walkElement()` - 9 edges
8. `createRuntime()` - 9 edges
9. `Component class (dash_neumo_mobile.html)` - 9 edges
10. `discoverEnergyEntities()` - 8 edges

## Surprising Connections (you probably didn't know these)
- `Rooms discover 7 more HA domains` --conceptually_related_to--> `discoverRooms()`  [INFERRED]
  CHANGELOG.md → public/discovery.js
- `Room cards show binary_sensor status pills` --conceptually_related_to--> `discoverRooms()`  [INFERRED]
  CHANGELOG.md → public/discovery.js
- `Support HA's flat grid-source energy schema alongside flow_from/flow_to` --conceptually_related_to--> `discoverEnergyEntities()`  [INFERRED]
  CHANGELOG.md → public/discovery.js
- `Known limits section` --conceptually_related_to--> `discoverRooms()`  [INFERRED]
  README.md → public/discovery.js
- `Energy config is optional when HA's own Energy dashboard is already configured` --conceptually_related_to--> `discoverEnergyEntities()`  [INFERRED]
  CHANGELOG.md → public/discovery.js

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Fotovoltaico Two-Ring Energy Model** — changelog_v1_4_0, changelog_energy_two_ring_redesign, readme_reading_the_ring, readme_enabling_energy, public_dash_neumo_rendervals [INFERRED 0.85]
- **Desktop/Mobile Duplicated Component Architecture** — public_dash_neumo_component, public_dash_neumo_mobile_component, public_dash_neumo_rendervals, public_dash_neumo_mobile_rendervals, public_dash_neumo_boot, public_dash_neumo_mobile_boot [INFERRED 0.85]
- **Runtime Global-Script Module Loading Pattern** — public_dash_neumo_boot, public_dash_neumo_loadscript, public_discovery_discoverrooms, public_i18n_resolvelang, public_ha_backend_connect, public_support_dclogic [INFERRED 0.85]

## Communities (35 total, 12 thin omitted)

### Community 0 - "Templating Runtime (support.js)"
Cohesion: 0.07
Nodes (52): boot(), cdnScriptFor(), collectProps(), compileAttr(), compileTemplate(), contentKey(), createComponentFactory(), createExternalModules() (+44 more)

### Community 1 - "Release History & Config Placement"
Cohesion: 0.06
Nodes (41): Root container padding increased to match neumorphic shadow reach, Shipped example config renamed to live_dashboard_config.example.js, config.js can live at config/www/live_dashboard_config.js, outside HACS's managed folder, Empty-state guidance links to Settings->Areas when zero HA areas exist, Energy config is optional when HA's own Energy dashboard is already configured, First public release: auto-discovery, optional modules, demo mode, i18n, Inline tooltip clarifies the ring's grid figure is import, not total consumption, HACS custom-repository install support added (+33 more)

### Community 2 - "CasaPanel Web Component"
Cohesion: 0.14
Nodes (9): CasaPanel, fetchDailyCounterHistory(), fetchDailyLastSample(), fetchHistory(), fetchRawHistory(), fetchTodayStatsDelta(), FOLDER_NAME, isoDay() (+1 more)

### Community 3 - "Room Discovery (discovery.js)"
Cohesion: 0.24
Nodes (17): Component.ALARM_ID(), Component class (dash_neumo_mobile.html), collectConfiguredEntities(), discoverAlarm(), discoverAllOfDomain(), discoverCameras(), discoverEnergyEntities(), discoverModes() (+9 more)

### Community 4 - "Cameras & Script-Loader Modules"
Cohesion: 0.15
Nodes (12): loadScript() cache-bust propagated to every dynamically loaded script, Cameras module: auto-discovered surveillance tab, snapshots, live MJPEG overlay, privacy mode, v0.2.0 (2026-08-12), v1.1.1 (2026-08-14), Component._boot(), loadScript(), loadUserConfig(), Component._boot() (mobile) (+4 more)

### Community 5 - "Project Conventions (CLAUDE.md)"
Cohesion: 0.14
Nodes (16): Densità Prima Del Vincolo No-Scroll (Ritirato v1.4.9), CLAUDE.md — Istruzioni Progetto Dashboard Domotica, src/href/points Dinamici Via Ref Callback Post-Mount, Colori Dei Ruoli Energia (sage/acc/feed), Schema Energia HA Piatto Per Sorgente Grid, Verifica Visiva Prima Di Dichiarare Fatto, Niente Hook Post-Commit Graphify (Rebuild AST-Only Impoverisce Il Grafo), Tag panel_custom Derivato Dal Nome Cartella (+8 more)

### Community 6 - "Rooms & Appliances Fixes"
Cohesion: 0.16
Nodes (15): Optional config.appliances module for washer/dryer-style running-state UI, discoverRooms() excludes any entity referenced anywhere in config.js from generic room lists, Mobile no longer renders each appliance twice, Removed unreliable 'N min remaining' text for running appliances, Switch shows inline instantaneous wattage from co-located power sensor, src/href/points attributes set imperatively after mount, not via template holes, v1.1.0 (2026-08-14), v1.1.2 (2026-08-14) (+7 more)

### Community 7 - "v1.4.9 Camera Grid & Energy Fixes"
Cohesion: 0.23
Nodes (11): Casa Sorveglianza card adapts tile layout to camera count, Compact Fotovoltaico card regains visible self-consumption/grid/feed values, Energy chart colors aligned with home-screen ring grammar, Fotovoltaico ring redesigned as two concentric rings with real totals, Third bar for energy fed back to the grid added to trend charts, v1.4.5 (2026-08-15), v1.4.9 (2026-08-16), Component.renderVals() (mobile) (+3 more)

### Community 8 - "Energy Discovery & Diagnostics"
Cohesion: 0.22
Nodes (11): Diagnostic log lists unrecognized field names on unresolved energy sources, console.info at boot names the resolution tier and value for each energy role, Energy tab falls back to Fotovoltaico-derived data on zero-config installs, Energy role mapping sums every HA Energy-dashboard entry instead of keeping only the first, Support HA's flat grid-source energy schema alongside flow_from/flow_to, Near-zero ring segments use stroke-linecap:butt instead of round, Trend chart shows a message instead of zero-height bars when no history exists, v1.4.1 (2026-08-14) (+3 more)

### Community 9 - "Casa View Screenshot Walkthrough"
Cohesion: 0.25
Nodes (11): Casa Dashboard Screenshot, Allarme (Alarm) Card, Double-Ring Energy Gauge (7,6 kWh), Autoconsumo Tile (6,2 kWh), Dalla Rete Tile (1,4 kWh), Immessi in Rete Tile (3,6 kWh), Three-Tile Compact Energy Legend, Fotovoltaico Compact Card Layout (+3 more)

### Community 10 - "Mobile Dashboard Overview"
Cohesion: 0.40
Nodes (6): Cose Accese Adesso (Active Devices List), Bottom Navigation Bar (Casa/Stanze/Irrigazione/Energia/Auto/Meteo), Modalità Casa (Home Mode Selector), Mobile Dashboard View (Screenshot), Chi è in Casa (Presence Tracker), Weather Widget (19°, Sunny)

### Community 11 - "Demo Backend (ha-backend-demo.js)"
Cohesion: 0.53
Nodes (4): buildRegistries(), cloneStates(), connect(), rand()

### Community 12 - "Energy Prefs Unit Test"
Cohesion: 0.33
Nodes (3): __dirname, sandbox, src

### Community 14 - "GitHub Release Workflow"
Cohesion: 0.67
Nodes (3): Attach to Release Step, Build live_dashboard.zip Step, HACS zip_release content_in_root Convention

### Community 15 - "README Header Branding"
Cohesion: 1.00
Nodes (3): Live Dashboard README Header Banner, Home Assistant, Live Dashboard

### Community 16 - "Energia Tab View"
Cohesion: 1.00
Nodes (3): Energia Dashboard View, Live Power KPI Cards (Produzione/Consumo/Prelievo), Produzione e Prelievo Bar Chart

### Community 17 - "Irrigazione Tab View"
Cohesion: 1.00
Nodes (3): Irrigazione (Irrigation) Dashboard View, Zona 1 Irrigation Card, Zona 2 Irrigation Card

## Knowledge Gaps
- **27 isolated node(s):** `__dirname`, `src`, `sandbox`, `zip-and-attach Release Job`, `Attach to Release Step` (+22 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `collectConfiguredEntities()` connect `Room Discovery (discovery.js)` to `Templating Runtime (support.js)`?**
  _High betweenness centrality (0.182) - this node is a cross-community bridge._
- **Why does `walk()` connect `Templating Runtime (support.js)` to `Room Discovery (discovery.js)`?**
  _High betweenness centrality (0.181) - this node is a cross-community bridge._
- **Why does `discoverRooms()` connect `Room Discovery (discovery.js)` to `Release History & Config Placement`, `Rooms & Appliances Fixes`, `v1.4.9 Camera Grid & Energy Fixes`?**
  _High betweenness centrality (0.125) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `discoverRooms()` (e.g. with `Rooms discover 7 more HA domains` and `Room cards show binary_sensor status pills`) actually correct?**
  _`discoverRooms()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Are the 5 inferred relationships involving `Component.renderVals()` (e.g. with `Compact Fotovoltaico card regains visible self-consumption/grid/feed values` and `Fotovoltaico ring redesigned as two concentric rings with real totals`) actually correct?**
  _`Component.renderVals()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **What connects `__dirname`, `src`, `sandbox` to the rest of the system?**
  _27 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Templating Runtime (support.js)` be split into smaller, more focused modules?**
  _Cohesion score 0.0673076923076923 - nodes in this community are weakly interconnected._
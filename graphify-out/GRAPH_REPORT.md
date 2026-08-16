# Graph Report - live_dashboard  (2026-08-16)

## Corpus Check
- 18 files · ~92,029 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 413 nodes · 443 edges · 140 communities (33 shown, 107 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 15 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `fa22e30e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

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
- Live Dashboard
- Changelog
- Istruzioni di progetto — Dashboard domotica
- prefs.js
- [1.4.0] - 2026-08-14
- [1.0.0] - 2026-08-13
- [1.1.0] - 2026-08-14
- [1.2.0] - 2026-08-14
- [1.4.1] - 2026-08-14
- [1.4.4] - 2026-08-15
- [1.4.5] - 2026-08-15
- [1.4.8] - 2026-08-16
- [0.2.1] - 2026-08-13
- [0.3.0] - 2026-08-13
- [1.1.1] - 2026-08-14
- [1.1.2] - 2026-08-14
- [1.3.0] - 2026-08-14
- [1.3.1] - 2026-08-14
- [1.4.6] - 2026-08-15
- [1.4.7] - 2026-08-15
- [1.4.9] - 2026-08-16
- [1.5.0] - 2026-08-16
- loadScript() cache-bust propagated to every dynamically loaded script
- Cameras module: auto-discovered surveillance tab, snapshots, live MJPEG overlay, privacy mode
- Root container padding increased to match neumorphic shadow reach
- Compact Fotovoltaico card regains visible self-consumption/grid/feed values
- Shipped example config renamed to live_dashboard_config.example.js
- config.js can live at config/www/live_dashboard_config.js, outside HACS's managed folder
- Empty-state guidance links to Settings->Areas when zero HA areas exist
- Energy chart colors aligned with home-screen ring grammar
- Energy config is optional when HA's own Energy dashboard is already configured
- console.info at boot names the resolution tier and value for each energy role
- Fotovoltaico ring redesigned as two concentric rings with real totals
- Energy tab falls back to Fotovoltaico-derived data on zero-config installs
- Energy role mapping sums every HA Energy-dashboard entry instead of keeping only the first
- discoverRooms() excludes any entity referenced anywhere in config.js from generic room lists
- Third bar for energy fed back to the grid added to trend charts
- First public release: auto-discovery, optional modules, demo mode, i18n
- Support HA's flat grid-source energy schema alongside flow_from/flow_to
- Inline tooltip clarifies the ring's grid figure is import, not total consumption
- HACS custom-repository install support added
- Irrigation zones can run timed watering via input_button entities
- Mobile no longer renders each appliance twice
- panel.js derives its custom-element tag from its own deploy folder
- Install-time self-check for panel_custom name:/folder mismatch
- Removed unreliable 'N min remaining' text for running appliances
- First pre-boot render resolves to nothing shown instead of a permanent 'never resolved' warning
- Rooms discover 7 more HA domains
- Room cards show binary_sensor status pills
- Room tiles size to content instead of stretching
- [data-sel=true] selected-state CSS forced with !important over inline styles
- Near-zero ring segments use stroke-linecap:butt instead of round
- Switch shows inline instantaneous wattage from co-located power sensor
- src/href/points attributes set imperatively after mount, not via template holes
- Trend chart shows a message instead of zero-height bars when no history exists
- v0.1.0 (2026-08-12)
- v0.2.0 (2026-08-12)
- v0.2.1 (2026-08-13)
- v0.3.0 (2026-08-13)
- v1.0.0 (2026-08-13)
- v1.0.1 (2026-08-14)
- v1.1.0 (2026-08-14)
- v1.1.1 (2026-08-14)
- v1.1.2 (2026-08-14)
- v1.2.0 (2026-08-14)
- v1.3.0 (2026-08-14)
- v1.3.1 (2026-08-14)
- v1.4.0 (2026-08-14)
- v1.4.1 (2026-08-14)
- v1.4.2 (2026-08-14)
- v1.4.3 (2026-08-14)
- v1.4.4 (2026-08-15)
- v1.4.5 (2026-08-15)
- v1.4.6 (2026-08-15)
- v1.4.7 (2026-08-15)
- v1.4.8 (2026-08-16)
- v1.4.9 (2026-08-16)
- Optional weatherStation config for local station sensors
- CLAUDE.md — Istruzioni Progetto Dashboard Domotica
- src/href/points Dinamici Via Ref Callback Post-Mount
- Colori Dei Ruoli Energia (sage/acc/feed)
- Schema Energia HA Piatto Per Sorgente Grid
- Verifica Visiva Prima Di Dichiarare Fatto
- Niente Hook Post-Commit Graphify (Rebuild AST-Only Impoverisce Il Grafo)
- Tag panel_custom Derivato Dal Nome Cartella
- Rigenera Graphify Prima Del Commit
- Config Utente Fuori Dalla Cartella Gestita Da HACS
- Tag Release Con Prefisso v
- VERSION Unica Per Cache-Busting
- Checklist Orientamento Inizio Sessione
- Regola Style Letterale (proprietà:{{valore}} per hole)
- Vincoli Del Templating
- window.CASA_CONFIG Come Global (import() Bloccato Su file://)
- Appliances (optional) section
- Cameras (optional) section
- Configuring the rest — config.js search-path precedence
- Demo mode section
- Energy sensor role mapping table (per-integration)
- Via HACS installation section
- Manual installation section
- Kiosk mode for the wall tablet section
- Known limits section
- Vehicle (optional) section
- Weather station (optional) section

## God Nodes (most connected - your core abstractions)
1. `Changelog` - 24 edges
2. `CasaPanel` - 19 edges
3. `Live Dashboard` - 15 edges
4. `Live Dashboard` - 14 edges
5. `Troubleshooting` - 14 edges
6. `walk()` - 10 edges
7. `discoverRooms()` - 9 edges
8. `walkXImport()` - 9 edges
9. `walkElement()` - 9 edges
10. `createRuntime()` - 9 edges

## Surprising Connections (you probably didn't know these)
- `Component.ROOMS_RESULT()` --calls--> `discoverRooms()`  [EXTRACTED]
  public/dash_neumo.html → public/discovery.js
- `Component.renderVals()` --semantically_similar_to--> `Component.renderVals() (mobile)`  [INFERRED] [semantically similar]
  public/dash_neumo.html → public/dash_neumo_mobile.html
- `collectConfiguredEntities()` --indirect_call--> `walk()`  [INFERRED]
  public/discovery.js → public/support.js
- `Component class (dash_neumo_mobile.html)` --calls--> `discoverRooms()`  [EXTRACTED]
  public/dash_neumo_mobile.html → public/discovery.js
- `Component class (dash_neumo_mobile.html)` --calls--> `mapEnergyPrefs()`  [EXTRACTED]
  public/dash_neumo_mobile.html → public/discovery.js

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Fotovoltaico Two-Ring Energy Model** — changelog_v1_4_0, changelog_energy_two_ring_redesign, readme_reading_the_ring, readme_enabling_energy, public_dash_neumo_rendervals [INFERRED 0.85]
- **Desktop/Mobile Duplicated Component Architecture** — public_dash_neumo_component, public_dash_neumo_mobile_component, public_dash_neumo_rendervals, public_dash_neumo_mobile_rendervals, public_dash_neumo_boot, public_dash_neumo_mobile_boot [INFERRED 0.85]

## Communities (140 total, 107 thin omitted)

### Community 0 - "Templating Runtime (support.js)"
Cohesion: 0.07
Nodes (51): boot(), cdnScriptFor(), collectProps(), compileAttr(), compileTemplate(), contentKey(), createComponentFactory(), createHelmetManager() (+43 more)

### Community 1 - "Release History & Config Placement"
Cohesion: 0.11
Nodes (19): Appliances (optional), Cameras (optional), Configuring the rest, Demo mode, Enabling Energy, Enabling Irrigation, Installation, Kiosk mode for the wall tablet (+11 more)

### Community 2 - "CasaPanel Web Component"
Cohesion: 0.13
Nodes (9): CasaPanel, fetchDailyCounterHistory(), fetchDailyLastSample(), fetchHistory(), fetchRawHistory(), fetchTodayStatsDelta(), FOLDER_NAME, isoDay() (+1 more)

### Community 3 - "Room Discovery (discovery.js)"
Cohesion: 0.12
Nodes (28): Component.ALARM_ID(), Component.applianceItems(), Component.applianceState(), Component class (dash_neumo.html), Component class (dash_neumo_mobile.html), Component.renderVals() (mobile), Component.renderVals(), Component._resolveEnergyDaily() (+20 more)

### Community 4 - "Cameras & Script-Loader Modules"
Cohesion: 0.24
Nodes (5): Component._boot(), loadScript(), Component._boot() (mobile), connect(), isDemoRequested()

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

### Community 34 - "Blank Panel Troubleshooting"
Cohesion: 0.12
Nodes (14): A camera tile only ever shows an icon, never a preview, A whole section (Energy / Irrigation / Vehicle / Cameras / Alarm / Modes / People) is missing, Alarm card has no buttons, or fewer than expected, An entity I expect just doesn't show up anywhere, Energy charts are empty or look wrong, Entities show `unavailable` in grey, Rooms are empty, or show far fewer entities than expected, The Irrigation zone chart doesn't match reality (+6 more)

### Community 35 - "Live Dashboard"
Cohesion: 0.11
Nodes (18): Altro, Attivare l'Energia, Attivare l'Irrigazione, Auto (opzionale), Come si legge l'anello, Configurare il resto, Cos'è, e cosa non è, Elettrodomestici (opzionale) (+10 more)

### Community 36 - "Changelog"
Cohesion: 0.18
Nodes (11): [0.1.0] - 2026-08-12, [0.2.0] - 2026-08-12, [1.0.1] - 2026-08-14, [1.4.2] - 2026-08-14, [1.4.3] - 2026-08-14, Added, Added, Changelog (+3 more)

### Community 37 - "Istruzioni di progetto — Dashboard domotica"
Cohesion: 0.22
Nodes (8): All'inizio di ogni sessione, Colori dei ruoli energia (non negoziabili), Densità prima del "sta tutto in una schermata", Istruzioni di progetto — Dashboard domotica, Metodo, Prima di ogni commit, Release, Vincoli del templating (trovati sul campo, non ovvi)

### Community 38 - "prefs.js"
Cohesion: 0.32
Nodes (5): load(), readLocal(), save(), writeLocal(), createExternalModules()

### Community 39 - "[1.4.0] - 2026-08-14"
Cohesion: 0.50
Nodes (4): [1.4.0] - 2026-08-14, Added, Changed, Fixed

### Community 40 - "[1.0.0] - 2026-08-13"
Cohesion: 0.67
Nodes (3): [1.0.0] - 2026-08-13, Added, Fixed

### Community 41 - "[1.1.0] - 2026-08-14"
Cohesion: 0.67
Nodes (3): [1.1.0] - 2026-08-14, Added, Fixed

### Community 42 - "[1.2.0] - 2026-08-14"
Cohesion: 0.67
Nodes (3): [1.2.0] - 2026-08-14, Added, Changed

### Community 43 - "[1.4.1] - 2026-08-14"
Cohesion: 0.67
Nodes (3): [1.4.1] - 2026-08-14, Added, Fixed

### Community 44 - "[1.4.4] - 2026-08-15"
Cohesion: 0.67
Nodes (3): [1.4.4] - 2026-08-15, Changed, Fixed

### Community 45 - "[1.4.5] - 2026-08-15"
Cohesion: 0.67
Nodes (3): [1.4.5] - 2026-08-15, Added, Fixed

### Community 46 - "[1.4.8] - 2026-08-16"
Cohesion: 0.67
Nodes (3): [1.4.8] - 2026-08-16, Added, Fixed

## Knowledge Gaps
- **142 isolated node(s):** `FOLDER_NAME`, `__dirname`, `src`, `sandbox`, `Added` (+137 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **107 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Changelog` connect `Changelog` to `Blank Panel Troubleshooting`, `[1.4.0] - 2026-08-14`, `[1.0.0] - 2026-08-13`, `[1.1.0] - 2026-08-14`, `[1.2.0] - 2026-08-14`, `[1.4.1] - 2026-08-14`, `[1.4.4] - 2026-08-15`, `[1.4.5] - 2026-08-15`, `[1.4.8] - 2026-08-16`, `[0.2.1] - 2026-08-13`, `[0.3.0] - 2026-08-13`, `[1.1.1] - 2026-08-14`, `[1.1.2] - 2026-08-14`, `[1.3.0] - 2026-08-14`, `[1.3.1] - 2026-08-14`, `[1.4.6] - 2026-08-15`, `[1.4.7] - 2026-08-15`, `[1.4.9] - 2026-08-16`, `[1.5.0] - 2026-08-16`?**
  _High betweenness centrality (0.053) - this node is a cross-community bridge._
- **Why does `walk()` connect `Templating Runtime (support.js)` to `Room Discovery (discovery.js)`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **Why does `collectConfiguredEntities()` connect `Room Discovery (discovery.js)` to `Templating Runtime (support.js)`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **What connects `FOLDER_NAME`, `__dirname`, `src` to the rest of the system?**
  _142 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Templating Runtime (support.js)` be split into smaller, more focused modules?**
  _Cohesion score 0.06845238095238096 - nodes in this community are weakly interconnected._
- **Should `Release History & Config Placement` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `CasaPanel Web Component` be split into smaller, more focused modules?**
  _Cohesion score 0.1349206349206349 - nodes in this community are weakly interconnected._
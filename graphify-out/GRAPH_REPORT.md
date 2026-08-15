# Graph Report - .  (2026-08-15)

## Corpus Check
- 27 files · ~77,751 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 226 nodes · 332 edges · 35 communities (20 shown, 15 thin omitted)
- Extraction: 89% EXTRACTED · 11% INFERRED · 0% AMBIGUOUS · INFERRED: 38 edges (avg confidence: 0.87)
- Token cost: 322,890 input · 0 output

## Community Hubs (Navigation)
- DCLogic Component Runtime
- Home Assistant Panel Bridge
- Dashboard Boot & Cache-Bust
- Entity Auto-Discovery
- Install & Setup Docs
- DC Template Parser
- Casa Dashboard View
- Mobile Dashboard View
- Demo Backend Mock
- Energy Prefs Test Suite
- Fotovoltaico Double-Ring Design
- Cameras Module
- Release Packaging Workflow
- README Header Banner
- Known Limits & Early Release
- Energia Dashboard View
- Irrigazione Dashboard View
- Live HA Backend Bridge
- App Icon (256px)
- Irrigation Timed Buttons
- Appliances Module
- Weather Station Module
- Irrigation Valve Runner
- Release Zip & Attach Job
- App Icon (512px)
- Transparent App Icon
- Selected-State CSS Fix
- discoverRooms Exclusion Fix
- Render-Order Fix
- Flat Grid Source Fix
- Kiosk Mode for Tablets
- Vehicle Module

## God Nodes (most connected - your core abstractions)
1. `CasaPanel` - 17 edges
2. `walk()` - 10 edges
3. `discoverRooms()` - 9 edges
4. `walkXImport()` - 9 edges
5. `walkElement()` - 9 edges
6. `createRuntime()` - 9 edges
7. `Component._boot()` - 9 edges
8. `getReact()` - 8 edges
9. `walkChildren()` - 8 edges
10. `Casa (Home) Dashboard View Screenshot` - 8 edges

## Surprising Connections (you probably didn't know these)
- `Changelog v1.1.1 - Script Cache-Bust Chain Fix` --conceptually_related_to--> `module_url ?v= Cache-Bust Requirement`  [INFERRED]
  CHANGELOG.md → README.md
- `ASSET_VERSION Cache-Bust Chain Design` --conceptually_related_to--> `module_url ?v= Cache-Bust Requirement`  [INFERRED]
  public/dash_neumo.html → README.md
- `Component.ROOMS_RESULT() (mobile)` --calls--> `discoverRooms()`  [EXTRACTED]
  public/dash_neumo_mobile.html → public/discovery.js
- `Component.ROOMS_RESULT()` --calls--> `discoverRooms()`  [EXTRACTED]
  public/dash_neumo.html → public/discovery.js
- `Component._boot()` --calls--> `casaResolveLang()`  [EXTRACTED]
  public/dash_neumo.html → public/i18n.js

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Desktop/Mobile Dual-Layout Shared Architecture** — public_dash_neumo_component, public_dash_neumo_mobile_component, public_dash_neumo_mergeconfig, public_dash_neumo_mobile_mergeconfig, public_dash_neumo_boot, public_dash_neumo_mobile_boot [INFERRED 0.90]
- **Config-Referenced Entities Excluded From Generic Room Lists** — changelog_v1_1_2, readme_appliances, readme_vehicle, readme_weather_station [INFERRED 0.75]
- **ASSET_VERSION Cache-Bust Chain Across Docs and Code** — public_dash_neumo_asset_cache_bust_chain, readme_cache_bust_module_url, changelog_v1_1_1, troubleshooting_white_blank_panel [INFERRED 0.85]

## Communities (35 total, 15 thin omitted)

### Community 0 - "DCLogic Component Runtime"
Cohesion: 0.08
Nodes (42): cdnScriptFor(), collectProps(), compileAttr(), compileTemplate(), contentKey(), createComponentFactory(), createExternalModules(), createHelmetManager() (+34 more)

### Community 1 - "Home Assistant Panel Bridge"
Cohesion: 0.14
Nodes (9): CasaPanel, fetchDailyCounterHistory(), fetchDailyLastSample(), fetchHistory(), fetchRawHistory(), fetchTodayStatsDelta(), FOLDER_NAME, isoDay() (+1 more)

### Community 2 - "Dashboard Boot & Cache-Bust"
Cohesion: 0.11
Nodes (23): Changelog v1.3.1 - Example Config Renamed, ASSET_VERSION Cache-Bust Chain Design, Component._boot(), bust(), Component class (extends DCLogic), CONFIG_PATHS Fallback-Order Design, loadScript(), loadUserConfig() (+15 more)

### Community 3 - "Entity Auto-Discovery"
Cohesion: 0.20
Nodes (14): Component.ROOMS_RESULT() (mobile), Component.ROOMS_RESULT(), collectConfiguredEntities(), discoverAllOfDomain(), discoverCameras(), discoverEnergyEntities(), discoverPeople(), discoverRooms() (+6 more)

### Community 4 - "Install & Setup Docs"
Cohesion: 0.18
Nodes (15): Changelog, Changelog v0.1.0 - First Public Release, Changelog v0.2.1 - Dynamic panel.js Tag Registration, Changelog v1.1.1 - Script Cache-Bust Chain Fix, Changelog v1.3.0 - HACS Support Added, module_url ?v= Cache-Bust Requirement, Demo Mode, Live Dashboard README (English) (+7 more)

### Community 5 - "DC Template Parser"
Cohesion: 0.22
Nodes (10): boot(), createStreamTracker(), dcNameFromPath(), getReactDOM(), init(), parseDataProps(), parseDcDocument(), parseDcText() (+2 more)

### Community 6 - "Casa Dashboard View"
Cohesion: 0.28
Nodes (9): Allarme (Alarm) Status Card, "Azioni Rapide" (Quick Actions) List, "Cose Accese Adesso" (Currently On) Quick List, Fotovoltaico (Solar PV) Double-Ring Card, Casa (Home) Dashboard View Screenshot, Greeting and Mode Selector Header (Casa/Fuori/Notte/Cinema), Sorveglianza (Surveillance) Camera Card, Stanze (Rooms) Card Grid (+1 more)

### Community 7 - "Mobile Dashboard View"
Cohesion: 0.40
Nodes (6): Cose Accese Adesso (Active Devices List), Bottom Navigation Bar (Casa/Stanze/Irrigazione/Energia/Auto/Meteo), Modalità Casa (Home Mode Selector), Mobile Dashboard View (Screenshot), Chi è in Casa (Presence Tracker), Weather Widget (19°, Sunny)

### Community 8 - "Demo Backend Mock"
Cohesion: 0.53
Nodes (4): buildRegistries(), cloneStates(), connect(), rand()

### Community 9 - "Energy Prefs Test Suite"
Cohesion: 0.33
Nodes (3): __dirname, sandbox, src

### Community 10 - "Fotovoltaico Double-Ring Design"
Cohesion: 0.40
Nodes (5): Changelog v1.4.0 - Double-Ring Fotovoltaico, Changelog v1.4.1 - Multi-Entry Energy Role Fix, Enabling Energy (Role-Based Sensor Mapping), Fotovoltaico Double-Ring Design, Energy Charts Empty or Wrong Section

### Community 11 - "Cameras Module"
Cohesion: 0.50
Nodes (4): Changelog v0.2.0 - Cameras Module Added, Cameras Module, Camera Tile Icon-Only Section, Surveillance Tab Missing Section

### Community 12 - "Release Packaging Workflow"
Cohesion: 0.67
Nodes (3): Attach to Release Step, Build live_dashboard.zip Step, HACS zip_release content_in_root Convention

### Community 13 - "README Header Banner"
Cohesion: 1.00
Nodes (3): Live Dashboard README Header Banner, Home Assistant, Live Dashboard

### Community 14 - "Known Limits & Early Release"
Cohesion: 0.67
Nodes (3): Changelog v1.0.0 - First Validated Release, Known Limits, Rooms Are Empty Section

### Community 15 - "Energia Dashboard View"
Cohesion: 1.00
Nodes (3): Energia Dashboard View, Live Power KPI Cards (Produzione/Consumo/Prelievo), Produzione e Prelievo Bar Chart

### Community 16 - "Irrigazione Dashboard View"
Cohesion: 1.00
Nodes (3): Irrigazione (Irrigation) Dashboard View, Zona 1 Irrigation Card, Zona 2 Irrigation Card

## Knowledge Gaps
- **41 isolated node(s):** `FOLDER_NAME`, `__dirname`, `src`, `sandbox`, `zip-and-attach Release Job` (+36 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `walk()` connect `DCLogic Component Runtime` to `Entity Auto-Discovery`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **Why does `collectConfiguredEntities()` connect `Entity Auto-Discovery` to `DCLogic Component Runtime`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **What connects `FOLDER_NAME`, `__dirname`, `src` to the rest of the system?**
  _41 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `DCLogic Component Runtime` be split into smaller, more focused modules?**
  _Cohesion score 0.07946127946127945 - nodes in this community are weakly interconnected._
- **Should `Home Assistant Panel Bridge` be split into smaller, more focused modules?**
  _Cohesion score 0.13846153846153847 - nodes in this community are weakly interconnected._
- **Should `Dashboard Boot & Cache-Bust` be split into smaller, more focused modules?**
  _Cohesion score 0.11333333333333333 - nodes in this community are weakly interconnected._
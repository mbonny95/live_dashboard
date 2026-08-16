# Graph Report - .  (2026-08-16)

## Corpus Check
- 8 files · ~79,972 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 311 nodes · 466 edges · 41 communities (23 shown, 18 thin omitted)
- Extraction: 76% EXTRACTED · 24% INFERRED · 0% AMBIGUOUS · INFERRED: 111 edges (avg confidence: 0.88)
- Token cost: 144,701 input · 0 output

## Community Hubs (Navigation)
- DCLogic Component Runtime
- Changelog: v0.2.1-1.4.5 Feature & Fix History
- Home Assistant Panel Bridge
- Boot & Cache-Bust Chain
- Energy Tab Fallback & Color Convention
- Entity Auto-Discovery
- Changelog & Docs: Early Modules
- DCLogic Card Components
- CLAUDE.md Engineering Rules
- Energy Chart & History Data Pipeline
- Casa Dashboard Screenshot
- Mobile Dashboard View
- Demo Backend Mock
- Energy Prefs Test Suite
- Release Packaging Workflow
- README Header Banner
- Changelog & Docs: Known Limits
- Energia Dashboard View
- Irrigazione Dashboard View
- Live HA Backend Bridge
- Panel HA Backend Bridge
- App Icon (256px)
- Kiosk Mode Docs
- More Links Docs
- Requirements Docs
- Release Zip & Attach Job
- App Icon (512px)
- Transparent App Icon
- Changelog: Selected-State Fix
- Changelog: Shadow-Clipping Fix
- Camera Tile Troubleshooting
- Connecting/Demo Fallback Troubleshooting
- Troubleshooting Guide
- Energy Charts Troubleshooting
- Rooms Empty Troubleshooting
- Surveillance Tab Troubleshooting
- White/Blank Panel Troubleshooting

## God Nodes (most connected - your core abstractions)
1. `CasaPanel` - 17 edges
2. `walk()` - 10 edges
3. `Fotovoltaico double-ring computation (autoconsumo/hasOuterRing/hasInnerRing/ringSeg)` - 10 edges
4. `Component class (DCLogic boot lifecycle, mobile)` - 10 edges
5. `walkXImport()` - 9 edges
6. `walkElement()` - 9 edges
7. `createRuntime()` - 9 edges
8. `Component class (DCLogic boot lifecycle)` - 9 edges
9. `_boot() async boot sequence` - 9 edges
10. `_boot() async boot sequence (mobile)` - 9 edges

## Surprising Connections (you probably didn't know these)
- `v1.1.2 - Fix specialized-module entities duplicated as generic controls` --semantically_similar_to--> `Appliances (optional)`  [INFERRED] [semantically similar]
  CHANGELOG.md → README.md
- `v1.4.3 - Fix single grid-meter shape not read for prelievo/immissione` --implements--> `Enabling Energy (role mapping, auto-discovery)`  [INFERRED]
  CHANGELOG.md → README.md
- `v1.2.0 - Add optional weather station support` --shares_data_with--> `Enabling Irrigation (valve vs buttons)`  [INFERRED]
  CHANGELOG.md → README.md
- `v0.3.0 - Add timed-watering buttons for irrigation zones` --implements--> `Enabling Irrigation (valve vs buttons)`  [INFERRED]
  CHANGELOG.md → README.md
- `v0.1.0 - First public release` --implements--> `Demo mode`  [INFERRED]
  CHANGELOG.md → README.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Energy Ring Resolution & Fallback System** — changelog_v1_4_0, changelog_v1_4_1, changelog_v1_4_3, readme_enabling_energy [INFERRED 0.85]
- **v1.4.7 Zero-Config Energy Tab Fix** — changelog_v1_4_7, changelog_v1_4_7_root_cause, changelog_v1_4_7_energy_tab_fallback, changelog_v1_4_7_trend_chart_no_history [EXTRACTED 1.00]
- **Installation Methods & Config File Precedence** — readme_installation_hacs, readme_installation_manual, readme_configuring_the_rest [INFERRED 0.75]
- **Zero-Config Energy Tab Fallback** — public_dash_neumo_haspowercells, public_dash_neumo_energytabfallback, public_dash_neumo_ringlegend, public_dash_neumo_dailyselfpct, public_dash_neumo_mobile_haspowercells, public_dash_neumo_mobile_energytabfallback, public_dash_neumo_mobile_ringlegend, public_dash_neumo_mobile_dailyselfpct [INFERRED 0.90]
- **Trend Chart History vs Empty State** — public_dash_neumo_bars, public_dash_neumo_hashistory, public_dash_neumo_nohistory, public_dash_neumo_mobile_bars, public_dash_neumo_mobile_hashistory, public_dash_neumo_mobile_nohistory [INFERRED 0.85]
- **DCLogic Boot Lifecycle (Desktop + Mobile)** — public_dash_neumo_component, public_dash_neumo_boot, public_dash_neumo_loaduserconfig, public_dash_neumo_resolveenergydaily, public_dash_neumo_loadhistory, public_dash_neumo_mobile_component, public_dash_neumo_mobile_boot, public_dash_neumo_mobile_loaduserconfig, public_dash_neumo_mobile_resolveenergydaily, public_dash_neumo_mobile_loadhistory [INFERRED 0.85]
- **Fotovoltaico double-ring energy model** — changelog_md_double_ring_fotovoltaico, readme_md_fotovoltaico_double_ring, readme_md_autoconsumo_derivation, claude_md_energy_color_convention, claude_md_flat_grid_energy_schema [INFERRED 0.85]
- **Templating constraints found on the field** — claude_md_style_literal_constraint, claude_md_dynamic_src_href_points_constraint, claude_md_window_casa_config_global, claude_md_panel_custom_tag_from_folder [EXTRACTED 1.00]

## Communities (41 total, 18 thin omitted)

### Community 0 - "DCLogic Component Runtime"
Cohesion: 0.07
Nodes (52): boot(), cdnScriptFor(), collectProps(), compileAttr(), compileTemplate(), contentKey(), createComponentFactory(), createExternalModules() (+44 more)

### Community 1 - "Changelog: v0.2.1-1.4.5 Feature & Fix History"
Cohesion: 0.11
Nodes (28): v0.2.1 - Derive panel custom-element tag from deploy folder, v1.1.0 - Add Appliances module, fix hardcoded Italian labels on desktop, v1.1.1 - Fix missing cache-bust on loaded scripts (discovery.js, config.js), v1.1.2 - Fix specialized-module entities duplicated as generic controls, v1.3.0 - Add HACS support and update-safe config location, v1.3.1 - Rename example config to live_dashboard_config.example.js, v1.4.0 - Double-ring Fotovoltaico visualization, auto-discovered energy sources, v1.4.1 - Fix energy/get_prefs dropping extra sensors per role, add diagnostics (+20 more)

### Community 2 - "Home Assistant Panel Bridge"
Cohesion: 0.14
Nodes (9): CasaPanel, fetchDailyCounterHistory(), fetchDailyLastSample(), fetchHistory(), fetchRawHistory(), fetchTodayStatsDelta(), FOLDER_NAME, isoDay() (+1 more)

### Community 3 - "Boot & Cache-Bust Chain"
Cohesion: 0.17
Nodes (20): ASSET_V cache-bust param, _boot() async boot sequence, bust() URL cache-buster, CONFIG_PATHS candidate list, DEFAULT_CONFIG object, loadScript() classic-tag loader, loadUserConfig(), mergeConfig() (+12 more)

### Community 4 - "Energy Tab Fallback & Color Convention"
Cohesion: 0.19
Nodes (20): dailySelfPct: self-consumption % from daily kWh totals, Energy color convention (sage=solar/self-consumption, acc=grid, feed=export), energyCompact card (camera install: solar card shrinks), energyNormal card (no camera: full-size solar card), energyTabFallback: zero-config Energy tab header replacement, hasOldRing legacy single-ring fallback, hasPowerCells: power (kW) sensors present, Always-visible double ring card (Energia tab, no compact/normal split) (+12 more)

### Community 5 - "Entity Auto-Discovery"
Cohesion: 0.24
Nodes (12): collectConfiguredEntities(), discoverAllOfDomain(), discoverCameras(), discoverEnergyEntities(), discoverPeople(), discoverRooms(), discoverWeather(), domainOf() (+4 more)

### Community 6 - "Changelog & Docs: Early Modules"
Cohesion: 0.15
Nodes (16): v0.1.0 - First public release, v0.2.0 - Add Cameras module (Sorveglianza tab), v0.3.0 - Add timed-watering buttons for irrigation zones, v1.2.0 - Add optional weather station support, Cameras (optional), Demo mode, Enabling Irrigation (valve vs buttons), Telecamere (opzionale) (+8 more)

### Community 7 - "DCLogic Card Components"
Cohesion: 0.18
Nodes (16): Alarm card (arm/disarm buttons), Component class (DCLogic boot lifecycle), componentDidMount(), Irrigation zone cards (moisture/deficit/valve buttons), Alarm card (arm/disarm buttons) (mobile), Component class (DCLogic boot lifecycle, mobile), componentDidMount() (mobile), Irrigation zone cards (mobile, with per-zone chart toggle) (+8 more)

### Community 8 - "CLAUDE.md Engineering Rules"
Cohesion: 0.15
Nodes (12): Autoconsumo (--sage), Dynamic src/href/points set post-mount, Energy role color convention (sage=solar, terracotta=grid), HA flat grid-source energy schema (stat_energy_from), Regenerate graphify before every commit, Immissione (--feed), panel_custom tag derived from deploy folder, Prelievo (--acc) (+4 more)

### Community 9 - "Energy Chart & History Data Pipeline"
Cohesion: 0.21
Nodes (13): bars: 3-series daily production/grid/export chart data, hasExportBars: third (export) bar series present, hasHistory: trend chart has data, _loadHistory(), bars: 3-series daily production/grid/export chart data (mobile), hasExportBars: third (export) bar series present (mobile), hasHistory: trend chart has data (mobile), _loadHistory() (mobile) (+5 more)

### Community 10 - "Casa Dashboard Screenshot"
Cohesion: 0.25
Nodes (11): Casa Dashboard Screenshot, Allarme (Alarm) Card, Double-Ring Energy Gauge (7,6 kWh), Autoconsumo Tile (6,2 kWh), Dalla Rete Tile (1,4 kWh), Immessi in Rete Tile (3,6 kWh), Three-Tile Compact Energy Legend, Fotovoltaico Compact Card Layout (+3 more)

### Community 11 - "Mobile Dashboard View"
Cohesion: 0.40
Nodes (6): Cose Accese Adesso (Active Devices List), Bottom Navigation Bar (Casa/Stanze/Irrigazione/Energia/Auto/Meteo), Modalità Casa (Home Mode Selector), Mobile Dashboard View (Screenshot), Chi è in Casa (Presence Tracker), Weather Widget (19°, Sunny)

### Community 12 - "Demo Backend Mock"
Cohesion: 0.53
Nodes (4): buildRegistries(), cloneStates(), connect(), rand()

### Community 13 - "Energy Prefs Test Suite"
Cohesion: 0.33
Nodes (3): __dirname, sandbox, src

### Community 15 - "Release Packaging Workflow"
Cohesion: 0.67
Nodes (3): Attach to Release Step, Build live_dashboard.zip Step, HACS zip_release content_in_root Convention

### Community 16 - "README Header Banner"
Cohesion: 1.00
Nodes (3): Live Dashboard README Header Banner, Home Assistant, Live Dashboard

### Community 17 - "Changelog & Docs: Known Limits"
Cohesion: 0.67
Nodes (3): v1.0.0 - First release validated against a real HA installation, Limiti noti, Known limits

### Community 18 - "Energia Dashboard View"
Cohesion: 1.00
Nodes (3): Energia Dashboard View, Live Power KPI Cards (Produzione/Consumo/Prelievo), Produzione e Prelievo Bar Chart

### Community 19 - "Irrigazione Dashboard View"
Cohesion: 1.00
Nodes (3): Irrigazione (Irrigation) Dashboard View, Zona 1 Irrigation Card, Zona 2 Irrigation Card

## Knowledge Gaps
- **49 isolated node(s):** `__dirname`, `src`, `sandbox`, `zip-and-attach Release Job`, `Attach to Release Step` (+44 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `walk()` connect `DCLogic Component Runtime` to `Entity Auto-Discovery`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **Why does `collectConfiguredEntities()` connect `Entity Auto-Discovery` to `DCLogic Component Runtime`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **Why does `Fotovoltaico double-ring computation (autoconsumo/hasOuterRing/hasInnerRing/ringSeg)` connect `Energy Tab Fallback & Color Convention` to `Boot & Cache-Bust Chain`, `DCLogic Card Components`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `Fotovoltaico double-ring computation (autoconsumo/hasOuterRing/hasInnerRing/ringSeg)` (e.g. with `Component class (DCLogic boot lifecycle)` and `_resolveEnergyDaily()`) actually correct?**
  _`Fotovoltaico double-ring computation (autoconsumo/hasOuterRing/hasInnerRing/ringSeg)` has 5 INFERRED edges - model-reasoned connections that need verification._
- **Are the 9 inferred relationships involving `Component class (DCLogic boot lifecycle, mobile)` (e.g. with `Alarm card (arm/disarm buttons) (mobile)` and `componentDidMount() (mobile)`) actually correct?**
  _`Component class (DCLogic boot lifecycle, mobile)` has 9 INFERRED edges - model-reasoned connections that need verification._
- **What connects `__dirname`, `src`, `sandbox` to the rest of the system?**
  _49 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `DCLogic Component Runtime` be split into smaller, more focused modules?**
  _Cohesion score 0.0673076923076923 - nodes in this community are weakly interconnected._
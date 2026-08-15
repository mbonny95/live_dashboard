# Graph Report - .  (2026-08-15)

## Corpus Check
- 5 files · ~79,161 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 307 nodes · 406 edges · 46 communities (27 shown, 19 thin omitted)
- Extraction: 90% EXTRACTED · 10% INFERRED · 0% AMBIGUOUS · INFERRED: 40 edges (avg confidence: 0.86)
- Token cost: 166,562 input · 0 output

## Community Hubs (Navigation)
- DCLogic Component Runtime
- Changelog: Auto-Discovery & Double-Ring
- Home Assistant Panel Bridge
- Changelog: Appliances & Cache-Busting
- Changelog: Energy Presentation Fixes
- Entity Auto-Discovery
- CLAUDE.md Engineering Rules
- Changelog: HACS & Config Path
- Casa Dashboard Screenshot
- Changelog: Irrigation & Weather
- Mobile Dashboard View
- Mobile Energy Chart & Ring
- Demo Backend Mock
- Energy Prefs Test Suite
- Changelog: Demo Mode & First Release
- Changelog: Shadow-Clipping Padding Fix
- Changelog: Cameras Module
- Release Packaging Workflow
- README Header Banner
- Changelog: Mobile Appliance Fixes
- Energia Dashboard View
- Irrigazione Dashboard View
- Live HA Backend Bridge
- Panel HA Backend Bridge
- App Icon (256px)
- Changelog: Empty-State Guidance
- Changelog: Selected-State Fix
- Vehicle Module Docs
- Known Limits Docs
- Project Overview Docs
- Kiosk Mode Docs
- Release Zip & Attach Job
- App Icon (512px)
- Transparent App Icon
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
3. `walkXImport()` - 9 edges
4. `walkElement()` - 9 edges
5. `createRuntime()` - 9 edges
6. `_boot()` - 9 edges
7. `getReact()` - 8 edges
8. `walkChildren()` - 8 edges
9. `domainOf()` - 7 edges
10. `discoverRooms()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `Reading the ring (IT)` --shares_data_with--> `Double concentric ring: outer=consumption, inner=production`  [INFERRED]
  README.it.md → public/dash_neumo.html
- `Root padding increased to 22px/24px to cover shadow reach` --implements--> `Clipping container padding must cover shadow reach`  [INFERRED]
  public/dash_neumo.html → CHANGELOG.md
- `energyCompact vs energyNormal card layout` --implements--> `Compact Fotovoltaico card hid home-screen energy values`  [INFERRED]
  public/dash_neumo.html → CHANGELOG.md
- `bars computation for energy chart` --implements--> `Third bar for energy fed back to the grid`  [INFERRED]
  public/dash_neumo.html → CHANGELOG.md
- `energia diagnostic console.info with field-name fallback` --implements--> `Diagnostic log lists unresolved source field names`  [INFERRED]
  public/dash_neumo.html → CHANGELOG.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Double-ring Fotovoltaico feature across changelog, README, and code** — changelog_double_ring_fotovoltaico, readme_reading_the_ring, public_dash_neumo_double_ring_architecture [INFERRED 0.90]
- **Root padding fix for neumorphic shadow clipping** — changelog_shadow_clipping_padding_fix, public_dash_neumo_nu_out_shadow_var, public_dash_neumo_root_padding_fix [EXTRACTED 1.00]
- **Config file lookup order across docs and code** — readme_config_paths_precedence, readme_it_config_paths_precedence, public_dash_neumo_config_paths [EXTRACTED 1.00]
- **Fotovoltaico double-ring energy model** — changelog_md_double_ring_fotovoltaico, readme_md_fotovoltaico_double_ring, readme_md_autoconsumo_derivation, claude_md_energy_color_convention, claude_md_flat_grid_energy_schema [INFERRED 0.85]
- **Templating constraints found on the field** — claude_md_style_literal_constraint, claude_md_dynamic_src_href_points_constraint, claude_md_window_casa_config_global, claude_md_panel_custom_tag_from_folder [EXTRACTED 1.00]

## Communities (46 total, 19 thin omitted)

### Community 0 - "DCLogic Component Runtime"
Cohesion: 0.07
Nodes (52): boot(), cdnScriptFor(), collectProps(), compileAttr(), compileTemplate(), contentKey(), createComponentFactory(), createExternalModules() (+44 more)

### Community 1 - "Changelog: Auto-Discovery & Double-Ring"
Cohesion: 0.09
Nodes (28): Double concentric Fotovoltaico ring replacing single ring, Optional Energy setup via HA Energy dashboard auto-discovery, Diagnostic log lists unresolved source field names, energy/get_prefs mapping kept only the first entry per role, console.info naming which tier resolved each energy source, Flat grid source shape support for energy/get_prefs, Install-time self-check for panel_custom name/folder mismatch, Custom element tag derived from deploy folder, not hardcoded (+20 more)

### Community 2 - "Home Assistant Panel Bridge"
Cohesion: 0.14
Nodes (9): CasaPanel, fetchDailyCounterHistory(), fetchDailyLastSample(), fetchHistory(), fetchRawHistory(), fetchTodayStatsDelta(), FOLDER_NAME, isoDay() (+1 more)

### Community 3 - "Changelog: Appliances & Cache-Busting"
Cohesion: 0.13
Nodes (12): Appliances optional module (config.appliances), ?v= cache-bust extended to loaded scripts, v1.1.0 (2026-08-14), v1.1.1 (2026-08-14), _boot(), bust(), DEFAULT_CONFIG, loadScript() (+4 more)

### Community 4 - "Changelog: Energy Presentation Fixes"
Cohesion: 0.13
Nodes (15): Energy chart colors reversed vs. home ring, Compact Fotovoltaico card hid home-screen energy values, Third bar for energy fed back to the grid, Pre-mount first render logged as permanent 'never resolved' warning, Browser HTML parser eagerly fetches template placeholder text as a URL, v1.4.2 (2026-08-14), v1.4.5 (2026-08-15), Nice round axis ceiling for energy chart y-axis (+7 more)

### Community 5 - "Entity Auto-Discovery"
Cohesion: 0.24
Nodes (12): collectConfiguredEntities(), discoverAllOfDomain(), discoverCameras(), discoverEnergyEntities(), discoverPeople(), discoverRooms(), discoverWeather(), domainOf() (+4 more)

### Community 6 - "CLAUDE.md Engineering Rules"
Cohesion: 0.15
Nodes (12): Autoconsumo (--sage), Dynamic src/href/points set post-mount, Energy role color convention (sage=solar, terracotta=grid), HA flat grid-source energy schema (stat_energy_from), Regenerate graphify before every commit, Immissione (--feed), panel_custom tag derived from deploy folder, Prelievo (--acc) (+4 more)

### Community 7 - "Changelog: HACS & Config Path"
Cohesion: 0.24
Nodes (12): Config location outside HACS-managed folder, Example config file renamed to avoid edit-in-place trap, HACS custom repository install support, v1.3.0 (2026-08-14), v1.3.1 (2026-08-14), CONFIG_PATHS, Config file search order, Via HACS installation method (+4 more)

### Community 8 - "Casa Dashboard Screenshot"
Cohesion: 0.25
Nodes (11): Casa Dashboard Screenshot, Allarme (Alarm) Card, Double-Ring Energy Gauge (7,6 kWh), Autoconsumo Tile (6,2 kWh), Dalla Rete Tile (1,4 kWh), Immessi in Rete Tile (3,6 kWh), Three-Tile Compact Energy Legend, Fotovoltaico Compact Card Layout (+3 more)

### Community 9 - "Changelog: Irrigation & Weather"
Cohesion: 0.20
Nodes (10): discoverRooms excludes config-referenced entities from generic lists, Irrigation zones via input_button timed watering, v0.3.0 (2026-08-13), v1.1.2 (2026-08-14), v1.2.0 (2026-08-14), Weather station optional module (config.weatherStation), Enabling Irrigation section, Enabling Irrigation section (IT) (+2 more)

### Community 10 - "Mobile Dashboard View"
Cohesion: 0.40
Nodes (6): Cose Accese Adesso (Active Devices List), Bottom Navigation Bar (Casa/Stanze/Irrigazione/Energia/Auto/Meteo), Modalità Casa (Home Mode Selector), Mobile Dashboard View (Screenshot), Chi è in Casa (Presence Tracker), Weather Widget (19°, Sunny)

### Community 11 - "Mobile Energy Chart & Ring"
Cohesion: 0.33
Nodes (6): bars array (mobile energy chart data), 3-bar Energy chart (mobile, collapsible), Energy color convention (mobile), Fotovoltaico ring (mobile Energia tab), ringLegend array (mobile), ringSeg() arc segment helper (mobile)

### Community 12 - "Demo Backend Mock"
Cohesion: 0.53
Nodes (4): buildRegistries(), cloneStates(), connect(), rand()

### Community 13 - "Energy Prefs Test Suite"
Cohesion: 0.33
Nodes (3): __dirname, sandbox, src

### Community 14 - "Changelog: Demo Mode & First Release"
Cohesion: 0.40
Nodes (5): Demo mode with invented dataset, First public release feature set, v0.1.0 (2026-08-12), Demo mode section, Demo mode section (IT)

### Community 15 - "Changelog: Shadow-Clipping Padding Fix"
Cohesion: 0.40
Nodes (5): Clipping container padding must cover shadow reach, v1.4.6 (2026-08-15), --nu-out neumorphic shadow variable, Root container (div data-nu=1), Root padding increased to 22px/24px to cover shadow reach

### Community 16 - "Changelog: Cameras Module"
Cohesion: 0.50
Nodes (4): Cameras optional module, auto-discovered, v0.2.0 (2026-08-12), Cameras optional section, Cameras optional section (IT)

### Community 18 - "Release Packaging Workflow"
Cohesion: 0.67
Nodes (3): Attach to Release Step, Build live_dashboard.zip Step, HACS zip_release content_in_root Convention

### Community 19 - "README Header Banner"
Cohesion: 1.00
Nodes (3): Live Dashboard README Header Banner, Home Assistant, Live Dashboard

### Community 20 - "Changelog: Mobile Appliance Fixes"
Cohesion: 0.67
Nodes (3): Duplicate appliance render loop on mobile, Removal of inconsistent 'N min remaining' text, v1.4.4 (2026-08-15)

### Community 21 - "Energia Dashboard View"
Cohesion: 1.00
Nodes (3): Energia Dashboard View, Live Power KPI Cards (Produzione/Consumo/Prelievo), Produzione e Prelievo Bar Chart

### Community 22 - "Irrigazione Dashboard View"
Cohesion: 1.00
Nodes (3): Irrigazione (Irrigation) Dashboard View, Zona 1 Irrigation Card, Zona 2 Irrigation Card

## Knowledge Gaps
- **66 isolated node(s):** `__dirname`, `src`, `sandbox`, `zip-and-attach Release Job`, `Attach to Release Step` (+61 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **19 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `_boot()` connect `Changelog: Appliances & Cache-Busting` to `Changelog: Auto-Discovery & Double-Ring`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Why does `Card visibility vs. text readiness timing race` connect `Changelog: Auto-Discovery & Double-Ring` to `Changelog: Energy Presentation Fixes`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Why does `walk()` connect `DCLogic Component Runtime` to `Entity Auto-Discovery`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **What connects `__dirname`, `src`, `sandbox` to the rest of the system?**
  _66 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `DCLogic Component Runtime` be split into smaller, more focused modules?**
  _Cohesion score 0.0673076923076923 - nodes in this community are weakly interconnected._
- **Should `Changelog: Auto-Discovery & Double-Ring` be split into smaller, more focused modules?**
  _Cohesion score 0.0873015873015873 - nodes in this community are weakly interconnected._
- **Should `Home Assistant Panel Bridge` be split into smaller, more focused modules?**
  _Cohesion score 0.13846153846153847 - nodes in this community are weakly interconnected._
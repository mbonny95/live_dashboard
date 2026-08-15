# Graph Report - .  (2026-08-15)

## Corpus Check
- 28 files · ~79,033 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 298 nodes · 453 edges · 33 communities (20 shown, 13 thin omitted)
- Extraction: 86% EXTRACTED · 14% INFERRED · 0% AMBIGUOUS · INFERRED: 62 edges (avg confidence: 0.88)
- Token cost: 305,848 input · 0 output

## Community Hubs (Navigation)
- DCLogic Component Runtime
- Changelog: Early Fixes & Modules
- Changelog: v1.3-1.4.5 Presentation Fixes
- Home Assistant Panel Bridge
- Changelog: Energy Auto-Discovery & Double-Ring
- Entity Auto-Discovery
- Energy Chart & Ring Data Pipeline
- Casa Dashboard Screenshot
- Early Release Modules & i18n
- Mobile Dashboard View
- Demo Backend Mock
- Energy Prefs Test Suite
- Release Packaging Workflow
- README Header Banner
- Energia Dashboard View
- Irrigazione Dashboard View
- Live HA Backend Bridge
- Panel HA Backend Bridge
- App Icon (256px)
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
6. `getReact()` - 8 edges
7. `walkChildren()` - 8 edges
8. `domainOf()` - 7 edges
9. `discoverRooms()` - 7 edges
10. `boot()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `Verify by screenshot/DOM, not by rereading code` --semantically_similar_to--> `Fotovoltaico compact-card legend fix`  [INFERRED] [semantically similar]
  CLAUDE.md → CHANGELOG.md
- `Verify by screenshot/DOM, not by rereading code` --semantically_similar_to--> `Placeholder-URL 404/native-parse fix`  [INFERRED] [semantically similar]
  CLAUDE.md → CHANGELOG.md
- `HACS support` --references--> `HACS installation`  [INFERRED]
  CHANGELOG.md → README.md
- `HACS installation` --conceptually_related_to--> `Installazione via HACS`  [INFERRED]
  README.md → README.it.md
- `Irrigation module` --conceptually_related_to--> `Modulo Irrigazione`  [INFERRED]
  README.md → README.it.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Fotovoltaico double-ring energy model** — changelog_md_double_ring_fotovoltaico, readme_md_fotovoltaico_double_ring, readme_md_autoconsumo_derivation, claude_md_energy_color_convention, claude_md_flat_grid_energy_schema [INFERRED 0.85]
- **Templating constraints found on the field** — claude_md_style_literal_constraint, claude_md_dynamic_src_href_points_constraint, claude_md_window_casa_config_global, claude_md_panel_custom_tag_from_folder [EXTRACTED 1.00]
- **HACS-safe config persistence pattern** — readme_md_config_search_order, changelog_md_config_www_location, changelog_md_live_dashboard_config_example_js_rename, claude_md_release_process [INFERRED 0.85]
- **3-tile compact energy legend feature** — public_dash_neumo_ringlegendtilegrid, public_dash_neumo_ringlegend, public_dash_neumo_fotovoltaicoringcompact [INFERRED 0.85]
- **3-bar Energy chart (production/grid/export), desktop + mobile** — public_dash_neumo_bars, public_dash_neumo_mobile_bars, public_dash_neumo_energybarchart, public_dash_neumo_mobile_energybarchart [INFERRED 0.85]
- **Fotovoltaico double-ring data pipeline (desktop)** — public_dash_neumo_ringseg, public_dash_neumo_ringlegend, public_dash_neumo_fotovoltaicoringnormal [INFERRED 0.80]

## Communities (33 total, 13 thin omitted)

### Community 0 - "DCLogic Component Runtime"
Cohesion: 0.07
Nodes (52): boot(), cdnScriptFor(), collectProps(), compileAttr(), compileTemplate(), contentKey(), createComponentFactory(), createExternalModules() (+44 more)

### Community 1 - "Changelog: Early Fixes & Modules"
Cohesion: 0.05
Nodes (52): Appliances module, Cameras module, [data-sel=true] !important fix, discoverRooms() config-referenced-entity exclusion, Duplicate appliance render fix, Empty-state guidance for zero HA areas, Irrigation buttons field (input_button), loadScript() cache-bust chain fix (+44 more)

### Community 2 - "Changelog: v1.3-1.4.5 Presentation Fixes"
Cohesion: 0.09
Nodes (27): config/www/live_dashboard_config.js location, Energy chart color-swap fix (sage/terracotta), First-render readiness timing fix, Fotovoltaico compact-card legend fix, Grid-export bar (fed-to-grid), HACS support, Irrigation sparkline SVG points fix, Renaming to live_dashboard_config.example.js (+19 more)

### Community 3 - "Home Assistant Panel Bridge"
Cohesion: 0.14
Nodes (9): CasaPanel, fetchDailyCounterHistory(), fetchDailyLastSample(), fetchHistory(), fetchRawHistory(), fetchTodayStatsDelta(), FOLDER_NAME, isoDay() (+1 more)

### Community 4 - "Changelog: Energy Auto-Discovery & Double-Ring"
Cohesion: 0.13
Nodes (20): config.energy.consumptionToday, config.energy.gridExportToday, console.info energy-source diagnostic logging, console.warn on real get_prefs failure, Diagnostic log field-name listing, Double-ring Fotovoltaico visualization, Energy auto-discovery from HA Energy dashboard, energy/get_prefs multi-entry summing fix (+12 more)

### Community 5 - "Entity Auto-Discovery"
Cohesion: 0.24
Nodes (12): collectConfiguredEntities(), discoverAllOfDomain(), discoverCameras(), discoverEnergyEntities(), discoverPeople(), discoverRooms(), discoverWeather(), domainOf() (+4 more)

### Community 6 - "Energy Chart & Ring Data Pipeline"
Cohesion: 0.22
Nodes (14): bars array (desktop energy chart data), 3-bar Energy chart (desktop), Energy color convention (desktop), Fotovoltaico ring, compact mode, Fotovoltaico ring, normal mode, bars array (mobile energy chart data), 3-bar Energy chart (mobile, collapsible), Energy color convention (mobile) (+6 more)

### Community 7 - "Casa Dashboard Screenshot"
Cohesion: 0.25
Nodes (11): Casa Dashboard Screenshot, Allarme (Alarm) Card, Double-Ring Energy Gauge (7,6 kWh), Autoconsumo Tile (6,2 kWh), Dalla Rete Tile (1,4 kWh), Immessi in Rete Tile (3,6 kWh), Three-Tile Compact Energy Legend, Fotovoltaico Compact Card Layout (+3 more)

### Community 8 - "Early Release Modules & i18n"
Cohesion: 0.29
Nodes (7): Demo mode, Energy module, First public release, Italian/English UI (i18n), Irrigation module, v0.1.0, Vehicle module

### Community 9 - "Mobile Dashboard View"
Cohesion: 0.40
Nodes (6): Cose Accese Adesso (Active Devices List), Bottom Navigation Bar (Casa/Stanze/Irrigazione/Energia/Auto/Meteo), Modalità Casa (Home Mode Selector), Mobile Dashboard View (Screenshot), Chi è in Casa (Presence Tracker), Weather Widget (19°, Sunny)

### Community 10 - "Demo Backend Mock"
Cohesion: 0.53
Nodes (4): buildRegistries(), cloneStates(), connect(), rand()

### Community 11 - "Energy Prefs Test Suite"
Cohesion: 0.33
Nodes (3): __dirname, sandbox, src

### Community 13 - "Release Packaging Workflow"
Cohesion: 0.67
Nodes (3): Attach to Release Step, Build live_dashboard.zip Step, HACS zip_release content_in_root Convention

### Community 14 - "README Header Banner"
Cohesion: 1.00
Nodes (3): Live Dashboard README Header Banner, Home Assistant, Live Dashboard

### Community 15 - "Energia Dashboard View"
Cohesion: 1.00
Nodes (3): Energia Dashboard View, Live Power KPI Cards (Produzione/Consumo/Prelievo), Produzione e Prelievo Bar Chart

### Community 16 - "Irrigazione Dashboard View"
Cohesion: 1.00
Nodes (3): Irrigazione (Irrigation) Dashboard View, Zona 1 Irrigation Card, Zona 2 Irrigation Card

## Knowledge Gaps
- **40 isolated node(s):** `FOLDER_NAME`, `__dirname`, `src`, `sandbox`, `zip-and-attach Release Job` (+35 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `walk()` connect `DCLogic Component Runtime` to `Entity Auto-Discovery`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **Why does `collectConfiguredEntities()` connect `Entity Auto-Discovery` to `DCLogic Component Runtime`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **Why does `v0.1.0` connect `Early Release Modules & i18n` to `Changelog: Early Fixes & Modules`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **What connects `FOLDER_NAME`, `__dirname`, `src` to the rest of the system?**
  _40 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `DCLogic Component Runtime` be split into smaller, more focused modules?**
  _Cohesion score 0.0673076923076923 - nodes in this community are weakly interconnected._
- **Should `Changelog: Early Fixes & Modules` be split into smaller, more focused modules?**
  _Cohesion score 0.05387205387205387 - nodes in this community are weakly interconnected._
- **Should `Changelog: v1.3-1.4.5 Presentation Fixes` be split into smaller, more focused modules?**
  _Cohesion score 0.08994708994708994 - nodes in this community are weakly interconnected._
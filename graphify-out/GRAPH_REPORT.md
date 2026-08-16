# Graph Report - .  (2026-08-16)

## Corpus Check
- 9 files · ~82,735 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 290 nodes · 375 edges · 57 communities (27 shown, 30 thin omitted)
- Extraction: 79% EXTRACTED · 21% INFERRED · 0% AMBIGUOUS · INFERRED: 78 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Templating Runtime (support.js)
- CasaPanel Web Component
- Room Discovery (discovery.js)
- Project Conventions (CLAUDE.md)
- Casa View Screenshot Walkthrough
- Appliances Module
- v1.4.8 Room Fix Release Notes
- Fotovoltaico Ring Redesign
- Early Release History (0.x-1.2)
- Neumorphic Shell Fixes
- HACS Install & panel_custom Naming
- Energy Zero-Config Discovery
- Mobile Dashboard Overview
- Demo Backend (ha-backend-demo.js)
- Energy Prefs Unit Test
- Script Loader Cache-Busting
- Cameras Module
- GitHub Release Workflow
- README Header Branding
- Config File Placement & Overwrite Safety
- Deferred href/src Binding
- Energia Tab View
- Irrigazione Tab View
- Backend Auto-Selection (ha-backend.js)
- Panel Backend (ha-backend-panel.js)
- App Icon Assets
- Alarm State Mapping
- Camera Close Handler
- History Chart Loader
- Camera Open Handler
- Home Tab Render Values
- Camera Reveal-on-Tap
- Room Summary Text
- Irrigation Valve Runner
- Sparkline Renderer
- Default Config Fallback
- Release Zip Job
- App Icon 512px
- Transparent App Icon
- Energy Diagnostic Logging
- Energy Role Resolution Logging
- Energy Prefs Multi-Entry Summing
- First-Render Readiness Fix
- Room Grid min-content Fix (1.4.8)
- Mobile-Only Room Detail
- Mobile Chart Toggle
- Camera Icon-Only Placeholder
- Demo Fallback Troubleshooting
- Troubleshooting Guide
- Energy Charts Troubleshooting
- Empty Rooms Troubleshooting
- Surveillance Tab Troubleshooting
- Blank Panel Troubleshooting

## God Nodes (most connected - your core abstractions)
1. `CasaPanel` - 17 edges
2. `discoverRooms()` - 10 edges
3. `walk()` - 10 edges
4. `walkXImport()` - 9 edges
5. `walkElement()` - 9 edges
6. `createRuntime()` - 9 edges
7. `getReact()` - 8 edges
8. `walkChildren()` - 8 edges
9. `domainOf()` - 7 edges
10. `boot()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `Known limits (area-assignment dependency, discovered domains)` --semantically_similar_to--> `Limiti noti (aree, domini scoperti)`  [INFERRED] [semantically similar]
  README.md → README.it.md
- `panel_custom panel, not Lovelace` --semantically_similar_to--> `Pannello panel_custom, non Lovelace`  [INFERRED] [semantically similar]
  README.md → README.it.md
- `Via HACS installation` --semantically_similar_to--> `Installazione via HACS`  [INFERRED] [semantically similar]
  README.md → README.it.md
- `Manual installation (casa/casa2 side-by-side)` --semantically_similar_to--> `Installazione manuale (casa/casa2)`  [INFERRED] [semantically similar]
  README.md → README.it.md
- `Energy sensor role mapping table` --semantically_similar_to--> `Tabella mappatura ruoli sensori energia`  [INFERRED] [semantically similar]
  README.md → README.it.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Version 1.4.8 release changes** — changelog_room_tiles_min_content, changelog_seven_new_domains, changelog_room_status_pills, changelog_switch_wattage_inline, readme_hacs_install [INFERRED 0.85]
- **Two-concentric-ring energy visualization system** — changelog_two_concentric_rings_redesign, readme_ring_reading, public_dash_neumo_energy_ring_markup, public_dash_neumo_mobile_energy_ring_markup [INFERRED 0.90]
- **Desktop/mobile duplicated Component implementation** — public_dash_neumo_component, public_dash_neumo_mobile_component, changelog_mobile_duplicate_appliance_loop_fix, changelog_cachebust_chain_fix [INFERRED 0.85]
- **Fotovoltaico double-ring energy model** — changelog_md_double_ring_fotovoltaico, readme_md_fotovoltaico_double_ring, readme_md_autoconsumo_derivation, claude_md_energy_color_convention, claude_md_flat_grid_energy_schema [INFERRED 0.85]
- **Templating constraints found on the field** — claude_md_style_literal_constraint, claude_md_dynamic_src_href_points_constraint, claude_md_window_casa_config_global, claude_md_panel_custom_tag_from_folder [EXTRACTED 1.00]

## Communities (57 total, 30 thin omitted)

### Community 0 - "Templating Runtime (support.js)"
Cohesion: 0.07
Nodes (52): boot(), cdnScriptFor(), collectProps(), compileAttr(), compileTemplate(), contentKey(), createComponentFactory(), createExternalModules() (+44 more)

### Community 1 - "CasaPanel Web Component"
Cohesion: 0.14
Nodes (9): CasaPanel, fetchDailyCounterHistory(), fetchDailyLastSample(), fetchHistory(), fetchRawHistory(), fetchTodayStatsDelta(), FOLDER_NAME, isoDay() (+1 more)

### Community 2 - "Room Discovery (discovery.js)"
Cohesion: 0.20
Nodes (15): discoverRooms() excludes any config.js-referenced entity (1.1.2), ROOMS_RESULT() (desktop), ROOMS_RESULT() (mobile), collectConfiguredEntities(), discoverAllOfDomain(), discoverCameras(), discoverEnergyEntities(), discoverPeople() (+7 more)

### Community 3 - "Project Conventions (CLAUDE.md)"
Cohesion: 0.15
Nodes (12): Autoconsumo (--sage), Dynamic src/href/points set post-mount, Energy role color convention (sage=solar, terracotta=grid), HA flat grid-source energy schema (stat_energy_from), Regenerate graphify before every commit, Immissione (--feed), panel_custom tag derived from deploy folder, Prelievo (--acc) (+4 more)

### Community 4 - "Casa View Screenshot Walkthrough"
Cohesion: 0.25
Nodes (11): Casa Dashboard Screenshot, Allarme (Alarm) Card, Double-Ring Energy Gauge (7,6 kWh), Autoconsumo Tile (6,2 kWh), Dalla Rete Tile (1,4 kWh), Immessi in Rete Tile (3,6 kWh), Three-Tile Compact Energy Legend, Fotovoltaico Compact Card Layout (+3 more)

### Community 5 - "Appliances Module"
Cohesion: 0.28
Nodes (9): Appliances module added (1.1.0), Duplicate appliance loop on mobile fixed (1.4.4), Removed unreliable 'N min remaining' appliance text (1.4.4), applianceItems() (desktop), applianceState() (desktop), applianceItems() (mobile), applianceState() (mobile), Appliances module (config.appliances) (+1 more)

### Community 6 - "v1.4.8 Room Fix Release Notes"
Cohesion: 0.25
Nodes (9): Battery pill only under 20% (1.4.8), Changelog, Room status pills for binary_sensor classes (1.4.8), Seven new discovered domains (1.4.8), Switch wattage inline display (1.4.8), Limiti noti (aree, domini scoperti), Live Dashboard (progetto, IT), Known limits (area-assignment dependency, discovered domains) (+1 more)

### Community 7 - "Fotovoltaico Ring Redesign"
Cohesion: 0.33
Nodes (9): Energy chart colors corrected to match ring grammar (1.4.5), Compact Fotovoltaico card hid energy values with cameras (1.4.5), Third chart bar for energy fed to grid (1.4.5), stroke-linecap:butt for near-zero ring segments (1.4.1), Fotovoltaico ring redesigned as two concentric rings (1.4.0), Two-ring Fotovoltaico SVG markup block (desktop), Two-ring Fotovoltaico SVG markup block (mobile), Come si legge l'anello: esterno=consumo, interno=produzione (+1 more)

### Community 8 - "Early Release History (0.x-1.2)"
Cohesion: 0.25
Nodes (9): First public release (0.1.0), Irrigation timed watering via input_button (0.3.0), Optional weather station module added (1.2.0), Demo mode (?demo / file://), Enabling Irrigation (valve/buttons), Attivare l'Irrigazione (valve/buttons), Stazione meteo (config.weatherStation), Vehicle module (config.vehicle) (+1 more)

### Community 9 - "Neumorphic Shell Fixes"
Cohesion: 0.29
Nodes (8): Card shadows clipped at page edges fixed (1.4.6), Empty-state guidance when zero HA areas exist (1.0.0), data-sel selected state fixed with !important (1.0.1), class Component extends DCLogic (desktop), class Component extends DCLogic (mobile), Kiosk mode for wall tablet, Mobile page: complete but secondary layout, Wall tablet landscape design constraint (1200x800 no-scroll)

### Community 10 - "HACS Install & panel_custom Naming"
Cohesion: 0.29
Nodes (7): HACS support added (1.3.0), Install-time self-check for panel_custom name/folder mismatch (1.4.0), panel.js registers <folder>-panel tag from deploy folder (0.2.1), Via HACS installation, Installazione via HACS, Installazione manuale (casa/casa2), Manual installation (casa/casa2 side-by-side)

### Community 11 - "Energy Zero-Config Discovery"
Cohesion: 0.33
Nodes (6): Energy setup optional via HA Energy dashboard / auto-discovery (1.4.0), Energy tab empty on zero-config installs (1.4.7), Support HA's flat grid energy schema (1.4.3), Trend chart message instead of flat zero bars (1.4.7), Energy sensor role mapping table, Tabella mappatura ruoli sensori energia

### Community 12 - "Mobile Dashboard Overview"
Cohesion: 0.40
Nodes (6): Cose Accese Adesso (Active Devices List), Bottom Navigation Bar (Casa/Stanze/Irrigazione/Energia/Auto/Meteo), Modalità Casa (Home Mode Selector), Mobile Dashboard View (Screenshot), Chi è in Casa (Presence Tracker), Weather Widget (19°, Sunny)

### Community 13 - "Demo Backend (ha-backend-demo.js)"
Cohesion: 0.53
Nodes (4): buildRegistries(), cloneStates(), connect(), rand()

### Community 14 - "Energy Prefs Unit Test"
Cohesion: 0.33
Nodes (3): __dirname, sandbox, src

### Community 15 - "Script Loader Cache-Busting"
Cohesion: 0.60
Nodes (5): loadScript() cache-bust propagated to whole load chain (1.1.1), componentDidMount() (desktop), loadScript() cache-busted script loader (desktop), componentDidMount() (mobile), loadScript() cache-busted script loader (mobile)

### Community 16 - "Cameras Module"
Cohesion: 0.50
Nodes (5): Cameras module added (0.2.0), Cameras module (auto-discovered), Telecamere (auto-discovery), Pannello panel_custom, non Lovelace, panel_custom panel, not Lovelace

### Community 18 - "GitHub Release Workflow"
Cohesion: 0.67
Nodes (3): Attach to Release Step, Build live_dashboard.zip Step, HACS zip_release content_in_root Convention

### Community 19 - "README Header Branding"
Cohesion: 1.00
Nodes (3): Live Dashboard README Header Banner, Home Assistant, Live Dashboard

### Community 20 - "Config File Placement & Overwrite Safety"
Cohesion: 0.67
Nodes (3): config/www/live_dashboard_config.js survives HACS updates (1.3.0), Example config renamed to avoid overwrite trap (1.3.1), config.js search order (3 candidate paths)

### Community 21 - "Deferred href/src Binding"
Cohesion: 1.00
Nodes (3): Deferred src/href/points binding to avoid browser pre-fetch 404s (1.4.2), _bindAttr() (desktop), _bindAttr() (mobile)

### Community 22 - "Energia Tab View"
Cohesion: 1.00
Nodes (3): Energia Dashboard View, Live Power KPI Cards (Produzione/Consumo/Prelievo), Produzione e Prelievo Bar Chart

### Community 23 - "Irrigazione Tab View"
Cohesion: 1.00
Nodes (3): Irrigazione (Irrigation) Dashboard View, Zona 1 Irrigation Card, Zona 2 Irrigation Card

## Knowledge Gaps
- **58 isolated node(s):** `__dirname`, `src`, `sandbox`, `zip-and-attach Release Job`, `Attach to Release Step` (+53 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **30 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `walk()` connect `Templating Runtime (support.js)` to `Room Discovery (discovery.js)`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **Why does `collectConfiguredEntities()` connect `Room Discovery (discovery.js)` to `Templating Runtime (support.js)`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **What connects `__dirname`, `src`, `sandbox` to the rest of the system?**
  _58 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Templating Runtime (support.js)` be split into smaller, more focused modules?**
  _Cohesion score 0.0673076923076923 - nodes in this community are weakly interconnected._
- **Should `CasaPanel Web Component` be split into smaller, more focused modules?**
  _Cohesion score 0.13846153846153847 - nodes in this community are weakly interconnected._
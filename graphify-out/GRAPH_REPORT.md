# Graph Report - .  (2026-08-20)

## Corpus Check
- 29 files · ~97,813 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 571 nodes · 729 edges · 105 communities (40 shown, 65 thin omitted)
- Extraction: 83% EXTRACTED · 17% INFERRED · 0% AMBIGUOUS · INFERRED: 126 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- dash_neumo.html Component Class
- support.js Micro-Framework Runtime
- dash_neumo_mobile.html Component Class
- README Energy & Install Docs
- panel.js Custom Panel Bridge
- CLAUDE.md Project Instructions
- discovery.js Auto-Discovery
- TROUBLESHOOTING.md Common Issues
- dash_neumo_mobile.html Boot Sequence
- dash_neumo_mobile.html Settings Mutators
- CHANGELOG: Diagnostics Panel (v1.5.1)
- dash_neumo.html Boot Sequence
- Casa Dashboard Screenshot
- prefs.js Persistence & Diagnostics Text
- CHANGELOG: Cameras Module
- CHANGELOG: First Public Release
- Mobile Dashboard Screenshot
- ha-backend-demo.js
- mapEnergyPrefs Test Suite
- CHANGELOG: panel_custom Tag Fix
- CHANGELOG: Appliances Module
- CHANGELOG: Energy Ring Redesign
- CHANGELOG: Room Tile Shadow Fix
- CHANGELOG: Cover Slider Gesture Fix (v1.5.2)
- README: Irrigation & Weather Setup
- release.yml HACS Zip Workflow
- README Header Banner & Icon
- CHANGELOG: Weather Station Module
- CHANGELOG: Energy Setup Optional
- CHANGELOG: Sparkline Attribute Timing Fix
- Energia Dashboard Screenshot
- Irrigazione Dashboard Screenshot
- dash_neumo_mobile.html Camera Fullscreen
- ha-backend.js
- ha-backend-panel.js
- README: Demo Mode
- App Icon Assets
- CHANGELOG: Config-Agnostic Exclusion Design
- CHANGELOG: Energy Chart Color Fix
- CHANGELOG: Camera Grid Adapts to Count
- CHANGELOG: Settings Panel Origin (v1.5.0)
- CHANGELOG: Rooms Show/Hide/Reorder
- CHANGELOG: Config Load Diagnostics
- CHANGELOG: Energy Instantaneous Diagnostics
- CHANGELOG: Cover Slider Keyboard & Dedup Fix
- CLAUDE.md: Density Constraints
- README: Appliances Section
- README: Vehicle Section
- README: Project Overview
- README: Requirements
- CHANGELOG: Connecting/Demo Fallback Fix
- zip-and-attach Release Job
- App Icon (512px)
- Transparent App Icon (256px)
- Irrigation Zones via input_button
- Zero-Areas Empty-State Guidance
- Fotovoltaico Grid-Figure Tooltip
- Mobile Energia Duplicate Tile Fix
- Selected-State Inline Style Override Fix (!important)
- Desktop Hardcoded Italian Labels Fix
- HACS Support
- New config.energy Keys (gridExportToday, consumptionToday)
- Stray Dot on Near-Zero Ring Segment Fix (stroke-linecap)
- False Never-Resolved Warning on First Render Fix
- Grid Sensor Double-Counting Guard
- Compact Fotovoltaico Card Layout (With Cameras)
- Home-Screen Energy Values Invisible With Cameras Fix
- Room Card Pill Cap and Priority Order
- rooms.max Default Raised 8 to 12
- New Sensor Pills incl. Battery-Under-20%
- Seven New Discovered Domains
- Status Pills for binary_sensor Device Classes
- Mobile Caps at 2 Camera Tiles
- Motion-First Stable Sort for Camera Tiles
- Cameras: Hide and Privacy Gate Toggle
- Differs-From-config.js Pill
- Export as config.js
- Gear Icon Entry Point
- localStorage Fallback for Persistence
- Per-Key True/False/Unset Override Design
- Persistence via frontend/set_user_data
- Desktop Drawer vs Mobile Full-Page Settings Layout
- Settings Panel Scope Exclusions (No Layout Editor)
- Sections On/Off Toggle
- Visibility Layer vs Entity Resolution Separation
- Clipboard Iframe Fallback (Selectable Text)
- Copy Diagnostics Button
- Diagnostics Panel Works in Demo Mode
- Diagnostics: Environment Section
- Diagnostics Panel Adds No New Configuration
- Duplicate Gesture Logic Across dash_neumo Files
- Long-Press Timer Cancel on Pointermove/Pointercancel
- NaN and No-Op Guards Before Service Call
- Position Slider Gated on SET_POSITION Feature Bit
- cover.set_cover_position Service Name Verification
- Cover Slider touch-action:none/user-select:none
- Component class
- Support this project (Ko-fi)
- Entities show unavailable in grey (intentional)

## God Nodes (most connected - your core abstractions)
1. `renderVals` - 56 edges
2. `renderVals()` - 34 edges
3. `CasaPanel` - 19 edges
4. `PREFS` - 13 edges
5. `_boot()` - 12 edges
6. `SAVE_PREFS` - 11 edges
7. `SAVE_PREFS()` - 11 edges
8. `walk()` - 10 edges
9. `roomDetail()` - 10 edges
10. `dash_neumo.html (desktop variant, sibling file)` - 10 edges

## Surprising Connections (you probably didn't know these)
- `Via HACS (recommended)` --semantically_similar_to--> `Via HACS (consigliato)`  [INFERRED] [semantically similar]
  README.md → README.it.md
- `Manual installation` --semantically_similar_to--> `Installazione manuale`  [INFERRED] [semantically similar]
  README.md → README.it.md
- `Enabling Energy` --semantically_similar_to--> `Attivare l'Energia`  [INFERRED] [semantically similar]
  README.md → README.it.md
- `Live Dashboard (project)` --semantically_similar_to--> `Live Dashboard (progetto)`  [INFERRED] [semantically similar]
  README.md → README.it.md
- `What this is, and isn't` --semantically_similar_to--> `Cos'è, e cosa non è`  [INFERRED] [semantically similar]
  README.md → README.it.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **I cinque vincoli del templating trovati sul campo** — claude_style_attribute_literal_rule, claude_dynamic_src_href_points_rule, claude_casa_config_global_rule, claude_panel_custom_tag_derivation_rule, claude_ha_energy_flat_schema_rule [EXTRACTED 1.00]
- **Passi del workflow di orientamento a inizio sessione** — claude_session_orientation_workflow, claude_wiki_index, claude_graph_report, claude_graphify_query_command, claude_changelog [EXTRACTED 1.00]
- **Regole della sezione Release** — claude_release_config_location_rule, claude_version_cache_busting_rule, claude_tag_prefix_convention, claude_tag_not_release_rule, claude_hacs_release_visibility_note, claude_release_zip_asset_check [EXTRACTED 1.00]
- **Grammatica colori energia e i suoi token** — claude_energy_color_grammar_rule, claude_sage_color_token, claude_acc_color_token, claude_feed_color_token [EXTRACTED 1.00]
- **Regole di rigenerazione graphify prima del commit** — claude_pre_commit_graphify_regeneration_rule, claude_no_post_commit_hook_rule [EXTRACTED 1.00]
- **Camera-related troubleshooting cluster** — troubleshooting_camera_tile_icon_only, troubleshooting_camera_hide_until_tap, troubleshooting_black_camera_overlay, troubleshooting_surveillance_tab_missing [INFERRED 0.75]
- **Entity registry state (disabled_by/hidden_by/area_id) drives multiple troubleshooting symptoms** — troubleshooting_rooms_empty, troubleshooting_auto_discovery_filters, troubleshooting_entity_missing, troubleshooting_surveillance_tab_missing [INFERRED 0.75]
- **config.js opt-in sections whose absence explains missing UI** — troubleshooting_whole_section_missing, troubleshooting_too_many_rooms, troubleshooting_energy_charts_wrong [INFERRED 0.65]
- **Diagnostica panel's three independent read-only reports** — public_dash_neumo_diagenergyinstant, public_dash_neumo_diagenergydaily, public_dash_neumo_diagenvironment, public_dash_neumo_dodiag, public_dash_neumo_diagnostics_panel_ui [EXTRACTED 0.90]
- **Long-press-to-hide pointer gesture flow** — public_dash_neumo_panellpdown, public_dash_neumo_panellpmove, public_dash_neumo_panellpup, public_dash_neumo_panellpmenu, public_dash_neumo_settings_long_hide, public_dash_neumo_long_press_hide_gesture [INFERRED 0.85]
- **Dual-strategy energy ring computation feeding the Fotovoltaico ring UI** — public_dash_neumo_rendervals, public_dash_neumo_ringseg, public_dash_neumo_arc, public_dash_neumo_energy_ring_ui [INFERRED 0.80]
- **Diagnostica panel data flow (config/energy/environment)** — public_dash_neumo_mobile_diagenergyinstant, public_dash_neumo_mobile_diagenergydaily, public_dash_neumo_mobile_diagenvironment, public_dash_neumo_mobile_resolveenergydaily, public_dash_neumo_mobile_ui_diagnostics_panel [INFERRED 0.85]
- **Settings-panel visibility resolution (prefs over config hide-lists)** — public_dash_neumo_mobile_prefs, public_dash_neumo_mobile_config_hidden, public_dash_neumo_mobile_module_visible, public_dash_neumo_mobile_entity_hidden_set, public_dash_neumo_mobile_casadiscovery_global, public_dash_neumo_mobile_save_prefs [INFERRED 0.90]
- **Long-press-to-hide gesture handling** — public_dash_neumo_mobile_panellpdown, public_dash_neumo_mobile_panellpmove, public_dash_neumo_mobile_panellpup, public_dash_neumo_mobile_panellpmenu, public_dash_neumo_mobile_settings_long_hide, public_dash_neumo_mobile_ui_longpress_menu [EXTRACTED 1.00]
- **Energy Role Resolution and Diagnostic Surfacing** — changelog_v1_4_0_energy_optional_ha_dashboard, changelog_v1_4_1_console_info_energy_resolution, changelog_v1_5_1_diagnostics_energy_daily [INFERRED 0.85]
- **Cover Slider Long-Press Gesture Bug Chain** — changelog_v1_5_0_longpress_hide_entity, changelog_v1_5_2_cover_gesture_fix, changelog_v1_5_2_cover_row_longpress_removed [INFERRED 0.90]
- **HACS Install Robustness Fixes** — changelog_v0_2_1_panel_tag_derivation_fix, changelog_v1_3_0_config_location_hacs_safe, changelog_v1_4_0_panel_custom_name_self_check [INFERRED 0.75]
- **Energy dashboard configuration and ring visualization** — readme_enabling_energy, readme_energy_role_mapping_table, readme_reading_the_ring, readme_fotovoltaico_ring [INFERRED 0.85]
- **Installation methods and update mechanics** — readme_via_hacs, readme_manual_installation, readme_migrating_hacs_manual, readme_module_url_cache_busting [INFERRED 0.85]
- **Config resolution vs. visibility layering** — readme_configuring_the_rest, readme_settings_panel, readme_live_dashboard_config_js [INFERRED 0.85]

## Communities (105 total, 65 thin omitted)

### Community 0 - "dash_neumo.html Component Class"
Cohesion: 0.05
Nodes (69): ALARM, ALARM_ID, ALL_CAMERAS_RESULT, ALL_ROOMS_RESULT, applianceItems, applianceState, arc (old-ring closure), at(id,k) attribute getter (+61 more)

### Community 1 - "support.js Micro-Framework Runtime"
Cohesion: 0.07
Nodes (51): boot(), cdnScriptFor(), collectProps(), compileAttr(), compileTemplate(), contentKey(), createComponentFactory(), createHelmetManager() (+43 more)

### Community 2 - "dash_neumo_mobile.html Component Class"
Cohesion: 0.06
Nodes (48): ALARM(), ALARM_ID(), ALL_CAMERAS_RESULT(), ALL_ROOMS_RESULT(), applianceItems(), applianceState(), _bindAttr(), call() (+40 more)

### Community 3 - "README Energy & Install Docs"
Cohesion: 0.09
Nodes (34): Cameras (optional), CHANGELOG.md, live_dashboard_config.example.js, Configuring the rest (config.js), Settings -> Diagnostica panel, Enabling Energy, Energy sensor role mapping table (Huawei/SolarEdge/Fronius/Shelly EM/HA), Fotovoltaico ring (double concentric ring) (+26 more)

### Community 4 - "panel.js Custom Panel Bridge"
Cohesion: 0.13
Nodes (9): CasaPanel, fetchDailyCounterHistory(), fetchDailyLastSample(), fetchHistory(), fetchRawHistory(), fetchTodayStatsDelta(), FOLDER_NAME, isoDay() (+1 more)

### Community 5 - "CLAUDE.md Project Instructions"
Cohesion: 0.08
Nodes (27): --acc: prelievo (famiglia terracotta = rete), window.CASA_CONFIG come global (import() bloccato su file://), CHANGELOG.md (voce più recente), console.log non esiste per utenti su companion app/tablet: serve diagnostica visibile in dashboard, src/href/points dinamici via ref callback dopo il mount, Grammatica colori energia non negoziabile (anello e barre coerenti), --feed: immissione (salvia schiarita), graphify-out/GRAPH_REPORT.md (+19 more)

### Community 6 - "discovery.js Auto-Discovery"
Cohesion: 0.19
Nodes (14): buildExportedConfig(), collectConfiguredEntities(), discoverAllOfDomain(), discoverCameras(), discoverEnergyEntities(), discoverPeople(), discoverRooms(), discoverWeather() (+6 more)

### Community 7 - "TROUBLESHOOTING.md Common Issues"
Cohesion: 0.11
Nodes (19): Alarm card has no buttons, or fewer than expected, Areas never assigned (no naming/grouping fallback), Auto-discovery filters: disabled_by / hidden_by / entity_category, area_id inheritance, Live camera overlay is a black/broken image, config.cameras.hideUntilTap (tap-to-reveal still), Camera tile only ever shows an icon, never a preview, Energy charts empty or look wrong, Energy diagnostics blocks: instantaneous values / daily totals, daily-counter vs lifetime-cumulative sensor mismatch (+11 more)

### Community 8 - "dash_neumo_mobile.html Boot Sequence"
Cohesion: 0.12
Nodes (16): ASSET_V, _boot(), bust(), window.CasaBackend (ha-backend.js), window.CasaBackendDemo (ha-backend-demo.js), window.CasaI18n (i18n.js), Component class, componentDidMount() (+8 more)

### Community 9 - "dash_neumo_mobile.html Settings Mutators"
Cohesion: 0.13
Nodes (11): window.CasaPrefs (prefs.js), SAVE_PREFS(), SETTINGS_LONG_HIDE(), SETTINGS_SET_CAMERA(), SETTINGS_SET_ENTITY(), SETTINGS_SET_MODULE(), SETTINGS_SET_ROOM(), UI: settings export sheet (+3 more)

### Community 10 - "CHANGELOG: Diagnostics Panel (v1.5.1)"
Cohesion: 0.17
Nodes (12): console.info Energy Role Resolution Logging, Sum All Entries Per Energy Role (Multi-Array/Meter), Diagnostic Log Lists Unrecognized Field Names, Flat Grid-Source Energy Schema Handling, Reddit Report: Solar Shown on Home But Not Energy Tab, Trend Chart Empty-State Message Instead of Flat Zero Bars, Zero-Config Install Energy Tab Empty Cells Fix, console.info Unreachable by Wall-Tablet Users (+4 more)

### Community 11 - "dash_neumo.html Boot Sequence"
Cohesion: 0.20
Nodes (12): _boot, bust, componentDidMount, componentWillUnmount, CONFIG_PATHS, DEFAULT_CONFIG, _loadHistory, loadScript (+4 more)

### Community 12 - "Casa Dashboard Screenshot"
Cohesion: 0.25
Nodes (11): Casa Dashboard Screenshot, Allarme (Alarm) Card, Double-Ring Energy Gauge (7,6 kWh), Autoconsumo Tile (6,2 kWh), Dalla Rete Tile (1,4 kWh), Immessi in Rete Tile (3,6 kWh), Three-Tile Compact Energy Legend, Fotovoltaico Compact Card Layout (+3 more)

### Community 13 - "prefs.js Persistence & Diagnostics Text"
Cohesion: 0.27
Nodes (8): diagRowLine(), diagText(), load(), padCol(), readLocal(), save(), writeLocal(), createExternalModules()

### Community 14 - "CHANGELOG: Cameras Module"
Cohesion: 0.25
Nodes (8): Cameras Module, hideUntilTap Privacy Mode, Tap-to-Live MJPEG Fullscreen Overlay, Snapshot Refresh Pauses When Page Not Visible, Device-to-Entity Relationship Pattern (Switch Wattage, Cameras), Switch Inline Wattage via Device Relationship, Camera Count-Based Grid Layouts (1/2/3/4/5+), Snapshot Refresh Interval Unchanged Rationale

### Community 15 - "CHANGELOG: First Public Release"
Cohesion: 0.33
Nodes (6): Auto-Discovery of Rooms/People/Weather/Alarm, Demo Mode With Invented Dataset, First Public Release, Italian/English UI via hass.language, Optional Modules Hidden Until Configured, panel_custom-Only Installation (0.1.0)

### Community 16 - "Mobile Dashboard Screenshot"
Cohesion: 0.40
Nodes (6): Cose Accese Adesso (Active Devices List), Bottom Navigation Bar (Casa/Stanze/Irrigazione/Energia/Auto/Meteo), Modalità Casa (Home Mode Selector), Mobile Dashboard View (Screenshot), Chi è in Casa (Presence Tracker), Weather Widget (19°, Sunny)

### Community 17 - "ha-backend-demo.js"
Cohesion: 0.53
Nodes (4): buildRegistries(), cloneStates(), connect(), rand()

### Community 18 - "mapEnergyPrefs Test Suite"
Cohesion: 0.33
Nodes (3): __dirname, sandbox, src

### Community 19 - "CHANGELOG: panel_custom Tag Fix"
Cohesion: 0.40
Nodes (5): Panel Custom Element Tag Derived From Deploy Folder, HACS-Safe Config Location (config/www/), Example Config Renamed to .example.js, panel_custom name: Mismatch Self-Check, README Second-Copy Pattern Clarification

### Community 20 - "CHANGELOG: Appliances Module"
Cohesion: 0.50
Nodes (4): Appliances Module, loadScript() Cache-Bust Chain Fix, Mobile Appliance Duplicate Render Fix, Remaining-Time Text Removed From Appliance Card

### Community 21 - "CHANGELOG: Energy Ring Redesign"
Cohesion: 0.50
Nodes (4): Fotovoltaico Ring Redesign: Two Concentric Rings, Shared Self-Used-Solar Segment Between Rings, Two Energy Identities (README Reference), Card/Text Readiness Timing Gap Fix

### Community 22 - "CHANGELOG: Room Tile Shadow Fix"
Cohesion: 0.50
Nodes (4): Card Shadow Clipping at Page Edges Fix, Reddit Report: Card Shadows Cut Off, Dwains Dashboard Comparison (Originating Report), Room Tiles Size to Content Instead of Stretching

### Community 23 - "CHANGELOG: Cover Slider Gesture Fix (v1.5.2)"
Cohesion: 0.50
Nodes (4): Entities: Role Pills for Visibility Decisions, Long-Press/Right-Click to Hide Entity, Cover Slider Long-Press/NaN Bug (Root Cause), Cover Row Long-Press-to-Hide Removed

### Community 25 - "README: Irrigation & Weather Setup"
Cohesion: 0.67
Nodes (4): Enabling Irrigation, Attivare l'Irrigazione, Stazione meteo (opzionale), Weather station (optional)

### Community 26 - "release.yml HACS Zip Workflow"
Cohesion: 0.67
Nodes (3): Attach to Release Step, Build live_dashboard.zip Step, HACS zip_release content_in_root Convention

### Community 27 - "README Header Banner & Icon"
Cohesion: 1.00
Nodes (3): Live Dashboard README Header Banner, Home Assistant, Live Dashboard

### Community 28 - "CHANGELOG: Weather Station Module"
Cohesion: 0.67
Nodes (3): Weather Station Reuses Irrigation Fields, Weather Detail Card Drops Duplicate Soil-Moisture Pills, Weather Station Module

### Community 29 - "CHANGELOG: Energy Setup Optional"
Cohesion: 0.67
Nodes (3): Energy Setup Optional via HA Energy Dashboard, Single-Ring Fallback Without Grid-Export Sensor, energy/get_prefs Failure Logged as console.warn

### Community 30 - "CHANGELOG: Sparkline Attribute Timing Fix"
Cohesion: 0.67
Nodes (3): HTML Parser Eager-Fetches Placeholder src/href, Irrigation Sparkline points Attribute Warning Fix, Deferred Attribute Assignment After Real Data

### Community 31 - "Energia Dashboard Screenshot"
Cohesion: 1.00
Nodes (3): Energia Dashboard View, Live Power KPI Cards (Produzione/Consumo/Prelievo), Produzione e Prelievo Bar Chart

### Community 32 - "Irrigazione Dashboard Screenshot"
Cohesion: 1.00
Nodes (3): Irrigazione (Irrigation) Dashboard View, Zona 1 Irrigation Card, Zona 2 Irrigation Card

### Community 33 - "dash_neumo_mobile.html Camera Fullscreen"
Cohesion: 1.00
Nodes (3): _closeCam(), _openCam(), UI: camera fullscreen stream modal

### Community 36 - "README: Demo Mode"
Cohesion: 0.67
Nodes (3): Demo backend (?demo / file:// fallback), Demo mode, Modalità demo

## Knowledge Gaps
- **146 isolated node(s):** `FOLDER_NAME`, `__dirname`, `src`, `sandbox`, `zip-and-attach Release Job` (+141 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **65 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `renderVals()` connect `dash_neumo_mobile.html Component Class` to `dash_neumo_mobile.html Settings Mutators`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **Why does `walk()` connect `support.js Micro-Framework Runtime` to `discovery.js Auto-Discovery`?**
  _High betweenness centrality (0.009) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `renderVals` (e.g. with `Sorveglianza tab` and `Casa tab layout`) actually correct?**
  _`renderVals` has 5 INFERRED edges - model-reasoned connections that need verification._
- **Are the 13 inferred relationships involving `renderVals()` (e.g. with `UI: active now card` and `UI: bottom tab bar navigation`) actually correct?**
  _`renderVals()` has 13 INFERRED edges - model-reasoned connections that need verification._
- **What connects `FOLDER_NAME`, `__dirname`, `src` to the rest of the system?**
  _146 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `dash_neumo.html Component Class` be split into smaller, more focused modules?**
  _Cohesion score 0.052429667519181586 - nodes in this community are weakly interconnected._
- **Should `support.js Micro-Framework Runtime` be split into smaller, more focused modules?**
  _Cohesion score 0.06845238095238096 - nodes in this community are weakly interconnected._
# Graph Report - .  (2026-08-27)

## Corpus Check
- 30 files · ~107,111 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 566 nodes · 894 edges · 64 communities (38 shown, 26 thin omitted)
- Extraction: 82% EXTRACTED · 17% INFERRED · 0% AMBIGUOUS · INFERRED: 156 edges (avg confidence: 0.89)
- Token cost: 63,593 input · 0 output

## Community Hubs (Navigation)
- Support Micro-Framework Runtime
- Camera Live-View Strategy
- Casa Panel Render Sections
- Config/Entity Visibility Helpers
- casa-panel Custom Element
- Project Instructions (CLAUDE.md)
- Alarm & Discovery Logic
- Alarm Guard & Appliance Helpers
- Demo Scenarios (Troubleshooting)
- Changelog: Alarm & Camera Fixes
- Mobile Diagnostics Helpers
- Changelog: Power & Units Fixes
- Mobile Formatting Helpers
- Changelog: Energy Diagnostics
- Casa Screenshot Annotations
- Prefs Persistence & Diagnostics Text
- README Cross-References
- README Installation Instructions
- Demo Backend & Scenario Data
- Changelog: Appliances & Irrigation
- Changelog: Settings Panel & Config
- Changelog: Diagnostics Panel
- Long-Press Gesture Handlers
- Mobile Screenshot Annotations
- Room/Camera Aggregate Results
- mapEnergyPrefs Test Suite
- Changelog: Demo Mode & Release
- Mobile Settings Long-Press Actions
- Release Workflow (GitHub Actions)
- README Header Banner
- Energia Screenshot Annotations
- Irrigazione Screenshot Annotations
- HA Backend Dispatcher
- HA Backend Panel Bridge
- App Icon (256px)
- Changelog: Energy Ring Legend
- Changelog: Cover Slider Fix (v1.5.2)
- Changelog: Grid Tooltip/Empty State
- Changelog: Camera Grid Adapts to Count
- CLAUDE.md: Density Constraint Retired
- Icon Sprite & Theme Tokens
- TROUBLESHOOTING: Rooms/Areas
- Zip-and-Attach Release Job
- App Icon (512px)
- Transparent App Icon
- Changelog: Card Shadow Fix
- Changelog: Energy Tab Fallback
- Changelog: Flat Grid Schema Fix
- Changelog: Mobile Appliance Loop Fix
- Changelog: Remaining-Time Removal
- Changelog: Ring Stroke Linecap Fix
- Changelog: Template Placeholder Fix
- README: Vehicle Config
- TROUBLESHOOTING: Irrigation Chart Noise
- TROUBLESHOOTING: Irrigation Chart Noise (dup)
- TROUBLESHOOTING: Optional Sections
- TROUBLESHOOTING: Unavailable Entity Display
- TROUBLESHOOTING: Unavailable Entity Display (dup)

## God Nodes (most connected - your core abstractions)
1. `renderVals()` - 55 edges
2. `CasaPanel` - 20 edges
3. `PREFS()` - 18 edges
4. `Component.PREFS()` - 16 edges
5. `SAVE_PREFS()` - 13 edges
6. `Component.SAVE_PREFS()` - 13 edges
7. `walk()` - 10 edges
8. `powerVal()` - 10 edges
9. `domainOf()` - 9 edges
10. `discoverRooms()` - 9 edges

## Surprising Connections (you probably didn't know these)
- `Start here: Settings → Diagnostica` --semantically_similar_to--> `Diagnostics panel (settings gear → Diagnostica)`  [INFERRED] [semantically similar]
  TROUBLESHOOTING.md → CHANGELOG.md
- `ARM_CUSTOM_BYPASS ("Personalizzato") alarm button` --references--> `discoverAlarm()`  [INFERRED]
  CHANGELOG.md → public/discovery.js
- `Three-layer camera live-view strategy` --semantically_similar_to--> `Live camera overlay black/broken image (fixed v1.5.4)`  [INFERRED] [semantically similar]
  CHANGELOG.md → TROUBLESHOOTING.md
- `energy.gridNote daily-vs-instantaneous mixing fix` --semantically_similar_to--> `Energy charts empty/wrong: daily-counter vs power-role mistakes`  [INFERRED] [semantically similar]
  CHANGELOG.md → TROUBLESHOOTING.md
- `Diagnostics: Energy instantaneous values block` --semantically_similar_to--> `Energy charts empty/wrong: daily-counter vs power-role mistakes`  [INFERRED] [semantically similar]
  CHANGELOG.md → TROUBLESHOOTING.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Camera Live-View Strategy Across Docs** — changelog_three_layer_camera_live_view, readme_camera_live_view_layers, troubleshooting_camera_black_overlay_fixed_1_5_4, changelog_hls_js_vendoring_open_question [INFERRED 0.85]
- **Alarm Module: Discovery, PIN Gating, Buttons and Troubleshooting** — changelog_alarm_auto_discovery, changelog_alarm_pin_code_format_gating, changelog_arm_custom_bypass_button, troubleshooting_alarm_no_buttons, troubleshooting_alarm_buttons_noop [INFERRED 0.80]
- **Diagnostics Panel Ecosystem** — changelog_diagnostics_panel, changelog_four_tab_settings_panel, troubleshooting_diagnostica_entry_point, readme_settings_panel_reference [INFERRED 0.80]
- **I cinque vincoli del templating trovati sul campo** — claude_style_attribute_literal_rule, claude_dynamic_src_href_points_rule, claude_casa_config_global_rule, claude_panel_custom_tag_derivation_rule, claude_ha_energy_flat_schema_rule [EXTRACTED 1.00]
- **Passi del workflow di orientamento a inizio sessione** — claude_session_orientation_workflow, claude_wiki_index, claude_graph_report, claude_graphify_query_command, claude_changelog [EXTRACTED 1.00]
- **Regole della sezione Release** — claude_release_config_location_rule, claude_version_cache_busting_rule, claude_tag_prefix_convention, claude_tag_not_release_rule, claude_hacs_release_visibility_note, claude_release_zip_asset_check [EXTRACTED 1.00]
- **Grammatica colori energia e i suoi token** — claude_energy_color_grammar_rule, claude_sage_color_token, claude_acc_color_token, claude_feed_color_token [EXTRACTED 1.00]
- **Regole di rigenerazione graphify prima del commit** — claude_pre_commit_graphify_regeneration_rule, claude_no_post_commit_hook_rule [EXTRACTED 1.00]
- **Energy Double/Single Ring Duality** — public_dash_neumo_energy_ring_new, public_dash_neumo_energy_ring_old, public_dash_neumo_energy_ring_selection_rationale, public_dash_neumo_energy_compact_widget [EXTRACTED 1.00]
- **Room Detail Panel Composition** — public_dash_neumo_room_detail_panel, public_dash_neumo_panel_lights_section, public_dash_neumo_panel_covers_section, public_dash_neumo_panel_appliances_section, public_dash_neumo_panel_switches_section, public_dash_neumo_panel_sensors_section, public_dash_neumo_panel_media_section, public_dash_neumo_panel_extras_section [EXTRACTED 1.00]
- **Templating Binding Constraints (style literal, ref callback)** — public_dash_neumo_style_literal_binding_rationale, public_dash_neumo_ref_callback_binding_rationale, public_dash_neumo_energy_ring_new, public_dash_neumo_camera_modal [INFERRED 0.85]
- **Camera Live View Three-Layer Fallback** — public_dash_neumo_camera_live_view_strategy, public_dash_neumo_camstartstream, public_dash_neumo_ensurehlsjs, public_dash_neumo_attachhlsjs, public_dash_neumo_camstartfastpoll, public_dash_neumo_camstopfastpoll [INFERRED 0.85]
- **Settings Panel Prefs Mutators** — public_dash_neumo_settings_set_room, public_dash_neumo_settings_clear_room, public_dash_neumo_settings_move_room, public_dash_neumo_settings_set_entity, public_dash_neumo_settings_clear_entity, public_dash_neumo_settings_set_camera, public_dash_neumo_settings_clear_camera, public_dash_neumo_settings_toggle_tapgate, public_dash_neumo_settings_set_module, public_dash_neumo_settings_set_power_unit, public_dash_neumo_settings_set_plug_threshold, public_dash_neumo_settings_reset, public_dash_neumo_save_prefs [INFERRED 0.75]
- **Diagnostica Panel Reporting Methods** — public_dash_neumo_diagenergyinstant, public_dash_neumo_diagenergydaily, public_dash_neumo_diagenvironment, public_dash_neumo_settingsproblemtab [INFERRED 0.75]
- **Tiered camera stream fallback (hls-native / hls.js / snapshot polling)** — public_dash_neumo_mobile_camstartstream, public_dash_neumo_mobile_ensurehlsjs, public_dash_neumo_mobile_attachhlsjs, public_dash_neumo_mobile_camstartfastpoll [INFERRED 0.85]
- **Diagnostica panel (v1.5.1) data assembly** — public_dash_neumo_mobile_diagenergyinstant, public_dash_neumo_mobile_diagenergydaily, public_dash_neumo_mobile_settingsproblemtab, public_dash_neumo_mobile_diagenvironment [INFERRED 0.85]
- **Demo scenario switching flow (bar UI, URL state, backend SEED patch, docs)** — changelog_demo_scenarios_feature, public_dash_neumo_scenario_bar, public_dash_neumo_switchscenario, public_dash_neumo_mobile_scenario_bar, public_dash_neumo_mobile_switchscenario, troubleshooting_demo_scenario_table, public_dash_neumo_casabackenddemo [INFERRED 0.85]
- **Recurring bug class: mixing instantaneous power/ratio values into daily-total energy displays** — changelog_gridnote_fix, changelog_single_ring_selfconsumption_fix, changelog_powerval_helper, changelog_instant_power_unit_setting, troubleshooting_energy_charts_empty [INFERRED 0.85]
- **v1.5.4 auto-discovery/diagnostic feature set (alarm + cameras)** — changelog_alarm_autodiscovery, changelog_alarm_pin_awareness, changelog_arm_custom_bypass, changelog_diagnostica_rows_v154, changelog_black_camera_fix [EXTRACTED 1.00]

## Communities (64 total, 26 thin omitted)

### Community 0 - "Support Micro-Framework Runtime"
Cohesion: 0.07
Nodes (51): boot(), cdnScriptFor(), collectProps(), compileAttr(), compileTemplate(), contentKey(), createComponentFactory(), createHelmetManager() (+43 more)

### Community 1 - "Camera Live-View Strategy"
Cohesion: 0.07
Nodes (47): camera/stream HLS websocket call, Fast camera_proxy still-image polling fallback, hls.js vendoring open question, Three-layer camera live-view strategy, _attachHlsJs(), _boot(), bust(), Three-Layer Camera Live View (+39 more)

### Community 2 - "Casa Panel Render Sections"
Cohesion: 0.06
Nodes (43): Active Items List (On Now), Alarm Panel, All Rooms Overflow Panel, Camera Home Multi Grid, Camera Home Single Tile, Camera Home Widget, Camera Detail Modal, Casa View (+35 more)

### Community 3 - "Config/Entity Visibility Helpers"
Cohesion: 0.13
Nodes (32): CONFIG_HIDDEN(), ENTITY_HIDDEN_SET(), Component.CONFIG_HIDDEN(), Component.ENTITY_HIDDEN_SET(), Component.PREFS(), Component.ROOMS_RESULT(), Component.SAVE_PREFS(), Component.SETTINGS_CLEAR_CAMERA() (+24 more)

### Community 4 - "casa-panel Custom Element"
Cohesion: 0.13
Nodes (9): CasaPanel, fetchDailyCounterHistory(), fetchDailyLastSample(), fetchHistory(), fetchRawHistory(), fetchTodayStatsDelta(), FOLDER_NAME, isoDay() (+1 more)

### Community 5 - "Project Instructions (CLAUDE.md)"
Cohesion: 0.08
Nodes (27): --acc: prelievo (famiglia terracotta = rete), window.CASA_CONFIG come global (import() bloccato su file://), CHANGELOG.md (voce più recente), console.log non esiste per utenti su companion app/tablet: serve diagnostica visibile in dashboard, src/href/points dinamici via ref callback dopo il mount, Grammatica colori energia non negoziabile (anello e barre coerenti), --feed: immissione (salvia schiarita), graphify-out/GRAPH_REPORT.md (+19 more)

### Community 6 - "Alarm & Discovery Logic"
Cohesion: 0.15
Nodes (21): Alarm panel auto-discovery, Alarm PIN/code_format gating (no-op with note), ARM_CUSTOM_BYPASS ("Personalizzato") alarm button, buildExportedConfig(), collectConfiguredEntities(), discoverAlarm(), discoverAllOfDomain(), discoverCameras() (+13 more)

### Community 7 - "Alarm Guard & Appliance Helpers"
Cohesion: 0.13
Nodes (20): ALARM(), ALARM_ID(), PIN-Gated Alarm Guard, applianceItems(), applianceState(), _bindAttr(), call(), isOn() (+12 more)

### Community 8 - "Demo Scenarios (Troubleshooting)"
Cohesion: 0.12
Nodes (20): Seven forceable demo scenarios, scenario=missing, scenario=partial, Unreleased (CHANGELOG), &bare URL flag, window.CasaBackendDemo (ha-backend-demo.js global), &bare URL flag [mobile], Demo scenario bar (mobile) (+12 more)

### Community 9 - "Changelog: Alarm & Camera Fixes"
Cohesion: 0.12
Nodes (19): Alarm PIN awareness (code_format gating), ARM_CUSTOM_BYPASS alarm button, Live camera black-screen fix (three-layer strategy), Cameras module initial release (auto-discovered), Three new Diagnostica rows (camera/energy/alarm), energy.gridNote daily/instantaneous mixing fix, Open question: vendor hls.js, Single-ring self-consumption line mixing fix (+11 more)

### Community 10 - "Mobile Diagnostics Helpers"
Cohesion: 0.20
Nodes (19): at(), dec(), diagEnergyDaily(), diagEnergyInstant(), Component.at(), Component.dec(), Component.diagEnergyDaily(), Component.diagEnergyInstant() (+11 more)

### Community 11 - "Changelog: Power & Units Fixes"
Cohesion: 0.14
Nodes (16): energy.periodNote hardcoded-unit-in-template fix, Instantaneous power unit setting (Auto/W/kW), powerVal() shared unit-normalization helper, powerVal() instantaneous power unit normalization, Room tiles size to min-content instead of stretching, Settings panel tabbed navigation (Stanze/Energia/Telecamere/Diagnostica), Seven new discovered domains + status/sensor pills, Configurable smart-plug active/running power threshold (+8 more)

### Community 12 - "Mobile Formatting Helpers"
Cohesion: 0.23
Nodes (14): cover(), fn(), Component.applianceItems(), Component.applianceState(), Component._bindAttr(), Component.call(), Component.cover(), Component.fn() (+6 more)

### Community 13 - "Changelog: Energy Diagnostics"
Cohesion: 0.22
Nodes (11): Diagnostics: Energy daily totals block, Double-ring energy model (consumption/production identities), Energy auto-discovery via HA Energy dashboard get_prefs, energy/get_prefs multi-entry summation fix, energy.gridNote daily-vs-instantaneous mixing fix, panel_custom name: mismatch install-time self-check, README: energy sensor role mapping table, README.it: tabella mappatura ruoli energia (+3 more)

### Community 14 - "Casa Screenshot Annotations"
Cohesion: 0.25
Nodes (11): Casa Dashboard Screenshot, Allarme (Alarm) Card, Double-Ring Energy Gauge (7,6 kWh), Autoconsumo Tile (6,2 kWh), Dalla Rete Tile (1,4 kWh), Immessi in Rete Tile (3,6 kWh), Three-Tile Compact Energy Legend, Fotovoltaico Compact Card Layout (+3 more)

### Community 15 - "Prefs Persistence & Diagnostics Text"
Cohesion: 0.27
Nodes (8): diagRowLine(), diagText(), load(), padCol(), readLocal(), save(), writeLocal(), createExternalModules()

### Community 16 - "README Cross-References"
Cohesion: 0.24
Nodes (6): README.it: limiti noti, README: kiosk mode for wall tablet, README: known limits, Empty rooms: areas never assigned in HA, Entity not showing anywhere: discovery checklist, Missing section (Energy/Irrigation/Vehicle/...) is opt-in by design

### Community 17 - "README Installation Instructions"
Cohesion: 0.24
Nodes (10): loadScript() cache-bust propagation fix, panel_custom tag derived from deploy folder fix, README: HACS installation instructions, README.it: installazione HACS, README.it: installazione manuale, README: Manual installation instructions, White/blank panel: panel_custom.name mismatch, Start here: Settings → Diagnostica (+2 more)

### Community 18 - "Demo Backend & Scenario Data"
Cohesion: 0.29
Nodes (6): buildRegistries(), cloneStates(), connect(), patchConfig(), rand(), scenarioConfig()

### Community 19 - "Changelog: Appliances & Irrigation"
Cohesion: 0.22
Nodes (9): Appliances module (config.appliances), discoverRooms() excludes entities referenced elsewhere in config.js, Irrigation buttons field (input_button alternative to valve), Optional weather station config module, README: appliances optional config, README: enabling irrigation (valve/buttons), README.it: prese smart senza voce in config.appliances, README: smart plugs without config.appliances entry (+1 more)

### Community 20 - "Changelog: Settings Panel & Config"
Cohesion: 0.22
Nodes (9): config/www/live_dashboard_config.js update-safe config location, Example config renamed to .example.js, Export as config.js button, HACS custom-repository support, Settings panel (rooms/entities/cameras/sections visibility), Settings panel: cameras privacy gate + section toggles, Settings panel: rooms/entities show-hide-reorder, README: config.js path resolution order (+1 more)

### Community 21 - "Changelog: Diagnostics Panel"
Cohesion: 0.29
Nodes (8): Copy diagnostics clipboard button, Cover position slider long-press/drag/NaN fix, Diagnostics: Config block (config.js path resolution), Diagnostics: Energy instantaneous values block, Diagnostics: Environment block, Diagnostics panel (settings gear → Diagnostica), Four-tab settings panel (Stanze/Energia/Telecamere/Diagnostica), Three new Diagnostica rows (camera/energy-ring/alarm)

### Community 22 - "Long-Press Gesture Handlers"
Cohesion: 0.36
Nodes (8): _lpEntityId(), Component._lpEntityId(), Component._panelLpDown(), Component._panelLpMenu(), Component._panelLpUp(), _panelLpDown(), _panelLpMenu(), _panelLpUp()

### Community 23 - "Mobile Screenshot Annotations"
Cohesion: 0.40
Nodes (6): Cose Accese Adesso (Active Devices List), Bottom Navigation Bar (Casa/Stanze/Irrigazione/Energia/Auto/Meteo), Modalità Casa (Home Mode Selector), Mobile Dashboard View (Screenshot), Chi è in Casa (Presence Tracker), Weather Widget (19°, Sunny)

### Community 24 - "Room/Camera Aggregate Results"
Cohesion: 0.47
Nodes (6): ALL_CAMERAS_RESULT(), ALL_ROOMS_RESULT(), diagEnvironment(), Component.ALL_CAMERAS_RESULT(), Component.ALL_ROOMS_RESULT(), Component.diagEnvironment()

### Community 25 - "mapEnergyPrefs Test Suite"
Cohesion: 0.33
Nodes (3): __dirname, sandbox, src

### Community 26 - "Changelog: Demo Mode & Release"
Cohesion: 0.40
Nodes (5): Demo mode with invented dataset, First public release (0.1.0), Selected-state !important inline-style override fix, README: demo mode documentation, Stuck on "Connecting…" and demo-mode fallback

### Community 27 - "Mobile Settings Long-Press Actions"
Cohesion: 0.67
Nodes (4): Component.SETTINGS_LONG_HIDE(), Component.SETTINGS_SET_ENTITY(), SETTINGS_LONG_HIDE(), SETTINGS_SET_ENTITY()

### Community 29 - "Release Workflow (GitHub Actions)"
Cohesion: 0.67
Nodes (3): Attach to Release Step, Build live_dashboard.zip Step, HACS zip_release content_in_root Convention

### Community 30 - "README Header Banner"
Cohesion: 1.00
Nodes (3): Live Dashboard README Header Banner, Home Assistant, Live Dashboard

### Community 31 - "Energia Screenshot Annotations"
Cohesion: 1.00
Nodes (3): Energia Dashboard View, Live Power KPI Cards (Produzione/Consumo/Prelievo), Produzione e Prelievo Bar Chart

### Community 32 - "Irrigazione Screenshot Annotations"
Cohesion: 1.00
Nodes (3): Irrigazione (Irrigation) Dashboard View, Zona 1 Irrigation Card, Zona 2 Irrigation Card

## Ambiguous Edges - Review These
- `Four-tab settings panel (Stanze/Energia/Telecamere/Diagnostica)` → `Cover position slider long-press/drag/NaN fix`  [AMBIGUOUS]
  CHANGELOG.md · relation: conceptually_related_to
- `Selected-state !important inline-style override fix` → `First public release (0.1.0)`  [AMBIGUOUS]
  CHANGELOG.md · relation: conceptually_related_to
- `Camera tile shows only icon, never preview` → `Sorveglianza/Surveillance tab requires 2+ cameras`  [AMBIGUOUS]
  TROUBLESHOOTING.md · relation: conceptually_related_to

## Knowledge Gaps
- **95 isolated node(s):** `FOLDER_NAME`, `__dirname`, `src`, `sandbox`, `zip-and-attach Release Job` (+90 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **26 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Four-tab settings panel (Stanze/Energia/Telecamere/Diagnostica)` and `Cover position slider long-press/drag/NaN fix`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Selected-state !important inline-style override fix` and `First public release (0.1.0)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Camera tile shows only icon, never preview` and `Sorveglianza/Surveillance tab requires 2+ cameras`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `renderVals()` connect `Alarm Guard & Appliance Helpers` to `Camera Live-View Strategy`, `Config/Entity Visibility Helpers`, `Changelog: Alarm & Camera Fixes`, `Mobile Diagnostics Helpers`, `Mobile Formatting Helpers`, `Long-Press Gesture Handlers`, `Room/Camera Aggregate Results`, `Mobile Settings Long-Press Actions`?**
  _High betweenness centrality (0.238) - this node is a cross-community bridge._
- **Why does `collectConfiguredEntities()` connect `Alarm & Discovery Logic` to `Support Micro-Framework Runtime`?**
  _High betweenness centrality (0.159) - this node is a cross-community bridge._
- **Why does `walk()` connect `Support Micro-Framework Runtime` to `Alarm & Discovery Logic`?**
  _High betweenness centrality (0.157) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `renderVals()` (e.g. with `PIN-Gated Alarm Guard` and `renderVals() [mobile]`) actually correct?**
  _`renderVals()` has 3 INFERRED edges - model-reasoned connections that need verification._
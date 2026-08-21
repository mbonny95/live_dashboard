# Graph Report - .  (2026-08-21)

## Corpus Check
- 29 files · ~105,500 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 513 nodes · 834 edges · 48 communities (27 shown, 21 thin omitted)
- Extraction: 82% EXTRACTED · 18% INFERRED · 0% AMBIGUOUS · INFERRED: 147 edges (avg confidence: 0.89)
- Token cost: 435,036 input · 0 output

## Community Hubs (Navigation)
- Alarm, Rooms & Appliances Data
- Support Micro-Framework Runtime
- Camera Live-View Strategy
- Changelog: Diagnostics & Config
- Casa Panel Render Sections
- casa-panel Custom Element
- Project Instructions (CLAUDE.md)
- Alarm & Discovery Logic
- Mobile Formatting Helpers
- Changelog: Power & Units Fixes
- Casa Screenshot Annotations
- Prefs Persistence & Diagnostics Text
- Long-Press Gesture Handlers
- Mobile Screenshot Annotations
- Demo Backend Data
- mapEnergyPrefs Test Suite
- Demo Mode Fallback
- Release Workflow (GitHub Actions)
- README Header Banner
- Energia Screenshot Annotations
- Irrigazione Screenshot Annotations
- HA Backend Dispatcher
- HA Backend Panel Bridge
- App Icon (256px)
- Changelog: Energy Ring Legend
- Changelog: Grid Tooltip/Empty State
- Camera Grid Adapts to Count
- Density Constraint Retired (v1.4.9)
- Icon Sprite & Theme Tokens
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
- Vehicle Config (README)
- Irrigation Chart Mismatch
- Unavailable Entity Display

## God Nodes (most connected - your core abstractions)
1. `renderVals()` - 54 edges
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
- `ARM_CUSTOM_BYPASS ("Personalizzato") alarm button` --references--> `discoverAlarm()`  [INFERRED]
  CHANGELOG.md → public/discovery.js
- `energy.gridNote daily-vs-instantaneous mixing fix` --semantically_similar_to--> `Energy charts empty/wrong: daily-counter vs power-role mistakes`  [INFERRED] [semantically similar]
  CHANGELOG.md → TROUBLESHOOTING.md
- `Start here: Settings → Diagnostica` --semantically_similar_to--> `Diagnostics panel (settings gear → Diagnostica)`  [INFERRED] [semantically similar]
  TROUBLESHOOTING.md → CHANGELOG.md
- `loadScript() cache-bust propagation fix` --semantically_similar_to--> `Missing/stale ?v= on module_url causes stale panel.js`  [INFERRED] [semantically similar]
  CHANGELOG.md → TROUBLESHOOTING.md
- `README.it: installazione HACS` --semantically_similar_to--> `README: HACS installation instructions`  [INFERRED] [semantically similar]
  README.it.md → README.md

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

## Communities (48 total, 21 thin omitted)

### Community 0 - "Alarm, Rooms & Appliances Data"
Cohesion: 0.06
Nodes (70): ALARM(), ALARM_ID(), PIN-Gated Alarm Guard, ALL_CAMERAS_RESULT(), ALL_ROOMS_RESULT(), applianceItems(), applianceState(), at() (+62 more)

### Community 1 - "Support Micro-Framework Runtime"
Cohesion: 0.07
Nodes (51): boot(), cdnScriptFor(), collectProps(), compileAttr(), compileTemplate(), contentKey(), createComponentFactory(), createHelmetManager() (+43 more)

### Community 2 - "Camera Live-View Strategy"
Cohesion: 0.07
Nodes (50): loadScript() cache-bust propagation fix, camera/stream HLS websocket call, Cameras module initial release (auto-discovered), Fast camera_proxy still-image polling fallback, hls.js vendoring open question, Three-layer camera live-view strategy, _attachHlsJs(), _boot() (+42 more)

### Community 3 - "Changelog: Diagnostics & Config"
Cohesion: 0.05
Nodes (43): config/www/live_dashboard_config.js update-safe config location, Copy diagnostics clipboard button, Cover position slider long-press/drag/NaN fix, Diagnostics: Config block (config.js path resolution), Diagnostics: Energy daily totals block, Diagnostics: Energy instantaneous values block, Diagnostics: Environment block, Diagnostics panel (settings gear → Diagnostica) (+35 more)

### Community 4 - "Casa Panel Render Sections"
Cohesion: 0.06
Nodes (43): Active Items List (On Now), Alarm Panel, All Rooms Overflow Panel, Camera Home Multi Grid, Camera Home Single Tile, Camera Home Widget, Camera Detail Modal, Casa View (+35 more)

### Community 5 - "casa-panel Custom Element"
Cohesion: 0.13
Nodes (9): CasaPanel, fetchDailyCounterHistory(), fetchDailyLastSample(), fetchHistory(), fetchRawHistory(), fetchTodayStatsDelta(), FOLDER_NAME, isoDay() (+1 more)

### Community 6 - "Project Instructions (CLAUDE.md)"
Cohesion: 0.08
Nodes (27): --acc: prelievo (famiglia terracotta = rete), window.CASA_CONFIG come global (import() bloccato su file://), CHANGELOG.md (voce più recente), console.log non esiste per utenti su companion app/tablet: serve diagnostica visibile in dashboard, src/href/points dinamici via ref callback dopo il mount, Grammatica colori energia non negoziabile (anello e barre coerenti), --feed: immissione (salvia schiarita), graphify-out/GRAPH_REPORT.md (+19 more)

### Community 7 - "Alarm & Discovery Logic"
Cohesion: 0.15
Nodes (21): Alarm panel auto-discovery, Alarm PIN/code_format gating (no-op with note), ARM_CUSTOM_BYPASS ("Personalizzato") alarm button, buildExportedConfig(), collectConfiguredEntities(), discoverAlarm(), discoverAllOfDomain(), discoverCameras() (+13 more)

### Community 8 - "Mobile Formatting Helpers"
Cohesion: 0.14
Nodes (24): cover(), fn(), Component.applianceItems(), Component.applianceState(), Component.at(), Component._bindAttr(), Component.call(), Component.cover() (+16 more)

### Community 9 - "Changelog: Power & Units Fixes"
Cohesion: 0.11
Nodes (20): Appliances module (config.appliances), discoverRooms() excludes entities referenced elsewhere in config.js, energy.periodNote hardcoded-unit-in-template fix, Instantaneous power unit setting (Auto/W/kW), Irrigation buttons field (input_button alternative to valve), powerVal() instantaneous power unit normalization, Room tiles size to min-content instead of stretching, Seven new discovered domains + status/sensor pills (+12 more)

### Community 10 - "Casa Screenshot Annotations"
Cohesion: 0.25
Nodes (11): Casa Dashboard Screenshot, Allarme (Alarm) Card, Double-Ring Energy Gauge (7,6 kWh), Autoconsumo Tile (6,2 kWh), Dalla Rete Tile (1,4 kWh), Immessi in Rete Tile (3,6 kWh), Three-Tile Compact Energy Legend, Fotovoltaico Compact Card Layout (+3 more)

### Community 11 - "Prefs Persistence & Diagnostics Text"
Cohesion: 0.27
Nodes (8): diagRowLine(), diagText(), load(), padCol(), readLocal(), save(), writeLocal(), createExternalModules()

### Community 12 - "Long-Press Gesture Handlers"
Cohesion: 0.36
Nodes (8): _lpEntityId(), Component._lpEntityId(), Component._panelLpDown(), Component._panelLpMenu(), Component._panelLpUp(), _panelLpDown(), _panelLpMenu(), _panelLpUp()

### Community 13 - "Mobile Screenshot Annotations"
Cohesion: 0.40
Nodes (6): Cose Accese Adesso (Active Devices List), Bottom Navigation Bar (Casa/Stanze/Irrigazione/Energia/Auto/Meteo), Modalità Casa (Home Mode Selector), Mobile Dashboard View (Screenshot), Chi è in Casa (Presence Tracker), Weather Widget (19°, Sunny)

### Community 14 - "Demo Backend Data"
Cohesion: 0.53
Nodes (4): buildRegistries(), cloneStates(), connect(), rand()

### Community 15 - "mapEnergyPrefs Test Suite"
Cohesion: 0.33
Nodes (3): __dirname, sandbox, src

### Community 16 - "Demo Mode Fallback"
Cohesion: 0.40
Nodes (5): Demo mode with invented dataset, First public release (0.1.0), Selected-state !important inline-style override fix, README: demo mode documentation, Stuck on "Connecting…" and demo-mode fallback

### Community 18 - "Release Workflow (GitHub Actions)"
Cohesion: 0.67
Nodes (3): Attach to Release Step, Build live_dashboard.zip Step, HACS zip_release content_in_root Convention

### Community 19 - "README Header Banner"
Cohesion: 1.00
Nodes (3): Live Dashboard README Header Banner, Home Assistant, Live Dashboard

### Community 20 - "Energia Screenshot Annotations"
Cohesion: 1.00
Nodes (3): Energia Dashboard View, Live Power KPI Cards (Produzione/Consumo/Prelievo), Produzione e Prelievo Bar Chart

### Community 21 - "Irrigazione Screenshot Annotations"
Cohesion: 1.00
Nodes (3): Irrigazione (Irrigation) Dashboard View, Zona 1 Irrigation Card, Zona 2 Irrigation Card

## Ambiguous Edges - Review These
- `Four-tab settings panel (Stanze/Energia/Telecamere/Diagnostica)` → `Cover position slider long-press/drag/NaN fix`  [AMBIGUOUS]
  CHANGELOG.md · relation: conceptually_related_to
- `Selected-state !important inline-style override fix` → `First public release (0.1.0)`  [AMBIGUOUS]
  CHANGELOG.md · relation: conceptually_related_to

## Knowledge Gaps
- **75 isolated node(s):** `FOLDER_NAME`, `__dirname`, `src`, `sandbox`, `zip-and-attach Release Job` (+70 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **21 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Four-tab settings panel (Stanze/Energia/Telecamere/Diagnostica)` and `Cover position slider long-press/drag/NaN fix`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Selected-state !important inline-style override fix` and `First public release (0.1.0)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `renderVals()` connect `Alarm, Rooms & Appliances Data` to `Mobile Formatting Helpers`, `Camera Live-View Strategy`, `Long-Press Gesture Handlers`?**
  _High betweenness centrality (0.221) - this node is a cross-community bridge._
- **Why does `collectConfiguredEntities()` connect `Alarm & Discovery Logic` to `Support Micro-Framework Runtime`?**
  _High betweenness centrality (0.169) - this node is a cross-community bridge._
- **Why does `walk()` connect `Support Micro-Framework Runtime` to `Alarm & Discovery Logic`?**
  _High betweenness centrality (0.167) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `renderVals()` (e.g. with `PIN-Gated Alarm Guard` and `Component.renderVals()`) actually correct?**
  _`renderVals()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `FOLDER_NAME`, `__dirname`, `src` to the rest of the system?**
  _75 weakly-connected nodes found - possible documentation gaps or missing edges._
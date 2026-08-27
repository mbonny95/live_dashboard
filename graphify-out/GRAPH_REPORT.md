# Graph Report - .  (2026-08-27)

## Corpus Check
- 30 files · ~111,360 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 616 nodes · 960 edges · 61 communities (30 shown, 31 thin omitted)
- Extraction: 82% EXTRACTED · 18% INFERRED · 0% AMBIGUOUS · INFERRED: 171 edges (avg confidence: 0.88)
- Token cost: 79,791 input · 0 output

## Community Hubs (Navigation)
- Support Micro-Framework Runtime
- Casa Panel Render Sections
- Camera Live-View Strategy
- Alarm & Discovery Logic
- Casa Card Widgets
- Changelog: Power & Cover Fixes
- Changelog: Diagnostics & Config
- Config/Entity Visibility Helpers
- casa-panel Custom Element
- Project Instructions (CLAUDE.md)
- v1.6.0 Release Notes
- Changelog: Alarm & Camera Fixes
- TROUBLESHOOTING: Demo Scenarios
- Casa Screenshot Annotations
- Prefs Persistence & Diagnostics Text
- Demo Backend & Scenario Data
- Long-Press Gesture Handlers
- Mobile Screenshot Annotations
- mapEnergyPrefs Test Suite
- Changelog: Demo Mode & Release
- Release Workflow (GitHub Actions)
- README Header Banner
- Energia Screenshot Annotations
- Irrigazione Screenshot Annotations
- HA Backend Dispatcher
- HA Backend Panel Bridge
- App Icon (256px)
- Changelog: Energy Ring Legend
- Changelog: Areas Empty State (v1.4.x)
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
- Mobile Battery-Sign Sampling
- Mobile Battery-Sign Verdict
- Mobile Energy Empty-State Label
- Mobile Power Formatting
- Mobile Energy Settings Shortcut
- Mobile Battery-Sign Setting
- README: Vehicle Config
- TROUBLESHOOTING: Irrigation Chart Noise
- TROUBLESHOOTING: Irrigation Chart Noise (dup)
- TROUBLESHOOTING: Optional Sections
- TROUBLESHOOTING: Unavailable Entity Display
- TROUBLESHOOTING: Unreachable Entity Design Note

## God Nodes (most connected - your core abstractions)
1. `renderVals()` - 55 edges
2. `CasaPanel` - 20 edges
3. `PREFS()` - 18 edges
4. `Component.PREFS()` - 16 edges
5. `SAVE_PREFS()` - 13 edges
6. `Component.SAVE_PREFS()` - 13 edges
7. `v1.5.4 changelog entry` - 12 edges
8. `walk()` - 10 edges
9. `powerVal()` - 10 edges
10. `domainOf()` - 9 edges

## Surprising Connections (you probably didn't know these)
- `ARM_CUSTOM_BYPASS ("Personalizzato") alarm button` --references--> `discoverAlarm()`  [INFERRED]
  CHANGELOG.md → public/discovery.js
- `Three-layer camera live-view strategy` --semantically_similar_to--> `Live camera overlay black/broken image (fixed v1.5.4)`  [INFERRED] [semantically similar]
  CHANGELOG.md → TROUBLESHOOTING.md
- `energy.gridNote daily-vs-instantaneous mixing fix` --semantically_similar_to--> `Energy charts empty/wrong: daily-counter vs power-role mistakes`  [INFERRED] [semantically similar]
  CHANGELOG.md → TROUBLESHOOTING.md
- `Start here: Settings → Diagnostica` --semantically_similar_to--> `Diagnostics panel (settings gear → Diagnostica)`  [INFERRED] [semantically similar]
  TROUBLESHOOTING.md → CHANGELOG.md
- `loadScript() cache-bust propagation fix` --semantically_similar_to--> `Missing/stale ?v= on module_url causes stale panel.js`  [INFERRED] [semantically similar]
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
- **Derived house-consumption feature (v1.6.0)** — derived_house_consumption_formula_concept, public_dash_neumo_deriveconsumption, public_dash_neumo_battery_sign_convention_concept, readme_house_consumption_section, changelog_v1_6_0_house_consumption, troubleshooting_derived_consumption_section [EXTRACTED 0.95]
- **Battery sign self-diagnosis and one-tap invert flow** — public_dash_neumo__samplebatterysign, public_dash_neumo_batterysignverdict, public_dash_neumo_settings_set_battery_sign, public_dash_neumo_batterypowersign [EXTRACTED 0.90]
- **Self-explanatory empty states, three cases** — empty_state_case_a_no_areas_concept, empty_state_case_b_missing_entity_concept, changelog_v1_6_0_empty_states, public_dash_neumo_hasnoareas, public_dash_neumo_energyemptystate [EXTRACTED 0.90]

## Communities (61 total, 31 thin omitted)

### Community 0 - "Support Micro-Framework Runtime"
Cohesion: 0.07
Nodes (51): boot(), cdnScriptFor(), collectProps(), compileAttr(), compileTemplate(), contentKey(), createComponentFactory(), createHelmetManager() (+43 more)

### Community 1 - "Casa Panel Render Sections"
Cohesion: 0.08
Nodes (53): ALARM(), ALARM_ID(), PIN-Gated Alarm Guard, applianceItems(), applianceState(), at(), _bindAttr(), call() (+45 more)

### Community 2 - "Camera Live-View Strategy"
Cohesion: 0.07
Nodes (46): loadScript() cache-bust propagation fix, camera/stream HLS websocket call, Fast camera_proxy still-image polling fallback, hls.js vendoring open question, Three-layer camera live-view strategy, _attachHlsJs(), _boot(), bust() (+38 more)

### Community 3 - "Alarm & Discovery Logic"
Cohesion: 0.07
Nodes (39): Alarm panel auto-discovery, Alarm PIN/code_format gating (no-op with note), Appliances module (config.appliances), ARM_CUSTOM_BYPASS ("Personalizzato") alarm button, discoverRooms() excludes entities referenced elsewhere in config.js, Irrigation buttons field (input_button alternative to valve), Room tiles size to min-content instead of stretching, Seven new discovered domains + status/sensor pills (+31 more)

### Community 4 - "Casa Card Widgets"
Cohesion: 0.06
Nodes (43): Active Items List (On Now), Alarm Panel, All Rooms Overflow Panel, Camera Home Multi Grid, Camera Home Single Tile, Camera Home Widget, Camera Detail Modal, Casa View (+35 more)

### Community 5 - "Changelog: Power & Cover Fixes"
Cohesion: 0.06
Nodes (35): Cover position slider touch/long-press fix, energy.periodNote hardcoded-unit-in-template fix, Instantaneous power unit setting (Auto/W/kW), powerVal() shared unit-normalization helper, powerVal() instantaneous power unit normalization, Settings panel tabbed navigation (Stanze/Energia/Telecamere/Diagnostica), v1.5.2 changelog entry, v1.5.3 changelog entry (+27 more)

### Community 6 - "Changelog: Diagnostics & Config"
Cohesion: 0.06
Nodes (39): config/www/live_dashboard_config.js update-safe config location, Copy diagnostics clipboard button, Cover position slider long-press/drag/NaN fix, Diagnostics: Config block (config.js path resolution), Diagnostics: Energy daily totals block, Diagnostics: Energy instantaneous values block, Diagnostics: Environment block, Diagnostics panel (settings gear → Diagnostica) (+31 more)

### Community 7 - "Config/Entity Visibility Helpers"
Cohesion: 0.12
Nodes (36): CONFIG_HIDDEN(), ENTITY_HIDDEN_SET(), Component.CONFIG_HIDDEN(), Component.ENTITY_HIDDEN_SET(), Component.PREFS(), Component.ROOMS_RESULT(), Component.SAVE_PREFS(), Component.SETTINGS_CLEAR_CAMERA() (+28 more)

### Community 8 - "casa-panel Custom Element"
Cohesion: 0.13
Nodes (9): CasaPanel, fetchDailyCounterHistory(), fetchDailyLastSample(), fetchHistory(), fetchRawHistory(), fetchTodayStatsDelta(), FOLDER_NAME, isoDay() (+1 more)

### Community 9 - "Project Instructions (CLAUDE.md)"
Cohesion: 0.08
Nodes (27): --acc: prelievo (famiglia terracotta = rete), window.CASA_CONFIG come global (import() bloccato su file://), CHANGELOG.md (voce più recente), console.log non esiste per utenti su companion app/tablet: serve diagnostica visibile in dashboard, src/href/points dinamici via ref callback dopo il mount, Grammatica colori energia non negoziabile (anello e barre coerenti), --feed: immissione (salvia schiarita), graphify-out/GRAPH_REPORT.md (+19 more)

### Community 10 - "v1.6.0 Release Notes"
Cohesion: 0.11
Nodes (24): energy.gridNote daily/instantaneous mixing fix, v1.6.0 changelog entry, Seven forceable demo scenarios (changelog entry), Self-explanatory empty states, three cases (changelog entry), Single-ring self-consumption mixing fix (changelog entry), Empty state case (a): no rooms discovered at all, Empty state case (b): configured energy entity doesn't exist, ha-backend-demo.js (+16 more)

### Community 11 - "Changelog: Alarm & Camera Fixes"
Cohesion: 0.11
Nodes (21): Alarm PIN awareness (code_format gating), ARM_CUSTOM_BYPASS alarm button, Live camera black-screen fix (three-layer strategy), Cameras module initial release (auto-discovered), Three new Diagnostica rows (camera/energy/alarm), Open question: vendor hls.js, Smart plug three-level state (off/active/running), v1.5.4 changelog entry (+13 more)

### Community 12 - "TROUBLESHOOTING: Demo Scenarios"
Cohesion: 0.11
Nodes (21): Seven forceable demo scenarios, scenario=missing, scenario=partial, Single-ring self-consumption line mixing fix, Unreleased (CHANGELOG), &bare URL flag, window.CasaBackendDemo (ha-backend-demo.js global), &bare URL flag [mobile] (+13 more)

### Community 13 - "Casa Screenshot Annotations"
Cohesion: 0.25
Nodes (11): Casa Dashboard Screenshot, Allarme (Alarm) Card, Double-Ring Energy Gauge (7,6 kWh), Autoconsumo Tile (6,2 kWh), Dalla Rete Tile (1,4 kWh), Immessi in Rete Tile (3,6 kWh), Three-Tile Compact Energy Legend, Fotovoltaico Compact Card Layout (+3 more)

### Community 14 - "Prefs Persistence & Diagnostics Text"
Cohesion: 0.27
Nodes (8): diagRowLine(), diagText(), load(), padCol(), readLocal(), save(), writeLocal(), createExternalModules()

### Community 15 - "Demo Backend & Scenario Data"
Cohesion: 0.29
Nodes (6): buildRegistries(), cloneStates(), connect(), patchConfig(), rand(), scenarioConfig()

### Community 16 - "Long-Press Gesture Handlers"
Cohesion: 0.36
Nodes (8): _lpEntityId(), Component._lpEntityId(), Component._panelLpDown(), Component._panelLpMenu(), Component._panelLpUp(), _panelLpDown(), _panelLpMenu(), _panelLpUp()

### Community 17 - "Mobile Screenshot Annotations"
Cohesion: 0.40
Nodes (6): Cose Accese Adesso (Active Devices List), Bottom Navigation Bar (Casa/Stanze/Irrigazione/Energia/Auto/Meteo), Modalità Casa (Home Mode Selector), Mobile Dashboard View (Screenshot), Chi è in Casa (Presence Tracker), Weather Widget (19°, Sunny)

### Community 18 - "mapEnergyPrefs Test Suite"
Cohesion: 0.33
Nodes (3): __dirname, sandbox, src

### Community 19 - "Changelog: Demo Mode & Release"
Cohesion: 0.40
Nodes (5): Demo mode with invented dataset, First public release (0.1.0), Selected-state !important inline-style override fix, README: demo mode documentation, Stuck on "Connecting…" and demo-mode fallback

### Community 21 - "Release Workflow (GitHub Actions)"
Cohesion: 0.67
Nodes (3): Attach to Release Step, Build live_dashboard.zip Step, HACS zip_release content_in_root Convention

### Community 22 - "README Header Banner"
Cohesion: 1.00
Nodes (3): Live Dashboard README Header Banner, Home Assistant, Live Dashboard

### Community 23 - "Energia Screenshot Annotations"
Cohesion: 1.00
Nodes (3): Energia Dashboard View, Live Power KPI Cards (Produzione/Consumo/Prelievo), Produzione e Prelievo Bar Chart

### Community 24 - "Irrigazione Screenshot Annotations"
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
- **111 isolated node(s):** `FOLDER_NAME`, `__dirname`, `src`, `sandbox`, `zip-and-attach Release Job` (+106 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **31 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Four-tab settings panel (Stanze/Energia/Telecamere/Diagnostica)` and `Cover position slider long-press/drag/NaN fix`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Selected-state !important inline-style override fix` and `First public release (0.1.0)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Camera tile shows only icon, never preview` and `Sorveglianza/Surveillance tab requires 2+ cameras`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `renderVals()` connect `Casa Panel Render Sections` to `Long-Press Gesture Handlers`, `v1.6.0 Release Notes`, `Camera Live-View Strategy`, `Config/Entity Visibility Helpers`?**
  _High betweenness centrality (0.237) - this node is a cross-community bridge._
- **Why does `collectConfiguredEntities()` connect `Alarm & Discovery Logic` to `Support Micro-Framework Runtime`?**
  _High betweenness centrality (0.152) - this node is a cross-community bridge._
- **Why does `walk()` connect `Support Micro-Framework Runtime` to `Alarm & Discovery Logic`?**
  _High betweenness centrality (0.151) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `renderVals()` (e.g. with `PIN-Gated Alarm Guard` and `renderVals() [mobile]`) actually correct?**
  _`renderVals()` has 3 INFERRED edges - model-reasoned connections that need verification._
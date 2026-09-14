# Graph Report - .  (2026-09-14)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 750 nodes · 1110 edges · 90 communities (59 shown, 31 thin omitted)
- Extraction: 83% EXTRACTED · 16% INFERRED · 0% AMBIGUOUS · INFERRED: 183 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `33ddefd5`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- support.js
- renderVals
- _boot
- discovery.js
- Casa View
- Empty state case (b): configured energy entity doesn't exist
- Diagnostics panel (settings gear → Diagnostica)
- PREFS
- CasaPanel
- Vincoli del templating (trovati sul campo)
- [1.1.2] - 2026-08-14
- v1.5.4 changelog entry
- ?demo&scenario= troubleshooting table
- Three-Tile Compact Energy Legend
- prefs.js
- ha-backend-demo.js
- [1.4.0] - 2026-08-14
- Mobile Dashboard View (Screenshot)
- mapEnergyPrefs.test.mjs
- Demo mode with invented dataset
- Build live_dashboard.zip Step
- Live Dashboard README Header Banner
- Energia Dashboard View
- Irrigazione (Irrigation) Dashboard View
- ha-backend.js
- ha-backend-panel.js
- App Icon (256px)
- Compact Fotovoltaico card legend/color fix
- Empty-state guidance for zero HA areas
- Casa Sorveglianza card adapts to camera count
- Vincolo 1280x800 senza scroll ritirato (v1.4.9)
- SVG Icon Symbol Library
- Rooms empty / area assignment requirement
- zip-and-attach Release Job
- App Icon (512px)
- Transparent App Icon (256px)
- Card shadow clipping at page edges fix
- Energy tab zero-config fallback (double-ring + chart message)
- Flat grid source schema (stat_energy_from) fix
- Mobile duplicate appliance render loop fix
- Removed unreliable "N min remaining" appliance text
- Ring stroke-linecap stray-dot fix for near-zero segments
- Template-placeholder 404/console-error fix (src/href/points)
- _sampleBatterySign() (mobile)
- batterySignVerdict() (mobile)
- energyMissingLabel computed var (mobile)
- formatWatts() (mobile)
- openEnergySettings computed var (mobile)
- SETTINGS_SET_BATTERY_SIGN() (mobile)
- README: vehicle optional config
- Irrigation zone chart / zone.moisture noise
- Irrigation zone chart reflects raw noisy sensor history
- Optional sections (Energy/Irrigation/Vehicle/Cameras/Modes/People)
- Entities show unavailable in grey
- Entities show "unreachable"/grey by design
- [1.5.4] - 2026-08-21
- [1.0.0] - 2026-08-13
- [1.1.0] - 2026-08-14
- [1.2.0] - 2026-08-14
- [1.4.1] - 2026-08-14
- [1.4.4] - 2026-08-15
- [1.4.5] - 2026-08-15
- [1.4.8] - 2026-08-16
- [1.5.3] - 2026-08-20
- [1.6.0] - 2026-08-27
- [0.2.0] - 2026-08-12
- [1.4.6] - 2026-08-15
- [1.0.1] - 2026-08-14
- [1.1.1] - 2026-08-14
- Changelog
- [1.3.0] - 2026-08-14
- [1.3.1] - 2026-08-14
- Three-tier smart-plug state (off/active/running)
- [1.4.9] - 2026-08-16
- [1.5.1] - 2026-08-16
- [0.2.1] - 2026-08-13
- [1.4.2] - 2026-08-14
- [1.4.3] - 2026-08-14
- mergeSectionOrder
- CHANGELOG.md
- [1.4.7] - 2026-08-15
- _panelLpMenu
- [1.5.0] - 2026-08-16
- [1.5.2] - 2026-08-20

## God Nodes (most connected - your core abstractions)
1. `renderVals()` - 55 edges
2. `Changelog` - 31 edges
3. `CasaPanel` - 20 edges
4. `PREFS()` - 18 edges
5. `Component.PREFS()` - 16 edges
6. `SAVE_PREFS()` - 13 edges
7. `Component.SAVE_PREFS()` - 13 edges
8. `v1.5.4 changelog entry` - 12 edges
9. `discoverRooms()` - 11 edges
10. `walk()` - 10 edges

## Surprising Connections (you probably didn't know these)
- `discoverAlarm()` --references--> `ARM_CUSTOM_BYPASS ("Personalizzato") alarm button`  [INFERRED]
  public/discovery.js → CHANGELOG.md
- `Three-layer camera live-view strategy` --semantically_similar_to--> `Live camera overlay black/broken image (fixed v1.5.4)`  [INFERRED] [semantically similar]
  CHANGELOG.md → TROUBLESHOOTING.md
- `energy.gridNote daily-vs-instantaneous mixing fix` --semantically_similar_to--> `Energy charts empty/wrong: daily-counter vs power-role mistakes`  [INFERRED] [semantically similar]
  CHANGELOG.md → TROUBLESHOOTING.md
- `Diagnostics panel (settings gear → Diagnostica)` --semantically_similar_to--> `Start here: Settings → Diagnostica`  [INFERRED] [semantically similar]
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
- **Demo scenario switching flow (bar UI, URL state, backend SEED patch, docs)** — changelog_demo_scenarios_feature, public_dash_neumo_scenario_bar, public_dash_neumo_switchscenario, public_dash_neumo_mobile_scenario_bar, public_dash_neumo_mobile_switchscenario, troubleshooting_demo_scenario_table, public_dash_neumo_casabackenddemo [INFERRED 0.85]
- **Recurring bug class: mixing instantaneous power/ratio values into daily-total energy displays** — changelog_gridnote_fix, changelog_single_ring_selfconsumption_fix, changelog_powerval_helper, changelog_instant_power_unit_setting, troubleshooting_energy_charts_empty [INFERRED 0.85]
- **v1.5.4 auto-discovery/diagnostic feature set (alarm + cameras)** — changelog_alarm_autodiscovery, changelog_alarm_pin_awareness, changelog_arm_custom_bypass, changelog_diagnostica_rows_v154, changelog_black_camera_fix [EXTRACTED 1.00]
- **Derived house-consumption feature (v1.6.0)** — derived_house_consumption_formula_concept, public_dash_neumo_deriveconsumption, public_dash_neumo_battery_sign_convention_concept, readme_house_consumption_section, changelog_v1_6_0_house_consumption, troubleshooting_derived_consumption_section [EXTRACTED 0.95]
- **Battery sign self-diagnosis and one-tap invert flow** — public_dash_neumo__samplebatterysign, public_dash_neumo_batterysignverdict, public_dash_neumo_settings_set_battery_sign, public_dash_neumo_batterypowersign [EXTRACTED 0.90]
- **Self-explanatory empty states, three cases** — empty_state_case_a_no_areas_concept, empty_state_case_b_missing_entity_concept, changelog_v1_6_0_empty_states, public_dash_neumo_hasnoareas, public_dash_neumo_energyemptystate [EXTRACTED 0.90]

## Communities (90 total, 31 thin omitted)

### Community 0 - "support.js"
Cohesion: 0.07
Nodes (51): boot(), cdnScriptFor(), collectProps(), compileAttr(), compileTemplate(), contentKey(), createComponentFactory(), createHelmetManager() (+43 more)

### Community 1 - "renderVals"
Cohesion: 0.08
Nodes (53): ALARM(), ALARM_ID(), PIN-Gated Alarm Guard, applianceItems(), applianceState(), at(), _bindAttr(), call() (+45 more)

### Community 2 - "_boot"
Cohesion: 0.07
Nodes (48): camera/stream HLS websocket call, Diagnostics: Energy daily totals block, Fast camera_proxy still-image polling fallback, hls.js vendoring open question, Three-layer camera live-view strategy, _attachHlsJs(), _boot(), bust() (+40 more)

### Community 3 - "discovery.js"
Cohesion: 0.12
Nodes (28): Alarm panel auto-discovery, Alarm PIN/code_format gating (no-op with note), ARM_CUSTOM_BYPASS ("Personalizzato") alarm button, diagDuplicateDevices, diagReasonGroups, diagDuplicateDevices, diagReasonGroups, buildExportedConfig() (+20 more)

### Community 4 - "Casa View"
Cohesion: 0.06
Nodes (43): Active Items List (On Now), Alarm Panel, All Rooms Overflow Panel, Camera Home Multi Grid, Camera Home Single Tile, Camera Home Widget, Camera Detail Modal, Casa View (+35 more)

### Community 5 - "Empty state case (b): configured energy entity doesn't exist"
Cohesion: 0.11
Nodes (24): energy.gridNote daily/instantaneous mixing fix, v1.6.0 changelog entry, Seven forceable demo scenarios (changelog entry), Self-explanatory empty states, three cases (changelog entry), Single-ring self-consumption mixing fix (changelog entry), Empty state case (a): no rooms discovered at all, Empty state case (b): configured energy entity doesn't exist, ha-backend-demo.js (+16 more)

### Community 6 - "Diagnostics panel (settings gear → Diagnostica)"
Cohesion: 0.07
Nodes (37): loadScript() cache-bust propagation fix, config/www/live_dashboard_config.js update-safe config location, Copy diagnostics clipboard button, Cover position slider long-press/drag/NaN fix, Diagnostics: Config block (config.js path resolution), Diagnostics: Energy instantaneous values block, Diagnostics: Environment block, Diagnostics panel (settings gear → Diagnostica) (+29 more)

### Community 7 - "PREFS"
Cohesion: 0.12
Nodes (36): CONFIG_HIDDEN(), ENTITY_HIDDEN_SET(), Component.CONFIG_HIDDEN(), Component.ENTITY_HIDDEN_SET(), Component.PREFS(), Component.ROOMS_RESULT(), Component.SAVE_PREFS(), Component.SETTINGS_CLEAR_CAMERA() (+28 more)

### Community 8 - "CasaPanel"
Cohesion: 0.13
Nodes (9): CasaPanel, fetchDailyCounterHistory(), fetchDailyLastSample(), fetchHistory(), fetchRawHistory(), fetchTodayStatsDelta(), FOLDER_NAME, isoDay() (+1 more)

### Community 9 - "Vincoli del templating (trovati sul campo)"
Cohesion: 0.08
Nodes (27): --acc: prelievo (famiglia terracotta = rete), window.CASA_CONFIG come global (import() bloccato su file://), CHANGELOG.md (voce più recente), console.log non esiste per utenti su companion app/tablet: serve diagnostica visibile in dashboard, src/href/points dinamici via ref callback dopo il mount, Grammatica colori energia non negoziabile (anello e barre coerenti), --feed: immissione (salvia schiarita), graphify-out/GRAPH_REPORT.md (+19 more)

### Community 10 - "[1.1.2] - 2026-08-14"
Cohesion: 0.67
Nodes (3): [1.1.2] - 2026-08-14, Fixed, Fixed

### Community 11 - "v1.5.4 changelog entry"
Cohesion: 0.10
Nodes (23): Alarm PIN awareness (code_format gating), ARM_CUSTOM_BYPASS alarm button, Live camera black-screen fix (three-layer strategy), Cameras module initial release (auto-discovered), Three new Diagnostica rows (camera/energy/alarm), Open question: vendor hls.js, Smart plug three-level state (off/active/running), v1.5.4 changelog entry (+15 more)

### Community 12 - "?demo&scenario= troubleshooting table"
Cohesion: 0.11
Nodes (21): Seven forceable demo scenarios, scenario=missing, scenario=partial, Single-ring self-consumption line mixing fix, Unreleased (CHANGELOG), &bare URL flag, window.CasaBackendDemo (ha-backend-demo.js global), &bare URL flag [mobile] (+13 more)

### Community 13 - "Three-Tile Compact Energy Legend"
Cohesion: 0.25
Nodes (11): Casa Dashboard Screenshot, Allarme (Alarm) Card, Double-Ring Energy Gauge (7,6 kWh), Autoconsumo Tile (6,2 kWh), Dalla Rete Tile (1,4 kWh), Immessi in Rete Tile (3,6 kWh), Three-Tile Compact Energy Legend, Fotovoltaico Compact Card Layout (+3 more)

### Community 14 - "prefs.js"
Cohesion: 0.27
Nodes (8): diagRowLine(), diagText(), load(), padCol(), readLocal(), save(), writeLocal(), createExternalModules()

### Community 15 - "ha-backend-demo.js"
Cohesion: 0.29
Nodes (6): buildRegistries(), cloneStates(), connect(), patchConfig(), rand(), scenarioConfig()

### Community 16 - "[1.4.0] - 2026-08-14"
Cohesion: 0.29
Nodes (7): [1.4.0] - 2026-08-14, Added, Added, Changed, Changed, Fixed, Fixed

### Community 17 - "Mobile Dashboard View (Screenshot)"
Cohesion: 0.40
Nodes (6): Cose Accese Adesso (Active Devices List), Bottom Navigation Bar (Casa/Stanze/Irrigazione/Energia/Auto/Meteo), Modalità Casa (Home Mode Selector), Mobile Dashboard View (Screenshot), Chi è in Casa (Presence Tracker), Weather Widget (19°, Sunny)

### Community 18 - "mapEnergyPrefs.test.mjs"
Cohesion: 0.33
Nodes (3): __dirname, sandbox, src

### Community 19 - "Demo mode with invented dataset"
Cohesion: 0.40
Nodes (5): Demo mode with invented dataset, First public release (0.1.0), Selected-state !important inline-style override fix, README: demo mode documentation, Stuck on "Connecting…" and demo-mode fallback

### Community 21 - "Build live_dashboard.zip Step"
Cohesion: 0.67
Nodes (3): Attach to Release Step, Build live_dashboard.zip Step, HACS zip_release content_in_root Convention

### Community 22 - "Live Dashboard README Header Banner"
Cohesion: 1.00
Nodes (3): Live Dashboard README Header Banner, Home Assistant, Live Dashboard

### Community 23 - "Energia Dashboard View"
Cohesion: 1.00
Nodes (3): Energia Dashboard View, Live Power KPI Cards (Produzione/Consumo/Prelievo), Produzione e Prelievo Bar Chart

### Community 24 - "Irrigazione (Irrigation) Dashboard View"
Cohesion: 1.00
Nodes (3): Irrigazione (Irrigation) Dashboard View, Zona 1 Irrigation Card, Zona 2 Irrigation Card

### Community 61 - "[1.5.4] - 2026-08-21"
Cohesion: 0.33
Nodes (6): [1.5.4] - 2026-08-21, Added, Added, Fixed, Fixed, Open question

### Community 62 - "[1.0.0] - 2026-08-13"
Cohesion: 0.40
Nodes (5): [1.0.0] - 2026-08-13, Added, Added, Fixed, Fixed

### Community 63 - "[1.1.0] - 2026-08-14"
Cohesion: 0.40
Nodes (5): [1.1.0] - 2026-08-14, Added, Added, Fixed, Fixed

### Community 64 - "[1.2.0] - 2026-08-14"
Cohesion: 0.40
Nodes (5): [1.2.0] - 2026-08-14, Added, Added, Changed, Changed

### Community 65 - "[1.4.1] - 2026-08-14"
Cohesion: 0.40
Nodes (5): [1.4.1] - 2026-08-14, Added, Added, Fixed, Fixed

### Community 66 - "[1.4.4] - 2026-08-15"
Cohesion: 0.50
Nodes (4): [1.4.4] - 2026-08-15, Changed, Fixed, Fixed

### Community 67 - "[1.4.5] - 2026-08-15"
Cohesion: 0.40
Nodes (5): [1.4.5] - 2026-08-15, Added, Added, Fixed, Fixed

### Community 68 - "[1.4.8] - 2026-08-16"
Cohesion: 0.40
Nodes (5): [1.4.8] - 2026-08-16, Added, Added, Fixed, Fixed

### Community 69 - "[1.5.3] - 2026-08-20"
Cohesion: 0.40
Nodes (5): [1.5.3] - 2026-08-20, Added, Added, Fixed, Fixed

### Community 70 - "[1.6.0] - 2026-08-27"
Cohesion: 0.50
Nodes (4): [1.6.0] - 2026-08-27, Added, Added, Fixed

### Community 71 - "[0.2.0] - 2026-08-12"
Cohesion: 0.67
Nodes (3): [0.2.0] - 2026-08-12, Added, Added

### Community 72 - "[1.4.6] - 2026-08-15"
Cohesion: 0.67
Nodes (3): [1.4.6] - 2026-08-15, Fixed, Fixed

### Community 73 - "[1.0.1] - 2026-08-14"
Cohesion: 0.67
Nodes (3): [1.0.1] - 2026-08-14, Fixed, Fixed

### Community 74 - "[1.1.1] - 2026-08-14"
Cohesion: 0.67
Nodes (3): [1.1.1] - 2026-08-14, Fixed, Fixed

### Community 75 - "Changelog"
Cohesion: 0.18
Nodes (12): [0.1.0] - 2026-08-12, [0.3.0] - 2026-08-13, [1.7.0] - 2026-08-27, [1.7.1] - 2026-09-14, Added, Added, Added, Added (+4 more)

### Community 76 - "[1.3.0] - 2026-08-14"
Cohesion: 0.67
Nodes (3): [1.3.0] - 2026-08-14, Added, Added

### Community 77 - "[1.3.1] - 2026-08-14"
Cohesion: 0.67
Nodes (3): [1.3.1] - 2026-08-14, Fixed, Fixed

### Community 78 - "Three-tier smart-plug state (off/active/running)"
Cohesion: 0.13
Nodes (16): Appliances module (config.appliances), discoverRooms() excludes entities referenced elsewhere in config.js, Irrigation buttons field (input_button alternative to valve), Room tiles size to min-content instead of stretching, Seven new discovered domains + status/sensor pills, Configurable smart-plug active/running power threshold, Switch inline wattage from co-device power sensor, Three-tier smart-plug state (off/active/running) (+8 more)

### Community 79 - "[1.4.9] - 2026-08-16"
Cohesion: 0.67
Nodes (3): [1.4.9] - 2026-08-16, Fixed, Fixed

### Community 80 - "[1.5.1] - 2026-08-16"
Cohesion: 0.67
Nodes (3): [1.5.1] - 2026-08-16, Added, Added

### Community 81 - "[0.2.1] - 2026-08-13"
Cohesion: 0.67
Nodes (3): [0.2.1] - 2026-08-13, Fixed, Fixed

### Community 82 - "[1.4.2] - 2026-08-14"
Cohesion: 0.67
Nodes (3): [1.4.2] - 2026-08-14, Fixed, Fixed

### Community 83 - "[1.4.3] - 2026-08-14"
Cohesion: 0.67
Nodes (3): [1.4.3] - 2026-08-14, Fixed, Fixed

### Community 84 - "mergeSectionOrder"
Cohesion: 0.25
Nodes (14): casaSections, casaSections, SECTION_ORDER(), SECTION_ORDER_DEFAULT_RESOLVED(), SETTINGS_MOVE_SECTION(), SETTINGS_RESET_SECTIONS(), settingsSectionOrder, SECTION_ORDER() (+6 more)

### Community 85 - "CHANGELOG.md"
Cohesion: 0.06
Nodes (35): Cover position slider touch/long-press fix, energy.periodNote hardcoded-unit-in-template fix, Instantaneous power unit setting (Auto/W/kW), powerVal() shared unit-normalization helper, powerVal() instantaneous power unit normalization, Settings panel tabbed navigation (Stanze/Energia/Telecamere/Diagnostica), v1.5.2 changelog entry, v1.5.3 changelog entry (+27 more)

### Community 89 - "[1.4.7] - 2026-08-15"
Cohesion: 0.67
Nodes (3): [1.4.7] - 2026-08-15, Fixed, Fixed

### Community 90 - "_panelLpMenu"
Cohesion: 0.36
Nodes (8): _lpEntityId(), Component._lpEntityId(), Component._panelLpDown(), Component._panelLpMenu(), Component._panelLpUp(), _panelLpDown(), _panelLpMenu(), _panelLpUp()

### Community 91 - "[1.5.0] - 2026-08-16"
Cohesion: 0.67
Nodes (3): [1.5.0] - 2026-08-16, Added, Added

### Community 94 - "[1.5.2] - 2026-08-20"
Cohesion: 0.67
Nodes (3): [1.5.2] - 2026-08-20, Fixed, Fixed

## Ambiguous Edges - Review These
- `Four-tab settings panel (Stanze/Energia/Telecamere/Diagnostica)` → `Cover position slider long-press/drag/NaN fix`  [AMBIGUOUS]
  CHANGELOG.md · relation: conceptually_related_to
- `Selected-state !important inline-style override fix` → `First public release (0.1.0)`  [AMBIGUOUS]
  CHANGELOG.md · relation: conceptually_related_to
- `Camera tile shows only icon, never preview` → `Sorveglianza/Surveillance tab requires 2+ cameras`  [AMBIGUOUS]
  TROUBLESHOOTING.md · relation: conceptually_related_to

## Knowledge Gaps
- **192 isolated node(s):** `FOLDER_NAME`, `__dirname`, `src`, `sandbox`, `zip-and-attach Release Job` (+187 more)
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
- **Why does `Changelog` connect `Changelog` to `[1.1.2] - 2026-08-14`, `[1.4.0] - 2026-08-14`, `[1.5.4] - 2026-08-21`, `[1.0.0] - 2026-08-13`, `[1.1.0] - 2026-08-14`, `[1.2.0] - 2026-08-14`, `[1.4.1] - 2026-08-14`, `[1.4.4] - 2026-08-15`, `[1.4.5] - 2026-08-15`, `[1.4.8] - 2026-08-16`, `[1.5.3] - 2026-08-20`, `[1.6.0] - 2026-08-27`, `[0.2.0] - 2026-08-12`, `[1.4.6] - 2026-08-15`, `[1.0.1] - 2026-08-14`, `[1.1.1] - 2026-08-14`, `[1.3.0] - 2026-08-14`, `[1.3.1] - 2026-08-14`, `[1.4.9] - 2026-08-16`, `[1.5.1] - 2026-08-16`, `[0.2.1] - 2026-08-13`, `[1.4.2] - 2026-08-14`, `[1.4.3] - 2026-08-14`, `CHANGELOG.md`, `[1.4.7] - 2026-08-15`, `[1.5.0] - 2026-08-16`, `[1.5.2] - 2026-08-20`?**
  _High betweenness centrality (0.213) - this node is a cross-community bridge._
- **Why does `v1.5.4 changelog entry` connect `v1.5.4 changelog entry` to `Empty state case (b): configured energy entity doesn't exist`, `discovery.js`, `CHANGELOG.md`?**
  _High betweenness centrality (0.213) - this node is a cross-community bridge._
- **Why does `renderVals()` connect `renderVals` to `_boot`, `_panelLpMenu`, `Empty state case (b): configured energy entity doesn't exist`, `PREFS`?**
  _High betweenness centrality (0.208) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `renderVals()` (e.g. with `energy.gridNote daily/instantaneous mixing fix` and `PIN-Gated Alarm Guard`) actually correct?**
  _`renderVals()` has 3 INFERRED edges - model-reasoned connections that need verification._
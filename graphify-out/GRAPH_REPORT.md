# Graph Report - .  (2026-08-27)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 702 nodes · 1057 edges · 96 communities (54 shown, 42 thin omitted)
- Extraction: 83% EXTRACTED · 17% INFERRED · 0% AMBIGUOUS · INFERRED: 180 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d552f6f4`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- support.js
- Component.roomDetail
- _boot
- discovery.js
- Casa View
- Empty state case (b): configured energy entity doesn't exist
- Diagnostics panel (settings gear → Diagnostica)
- PREFS
- CasaPanel
- Vincoli del templating (trovati sul campo)
- Changelog
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
- [0.3.0] - 2026-08-13
- [1.0.1] - 2026-08-14
- [1.1.1] - 2026-08-14
- [1.1.2] - 2026-08-14
- [1.3.0] - 2026-08-14
- [1.3.1] - 2026-08-14
- [1.4.6] - 2026-08-15
- [1.4.9] - 2026-08-16
- [1.5.1] - 2026-08-16
- [1.7.0] - 2026-08-27
- powerVal
- renderVals
- mergeSectionOrder
- House consumption, derived automatically (README section)
- Empty state case (a): no rooms discovered at all
- CHANGELOG.md
- Instantaneous power unit setting (Auto/W/kW)
- Component.diagEnergyInstant
- _panelLpMenu
- CONFIG_HIDDEN
- README: known limits
- powerVal() unit normalization fix (v1.5.3)
- SETTINGS_SET_ENTITY
- deriveConsumption() (mobile)

## God Nodes (most connected - your core abstractions)
1. `renderVals()` - 55 edges
2. `Changelog` - 30 edges
3. `CasaPanel` - 20 edges
4. `PREFS()` - 18 edges
5. `Component.PREFS()` - 16 edges
6. `SAVE_PREFS()` - 13 edges
7. `Component.SAVE_PREFS()` - 13 edges
8. `v1.5.4 changelog entry` - 12 edges
9. `walk()` - 10 edges
10. `powerVal()` - 10 edges

## Surprising Connections (you probably didn't know these)
- `discoverAlarm()` --references--> `ARM_CUSTOM_BYPASS ("Personalizzato") alarm button`  [INFERRED]
  public/discovery.js → CHANGELOG.md
- `Three-layer camera live-view strategy` --semantically_similar_to--> `Live camera overlay black/broken image (fixed v1.5.4)`  [INFERRED] [semantically similar]
  CHANGELOG.md → TROUBLESHOOTING.md
- `energy.gridNote daily-vs-instantaneous mixing fix` --semantically_similar_to--> `Energy charts empty/wrong: daily-counter vs power-role mistakes`  [INFERRED] [semantically similar]
  CHANGELOG.md → TROUBLESHOOTING.md
- `Diagnostics panel (settings gear → Diagnostica)` --semantically_similar_to--> `Start here: Settings → Diagnostica`  [INFERRED] [semantically similar]
  CHANGELOG.md → TROUBLESHOOTING.md
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

## Communities (96 total, 42 thin omitted)

### Community 0 - "support.js"
Cohesion: 0.07
Nodes (51): boot(), cdnScriptFor(), collectProps(), compileAttr(), compileTemplate(), contentKey(), createComponentFactory(), createHelmetManager() (+43 more)

### Community 1 - "Component.roomDetail"
Cohesion: 0.18
Nodes (20): applianceItems(), applianceState(), _bindAttr(), call(), cover(), isOn(), Component.applianceItems(), Component.applianceState() (+12 more)

### Community 2 - "_boot"
Cohesion: 0.07
Nodes (49): loadScript() cache-bust propagation fix, camera/stream HLS websocket call, Diagnostics: Energy daily totals block, Fast camera_proxy still-image polling fallback, hls.js vendoring open question, Three-layer camera live-view strategy, _attachHlsJs(), _boot() (+41 more)

### Community 3 - "discovery.js"
Cohesion: 0.08
Nodes (37): Alarm panel auto-discovery, Alarm PIN/code_format gating (no-op with note), Appliances module (config.appliances), ARM_CUSTOM_BYPASS ("Personalizzato") alarm button, discoverRooms() excludes entities referenced elsewhere in config.js, Irrigation buttons field (input_button alternative to valve), Room tiles size to min-content instead of stretching, Seven new discovered domains + status/sensor pills (+29 more)

### Community 4 - "Casa View"
Cohesion: 0.06
Nodes (43): Active Items List (On Now), Alarm Panel, All Rooms Overflow Panel, Camera Home Multi Grid, Camera Home Single Tile, Camera Home Widget, Camera Detail Modal, Casa View (+35 more)

### Community 5 - "Empty state case (b): configured energy entity doesn't exist"
Cohesion: 0.18
Nodes (13): energy.gridNote daily/instantaneous mixing fix, v1.6.0 changelog entry, Seven forceable demo scenarios (changelog entry), Self-explanatory empty states, three cases (changelog entry), Single-ring self-consumption mixing fix (changelog entry), Empty state case (b): configured energy entity doesn't exist, ha-backend-demo.js, energyEmptyState computed var (+5 more)

### Community 6 - "Diagnostics panel (settings gear → Diagnostica)"
Cohesion: 0.07
Nodes (36): config/www/live_dashboard_config.js update-safe config location, Copy diagnostics clipboard button, Cover position slider long-press/drag/NaN fix, Diagnostics: Config block (config.js path resolution), Diagnostics: Energy instantaneous values block, Diagnostics: Environment block, Diagnostics panel (settings gear → Diagnostica), Double-ring energy model (consumption/production identities) (+28 more)

### Community 7 - "PREFS"
Cohesion: 0.17
Nodes (26): Component.PREFS(), Component.SAVE_PREFS(), Component.SETTINGS_CLEAR_CAMERA(), Component.SETTINGS_CLEAR_ENTITY(), Component.SETTINGS_CLEAR_ROOM(), Component.SETTINGS_MOVE_ROOM(), Component.SETTINGS_RESET(), Component.SETTINGS_SET_CAMERA() (+18 more)

### Community 8 - "CasaPanel"
Cohesion: 0.13
Nodes (9): CasaPanel, fetchDailyCounterHistory(), fetchDailyLastSample(), fetchHistory(), fetchRawHistory(), fetchTodayStatsDelta(), FOLDER_NAME, isoDay() (+1 more)

### Community 9 - "Vincoli del templating (trovati sul campo)"
Cohesion: 0.08
Nodes (27): --acc: prelievo (famiglia terracotta = rete), window.CASA_CONFIG come global (import() bloccato su file://), CHANGELOG.md (voce più recente), console.log non esiste per utenti su companion app/tablet: serve diagnostica visibile in dashboard, src/href/points dinamici via ref callback dopo il mount, Grammatica colori energia non negoziabile (anello e barre coerenti), --feed: immissione (salvia schiarita), graphify-out/GRAPH_REPORT.md (+19 more)

### Community 10 - "Changelog"
Cohesion: 0.13
Nodes (15): [0.1.0] - 2026-08-12, [0.2.1] - 2026-08-13, [1.4.2] - 2026-08-14, [1.4.3] - 2026-08-14, [1.4.7] - 2026-08-15, [1.5.0] - 2026-08-16, [1.5.2] - 2026-08-20, Added (+7 more)

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
Cohesion: 0.50
Nodes (4): [1.4.0] - 2026-08-14, Added, Changed, Fixed

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
Cohesion: 0.50
Nodes (4): [1.5.4] - 2026-08-21, Added, Fixed, Open question

### Community 62 - "[1.0.0] - 2026-08-13"
Cohesion: 0.67
Nodes (3): [1.0.0] - 2026-08-13, Added, Fixed

### Community 63 - "[1.1.0] - 2026-08-14"
Cohesion: 0.67
Nodes (3): [1.1.0] - 2026-08-14, Added, Fixed

### Community 64 - "[1.2.0] - 2026-08-14"
Cohesion: 0.67
Nodes (3): [1.2.0] - 2026-08-14, Added, Changed

### Community 65 - "[1.4.1] - 2026-08-14"
Cohesion: 0.67
Nodes (3): [1.4.1] - 2026-08-14, Added, Fixed

### Community 66 - "[1.4.4] - 2026-08-15"
Cohesion: 0.67
Nodes (3): [1.4.4] - 2026-08-15, Changed, Fixed

### Community 67 - "[1.4.5] - 2026-08-15"
Cohesion: 0.67
Nodes (3): [1.4.5] - 2026-08-15, Added, Fixed

### Community 68 - "[1.4.8] - 2026-08-16"
Cohesion: 0.67
Nodes (3): [1.4.8] - 2026-08-16, Added, Fixed

### Community 69 - "[1.5.3] - 2026-08-20"
Cohesion: 0.67
Nodes (3): [1.5.3] - 2026-08-20, Added, Fixed

### Community 70 - "[1.6.0] - 2026-08-27"
Cohesion: 0.67
Nodes (3): [1.6.0] - 2026-08-27, Added, Fixed

### Community 82 - "powerVal"
Cohesion: 0.22
Nodes (15): dec(), diagEnergyInstant(), Component.dec(), Component.n(), Component.plugStatus(), Component.powerVal(), Component.unit(), Component.val() (+7 more)

### Community 83 - "renderVals"
Cohesion: 0.15
Nodes (10): ALARM(), ALARM_ID(), PIN-Gated Alarm Guard, fn(), Component.fn(), renderVals() [mobile], _panelLpMove(), renderVals() (+2 more)

### Community 84 - "mergeSectionOrder"
Cohesion: 0.25
Nodes (14): casaSections, casaSections, SECTION_ORDER(), SECTION_ORDER_DEFAULT_RESOLVED(), SETTINGS_MOVE_SECTION(), SETTINGS_RESET_SECTIONS(), settingsSectionOrder, SECTION_ORDER() (+6 more)

### Community 85 - "House consumption, derived automatically (README section)"
Cohesion: 0.29
Nodes (9): House consumption, derived automatically (changelog entry), Derived house consumption formula, _sampleBatterySign(), Battery power sign convention, batteryPowerSign(), deriveConsumption(), House consumption, derived automatically (README section), Reading the ring (README section) (+1 more)

### Community 86 - "Empty state case (a): no rooms discovered at all"
Cohesion: 0.24
Nodes (11): Empty state case (a): no rooms discovered at all, ALL_CAMERAS_RESULT(), ALL_ROOMS_RESULT(), diagEnvironment(), hasNoAreas computed var, Component.ALL_CAMERAS_RESULT(), ALL_ROOMS_RESULT() (mobile), Component.diagEnvironment() (+3 more)

### Community 87 - "CHANGELOG.md"
Cohesion: 0.24
Nodes (6): Cover position slider touch/long-press fix, v1.5.2 changelog entry, live_dashboard_config.example.js, Enabling Energy (README section), Consumo casa (istantaneo), derivato in automatico (README.it section), README: kiosk mode for wall tablet

### Community 88 - "Instantaneous power unit setting (Auto/W/kW)"
Cohesion: 0.25
Nodes (9): energy.periodNote hardcoded-unit-in-template fix, Instantaneous power unit setting (Auto/W/kW), powerVal() shared unit-normalization helper, powerVal() instantaneous power unit normalization, Settings panel tabbed navigation (Stanze/Energia/Telecamere/Diagnostica), v1.5.3 changelog entry, README: instantaneous power unit normalization, Start here: Settings -> Diagnostica (TROUBLESHOOTING section) (+1 more)

### Community 89 - "Component.diagEnergyInstant"
Cohesion: 0.36
Nodes (8): at(), diagEnergyDaily(), Component.at(), Component.diagEnergyDaily(), Component.diagEnergyInstant(), Component.s(), Component._settingsProblemTab(), _settingsProblemTab()

### Community 90 - "_panelLpMenu"
Cohesion: 0.36
Nodes (8): _lpEntityId(), Component._lpEntityId(), Component._panelLpDown(), Component._panelLpMenu(), Component._panelLpUp(), _panelLpDown(), _panelLpMenu(), _panelLpUp()

### Community 91 - "CONFIG_HIDDEN"
Cohesion: 0.47
Nodes (6): CONFIG_HIDDEN(), ENTITY_HIDDEN_SET(), Component.CONFIG_HIDDEN(), Component.ENTITY_HIDDEN_SET(), Component.ROOMS_RESULT(), ROOMS_RESULT()

### Community 92 - "README: known limits"
Cohesion: 0.40
Nodes (5): README.it: limiti noti, README: known limits, Empty rooms: areas never assigned in HA, Entity not showing anywhere: discovery checklist, Missing section (Energy/Irrigation/Vehicle/...) is opt-in by design

### Community 93 - "powerVal() unit normalization fix (v1.5.3)"
Cohesion: 0.50
Nodes (3): powerVal() unit normalization fix (v1.5.3), toWatts(), Instantaneous power unit (README section)

### Community 94 - "SETTINGS_SET_ENTITY"
Cohesion: 0.67
Nodes (4): Component.SETTINGS_LONG_HIDE(), Component.SETTINGS_SET_ENTITY(), SETTINGS_LONG_HIDE(), SETTINGS_SET_ENTITY()

### Community 95 - "deriveConsumption() (mobile)"
Cohesion: 0.67
Nodes (3): batteryPowerSign() (mobile), deriveConsumption() (mobile), toWatts() (mobile)

## Ambiguous Edges - Review These
- `Four-tab settings panel (Stanze/Energia/Telecamere/Diagnostica)` → `Cover position slider long-press/drag/NaN fix`  [AMBIGUOUS]
  CHANGELOG.md · relation: conceptually_related_to
- `Selected-state !important inline-style override fix` → `First public release (0.1.0)`  [AMBIGUOUS]
  CHANGELOG.md · relation: conceptually_related_to
- `Camera tile shows only icon, never preview` → `Sorveglianza/Surveillance tab requires 2+ cameras`  [AMBIGUOUS]
  TROUBLESHOOTING.md · relation: conceptually_related_to

## Knowledge Gaps
- **153 isolated node(s):** `FOLDER_NAME`, `__dirname`, `src`, `sandbox`, `zip-and-attach Release Job` (+148 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **42 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Four-tab settings panel (Stanze/Energia/Telecamere/Diagnostica)` and `Cover position slider long-press/drag/NaN fix`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Selected-state !important inline-style override fix` and `First public release (0.1.0)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Camera tile shows only icon, never preview` and `Sorveglianza/Surveillance tab requires 2+ cameras`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `renderVals()` connect `renderVals` to `Component.roomDetail`, `_boot`, `Empty state case (b): configured energy entity doesn't exist`, `PREFS`, `powerVal`, `Empty state case (a): no rooms discovered at all`, `Component.diagEnergyInstant`, `_panelLpMenu`, `CONFIG_HIDDEN`, `SETTINGS_SET_ENTITY`?**
  _High betweenness centrality (0.217) - this node is a cross-community bridge._
- **Why does `v1.5.4 changelog entry` connect `v1.5.4 changelog entry` to `discovery.js`, `Empty state case (b): configured energy entity doesn't exist`, `CHANGELOG.md`?**
  _High betweenness centrality (0.190) - this node is a cross-community bridge._
- **Why does `Alarm panel auto-discovery` connect `discovery.js` to `v1.5.4 changelog entry`, `Diagnostics panel (settings gear → Diagnostica)`?**
  _High betweenness centrality (0.156) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `renderVals()` (e.g. with `energy.gridNote daily/instantaneous mixing fix` and `PIN-Gated Alarm Guard`) actually correct?**
  _`renderVals()` has 3 INFERRED edges - model-reasoned connections that need verification._
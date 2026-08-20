# Graph Report - .  (2026-08-20)

## Corpus Check
- 8 files · ~99,871 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 615 nodes · 894 edges · 79 communities (54 shown, 25 thin omitted)
- Extraction: 90% EXTRACTED · 10% INFERRED · 0% AMBIGUOUS · INFERRED: 88 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- support.js Micro-Framework Runtime
- CHANGELOG: Config Keys & HA APIs
- dash_neumo.html Component Class
- panel.js Custom Panel Bridge
- CLAUDE.md Project Instructions
- discovery.js Auto-Discovery
- TROUBLESHOOTING.md Common Issues
- CHANGELOG: Rendering & Cache Fixes
- README: Energy & Power Unit Docs
- dash_neumo.html Boot Sequence
- README: Installation & Settings
- dash_neumo_mobile.html Settings Mutators
- CHANGELOG: Cover Slider Gesture Fix (v1.5.2)
- dash_neumo_mobile.html Power Unit & Diagnostics Helpers
- dash_neumo_mobile.html Boot Sequence
- dash_neumo.html Settings Mutators
- CHANGELOG: Energy Ring Redesign (v1.4.0)
- Casa Dashboard Screenshot
- dash_neumo_mobile.html Settings Tab Navigation
- prefs.js Persistence & Diagnostics Text
- CHANGELOG: First Public Release
- dash_neumo.html Settings Tab Navigation
- README: Cameras, Appliances & Vehicle
- CHANGELOG: Camera Grid Adapts to Count
- dash_neumo.html Room/Module Visibility Helpers
- dash_neumo_mobile.html Room Detail & Stanze Tab
- dash_neumo_mobile.html Power Unit Setting (v1.5.3)
- dash_neumo_mobile.html Energy Charts & Nav
- dash_neumo.html Power Unit Formatting (v1.5.3)
- Mobile Dashboard Screenshot
- dash_neumo_mobile.html Camera Snapshot Polling
- ha-backend-demo.js
- mapEnergyPrefs Test Suite
- CHANGELOG: discoverRooms Exclusion Design
- CHANGELOG: Energy Chart Color & Export Bar
- CHANGELOG: v1.0.0 Release
- CHANGELOG: HACS Support (v1.3.0)
- dash_neumo.html Long-Press Gesture Handlers
- dash_neumo.html Diagnostica Tab
- README: Overview & Demo Mode
- README: Irrigation & Weather Setup
- Attach to Release Step / Build live_dashboard.zip Step
- Live Dashboard README Header Banner / Home Assistant
- Energia Dashboard View / Live Power KPI Cards (Produzione...
- Irrigazione (Irrigation) Dashboard View / Zona 1 Irrigati...
- call(domain,service,data) / cover(id,service,extra)
- _lpEntityId(e) / _panelLpDown(e) long-press start
- ha-backend.js / connect()
- ha-backend-panel.js / connect()
- App Icon (256px) / House-and-Grid Icon Motif
- Vincolo 1280x800 senza scroll ritirato (v1.4.9) / Minimi ...
- DEFAULT_CONFIG / live_dashboard_config.example.js
- Energia tab (rings, now-cells, history bars) / Casa-tab e...
- Irrigazione tab (zone cards, sparkline chart) / Meteo (we...
- Requisiti / Requirements
- Page never leaves "Connessione…" / "Connecting…" / 1.8s d...
- zip-and-attach Release Job
- App Icon (512px)
- Transparent App Icon (256px)
- fn(id)
- _bindAttr(name,value) ref-callback binder
- MODULE_VISIBLE(key)
- _panelLpMenu(e) context-menu suppression
- _panelLpMove(e) long-press cancel-on-move
- toggleChart(k)
- Alarm status/control card
- Auto (vehicle) tab
- Covers up/down quick-action tiles
- House-mode picker card
- On-now active-items card
- Who-is-home presence card
- Entities show unavailable in grey (intentional)

## God Nodes (most connected - your core abstractions)
1. `renderVals()` - 74 edges
2. `CasaPanel` - 19 edges
3. `renderVals() main template-data builder` - 17 edges
4. `PREFS()` - 16 edges
5. `v1.5.0 release` - 14 edges
6. `SAVE_PREFS(prefs)` - 13 edges
7. `v1.5.2 release` - 12 edges
8. `Settings panel (gear icon)` - 12 edges
9. `Cover slider drag mistaken for long-press (root cause)` - 11 edges
10. `Diagnostics panel (settings gear -> Diagnostica)` - 11 edges

## Surprising Connections (you probably didn't know these)
- `Cameras (optional)` --semantically_similar_to--> `Telecamere (opzionale)`  [INFERRED] [semantically similar]
  README.md → README.it.md
- `More (links section)` --semantically_similar_to--> `Altro (link section)`  [INFERRED] [semantically similar]
  README.md → README.it.md
- `Live Dashboard overview` --semantically_similar_to--> `Panoramica Live Dashboard`  [INFERRED] [semantically similar]
  README.md → README.it.md
- `What this is, and isn't` --semantically_similar_to--> `Cos'è, e cosa non è`  [INFERRED] [semantically similar]
  README.md → README.it.md
- `Requirements` --semantically_similar_to--> `Requisiti`  [INFERRED] [semantically similar]
  README.md → README.it.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Diagnostics visibility chain: silent console-only signals surfaced to on-device UI** — changelog_v1_4_1_console_info_boot, changelog_v1_5_1_diagnostics_panel, changelog_v1_5_3_settings_tabs_redesign [INFERRED 0.85]
- **Energy source resolution: config.js override, HA Energy dashboard, auto-discovery fallback** — changelog_v1_4_0_energy_dashboard_autodiscovery, changelog_v1_4_1_multi_array_meter_bug, changelog_v1_4_3_grid_meter_shape_bug, changelog_v1_4_7_zero_config_energy_bug [INFERRED 0.85]
- **Touch gesture conflicts: long-press-to-hide vs drag controls** — changelog_v1_5_0_longpress_hide, changelog_v1_5_2_cover_slider_bug, changelog_v1_5_2_cover_row_no_longpress, changelog_v1_5_2_longpress_pointermove_cancel [INFERRED 0.85]
- **I cinque vincoli del templating trovati sul campo** — claude_style_attribute_literal_rule, claude_dynamic_src_href_points_rule, claude_casa_config_global_rule, claude_panel_custom_tag_derivation_rule, claude_ha_energy_flat_schema_rule [EXTRACTED 1.00]
- **Passi del workflow di orientamento a inizio sessione** — claude_session_orientation_workflow, claude_wiki_index, claude_graph_report, claude_graphify_query_command, claude_changelog [EXTRACTED 1.00]
- **Regole della sezione Release** — claude_release_config_location_rule, claude_version_cache_busting_rule, claude_tag_prefix_convention, claude_tag_not_release_rule, claude_hacs_release_visibility_note, claude_release_zip_asset_check [EXTRACTED 1.00]
- **Grammatica colori energia e i suoi token** — claude_energy_color_grammar_rule, claude_sage_color_token, claude_acc_color_token, claude_feed_color_token [EXTRACTED 1.00]
- **Regole di rigenerazione graphify prima del commit** — claude_pre_commit_graphify_regeneration_rule, claude_no_post_commit_hook_rule [EXTRACTED 1.00]
- **Funzionalità Energia (README.it.md)** — readme_it_attivare_energia, readme_it_tabella_ruoli_energia, readme_it_unita_potenza_istantanea, readme_it_come_si_legge_anello [INFERRED 0.85]
- **Energy dashboard feature (README.md)** — readme_enabling_energy, readme_energy_role_mapping_table, readme_instantaneous_power_unit, readme_reading_the_ring [INFERRED 0.85]
- **Installation methods (README.md)** — readme_installation, readme_via_hacs, readme_manual_installation, readme_module_url_cache_busting [EXTRACTED 1.00]
- **Camera-related troubleshooting cluster** — troubleshooting_camera_tile_icon_only, troubleshooting_camera_hide_until_tap, troubleshooting_black_camera_overlay, troubleshooting_surveillance_tab_missing [INFERRED 0.75]
- **Entity registry state (disabled_by/hidden_by/area_id) drives multiple troubleshooting symptoms** — troubleshooting_rooms_empty, troubleshooting_auto_discovery_filters, troubleshooting_entity_missing, troubleshooting_surveillance_tab_missing [INFERRED 0.75]
- **config.js opt-in sections whose absence explains missing UI** — troubleshooting_whole_section_missing, troubleshooting_too_many_rooms, troubleshooting_energy_charts_wrong [INFERRED 0.65]
- **Diagnostica panel (v1.5.1/v1.5.3): resolution capture, verdict rows, and problem-tab routing** — public_dash_neumo_diagenergyinstant, public_dash_neumo_diagenergydaily, public_dash_neumo_diagenvironment, public_dash_neumo__settingsproblemtab, public_dash_neumo_configdiag, public_dash_neumo_energydiag, public_dash_neumo_ui_settings_tab_diagnostica [INFERRED 0.85]
- **User-configurable instantaneous power unit (v1.5.3): pref write, pref read, formatting, and UI control** — public_dash_neumo_powerval, public_dash_neumo_settings_set_power_unit, public_dash_neumo_prefs, public_dash_neumo_ui_power_unit_selector [EXTRACTED 1.00]
- **Three-state visibility resolution (config.js hide-lists vs. per-user panel overrides) shared across rooms/entities/modules** — public_dash_neumo_prefs, public_dash_neumo_config_hidden, public_dash_neumo_module_visible, public_dash_neumo_entity_hidden_set, public_dash_neumo_rooms_result, public_dash_neumo_all_rooms_result [INFERRED 0.85]
- **Settings panel navigation redesign (v1.5.3): 4 tabs + issue dots + power unit** — public_dash_neumo_mobile_ui_settings_tabs_nav, public_dash_neumo_mobile_settingsproblemtab, public_dash_neumo_mobile_settings_issue_dots_concept, public_dash_neumo_mobile_settings_set_power_unit, public_dash_neumo_mobile_ui_power_unit_picker [EXTRACTED 1.00]
- **Power-reading formatting pipeline: powerVal + PREFS + diagnostics rows** — public_dash_neumo_mobile_powerval, public_dash_neumo_mobile_prefs, public_dash_neumo_mobile_diagenergyinstant, public_dash_neumo_mobile_ui_energy_preview_card, public_dash_neumo_mobile_ui_settings_tab_energia [EXTRACTED 1.00]
- **Preference-driven visibility settings (rooms/entities/cameras/modules)** — public_dash_neumo_mobile_settings_set_room, public_dash_neumo_mobile_settings_set_entity, public_dash_neumo_mobile_settings_set_camera, public_dash_neumo_mobile_settings_set_module, public_dash_neumo_mobile_save_prefs, public_dash_neumo_mobile_prefs [INFERRED 0.90]
- **Diagnostica panel (v1.5.1/v1.5.3): resolution capture, verdict rows, and problem-tab routing** — public_dash_neumo_diagenergyinstant, public_dash_neumo_diagenergydaily, public_dash_neumo_diagenvironment, public_dash_neumo__settingsproblemtab, public_dash_neumo_configdiag, public_dash_neumo_energydiag, public_dash_neumo_ui_settings_tab_diagnostica [INFERRED 0.85]
- **User-configurable instantaneous power unit (v1.5.3): pref write, pref read, formatting, and UI control** — public_dash_neumo_powerval, public_dash_neumo_settings_set_power_unit, public_dash_neumo_prefs, public_dash_neumo_ui_power_unit_selector [EXTRACTED 1.00]
- **Three-state visibility resolution (config.js hide-lists vs. per-user panel overrides) shared across rooms/entities/modules** — public_dash_neumo_prefs, public_dash_neumo_config_hidden, public_dash_neumo_module_visible, public_dash_neumo_entity_hidden_set, public_dash_neumo_rooms_result, public_dash_neumo_all_rooms_result [INFERRED 0.85]
- **Settings panel navigation redesign (v1.5.3): 4 tabs + issue dots + power unit** — public_dash_neumo_mobile_ui_settings_tabs_nav, public_dash_neumo_mobile_settingsproblemtab, public_dash_neumo_mobile_settings_issue_dots_concept, public_dash_neumo_mobile_settings_set_power_unit, public_dash_neumo_mobile_ui_power_unit_picker [EXTRACTED 1.00]
- **Power-reading formatting pipeline: powerVal + PREFS + diagnostics rows** — public_dash_neumo_mobile_powerval, public_dash_neumo_mobile_prefs, public_dash_neumo_mobile_diagenergyinstant, public_dash_neumo_mobile_ui_energy_preview_card, public_dash_neumo_mobile_ui_settings_tab_energia [EXTRACTED 1.00]
- **Preference-driven visibility settings (rooms/entities/cameras/modules)** — public_dash_neumo_mobile_settings_set_room, public_dash_neumo_mobile_settings_set_entity, public_dash_neumo_mobile_settings_set_camera, public_dash_neumo_mobile_settings_set_module, public_dash_neumo_mobile_save_prefs, public_dash_neumo_mobile_prefs [INFERRED 0.90]
- **Diagnostics visibility chain: silent console-only signals surfaced to on-device UI** — changelog_v1_4_1_console_info_boot, changelog_v1_5_1_diagnostics_panel, changelog_v1_5_3_settings_tabs_redesign [INFERRED 0.85]
- **Energy source resolution: config.js override, HA Energy dashboard, auto-discovery fallback** — changelog_v1_4_0_energy_dashboard_autodiscovery, changelog_v1_4_1_multi_array_meter_bug, changelog_v1_4_3_grid_meter_shape_bug, changelog_v1_4_7_zero_config_energy_bug [INFERRED 0.85]
- **Touch gesture conflicts: long-press-to-hide vs drag controls** — changelog_v1_5_0_longpress_hide, changelog_v1_5_2_cover_slider_bug, changelog_v1_5_2_cover_row_no_longpress, changelog_v1_5_2_longpress_pointermove_cancel [INFERRED 0.85]
- **Energy dashboard feature (README.md)** — readme_enabling_energy, readme_energy_role_mapping_table, readme_instantaneous_power_unit, readme_reading_the_ring [INFERRED 0.85]
- **Installation methods (README.md)** — readme_installation, readme_via_hacs, readme_manual_installation, readme_module_url_cache_busting [EXTRACTED 1.00]
- **Funzionalità Energia (README.it.md)** — readme_it_attivare_energia, readme_it_tabella_ruoli_energia, readme_it_unita_potenza_istantanea, readme_it_come_si_legge_anello [INFERRED 0.85]

## Communities (79 total, 25 thin omitted)

### Community 0 - "support.js Micro-Framework Runtime"
Cohesion: 0.07
Nodes (51): boot(), cdnScriptFor(), collectProps(), compileAttr(), compileTemplate(), contentKey(), createComponentFactory(), createHelmetManager() (+43 more)

### Community 1 - "CHANGELOG: Config Keys & HA APIs"
Cohesion: 0.09
Nodes (40): Home Assistant energy/get_prefs API, Home Assistant frontend/set_user_data API, config.js key: cameras.hide, config.js key: entities.hide, config.js key: modules.hide, _resolveEnergyDaily() energy-source resolution function, v1.5.0 release, v1.5.1 release (+32 more)

### Community 2 - "dash_neumo.html Component Class"
Cohesion: 0.05
Nodes (36): _panelLpMove(e), ALARM(id), call(domain,service,data), cover(id,service,extra), renderVals(), runValve(id,minutes), spark(arr,w,h), "On now" active items card (+28 more)

### Community 3 - "panel.js Custom Panel Bridge"
Cohesion: 0.13
Nodes (9): CasaPanel, fetchDailyCounterHistory(), fetchDailyLastSample(), fetchHistory(), fetchRawHistory(), fetchTodayStatsDelta(), FOLDER_NAME, isoDay() (+1 more)

### Community 4 - "CLAUDE.md Project Instructions"
Cohesion: 0.08
Nodes (27): --acc: prelievo (famiglia terracotta = rete), window.CASA_CONFIG come global (import() bloccato su file://), CHANGELOG.md (voce più recente), console.log non esiste per utenti su companion app/tablet: serve diagnostica visibile in dashboard, src/href/points dinamici via ref callback dopo il mount, Grammatica colori energia non negoziabile (anello e barre coerenti), --feed: immissione (salvia schiarita), graphify-out/GRAPH_REPORT.md (+19 more)

### Community 5 - "discovery.js Auto-Discovery"
Cohesion: 0.19
Nodes (14): buildExportedConfig(), collectConfiguredEntities(), discoverAllOfDomain(), discoverCameras(), discoverEnergyEntities(), discoverPeople(), discoverRooms(), discoverWeather() (+6 more)

### Community 6 - "TROUBLESHOOTING.md Common Issues"
Cohesion: 0.11
Nodes (19): Alarm card has no buttons, or fewer than expected, Areas never assigned (no naming/grouping fallback), Auto-discovery filters: disabled_by / hidden_by / entity_category, area_id inheritance, Live camera overlay is a black/broken image, config.cameras.hideUntilTap (tap-to-reveal still), Camera tile only ever shows an icon, never a preview, Energy charts empty or look wrong, Energy diagnostics blocks: instantaneous values / daily totals, daily-counter vs lifetime-cumulative sensor mismatch (+11 more)

### Community 7 - "CHANGELOG: Rendering & Cache Fixes"
Cohesion: 0.14
Nodes (17): loadScript() dynamic script loader, README 'Known limits' section, Irrigation zones: timed watering via input_button, alternative to valve+durations, Desktop 'on right now' list had hardcoded Italian labels, loadScript() calls lacked cache-bust, stale discovery.js survived deploys, Near-zero ring segment drew stray dot due to stroke-linecap:round, Irrigation sparkline points attribute set from unresolved placeholder, First render logged false 'never resolved' warnings for normal empty gap (+9 more)

### Community 8 - "README: Energy & Power Unit Docs"
Cohesion: 0.17
Nodes (17): CHANGELOG.md reference, live_dashboard_config.example.js reference, Settings -> Diagnostica in-app panel, Enabling Energy, Energy sensor role mapping table, Instantaneous power unit, Altro (link section), Attivare l'Energia (+9 more)

### Community 9 - "dash_neumo.html Boot Sequence"
Cohesion: 0.14
Nodes (12): _boot(), _startSnapTimer(), _stopSnapTimer(), ASSET_V, bust(), Component class, CONFIG_PATHS, DCLogic (base class) (+4 more)

### Community 10 - "README: Installation & Settings"
Cohesion: 0.22
Nodes (15): config.js vs settings panel precedence, Configuring the rest, Installation, Configurare il resto, Installazione, Installazione manuale, Limiti noti, Pannello impostazioni (ingranaggio, v1.5.0) (+7 more)

### Community 11 - "dash_neumo_mobile.html Settings Mutators"
Cohesion: 0.14
Nodes (14): SAVE_PREFS(prefs), SETTINGS_CLEAR_CAMERA(id), SETTINGS_CLEAR_ENTITY(id), SETTINGS_CLEAR_ROOM(id), SETTINGS_LONG_HIDE(id), SETTINGS_MOVE_ROOM(orderIds,id,dir), SETTINGS_RESET(), SETTINGS_SET_CAMERA(id,val) (+6 more)

### Community 12 - "CHANGELOG: Cover Slider Gesture Fix (v1.5.2)"
Cohesion: 0.28
Nodes (13): v1.5.2 release, Inline style always wins over stylesheet, made 'selected' state inert, Cover row removed from long-press-to-hide gesture, Cover slider drag mistaken for long-press (root cause), Fix duplicated identically in dash_neumo.html and mobile variant, Long-press timer cancelled on pointermove/pointercancel, Non-finite (NaN) value dropped before service call, onKeyUp added for arrow-key slider operation (+5 more)

### Community 13 - "dash_neumo_mobile.html Power Unit & Diagnostics Helpers"
Cohesion: 0.26
Nodes (13): dash_neumo.html (desktop dashboard sibling), at(id,k) attribute accessor, Component (mobile dashboard root), dec(v,d) locale decimal formatter, diagEnergyDaily(), diagEnergyInstant(), fn(id) friendly name helper, n(id) numeric parse helper (+5 more)

### Community 14 - "dash_neumo_mobile.html Boot Sequence"
Cohesion: 0.17
Nodes (11): ALL_CAMERAS_RESULT(), _boot() async bootstrap, bust() cache-busting helper, CONFIG_PATHS, loadScript(), loadUserConfig(), _resolveEnergyDaily(), window.CasaBackend module (+3 more)

### Community 15 - "dash_neumo.html Settings Mutators"
Cohesion: 0.26
Nodes (13): PREFS(), SAVE_PREFS(prefs), SETTINGS_CLEAR_CAMERA(), SETTINGS_CLEAR_ENTITY(), SETTINGS_CLEAR_ROOM(), SETTINGS_LONG_HIDE(id), SETTINGS_MOVE_ROOM(), SETTINGS_RESET() (+5 more)

### Community 16 - "CHANGELOG: Energy Ring Redesign (v1.4.0)"
Cohesion: 0.25
Nodes (11): config.js key: config.energy.consumptionToday, config.js key: config.energy.gridExportToday, v1.4.0 release, New config.energy.gridExportToday / consumptionToday keys, Energy setup optional: reads HA Energy dashboard prefs, falls back to guess, Install-time self-check for panel_custom name: mismatch, README fixed: HACS folder/name: not a per-install choice, Falls back to single-ring view with no grid-export sensor available (+3 more)

### Community 17 - "Casa Dashboard Screenshot"
Cohesion: 0.25
Nodes (11): Casa Dashboard Screenshot, Allarme (Alarm) Card, Double-Ring Energy Gauge (7,6 kWh), Autoconsumo Tile (6,2 kWh), Dalla Rete Tile (1,4 kWh), Immessi in Rete Tile (3,6 kWh), Three-Tile Compact Energy Legend, Fotovoltaico Compact Card Layout (+3 more)

### Community 18 - "dash_neumo_mobile.html Settings Tab Navigation"
Cohesion: 0.20
Nodes (11): Diagnostics: config-load attempt verdicts (loadScript/defined), Per-tab issue-indicator dot (derived from diagnostics verdicts), Diagnostics copy-to-clipboard sheet, Header bar (greeting, weather chip, settings, theme toggle), Settings panel screen 1 (tabbed), Settings panel screen 2 (per-room entity list), Settings tab: Telecamere (camera visibility/tap-gate), Settings tab: Diagnostica (config load + environment) (+3 more)

### Community 19 - "prefs.js Persistence & Diagnostics Text"
Cohesion: 0.27
Nodes (8): diagRowLine(), diagText(), load(), padCol(), readLocal(), save(), writeLocal(), createExternalModules()

### Community 20 - "CHANGELOG: First Public Release"
Cohesion: 0.20
Nodes (10): v0.1.0 first public release, Demo mode with invented dataset, opens from file:// or ?demo, First public release: auto-discovery of rooms/people/weather/alarm, Italian/English UI from hass.language with config.js override, Optional modules hidden until configured: Energy/Irrigation/Vehicle, panel_custom installation only for this release, panel.js hardcoded casa-panel tag ignoring deploy folder/name:, Appliances module (config.appliances): running state/remaining/energy today (+2 more)

### Community 21 - "dash_neumo.html Settings Tab Navigation"
Cohesion: 0.24
Nodes (10): _settingsProblemTab(), at(id,k), configDiag (instance field), diagEnergyDaily(), diagEnergyInstant(), energyDiag (instance field), s(id), Diagnostics copy sheet (+2 more)

### Community 22 - "README: Cameras, Appliances & Vehicle"
Cohesion: 0.27
Nodes (10): Appliances (optional), Live on tap: MJPEG fullscreen stream, Camera privacy: hideUntilTap, Cameras (optional), Auto (opzionale), Cos'è, e cosa non è, Elettrodomestici (opzionale), Telecamere (opzionale) (+2 more)

### Community 23 - "CHANGELOG: Camera Grid Adapts to Count"
Cohesion: 0.25
Nodes (9): Cameras module: Sorveglianza tab, featured card, MJPEG overlay, hideUntilTap, Root container padding smaller than neumorphic shadow reach, clipping shadows, [data-r=rooms] rows sized to min-content instead of flex leftover space, Room tiles stretched to fill leftover column height, rooms.max default raised from 8 to 12, Sorveglianza card adapts layout to camera count (1/2/3/4/5+), Mobile caps at 2 tiles + '+N altre' counter, never 2x2, Reported by Reddit user: home card showed only one camera (+1 more)

### Community 24 - "dash_neumo.html Room/Module Visibility Helpers"
Cohesion: 0.25
Nodes (9): _bindAttr(name,value), applianceItems(roomId), applianceState(a), CONFIG_HIDDEN(), ENTITY_HIDDEN_SET(), isOn(id), MODULE_VISIBLE(key), ROOMS_RESULT() (+1 more)

### Community 25 - "dash_neumo_mobile.html Room Detail & Stanze Tab"
Cohesion: 0.25
Nodes (9): ALARM(id), applianceItems(roomId), applianceState(a), Cover position drag-state handling (coverDrag), isOn(id), roomDetail(r), s(id) state accessor, Expanded room detail (sensors/lights/covers/appliances/switches/media/extras) (+1 more)

### Community 26 - "dash_neumo_mobile.html Power Unit Setting (v1.5.3)"
Cohesion: 0.22
Nodes (7): ALL_ROOMS_RESULT(), powerUnit preference (auto/w/kw), PREFS() preferences getter, ROOMS_RESULT(), SETTINGS_SET_POWER_UNIT(unit), Power-unit picker (auto/W/kW) control, Settings tab: Energia (power-unit picker + energy diagnostics)

### Community 27 - "dash_neumo_mobile.html Energy Charts & Nav"
Cohesion: 0.29
Nodes (7): ALARM_ID(), renderVals() main template-data builder, roomSummary(r), spark(arr,w,h) sparkline path builder, Bottom tab bar (fixed nav), Energy history stacked bar chart (7/14/30 day range), Two-ring solar/self-consumption SVG donut

### Community 28 - "dash_neumo.html Power Unit Formatting (v1.5.3)"
Cohesion: 0.48
Nodes (7): dec(v,d), n(id), powerVal(id), SETTINGS_SET_POWER_UNIT(unit), Power unit selector control, unit(id), val(id,d,u)

### Community 29 - "Mobile Dashboard Screenshot"
Cohesion: 0.40
Nodes (6): Cose Accese Adesso (Active Devices List), Bottom Navigation Bar (Casa/Stanze/Irrigazione/Energia/Auto/Meteo), Modalità Casa (Home Mode Selector), Mobile Dashboard View (Screenshot), Chi è in Casa (Presence Tracker), Weather Widget (19°, Sunny)

### Community 30 - "dash_neumo_mobile.html Camera Snapshot Polling"
Cohesion: 0.33
Nodes (6): Camera snapshot polling (snapTimer/snapTick, cache-busted src), componentDidMount(), _startSnapTimer(), Sorveglianza (camera) tab, Fullscreen camera-stream modal, Casa-tab camera preview (single/multi grid)

### Community 31 - "ha-backend-demo.js"
Cohesion: 0.53
Nodes (4): buildRegistries(), cloneStates(), connect(), rand()

### Community 32 - "mapEnergyPrefs Test Suite"
Cohesion: 0.33
Nodes (3): __dirname, sandbox, src

### Community 33 - "CHANGELOG: discoverRooms Exclusion Design"
Cohesion: 0.50
Nodes (4): discoverRooms() entity discovery function, discoverRooms() excludes any entity referenced anywhere in config.js, Weather detail card no longer duplicates per-zone soil moisture pills, Optional config.weatherStation: local station sensors override weather entity

### Community 34 - "CHANGELOG: Energy Chart Color & Export Bar"
Cohesion: 0.50
Nodes (4): README 'Enabling Energy' section, Fotovoltaico ring becomes two concentric rings (consumption/production), Energy chart colored production/grid import opposite of home-screen ring, Third chart bar for energy fed back to the grid

### Community 35 - "CHANGELOG: v1.0.0 Release"
Cohesion: 0.67
Nodes (4): v1.0.0 release, Empty-state guidance for zero HA areas, link to Settings -> Areas, Inline tooltip clarifying 'grid' figure means imported energy, not total consumption, Mobile 'Consumo casa' tile duplicated grid-import value; removed

### Community 36 - "CHANGELOG: HACS Support (v1.3.0)"
Cohesion: 0.67
Nodes (4): v1.3.0 release, config/www/live_dashboard_config.js location HACS updates can't erase, HACS support: custom repository, category Dashboard, Example config renamed to live_dashboard_config.example.js to avoid overwrite trap

### Community 37 - "dash_neumo.html Long-Press Gesture Handlers"
Cohesion: 0.50
Nodes (4): _lpEntityId(e), _panelLpDown(e), _panelLpMenu(e), _panelLpUp()

### Community 38 - "dash_neumo.html Diagnostica Tab"
Cohesion: 0.50
Nodes (4): ALL_CAMERAS_RESULT(), ALL_ROOMS_RESULT(), diagEnvironment(), Settings tab: Diagnostica

### Community 40 - "README: Overview & Demo Mode"
Cohesion: 0.67
Nodes (4): Demo mode, Modalità demo, Panoramica Live Dashboard, Live Dashboard overview

### Community 41 - "README: Irrigation & Weather Setup"
Cohesion: 0.67
Nodes (4): Enabling Irrigation, Attivare l'Irrigazione, Stazione meteo (opzionale), Weather station (optional)

### Community 42 - "Attach to Release Step / Build live_dashboard.zip Step"
Cohesion: 0.67
Nodes (3): Attach to Release Step, Build live_dashboard.zip Step, HACS zip_release content_in_root Convention

### Community 43 - "Live Dashboard README Header Banner / Home Assistant"
Cohesion: 1.00
Nodes (3): Live Dashboard README Header Banner, Home Assistant, Live Dashboard

### Community 44 - "Energia Dashboard View / Live Power KPI Cards (Produzione..."
Cohesion: 1.00
Nodes (3): Energia Dashboard View, Live Power KPI Cards (Produzione/Consumo/Prelievo), Produzione e Prelievo Bar Chart

### Community 45 - "Irrigazione (Irrigation) Dashboard View / Zona 1 Irrigati..."
Cohesion: 1.00
Nodes (3): Irrigazione (Irrigation) Dashboard View, Zona 1 Irrigation Card, Zona 2 Irrigation Card

### Community 46 - "call(domain,service,data) / cover(id,service,extra)"
Cohesion: 0.67
Nodes (3): call(domain,service,data), cover(id,service,extra), runValve(id,minutes)

### Community 47 - "_lpEntityId(e) / _panelLpDown(e) long-press start"
Cohesion: 0.67
Nodes (3): _lpEntityId(e), _panelLpDown(e) long-press start, _panelLpUp() long-press end

## Ambiguous Edges - Review These
- `_settingsProblemTab()` → `dash_neumo.html (desktop dashboard sibling)`  [AMBIGUOUS]
  public/dash_neumo_mobile.html · relation: references

## Knowledge Gaps
- **145 isolated node(s):** `__dirname`, `src`, `sandbox`, `FOLDER_NAME`, `zip-and-attach Release Job` (+140 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **25 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `_settingsProblemTab()` and `dash_neumo.html (desktop dashboard sibling)`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._
- **Why does `renderVals()` connect `dash_neumo.html Component Class` to `dash_neumo.html Long-Press Gesture Handlers`, `dash_neumo.html Diagnostica Tab`, `dash_neumo.html Boot Sequence`, `dash_neumo.html Settings Mutators`, `dash_neumo.html Settings Tab Navigation`, `dash_neumo.html Room/Module Visibility Helpers`, `dash_neumo.html Power Unit Formatting (v1.5.3)`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **Why does `v1.5.0 release` connect `CHANGELOG: Config Keys & HA APIs` to `CHANGELOG: Rendering & Cache Fixes`?**
  _High betweenness centrality (0.008) - this node is a cross-community bridge._
- **Why does `walk()` connect `support.js Micro-Framework Runtime` to `discovery.js Auto-Discovery`?**
  _High betweenness centrality (0.008) - this node is a cross-community bridge._
- **What connects `__dirname`, `src`, `sandbox` to the rest of the system?**
  _145 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `support.js Micro-Framework Runtime` be split into smaller, more focused modules?**
  _Cohesion score 0.06845238095238096 - nodes in this community are weakly interconnected._
- **Should `CHANGELOG: Config Keys & HA APIs` be split into smaller, more focused modules?**
  _Cohesion score 0.08717948717948718 - nodes in this community are weakly interconnected._
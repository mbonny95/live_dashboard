# Graph Report - .  (2026-08-16)

## Corpus Check
- 29 files · ~96,773 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 492 nodes · 771 edges · 49 communities (34 shown, 15 thin omitted)
- Extraction: 86% EXTRACTED · 14% INFERRED · 0% AMBIGUOUS · INFERRED: 108 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- DCLogic Component Runtime
- Settings Panel Visibility Core
- Energy Ring & Setup Evolution
- Backend Bridge & Component Boot
- Early Release Modules & i18n
- Home Assistant Panel Bridge
- CLAUDE.md Project Constraints
- README Install & Module Docs
- Entity Auto-Discovery
- Troubleshooting Guide
- v1.4.7 Energy Fixes & Diagnostics Origin
- Settings Panel v1.5.0 Overrides
- Casa Dashboard Screenshot
- prefs.js Persistence & Diagnostics Text
- v1.4.8 Room Tile & Pill Fixes
- Energy Ring Reading Docs
- Mobile Dashboard View
- Demo Backend Mock
- Energy Prefs Test Suite
- v1.3.x Config Location Changes
- Diagnostics & Troubleshooting Cross-Links
- v1.4.6 Card Shadow Fix
- Camera Overlay Close Handler
- Kiosk Mode Docs
- Irrigation & Weather Station Docs
- Release Zip & Attach Job
- README Header Banner
- Energia Dashboard View
- Irrigazione Dashboard View
- Live HA Backend Bridge
- Panel HA Backend Bridge
- README Overview & Support
- App Icon (256px)
- Changelog Format Convention
- v1.0.1 Style Override Fix
- Density Constraint Retirement
- Appliances Module Docs
- Requirements Docs
- Vehicle Module Docs
- Connecting Fallback Troubleshooting
- Release Zip Job (single)
- App Icon (512px)
- Transparent App Icon
- Camera Reveal Handler
- Unavailable Entity Troubleshooting

## God Nodes (most connected - your core abstractions)
1. `Component.renderVals()` - 24 edges
2. `CasaPanel` - 19 edges
3. `Component._boot()` - 18 edges
4. `renderVals() settings-panel block (v1.5.0)` - 18 edges
5. `Component.PREFS()` - 16 edges
6. `Component.PREFS()` - 15 edges
7. `v1.5.0 Release` - 13 edges
8. `Component.renderVals()` - 13 edges
9. `Component.SAVE_PREFS(prefs)` - 12 edges
10. `Settings Panel` - 11 edges

## Surprising Connections (you probably didn't know these)
- `Known limits` --semantically_similar_to--> `Limiti noti`  [INFERRED] [semantically similar]
  README.md → README.it.md
- `Live Dashboard README (overview)` --semantically_similar_to--> `Live Dashboard README italiana (panoramica)`  [INFERRED] [semantically similar]
  README.md → README.it.md
- `What this is, and isn't (panel_custom, wall tablet, mobile secondary)` --semantically_similar_to--> `Cos'è, e cosa non è (panel_custom, tablet a muro, mobile secondario)`  [INFERRED] [semantically similar]
  README.md → README.it.md
- `Requirements (HA www access, registry calls, no build step)` --semantically_similar_to--> `Requisiti (accesso www HA, chiamate ai registri, niente build step)`  [INFERRED] [semantically similar]
  README.md → README.it.md
- `Installation via HACS` --semantically_similar_to--> `Installazione via HACS`  [INFERRED] [semantically similar]
  README.md → README.it.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **v1.5.1 Diagnostics Panel Components** — changelog_v151_diagnostics_panel, changelog_v151_config_diagnostics_section, changelog_v151_energy_instantaneous_diagnostics, changelog_v151_energy_daily_totals_diagnostics, changelog_v151_environment_diagnostics, changelog_v151_copy_diagnostics_button [EXTRACTED 1.00]
- **v1.5.0 Settings Panel Components** — changelog_v150_settings_panel, changelog_v150_rooms_settings, changelog_v150_entities_settings, changelog_v150_cameras_settings, changelog_v150_sections_settings, changelog_v150_export_as_config_js, changelog_v150_frontend_set_user_data_persistence [EXTRACTED 1.00]
- **Energy Ring Model Evolution Across Releases** — changelog_v140_concentric_rings_redesign, changelog_v141_multi_array_meter_fix, changelog_v143_flat_grid_schema_support, changelog_v145_feed_to_grid_bar, changelog_v151_stale_daily_counter_bug [INFERRED 0.85]
- **Camera Module Evolution Across Releases** — changelog_v020_cameras_module, changelog_v149_sorveglianza_card_fix, changelog_v149_camera_grid_layouts [INFERRED 0.85]
- **v1.4.8 Room Discovery and Pill Additions** — changelog_v148_seven_new_domains, changelog_v148_binary_sensor_status_pills, changelog_v148_three_sensor_pills, changelog_v148_pill_priority_cap, changelog_v148_device_power_wattage_inline [EXTRACTED 1.00]
- **panel_custom Name Mismatch Fix Lineage** — changelog_v021_panel_tag_derivation_fix, changelog_v140_panel_custom_name_selfcheck, changelog_v140_readme_second_copy_fix [INFERRED 0.85]
- **I cinque vincoli del templating trovati sul campo** — claude_style_attribute_literal_rule, claude_dynamic_src_href_points_rule, claude_casa_config_global_rule, claude_panel_custom_tag_derivation_rule, claude_ha_energy_flat_schema_rule [EXTRACTED 1.00]
- **Passi del workflow di orientamento a inizio sessione** — claude_session_orientation_workflow, claude_wiki_index, claude_graph_report, claude_graphify_query_command, claude_changelog [EXTRACTED 1.00]
- **Regole della sezione Release** — claude_release_config_location_rule, claude_version_cache_busting_rule, claude_tag_prefix_convention, claude_tag_not_release_rule, claude_hacs_release_visibility_note, claude_release_zip_asset_check [EXTRACTED 1.00]
- **Grammatica colori energia e i suoi token** — claude_energy_color_grammar_rule, claude_sage_color_token, claude_acc_color_token, claude_feed_color_token [EXTRACTED 1.00]
- **Regole di rigenerazione graphify prima del commit** — claude_pre_commit_graphify_regeneration_rule, claude_no_post_commit_hook_rule [EXTRACTED 1.00]
- **Sezioni che formano la README italiana** — readme_it_document, readme_it_what_this_is_and_isnt, readme_it_requirements, readme_it_install_hacs, readme_it_install_manual, readme_it_config_paths, readme_it_settings_panel, readme_it_energy_enabling, readme_it_energy_role_mapping, readme_it_energy_ring_reading, readme_it_irrigation, readme_it_weather_station, readme_it_vehicle, readme_it_appliances, readme_it_cameras, readme_it_kiosk_mode, readme_it_demo_mode, readme_it_known_limits, readme_it_more_section [INFERRED 0.85]
- **Sections forming the English README** — readme_document, readme_kofi_support, readme_what_this_is_and_isnt, readme_requirements, readme_install_hacs, readme_install_manual, readme_config_paths, readme_settings_panel, readme_energy_enabling, readme_energy_role_mapping, readme_utility_meter_helper, readme_energy_ring_reading, readme_irrigation, readme_weather_station, readme_vehicle, readme_appliances, readme_cameras, readme_kiosk_mode, readme_fully_kiosk_browser, readme_kiosk_mode_addon, readme_demo_mode, readme_known_limits, readme_area_registry_dependency, readme_room_domain_discovery, readme_more_section, readme_troubleshooting_link, readme_changelog_link, readme_config_example_link, readme_panel_custom, readme_module_url_cache_busting, readme_mobile_page [INFERRED 0.85]
- **Camera-related troubleshooting cluster** — troubleshooting_camera_tile_icon_only, troubleshooting_camera_hide_until_tap, troubleshooting_black_camera_overlay, troubleshooting_surveillance_tab_missing [INFERRED 0.75]
- **Entity registry state (disabled_by/hidden_by/area_id) drives multiple troubleshooting symptoms** — troubleshooting_rooms_empty, troubleshooting_auto_discovery_filters, troubleshooting_entity_missing, troubleshooting_surveillance_tab_missing [INFERRED 0.75]
- **config.js opt-in sections whose absence explains missing UI** — troubleshooting_whole_section_missing, troubleshooting_too_many_rooms, troubleshooting_energy_charts_wrong [INFERRED 0.65]
- **Diagnostica panel (v1.5.1): energy/config/environment self-diagnosis** — public_dash_neumo_diagenergyinstant, public_dash_neumo_diagenergydaily, public_dash_neumo_diagenvironment, public_dash_neumo_rendervals_diagnosticspanel, public_dash_neumo_diagnostica_markup, public_dash_neumo_loaduserconfig, public_dash_neumo_resolveenergydaily, prefs_js [INFERRED 0.85]
- **Settings panel (v1.5.0): hide/reorder rooms, entities, cameras, sections** — public_dash_neumo_settings_set_room, public_dash_neumo_settings_clear_room, public_dash_neumo_settings_move_room, public_dash_neumo_settings_set_entity, public_dash_neumo_settings_clear_entity, public_dash_neumo_settings_set_camera, public_dash_neumo_settings_clear_camera, public_dash_neumo_settings_toggle_tapgate, public_dash_neumo_settings_set_module, public_dash_neumo_settings_reset, public_dash_neumo_settings_long_hide, public_dash_neumo_save_prefs, public_dash_neumo_prefs, public_dash_neumo_config_hidden, public_dash_neumo_rendervals_settingspanel, public_dash_neumo_settingspanel_markup, public_dash_neumo_all_rooms_result, public_dash_neumo_all_cameras_result [INFERRED 0.85]
- **Energy daily-total resolution: config.js -> HA energy prefs -> auto-discovery** — public_dash_neumo_resolveenergydaily, public_dash_neumo_loadhistory, public_dash_neumo_diagenergydaily, public_dash_neumo_rendervals, discovery_js, ha_backend_js [INFERRED 0.75]
- **_boot(): script loading, backend connect, config/energy resolution** — public_dash_neumo_boot, public_dash_neumo_loadscript, public_dash_neumo_bust, public_dash_neumo_loaduserconfig, public_dash_neumo_mergeconfig, public_dash_neumo_resolveenergydaily, public_dash_neumo_loadhistory, discovery_js, ha_backend_js, ha_backend_demo_js, ha_backend_panel_js, i18n_js, prefs_js [EXTRACTED 1.00]
- **Mobile settings-panel preference mutation methods (v1.5.0)** — public_dash_neumo_mobile_prefs, public_dash_neumo_mobile_save_prefs, public_dash_neumo_mobile_settings_set_room, public_dash_neumo_mobile_settings_clear_room, public_dash_neumo_mobile_settings_move_room, public_dash_neumo_mobile_settings_set_entity, public_dash_neumo_mobile_settings_clear_entity, public_dash_neumo_mobile_settings_set_camera, public_dash_neumo_mobile_settings_clear_camera, public_dash_neumo_mobile_settings_toggle_tapgate, public_dash_neumo_mobile_settings_set_module, public_dash_neumo_mobile_settings_reset, public_dash_neumo_mobile_settings_long_hide [INFERRED 0.85]
- **Mobile diagnostics panel data sources (v1.5.1)** — public_dash_neumo_mobile_diagenergyinstant, public_dash_neumo_mobile_diagenergydaily, public_dash_neumo_mobile_diagenvironment, public_dash_neumo_mobile__resolveenergydaily, public_dash_neumo_mobile_loaduserconfig, public_dash_neumo_mobile_rendervals [INFERRED 0.80]

## Communities (49 total, 15 thin omitted)

### Community 0 - "DCLogic Component Runtime"
Cohesion: 0.07
Nodes (51): boot(), cdnScriptFor(), collectProps(), compileAttr(), compileTemplate(), contentKey(), createComponentFactory(), createHelmetManager() (+43 more)

### Community 1 - "Settings Panel Visibility Core"
Cohesion: 0.08
Nodes (59): discovery.js (window.CasaDiscovery), prefs.js (window.CasaPrefs), Component.ALARM(id), Component.ALL_CAMERAS_RESULT(), Component.ALL_ROOMS_RESULT(), Component.applianceItems(roomId), Component.applianceState(a), Component._bindAttr(name, value) (+51 more)

### Community 2 - "Energy Ring & Setup Evolution"
Cohesion: 0.08
Nodes (34): panel.js Tag Derivation Fix, v0.2.1 Release, Zero-Areas Empty-State Guidance, Grid Figure Inline Tooltip, Mobile Energia Duplicate Tile Fix, v1.0.0 Release, Concentric Rings Redesign, config.energy.consumptionToday (+26 more)

### Community 3 - "Backend Bridge & Component Boot"
Cohesion: 0.10
Nodes (30): ha-backend-demo.js (window.CasaBackendDemo), ha-backend.js (window.CasaBackend), ha-backend-panel.js, i18n/en.js, i18n/it.js, i18n.js (window.CasaI18n), Component._boot(), bust(src) (+22 more)

### Community 4 - "Early Release Modules & i18n"
Cohesion: 0.09
Nodes (29): Demo Mode, First Public Release, Italian/English UI, Optional Modules (Energy/Irrigation/Vehicle), v0.1.0 Release, Cameras Module, v0.2.0 Release, Irrigation Timed Watering via Buttons (+21 more)

### Community 5 - "Home Assistant Panel Bridge"
Cohesion: 0.13
Nodes (9): CasaPanel, fetchDailyCounterHistory(), fetchDailyLastSample(), fetchHistory(), fetchRawHistory(), fetchTodayStatsDelta(), FOLDER_NAME, isoDay() (+1 more)

### Community 6 - "CLAUDE.md Project Constraints"
Cohesion: 0.08
Nodes (27): --acc: prelievo (famiglia terracotta = rete), window.CASA_CONFIG come global (import() bloccato su file://), CHANGELOG.md (voce più recente), console.log non esiste per utenti su companion app/tablet: serve diagnostica visibile in dashboard, src/href/points dinamici via ref callback dopo il mount, Grammatica colori energia non negoziabile (anello e barre coerenti), --feed: immissione (salvia schiarita), graphify-out/GRAPH_REPORT.md (+19 more)

### Community 7 - "README Install & Module Docs"
Cohesion: 0.13
Nodes (21): Result only as good as area assignments (HA area registry dependency), Cameras (optional, auto-discovery, previews, live-on-tap, hideUntilTap), Configuring the rest (config.js search order), Demo mode (?demo, file:// fallback, DEMO badge), Installation via HACS, Manual installation, Telecamere (opzionale, auto-discovery, anteprime, live al tap, hideUntilTap), Configurare il resto (ordine di ricerca config.js) (+13 more)

### Community 8 - "Entity Auto-Discovery"
Cohesion: 0.19
Nodes (14): buildExportedConfig(), collectConfiguredEntities(), discoverAllOfDomain(), discoverCameras(), discoverEnergyEntities(), discoverPeople(), discoverRooms(), discoverWeather() (+6 more)

### Community 9 - "Troubleshooting Guide"
Cohesion: 0.11
Nodes (19): Alarm card has no buttons, or fewer than expected, Areas never assigned (no naming/grouping fallback), Auto-discovery filters: disabled_by / hidden_by / entity_category, area_id inheritance, Live camera overlay is a black/broken image, config.cameras.hideUntilTap (tap-to-reveal still), Camera tile only ever shows an icon, never a preview, Energy charts empty or look wrong, Energy diagnostics blocks: instantaneous values / daily totals, daily-counter vs lifetime-cumulative sensor mismatch (+11 more)

### Community 10 - "v1.4.7 Energy Fixes & Diagnostics Origin"
Cohesion: 0.24
Nodes (15): Reddit Report: Empty Energy Tab, v1.4.7 Release, Trend Chart Zero-Height Bars Fix, Zero-Config Energy Tab Fix, Config Diagnostics Section, Copy Diagnostics Button, Diagnostics Panel, Energy Daily Totals Diagnostics (+7 more)

### Community 11 - "Settings Panel v1.5.0 Overrides"
Cohesion: 0.31
Nodes (14): Cameras Hide/Privacy Settings, entities.hide/cameras.hide/modules.hide Config Keys, Differs From config.js Pill, Entities Visibility Panel, Export as config.js, Facebook Group Visibility Reports, frontend/set_user_data Persistence, Long-Press/Right-Click Hide Gesture (+6 more)

### Community 12 - "Casa Dashboard Screenshot"
Cohesion: 0.25
Nodes (11): Casa Dashboard Screenshot, Allarme (Alarm) Card, Double-Ring Energy Gauge (7,6 kWh), Autoconsumo Tile (6,2 kWh), Dalla Rete Tile (1,4 kWh), Immessi in Rete Tile (3,6 kWh), Three-Tile Compact Energy Legend, Fotovoltaico Compact Card Layout (+3 more)

### Community 13 - "prefs.js Persistence & Diagnostics Text"
Cohesion: 0.27
Nodes (8): diagRowLine(), diagText(), load(), padCol(), readLocal(), save(), writeLocal(), createExternalModules()

### Community 14 - "v1.4.8 Room Tile & Pill Fixes"
Cohesion: 0.36
Nodes (9): Binary Sensor Status Pills, Switch Inline Wattage Display, Room Card Pill Cap and Priority Order, Reddit Report: Dwains Dashboard Comparison, v1.4.8 Release, Room Tile Stretch Fix, rooms.max Default Change (8 to 12), Rooms min-content Sizing (+1 more)

### Community 15 - "Energy Ring Reading Docs"
Cohesion: 0.43
Nodes (7): Enabling Energy (auto-discovery / HA Energy dashboard mapping), Reading the ring (Fotovoltaico double ring: autoconsumo/prelievo/immissione), Energy sensor role mapping table (Huawei/SolarEdge/Fronius/Shelly/HA), Attivare l'Energia (auto-discovery / mappatura Energy Dashboard HA), Come si legge l'anello (doppio anello Fotovoltaico: autoconsumo/prelievo/immissione), Tabella mappatura ruoli sensori energia (Huawei/SolarEdge/Fronius/Shelly/HA), utility_meter helper (Home Assistant integration)

### Community 16 - "Mobile Dashboard View"
Cohesion: 0.40
Nodes (6): Cose Accese Adesso (Active Devices List), Bottom Navigation Bar (Casa/Stanze/Irrigazione/Energia/Auto/Meteo), Modalità Casa (Home Mode Selector), Mobile Dashboard View (Screenshot), Chi è in Casa (Presence Tracker), Weather Widget (19°, Sunny)

### Community 17 - "Demo Backend Mock"
Cohesion: 0.53
Nodes (4): buildRegistries(), cloneStates(), connect(), rand()

### Community 18 - "Energy Prefs Test Suite"
Cohesion: 0.33
Nodes (3): __dirname, sandbox, src

### Community 19 - "v1.3.x Config Location Changes"
Cohesion: 0.50
Nodes (5): config/www Persistent Config Location, HACS Support, v1.3.0 Release, Example Config File Rename, v1.3.1 Release

### Community 20 - "Diagnostics & Troubleshooting Cross-Links"
Cohesion: 0.70
Nodes (5): CHANGELOG.md, live_dashboard_config.example.js, Altro (diagnostica, link), More (diagnostics, links), TROUBLESHOOTING.md

### Community 21 - "v1.4.6 Card Shadow Fix"
Cohesion: 0.83
Nodes (4): Card Shadow Clip Fix, Root Container Padding Increase, Reddit Report: Clipped Card Shadows, v1.4.6 Release

### Community 22 - "Camera Overlay Close Handler"
Cohesion: 0.67
Nodes (4): Component._closeCam(), Component._closeCam(), Component._openCam(id), Component._openCam(id)

### Community 24 - "Kiosk Mode Docs"
Cohesion: 0.83
Nodes (4): Fully Kiosk Browser, Modalità kiosk per il tablet a muro, Kiosk mode for the wall tablet, kiosk-mode (HACS add-on by NemesisRE)

### Community 25 - "Irrigation & Weather Station Docs"
Cohesion: 0.67
Nodes (4): Enabling Irrigation (moisture, valve, buttons, agronomic fields), Attivare l'Irrigazione (moisture, valve, buttons, campi agronomici), Stazione meteo (opzionale, config.weatherStation), Weather station (optional, config.weatherStation)

### Community 26 - "Release Zip & Attach Job"
Cohesion: 0.67
Nodes (3): Attach to Release Step, Build live_dashboard.zip Step, HACS zip_release content_in_root Convention

### Community 27 - "README Header Banner"
Cohesion: 1.00
Nodes (3): Live Dashboard README Header Banner, Home Assistant, Live Dashboard

### Community 28 - "Energia Dashboard View"
Cohesion: 1.00
Nodes (3): Energia Dashboard View, Live Power KPI Cards (Produzione/Consumo/Prelievo), Produzione e Prelievo Bar Chart

### Community 29 - "Irrigazione Dashboard View"
Cohesion: 1.00
Nodes (3): Irrigazione (Irrigation) Dashboard View, Zona 1 Irrigation Card, Zona 2 Irrigation Card

### Community 32 - "README Overview & Support"
Cohesion: 0.67
Nodes (3): Live Dashboard README (overview), Live Dashboard README italiana (panoramica), Support this project (Ko-fi)

## Knowledge Gaps
- **62 isolated node(s):** `FOLDER_NAME`, `__dirname`, `src`, `sandbox`, `zip-and-attach Release Job` (+57 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Optional Modules (Energy/Irrigation/Vehicle)` connect `Early Release Modules & i18n` to `Energy Ring & Setup Evolution`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Component._boot()` (e.g. with `Component.diagEnvironment()` and `Component._boot()`) actually correct?**
  _`Component._boot()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `FOLDER_NAME`, `__dirname`, `src` to the rest of the system?**
  _62 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `DCLogic Component Runtime` be split into smaller, more focused modules?**
  _Cohesion score 0.06845238095238096 - nodes in this community are weakly interconnected._
- **Should `Settings Panel Visibility Core` be split into smaller, more focused modules?**
  _Cohesion score 0.08361581920903954 - nodes in this community are weakly interconnected._
- **Should `Energy Ring & Setup Evolution` be split into smaller, more focused modules?**
  _Cohesion score 0.08021390374331551 - nodes in this community are weakly interconnected._
- **Should `Backend Bridge & Component Boot` be split into smaller, more focused modules?**
  _Cohesion score 0.09885057471264368 - nodes in this community are weakly interconnected._
# Graph Report - .  (2026-11-06)

## Corpus Check
- 30 files · ~126,014 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 591 nodes · 1155 edges · 48 communities (41 shown, 7 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 80 edges (avg confidence: 0.83)
- Token cost: 426,475 input · 0 output

## Community Hubs (Navigation)
- Desktop Component Core
- support.js Runtime
- CasaPanel Host Bridge
- Desktop Boot and Cameras
- Energy Power Derivation
- Registry Discovery
- Mobile Boot and Runtime Loading
- Settings Prefs Handlers
- Cameras and Vendored Runtime
- prefs.js Persistence
- Energy Schema and Irrigation History
- Diagnostica Panel
- Templating Constraints
- Release and Repo Rules
- Energy Ring and Colors
- Energy Roles and Troubleshooting
- v1.8.1 Service Call Outcomes
- Settings Panel Layer
- Compact Energy Legend
- README Features Overview
- v1.6.0 Empty States and Scenarios
- Visibility Filters
- Demo Backend
- Settings Tabs and Density
- Service Calls and Irrigation
- Discovery Scope and Limits
- Installation and Config Paths
- Per-User Settings and Layout
- Cache Busting Chain
- Diagnostica Environment
- Mobile Screenshot
- Energy Prefs Test
- Irrigation and Weather Station
- Release Zip Workflow
- README Header Banner
- Energia View Screenshot
- Irrigazione View Screenshot
- Panel Backend Bridge
- App Icon 256
- Release Job
- App Icon 512
- Transparent App Icon
- Vehicle Module
- Demo Scenario Table

## God Nodes (most connected - your core abstractions)
1. `Component (extends DCLogic)` - 78 edges
2. `renderVals()` - 75 edges
3. `renderVals()` - 63 edges
4. `CHANGELOG` - 35 edges
5. `PREFS()` - 25 edges
6. `PREFS()` - 23 edges
7. `CasaPanel` - 21 edges
8. `_boot()` - 18 edges
9. `SAVE_PREFS()` - 18 edges
10. `SAVE_PREFS()` - 16 edges

## Surprising Connections (you probably didn't know these)
- `HA energy schema flat for grid (stat_energy_from top level)` --semantically_similar_to--> `Grid source sensors directly on the source (flat shape)`  [INFERRED] [semantically similar]
  CLAUDE.md → CHANGELOG.md
- `Dynamic src/href/points via ref callback after mount` --semantically_similar_to--> `Placeholder src/href/points set after mount`  [INFERRED] [semantically similar]
  CLAUDE.md → CHANGELOG.md
- `User config in config/www/live_dashboard_config.js` --semantically_similar_to--> `config/www/live_dashboard_config.js location`  [INFERRED] [semantically similar]
  CLAUDE.md → CHANGELOG.md
- `panel_custom tag derived from folder (<cartella>-panel)` --semantically_similar_to--> `Folder-derived custom element tag (<folder>-panel)`  [INFERRED] [semantically similar]
  CLAUDE.md → CHANGELOG.md
- `plugStatus()` --calls--> `classifySwitchPower()`  [EXTRACTED]
  public/dash_neumo_mobile.html → public/discovery.js

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **User-visible diagnostics instead of console-only logs** — claude_diagnostics_visible_rule, changelog_diagnostics_panel, changelog_discard_reasons_diag, changelog_recent_actions_ring_buffer, changelog_react_runtime_diag_row, changelog_embed_iframe_diag_row [INFERRED 0.85]
- **Shared sage/terracotta energy color grammar across ring, bars, strip** — claude_energy_role_colors, changelog_double_ring, changelog_hourly_ring_strip, changelog_energy_chart_colors_fix [INFERRED 0.85]
- **Templating pitfalls found in the field** — claude_style_literal, claude_dynamic_src_href_points, claude_sc_if_dual_placeholder, changelog_placeholder_src_fix [INFERRED 0.75]
- **Install and config placement flow** — readme_hacs_installation, readme_manual_installation, readme_folder_derived_panel_tag, readme_module_url_cache_busting, readme_live_dashboard_config_js, readme_config_lookup_order [EXTRACTED 1.00]
- **Energy role resolution and ring derivation** — readme_ha_energy_dashboard_mapping, readme_energy_roles, readme_derived_house_consumption, readme_battery_sign_toggle, readme_fotovoltaico_double_ring, readme_autoconsumo, readme_single_ring_fallback [EXTRACTED 1.00]
- **Camera previews, live layers, privacy and tab** — readme_cameras, readme_layered_live_camera, readme_hide_until_tap, readme_surveillance_tab, readme_panel_custom [EXTRACTED 1.00]
- **Camera stream fallback flow** — public_dash_neumo__opencam, public_dash_neumo__camstartstream, public_dash_neumo__ensurehlsjs, public_dash_neumo__attachhlsjs, public_dash_neumo__camstartfastpoll [EXTRACTED 1.00]
- **Settings handlers -> SAVE_PREFS -> CasaPrefs persistence** — public_dash_neumo_settings_set_room, public_dash_neumo_settings_set_entity, public_dash_neumo_settings_set_module, public_dash_neumo_settings_move_section, public_dash_neumo_save_prefs, public_dash_neumo_prefs [EXTRACTED 1.00]
- **Data sources feeding Diagnostica panel** — public_dash_neumo_loaduserconfig, public_dash_neumo__resolveenergydaily, public_dash_neumo_diagenvironment, public_dash_neumo_action_log, public_dash_neumo_casa_react_source, public_dash_neumo_diagnostica_panel [INFERRED 0.85]
- **Irrigation auto-close flow (v1.8.1)** — public_dash_neumo_mobile_runvalve, public_dash_neumo_mobile_checkirrigationends, public_dash_neumo_mobile_loadirrigationends, public_dash_neumo_mobile_irrigation_ends, public_dash_neumo_mobile_irrigation_closing, public_dash_neumo_mobile_call [EXTRACTED 1.00]
- **Battery sign convention detection (v1.6.0)** — public_dash_neumo_mobile_deriveconsumption, public_dash_neumo_mobile_samplebatterysign, public_dash_neumo_mobile_batterysignverdict, public_dash_neumo_mobile_batterypowersign, public_dash_neumo_mobile_settings_set_battery_sign, public_dash_neumo_mobile_settingsproblemtab [EXTRACTED 1.00]
- **Camera layered live view (v1.5.4)** — public_dash_neumo_mobile_opencam, public_dash_neumo_mobile_camstartstream, public_dash_neumo_mobile_ensurehlsjs, public_dash_neumo_mobile_attachhlsjs, public_dash_neumo_mobile_camstartfastpoll, public_dash_neumo_mobile_cam_diag [EXTRACTED 1.00]

## Communities (48 total, 7 thin omitted)

### Community 0 - "Desktop Component Core"
Cohesion: 0.06
Nodes (89): _actionLog (recent actions, max 20), Action toast (v1.8.1), ALARM(), ALARM_ID(), ALL_CAMERAS_RESULT(), ALL_ROOMS_RESULT(), applianceItems(), applianceState() (+81 more)

### Community 1 - "support.js Runtime"
Cohesion: 0.07
Nodes (52): boot(), cdnScriptFor(), collectProps(), compileAttr(), compileTemplate(), contentKey(), createComponentFactory(), createExternalModules() (+44 more)

### Community 2 - "CasaPanel Host Bridge"
Cohesion: 0.13
Nodes (10): CasaPanel, fetchDailyCounterHistory(), fetchDailyLastSample(), fetchHistory(), fetchHourlyEnergy(), fetchRawHistory(), fetchTodayStatsDelta(), FOLDER_NAME (+2 more)

### Community 3 - "Desktop Boot and Cameras"
Cohesion: 0.12
Nodes (25): _attachHlsJs(), _boot(), _camStartFastPoll(), _camStartStream(), _camStopFastPoll(), _closeCam(), _ensureHlsJs(), _loadHourlyEnergy() (+17 more)

### Community 4 - "Energy Power Derivation"
Cohesion: 0.14
Nodes (20): _panelLpDown(), _panelLpMenu(), _settingsProblemTab(), ALARM(), ALARM_ID(), batteryPowerSign(), batterySignVerdict(), Cover position band (+12 more)

### Community 5 - "Registry Discovery"
Cohesion: 0.18
Nodes (22): _resolveEnergyDaily(), applyEntityVisibility(), classifySwitchPower(), collectConfiguredEntities(), collectConfiguredEntityModules(), discoverAlarm(), discoverAllOfDomain(), discoverCameras() (+14 more)

### Community 6 - "Mobile Boot and Runtime Loading"
Cohesion: 0.13
Nodes (20): ASSET_V (?v= cache-bust version), _boot(), bust(), window.CASA_REACT_SOURCE, CONFIG_PATHS (/local/live_dashboard_config.js first), DEFAULT_CONFIG, energyDiag (daily energy source resolution), _ensureHlsJs() (+12 more)

### Community 7 - "Settings Prefs Handlers"
Cohesion: 0.16
Nodes (20): PREFS(), SAVE_PREFS(), SECTION_ORDER(), SETTINGS_CLEAR_CAMERA(), SETTINGS_CLEAR_ENTITY(), SETTINGS_CLEAR_ROOM(), SETTINGS_LONG_HIDE(), SETTINGS_MOVE_ROOM() (+12 more)

### Community 8 - "Cameras and Vendored Runtime"
Cohesion: 0.15
Nodes (19): Adaptive multi-camera home card (motion-first), Alarm panel auto-discovery, Alarm PIN awareness (code_format), Appliances module (config.appliances), Cameras module (Sorveglianza), Google Fonts (Caprasimo, Figtree), Open question: vendor hls.js, Three-layer live camera strategy (HLS native, hls.js, fast poll) (+11 more)

### Community 9 - "prefs.js Persistence"
Cohesion: 0.18
Nodes (17): _checkIrrigationEnds(), _irrigationClosing Set (double turn_off guard), state.irrigationEnds (persisted valve end-times), _loadIrrigationEnds(), copyToClipboard(), diagRowLine(), diagText(), exportText() (+9 more)

### Community 10 - "Energy Schema and Irrigation History"
Cohesion: 0.14
Nodes (16): CHANGELOG, Grid source sensors directly on the source (flat shape), Irrigation zones via input_button buttons, Irrigation state from the valve entity, Sum every energy entry per role, Root padding matches neumorphic shadow reach, stroke-linecap butt for near-zero ring segments, v0.3.0 — Irrigation buttons (+8 more)

### Community 11 - "Diagnostica Panel"
Cohesion: 0.25
Nodes (14): Exclude config.js-referenced entities from generic room lists, Copy diagnostics button, Diagnostics panel (Diagnostica), Diagnostica · N entità non mostrate (discard reasons), discoverRooms(), Duplicate serial number warning, HA 2026.9.0 Matter duplicate-device re-registration, Lifetime counter mistaken for daily check (+6 more)

### Community 12 - "Templating Constraints"
Cohesion: 0.16
Nodes (14): [data-sel] selected state with !important, Folder-derived custom element tag (<folder>-panel), panel_custom name: mismatch self-check, Placeholder src/href/points set after mount, v0.2.1 — Folder-derived panel tag, v1.0.1 — data-sel !important, v1.4.2 — Placeholder src/href console errors, Dynamic src/href/points via ref callback after mount (+6 more)

### Community 13 - "Release and Repo Rules"
Cohesion: 0.21
Nodes (13): config/www/live_dashboard_config.js location, live_dashboard_config.example.js rename, HACS support (category Dashboard), v1.3.0 — HACS support, v1.3.1 — Example config rename, CLAUDE.md — project instructions, Regenerate graphify-out/ in the same commit, live_dashboard.zip release asset (+5 more)

### Community 14 - "Energy Ring and Colors"
Cohesion: 0.22
Nodes (13): Cover real-position striped band, Double concentric energy ring, Energy chart colors aligned with ring + export bar, energy/get_prefs (HA Energy dashboard prefs), Hourly ring strip (24 stacked bars), recorder/statistics_during_period (period hour), v1.4.0 — Double ring, energy/get_prefs, v1.4.5 — Compact solar card values, chart colors, export bar (+5 more)

### Community 15 - "Energy Roles and Troubleshooting"
Cohesion: 0.21
Nodes (13): Autoconsumo (self-consumption), Battery power sign toggle, Derived house consumption, Energy sensor roles, Energy view, Fotovoltaico double ring, HA Energy dashboard mapping, Instantaneous power unit normalization (+5 more)

### Community 16 - "v1.8.1 Service Call Outcomes"
Cohesion: 0.29
Nodes (11): call() single service-call choke point, Demo scenario ?demo&scenario=call-timeout, Room panel climate row made flat (not a button), Diagnostica > Ambiente > embed_iframe (panel_custom) row, Error/timeout toast, ha-backend-panel.js (15s timeout), Irrigation auto-close deadline in frontend/user_data, Diagnostica > Irrigazione deadline rows (+3 more)

### Community 17 - "Settings Panel Layer"
Cohesion: 0.25
Nodes (11): Demo mode (file:// or ?demo), Export as config.js (window.CASA_CONFIG block), frontend/set_user_data persistence with localStorage fallback, Home section order (sections.order), Italian/English UI from hass.language, Long-press (600ms) to hide entity, Settings panel (visibility/order layer), v0.1.0 — First public release (+3 more)

### Community 18 - "Compact Energy Legend"
Cohesion: 0.25
Nodes (11): Casa Dashboard Screenshot, Allarme (Alarm) Card, Double-Ring Energy Gauge (7,6 kWh), Autoconsumo Tile (6,2 kWh), Dalla Rete Tile (1,4 kWh), Immessi in Rete Tile (3,6 kWh), Three-Tile Compact Energy Legend, Fotovoltaico Compact Card Layout (+3 more)

### Community 19 - "README Features Overview"
Cohesion: 0.22
Nodes (11): Camera auto-discovery, Demo mode (?demo), Settings → Diagnostica, hideUntilTap camera privacy, Live Dashboard README (Italian), Layered camera live view (HLS, hls.js, still polling), Live Dashboard README, No build step, plain ES modules (+3 more)

### Community 20 - "v1.6.0 Empty States and Scenarios"
Cohesion: 0.29
Nodes (10): Battery sign self-diagnosis with one-tap invert, Demo data scenarios (?demo&scenario=...), House consumption derived automatically, energy.gridNote mixed instant/daily fix, ha-backend-demo.js (SEED, DEMO_CONFIG), Self-explanatory empty states (Go to Areas, missing energy ID), Single-ring energy fallback, v1.6.0 — Derived house consumption, demo scenarios (+2 more)

### Community 21 - "Visibility Filters"
Cohesion: 0.29
Nodes (10): _bindAttr(), applianceItems(), applianceState(), CONFIG_HIDDEN(), ENTITY_HIDDEN_SET(), MODULE_VISIBLE(), User prefs layered over config hide lists, ROOMS_RESULT() (+2 more)

### Community 22 - "Demo Backend"
Cohesion: 0.29
Nodes (6): buildRegistries(), cloneStates(), connect(), patchConfig(), rand(), scenarioConfig()

### Community 23 - "Settings Tabs and Density"
Cohesion: 0.29
Nodes (8): Instantaneous power unit setting (Auto/W/kW), powerVal() helper, Room status pills (binary_sensor, sensor classes), Room tiles sized min-content, rooms.max 12, Settings tabs (Stanze · Energia · Telecamere · Diagnostica), v1.4.8 — Room tiles min-content, more domains, v1.5.3 — Power units, settings tabs, Density before one-screen fit (44px targets, 10px text)

### Community 24 - "Service Calls and Irrigation"
Cohesion: 0.29
Nodes (8): _checkIrrigationEnds(), _loadIrrigationEnds(), _showActionToast(), Recent actions log (_actionLog / diagActionRows), Action failure toast, call(), cover(), runValve()

### Community 25 - "Discovery Scope and Limits"
Cohesion: 0.29
Nodes (8): Alarm panel auto-discovery via supported_features, Appliances (config.appliances), CHANGELOG.md, Known limits, Lovelace (not replaced), Registry-based auto-discovery, Room domains and sensor pills, Smart plug three-level state

### Community 26 - "Installation and Config Paths"
Cohesion: 0.32
Nodes (8): Config file lookup order, Folder-derived panel tag (<folder>-panel), HACS installation, live_dashboard_config.example.js, config/www/live_dashboard_config.js, Manual installation, module_url ?v= cache busting, panel_custom panel

### Community 27 - "Per-User Settings and Layout"
Cohesion: 0.25
Nodes (8): Differs from config.js pill, Export as config.js, frontend/user_data storage, Home section order (sections.order), Kiosk mode for the wall tablet, Mobile layout (dash_neumo_mobile.html), Settings panel (gear, per-user storage), Wall tablet landscape-first design

### Community 28 - "Cache Busting Chain"
Cohesion: 0.43
Nodes (7): Cover slider long-press / NaN position fix, dash_neumo.html, dash_neumo_mobile.html, loadScript() reuses page ?v= (ASSET_VERSION), v1.1.1 — Script cache-bust chain, v1.5.2 — Cover slider long-press fix, Single VERSION in public/panel.js for cache-busting

### Community 29 - "Diagnostica Environment"
Cohesion: 0.33
Nodes (7): ALL_CAMERAS_RESULT(), ALL_ROOMS_RESULT(), window.CASA_REACT_SOURCE, Component (DCLogic), diagEnvironment(), dash_neumo.html (desktop dashboard), Vendored React 18.3.1 (vendor/react*.js)

### Community 30 - "Mobile Screenshot"
Cohesion: 0.40
Nodes (6): Cose Accese Adesso (Active Devices List), Bottom Navigation Bar (Casa/Stanze/Irrigazione/Energia/Auto/Meteo), Modalità Casa (Home Mode Selector), Mobile Dashboard View (Screenshot), Chi è in Casa (Presence Tracker), Weather Widget (19°, Sunny)

### Community 31 - "Energy Prefs Test"
Cohesion: 0.33
Nodes (3): __dirname, sandbox, src

### Community 32 - "Irrigation and Weather Station"
Cohesion: 0.67
Nodes (4): Irrigation input_button durations, Irrigation view, Valve timed close deadline, Weather station (config.weatherStation)

### Community 33 - "Release Zip Workflow"
Cohesion: 0.67
Nodes (3): Attach to Release Step, Build live_dashboard.zip Step, HACS zip_release content_in_root Convention

### Community 34 - "README Header Banner"
Cohesion: 1.00
Nodes (3): Live Dashboard README Header Banner, Home Assistant, Live Dashboard

### Community 35 - "Energia View Screenshot"
Cohesion: 1.00
Nodes (3): Energia Dashboard View, Live Power KPI Cards (Produzione/Consumo/Prelievo), Produzione e Prelievo Bar Chart

### Community 36 - "Irrigazione View Screenshot"
Cohesion: 1.00
Nodes (3): Irrigazione (Irrigation) Dashboard View, Zona 1 Irrigation Card, Zona 2 Irrigation Card

## Ambiguous Edges - Review These
- `Energy chart colors aligned with ring + export bar` → `Verify presentation changes by looking (screenshot/DOM)`  [AMBIGUOUS]
  CLAUDE.md · relation: conceptually_related_to
- `[data-sel] selected state with !important` → `Literal style= attribute (property:{{ value }})`  [AMBIGUOUS]
  CLAUDE.md · relation: conceptually_related_to

## Knowledge Gaps
- **51 isolated node(s):** `FOLDER_NAME`, `__dirname`, `src`, `sandbox`, `zip-and-attach Release Job` (+46 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Energy chart colors aligned with ring + export bar` and `Verify presentation changes by looking (screenshot/DOM)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `[data-sel] selected state with !important` and `Literal style= attribute (property:{{ value }})`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `dash_neumo_mobile.html (phone layout)` connect `Mobile Boot and Runtime Loading` to `Desktop Component Core`, `CasaPanel Host Bridge`, `Diagnostica Environment`?**
  _High betweenness centrality (0.152) - this node is a cross-community bridge._
- **Why does `Component (extends DCLogic)` connect `Desktop Component Core` to `prefs.js Persistence`, `Registry Discovery`, `Mobile Boot and Runtime Loading`?**
  _High betweenness centrality (0.137) - this node is a cross-community bridge._
- **Why does `renderVals()` connect `Energy Power Derivation` to `Desktop Boot and Cameras`, `Settings Prefs Handlers`, `Visibility Filters`, `Service Calls and Irrigation`, `Diagnostica Environment`?**
  _High betweenness centrality (0.119) - this node is a cross-community bridge._
- **What connects `FOLDER_NAME`, `__dirname`, `src` to the rest of the system?**
  _51 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Desktop Component Core` be split into smaller, more focused modules?**
  _Cohesion score 0.06307456588355465 - nodes in this community are weakly interconnected._
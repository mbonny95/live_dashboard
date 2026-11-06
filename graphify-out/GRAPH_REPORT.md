# Graph Report - .  (2026-11-06)

## Corpus Check
- 34 files · ~130,469 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 581 nodes · 1034 edges · 46 communities (38 shown, 8 thin omitted)
- Extraction: 88% EXTRACTED · 12% INFERRED · 0% AMBIGUOUS · INFERRED: 127 edges (avg confidence: 0.78)
- Token cost: 375,949 input · 0 output

## Community Hubs (Navigation)
- support.js Runtime
- Desktop Component Logic
- README Features Overview
- Boot and Prefs
- Shared Component Methods
- Mobile Boot and Vendored Runtime
- CasaPanel Host Bridge
- Registry Discovery
- Irrigation Timed Close and Blueprint
- Troubleshooting and Layout Density
- Early Releases 0.x
- Energy Prefs Mapping Releases
- v1.9.0 Offline and Tests
- Compact Energy Legend
- Camera Live Layers
- Demo Backend
- Energy Role Colors and Ring
- Discovery Config Exclusions
- v1.6.0 Empty States and Scenarios
- Service Calls and Diagnostica
- HACS and Release Rules
- Settings Write Path
- Alarm PIN Pad
- Settings Panel and Persistence
- Panel Tag and Cache Busting
- Templating Constraints
- Project Instructions
- Mobile Screenshot
- Energy Prefs Test
- Power Units and Cover Fix
- Discovery Tests
- Energy Tab Fixes
- Release Zip Workflow
- README Header Banner
- Energia View Screenshot
- Irrigazione View Screenshot
- Panel Backend Bridge
- Asset Tests
- App Icon 256
- Release Job
- App Icon 512
- Transparent App Icon
- Demo Scenario Bar

## God Nodes (most connected - your core abstractions)
1. `Component.renderVals()` - 36 edges
2. `CHANGELOG` - 35 edges
3. `renderVals()` - 31 edges
4. `Live Dashboard README` - 22 edges
5. `CasaPanel` - 21 edges
6. `dash_neumo_mobile.html (phone layout)` - 21 edges
7. `TROUBLESHOOTING` - 18 edges
8. `v1.9.0` - 15 edges
9. `_boot()` - 15 edges
10. `Component._boot()` - 15 edges

## Surprising Connections (you probably didn't know these)
- `Verify presentation changes by looking (screenshot/DOM)` --conceptually_related_to--> `v1.4.5`  [AMBIGUOUS]
  CLAUDE.md → CHANGELOG.md
- `Diagnostica copy sheet (diagText textarea)` --references--> `diagText()`  [INFERRED]
  public/dash_neumo_mobile.html → public/prefs.js
- `Dynamic src/href/points via ref callback after mount` --semantically_similar_to--> `Deferred src/href/points binding after mount`  [INFERRED] [semantically similar]
  CLAUDE.md → CHANGELOG.md
- `panel_custom tag derived from folder (<cartella>-panel)` --semantically_similar_to--> `Folder-derived panel tag (<folder>-panel)`  [INFERRED] [semantically similar]
  CLAUDE.md → CHANGELOG.md
- `HA energy schema flat for grid (stat_energy_from top level)` --semantically_similar_to--> `Flat grid source schema (stat_energy_from at top level)`  [INFERRED] [semantically similar]
  CLAUDE.md → CHANGELOG.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **User-visible diagnostics instead of console-only logs** — claude_diagnostics_visible_rule, changelog_diagnostics_panel, changelog_discard_reason_logging, changelog_call_service_choke_point, changelog_diagnostica_runtime_react_row, changelog_embed_iframe_diag_row [INFERRED 0.85]
- **Shared sage/terracotta energy color grammar across ring, bars, strip** — claude_energy_role_colors, changelog_double_concentric_ring, changelog_hourly_ring_strip, changelog_v1_4_5 [INFERRED 0.85]
- **Templating pitfalls found in the field** — claude_style_literal, claude_dynamic_src_href_points, claude_sc_if_dual_placeholder, changelog_deferred_src_href_binding [INFERRED 0.75]
- **Offline startup: everything loaded at boot ships in public/vendor/** — changelog_vendored_react_runtime, changelog_vendored_fonts, changelog_vendored_hls_js, changelog_vendor_integrity_test, changelog_public_vendor_readme, changelog_diagnostica_runtime_react_row [EXTRACTED 1.00]
- **Irrigation timed-close safety layers (tab setTimeout, persisted deadline, HA-side blueprint)** — changelog_persistent_timed_close_deadline, changelog_irrigation_safety_close_blueprint, blueprints_automation_live_dashboard_irrigation_safety_close, changelog_irrigation_state_from_valve, changelog_irrigation_buttons_mode [INFERRED 0.85]
- **Alarm code-gated arm/disarm flow** — changelog_alarm_pin_awareness, changelog_alarm_pin_pad, changelog_demo_scenario_alarm_pin, changelog_diagnostica_ultime_azioni, troubleshooting_alarm_buttons_tap_but_nothing_happens [INFERRED 0.85]
- **v1.9.0 vendored runtime: dashboard works without internet** — readme_no_internet_requirement, readme_vendored_react_runtime, readme_hls_js, readme_web_fonts_offline_fallback [INFERRED 0.85]
- **Camera live-view fallback chain** — readme_camera_live_layers, readme_native_hls, readme_hls_js, readme_still_polling_fallback [EXTRACTED 1.00]
- **Valve closing guarantees (client deadline, HA-side timing, safety blueprint)** — readme_valve_timed_close, readme_input_button_durations, readme_irrigation_safety_close_blueprint, readme_blueprint_one_click_import [EXTRACTED 1.00]
- **v1.9.0 offline vendored runtime (React, fonts, hls.js)** — public_dash_neumo_vendor_react_scripts, public_dash_neumo_casa_react_source, public_dash_neumo_vendor_font_faces, public_dash_neumo_ensurehlsjs, public_dash_neumo_vendor_hls_light, public_dash_neumo_diagenvironment [INFERRED 0.85]
- **Alarm PIN pad flow** — public_dash_neumo_alarmguardedcall, public_dash_neumo_state_pin, public_dash_neumo_pinkeys, public_dash_neumo_pindigit, public_dash_neumo_pinback, public_dash_neumo_pinsubmit, public_dash_neumo_pincancel, public_dash_neumo_pin_pad_template, public_dash_neumo_call [EXTRACTED 1.00]
- **Camera live-view layer fallback (native HLS, hls.js, snapshot)** — public_dash_neumo_opencam, public_dash_neumo_camstartstream, public_dash_neumo_ensurehlsjs, public_dash_neumo_attachhlsjs, public_dash_neumo_camstartfastpoll, public_dash_neumo_setcamdiag [EXTRACTED 1.00]
- **Alarm PIN pad flow (v1.9.0)** — public_dash_neumo_mobile_alarmguardedcall, public_dash_neumo_mobile_state_pin, public_dash_neumo_mobile_pinkeys, public_dash_neumo_mobile_pinsubmit, public_dash_neumo_mobile_pin_pad_template, public_dash_neumo_mobile_call [EXTRACTED 1.00]
- **Camera live view tiers: native HLS, hls.js, snapshot polling** — public_dash_neumo_mobile_camstartstream, public_dash_neumo_mobile_ensurehlsjs, public_dash_neumo_mobile_attachhlsjs, public_dash_neumo_mobile_hls_light_vendor, public_dash_neumo_mobile_camstartfastpoll [EXTRACTED 1.00]
- **Offline-first vendored assets (v1.9.0)** — public_dash_neumo_mobile_vendor_react_scripts, public_dash_neumo_mobile_casa_react_source, public_dash_neumo_mobile_vendor_font_face, public_dash_neumo_mobile_hls_light_vendor, public_support_loadreactumd [INFERRED 0.85]

## Communities (46 total, 8 thin omitted)

### Community 0 - "support.js Runtime"
Cohesion: 0.07
Nodes (48): boot(), collectProps(), compileAttr(), compileTemplate(), contentKey(), createComponentFactory(), createHelmetManager(), createPseudoSheet() (+40 more)

### Community 1 - "Desktop Component Logic"
Cohesion: 0.06
Nodes (51): _actionLog ring buffer, Action toast template (sc-if hasToast), ALARM(), ALARM_ID(), alarmGuardedCall(), ALL_CAMERAS_RESULT(), ALL_ROOMS_RESULT(), applianceItems() (+43 more)

### Community 2 - "README Features Overview"
Cohesion: 0.06
Nodes (50): Alarm buttons follow supported_features (v1.5.4), Appliances (config.appliances), Autoconsumo / prelievo / immissione, Battery power sign toggle (Settings -> Energy), One-click blueprint import (my.home-assistant.io), Layered camera live view (v1.5.4), Cameras (auto-discovered camera.*), CHANGELOG.md (+42 more)

### Community 3 - "Boot and Prefs"
Cohesion: 0.07
Nodes (39): _boot(), _checkIrrigationEnds(), componentDidMount(), DEFAULT_CONFIG, doDiag (copy diagnostics text), Hourly ring strip (hourlyBars), _loadHourlyEnergy() ring strip, _loadIrrigationEnds() (+31 more)

### Community 4 - "Shared Component Methods"
Cohesion: 0.08
Nodes (36): ENTITY_HIDDEN_SET(), alarmGuardedCall(), Component.batteryPowerSign(), Component.batterySignVerdict(), Component.call(), Component._camStartFastPoll(), Component._camStartStream(), Component._camStopFastPoll() (+28 more)

### Community 5 - "Mobile Boot and Vendored Runtime"
Cohesion: 0.09
Nodes (30): window.CASA_REACT_SOURCE ('local'|'cdn'), Component (DCLogic) dashboard class, dash_neumo.html (desktop dashboard), Component._actionLog (Recent actions), ASSET_V cache-bust version, Component._attachHlsJs(), bust(), window.CASA_REACT_SOURCE ('local'|'cdn') (+22 more)

### Community 6 - "CasaPanel Host Bridge"
Cohesion: 0.13
Nodes (10): CasaPanel, fetchDailyCounterHistory(), fetchDailyLastSample(), fetchHistory(), fetchHourlyEnergy(), fetchRawHistory(), fetchTodayStatsDelta(), FOLDER_NAME (+2 more)

### Community 7 - "Registry Discovery"
Cohesion: 0.15
Nodes (22): Component.ALL_CAMERAS_RESULT(), Component.ALL_ROOMS_RESULT(), Component.diagEnvironment(), Component.SECTION_ORDER(), buildExportedConfig(), collectConfiguredEntities(), collectConfiguredEntityModules(), discoverAlarm() (+14 more)

### Community 8 - "Irrigation Timed Close and Blueprint"
Cohesion: 0.16
Nodes (18): Live Dashboard — irrigation safety close (automation blueprint), Domain-aware close action (switch.turn_off / valve.close_valve), max_minutes input (default 20, 1-240 min), Restart sweep closing still-open switches and valves, restart trigger (homeassistant start), too_long trigger (state on/open for max_minutes), valves input (switch.* / valve.* multi-entity selector), Demo scenario ?demo&scenario=call-timeout (+10 more)

### Community 9 - "Troubleshooting and Layout Density"
Cohesion: 0.15
Nodes (17): Cameras module (Sorveglianza tab, hideUntilTap), Room status pills and seven new discovered domains, Room tiles sized to min-content, rooms.max default 12, Settings panel tabs (Stanze · Energia · Telecamere · Diagnostica), Surveillance card adapts to camera count (motion-first tiles), v1.4.8, v1.4.9, Density before one-screen fit (44px targets, 10px text) (+9 more)

### Community 10 - "Early Releases 0.x"
Cohesion: 0.27
Nodes (13): CHANGELOG, Italian and English UI (hass.language), v0.1.0, v0.2.0, v0.2.1, v0.3.0, v1.0.0, v1.0.1 (+5 more)

### Community 11 - "Energy Prefs Mapping Releases"
Cohesion: 0.18
Nodes (13): Deferred src/href/points binding after mount, Double concentric energy ring, Energy mapping from HA Energy dashboard (energy/get_prefs) with device_class fallback, Sum all energy sources per role, Energy resolution console.info / get_prefs console.warn, Flat grid source schema (stat_energy_from at top level), v1.4.0, v1.4.1 (+5 more)

### Community 12 - "v1.9.0 Offline and Tests"
Cohesion: 0.24
Nodes (11): Test workflow (GitHub Actions), node --test 'tests/*.test.mjs', node-test job (ubuntu-latest, Node 22), Differential state push (casa:hass-states-delta), Full snapshot resync (every 5 min and on iframe reload), public/vendor/README.md (file, version, license, hash inventory), Tests and CI (20 node --test tests, no dependencies), v1.9.0 (+3 more)

### Community 13 - "Compact Energy Legend"
Cohesion: 0.25
Nodes (11): Casa Dashboard Screenshot, Allarme (Alarm) Card, Double-Ring Energy Gauge (7,6 kWh), Autoconsumo Tile (6,2 kWh), Dalla Rete Tile (1,4 kWh), Immessi in Rete Tile (3,6 kWh), Three-Tile Compact Energy Legend, Fotovoltaico Compact Card Layout (+3 more)

### Community 14 - "Camera Live Layers"
Cohesion: 0.29
Nodes (10): Alarm panel auto-discovery, ARM_CUSTOM_BYPASS alarm button, Auto-discovery from area/device/entity registries, Open question: vendor hls.js?, Live camera three-layer strategy (native HLS / hls.js / fast camera_proxy stills), v1.5.4, Vendored hls.js 1.7.4 (vendor/hls.light.min.js), Alarm card has no buttons, or fewer than expected (+2 more)

### Community 15 - "Demo Backend"
Cohesion: 0.29
Nodes (6): buildRegistries(), cloneStates(), connect(), patchConfig(), rand(), scenarioConfig()

### Community 16 - "Energy Role Colors and Ring"
Cohesion: 0.33
Nodes (9): Mobile duplicate appliance loop fix / removed remaining-time, Cover position band (striped closed-fraction background), Energy role colors (sage = sun, terracotta = grid), Fed-to-grid third bar in energy chart, Hourly ring strip (24 stacked bars from recorder/statistics_during_period), v1.4.4, v1.4.5, v1.8.0 (+1 more)

### Community 17 - "Discovery Config Exclusions"
Cohesion: 0.25
Nodes (9): Appliances module (config.appliances), discoverRooms excludes entities referenced in config.js, discoverRooms(), Duplicate serial number warning, Home section order (sections.order), HA 2026.9.0 Matter duplicate-device issue, Smart plug three-level state (off / active / running, 3 W threshold), v1.7.0 (+1 more)

### Community 18 - "v1.6.0 Empty States and Scenarios"
Cohesion: 0.33
Nodes (9): Battery sign convention self-check and invert toggle, Forceable demo data scenarios (?demo&scenario=...), Derived house consumption, Self-explanatory empty states (Go to Areas, missing energy ID), Single-ring fallback self-consumption line fix, v1.6.0, Zero-areas empty-state guidance, 'Derived house consumption' shows '—', or the toggle says it's probably inverted (+1 more)

### Community 19 - "Service Calls and Diagnostica"
Cohesion: 0.39
Nodes (9): call() single service-call choke point with outcome ring buffer, Copy diagnostics button, Diagnostica -> Ambiente -> 'Runtime React' row, Diagnostics panel (Settings -> Diagnostica), Discovery discard reasons ('Diagnostica · N entità non mostrate'), v1.5.1, Visible diagnostics instead of silent failure, Every user-facing diagnostic has a visible Diagnostica counterpart (+1 more)

### Community 20 - "HACS and Release Rules"
Cohesion: 0.32
Nodes (8): Config at config/www/live_dashboard_config.js outside HACS folder, HACS support (category Dashboard), live_dashboard_config.example.js rename, v1.3.0, v1.3.1, live_dashboard.zip release asset, A tag is not a release (push tag + gh release create), User config in config/www/live_dashboard_config.js

### Community 21 - "Settings Write Path"
Cohesion: 0.36
Nodes (8): doExport (config.js export to clipboard), _panelLpDown/_panelLpMove/_panelLpUp/_panelLpMenu long-press-to-hide, SAVE_PREFS(), SETTINGS_* handlers (room/entity/camera/module/power unit/plug threshold/battery sign/reset), SETTINGS_LONG_HIDE(), SETTINGS_MOVE_SECTION(), SETTINGS_SET_BATTERY_SIGN(), SETTINGS_SET_ENTITY()

### Community 22 - "Alarm PIN Pad"
Cohesion: 0.38
Nodes (7): Alarm PIN awareness (code-gated action as explicit no-op), Alarm PIN pad (code_format keypad / password field), Demo scenario ?demo&scenario=alarm-pin (code 1234), Diagnostica -> Ultime azioni (Recent actions), Alarm buttons tap but nothing happens, Before you open an issue: try it in ?demo&scenario=..., Demo scenario table (default/export/import/night/partial/missing/odd-units/call-timeout/alarm-pin)

### Community 23 - "Settings Panel and Persistence"
Cohesion: 0.38
Nodes (7): Demo mode (file:// or ?demo), Export as config.js (window.CASA_CONFIG block), Per-user persistence via frontend/set_user_data with localStorage fallback, Settings panel (visibility/order overrides layer), v1.5.0, window.CASA_CONFIG global config, The page never leaves 'Connessione…' / 'Connecting…'

### Community 24 - "Panel Tag and Cache Busting"
Cohesion: 0.40
Nodes (6): ASSET_VERSION ?v= propagated to every loadScript(), Folder-derived panel tag (<folder>-panel), panel_custom name self-check (console.error + on-page message), panel_custom tag derived from folder (<cartella>-panel), Single VERSION in public/panel.js for cache-busting, White / blank panel

### Community 25 - "Templating Constraints"
Cohesion: 0.40
Nodes (6): [data-sel] selected state !important fix, noDiagActionRows, renderVals(), Never same expression in two sc-if with opposite hint-placeholder-val, Literal style= attribute (property:{{ value }}), Templating constraints (found in the field)

### Community 26 - "Project Instructions"
Cohesion: 0.47
Nodes (6): CLAUDE.md — project instructions, Regenerate graphify-out/ in the same commit, No graphify post-commit hook, Session start orientation (graphify wiki/report, latest CHANGELOG), Verify graph coverage by symbol grep, not node count, Verify presentation changes by looking (screenshot/DOM)

### Community 27 - "Mobile Screenshot"
Cohesion: 0.40
Nodes (6): Cose Accese Adesso (Active Devices List), Bottom Navigation Bar (Casa/Stanze/Irrigazione/Energia/Auto/Meteo), Modalità Casa (Home Mode Selector), Mobile Dashboard View (Screenshot), Chi è in Casa (Presence Tracker), Weather Widget (19°, Sunny)

### Community 28 - "Energy Prefs Test"
Cohesion: 0.33
Nodes (3): __dirname, sandbox, src

### Community 29 - "Power Units and Cover Fix"
Cohesion: 0.50
Nodes (5): Cover slider long-press / NaN position fix, Instantaneous power unit setting (Auto/W/kW), powerVal() unit-normalizing helper, v1.5.2, v1.5.3

### Community 31 - "Energy Tab Fixes"
Cohesion: 0.50
Nodes (4): Energy tab zero-config fix and no-history message, Root padding matches neumorphic shadow reach, v1.4.6, v1.4.7

### Community 32 - "Release Zip Workflow"
Cohesion: 0.67
Nodes (3): Attach to Release Step, Build live_dashboard.zip Step, HACS zip_release content_in_root Convention

### Community 33 - "README Header Banner"
Cohesion: 1.00
Nodes (3): Live Dashboard README Header Banner, Home Assistant, Live Dashboard

### Community 34 - "Energia View Screenshot"
Cohesion: 1.00
Nodes (3): Energia Dashboard View, Live Power KPI Cards (Produzione/Consumo/Prelievo), Produzione e Prelievo Bar Chart

### Community 35 - "Irrigazione View Screenshot"
Cohesion: 1.00
Nodes (3): Irrigazione (Irrigation) Dashboard View, Zona 1 Irrigation Card, Zona 2 Irrigation Card

## Ambiguous Edges - Review These
- `Verify presentation changes by looking (screenshot/DOM)` → `v1.4.5`  [AMBIGUOUS]
  CLAUDE.md · relation: conceptually_related_to
- `Literal style= attribute (property:{{ value }})` → `[data-sel] selected state !important fix`  [AMBIGUOUS]
  CLAUDE.md · relation: conceptually_related_to

## Knowledge Gaps
- **58 isolated node(s):** `FOLDER_NAME`, `__dirname`, `__dirname`, `sandbox`, `__dirname` (+53 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Verify presentation changes by looking (screenshot/DOM)` and `v1.4.5`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Literal style= attribute (property:{{ value }})` and `[data-sel] selected state !important fix`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `dash_neumo_mobile.html (phone layout)` connect `Mobile Boot and Vendored Runtime` to `Boot and Prefs`, `Shared Component Methods`, `CasaPanel Host Bridge`?**
  _High betweenness centrality (0.073) - this node is a cross-community bridge._
- **Why does `Component.renderVals()` connect `Shared Component Methods` to `Boot and Prefs`, `Mobile Boot and Vendored Runtime`, `Registry Discovery`?**
  _High betweenness centrality (0.058) - this node is a cross-community bridge._
- **Why does `renderVals()` connect `Desktop Component Logic` to `Boot and Prefs`, `Shared Component Methods`, `Settings Write Path`?**
  _High betweenness centrality (0.055) - this node is a cross-community bridge._
- **Are the 10 inferred relationships involving `renderVals()` (e.g. with `ALARM_ID()` and `Diagnostica Recent actions template (diagActionRows / noDiagActionRows)`) actually correct?**
  _`renderVals()` has 10 INFERRED edges - model-reasoned connections that need verification._
- **What connects `FOLDER_NAME`, `__dirname`, `__dirname` to the rest of the system?**
  _58 weakly-connected nodes found - possible documentation gaps or missing edges._
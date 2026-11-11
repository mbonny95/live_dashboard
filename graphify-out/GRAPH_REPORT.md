# Graph Report - .  (2026-11-11)

## Corpus Check
- 37 files · ~127,816 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 654 nodes · 1373 edges · 42 communities (32 shown, 10 thin omitted)
- Extraction: 91% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 114 edges (avg confidence: 0.81)
- Token cost: 332,002 input · 0 output

## Community Hubs (Navigation)
- CasaComponentBase / CasaComponentBase.vmSettings
- support.js / walk
- renderVals / dash_neumo.html
- renderVals / dash_neumo_mobile.html
- Live Dashboard README / Camera live layer order
- CasaPanel / panel.js
- CasaComponentBase._boot / casa-core.js
- core.test.mjs / FakePC
- v1.9 / v2.0.0
- discovery.js / discoverRooms
- TROUBLESHOOTING.md / Forceable demo scenarios
- CHANGELOG.md / Cover slider long-press / Na
- Diagnostics panel with Copy  / Discovery discard reason log
- v0.2.0 / Smart plug three-level state
- panel_custom name self-check / version.json read by panel.j
- Templating constraints / Stable per-stream ref callba
- Dove va il codice / Shared renderVals view-model
- prefs.js / diagText
- Three-Tile Compact Energy Le / Casa
- ha-backend-demo.js / connect
- v1.8.1 / Diagnostica → Ultime azioni 
- Single-ring energy fallback / Double concentric energy rin
- Live Dashboard — irrigation  / too_long trigger
- Mobile Dashboard View / Cose Accese Adesso
- mapEnergyPrefs.test.mjs / call
- discovery.test.mjs / __dirname
- Build live_dashboard.zip Ste / Attach to Release Step
- Live Dashboard README Header / Home Assistant
- Energia Dashboard View / Live Power KPI Cards
- Irrigazione / Zona 1 Irrigation Card
- ha-backend-panel.js / connect
- assets.test.mjs / __dirname
- App Icon / House-and-Grid Icon Motif
- zip-and-attach Release Job
- App Icon
- Transparent App Icon
- Cameras module
- Demo mode
- Derived house consumption

## God Nodes (most connected - your core abstractions)
1. `CasaComponentBase (extends DCLogic)` - 98 edges
2. `CasaComponentBase.vmSettingsDiag()` - 47 edges
3. `renderVals() (mobile)` - 32 edges
4. `renderVals() (desktop)` - 31 edges
5. `dash_neumo_mobile.html (phone layout)` - 30 edges
6. `CasaPanel` - 25 edges
7. `CasaComponentBase.PREFS()` - 24 edges
8. `Live Dashboard README` - 23 edges
9. `dash_neumo.html (desktop layout)` - 22 edges
10. `CasaComponentBase._boot()` - 17 edges

## Surprising Connections (you probably didn't know these)
- `renderVals: cameras (camList, camMain, camHomeTiles)` --semantically_similar_to--> `CasaComponentBase.ALL_CAMERAS_RESULT()`  [AMBIGUOUS] [semantically similar]
  public/dash_neumo.html → public/casa-core.js
- `Verify presentation changes by looking (screenshot/DOM), suspect markup first` --semantically_similar_to--> `renderVals() before/after verification on 378 combinations`  [INFERRED] [semantically similar]
  CLAUDE.md → CHANGELOG.md
- `renderVals: legacy single-ring gauges and inverter status` --semantically_similar_to--> `CasaComponentBase.vmEnergyRing()`  [INFERRED] [semantically similar]
  public/dash_neumo.html → public/casa-core.js
- `renderVals: energy history chart (ranges, bars, totals)` --semantically_similar_to--> `CasaComponentBase.vmHourlyStrip()`  [INFERRED] [semantically similar]
  public/dash_neumo.html → public/casa-core.js
- `support.js script tag` --references--> `loadReactUmd()`  [INFERRED]
  public/dash_neumo.html → public/support.js

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **v2 single code core for desktop and mobile** — changelog_shared_core_casa_core_js, changelog_vm_view_models, changelog_golden_renderval_verification, changelog_support_js_frozen, claude_where_code_goes_v2, claude_casa_core_base_class, claude_no_method_redefinition_test [EXTRACTED 1.00]
- **Console-free user-visible diagnostics** — claude_diagnostics_visible_to_user, changelog_diagnostics_panel, changelog_discard_reason_logging, changelog_recent_actions_ring_buffer, changelog_copy_diagnostics, changelog_settings_panel_tabs [INFERRED 0.85]
- **Head script chain: React, CasaCore, support.js** — public_dash_neumo_vendored_react, public_dash_neumo_casa_react_source, public_dash_neumo_casa_core_loader, public_dash_neumo_support_js_include, public_casa_core_file [EXTRACTED 1.00]
- **vmAlarm and vmLiveConsumption outputs feed vmSettingsDiag** — public_dash_neumo_rendervals, public_casa_core_vmalarm, public_casa_core_vmliveconsumption, public_casa_core_vmcameradetail, public_casa_core_vmsettingsdiag [EXTRACTED 1.00]
- **Energy card built from shared view-models** — public_dash_neumo_template_energy_card_normal, public_dash_neumo_template_energy_ring, public_dash_neumo_template_hourly_strip, public_casa_core_vmenergyempty, public_casa_core_vmenergyring, public_casa_core_vmhourlystrip, public_casa_core_vmliveconsumption [INFERRED 0.85]
- **Mobile head boot sequence** — public_dash_neumo_mobile_vendored_react, public_dash_neumo_mobile_casa_react_source, public_dash_neumo_mobile_casa_core_loader, public_dash_neumo_mobile_support_js_script, public_casa_core_file [EXTRACTED 1.00]
- **Mobile renderVals consumes shared casa-core view-models** — public_dash_neumo_mobile_render_vals, public_casa_core_vmsettingsdiag, public_casa_core_vmalarm, public_casa_core_vmcameradetail, public_casa_core_vmenergyring, public_casa_core_vmhourlystrip, public_casa_core_vmenergyempty, public_casa_core_vmliveconsumption [EXTRACTED 1.00]
- **Fixed bottom/overlay stack (tab bar, scenario bar, toast, PIN pad)** — public_dash_neumo_mobile_bottom_tab_bar, public_dash_neumo_mobile_demo_scenario_bar, public_dash_neumo_mobile_action_toast, public_dash_neumo_mobile_pin_pad [INFERRED 0.85]
- **Camera live-view layer fallback ladder (WebRTC -> hls.js -> native HLS -> fast stills)** — public_casa_core_camstartstream, public_casa_core_camstartwebrtc, public_casa_core_camstopwebrtc, public_casa_core_camlayerfailed, public_casa_core_ensurehlsjs, public_casa_core_attachhlsjs, public_casa_core_camcannative, public_casa_core_camstartfastpoll, public_casa_core_camvideoref, public_casa_core_setcamdiag [EXTRACTED 1.00]
- **Alarm PIN pad flow (code_format gating -> pin state -> call with code)** — public_casa_core_vmalarm, public_casa_core_alarm, public_casa_core_alarm_id, public_casa_core_call, public_casa_core_showactiontoast [INFERRED 0.85]
- **v2 shared renderVals view-model family (vm*)** — public_casa_core_vmsettingsdiag, public_casa_core_vmalarm, public_casa_core_vmcameradetail, public_casa_core_vmenergyring, public_casa_core_vmhourlystrip, public_casa_core_vmenergyempty, public_casa_core_vmliveconsumption [EXTRACTED 1.00]
- **Camera live view layer stack (WebRTC → hls.js → native HLS → stills)** — changelog_camera_webrtc_layer, changelog_webrtc_hls_fallback, changelog_vendored_hls_js, changelog_camera_live_layer_order, changelog_camera_runtime_fallback, changelog_camera_three_layer_live_view [EXTRACTED 1.00]
- **v2 single code core for desktop and mobile** — changelog_shared_core_casa_core_js, changelog_vm_view_models, changelog_golden_renderval_verification, changelog_version_json_cache_busting, changelog_support_js_frozen [EXTRACTED 1.00]
- **Offline startup via vendored assets** — changelog_vendored_react_runtime, changelog_vendored_web_fonts, changelog_vendored_hls_js, changelog_diagnostica_runtime_react_row [EXTRACTED 1.00]
- **Camera live view fallback chain** — readme_camera_webrtc_layer, readme_hls_js, readme_native_hls_layer, readme_fast_stills_layer [EXTRACTED 1.00]
- **Offline vendored assets (v1.9.0)** — readme_vendored_react_runtime, readme_web_fonts_offline_fallback, readme_hls_js, readme_no_internet_requirement [EXTRACTED 1.00]
- **Irrigation valve close guarantees** — readme_valve_timed_close, readme_irrigation_safety_close_blueprint, readme_irrigation_view [EXTRACTED 1.00]

## Communities (42 total, 10 thin omitted)

### Community 0 - "CasaComponentBase / CasaComponentBase.vmSettings"
Cohesion: 0.07
Nodes (85): CasaComponentBase.ALL_CAMERAS_RESULT(), CasaComponentBase.ALL_ROOMS_RESULT(), CasaComponentBase.applianceItems(), CasaComponentBase.applianceState(), CasaComponentBase.at(), CasaComponentBase._attachHlsJs(), CasaComponentBase.batteryPowerSign(), CasaComponentBase.batterySignVerdict() (+77 more)

### Community 1 - "support.js / walk"
Cohesion: 0.07
Nodes (53): support.js script tag, boot(), cdnScriptFor(), collectProps(), compileAttr(), compileTemplate(), contentKey(), createComponentFactory() (+45 more)

### Community 2 - "renderVals / dash_neumo.html"
Cohesion: 0.07
Nodes (65): CasaComponentBase.ALARM(), CasaComponentBase._bindAttr(), CasaComponentBase.spark(), CasaComponentBase.vmAlarm(), CasaComponentBase.vmCameraDetail(), CasaComponentBase.vmEnergyEmpty(), CasaComponentBase.vmEnergyRing(), CasaComponentBase.vmHourlyStrip() (+57 more)

### Community 3 - "renderVals / dash_neumo_mobile.html"
Cohesion: 0.07
Nodes (48): CasaComponentBase.ALARM_ID(), Action toast, Bottom tab bar (Casa/Stanze/Camere/Irrigazione/Energia/Auto/Meteo), Camera overlay (live video / snapshot layer, badge, countdown), document.write loader for ./casa-core.js?v=, window.CASA_REACT_SOURCE, Casa ordered sections (energy / cameras / alarm), Destructure window.CasaCore (DEFAULT_CONFIG, bust, switchScenario, ...) (+40 more)

### Community 4 - "Live Dashboard README / Camera live layer order"
Cohesion: 0.06
Nodes (45): Appliances (optional), Battery power sign toggle, Camera live layer order, WebRTC camera layer, Cameras (optional), CHANGELOG.md, live_dashboard_config.example.js, Demo mode (+37 more)

### Community 5 - "CasaPanel / panel.js"
Cohesion: 0.11
Nodes (13): CasaPanel, fetchDailyCounterHistory(), fetchDailyLastSample(), fetchHistory(), fetchHourlyEnergy(), fetchRawHistory(), fetchTodayStatsDelta(), FOLDER_NAME (+5 more)

### Community 6 - "CasaComponentBase._boot / casa-core.js"
Cohesion: 0.14
Nodes (24): ASSET_V, base(), CasaComponentBase._boot(), bust(), window.CasaCore namespace, CONFIG_PATHS, DEFAULT_CONFIG, CasaComponentBase._ensureHlsJs() (+16 more)

### Community 7 - "core.test.mjs / FakePC"
Cohesion: 0.08
Nodes (7): Base, __dirname, FakeLogic, FakePC, FakeStream, sandbox, window

### Community 8 - "v1.9 / v2.0.0"
Cohesion: 0.17
Nodes (23): Test workflow (GitHub Actions), node --test 'tests/*.test.mjs', node-test job (ubuntu-latest, Node 22), HA bridge supports subscriptions (not only request/response), Camera live layer order: hls.js first, native HLS only where hls.js can't run, Camera runtime fallback between live layers, Three-layer camera live view (HLS / hls.js / fast stills), Camera live view via WebRTC (first layer) (+15 more)

### Community 9 - "discovery.js / discoverRooms"
Cohesion: 0.18
Nodes (19): classifySwitchPower(), collectConfiguredEntities(), collectConfiguredEntityModules(), discoverAlarm(), discoverAllOfDomain(), discoverCameras(), discoverEnergyEntities(), discoverPeople() (+11 more)

### Community 10 - "TROUBLESHOOTING.md / Forceable demo scenarios"
Cohesion: 0.20
Nodes (18): Alarm panel auto-discovery, Alarm PIN awareness (code-gated no-op with note), Alarm PIN pad, Battery sign convention self-diagnosis, Forceable demo scenarios (?demo&scenario=…), Self-explanatory empty states (Go to Areas, missing energy entity ID), v0.1.0, v1.0.0 (+10 more)

### Community 11 - "CHANGELOG.md / Cover slider long-press / Na"
Cohesion: 0.15
Nodes (15): Appliances module (config.appliances), Exclude config-referenced entities from generic room lists, Cover slider long-press / NaN position fix, Home section order (sections.order), Irrigation zones via input_button buttons, v0.3.0, v1.1.0, v1.1.2 (+7 more)

### Community 12 - "Diagnostics panel with Copy  / Discovery discard reason log"
Cohesion: 0.18
Nodes (15): Diagnostics panel with Copy diagnostics, Discovery discard reason logging (N entities not shown), Energy prefs auto-discovery (energy/get_prefs), Matter duplicate-serial device warning (HA 2026.9.0), Settings panel (visibility/order overrides, export as config.js), Settings panel tabs (Stanze · Energia · Telecamere · Diagnostica), v1.4.1, v1.4.7 (+7 more)

### Community 13 - "v0.2.0 / Smart plug three-level state"
Cohesion: 0.18
Nodes (14): Extended room domains (humidifier, lock, water_heater, valve, lawn_mower, siren), Instantaneous power unit setting (Auto / W / kW), Multi-camera home Sorveglianza card, powerVal() helper, Room tiles sized to content, rooms.max default 12, Smart plug three-level state (off / active / running), v0.2.0, v1.4.8 (+6 more)

### Community 14 - "panel_custom name self-check / version.json read by panel.j"
Cohesion: 0.23
Nodes (13): ASSET_VERSION ?v= cache-bust propagated to loadScript(), Config at config/www/live_dashboard_config.js outside HACS folder, Folder-derived panel tag (<folder>-panel), HACS support, panel_custom name self-check, v0.2.1, v1.1.1, v1.3.0 (+5 more)

### Community 15 - "Templating constraints / Stable per-stream ref callba"
Cohesion: 0.15
Nodes (13): Stable per-stream ref callback, muted video, sequential still loading, [data-sel] selected state !important fix, Deferred src/href/points binding after mount, Flat grid source schema (stat_energy_from at top level), v1.0.1, v1.4.2, v1.4.3, Constraint 3: window.CASA_CONFIG global, not a module (+5 more)

### Community 16 - "Dove va il codice / Shared renderVals view-model"
Cohesion: 0.22
Nodes (13): renderVals() before/after verification on 378 combinations, Shared core public/casa-core.js, Shared renderVals view-model blocks (vmSettingsDiag, vmAlarm, vmCameraDetail, vmEnergyRing, vmHourlyStrip, vmEnergyEmpty, vmLiveConsumption), class Component extends window.CasaCore.base(DCLogic), Regenerate graphify and commit graphify-out/ with code changes, CLAUDE.md (project instructions), Mobile-only methods chartOn / toggleChart / roomDetail, Test fails if a page redefines a base method (+5 more)

### Community 17 - "prefs.js / diagText"
Cohesion: 0.26
Nodes (12): copyToClipboard(), diagRowLine(), diagText(), exportText(), load(), loadIrrigationEnds(), padCol(), readLocal() (+4 more)

### Community 18 - "Three-Tile Compact Energy Le / Casa"
Cohesion: 0.25
Nodes (11): Casa Dashboard Screenshot, Allarme (Alarm) Card, Double-Ring Energy Gauge (7,6 kWh), Autoconsumo Tile (6,2 kWh), Dalla Rete Tile (1,4 kWh), Immessi in Rete Tile (3,6 kWh), Three-Tile Compact Energy Legend, Fotovoltaico Compact Card Layout (+3 more)

### Community 19 - "ha-backend-demo.js / connect"
Cohesion: 0.29
Nodes (6): buildRegistries(), cloneStates(), connect(), patchConfig(), rand(), scenarioConfig()

### Community 20 - "v1.8.1 / Diagnostica → Ultime azioni "
Cohesion: 0.33
Nodes (9): call() single choke point for service calls, Timeout errors marked with .code = 'timeout', Irrigation safety close blueprint, Persisted irrigation deadline in frontend/user_data, Diagnostica → Ultime azioni / Recent actions ring buffer, v1.8.1, Irrigation state from the valve, not the button, noDiagActionRows (+1 more)

### Community 21 - "Single-ring energy fallback / Double concentric energy rin"
Cohesion: 0.31
Nodes (9): Cover real position band in room panel, Double concentric energy ring, Energy role color grammar (sage = solar, terracotta = grid), Hourly 24-bar history strip under the energy ring, Single-ring energy fallback, v1.4.0, v1.4.5, v1.8.0 (+1 more)

### Community 22 - "Live Dashboard — irrigation  / too_long trigger"
Cohesion: 0.43
Nodes (7): Live Dashboard — irrigation safety close (automation blueprint), Domain-aware close action (switch.turn_off / valve.close_valve), max_minutes input (default 20, 1-240 min), Restart sweep closing still-open switches and valves, restart trigger (homeassistant start), too_long trigger (state on/open for max_minutes), valves input (switch.* / valve.* multi-entity selector)

### Community 23 - "Mobile Dashboard View / Cose Accese Adesso"
Cohesion: 0.40
Nodes (6): Cose Accese Adesso (Active Devices List), Bottom Navigation Bar (Casa/Stanze/Irrigazione/Energia/Auto/Meteo), Modalità Casa (Home Mode Selector), Mobile Dashboard View (Screenshot), Chi è in Casa (Presence Tracker), Weather Widget (19°, Sunny)

### Community 24 - "mapEnergyPrefs.test.mjs / call"
Cohesion: 0.33
Nodes (3): __dirname, sandbox, src

### Community 26 - "Build live_dashboard.zip Ste / Attach to Release Step"
Cohesion: 0.67
Nodes (3): Attach to Release Step, Build live_dashboard.zip Step, HACS zip_release content_in_root Convention

### Community 27 - "Live Dashboard README Header / Home Assistant"
Cohesion: 1.00
Nodes (3): Live Dashboard README Header Banner, Home Assistant, Live Dashboard

### Community 28 - "Energia Dashboard View / Live Power KPI Cards"
Cohesion: 1.00
Nodes (3): Energia Dashboard View, Live Power KPI Cards (Produzione/Consumo/Prelievo), Produzione e Prelievo Bar Chart

### Community 29 - "Irrigazione / Zona 1 Irrigation Card"
Cohesion: 1.00
Nodes (3): Irrigazione (Irrigation) Dashboard View, Zona 1 Irrigation Card, Zona 2 Irrigation Card

## Ambiguous Edges - Review These
- `switchScenario()` → `connect()`  [AMBIGUOUS]
  public/casa-core.js · relation: conceptually_related_to
- `panel.js` → `dash_neumo_mobile.html (phone layout)`  [AMBIGUOUS]
  public/dash_neumo_mobile.html · relation: conceptually_related_to
- `Constraint 1: literal style= attribute (property:{{ value }})` → `[data-sel] selected state !important fix`  [AMBIGUOUS]
  CLAUDE.md · relation: conceptually_related_to
- `renderVals: cameras (camList, camMain, camHomeTiles)` → `CasaComponentBase.ALL_CAMERAS_RESULT()`  [AMBIGUOUS]
  public/dash_neumo.html · relation: semantically_similar_to
- `Weather station preference (config.weatherStation)` → `Irrigation zones via input_button buttons`  [AMBIGUOUS]
  CHANGELOG.md · relation: conceptually_related_to

## Knowledge Gaps
- **61 isolated node(s):** `FOLDER_NAME`, `__dirname`, `__dirname`, `window`, `sandbox` (+56 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `switchScenario()` and `connect()`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `panel.js` and `dash_neumo_mobile.html (phone layout)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Constraint 1: literal style= attribute (property:{{ value }})` and `[data-sel] selected state !important fix`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `renderVals: cameras (camList, camMain, camHomeTiles)` and `CasaComponentBase.ALL_CAMERAS_RESULT()`?**
  _Edge tagged AMBIGUOUS (relation: semantically_similar_to) - confidence is low._
- **What is the exact relationship between `Weather station preference (config.weatherStation)` and `Irrigation zones via input_button buttons`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `CasaComponentBase (extends DCLogic)` connect `CasaComponentBase / CasaComponentBase.vmSettings` to `renderVals / dash_neumo.html`, `renderVals / dash_neumo_mobile.html`, `CasaPanel / panel.js`, `CasaComponentBase._boot / casa-core.js`?**
  _High betweenness centrality (0.137) - this node is a cross-community bridge._
- **Why does `loadReactUmd()` connect `support.js / walk` to `CasaComponentBase / CasaComponentBase.vmSettings`, `renderVals / dash_neumo_mobile.html`, `CasaComponentBase._boot / casa-core.js`?**
  _High betweenness centrality (0.076) - this node is a cross-community bridge._
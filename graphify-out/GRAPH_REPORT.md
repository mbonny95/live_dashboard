# Graph Report - .  (2026-11-10)

## Corpus Check
- 37 files · ~125,757 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 615 nodes · 1312 edges · 41 communities (31 shown, 10 thin omitted)
- Extraction: 90% EXTRACTED · 9% INFERRED · 0% AMBIGUOUS · INFERRED: 123 edges (avg confidence: 0.86)
- Token cost: 332,326 input · 0 output

## Community Hubs (Navigation)
- CasaComponentBase / vmSettingsDiag
- renderVals / dash_neumo.html
- support.js / walk
- README / Settings panel
- renderVals / dash_neumo_mobile.html
- CasaPanel / panel.js
- casa-core.js / _boot
- discovery.js / discoverRooms
- CHANGELOG.md / Energy mapping from HA Energ
- TROUBLESHOOTING / Forceable demo scenarios
- Release 2.0.0 / Camera three-layer live view
- prefs.js / _loadIrrigationEnds
- Alarm PIN pad / Release 1.8.1
- CLAUDE.md / Energy role color grammar
- Templating constraints / Deferred src/href/points bin
- Dove va il codice / Shared logic core public/cas
- Three-Tile Compact Energy Le / Casa
- core.test.mjs / FakeLogic
- Release 0.2.0 / Fixed 1200x800 no-scroll lay
- ha-backend-demo.js / connect
- Diagnostica panel / discoverRooms discard-reason
- version.json page cache-bust / Release rules
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
- Cameras / Sorveglianza modul
- Demo mode
- Derived house consumption

## God Nodes (most connected - your core abstractions)
1. `CasaComponentBase` - 97 edges
2. `vmSettingsDiag()` - 48 edges
3. `CHANGELOG.md (live_dashboard)` - 36 edges
4. `renderVals() (mobile)` - 32 edges
5. `renderVals() (desktop)` - 31 edges
6. `dash_neumo_mobile.html (phone layout)` - 30 edges
7. `README (Live Dashboard)` - 25 edges
8. `PREFS()` - 24 edges
9. `dash_neumo.html (desktop layout)` - 22 edges
10. `CasaPanel` - 21 edges

## Surprising Connections (you probably didn't know these)
- `renderVals: cameras (camList, camMain, camHomeTiles)` --semantically_similar_to--> `ALL_CAMERAS_RESULT()`  [AMBIGUOUS] [semantically similar]
  public/dash_neumo.html → public/casa-core.js
- `Verify presentation changes by looking (screenshot/DOM), suspect markup first` --semantically_similar_to--> `Golden renderVals() before/after comparison (378 combinations)`  [INFERRED] [semantically similar]
  CLAUDE.md → CHANGELOG.md
- `Live Dashboard — irrigation safety close (automation blueprint)` --semantically_similar_to--> `Irrigation zones via input_button buttons`  [INFERRED] [semantically similar]
  blueprints/automation/live_dashboard/irrigation_safety_close.yaml → CHANGELOG.md
- `renderVals: legacy single-ring gauges and inverter status` --semantically_similar_to--> `vmEnergyRing()`  [INFERRED] [semantically similar]
  public/dash_neumo.html → public/casa-core.js
- `renderVals: energy history chart (ranges, bars, totals)` --semantically_similar_to--> `vmHourlyStrip()`  [INFERRED] [semantically similar]
  public/dash_neumo.html → public/casa-core.js

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Alarm code-gated arm/disarm flow** — changelog_alarm_pin_awareness, changelog_alarm_pin_pad, changelog_alarm_pin_pad, changelog_recent_actions_ring_buffer, troubleshooting_alarm_buttons_tap_but_nothing_happens [INFERRED 0.85]
- **Camera live-view layer fallback (hls.js -> native HLS -> fast stills)** — public_casa_core_camstartstream, public_casa_core_ensurehlsjs, public_casa_core_attachhlsjs, public_casa_core_camcannative, public_casa_core_camvideoref, public_casa_core_camlayerfailed, public_casa_core_camstartfastpoll, public_casa_core_camstopfastpoll, public_casa_core_setcamdiag, public_casa_core_vmcameradetail [EXTRACTED 1.00]
- **Alarm code_format gating and PIN pad flow** — public_casa_core_vmalarm, public_casa_core_alarm, public_casa_core_alarm_id, public_casa_core_call, public_casa_core_showactiontoast [INFERRED 0.85]
- **v2 view-model family called from each page's renderVals** — public_casa_core_vmsettingsdiag, public_casa_core_vmalarm, public_casa_core_vmcameradetail, public_casa_core_vmenergyring, public_casa_core_vmhourlystrip, public_casa_core_vmenergyempty, public_casa_core_vmliveconsumption [EXTRACTED 1.00]
- **Head script chain: React, CasaCore, support.js** — public_dash_neumo_vendored_react, public_dash_neumo_casa_react_source, public_dash_neumo_casa_core_loader, public_dash_neumo_support_js_include, public_casa_core_file [EXTRACTED 1.00]
- **vmAlarm and vmLiveConsumption outputs feed vmSettingsDiag** — public_dash_neumo_rendervals, public_casa_core_vmalarm, public_casa_core_vmliveconsumption, public_casa_core_vmcameradetail, public_casa_core_vmsettingsdiag [EXTRACTED 1.00]
- **Energy card built from shared view-models** — public_dash_neumo_template_energy_card_normal, public_dash_neumo_template_energy_ring, public_dash_neumo_template_hourly_strip, public_casa_core_vmenergyempty, public_casa_core_vmenergyring, public_casa_core_vmhourlystrip, public_casa_core_vmliveconsumption [INFERRED 0.85]
- **Mobile head boot sequence** — public_dash_neumo_mobile_vendored_react, public_dash_neumo_mobile_casa_react_source, public_dash_neumo_mobile_casa_core_loader, public_dash_neumo_mobile_support_js_script, public_casa_core_file [EXTRACTED 1.00]
- **Mobile renderVals consumes shared casa-core view-models** — public_dash_neumo_mobile_render_vals, public_casa_core_vmsettingsdiag, public_casa_core_vmalarm, public_casa_core_vmcameradetail, public_casa_core_vmenergyring, public_casa_core_vmhourlystrip, public_casa_core_vmenergyempty, public_casa_core_vmliveconsumption [EXTRACTED 1.00]
- **Fixed bottom/overlay stack (tab bar, scenario bar, toast, PIN pad)** — public_dash_neumo_mobile_bottom_tab_bar, public_dash_neumo_mobile_demo_scenario_bar, public_dash_neumo_mobile_action_toast, public_dash_neumo_mobile_pin_pad [INFERRED 0.85]
- **v2 single code core for desktop and mobile** — changelog_shared_core_casa_core_js, changelog_vm_view_models, changelog_golden_renderval_verification, changelog_support_js_frozen, claude_where_code_goes_v2, claude_casa_core_base_class, claude_no_method_redefinition_test [EXTRACTED 1.00]
- **Dashboard starts without internet (vendored runtime)** — changelog_vendored_react_runtime, changelog_vendored_fonts, changelog_vendored_hls_js, changelog_vendor_integrity_test, changelog_diagnostica_runtime_react_row [EXTRACTED 1.00]
- **Console-free user-visible diagnostics** — claude_diagnostics_visible_to_user, changelog_diagnostics_panel, changelog_discard_reason_logging, changelog_recent_actions_ring_buffer, changelog_copy_diagnostics, changelog_settings_panel_tabs [INFERRED 0.85]

## Communities (41 total, 10 thin omitted)

### Community 0 - "CasaComponentBase / vmSettingsDiag"
Cohesion: 0.07
Nodes (87): ALL_CAMERAS_RESULT(), ALL_ROOMS_RESULT(), applianceItems(), applianceState(), at(), _attachHlsJs(), batteryPowerSign(), batterySignVerdict() (+79 more)

### Community 1 - "renderVals / dash_neumo.html"
Cohesion: 0.07
Nodes (61): ALARM(), vmAlarm(), vmEnergyEmpty(), vmEnergyRing(), vmHourlyStrip(), CasaCore helper destructuring, Component (extends CasaCore.base(DCLogic)), Component initial state (+53 more)

### Community 2 - "support.js / walk"
Cohesion: 0.07
Nodes (48): boot(), collectProps(), compileAttr(), compileTemplate(), contentKey(), createComponentFactory(), createHelmetManager(), createPseudoSheet() (+40 more)

### Community 3 - "README / Settings panel"
Cohesion: 0.06
Nodes (51): Live Dashboard — irrigation safety close (automation blueprint), Domain-aware close action (switch.turn_off / valve.close_valve), max_minutes input (default 20, 1-240 min), Restart sweep closing still-open switches and valves, restart trigger (homeassistant start), too_long trigger (state on/open for max_minutes), valves input (switch.* / valve.* multi-entity selector), Config at config/www/live_dashboard_config.js (outside HACS folder) (+43 more)

### Community 4 - "renderVals / dash_neumo_mobile.html"
Cohesion: 0.07
Nodes (48): ALARM_ID(), Action toast, Bottom tab bar (Casa/Stanze/Camere/Irrigazione/Energia/Auto/Meteo), Camera overlay (live video / snapshot layer, badge, countdown), document.write loader for ./casa-core.js?v=, window.CASA_REACT_SOURCE, Casa ordered sections (energy / cameras / alarm), Destructure window.CasaCore (DEFAULT_CONFIG, bust, switchScenario, ...) (+40 more)

### Community 5 - "CasaPanel / panel.js"
Cohesion: 0.12
Nodes (11): CasaPanel, fetchDailyCounterHistory(), fetchDailyLastSample(), fetchHistory(), fetchHourlyEnergy(), fetchRawHistory(), fetchTodayStatsDelta(), FOLDER_NAME (+3 more)

### Community 6 - "casa-core.js / _boot"
Cohesion: 0.12
Nodes (27): ASSET_V, base(), _boot(), bust(), window.CasaCore namespace, CONFIG_PATHS, DEFAULT_CONFIG, _ensureHlsJs() (+19 more)

### Community 7 - "discovery.js / discoverRooms"
Cohesion: 0.19
Nodes (18): collectConfiguredEntities(), collectConfiguredEntityModules(), discoverAlarm(), discoverAllOfDomain(), discoverCameras(), discoverEnergyEntities(), discoverPeople(), discoverRooms() (+10 more)

### Community 8 - "CHANGELOG.md / Energy mapping from HA Energ"
Cohesion: 0.12
Nodes (21): Appliances module (config.appliances), Exclude any config-referenced entity from generic room lists, discoverRooms(), Double concentric energy ring, Energy mapping from HA Energy dashboard (energy/get_prefs) + auto-discovery, CHANGELOG.md (live_dashboard), panel_custom name: self-check, Custom element tag derived from deploy folder (<folder>-panel) (+13 more)

### Community 9 - "TROUBLESHOOTING / Forceable demo scenarios"
Cohesion: 0.18
Nodes (17): Battery sign self-diagnosis with one-tap invert, Forceable demo scenarios (?demo&scenario=...), Self-explanatory empty states (three cases), Release 0.1.0, Release 1.6.0, Demo mode (?demo, file://), TROUBLESHOOTING, A whole section (Energy / Irrigation / Vehicle / Cameras / Modes / People) is missing (+9 more)

### Community 10 - "Release 2.0.0 / Camera three-layer live view"
Cohesion: 0.23
Nodes (15): Test workflow (GitHub Actions), node --test 'tests/*.test.mjs', node-test job (ubuntu-latest, Node 22), Camera three-layer live view (hls.js / native HLS / fast stills), Diagnostica -> Ambiente -> Runtime React row, Node test suite + CI workflow (test.yml), Stable per-stream ref callback (_bindAttr no-op on same value), support.js treated as frozen dependency (hash-pinned) (+7 more)

### Community 11 - "prefs.js / _loadIrrigationEnds"
Cohesion: 0.21
Nodes (14): _loadIrrigationEnds(), copyToClipboard(), diagRowLine(), diagText(), exportText(), load(), loadIrrigationEnds(), padCol() (+6 more)

### Community 12 - "Alarm PIN pad / Release 1.8.1"
Cohesion: 0.26
Nodes (13): Alarm panel auto-discovery, Alarm PIN awareness (gated no-op with note), Alarm PIN pad (code_format), call() single choke point for service calls, Demo scenario call-timeout, Diagnostica -> Ultime azioni ring buffer (last 20), Timeout marked with .code='timeout', Release 1.5.4 (+5 more)

### Community 13 - "CLAUDE.md / Energy role color grammar"
Cohesion: 0.19
Nodes (13): Cover real position striped band, Energy role color grammar (sage = sun, terracotta = grid), Third bar for energy fed to grid, Hourly 24-bar energy history strip, Release 1.4.5, Release 1.8.0, Energy role colors: --sage self-consumption, --acc import, --feed export, Regenerate graphify and commit graphify-out/ with code changes (+5 more)

### Community 14 - "Templating constraints / Deferred src/href/points bin"
Cohesion: 0.17
Nodes (12): [data-sel="true"] !important override, Deferred src/href/points binding after mount, Flat grid source schema (stat_energy_from at top level), Release 1.0.1, Release 1.4.2, Release 1.4.3, Constraint 3: window.CASA_CONFIG global, not a module, casa-core.js loaded in <head> before support.js, classic script with page ?v= (+4 more)

### Community 15 - "Dove va il codice / Shared logic core public/cas"
Cohesion: 0.33
Nodes (11): dash_neumo.html (wall tablet layout), dash_neumo_mobile.html (phone layout), Golden renderVals() before/after comparison (378 combinations), renderVals(), Shared logic core public/casa-core.js, 32 tests incl. core unit tests and no-method-redefinition test, vm* view-model blocks (vmSettingsDiag, vmAlarm, vmCameraDetail, vmEnergyRing, vmHourlyStrip, vmEnergyEmpty, vmLiveConsumption), class Component extends window.CasaCore.base(DCLogic) (+3 more)

### Community 16 - "Three-Tile Compact Energy Le / Casa"
Cohesion: 0.25
Nodes (11): Casa Dashboard Screenshot, Allarme (Alarm) Card, Double-Ring Energy Gauge (7,6 kWh), Autoconsumo Tile (6,2 kWh), Dalla Rete Tile (1,4 kWh), Immessi in Rete Tile (3,6 kWh), Three-Tile Compact Energy Legend, Fotovoltaico Compact Card Layout (+3 more)

### Community 17 - "core.test.mjs / FakeLogic"
Cohesion: 0.18
Nodes (5): Base, __dirname, FakeLogic, sandbox, window

### Community 18 - "Release 0.2.0 / Fixed 1200x800 no-scroll lay"
Cohesion: 0.24
Nodes (10): Adaptive Sorveglianza home card (1/2/3/4/5+ cameras), Fixed 1200x800 no-scroll layout (historical), Room tiles sized to min-content; rooms.max 12, Release 0.2.0, Release 1.4.8, Release 1.4.9, Density before 'fits in one screen' (44 px targets, 10 px text), A camera tile only ever shows an icon, never a preview (+2 more)

### Community 19 - "ha-backend-demo.js / connect"
Cohesion: 0.29
Nodes (6): buildRegistries(), cloneStates(), connect(), patchConfig(), rand(), scenarioConfig()

### Community 20 - "Diagnostica panel / discoverRooms discard-reason"
Cohesion: 0.33
Nodes (9): Copia diagnostica button, Diagnostica panel (config path, energy roles, environment), discoverRooms discard-reason logging (entità non mostrate), Matter duplicate-serial device warning, Release 1.5.1, Release 1.7.1, Diagnostics must be visible in dashboard, not only console, An entity I expect just doesn't show up anywhere (+1 more)

### Community 21 - "version.json page cache-bust / Release rules"
Cohesion: 0.38
Nodes (7): ASSET_VERSION ?v= reused by every loadScript(), casa:hass-states-delta differential state push, HA /local/ 31-day cache, panel.js, Release 1.1.1, version.json page cache-busting without restarting HA, Release rules (user config outside HACS folder, single VERSION in panel.js, v-prefixed tags)

### Community 22 - "Mobile Dashboard View / Cose Accese Adesso"
Cohesion: 0.40
Nodes (6): Cose Accese Adesso (Active Devices List), Bottom Navigation Bar (Casa/Stanze/Irrigazione/Energia/Auto/Meteo), Modalità Casa (Home Mode Selector), Mobile Dashboard View (Screenshot), Chi è in Casa (Presence Tracker), Weather Widget (19°, Sunny)

### Community 23 - "mapEnergyPrefs.test.mjs / call"
Cohesion: 0.33
Nodes (3): __dirname, sandbox, src

### Community 25 - "Build live_dashboard.zip Ste / Attach to Release Step"
Cohesion: 0.67
Nodes (3): Attach to Release Step, Build live_dashboard.zip Step, HACS zip_release content_in_root Convention

### Community 26 - "Live Dashboard README Header / Home Assistant"
Cohesion: 1.00
Nodes (3): Live Dashboard README Header Banner, Home Assistant, Live Dashboard

### Community 27 - "Energia Dashboard View / Live Power KPI Cards"
Cohesion: 1.00
Nodes (3): Energia Dashboard View, Live Power KPI Cards (Produzione/Consumo/Prelievo), Produzione e Prelievo Bar Chart

### Community 28 - "Irrigazione / Zona 1 Irrigation Card"
Cohesion: 1.00
Nodes (3): Irrigazione (Irrigation) Dashboard View, Zona 1 Irrigation Card, Zona 2 Irrigation Card

## Ambiguous Edges - Review These
- `panel.js` → `dash_neumo_mobile.html (phone layout)`  [AMBIGUOUS]
  public/dash_neumo_mobile.html · relation: conceptually_related_to
- `componentDidMount()` → `_camLayerFailed()`  [AMBIGUOUS]
  public/casa-core.js · relation: conceptually_related_to
- `ALL_CAMERAS_RESULT()` → `renderVals: cameras (camList, camMain, camHomeTiles)`  [AMBIGUOUS]
  public/dash_neumo.html · relation: semantically_similar_to
- `[data-sel="true"] !important override` → `Constraint 1: literal style= attribute (property:{{ value }})`  [AMBIGUOUS]
  CLAUDE.md · relation: conceptually_related_to

## Knowledge Gaps
- **51 isolated node(s):** `FOLDER_NAME`, `__dirname`, `__dirname`, `window`, `sandbox` (+46 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `panel.js` and `dash_neumo_mobile.html (phone layout)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `componentDidMount()` and `_camLayerFailed()`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `ALL_CAMERAS_RESULT()` and `renderVals: cameras (camList, camMain, camHomeTiles)`?**
  _Edge tagged AMBIGUOUS (relation: semantically_similar_to) - confidence is low._
- **What is the exact relationship between `[data-sel="true"] !important override` and `Constraint 1: literal style= attribute (property:{{ value }})`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `CasaComponentBase` connect `CasaComponentBase / vmSettingsDiag` to `renderVals / dash_neumo.html`, `prefs.js / _loadIrrigationEnds`, `renderVals / dash_neumo_mobile.html`, `casa-core.js / _boot`?**
  _High betweenness centrality (0.137) - this node is a cross-community bridge._
- **Why does `loadReactUmd()` connect `casa-core.js / _boot` to `support.js / walk`, `renderVals / dash_neumo_mobile.html`?**
  _High betweenness centrality (0.081) - this node is a cross-community bridge._
- **Why does `dash_neumo_mobile.html (phone layout)` connect `renderVals / dash_neumo_mobile.html` to `renderVals / dash_neumo.html`, `CasaPanel / panel.js`?**
  _High betweenness centrality (0.062) - this node is a cross-community bridge._
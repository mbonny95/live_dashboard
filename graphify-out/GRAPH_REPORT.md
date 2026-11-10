# Graph Report - .  (2026-11-10)

## Corpus Check
- 36 files · ~126,985 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 606 nodes · 1274 edges · 42 communities (35 shown, 7 thin omitted)
- Extraction: 90% EXTRACTED · 10% INFERRED · 0% AMBIGUOUS · INFERRED: 128 edges (avg confidence: 0.85)
- Token cost: 313,674 input · 0 output

## Community Hubs (Navigation)
- CasaComponentBase / PREFS
- renderVals / dash_neumo.html
- support.js / walk
- renderVals / dash_neumo_mobile.html
- _boot / casa-core.js
- CasaPanel / panel.js
- discovery.js / discoverRooms
- TROUBLESHOOTING / Forceable demo data scenario
- prefs.js / _checkIrrigationEnds
- README / Panel custom element tag der
- CHANGELOG v1.8.1 / Live Dashboard — irrigation 
- Diagnostics panel / Diagnostica -> Ultime azioni
- CHANGELOG v1.9.0 / Camera live view actually li
- CHANGELOG / CHANGELOG v1.0.0
- Templating constraints / Never same expression in two
- Three-Tile Compact Energy Le / Casa
- Settings panel tabs / Density before one-screen fi
- ha-backend-demo.js / connect
- CLAUDE.md — project instruct / ASSET_VERSION cache-bust pro
- Energy role color grammar / Energy role colors
- Config at config/www/live_da / HACS support
- Settings panel / Home section order
- Single-ring energy fallback / Double concentric energy rin
- CHANGELOG v1.5.4 / Vendored hls.js 1.7.4
- CHANGELOG v1.4.1 / Summing every energy_prefs e
- Mobile Dashboard View / Cose Accese Adesso
- mapEnergyPrefs.test.mjs / call
- powerVal / CHANGELOG v1.5.3
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

## God Nodes (most connected - your core abstractions)
1. `CasaComponentBase` - 89 edges
2. `renderVals() (mobile)` - 37 edges
3. `CHANGELOG (Live Dashboard)` - 36 edges
4. `renderVals()` - 35 edges
5. `PREFS()` - 28 edges
6. `README (Live Dashboard)` - 25 edges
7. `dash_neumo.html (desktop wall-tablet layout)` - 25 edges
8. `CasaPanel` - 21 edges
9. `CHANGELOG v1.9.0` - 20 edges
10. `_boot()` - 19 edges

## Surprising Connections (you probably didn't know these)
- `User config in config/www/live_dashboard_config.js` --semantically_similar_to--> `Config at config/www/live_dashboard_config.js, outside the HACS folder`  [INFERRED] [semantically similar]
  CLAUDE.md → CHANGELOG.md
- `An entity I expect just doesn't show up anywhere` --conceptually_related_to--> `discoverRooms discard-reason logging (entities not shown)`  [INFERRED]
  TROUBLESHOOTING.md → CHANGELOG.md
- `Verify presentation changes by looking (screenshot/DOM)` --conceptually_related_to--> `Energy role color grammar (sage = solar, terracotta = grid)`  [AMBIGUOUS]
  CLAUDE.md → CHANGELOG.md
- `HA energy schema flat for grid (stat_energy_from top level)` --semantically_similar_to--> `Flat grid source schema in HA energy prefs`  [INFERRED] [semantically similar]
  CLAUDE.md → CHANGELOG.md
- `Dynamic src/href/points via ref callback after mount` --semantically_similar_to--> `Deferred src/href/points binding after mount`  [INFERRED] [semantically similar]
  CLAUDE.md → CHANGELOG.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **v1.9.0 camera live view repair** — changelog_camera_stable_video_ref_callback, changelog_camera_real_muting, changelog_load_chained_fast_stills, changelog_idempotent_bind_attr, changelog_camera_live_layer_order, changelog_camera_runtime_fallback, changelog_camera_connecting_badge, changelog_vendored_hls_js [EXTRACTED 1.00]
- **Offline startup guarantee (vendored assets, integrity test, visible runtime source)** — changelog_vendored_react_runtime, changelog_vendored_web_fonts, changelog_vendored_hls_js, changelog_vendor_manifest, changelog_node_test_suite_ci, changelog_diagnostica_runtime_react_row, readme_no_internet_requirement [EXTRACTED 1.00]
- **No-silent-failure observability surfaced in Diagnostica** — changelog_diagnostics_panel, changelog_call_service_choke_point, changelog_discard_reason_logging, changelog_panel_custom_name_self_check, changelog_battery_sign_self_diagnosis, changelog_camera_runtime_fallback, changelog_self_explanatory_empty_states [INFERRED 0.85]
- **User-visible diagnostics instead of console-only logs** — claude_diagnostics_visible_rule, changelog_diagnostics_panel, changelog_discard_reason_logging, changelog_recent_actions_ring_buffer, changelog_diagnostica_runtime_react_row, changelog_embed_iframe_diag_row [INFERRED 0.85]
- **Shared sage/terracotta energy color grammar across ring, bars, strip** — claude_energy_role_colors, changelog_double_concentric_ring, changelog_hourly_ring_strip, changelog_energy_role_color_grammar [INFERRED 0.85]
- **Templating pitfalls found in the field** — claude_style_literal, claude_dynamic_src_href_points, claude_sc_if_dual_placeholder, changelog_deferred_src_href_binding [INFERRED 0.75]
- **Alarm code-gated arm/disarm flow** — changelog_alarm_pin_awareness, changelog_alarm_pin_pad, changelog_alarm_pin_pad, changelog_recent_actions_ring_buffer, troubleshooting_alarm_buttons_tap_but_nothing_happens [INFERRED 0.85]
- **Camera live-view layer fallback chain (hls.js -> native HLS -> fast stills)** — public_casa_core_camstartstream, public_casa_core_ensurehlsjs, public_casa_core_attachhlsjs, public_casa_core_camcannative, public_casa_core_camvideoref, public_casa_core_camlayerfailed, public_casa_core_camstartfastpoll, public_casa_core_setcamdiag, public_casa_core_camdiag_field [EXTRACTED 1.00]
- **Irrigation auto-close via persisted deadlines** — public_casa_core_runvalve, public_casa_core_loadirrigationends, public_casa_core_checkirrigationends, public_casa_core_componentdidmount, public_casa_core_call, public_casa_core_irrigationends_state, public_prefs_saveirrigationends, public_prefs_loadirrigationends [EXTRACTED 1.00]
- **Settings handlers -> SAVE_PREFS -> CasaPrefs.save write path** — public_casa_core_settings_set_room, public_casa_core_settings_clear_room, public_casa_core_settings_move_room, public_casa_core_settings_move_section, public_casa_core_settings_reset_sections, public_casa_core_settings_set_entity, public_casa_core_settings_clear_entity, public_casa_core_settings_set_camera, public_casa_core_settings_clear_camera, public_casa_core_settings_toggle_tapgate, public_casa_core_settings_set_module, public_casa_core_settings_set_power_unit, public_casa_core_settings_set_plug_threshold, public_casa_core_settings_set_battery_sign, public_casa_core_settings_reset, public_casa_core_prefs, public_casa_core_save_prefs, public_casa_core_prefs_state, public_prefs_save [EXTRACTED 1.00]
- **Alarm code-gated action flow** — public_dash_neumo_vm_alarm_buttons, public_dash_neumo_alarmguardedcall, public_dash_neumo_vm_pin_pad, public_dash_neumo_tpl_pin_pad, public_casa_core_call [EXTRACTED 1.00]
- **Energy stacking grammar (ring, legend, hourly strip)** — public_dash_neumo_vm_energy_ring, public_dash_neumo_vm_hourly_strip, public_dash_neumo_tpl_energy_ring, public_dash_neumo_tpl_hourly_strip, public_dash_neumo_energy_role_colors [INFERRED 0.85]
- **Head boot sequence** — public_dash_neumo_vendored_react_tags, public_dash_neumo_casa_react_source, public_dash_neumo_casa_core_loader, public_dash_neumo_support_js_tag, public_dash_neumo_vendored_fonts [EXTRACTED 1.00]
- **Mobile head boot sequence (React vendored, CasaCore, support.js)** — public_dash_neumo_mobile_vendored_react_tags, public_dash_neumo_mobile_casa_react_source, public_dash_neumo_mobile_casa_core_loader, public_casa_core_file, public_support_loadreactumd [EXTRACTED 1.00]
- **Mobile alarm PIN flow** — public_dash_neumo_mobile_pin_pad, public_dash_neumo_mobile_vm_alarm_pin, public_dash_neumo_mobile_tab_casa, public_casa_core_alarm_id, public_casa_core_call [INFERRED 0.85]
- **Mobile camera live view layers** — public_dash_neumo_mobile_camera_overlay, public_dash_neumo_mobile_vm_cameras, public_casa_core_camvideoref, public_casa_core_camstartstream, public_casa_core_camlayerfailed [INFERRED 0.75]

## Communities (42 total, 7 thin omitted)

### Community 0 - "CasaComponentBase / PREFS"
Cohesion: 0.07
Nodes (76): ALL_CAMERAS_RESULT(), ALL_ROOMS_RESULT(), applianceState(), at(), batteryPowerSign(), _batterySignBuffer, batterySignVerdict(), _camStartFastPoll() (+68 more)

### Community 1 - "renderVals / dash_neumo.html"
Cohesion: 0.06
Nodes (63): _actionLog ring buffer, ALARM(), ALARM_ID(), call(), cover(), alarmGuardedCall(), Destructure of window.CasaCore helpers (DEFAULT_CONFIG, mergeConfig, bust, loadScript, switchScenario, loadUserConfig...), Component extends CasaCore.base(DCLogic) (+55 more)

### Community 2 - "support.js / walk"
Cohesion: 0.07
Nodes (48): boot(), collectProps(), compileAttr(), compileTemplate(), contentKey(), createComponentFactory(), createHelmetManager(), createPseudoSheet() (+40 more)

### Community 3 - "renderVals / dash_neumo_mobile.html"
Cohesion: 0.08
Nodes (48): applianceItems(), _attachHlsJs(), _bindAttr(), _camCanNative(), camDiag (instance field), _camLayerFailed(), _camStartStream(), _camVideoRef() (+40 more)

### Community 4 - "_boot / casa-core.js"
Cohesion: 0.10
Nodes (30): ASSET_V, base(), _boot(), bust(), window.CasaCore namespace, CONFIG_PATHS, DEFAULT_CONFIG, _ensureHlsJs() (+22 more)

### Community 5 - "CasaPanel / panel.js"
Cohesion: 0.12
Nodes (11): CasaPanel, fetchDailyCounterHistory(), fetchDailyLastSample(), fetchHistory(), fetchHourlyEnergy(), fetchRawHistory(), fetchTodayStatsDelta(), FOLDER_NAME (+3 more)

### Community 6 - "discovery.js / discoverRooms"
Cohesion: 0.20
Nodes (16): collectConfiguredEntities(), collectConfiguredEntityModules(), discoverAlarm(), discoverAllOfDomain(), discoverCameras(), discoverEnergyEntities(), discoverPeople(), discoverRooms() (+8 more)

### Community 7 - "TROUBLESHOOTING / Forceable demo data scenario"
Cohesion: 0.15
Nodes (19): Battery sign self-diagnosis with one-tap invert, Forceable demo data scenarios (?demo&scenario=…), Self-explanatory empty states (three cases), CHANGELOG v0.2.0, CHANGELOG v1.6.0, Demo mode (?demo, file://), House consumption, derived automatically, TROUBLESHOOTING (+11 more)

### Community 8 - "prefs.js / _checkIrrigationEnds"
Cohesion: 0.18
Nodes (16): _checkIrrigationEnds(), irrigationEnds state, _loadIrrigationEnds(), runValve(), diagRowLine(), diagText(), load(), loadIrrigationEnds() (+8 more)

### Community 9 - "README / Panel custom element tag der"
Cohesion: 0.15
Nodes (18): Appliances module (config.appliances), Panel custom element tag derived from deploy folder (<folder>-panel), panel_custom name: self-check, Smart plug three-level state (off / active / running), CHANGELOG v0.2.1, CHANGELOG v1.1.0, panel_custom tag derived from folder (<cartella>-panel), Appliances (optional) (+10 more)

### Community 10 - "CHANGELOG v1.8.1 / Live Dashboard — irrigation "
Cohesion: 0.20
Nodes (17): Live Dashboard — irrigation safety close (automation blueprint), Domain-aware close action (switch.turn_off / valve.close_valve), max_minutes input (default 20, 1-240 min), Restart sweep closing still-open switches and valves, restart trigger (homeassistant start), too_long trigger (state on/open for max_minutes), valves input (switch.* / valve.* multi-entity selector), call() as single choke point for service calls (+9 more)

### Community 11 - "Diagnostics panel / Diagnostica -> Ultime azioni"
Cohesion: 0.20
Nodes (16): Test workflow (GitHub Actions), node --test 'tests/*.test.mjs', node-test job (ubuntu-latest, Node 22), Alarm PIN awareness (gated no-op with explanatory note), Alarm PIN pad, Copy diagnostics button, Diagnostics panel (Settings -> Diagnostica), discoverRooms discard-reason logging (entities not shown) (+8 more)

### Community 12 - "CHANGELOG v1.9.0 / Camera live view actually li"
Cohesion: 0.25
Nodes (16): 'Connecting…' live badge until frames play, Camera live layer order: hls.js, then native HLS, then stills, Camera live view actually live (broken since v1.5.4), Real muting of the camera video element, Automatic camera layer fallback on runtime error, Stable per-stream video ref callback, Differential state push (casa:hass-states-delta), Diagnostica -> Ambiente -> 'Runtime React' row (+8 more)

### Community 13 - "CHANGELOG / CHANGELOG v1.0.0"
Cohesion: 0.15
Nodes (14): Removal of appliance remaining-time text, Exclusion of config-referenced entities from generic room lists, Grid figure tooltip on the Fotovoltaico card, CHANGELOG (Live Dashboard), Zero-areas empty state with link to Settings -> Areas, Root padding matching neumorphic shadow reach, CHANGELOG v0.1.0, CHANGELOG v1.0.0 (+6 more)

### Community 14 - "Templating constraints / Never same expression in two"
Cohesion: 0.18
Nodes (12): [data-sel="true"] !important selected-state fix, Deferred src/href/points binding after mount, First render resolves unresolved holes silently, CHANGELOG v1.0.1, CHANGELOG v1.4.2, Dynamic src/href/points via ref callback after mount, noDiagActionRows, renderVals() (+4 more)

### Community 15 - "Three-Tile Compact Energy Le / Casa"
Cohesion: 0.25
Nodes (11): Casa Dashboard Screenshot, Allarme (Alarm) Card, Double-Ring Energy Gauge (7,6 kWh), Autoconsumo Tile (6,2 kWh), Dalla Rete Tile (1,4 kWh), Immessi in Rete Tile (3,6 kWh), Three-Tile Compact Energy Legend, Fotovoltaico Compact Card Layout (+3 more)

### Community 16 - "Settings panel tabs / Density before one-screen fi"
Cohesion: 0.20
Nodes (10): Adaptive Casa surveillance card (1-4 tiles, +N more, motion-first), Extended room domains, binary_sensor and sensor pills, Room tiles sized to content (min-content rows), Settings panel tabs (Stanze · Energia · Telecamere · Diagnostica), CHANGELOG v1.4.8, CHANGELOG v1.4.9, Density before one-screen fit (44px targets, 10px text), Retired 1280x800 no-scroll constraint (v1.4.9) (+2 more)

### Community 17 - "ha-backend-demo.js / connect"
Cohesion: 0.29
Nodes (6): buildRegistries(), cloneStates(), connect(), patchConfig(), rand(), scenarioConfig()

### Community 18 - "CLAUDE.md — project instruct / ASSET_VERSION cache-bust pro"
Cohesion: 0.28
Nodes (9): ASSET_VERSION cache-bust propagated to every loadScript(), CHANGELOG v1.1.1, CLAUDE.md — project instructions, Regenerate graphify-out/ in the same commit, No graphify post-commit hook, Session start orientation (graphify wiki/report, latest CHANGELOG), Verify graph coverage by symbol grep, not node count, Single VERSION in public/panel.js for cache-busting (+1 more)

### Community 19 - "Energy role color grammar / Energy role colors"
Cohesion: 0.36
Nodes (9): Compact Fotovoltaico card value tiles, Real cover position band on the cover card, Energy role color grammar (sage = solar, terracotta = grid), Fed-to-grid third bar in the trend chart, Hourly ring history strip (24 stacked bars), CHANGELOG v1.4.5, CHANGELOG v1.8.0, Energy role colors (--sage self-consumption, --acc import, --feed export) (+1 more)

### Community 20 - "Config at config/www/live_da / HACS support"
Cohesion: 0.25
Nodes (9): Config at config/www/live_dashboard_config.js, outside the HACS folder, Example config renamed live_dashboard_config.example.js, HACS support (custom repository, Dashboard category), CHANGELOG v1.3.0, CHANGELOG v1.3.1, live_dashboard.zip release asset, A tag is not a release (push tag + gh release create), User config in config/www/live_dashboard_config.js (+1 more)

### Community 21 - "Settings panel / Home section order"
Cohesion: 0.31
Nodes (9): Cover slider long-press / NaN position fix, Export as config.js, Home section order (Alarm/Energy/Surveillance), Per-user settings persistence via frontend/set_user_data, Settings panel (gear icon), CHANGELOG v1.5.0, CHANGELOG v1.5.2, CHANGELOG v1.7.0 (+1 more)

### Community 22 - "Single-ring energy fallback / Double concentric energy rin"
Cohesion: 0.31
Nodes (9): Double concentric energy ring, Energy mapping from HA Energy dashboard (energy/get_prefs), Single-ring energy fallback, CHANGELOG v1.4.0, CHANGELOG v1.4.7, Zero-config Energy tab and no-data chart message, Enabling Energy (role-based sensor mapping), Reading the ring (two concentric rings) (+1 more)

### Community 23 - "CHANGELOG v1.5.4 / Vendored hls.js 1.7.4"
Cohesion: 0.48
Nodes (7): Alarm panel auto-discovery, Three-layer camera live view strategy (camera/stream HLS), CHANGELOG v1.5.4, Vendored hls.js 1.7.4 (hls.light.min.js), Alarm card has no buttons, or fewer than expected, Rooms are empty, or show far fewer entities than expected, The live camera overlay is a black/broken image

### Community 24 - "CHANGELOG v1.4.1 / Summing every energy_prefs e"
Cohesion: 0.29
Nodes (7): Butt linecap for near-zero ring segments, Summing every energy_prefs entry per role, Energy resolution console.info at boot, Flat grid source schema in HA energy prefs, CHANGELOG v1.4.1, CHANGELOG v1.4.3, HA energy schema flat for grid (stat_energy_from top level)

### Community 25 - "Mobile Dashboard View / Cose Accese Adesso"
Cohesion: 0.40
Nodes (6): Cose Accese Adesso (Active Devices List), Bottom Navigation Bar (Casa/Stanze/Irrigazione/Energia/Auto/Meteo), Modalità Casa (Home Mode Selector), Mobile Dashboard View (Screenshot), Chi è in Casa (Presence Tracker), Weather Widget (19°, Sunny)

### Community 26 - "mapEnergyPrefs.test.mjs / call"
Cohesion: 0.33
Nodes (3): __dirname, sandbox, src

### Community 27 - "powerVal / CHANGELOG v1.5.3"
Cohesion: 0.60
Nodes (5): Daily-totals consistency in energy notes (gridNote, periodNote), Instantaneous power unit setting (Auto / W / kW), powerVal() unit-normalizing helper, CHANGELOG v1.5.3, Instantaneous power unit (README)

### Community 29 - "Build live_dashboard.zip Ste / Attach to Release Step"
Cohesion: 0.67
Nodes (3): Attach to Release Step, Build live_dashboard.zip Step, HACS zip_release content_in_root Convention

### Community 30 - "Live Dashboard README Header / Home Assistant"
Cohesion: 1.00
Nodes (3): Live Dashboard README Header Banner, Home Assistant, Live Dashboard

### Community 31 - "Energia Dashboard View / Live Power KPI Cards"
Cohesion: 1.00
Nodes (3): Energia Dashboard View, Live Power KPI Cards (Produzione/Consumo/Prelievo), Produzione e Prelievo Bar Chart

### Community 32 - "Irrigazione / Zona 1 Irrigation Card"
Cohesion: 1.00
Nodes (3): Irrigazione (Irrigation) Dashboard View, Zona 1 Irrigation Card, Zona 2 Irrigation Card

## Ambiguous Edges - Review These
- `panel.js` → `dash_neumo_mobile.html`  [AMBIGUOUS]
  public/dash_neumo_mobile.html · relation: conceptually_related_to
- `Energy role color grammar (sage = solar, terracotta = grid)` → `Verify presentation changes by looking (screenshot/DOM)`  [AMBIGUOUS]
  CLAUDE.md · relation: conceptually_related_to
- `[data-sel="true"] !important selected-state fix` → `Literal style= attribute (property:{{ value }})`  [AMBIGUOUS]
  CLAUDE.md · relation: conceptually_related_to

## Knowledge Gaps
- **32 isolated node(s):** `FOLDER_NAME`, `__dirname`, `__dirname`, `sandbox`, `__dirname` (+27 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `panel.js` and `dash_neumo_mobile.html`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Energy role color grammar (sage = solar, terracotta = grid)` and `Verify presentation changes by looking (screenshot/DOM)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `[data-sel="true"] !important selected-state fix` and `Literal style= attribute (property:{{ value }})`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `CasaComponentBase` connect `CasaComponentBase / PREFS` to `prefs.js / _checkIrrigationEnds`, `renderVals / dash_neumo.html`, `renderVals / dash_neumo_mobile.html`, `_boot / casa-core.js`?**
  _High betweenness centrality (0.109) - this node is a cross-community bridge._
- **Why does `dash_neumo.html (desktop wall-tablet layout)` connect `renderVals / dash_neumo.html` to `renderVals / dash_neumo_mobile.html`, `_boot / casa-core.js`, `CasaPanel / panel.js`?**
  _High betweenness centrality (0.058) - this node is a cross-community bridge._
- **Why does `_boot()` connect `_boot / casa-core.js` to `CasaComponentBase / PREFS`, `prefs.js / _checkIrrigationEnds`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._
- **What connects `FOLDER_NAME`, `__dirname`, `__dirname` to the rest of the system?**
  _32 weakly-connected nodes found - possible documentation gaps or missing edges._
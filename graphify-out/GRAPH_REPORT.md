# Graph Report - .  (2026-11-06)

## Corpus Check
- 34 files · ~132,552 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 571 nodes · 1034 edges · 38 communities (31 shown, 7 thin omitted)
- Extraction: 90% EXTRACTED · 10% INFERRED · 0% AMBIGUOUS · INFERRED: 106 edges (avg confidence: 0.85)
- Token cost: 343,001 input · 0 output

## Community Hubs (Navigation)
- support.js / walk
- _boot / prefs.js
- discovery.js / renderVals
- README / CHANGELOG v1.9.0
- renderVals / _camStartFastPoll
- TROUBLESHOOTING / Diagnostics panel
- dash_neumo.html / call
- CasaPanel / panel.js
- PREFS / SAVE_PREFS
- _camStartStream / _camLayerFailed
- Live Dashboard — irrigation  / Timed irrigation close deadl
- CHANGELOG / Config at config/www/live_da
- Three-Tile Compact Energy Le / Casa
- Settings panel tabs / Density before one-screen fi
- Energy role color grammar / Double concentric energy rin
- ha-backend-demo.js / connect
- CLAUDE.md — project instruct / ASSET_VERSION cache-bust pro
- Settings panel / Home section order
- Templating constraints / Deferred src/href/points bin
- Energy mapping from HA Energ / CHANGELOG v1.4.1
- Mobile Dashboard View / Cose Accese Adesso
- mapEnergyPrefs.test.mjs / call
- discovery.test.mjs / __dirname
- powerVal / CHANGELOG v1.5.3
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
1. `CHANGELOG (Live Dashboard)` - 36 edges
2. `renderVals()` - 28 edges
3. `README (Live Dashboard)` - 25 edges
4. `CasaPanel` - 21 edges
5. `CHANGELOG v1.9.0` - 20 edges
6. `renderVals()` - 20 edges
7. `TROUBLESHOOTING` - 18 edges
8. `PREFS()` - 17 edges
9. `SAVE_PREFS(prefs)` - 16 edges
10. `_boot()` - 15 edges

## Surprising Connections (you probably didn't know these)
- `User config in config/www/live_dashboard_config.js` --semantically_similar_to--> `Config at config/www/live_dashboard_config.js, outside the HACS folder`  [INFERRED] [semantically similar]
  CLAUDE.md → CHANGELOG.md
- `Verify presentation changes by looking (screenshot/DOM)` --conceptually_related_to--> `Energy role color grammar (sage = solar, terracotta = grid)`  [AMBIGUOUS]
  CLAUDE.md → CHANGELOG.md
- `Dynamic src/href/points via ref callback after mount` --semantically_similar_to--> `Deferred src/href/points binding after mount`  [INFERRED] [semantically similar]
  CLAUDE.md → CHANGELOG.md
- `panel_custom tag derived from folder (<cartella>-panel)` --semantically_similar_to--> `Panel custom element tag derived from deploy folder (<folder>-panel)`  [INFERRED] [semantically similar]
  CLAUDE.md → CHANGELOG.md
- `HA energy schema flat for grid (stat_energy_from top level)` --semantically_similar_to--> `Flat grid source schema in HA energy prefs`  [INFERRED] [semantically similar]
  CLAUDE.md → CHANGELOG.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **User-visible diagnostics instead of console-only logs** — claude_diagnostics_visible_rule, changelog_diagnostics_panel, changelog_discard_reason_logging, changelog_recent_actions_ring_buffer, changelog_diagnostica_runtime_react_row, changelog_embed_iframe_diag_row [INFERRED 0.85]
- **Shared sage/terracotta energy color grammar across ring, bars, strip** — claude_energy_role_colors, changelog_double_concentric_ring, changelog_hourly_ring_strip, changelog_energy_role_color_grammar [INFERRED 0.85]
- **Templating pitfalls found in the field** — claude_style_literal, claude_dynamic_src_href_points, claude_sc_if_dual_placeholder, changelog_deferred_src_href_binding [INFERRED 0.75]
- **Alarm code-gated arm/disarm flow** — changelog_alarm_pin_awareness, changelog_alarm_pin_pad, changelog_alarm_pin_pad, changelog_recent_actions_ring_buffer, troubleshooting_alarm_buttons_tap_but_nothing_happens [INFERRED 0.85]
- **v1.9.0 camera live view repair** — changelog_camera_stable_video_ref_callback, changelog_camera_real_muting, changelog_load_chained_fast_stills, changelog_idempotent_bind_attr, changelog_camera_live_layer_order, changelog_camera_runtime_fallback, changelog_camera_connecting_badge, changelog_vendored_hls_js [EXTRACTED 1.00]
- **Offline startup guarantee (vendored assets, integrity test, visible runtime source)** — changelog_vendored_react_runtime, changelog_vendored_web_fonts, changelog_vendored_hls_js, changelog_vendor_manifest, changelog_node_test_suite_ci, changelog_diagnostica_runtime_react_row, readme_no_internet_requirement [EXTRACTED 1.00]
- **No-silent-failure observability surfaced in Diagnostica** — changelog_diagnostics_panel, changelog_call_service_choke_point, changelog_discard_reason_logging, changelog_panel_custom_name_self_check, changelog_battery_sign_self_diagnosis, changelog_camera_runtime_fallback, changelog_self_explanatory_empty_states [INFERRED 0.85]
- **Camera live-view layer fallback chain** — public_dash_neumo_cam_start_stream, public_dash_neumo_cam_video_ref, public_dash_neumo_attach_hls_js, public_dash_neumo_cam_layer_failed, public_dash_neumo_cam_start_fast_poll, public_dash_neumo_cam_diag [EXTRACTED 1.00]
- **Alarm PIN pad flow** — public_dash_neumo_alarm_guarded_call, public_dash_neumo_pin_state, public_dash_neumo_pin_keys, public_dash_neumo_pin_submit, public_dash_neumo_pin_cancel, public_dash_neumo_pin_pad_template, public_dash_neumo_call [EXTRACTED 1.00]
- **v1.9.0 offline vendored assets (React, fonts, hls.js)** — public_dash_neumo_vendor_react_scripts, public_dash_neumo_font_face_vendor, public_dash_neumo_ensure_hls_js, public_dash_neumo_casa_react_source [INFERRED 0.85]
- **Camera live view layered fallback (hls.js -> native HLS -> snapshot)** — public_dash_neumo_mobile_camstartstream, public_dash_neumo_mobile_camvideoref, public_dash_neumo_mobile_camlayerfailed, public_dash_neumo_mobile_attachhlsjs, public_dash_neumo_mobile_ensurehlsjs, public_dash_neumo_mobile_camstartfastpoll, public_dash_neumo_mobile_camstopfastpoll, public_dash_neumo_mobile_camdiag [EXTRACTED 1.00]
- **Alarm PIN pad flow** — public_dash_neumo_mobile_alarmguardedcall, public_dash_neumo_mobile_state_pin, public_dash_neumo_mobile_pinkeys, public_dash_neumo_mobile_pindigit, public_dash_neumo_mobile_pinback, public_dash_neumo_mobile_pinsubmit, public_dash_neumo_mobile_pincancel, public_dash_neumo_mobile_pin_pad_template [EXTRACTED 1.00]
- **v1.9.0 offline assets (vendored React, fonts, hls.js)** — public_dash_neumo_mobile_vendor_react_scripts, public_dash_neumo_mobile_casa_react_source, public_dash_neumo_mobile_font_face_vendor_fonts, public_dash_neumo_mobile_hls_vendor, public_dash_neumo_mobile_diag_env_rows [INFERRED 0.85]

## Communities (38 total, 7 thin omitted)

### Community 0 - "support.js / walk"
Cohesion: 0.07
Nodes (49): boot(), collectProps(), compileAttr(), compileTemplate(), contentKey(), createComponentFactory(), createExternalModules(), createHelmetManager() (+41 more)

### Community 1 - "_boot / prefs.js"
Cohesion: 0.06
Nodes (45): _actionLog ring buffer (last 20 calls), _boot(), call(domain, service, data), _checkIrrigationEnds(), state.irrigationEnds (valve deadlines), Irrigation zones model (isRunning from valve, makeDurationButton), _loadIrrigationEnds(), ASSET_V (cache-bust version from ?v=) (+37 more)

### Community 2 - "discovery.js / renderVals"
Cohesion: 0.07
Nodes (42): ALL_CAMERAS_RESULT(), ALL_ROOMS_RESULT(), batteryPowerSign(), batterySignVerdict(), deriveConsumption(), diagEnergyDaily(), diagEnergyInstant(), diagEnvironment() (+34 more)

### Community 3 - "README / CHANGELOG v1.9.0"
Cohesion: 0.08
Nodes (48): Alarm panel auto-discovery, Appliances module (config.appliances), 'Connecting…' live badge until frames play, Camera live layer order: hls.js, then native HLS, then stills, Camera live view actually live (broken since v1.5.4), Real muting of the camera video element, Automatic camera layer fallback on runtime error, Stable per-stream video ref callback (+40 more)

### Community 4 - "renderVals / _camStartFastPoll"
Cohesion: 0.07
Nodes (44): ALL_CAMERAS_RESULT(), ALL_ROOMS_RESULT(), _attachHlsJs(), batteryPowerSign(), batterySignVerdict(), _bindAttr(), Camera badge (Connecting... vs Live vs snapshot), Camera live view template (video / img / no-stream) (+36 more)

### Community 5 - "TROUBLESHOOTING / Diagnostics panel"
Cohesion: 0.07
Nodes (46): Test workflow (GitHub Actions), node --test 'tests/*.test.mjs', node-test job (ubuntu-latest, Node 22), Alarm PIN awareness (gated no-op with explanatory note), Alarm PIN pad, Battery sign self-diagnosis with one-tap invert, call() as single choke point for service calls, Copy diagnostics button (+38 more)

### Community 6 - "dash_neumo.html / call"
Cohesion: 0.08
Nodes (35): alarmGuardedCall(), window.CASA_REACT_SOURCE (local|cdn), Component (extends DCLogic), _ensureHlsJs(), dash_neumo.html (desktop dashboard), @font-face Caprasimo/Figtree from ./vendor/fonts/, _actionLog (Ultime azioni), alarmGuardedCall() (+27 more)

### Community 7 - "CasaPanel / panel.js"
Cohesion: 0.13
Nodes (10): CasaPanel, fetchDailyCounterHistory(), fetchDailyLastSample(), fetchHistory(), fetchHourlyEnergy(), fetchRawHistory(), fetchTodayStatsDelta(), FOLDER_NAME (+2 more)

### Community 8 - "PREFS / SAVE_PREFS"
Cohesion: 0.16
Nodes (19): plugStatus(), plugThresholdW(), PREFS(), SAVE_PREFS(prefs), SETTINGS_CLEAR_CAMERA(), SETTINGS_CLEAR_ENTITY(), SETTINGS_CLEAR_ROOM(), SETTINGS_MOVE_ROOM() (+11 more)

### Community 9 - "_camStartStream / _camLayerFailed"
Cohesion: 0.18
Nodes (19): _attachHlsJs(video, url), _bindAttr(name, value), _camCanNative(), Camera badge (Connecting… vs Live vs snapshot), Camera detail template (<video ref=camVideoRef>, <img ref=camStreamSrcRef>), camDiag (per-camera layer diagnostics), _camLayerFailed(layer, detail), _camStartFastPoll() (+11 more)

### Community 10 - "Live Dashboard — irrigation  / Timed irrigation close deadl"
Cohesion: 0.16
Nodes (18): Live Dashboard — irrigation safety close (automation blueprint), Domain-aware close action (switch.turn_off / valve.close_valve), max_minutes input (default 20, 1-240 min), Restart sweep closing still-open switches and valves, restart trigger (homeassistant start), too_long trigger (state on/open for max_minutes), valves input (switch.* / valve.* multi-entity selector), Exclusion of config-referenced entities from generic room lists (+10 more)

### Community 11 - "CHANGELOG / Config at config/www/live_da"
Cohesion: 0.16
Nodes (15): Removal of appliance remaining-time text, Config at config/www/live_dashboard_config.js, outside the HACS folder, Example config renamed live_dashboard_config.example.js, HACS support (custom repository, Dashboard category), CHANGELOG (Live Dashboard), Root padding matching neumorphic shadow reach, CHANGELOG v0.1.0, CHANGELOG v1.3.0 (+7 more)

### Community 12 - "Three-Tile Compact Energy Le / Casa"
Cohesion: 0.25
Nodes (11): Casa Dashboard Screenshot, Allarme (Alarm) Card, Double-Ring Energy Gauge (7,6 kWh), Autoconsumo Tile (6,2 kWh), Dalla Rete Tile (1,4 kWh), Immessi in Rete Tile (3,6 kWh), Three-Tile Compact Energy Legend, Fotovoltaico Compact Card Layout (+3 more)

### Community 13 - "Settings panel tabs / Density before one-screen fi"
Cohesion: 0.20
Nodes (10): Adaptive Casa surveillance card (1-4 tiles, +N more, motion-first), Extended room domains, binary_sensor and sensor pills, Room tiles sized to content (min-content rows), Settings panel tabs (Stanze · Energia · Telecamere · Diagnostica), CHANGELOG v1.4.8, CHANGELOG v1.4.9, Density before one-screen fit (44px targets, 10px text), Retired 1280x800 no-scroll constraint (v1.4.9) (+2 more)

### Community 14 - "Energy role color grammar / Double concentric energy rin"
Cohesion: 0.33
Nodes (10): Compact Fotovoltaico card value tiles, Real cover position band on the cover card, Double concentric energy ring, Energy role color grammar (sage = solar, terracotta = grid), Fed-to-grid third bar in the trend chart, Hourly ring history strip (24 stacked bars), CHANGELOG v1.4.5, CHANGELOG v1.8.0 (+2 more)

### Community 15 - "ha-backend-demo.js / connect"
Cohesion: 0.29
Nodes (6): buildRegistries(), cloneStates(), connect(), patchConfig(), rand(), scenarioConfig()

### Community 16 - "CLAUDE.md — project instruct / ASSET_VERSION cache-bust pro"
Cohesion: 0.28
Nodes (9): ASSET_VERSION cache-bust propagated to every loadScript(), CHANGELOG v1.1.1, CLAUDE.md — project instructions, Regenerate graphify-out/ in the same commit, No graphify post-commit hook, Session start orientation (graphify wiki/report, latest CHANGELOG), Verify graph coverage by symbol grep, not node count, Single VERSION in public/panel.js for cache-busting (+1 more)

### Community 17 - "Settings panel / Home section order"
Cohesion: 0.31
Nodes (9): Cover slider long-press / NaN position fix, Export as config.js, Home section order (Alarm/Energy/Surveillance), Per-user settings persistence via frontend/set_user_data, Settings panel (gear icon), CHANGELOG v1.5.0, CHANGELOG v1.5.2, CHANGELOG v1.7.0 (+1 more)

### Community 18 - "Templating constraints / Deferred src/href/points bin"
Cohesion: 0.22
Nodes (9): Deferred src/href/points binding after mount, First render resolves unresolved holes silently, Flat grid source schema in HA energy prefs, CHANGELOG v1.4.2, CHANGELOG v1.4.3, Dynamic src/href/points via ref callback after mount, HA energy schema flat for grid (stat_energy_from top level), Templating constraints (found in the field) (+1 more)

### Community 19 - "Energy mapping from HA Energ / CHANGELOG v1.4.1"
Cohesion: 0.25
Nodes (8): Butt linecap for near-zero ring segments, Energy mapping from HA Energy dashboard (energy/get_prefs), Summing every energy_prefs entry per role, Energy resolution console.info at boot, CHANGELOG v1.4.1, CHANGELOG v1.4.7, Zero-config Energy tab and no-data chart message, Energy charts are empty or look wrong

### Community 20 - "Mobile Dashboard View / Cose Accese Adesso"
Cohesion: 0.40
Nodes (6): Cose Accese Adesso (Active Devices List), Bottom Navigation Bar (Casa/Stanze/Irrigazione/Energia/Auto/Meteo), Modalità Casa (Home Mode Selector), Mobile Dashboard View (Screenshot), Chi è in Casa (Presence Tracker), Weather Widget (19°, Sunny)

### Community 21 - "mapEnergyPrefs.test.mjs / call"
Cohesion: 0.33
Nodes (3): __dirname, sandbox, src

### Community 23 - "powerVal / CHANGELOG v1.5.3"
Cohesion: 0.83
Nodes (4): Instantaneous power unit setting (Auto / W / kW), powerVal() unit-normalizing helper, CHANGELOG v1.5.3, Instantaneous power unit (README)

### Community 24 - "Build live_dashboard.zip Ste / Attach to Release Step"
Cohesion: 0.67
Nodes (3): Attach to Release Step, Build live_dashboard.zip Step, HACS zip_release content_in_root Convention

### Community 25 - "Live Dashboard README Header / Home Assistant"
Cohesion: 1.00
Nodes (3): Live Dashboard README Header Banner, Home Assistant, Live Dashboard

### Community 26 - "Energia Dashboard View / Live Power KPI Cards"
Cohesion: 1.00
Nodes (3): Energia Dashboard View, Live Power KPI Cards (Produzione/Consumo/Prelievo), Produzione e Prelievo Bar Chart

### Community 27 - "Irrigazione / Zona 1 Irrigation Card"
Cohesion: 1.00
Nodes (3): Irrigazione (Irrigation) Dashboard View, Zona 1 Irrigation Card, Zona 2 Irrigation Card

## Ambiguous Edges - Review These
- `Verify presentation changes by looking (screenshot/DOM)` → `Energy role color grammar (sage = solar, terracotta = grid)`  [AMBIGUOUS]
  CLAUDE.md · relation: conceptually_related_to
- `Literal style= attribute (property:{{ value }})` → `[data-sel="true"] !important selected-state fix`  [AMBIGUOUS]
  CLAUDE.md · relation: conceptually_related_to

## Knowledge Gaps
- **33 isolated node(s):** `FOLDER_NAME`, `__dirname`, `__dirname`, `sandbox`, `__dirname` (+28 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Verify presentation changes by looking (screenshot/DOM)` and `Energy role color grammar (sage = solar, terracotta = grid)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Literal style= attribute (property:{{ value }})` and `[data-sel="true"] !important selected-state fix`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `load()` connect `_boot / prefs.js` to `support.js / walk`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **Why does `renderVals()` connect `renderVals / _camStartFastPoll` to `_boot / prefs.js`, `discovery.js / renderVals`, `dash_neumo.html / call`?**
  _High betweenness centrality (0.066) - this node is a cross-community bridge._
- **Are the 4 inferred relationships involving `renderVals()` (e.g. with `ALL_CAMERAS_RESULT()` and `Energy view block of renderVals (rings, hourly strip, flows)`) actually correct?**
  _`renderVals()` has 4 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `README (Live Dashboard)` (e.g. with `Copy diagnostics button` and `Diagnostics panel (Settings -> Diagnostica)`) actually correct?**
  _`README (Live Dashboard)` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `FOLDER_NAME`, `__dirname`, `__dirname` to the rest of the system?**
  _33 weakly-connected nodes found - possible documentation gaps or missing edges._
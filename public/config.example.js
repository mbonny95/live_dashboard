// config.js — local overrides for the auto-discovery defaults.
//
// Copy this file to config.js next to it (config.js is git-ignored — it's
// meant to hold your own entity IDs, never commit it) and uncomment only the
// keys you need. Everything below is optional: with no config.js at all, the
// dashboard discovers rooms, people, weather and quick actions on its own
// from Home Assistant's area/device/entity registries.
//
// Any key left `null` (or an empty array where noted) means "try to
// auto-discover it, and hide the section if nothing is found" — a missing
// section never breaks the page.
//
// Classic script, not an ES module (`window.CASA_CONFIG =`, not
// `export default`) — see the note at the top of discovery.js: dynamic
// import() of config.js would break the "must open from file://" demo-mode
// requirement, since Chrome blocks ES module fetches from file:// origins.

window.CASA_CONFIG = {
  // Rooms come from Home Assistant's areas automatically. Use this only to
  // fine-tune the result:
  rooms: {
    order: [],   // area IDs (or names) to pin first, in this order — e.g. ['soggiorno', 'cucina']
    hide: [],    // area IDs (or names) to exclude entirely
    max: 8,      // tiles on the Casa view grid — the layout is fixed at 4 columns and does not scroll, so keep this at 8 unless you also changed the grid
    icons: {}    // area ID -> icon id, to override the guessed icon — e.g. { cucina: '#i-house' }
  },

  // Alarm panel: the dashboard never guesses which alarm_control_panel is
  // "the" one (there could be several, or none). Set the entity_id to show
  // the alarm card; leave null to hide it.
  alarm: null,   // 'alarm_control_panel.home'

  // "Modalità casa" style scene switcher: an input_select whose options
  // become buttons, paired with a script that receives { mode: <option> }.
  // There's no generic way to auto-discover this pairing, so it's opt-in.
  modes: null,   // { select: 'input_select.house_mode', script: 'script.set_house_mode' }

  // People shown in "who's home". [] auto-discovers every person.* entity.
  // Pass an explicit list only if you want to show a subset or a fixed order.
  people: [],    // ['person.alex', 'person.sam']

  // weather.* entity for the forecast card. null auto-discovers the first
  // weather entity Home Assistant reports.
  weather: null, // 'weather.home'

  // Quick actions ("all lights off", "all covers up/down"). null generates
  // them from every light/cover entity discovery finds (across all rooms,
  // not just the 8 shown on the grid).
  quickActions: null,

  // --- optional modules — the tab bar adapts to how many of these are set ---

  // Energy: independent of any specific inverter brand. Map your own
  // integration's sensors to these roles — see README.md for examples
  // (FusionSolar, SolarEdge, Fronius, Shelly EM, HA's own Energy Dashboard).
  energy: null,
  // energy: {
  //   production: 'sensor.solar_power',        // instantaneous production, W or kW
  //   consumption: 'sensor.house_power',        // instantaneous house load
  //   gridImport: 'sensor.grid_import_power',
  //   gridExport: 'sensor.grid_export_power',
  //   battery: null,                            // { soc: 'sensor...', power: 'sensor...' } or null
  //   inverterStatus: null,                     // sensor.* with a text state, or null
  //   productionToday: 'sensor.solar_energy_today',   // daily counter, resets at midnight
  //   gridToday: 'sensor.grid_import_today',          // daily counter, resets at midnight
  //   price: null                               // sensor.* in currency/kWh, or null
  // },

  // Irrigation: zone by zone, degrading gracefully — with just `moisture` +
  // a way to run water (`valve` or `buttons`, see below) a zone is already
  // useful (sparkline, timed run buttons, valve state). Advisory/deficit/ET
  // fields are extra and only appear if set. The agronomic math (ET0/ETc/
  // deficit) is not part of this dashboard — see README.md for a link to
  // the automations that compute it.
  irrigation: null,
  // irrigation: {
  //   zones: [
  //     { name: 'Zone 1', moisture: 'sensor.zone1_soil_moisture',
  //       // Two ways to run a timed watering — set one, not both:
  //       valve: 'switch.zone1_valve',   // a switch this dashboard opens then closes itself after N minutes
  //       durations: [5, 10, 15],        // minutes offered as buttons, paired with `valve` above
  //       buttons: null,                 // [{ minutes: 5, entity: 'input_button.zone1_5min' }, ...] — for
  //                                       // installs where a script/automation already owns the timing and
  //                                       // there's no switch to drive directly; takes over from `valve` if set
  //       advisory: null, deficit: null, weekMm: null, lastRun: null }
  //   ],
  //   weather: { temp: null, humidity: null, rain: null, irradiance: null, wind: null },
  //   et0: null, etc: null, effectiveRain: null, summary: null,
  //   resetButton: null   // input_button.* that zeroes your own weekly-mm accumulator, or null to hide the button
  // },

  // Vehicle: the "Auto" tab. No Home Assistant domain standardizes car
  // telemetry, so every field is an explicit sensor/binary_sensor mapping —
  // works with any integration that exposes these (Mercedes me, Volvo, Kia
  // Connect, BMW Connected Drive, OBD-II readers, ...). null hides the tab.
  vehicle: null,
  // vehicle: {
  //   fuel: 'sensor.car_fuel_level',       // % — omit (or null) for EVs
  //   battery: null,                       // % state of charge, for EVs
  //   range: 'sensor.car_range',
  //   odometer: 'sensor.car_odometer',
  //   cells: [                             // extra readouts, shown as-is
  //     { label: 'AdBlue', entity: 'sensor.car_adblue_level', unit: '%' }
  //   ],
  //   warnings: [                          // binary_sensor.* shown as ok/attention chips
  //     { entity: 'binary_sensor.car_tire_warning', label: 'Tyre pressure' },
  //     { entity: 'binary_sensor.car_windows_closed', label: 'Windows', positiveIsGood: true }
  //   ]
  // },

  // Appliances (washer, dryer, ...): no Home Assistant domain standardizes
  // "is it running", so like vehicle this is an explicit list. Each entry is
  // matched to a room by resolving `status`'s own area (same rule as
  // everything else — its own area, else its device's), so there's no
  // separate room field to fill in. A switch listed as `powerSwitch` stops
  // being auto-discovered as a plain toggle in that room, since it'd be the
  // same physical control shown twice.
  appliances: null,
  // appliances: [
  //   { name: 'Washer', icon: '#i-wash',
  //     status: 'sensor.washer_state',        // any sensor/binary_sensor — its raw state is shown as-is unless mapped below
  //     idleStates: ['off', 'power_off', 'idle', 'unavailable', 'unknown'],  // states that count as "not running"; override if your integration's vocabulary differs
  //     stateLabels: { washing: 'Washing', rinsing: 'Rinsing', spinning: 'Spin' },  // optional — translates raw states into nicer text; unmapped states show as-is
  //     remaining: 'sensor.washer_remaining_time',  // optional, minutes — shown only while running
  //     energyToday: 'sensor.washer_energy_today',  // optional — shown only while idle
  //     powerSwitch: 'switch.washer_power'    // optional — adds an off button; a switch "on" isn't the same as "running", so this never drives the status shown
  //   }
  // ],

  // Cameras: fully auto-discovered from every camera.* entity Home Assistant
  // reports (area from the registry, motion from a binary_sensor with
  // device_class "motion" on the same device) — this block only overrides
  // the defaults. No cameras found = the card and the "Sorveglianza"/
  // "Surveillance" tab don't exist. The tab itself only appears with 2+
  // cameras; with exactly one there's just the card in Casa and the tap-to
  // fullscreen overlay.
  cameras: null
  // cameras: {
  //   primary: null,        // entity_id featured in the Casa card; null = auto (first with motion, else first found)
  //   hideUntilTap: [],     // entity_ids that show an icon instead of a live preview until tapped — for indoor cameras on a hallway tablet
  //   snapshotInterval: 10, // seconds between preview refreshes; suspended while the tab/page isn't visible
  //   gridTab: 6             // camera count above which the Sorveglianza grid switches from 2 to 3 columns
  // }
};

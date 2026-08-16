// ===========================================================================
//  HA BACKEND — DEMO IMPLEMENTATION
//
//  Same contract as ha-backend-panel.js (see that file), but talks to an
//  entirely invented, in-memory Home Assistant instead of a real one. Every
//  entity here is fictional — generic room names, "Alex" and "Sam" as the
//  people, no reference to any real installation. This is what runs when
//  the page is opened with ?demo, or opened directly with no panel_custom
//  host to answer it (e.g. straight from file://).
//
//  It exists so someone can open the page and see the dashboard working —
//  all views, Energy and Irrigation included — before installing anything.
//
//  Classic script, not an ES module (see discovery.js's top comment for why)
//  — wrapped in an IIFE since it shares one global scope with every other
//  file loaded via loadScript() in dash_neumo*.html, and ha-backend-panel.js
//  declares its own same-named BACKEND_KIND / connect.
// ===========================================================================

(function () {

const BACKEND_KIND = 'demo';

const TICK_MS = 4000;

function entity(id, area_id, state, attributes) {
  return { entity_id: id, area_id, state, attributes: attributes || {} };
}

// A handful of generic, clearly-fake rooms — including a few extra ones with
// nothing but a light, so the "+N stanze" overflow affordance (rooms.max, see
// discovery.js) has something to show even in the demo.
const SEED = [
  entity('light.soggiorno', 'soggiorno', 'on', { friendly_name: 'Soggiorno', brightness: 210 }),
  entity('cover.soggiorno_tapparella', 'soggiorno', 'open', { friendly_name: 'Tapparella soggiorno', current_position: 70 }),
  entity('media_player.soggiorno_tv', 'soggiorno', 'playing', { friendly_name: 'TV soggiorno', media_title: 'Demo channel' }),
  entity('sensor.soggiorno_temperatura', 'soggiorno', '21.4', { friendly_name: 'Temperatura soggiorno', device_class: 'temperature', unit_of_measurement: '°C' }),
  entity('sensor.soggiorno_umidita', 'soggiorno', '48', { friendly_name: 'Umidità soggiorno', device_class: 'humidity', unit_of_measurement: '%' }),
  // Extra room-card pill candidates (see v1.4.8 fix ticket, B2/B3): more than
  // 4 compete here on purpose, to prove the card actually caps at 4 and
  // respects the allarmi/aperture/presenza/temperatura/umidità/resto order
  // instead of just showing whichever sensor happened to be discovered first.
  entity('binary_sensor.soggiorno_finestra', 'soggiorno', 'on', { friendly_name: 'Finestra soggiorno', device_class: 'window' }),
  entity('sensor.soggiorno_illuminamento', 'soggiorno', '240', { friendly_name: 'Luminosità soggiorno', device_class: 'illuminance', unit_of_measurement: 'lx' }),
  entity('sensor.soggiorno_telecomando_batteria', 'soggiorno', '12', { friendly_name: 'Telecomando TV batteria', device_class: 'battery', unit_of_measurement: '%' }),

  entity('light.camera', 'camera', 'off', { friendly_name: 'Camera' }),
  entity('cover.camera_tapparella', 'camera', 'closed', { friendly_name: 'Tapparella camera', current_position: 0 }),
  entity('climate.camera', 'camera', 'heat', { friendly_name: 'Termostato camera', temperature: 20, current_temperature: 19.5 }),

  entity('light.camera_bimbi', 'camera_bimbi', 'off', { friendly_name: 'Camera bimbi' }),
  entity('cover.camera_bimbi_tapparella', 'camera_bimbi', 'closed', { friendly_name: 'Tapparella camera bimbi', current_position: 10 }),

  entity('light.cucina', 'cucina', 'on', { friendly_name: 'Cucina', brightness: 255 }),
  entity('switch.cucina_forno', 'cucina', 'off', { friendly_name: 'Forno' }),
  // Same device as the oven switch — proves a switch shows its own device's
  // wattage in the room panel (B4) without becoming a pill or a row of its
  // own (see DEVICE_LINKS below).
  entity('sensor.cucina_forno_potenza', 'cucina', '38', { friendly_name: 'Forno potenza', device_class: 'power', unit_of_measurement: 'W' }),
  entity('binary_sensor.cucina_movimento', 'cucina', 'on', { friendly_name: 'Movimento cucina', device_class: 'motion' }),

  entity('light.bagno', 'bagno', 'off', { friendly_name: 'Bagno' }),
  entity('cover.bagno_tapparella', 'bagno', 'open', { friendly_name: 'Tapparella bagno', current_position: 100 }),
  entity('humidifier.bagno_deumidificatore', 'bagno', 'off', { friendly_name: 'Deumidificatore bagno' }),
  entity('binary_sensor.bagno_allagamento', 'bagno', 'on', { friendly_name: 'Sensore allagamento bagno', device_class: 'moisture' }),

  entity('light.studio', 'studio', 'on', { friendly_name: 'Studio', brightness: 180 }),
  entity('switch.studio_stampante', 'studio', 'off', { friendly_name: 'Stampante' }),

  entity('light.ingresso', 'ingresso', 'off', { friendly_name: 'Ingresso' }),
  entity('cover.ingresso_tapparella_1', 'ingresso', 'open', { friendly_name: 'Tapparella ingresso 1', current_position: 100 }),
  entity('cover.ingresso_tapparella_2', 'ingresso', 'open', { friendly_name: 'Tapparella ingresso 2', current_position: 100 }),
  entity('sensor.ingresso_temperatura', 'ingresso', '19.8', { friendly_name: 'Temperatura ingresso', device_class: 'temperature', unit_of_measurement: '°C' }),
  entity('lock.ingresso_porta', 'ingresso', 'unlocked', { friendly_name: 'Porta ingresso' }),

  entity('switch.lavatrice', 'lavanderia', 'off', { friendly_name: 'Lavatrice' }),
  entity('vacuum.robot_aspirapolvere', 'lavanderia', 'docked', { friendly_name: 'Robot aspirapolvere' }),

  // appliances (Fase successiva — nessun dominio HA generico per "in corso",
  // quindi mappatura esplicita via config.appliances; vedi DEMO_CONFIG sotto)
  entity('sensor.lavatrice_stato', 'lavanderia', 'lavaggio', { friendly_name: 'Lavatrice stato' }),
  entity('sensor.lavatrice_energia_oggi', 'lavanderia', '340', { friendly_name: 'Lavatrice energia oggi', unit_of_measurement: 'Wh' }),
  entity('binary_sensor.asciugatrice_stato', 'lavanderia', 'off', { friendly_name: 'Asciugatrice stato' }),

  entity('light.giardino', 'giardino', 'off', { friendly_name: 'Luci giardino' }),
  entity('fan.giardino_ventilazione', 'giardino', 'off', { friendly_name: 'Ventilazione veranda' }),

  entity('switch.garage_luce', 'garage', 'off', { friendly_name: 'Luce garage' }),
  entity('cover.garage_portone', 'garage', 'closed', { friendly_name: 'Portone garage', current_position: 0 }),

  entity('light.corridoio', 'corridoio', 'off', { friendly_name: 'Corridoio' }),
  entity('sensor.corridoio_co2', 'corridoio', '640', { friendly_name: 'CO₂ corridoio', device_class: 'carbon_dioxide', unit_of_measurement: 'ppm' }),
  entity('sensor.corridoio_pm25', 'corridoio', '9', { friendly_name: 'PM2.5 corridoio', device_class: 'pm25', unit_of_measurement: 'µg/m³' }),

  // A diagnostic entity in an otherwise-normal area, to prove the
  // disabled_by/hidden_by/entity_category filters actually apply in the
  // demo too, not just in discovery.js's unit-level logic.
  entity('sensor.router_wifi_rssi', 'corridoio', '-52', { friendly_name: 'RSSI router', unit_of_measurement: 'dBm' }),

  // people
  entity('person.alex', null, 'home', { friendly_name: 'Alex' }),
  entity('person.sam', null, 'not_home', { friendly_name: 'Sam' }),

  // weather + alarm + modes
  entity('weather.demo_home', null, 'partlycloudy', { friendly_name: 'Casa', temperature: 18.5 }),
  // Optional local weather station (see DEMO_CONFIG.weatherStation below) —
  // feelsLike/dewPoint have no other config field, so demo needs its own
  // entities to show them at all.
  entity('sensor.station_feels_like', null, '17.8', { friendly_name: 'Percepita', unit_of_measurement: '°C' }),
  entity('sensor.station_dew_point', null, '9.4', { friendly_name: 'Punto di rugiada', unit_of_measurement: '°C' }),
  entity('sun.sun', null, 'above_horizon', {}),
  entity('alarm_control_panel.demo_home', null, 'disarmed', { friendly_name: 'Allarme', supported_features: 7 }),
  entity('input_select.house_mode', null, 'Casa', { friendly_name: 'Modalità casa', options: ['Casa', 'Fuori', 'Notte', 'Cinema'] }),

  // energy (Fase 3 — generic roles, not tied to any inverter brand)
  entity('sensor.solar_power', null, '2.3', { friendly_name: 'Produzione FV', unit_of_measurement: 'kW' }),
  entity('sensor.house_power', null, '1.1', { friendly_name: 'Consumo casa', unit_of_measurement: 'kW' }),
  entity('sensor.grid_import_power', null, '0.0', { friendly_name: 'Prelievo rete', unit_of_measurement: 'kW' }),
  entity('sensor.grid_export_power', null, '1.2', { friendly_name: 'Immissione rete', unit_of_measurement: 'kW' }),
  entity('sensor.battery_soc', null, '68', { friendly_name: 'Batteria', unit_of_measurement: '%' }),
  entity('sensor.battery_power', null, '0.4', { friendly_name: 'Potenza batteria', unit_of_measurement: 'kW' }),
  entity('sensor.inverter_status', null, 'normal', { friendly_name: 'Stato inverter' }),
  entity('sensor.solar_energy_today', null, '9.8', { friendly_name: 'Prodotti oggi', unit_of_measurement: 'kWh' }),
  entity('sensor.grid_import_today', null, '1.4', { friendly_name: 'Prelevati oggi', unit_of_measurement: 'kWh' }),
  // Plausible enough for the double ring to look real: ~63% self-consumption
  // (autoconsumo = 9.8 - 3.6 = 6.2 kWh of the 9.8 produced).
  entity('sensor.grid_export_today', null, '3.6', { friendly_name: 'Immessi oggi', unit_of_measurement: 'kWh' }),
  entity('sensor.electricity_price', null, '0.22', { friendly_name: 'Prezzo elettricità', unit_of_measurement: '€/kWh' }),

  // irrigation (Fase 3 — two zones, generic)
  entity('sensor.zone1_soil_moisture', null, '34', { friendly_name: 'Umidità zona 1', unit_of_measurement: '%' }),
  entity('switch.zone1_valve', null, 'off', { friendly_name: 'Valvola zona 1' }),
  entity('sensor.zone1_advisory', null, 'Irrigare presto', { minuti_consigliati: 12, urgenza: 'moderata', umidita_suolo: '34%' }),
  entity('input_number.zone1_deficit', null, '3.2', { friendly_name: 'Deficit zona 1', unit_of_measurement: 'mm' }),
  entity('input_number.zone1_week_mm', null, '9', { friendly_name: 'Settimana zona 1', unit_of_measurement: 'mm' }),
  entity('input_datetime.zone1_last_run', null, new Date(Date.now() - 2 * 86400000).toISOString(), { friendly_name: 'Ultima irrigazione zona 1' }),

  entity('sensor.zone2_soil_moisture', null, '52', { friendly_name: 'Umidità zona 2', unit_of_measurement: '%' }),
  entity('switch.zone2_valve', null, 'off', { friendly_name: 'Valvola zona 2' }),
  entity('sensor.zone2_advisory', null, 'Suolo ok', { minuti_consigliati: 0, urgenza: '', umidita_suolo: '52%' }),
  entity('input_number.zone2_deficit', null, '0.6', { friendly_name: 'Deficit zona 2', unit_of_measurement: 'mm' }),
  entity('input_number.zone2_week_mm', null, '14', { friendly_name: 'Settimana zona 2', unit_of_measurement: 'mm' }),
  entity('input_datetime.zone2_last_run', null, new Date(Date.now() - 5 * 86400000).toISOString(), { friendly_name: 'Ultima irrigazione zona 2' }),

  // vehicle (optional module — see live_dashboard_config.example.js)
  entity('sensor.car_fuel_level', null, '64', { friendly_name: 'Livello carburante', unit_of_measurement: '%' }),
  entity('sensor.car_range', null, '480', { friendly_name: 'Autonomia', unit_of_measurement: 'km' }),
  entity('sensor.car_odometer', null, '38210', { friendly_name: 'Contachilometri', unit_of_measurement: 'km' }),
  entity('sensor.car_adblue_level', null, '78', { friendly_name: 'AdBlue', unit_of_measurement: '%' }),
  entity('binary_sensor.car_tire_warning', null, 'off', { friendly_name: 'Pressione pneumatici' }),
  entity('binary_sensor.car_windows_closed', null, 'on', { friendly_name: 'Finestrini' }),

  // cameras (Fase 3 — no entity_picture on purpose: the demo has no real
  // camera feed to show, so every tile stays on its icon placeholder, same
  // as a real installation whose camera integration hasn't produced a
  // snapshot yet. camera.corridoio is flagged hideUntilTap below to exercise
  // the privacy tap-to-reveal behavior in the demo too.
  entity('camera.cancello', 'giardino', 'idle', { friendly_name: 'Cancello' }),
  entity('binary_sensor.cancello_motion', 'giardino', 'on', { friendly_name: 'Movimento cancello', device_class: 'motion' }),
  entity('camera.ingresso', 'ingresso', 'idle', { friendly_name: 'Ingresso' }),
  entity('camera.corridoio', 'corridoio', 'idle', { friendly_name: 'Corridoio' })
];

// entity_id -> device_id, only for the pairs that need to prove the
// "motion sensor on the same device as the camera" discovery link — every
// other demo entity has no device at all (buildRegistries defaults to null).
const DEVICE_LINKS = {
  'camera.cancello': 'device_cancello',
  'binary_sensor.cancello_motion': 'device_cancello',
  'switch.cucina_forno': 'device_forno',
  'sensor.cucina_forno_potenza': 'device_forno'
};

const AREA_NAMES = {
  soggiorno: 'Soggiorno', camera: 'Camera', camera_bimbi: 'Camera Bimbi', cucina: 'Cucina',
  bagno: 'Bagno', studio: 'Studio', ingresso: 'Ingresso', lavanderia: 'Lavanderia',
  giardino: 'Giardino', garage: 'Garage', corridoio: 'Corridoio'
};

// config.js overrides don't apply to the demo (there's no real installation
// behind it) — the dashboards use this fixed mapping instead whenever
// backend.kind === 'demo', so Energy/Irrigation/Vehicle/alarm/modes all show
// up without anyone having to write a config.js just to see the demo.
const DEMO_CONFIG = {
  alarm: 'alarm_control_panel.demo_home',
  modes: { select: 'input_select.house_mode', script: 'script.set_house_mode' },
  people: [],
  weather: 'weather.demo_home',
  quickActions: null,
  energy: {
    production: 'sensor.solar_power', consumption: 'sensor.house_power',
    gridImport: 'sensor.grid_import_power', gridExport: 'sensor.grid_export_power',
    battery: { soc: 'sensor.battery_soc', power: 'sensor.battery_power' },
    inverterStatus: 'sensor.inverter_status',
    productionToday: 'sensor.solar_energy_today', gridToday: 'sensor.grid_import_today',
    gridExportToday: 'sensor.grid_export_today',
    price: 'sensor.electricity_price'
  },
  irrigation: {
    zones: [
      { name: 'Zona 1', moisture: 'sensor.zone1_soil_moisture', valve: 'switch.zone1_valve',
        durations: [5, 10, 15], advisory: 'sensor.zone1_advisory', deficit: 'input_number.zone1_deficit',
        weekMm: 'input_number.zone1_week_mm', lastRun: 'input_datetime.zone1_last_run' },
      { name: 'Zona 2', moisture: 'sensor.zone2_soil_moisture', valve: 'switch.zone2_valve',
        durations: [5, 10, 15], advisory: 'sensor.zone2_advisory', deficit: 'input_number.zone2_deficit',
        weekMm: 'input_number.zone2_week_mm', lastRun: 'input_datetime.zone2_last_run' }
    ],
    weather: null, et0: null, etc: null, effectiveRain: null, summary: null
  },
  // feelsLike/dewPoint have no other config field to fall back to; temp/
  // humidity/wind/rain/irradiance/et0 would reuse irrigation.weather/et0 if
  // those were set above, but the demo leaves them null on purpose to also
  // exercise the "weather station with no irrigation configured" path.
  weatherStation: { feelsLike: 'sensor.station_feels_like', dewPoint: 'sensor.station_dew_point' },
  vehicle: {
    fuel: 'sensor.car_fuel_level', battery: null, range: 'sensor.car_range', odometer: 'sensor.car_odometer',
    cells: [{ label: 'AdBlue', entity: 'sensor.car_adblue_level', unit: '%' }],
    warnings: [
      { entity: 'binary_sensor.car_tire_warning', label: 'Pressione pneumatici' },
      { entity: 'binary_sensor.car_windows_closed', label: 'Finestrini', positiveIsGood: true }
    ]
  },
  cameras: {
    primary: null, hideUntilTap: ['camera.corridoio'], snapshotInterval: 10, gridTab: 6
  },
  appliances: [
    { name: 'Lavatrice', icon: '#i-wash', status: 'sensor.lavatrice_stato',
      stateLabels: { lavaggio: 'Lavaggio' },
      energyToday: 'sensor.lavatrice_energia_oggi',
      powerSwitch: 'switch.lavatrice' },
    { name: 'Asciugatrice', icon: '#i-dryer', status: 'binary_sensor.asciugatrice_stato' }
  ]
};

function buildRegistries() {
  const areas = Object.keys(AREA_NAMES).map((id) => ({ area_id: id, name: AREA_NAMES[id], icon: null }));
  const entities = SEED.map((e) => ({
    entity_id: e.entity_id, area_id: e.area_id, device_id: DEVICE_LINKS[e.entity_id] || null,
    disabled_by: null, hidden_by: null,
    entity_category: e.entity_id === 'sensor.router_wifi_rssi' ? 'diagnostic' : null
  }));
  return { areas, devices: [], entities };
}

function cloneStates() {
  const out = {};
  for (const e of SEED) out[e.entity_id] = { state: e.state, attributes: Object.assign({}, e.attributes) };
  return out;
}

function rand(min, max) { return min + Math.random() * (max - min); }

async function connect(handlers) {
  const states = cloneStates();
  const registries = buildRegistries();
  let closed = false;
  let timer = null;

  function emit() { if (!closed) handlers.onStates(Object.assign({}, states)); }

  handlers.onStatus('connecting');
  await new Promise((r) => setTimeout(r, 350));
  if (closed) return demoBackend();
  emit();
  handlers.onStatus('connected');

  // A light random walk on a few sensors so the demo doesn't look frozen —
  // purely cosmetic, no relation to how a real installation behaves.
  timer = setInterval(() => {
    const t = states['sensor.soggiorno_temperatura'];
    if (t) t.state = (parseFloat(t.state) + rand(-0.15, 0.15)).toFixed(1);
    const solar = states['sensor.solar_power'];
    if (solar) solar.state = Math.max(0, parseFloat(solar.state) + rand(-0.2, 0.2)).toFixed(2);
    const house = states['sensor.house_power'];
    if (house) house.state = Math.max(0.1, parseFloat(house.state) + rand(-0.1, 0.1)).toFixed(2);
    emit();
  }, TICK_MS);

  function setState(id, state, attrs) {
    const e = states[id];
    if (!e) return;
    if (state !== undefined) e.state = state;
    if (attrs) Object.assign(e.attributes, attrs);
  }

  function ids(data) {
    const t = (data && data.target) || {};
    const raw = t.entity_id !== undefined ? t.entity_id : (data && data.entity_id);
    return raw == null ? [] : Array.isArray(raw) ? raw : [raw];
  }

  function demoBackend() {
    return {
      kind: BACKEND_KIND,

      call: async function (domain, service, data) {
        await new Promise((r) => setTimeout(r, 120));
        const targets = ids(data);

        if (domain === 'light') {
          for (const id of targets) {
            if (service === 'turn_on') setState(id, 'on', data && data.brightness !== undefined ? { brightness: data.brightness } : {});
            else if (service === 'turn_off') setState(id, 'off');
            else if (service === 'toggle') setState(id, states[id] && states[id].state === 'on' ? 'off' : 'on');
          }
        } else if (domain === 'switch') {
          for (const id of targets) setState(id, service === 'turn_on' ? 'on' : 'off');
        } else if (domain === 'cover') {
          for (const id of targets) {
            if (service === 'open_cover') setState(id, 'open', { current_position: 100 });
            else if (service === 'close_cover') setState(id, 'closed', { current_position: 0 });
            else if (service === 'set_cover_position') {
              const pos = Number(data.position);
              setState(id, pos === 0 ? 'closed' : 'open', { current_position: pos });
            }
            // stop_cover: no state change in the demo, same as a real cover mid-travel.
          }
        } else if (domain === 'media_player') {
          for (const id of targets) setState(id, service === 'turn_on' ? 'playing' : 'off');
        } else if (domain === 'vacuum') {
          for (const id of targets) {
            setState(id, 'returning');
            setTimeout(() => { setState(id, 'docked'); emit(); }, 3000);
          }
        } else if (domain === 'lock') {
          for (const id of targets) setState(id, service === 'unlock' ? 'unlocked' : 'locked');
        } else if (domain === 'humidifier') {
          for (const id of targets) setState(id, service === 'turn_on' ? 'on' : 'off');
        } else if (domain === 'alarm_control_panel') {
          const map = { alarm_disarm: 'disarmed', alarm_arm_home: 'armed_home', alarm_arm_away: 'armed_away', alarm_arm_night: 'armed_night', alarm_arm_vacation: 'armed_vacation' };
          for (const id of targets) if (map[service]) setState(id, map[service]);
        } else if (domain === 'script' && service === 'set_house_mode' && data && data.mode) {
          setState('input_select.house_mode', data.mode);
        } else if (domain === 'input_button' && service === 'press') {
          // No persistent state for a button press in the demo — the caller
          // (irrigation zone "N min" buttons) drives the valve directly via
          // switch.turn_on/turn_off instead.
        }
        emit();
      },

      history: async function (entity_id, points) {
        await new Promise((r) => setTimeout(r, 80));
        const n = Math.max(1, points || 30);
        if (/soil_ch|soil_moisture/.test(entity_id)) {
          // 48h-style short window, slow-moving.
          let v = 40;
          return Array.from({ length: n }, () => (v += rand(-1.5, 1.2), v = Math.max(15, Math.min(70, v)), Math.round(v)));
        }
        if (/_today$/.test(entity_id)) {
          // Daily counters: plausible day-by-day totals, not a running walk.
          const base = entity_id.indexOf('grid') !== -1 ? 2 : 9;
          return Array.from({ length: n }, () => Math.max(0, base + rand(-base * 0.6, base * 0.6)));
        }
        let v = 20;
        return Array.from({ length: n }, () => (v += rand(-0.8, 0.8), Math.round(v * 10) / 10));
      },

      registries: async function () {
        await new Promise((r) => setTimeout(r, 60));
        return registries;
      },

      // The demo's DEMO_CONFIG.energy above always sets production/
      // gridToday/gridExportToday explicitly, which take precedence over
      // both of these in the resolution cascade (see dash_neumo*.html) — so
      // neither is ever actually called in demo mode. Implemented anyway
      // for contract completeness, same as any other backend.
      energyPrefs: async function () {
        return null;
      },

      energyToday: async function () {
        return null;
      },

      close: function () {
        closed = true;
        if (timer) clearInterval(timer);
      }
    };
  }

  return demoBackend();
}

window.CasaBackendDemo = { BACKEND_KIND, connect, DEMO_CONFIG };

})();

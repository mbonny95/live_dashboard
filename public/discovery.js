// discovery.js — turns Home Assistant's registries + live states into the
// room/people/weather/quick-action data the dashboards render, with config.js
// as the only source of manual overrides. No entity IDs are hardcoded here:
// everything is found by area/device membership and domain/device_class.
//
// Input shapes (all plain data, no HA classes):
//   states     { entity_id: { state, attributes } }
//   registries { areas: [...], devices: [...], entities: [...] }  — raw
//               config/*_registry/list results, or the demo backend's
//               fabricated equivalent (see ha-backend-demo.js)
//   config     the merged config.js (see live_dashboard_config.example.js)

// Wrapped in an IIFE: this is a classic script sharing one global scope with
// every other file loaded via loadScript() in dash_neumo*.html (see the note
// above about why these aren't ES modules), so top-level names must not leak
// and collide with another file's (e.g. two files both declaring `connect`).
(function () {

const CONTROLLABLE_DOMAINS = ['light', 'switch', 'cover', 'media_player', 'climate', 'fan', 'vacuum',
  'humidifier', 'lock', 'water_heater', 'valve', 'lawn_mower', 'siren'];

const DOMAIN_ICON = {
  light: '#i-bulb', switch: '#i-plug', cover: '#i-shutter-close', media_player: '#i-tv',
  climate: '#i-therm', fan: '#i-wind', vacuum: '#i-bot',
  humidifier: '#i-drop', lock: '#i-lock', water_heater: '#i-therm', valve: '#i-drop',
  lawn_mower: '#i-bot', siren: '#i-alert'
};

// binary_sensor device_class -> pill. Only entities currently `on` ever
// produce a pill (see discoverRooms) — a closed window or an empty room is
// the normal state and would just be noise. `group` drives both the card's
// pill priority order and whether the pill counts toward a room being
// "busy" — see discoverRooms and dash_neumo*.html's buildRoom.
const BINARY_PILL_CLASS = {
  door: { icon: '#i-door', group: 'openings' },
  garage_door: { icon: '#i-door', group: 'openings' },
  window: { icon: '#i-window', group: 'openings' },
  opening: { icon: '#i-window', group: 'openings' },
  motion: { icon: '#i-motion', group: 'presence' },
  occupancy: { icon: '#i-motion', group: 'presence' },
  presence: { icon: '#i-motion', group: 'presence' },
  moisture: { icon: '#i-drop', group: 'alarm' },
  smoke: { icon: '#i-alert', group: 'alarm' },
  gas: { icon: '#i-alert', group: 'alarm' }
};

// sensor device_class -> room "Ambiente" pill. `unit` is a literal string
// override (undefined = use the entity's own unit_of_measurement); `kind`
// is only used for the room card's pill priority ordering.
const NUMERIC_SENSOR_CLASS = {
  temperature: { icon: '#i-therm', decimals: 1, unit: '°', kind: 'temperature' },
  humidity: { icon: '#i-drop', decimals: 0, unit: '%', kind: 'humidity' },
  illuminance: { icon: '#i-lux', decimals: 0, unit: ' lx', kind: 'illuminance' },
  carbon_dioxide: { icon: '#i-cloud', decimals: 0, unit: ' ppm', kind: 'co2' },
  pm25: { icon: '#i-wind', decimals: 0, unit: undefined, kind: 'pm25' },
  // battery is handled separately below — only shown under 20%.
  battery: { icon: '#i-battery', decimals: 0, unit: '%', kind: 'battery' }
};
const LOW_BATTERY_PCT = 20;

const AREA_ICON_RULES = [
  [/letto|bed(?!.*bimb)|dormitor|master/i, '#i-bed'],
  [/bimb|cameretta|nursery|crib|child|kids?\b/i, '#i-crib'],
  [/bagno|bath|toilette|\bwc\b/i, '#i-bath'],
  [/cucina|kitchen/i, '#i-house'],
  [/soggiorno|salotto|living|sala\b/i, '#i-sofa'],
  [/studio|ufficio|office|lavoro|desk/i, '#i-laptop'],
  [/lavander|laundry|bucato/i, '#i-wash'],
  [/ingress|entrata|hall|corridoio|entry/i, '#i-hall'],
  [/garage|box auto|carport/i, '#i-car'],
  [/giardino|garden|orto|terrazzo|balcon|poggiolo|outdoor|cortile/i, '#i-grass']
];

function domainOf(entityId) { return entityId.split('.')[0]; }

function guessAreaIcon(name) {
  for (const [re, icon] of AREA_ICON_RULES) if (re.test(name)) return icon;
  return '#i-door';
}

function isExcluded(entity) {
  if (!entity) return true;
  if (entity.disabled_by) return true;
  if (entity.hidden_by) return true;
  if (entity.entity_category === 'diagnostic' || entity.entity_category === 'config') return true;
  return false;
}

function friendlyName(states, entityId, fallback) {
  const e = states[entityId];
  return (e && e.attributes && e.attributes.friendly_name) || fallback || entityId;
}

// Entity IDs look like `domain.object_id` (lowercase, dot-separated) — text
// values elsewhere in config.js (labels, icons like "mdi:sofa", area names)
// never match this shape, so walking the whole config tree for strings that
// do is a safe, config-schema-agnostic way to find every entity a specialized
// module already claims, without hardcoding a field list here that has to be
// kept in sync as new modules (or fields) are added.
const ENTITY_ID_RE = /^[a-z_]+\.[a-z0-9_]+$/;

function collectConfiguredEntities(config) {
  const ids = new Set();
  (function walk(node) {
    if (typeof node === 'string') { if (ENTITY_ID_RE.test(node)) ids.add(node); return; }
    if (Array.isArray(node)) { node.forEach(walk); return; }
    if (node && typeof node === 'object') { Object.values(node).forEach(walk); }
  })(config);
  return ids;
}

// --- rooms -------------------------------------------------------------

// `opts` (all optional) lets a caller layer runtime overrides on top of
// config.js without this function knowing anything about where those
// overrides come from — the settings panel (v1.5.0) is the only caller
// that passes them today:
//   opts.isHidden(room) -> bool   replaces the cfg.hide check entirely
//     when provided (default: today's `hideSet.has(id/name)` behavior).
//     Needed because a config-hidden room must still be computed in full
//     (not dropped before this function's caller can even see it) so the
//     panel can re-show it — see room.catalog below for the same reasoning
//     applied to entities.
//   opts.order -> string[]        replaces cfg.order for pinning when
//     provided (default: cfg.order).
function discoverRooms(states, registries, config, opts) {
  const cfg = (config && config.rooms) || {};
  const areas = (registries && registries.areas) || [];
  const devices = (registries && registries.devices) || [];
  const entities = (registries && registries.entities) || [];
  if (!areas.length) return { rooms: [], overflow: [] };

  const deviceById = new Map(devices.map((d) => [d.id, d]));
  const areaById = new Map(areas.map((a) => [a.area_id, a]));
  // Any entity already wired into a specialized module (an appliance's
  // powerSwitch, an irrigation zone's valve, the weather-station sensors
  // used for ET0, ...) shouldn't also show up as a plain generic control or
  // room "environment" pill — same physical thing shown twice, once generic
  // and once with real purpose-built context. Found via a real installation:
  // a weather station's outdoor temperature/humidity, already used for
  // irrigation math, was also cluttering its area's room card as a generic
  // sensor pill.
  const claimedEntities = collectConfiguredEntities(config);

  const byArea = new Map(areas.map((a) => [a.area_id, {
    id: a.area_id, name: a.name,
    icon: (cfg.icons && cfg.icons[a.area_id]) || (a.icon ? mapMdiIcon(a.icon) : null) || guessAreaIcon(a.name),
    lights: [], switches: [], covers: [], media: [], climate: [], fan: [], vacuum: [],
    humidifier: [], lock: [], waterHeater: [], valve: [], lawnMower: [], siren: [],
    sensors: [], status: [],
    // Every entity that is *structurally* eligible for this room — domain
    // match, or a recognized sensor/binary_sensor device_class — regardless
    // of its current on/off state or (for battery) its percentage. Unlike
    // the arrays above, this never reacts to live state, so it's stable
    // enough to drive the settings panel's per-room entity list (v1.5.0):
    // a closed window's sensor still needs to be listed and hidable, not
    // just while it happens to be open. { id, name, reasonKind: 'domain'|
    // 'device_class', reasonValue } — reasonValue is always the raw HA
    // vocabulary (domain name or device_class string), never a translated
    // or internal shorthand, since it's shown to the user as-is.
    catalog: []
  }]));

  // Device -> its own `device_class: power` sensor, for switches only (see
  // B4 in the fix ticket): a plug's instantaneous wattage is worth showing
  // next to the switch itself, but the sensor never becomes a pill or a row
  // of its own — same "same physical thing, don't show it twice" reasoning
  // as claimedEntities above, just keyed by device instead of by config.
  const powerSensorByDevice = new Map();
  for (const e of entities) {
    if (isExcluded(e) || domainOf(e.entity_id) !== 'sensor' || !e.device_id) continue;
    const st = states[e.entity_id];
    if (!st || !(e.entity_id in states)) continue;
    if ((st.attributes && st.attributes.device_class) !== 'power') continue;
    if (!powerSensorByDevice.has(e.device_id)) powerSensorByDevice.set(e.device_id, e.entity_id);
  }

  for (const ent of entities) {
    if (isExcluded(ent)) continue;
    if (!(ent.entity_id in states)) continue;
    const device = ent.device_id ? deviceById.get(ent.device_id) : null;
    const areaId = ent.area_id || (device && device.area_id) || null;
    if (!areaId || !byArea.has(areaId)) continue;
    const room = byArea.get(areaId);
    const dom = domainOf(ent.entity_id);
    const name = friendlyName(states, ent.entity_id);
    const st = states[ent.entity_id];

    if (claimedEntities.has(ent.entity_id)) continue;

    const catalogEntry = (reasonKind, reasonValue) =>
      room.catalog.push({ id: ent.entity_id, name, reasonKind, reasonValue });

    if (dom === 'light') { room.lights.push(ent.entity_id); catalogEntry('domain', 'light'); }
    else if (dom === 'switch') {
      const powerId = ent.device_id ? powerSensorByDevice.get(ent.device_id) : null;
      room.switches.push([ent.entity_id, name, '#i-plug', powerId || null]);
      catalogEntry('domain', 'switch');
    }
    else if (dom === 'cover') { room.covers.push(ent.entity_id); catalogEntry('domain', 'cover'); }
    else if (dom === 'media_player') { room.media.push(ent.entity_id); catalogEntry('domain', 'media_player'); }
    else if (dom === 'climate') { room.climate.push([ent.entity_id, name, '#i-therm']); catalogEntry('domain', 'climate'); }
    else if (dom === 'fan') { room.fan.push([ent.entity_id, name, '#i-wind']); catalogEntry('domain', 'fan'); }
    else if (dom === 'vacuum') { room.vacuum.push([ent.entity_id, name, '#i-bot']); catalogEntry('domain', 'vacuum'); }
    else if (dom === 'humidifier') { room.humidifier.push([ent.entity_id, name, DOMAIN_ICON.humidifier]); catalogEntry('domain', 'humidifier'); }
    else if (dom === 'lock') { room.lock.push([ent.entity_id, name, DOMAIN_ICON.lock]); catalogEntry('domain', 'lock'); }
    else if (dom === 'water_heater') { room.waterHeater.push([ent.entity_id, name, DOMAIN_ICON.water_heater]); catalogEntry('domain', 'water_heater'); }
    else if (dom === 'valve') { room.valve.push([ent.entity_id, name, DOMAIN_ICON.valve]); catalogEntry('domain', 'valve'); }
    else if (dom === 'lawn_mower') { room.lawnMower.push([ent.entity_id, name, DOMAIN_ICON.lawn_mower]); catalogEntry('domain', 'lawn_mower'); }
    else if (dom === 'siren') { room.siren.push([ent.entity_id, name, DOMAIN_ICON.siren]); catalogEntry('domain', 'siren'); }
    else if (dom === 'binary_sensor') {
      const dc = st.attributes && st.attributes.device_class;
      const meta = BINARY_PILL_CLASS[dc];
      if (meta) {
        // Structurally eligible regardless of current state — see the
        // `catalog` field comment above for why this must not gate on
        // st.state the way the `status` pill (next line) does.
        catalogEntry('device_class', dc);
        // Only "on" ever becomes a pill — a closed door/empty room is the
        // normal state and would just be noise (see B2 in the fix ticket).
        if (st.state === 'on') room.status.push([ent.entity_id, name, meta.icon, dc, meta.group]);
      }
    }
    else if (dom === 'sensor') {
      const dc = st.attributes && st.attributes.device_class;
      if (dc === 'battery') {
        const m = NUMERIC_SENSOR_CLASS.battery;
        catalogEntry('device_class', 'battery');
        const pct = parseFloat(st.state);
        // A charged battery isn't news, a low one is (see B3) — filtered
        // here, not in the render layer, so the card and panel agree.
        if (!isNaN(pct) && pct < LOW_BATTERY_PCT) {
          room.sensors.push([ent.entity_id, name, m.icon, m.decimals, m.unit, m.kind]);
        }
      } else {
        const m = NUMERIC_SENSOR_CLASS[dc];
        if (m) {
          room.sensors.push([ent.entity_id, name, m.icon, m.decimals, m.unit, m.kind]);
          catalogEntry('device_class', dc);
        }
      }
    }
  }

  const hideSet = new Set((cfg.hide || []).map(String));
  const isHidden = (opts && opts.isHidden) || ((r) => hideSet.has(r.id) || hideSet.has(r.name));
  let list = [...byArea.values()].filter((r) => !isHidden(r));

  const richness = (r) => r.lights.length + r.switches.length + r.covers.length + r.media.length
    + r.climate.length + r.fan.length + r.vacuum.length
    + r.humidifier.length + r.lock.length + r.waterHeater.length + r.valve.length + r.lawnMower.length + r.siren.length;
  // Drop areas with nothing controllable and no room-worthy sensors/status —
  // an area that only holds a diagnostic device would otherwise show as an
  // empty tile.
  list = list.filter((r) => richness(r) > 0 || r.sensors.length > 0 || r.status.length > 0);

  const order = ((opts && opts.order) || cfg.order || []).map(String);
  const pinned = [];
  for (const key of order) {
    const idx = list.findIndex((r) => r.id === key || r.name === key);
    if (idx !== -1) pinned.push(list.splice(idx, 1)[0]);
  }
  list.sort((a, b) => richness(b) - richness(a));
  const ranked = pinned.concat(list);

  // Rows now size to their own content instead of stretching to fill the
  // column (see dash_neumo.html's [data-r="rooms"] CSS), so there's real
  // room for more than the old fixed-height default of 8 without the grid
  // looking sparse — the column just scrolls once it's full. An explicit
  // cfg.max always wins.
  const max = cfg.max || 12;
  return { rooms: ranked.slice(0, max), overflow: ranked.slice(max) };
}

// Best-effort mdi:* -> our SVG sprite icon set. Only maps the common cases;
// anything else falls through to the keyword guess.
function mapMdiIcon(mdi) {
  const map = {
    'mdi:sofa': '#i-sofa', 'mdi:bed': '#i-bed', 'mdi:crib': '#i-crib', 'mdi:shower': '#i-bath',
    'mdi:bathtub': '#i-bath', 'mdi:toilet': '#i-bath', 'mdi:stove': '#i-house', 'mdi:fridge': '#i-house',
    'mdi:silverware-fork-knife': '#i-house', 'mdi:desk': '#i-laptop', 'mdi:laptop': '#i-laptop',
    'mdi:washing-machine': '#i-wash', 'mdi:door': '#i-door', 'mdi:door-open': '#i-hall',
    'mdi:garage': '#i-car', 'mdi:car': '#i-car', 'mdi:tree': '#i-grass', 'mdi:flower': '#i-grass',
    'mdi:home': '#i-house'
  };
  return map[mdi] || null;
}

// --- quick actions -------------------------------------------------------

function discoverAllOfDomain(states, registries, domain) {
  const entities = (registries && registries.entities) || [];
  if (entities.length) {
    return entities.filter((e) => !isExcluded(e) && domainOf(e.entity_id) === domain && e.entity_id in states)
      .map((e) => e.entity_id);
  }
  // No registry (older HA, or a degraded connection) — fall back to states,
  // still filtered to domain, just without the disabled/hidden filters.
  return Object.keys(states).filter((id) => domainOf(id) === domain);
}

// --- people ---------------------------------------------------------------

function discoverPeople(states, config) {
  const cfg = (config && config.people) || [];
  const ids = cfg.length ? cfg : Object.keys(states).filter((id) => domainOf(id) === 'person');
  return ids.filter((id) => id in states);
}

// --- weather ----------------------------------------------------------------

function discoverWeather(states, config) {
  if (config && config.weather) return config.weather in states ? config.weather : null;
  const id = Object.keys(states).find((id) => domainOf(id) === 'weather');
  return id || null;
}

// --- cameras -----------------------------------------------------------

// A camera's motion sensor isn't linked to it by any state or attribute —
// the only relation Home Assistant exposes is "same device". So: resolve
// each camera's device_id from the registry, then look for a binary_sensor
// on that same device whose device_class is motion.
// `opts` (both optional, v1.5.0 settings panel):
//   opts.isHidden(camId) -> bool     true excludes the camera entirely
//     (default: never — there's no config-level "true hide" for cameras
//     before this version, only the tap-gate below).
//   opts.isTapGated(camId) -> bool   replaces the inline hideUntilTap
//     check (default: cfg.cameras.hideUntilTap membership, unchanged).
function discoverCameras(states, registries, config, opts) {
  const cfg = (config && config.cameras) || {};
  const entities = (registries && registries.entities) || [];
  const areas = (registries && registries.areas) || [];
  const devices = (registries && registries.devices) || [];
  const deviceById = new Map(devices.map((d) => [d.id, d]));
  const areaById = new Map(areas.map((a) => [a.area_id, a]));
  const areaNameOf = (areaId) => (areaId && areaById.has(areaId) ? areaById.get(areaId).name : '');

  const isHidden = (opts && opts.isHidden) || (() => false);
  const camEntities = entities.filter((e) => !isExcluded(e) && domainOf(e.entity_id) === 'camera'
    && e.entity_id in states && !isHidden(e.entity_id));
  if (!camEntities.length) return [];

  const motionByDevice = new Map();
  for (const e of entities) {
    if (isExcluded(e) || domainOf(e.entity_id) !== 'binary_sensor' || !e.device_id) continue;
    const st = states[e.entity_id];
    if (!st || (st.attributes && st.attributes.device_class) !== 'motion') continue;
    if (st.state === 'on') motionByDevice.set(e.device_id, true);
    else if (!motionByDevice.has(e.device_id)) motionByDevice.set(e.device_id, false);
  }

  const hideUntilTapSet = new Set((cfg.hideUntilTap || []).map(String));
  const isTapGated = (opts && opts.isTapGated) || ((id) => hideUntilTapSet.has(id));

  const cams = camEntities.map((e) => {
    const device = e.device_id ? deviceById.get(e.device_id) : null;
    const areaId = e.area_id || (device && device.area_id) || null;
    const st = states[e.entity_id];
    const picture = (st.attributes && st.attributes.entity_picture) || null;
    return {
      id: e.entity_id,
      name: friendlyName(states, e.entity_id),
      area: areaNameOf(areaId),
      motion: e.device_id ? !!motionByDevice.get(e.device_id) : false,
      picture,
      hidden: isTapGated(e.entity_id)
    };
  });

  const primary = cfg.primary && cams.find((c) => c.id === cfg.primary);
  if (primary) {
    const rest = cams.filter((c) => c.id !== primary.id);
    return [primary].concat(rest);
  }
  const motionFirst = cams.find((c) => c.motion);
  if (motionFirst) {
    const rest = cams.filter((c) => c.id !== motionFirst.id);
    return [motionFirst].concat(rest);
  }
  return cams;
}

// --- energy -----------------------------------------------------------------
// Two ways to find production/grid-import/grid-export sensors without the
// user writing config.energy by hand — tried in order by the caller
// (dash_neumo*.html), config.js explicit fields always winning over both:
//
//   1. mapEnergyPrefs()        reads what the user already told HA's own
//                               Energy dashboard (config/energy panel).
//   2. discoverEnergyEntities() a last-resort heuristic guess from
//                               device_class/state_class + name, for
//                               installs with no Energy dashboard set up
//                               at all — same spirit as the room/weather/
//                               people discovery above, just fuzzier since
//                               there's no registry relationship to lean on
//                               (energy sensors aren't tied to an area the
//                               way a room's light is).

// Shape of a websocket `energy/get_prefs` response (relevant parts only) —
// two real, both-observed variants for the grid source, not one:
//   { energy_sources: [
//       { type: 'solar', stat_energy_from: 'sensor.x' },
//       // flat grid (single meter, no flow_from/flow_to array — confirmed
//       // on a real install; the nested form below was the only one this
//       // originally handled, which is why flat installs resolved solar
//       // fine but never found prelievo/immissione at all):
//       { type: 'grid', stat_energy_from: 'sensor.y', stat_energy_to: 'sensor.z' },
//       // nested grid (the array form, also real — multiple contracts):
//       { type: 'grid', flow_from: [{ stat_energy_from: 'sensor.y' }],
//                        flow_to:   [{ stat_energy_to: 'sensor.z' }] }
//   ] }
// Both forms are accepted unconditionally, for solar too in case a nested
// variant ever shows up there — and if an install genuinely has both on the
// same source object, every id is still counted only once (deduped by
// statistic_id) rather than double-summed.
// Multiple solar arrays and multiple grid contracts are both real, common
// configurations (a second array, a second meter/tariff) — each one is its
// own genuine contribution to the role's total, so every id found is kept
// and summed later by the caller, not just the first. Returns arrays (never
// bare strings, even for a single match) so the caller has one shape to
// handle regardless of how many the install has. Source types other than
// 'solar'/'grid' (battery, gas, water, low-carbon tracking, ...) are simply
// not iterated — they can't be mistaken for one of these three roles.
function mapEnergyPrefs(prefs) {
  if (!prefs || !Array.isArray(prefs.energy_sources)) return null;
  const production = [];
  const gridImport = [];
  const gridExport = [];
  const seenProd = new Set();
  const seenImport = new Set();
  const seenExport = new Set();
  const add = (arr, seen, id) => { if (id && !seen.has(id)) { seen.add(id); arr.push(id); } };
  for (const src of prefs.energy_sources) {
    if (src.type === 'solar') {
      add(production, seenProd, src.stat_energy_from);
      for (const f of src.flow_from || []) add(production, seenProd, f.stat_energy_from);
    } else if (src.type === 'grid') {
      add(gridImport, seenImport, src.stat_energy_from);
      for (const f of src.flow_from || []) add(gridImport, seenImport, f.stat_energy_from);
      add(gridExport, seenExport, src.stat_energy_to);
      for (const f of src.flow_to || []) add(gridExport, seenExport, f.stat_energy_to);
    }
  }
  if (!production.length && !gridImport.length && !gridExport.length) return null;
  return { production, gridImport, gridExport };
}

const ENERGY_PROD_RE = /solar|pv|fotovolt|produzion|panel.*production/i;
const ENERGY_EXPORT_RE = /export|immission|feed.?in|cedut|vendut|to.?grid|grid.?to/i;
const ENERGY_IMPORT_RE = /import|prelie|prelev|acquist|from.?grid|grid.?import/i;

// Every candidate is a lifetime-cumulative energy statistic (state_class
// total_increasing, device_class energy) — that's necessary but not
// sufficient to know its *role*, since production/import/export sensors
// all share it. The name is the only signal left, so this is a best-effort
// guess, not a guarantee: an unusually-named install may resolve nothing,
// degrading gracefully to no ring rather than a wrong one (guessing a role
// wrong would be worse than not guessing).
function discoverEnergyEntities(states, registries) {
  const entities = (registries && registries.entities) || [];
  const ids = entities.length
    ? entities.filter((e) => !isExcluded(e)).map((e) => e.entity_id)
    : Object.keys(states);
  const candidates = ids.filter((id) => {
    if (domainOf(id) !== 'sensor') return false;
    const st = states[id];
    const attrs = st && st.attributes;
    return !!attrs && attrs.device_class === 'energy' && attrs.state_class === 'total_increasing';
  });
  if (!candidates.length) return null;

  const nameOf = (id) => id + ' ' + friendlyName(states, id, '');
  const production = candidates.find((id) => ENERGY_PROD_RE.test(nameOf(id))) || null;
  const gridExport = candidates.find((id) => ENERGY_EXPORT_RE.test(nameOf(id))) || null;
  const gridImport = candidates.find((id) => ENERGY_IMPORT_RE.test(nameOf(id))) || null;
  if (!production && !gridImport && !gridExport) return null;
  return { production, gridImport, gridExport };
}

// --- alarm ------------------------------------------------------------------

function discoverAlarm(states, config) {
  const id = config && config.alarm;
  if (!id) return null;
  return id in states ? id : null;
}

// --- modes ------------------------------------------------------------------

function discoverModes(config) {
  const m = config && config.modes;
  if (!m || !m.select || !m.script) return null;
  return m;
}

// --- generic entity -> area lookup ------------------------------------------
// Same resolution rule as everywhere else (entity's own area, else its
// device's), exposed standalone for config-driven entities that don't come
// through discoverRooms's own registry walk — e.g. an appliance's `status`
// entity in config.appliances, which needs to land in the right room panel.
function resolveEntityArea(entityId, registries) {
  const entities = (registries && registries.entities) || [];
  const devices = (registries && registries.devices) || [];
  const ent = entities.find((e) => e.entity_id === entityId);
  if (!ent) return null;
  if (ent.area_id) return ent.area_id;
  if (ent.device_id) {
    const device = devices.find((d) => d.id === ent.device_id);
    if (device && device.area_id) return device.area_id;
  }
  return null;
}

// --- settings panel (v1.5.0) — visibility overrides ------------------------
// Pure helpers shared by dash_neumo.html and dash_neumo_mobile.html so the
// two layouts can never disagree about what a room/entity/camera/section's
// resolved visibility is. None of this touches HA or the DOM — persistence
// (Home Assistant's frontend/set_user_data, with a localStorage fallback)
// lives in prefs.js; this file only knows how to combine what it's given.

// The three-state override rule from the settings panel spec: a key absent
// from `prefsMap` means "not decided by the panel" (config.js decides,
// default visible if config.js doesn't mention it either); present means
// the panel's choice always wins, even against a config.js that hides the
// same key — that's how a user can re-show something config.js hides
// without editing config.js. A plain hidden-list can only ever add
// exclusions; this three-value shape is what makes "un-hide from the
// panel" possible at all.
function resolveVisible(key, prefsMap, configHiddenSet) {
  if (prefsMap && Object.prototype.hasOwnProperty.call(prefsMap, key)) return !!prefsMap[key];
  return !(configHiddenSet && configHiddenSet.has(key));
}

// Every per-domain array a room object can carry (see discoverRooms above)
// — `catalog` is deliberately excluded: the settings panel's room-detail
// screen needs to keep listing hidden entities (greyed, toggle-able back
// on), so only the arrays that actually drive rendering get filtered.
const ROOM_ENTITY_ARRAYS = ['lights', 'switches', 'covers', 'media', 'climate', 'fan', 'vacuum',
  'humidifier', 'lock', 'waterHeater', 'valve', 'lawnMower', 'siren', 'sensors', 'status'];

// Entries are either a bare entity_id (lights/covers/media) or a tuple with
// the id first (every other array) — see discoverRooms's per-domain pushes.
function applyEntityVisibility(room, hiddenIds) {
  const idOf = (x) => (typeof x === 'string' ? x : x[0]);
  for (const key of ROOM_ENTITY_ARRAYS) {
    room[key] = room[key].filter((x) => !hiddenIds.has(idOf(x)));
  }
  return room;
}

// Section/tab toggle keys — fixed, not discovered, since they mirror the
// config.js top-level module keys 1:1 (see live_dashboard_config.example.js).
const MODULE_KEYS = ['energy', 'irrigation', 'cameras', 'appliances', 'vehicle'];

// Builds the plain-object config that reflects *resolved* state (config.js
// merged with the panel's current overrides) rather than either alone —
// this is what "Esporta come config.js" serializes. `known` supplies every
// id the resolver needs to decide over (the panel can only export a hide
// list for ids it actually knows about): { roomIds, entityIds, cameraIds }.
function buildExportedConfig(cfg, prefs, known) {
  const p = prefs || {};
  const k = known || {};
  const configRoomHidden = new Set(((cfg.rooms && cfg.rooms.hide) || []).map(String));
  const configEntityHidden = new Set((cfg.entities && cfg.entities.hide) || []);
  const configCameraHidden = new Set((cfg.cameras && cfg.cameras.hide) || []);
  const configModuleHidden = new Set((cfg.modules && cfg.modules.hide) || []);

  const roomsHide = (k.roomIds || []).filter((id) => !resolveVisible(id, p.rooms, configRoomHidden));
  const entitiesHide = (k.entityIds || []).filter((id) => !resolveVisible(id, p.entities, configEntityHidden));
  const camerasHide = (k.cameraIds || []).filter((id) => !resolveVisible(id, p.cameras, configCameraHidden));
  const modulesHide = MODULE_KEYS.filter((key) => !resolveVisible(key, p.modules, configModuleHidden));
  const roomsOrder = (p.order && p.order.rooms && p.order.rooms.length) ? p.order.rooms : ((cfg.rooms && cfg.rooms.order) || []);
  const hideUntilTap = p.hideUntilTap !== undefined ? p.hideUntilTap : ((cfg.cameras && cfg.cameras.hideUntilTap) || []);

  return Object.assign({}, cfg, {
    rooms: Object.assign({}, cfg.rooms, { hide: roomsHide, order: roomsOrder }),
    entities: Object.assign({}, cfg.entities, { hide: entitiesHide }),
    cameras: Object.assign({}, cfg.cameras, { hide: camerasHide, hideUntilTap }),
    modules: Object.assign({}, cfg.modules, { hide: modulesHide })
  });
}

// Classic script, not an ES module: dynamic `import()` of separate files is
// blocked by Chrome's CORS policy when the page is opened from file:// (each
// file: URL is a unique opaque origin), which breaks the "must open from
// file://" requirement for demo mode. Loaded instead via a plain injected
// <script> tag — see loadScript() in dash_neumo*.html — and exposed here as
// a global.
window.CasaDiscovery = {
  discoverRooms, discoverAllOfDomain, discoverPeople, discoverWeather, discoverAlarm, discoverModes, discoverCameras,
  resolveEntityArea, mapEnergyPrefs, discoverEnergyEntities,
  resolveVisible, applyEntityVisibility, buildExportedConfig, MODULE_KEYS,
  CONTROLLABLE_DOMAINS, DOMAIN_ICON, domainOf, isExcluded, friendlyName
};

})();

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
//   config     the merged config.js (see live_dashboard_config.js)

// Wrapped in an IIFE: this is a classic script sharing one global scope with
// every other file loaded via loadScript() in dash_neumo*.html (see the note
// above about why these aren't ES modules), so top-level names must not leak
// and collide with another file's (e.g. two files both declaring `connect`).
(function () {

const CONTROLLABLE_DOMAINS = ['light', 'switch', 'cover', 'media_player', 'climate', 'fan', 'vacuum'];

const DOMAIN_ICON = {
  light: '#i-bulb', switch: '#i-plug', cover: '#i-shutter-close', media_player: '#i-tv',
  climate: '#i-therm', fan: '#i-wind', vacuum: '#i-bot'
};

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

function discoverRooms(states, registries, config) {
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
    lights: [], switches: [], covers: [], media: [], climate: [], fan: [], vacuum: [], sensors: []
  }]));

  for (const ent of entities) {
    if (isExcluded(ent)) continue;
    if (!(ent.entity_id in states)) continue;
    const device = ent.device_id ? deviceById.get(ent.device_id) : null;
    const areaId = ent.area_id || (device && device.area_id) || null;
    if (!areaId || !byArea.has(areaId)) continue;
    const room = byArea.get(areaId);
    const dom = domainOf(ent.entity_id);
    const name = friendlyName(states, ent.entity_id);

    if (claimedEntities.has(ent.entity_id)) continue;

    if (dom === 'light') room.lights.push(ent.entity_id);
    else if (dom === 'switch') room.switches.push([ent.entity_id, name, '#i-plug']);
    else if (dom === 'cover') room.covers.push(ent.entity_id);
    else if (dom === 'media_player') room.media.push(ent.entity_id);
    else if (dom === 'climate') room.climate.push([ent.entity_id, name, '#i-therm']);
    else if (dom === 'fan') room.fan.push([ent.entity_id, name, '#i-wind']);
    else if (dom === 'vacuum') room.vacuum.push([ent.entity_id, name, '#i-bot']);
    else if (dom === 'sensor') {
      const dc = states[ent.entity_id].attributes && states[ent.entity_id].attributes.device_class;
      if (dc === 'temperature') room.sensors.push([ent.entity_id, name, '#i-therm', 1]);
      else if (dc === 'humidity') room.sensors.push([ent.entity_id, name, '#i-drop', 0]);
    }
  }

  const hideSet = new Set((cfg.hide || []).map(String));
  let list = [...byArea.values()].filter((r) => !hideSet.has(r.id) && !hideSet.has(r.name));

  const richness = (r) => r.lights.length + r.switches.length + r.covers.length + r.media.length
    + r.climate.length + r.fan.length + r.vacuum.length;
  // Drop areas with nothing controllable and no room-worthy sensors — an
  // area that only holds a diagnostic device would otherwise show as an
  // empty tile.
  list = list.filter((r) => richness(r) > 0 || r.sensors.length > 0);

  const order = (cfg.order || []).map(String);
  const pinned = [];
  for (const key of order) {
    const idx = list.findIndex((r) => r.id === key || r.name === key);
    if (idx !== -1) pinned.push(list.splice(idx, 1)[0]);
  }
  list.sort((a, b) => richness(b) - richness(a));
  const ranked = pinned.concat(list);

  const max = cfg.max || 8;
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
function discoverCameras(states, registries, config) {
  const cfg = (config && config.cameras) || {};
  const entities = (registries && registries.entities) || [];
  const areas = (registries && registries.areas) || [];
  const devices = (registries && registries.devices) || [];
  const deviceById = new Map(devices.map((d) => [d.id, d]));
  const areaById = new Map(areas.map((a) => [a.area_id, a]));
  const areaNameOf = (areaId) => (areaId && areaById.has(areaId) ? areaById.get(areaId).name : '');

  const camEntities = entities.filter((e) => !isExcluded(e) && domainOf(e.entity_id) === 'camera' && e.entity_id in states);
  if (!camEntities.length) return [];

  const motionByDevice = new Map();
  for (const e of entities) {
    if (isExcluded(e) || domainOf(e.entity_id) !== 'binary_sensor' || !e.device_id) continue;
    const st = states[e.entity_id];
    if (!st || (st.attributes && st.attributes.device_class) !== 'motion') continue;
    if (st.state === 'on') motionByDevice.set(e.device_id, true);
    else if (!motionByDevice.has(e.device_id)) motionByDevice.set(e.device_id, false);
  }

  const hideUntilTap = new Set((cfg.hideUntilTap || []).map(String));

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
      hidden: hideUntilTap.has(e.entity_id)
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

// Classic script, not an ES module: dynamic `import()` of separate files is
// blocked by Chrome's CORS policy when the page is opened from file:// (each
// file: URL is a unique opaque origin), which breaks the "must open from
// file://" requirement for demo mode. Loaded instead via a plain injected
// <script> tag — see loadScript() in dash_neumo*.html — and exposed here as
// a global.
window.CasaDiscovery = {
  discoverRooms, discoverAllOfDomain, discoverPeople, discoverWeather, discoverAlarm, discoverModes, discoverCameras,
  resolveEntityArea,
  CONTROLLABLE_DOMAINS, DOMAIN_ICON, domainOf, isExcluded, friendlyName
};

})();

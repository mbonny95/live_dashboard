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
//   config     the merged config.js (see config.example.js)

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

// --- rooms -------------------------------------------------------------

function discoverRooms(states, registries, config) {
  const cfg = (config && config.rooms) || {};
  const areas = (registries && registries.areas) || [];
  const devices = (registries && registries.devices) || [];
  const entities = (registries && registries.entities) || [];
  if (!areas.length) return { rooms: [], overflow: [] };

  const deviceById = new Map(devices.map((d) => [d.id, d]));
  const areaById = new Map(areas.map((a) => [a.area_id, a]));

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

// Classic script, not an ES module: dynamic `import()` of separate files is
// blocked by Chrome's CORS policy when the page is opened from file:// (each
// file: URL is a unique opaque origin), which breaks the "must open from
// file://" requirement for demo mode. Loaded instead via a plain injected
// <script> tag — see loadScript() in dash_neumo*.html — and exposed here as
// a global.
window.CasaDiscovery = {
  discoverRooms, discoverAllOfDomain, discoverPeople, discoverWeather, discoverAlarm, discoverModes,
  CONTROLLABLE_DOMAINS, DOMAIN_ICON, domainOf, isExcluded, friendlyName
};

})();

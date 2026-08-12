# Troubleshooting

### White / blank panel

- Open the browser console (F12) on the panel page. A red error there is
  almost always a wrong `module_url` in `configuration.yaml` or a stale
  browser cache — Home Assistant serves `/local/` with long cache headers, so
  after updating files you may need a hard refresh (Ctrl/Cmd+Shift+R).
- Check that `panel.js`, `dash_neumo.html` / `dash_neumo_mobile.html`,
  `support.js`, `ha-backend.js`, `ha-backend-panel.js`,
  `ha-backend-demo.js`, `discovery.js`, `i18n.js`, `i18n/it.js` and
  `i18n/en.js` all made it into `config/www/casa/` — a single missing file
  breaks the load silently, and the `i18n/` subfolder is easy to drop by
  accident when copying file-by-file instead of the whole directory.

### The page never leaves "Connessione…" / "Connecting…"

- This means the iframe never got a first `hass.states` push from `panel.js`.
  Confirm `panel_custom.module_url` points at `panel.js` (not at the HTML
  page) and that `embed_iframe: true` is set.
- After about 1.8 seconds without a response the dashboard falls back to
  **demo mode** on its own — if you see the `DEMO` badge appear, that
  fallback fired, which confirms the panel connection is the thing to fix
  (not the dashboard).

### Rooms are empty, or show far fewer entities than expected

- The most common cause by far: **areas were never assigned** in this
  installation. This dashboard has no naming or grouping fallback beyond
  Home Assistant's own area/device/entity registries — it can't guess a
  room from an entity's name or its old YAML dashboard position. If most
  entities show under "no area" in `Settings -> Areas`, that's the fix, not
  something wrong with the dashboard (see "Known limits" in README.md).
- Auto-discovery only looks at entities that have `disabled_by` and
  `hidden_by` **unset**, and `entity_category` **not** `diagnostic`/`config`.
  An entity you expect to see that's disabled in the entity registry, or
  hidden from the dashboard/history UI, won't appear here either.
- An entity only counts toward a room if its own `area_id` is set, or —
  failing that — its **device's** `area_id` is. An entity with neither (no
  area assigned anywhere) is invisible to this dashboard. Assign it an area
  in Home Assistant's own UI.
- Rooms with nothing controllable (no light/switch/cover/media_player/
  climate/fan/vacuum) and no temperature/humidity sensor are dropped
  entirely rather than shown as an empty tile.

### Too many rooms / the grid looks cramped

- The Casa view is fixed at 1200×800 with no scroll, sized for about 8 tiles.
  Rooms beyond `rooms.max` (default 8) go behind the "+N rooms" button next
  to the "Rooms" heading instead of being squeezed into the grid. Use
  `rooms.order` / `rooms.hide` in `config.js` to control which 8 are pinned.

### An entity I expect just doesn't show up anywhere

Check, in order: is it disabled or hidden in the entity registry; does it (or
its device) have an area assigned; is its domain one of
`light/switch/cover/media_player/climate/fan/vacuum` or a `sensor` with
`device_class: temperature`/`humidity` (any other sensor domain isn't grouped
into rooms at all — it can still be wired into Energy/Irrigation/Vehicle via
`config.js`, which take explicit entity IDs).

### Entities show `unavailable` in grey

This is intentional, not a bug — the dashboard shows "unreachable" instead of
printing the raw `unavailable` state, and dims the row. It means Home
Assistant itself has lost contact with that entity.

### Energy charts are empty or look wrong

- The bar chart and the 7/14/30-day totals need `energy.productionToday` /
  `energy.gridToday` to be **daily counters that reset to 0 at midnight**,
  not running totals and not instantaneous power. If you point them at the
  wrong sensor (e.g. an ever-increasing lifetime total, or a power sensor),
  the numbers will be nonsensical.
- History is read via `history/history_during_period` (recorder), so it's
  bounded by `recorder.purge_keep_days` (10 by default) unless long-term
  statistics exist for that entity, which `panel.js` also checks.
- Right after Home Assistant restarts, or right after you add `energy` to
  `config.js` for the first time, the chart is empty until the next history
  fetch (on the next tab open / page reload).

### The Irrigation zone chart doesn't match reality

The "48h" sparkline reads `zone.moisture`'s raw history — if the sensor
itself is noisy or reports rarely, the sparkline will look sparse or jumpy.
That's the sensor's data, not a bug in the chart.

### A camera tile only ever shows an icon, never a preview

- If the entity is listed in `config.cameras.hideUntilTap`, this is
  intentional — tap it once to reveal the still, tap again to go live.
- Otherwise: the camera's `entity_picture` attribute is empty or missing.
  Some camera integrations only populate it once the camera has produced at
  least one frame, or don't populate it at all for certain stream types —
  check the entity's attributes in Home Assistant's own Developer Tools.
  This dashboard doesn't fetch snapshots any other way.

### The live camera overlay is a black/broken image

`camera_proxy_stream` (the MJPEG endpoint this dashboard uses for the live
view) isn't implemented by every camera integration — some only support the
still-image proxy or a WebRTC/HLS stream instead. If the still preview works
but tapping into live doesn't, that's the integration, not a config mistake;
there's no per-camera setting here to change it.

### The "Sorveglianza"/"Surveillance" tab doesn't appear even though I have cameras

The tab only shows up with **2 or more** discovered cameras — with exactly
one, the Casa card and its tap-to-fullscreen overlay are already the whole
feature (see README.md). Check that any extra cameras aren't
`disabled_by`/`hidden_by` in the entity registry, same as any other entity
this dashboard discovers.

### Alarm card has no buttons, or fewer than expected

Buttons are generated from the alarm entity's `supported_features` bitmask,
not guessed. If your alarm integration doesn't declare `arm_home` (bit 1),
the "Home" button won't appear — that's the integration's own declaration,
this dashboard doesn't second-guess it. If the whole card is missing, check
that `config.alarm` is set to a real `alarm_control_panel.*` entity ID.

### A whole section (Energy / Irrigation / Vehicle / Cameras / Alarm / Modes / People) is missing

That's by design when it isn't configured: `alarm`/`modes`/`energy`/
`irrigation`/`vehicle` are all opt-in in `config.js` (`null` hides them);
`people`/`weather`/`cameras` auto-discover but hide themselves if nothing is
found. Nothing here indicates an error — see `config.example.js` for what
each section needs.

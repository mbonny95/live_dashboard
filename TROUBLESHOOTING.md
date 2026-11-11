# Troubleshooting

### Start here: Settings → Diagnostica

If the panel loads at all (you can reach the gear icon), open **Settings →
Diagnostica** before working through the sections below — it's built to
answer most of what's here without the browser console: which `config.js`
path loaded (or why none did), what each energy sensor resolved to and from
which source, and counts from auto-discovery. A **Copy diagnostics** button
puts all of it on the clipboard as plain text, so a bug report can be a
paste instead of a back-and-forth. It only helps once something has
rendered, though — for a genuinely blank/black panel, see the next section.

### Before you open an issue: try it in `?demo&scenario=…`

The demo backend (`ha-backend-demo.js`) can be forced into nine fixed data
states, each reachable as a URL — open `dash_neumo.html?demo&scenario=<id>`
(or `dash_neumo_mobile.html` on a narrow screen) straight from `file://`, no
Home Assistant needed. A thin dark bar at the bottom of the demo lets you
switch between them without typing the URL by hand; `&bare` hides that bar
for screenshots.

| `scenario=` | what it forces |
| --- | --- |
| `default` | today's demo, unchanged |
| `export` | strong sun, house exporting to the grid |
| `import` | overcast, house pulling from the grid, battery discharging |
| `night` | zero production, sun below the horizon, night theme |
| `partial` | only production + grid-import configured — no export sensor, no battery: exercises the single-ring energy fallback |
| `missing` | config points at entity IDs that don't exist — exercises the empty-state / Diagnostica indicators |
| `odd-units` | power sensors declaring `Kw`, `w`, `MW`, and one unrecognized unit |
| `call-timeout` | every `switch.*` call times out — exercises the error toast and Diagnostica → Recent actions |
| `alarm-pin` | the alarm panel declares `code_format: number` — every arm/disarm opens the PIN pad; the demo accepts `1234` only |

If a bug reproduces in one of these, paste the exact `?demo&scenario=…` link
into the issue — it's a fixed, shareable data state, so whoever picks up the
issue sees precisely what you saw without needing your Home Assistant
instance. If it *doesn't* reproduce in the closest matching scenario, that's
useful too: it means the bug depends on something these nine states don't
cover (a specific sensor value, a device quirk), which is worth saying in the
issue.

### The "Casa" panel doesn't appear in the sidebar (v2, integration)

1. **Settings → Repairs.** The integration reports its problems there, not
   only in the log:
   - *"/casa is already used by another panel"*: the 1.x `panel_custom`
     block (`name: live_dashboard-panel`) is still in `configuration.yaml`.
     Remove it and restart, or pick another path in the integration's
     options.
   - *"dashboard files missing"*: the integration folder has no `www/`
     (a copy of the source repository instead of the HACS download).
     Reinstall from HACS.
2. **Settings → Devices & services → Live Dashboard** must be listed and
   *loaded*. If it isn't listed, it was downloaded but not added: **Add
   integration → Live Dashboard**.
3. After an update from HACS, restart Home Assistant when asked: like any
   integration, the new version loads at startup.

Inside the dashboard, Settings → Diagnostica → Environment → "Installation"
says whether it is running under the integration or a manual `panel_custom`.

### White / blank panel

- **Check `panel_custom.name` first, especially with a second/parallel
  install.** The panel element registers itself under the tag
  `<folder>-panel`, derived automatically from the folder you copied
  `panel.js` into (`config/www/casa2/panel.js` registers `casa2-panel`, not
  `casa-panel`). If `name:` in `configuration.yaml` doesn't match, Home
  Assistant creates an element nothing has defined — a genuinely blank
  panel with **no error in the console at all**, because nothing ever ran.
  This is the most likely cause if the page was completely black/empty and
  the console showed nothing.
- **`panel_custom` doesn't hot-reload.** Editing `configuration.yaml` (a new
  `name`, a fixed `module_url`, anything under `panel_custom`) has no effect
  until you fully restart Home Assistant — there's no YAML-reload button for
  this integration.
- **No `?v=` on `module_url`, or you forgot to bump it after updating
  files.** `/local/` is served with long cache headers, and browsers cache
  ES modules more aggressively than regular assets — a hard refresh doesn't
  reliably force a re-fetch of `panel.js` itself, so you can end up running
  a stale copy indefinitely with no error to show for it (this can look
  identical to the `name:` mismatch above: blank panel, empty console).
  Add `?v=1` to `module_url` if it's missing, and bump it on every update.
- Open the browser console (F12) on the panel page. A red error there is
  almost always a wrong `module_url` in `configuration.yaml`.
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

- **If Rooms is showing an empty-state card with a "Go to Areas" button,
  that's the dashboard already telling you the cause** (v1.6.0) — no
  entities resolved to a room at all, almost always because areas were
  never assigned in this installation. The card is there specifically so
  this isn't a silent blank grid; follow its button rather than guessing.
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

- The rooms column shows up to `rooms.max` tiles (default 12, since v1.4.8),
  two per row, each sized to its content, and scrolls inside the column once
  it's full — scrolling is expected, typography and touch targets are never
  shrunk to fit (the old "everything on one 1280×800 screen" rule was
  retired in v1.4.9). Rooms beyond `rooms.max` go behind the "+N rooms"
  button next to the "Rooms" heading. Settings → Rooms hides and reorders
  them without editing files; `rooms.order` / `rooms.hide` in `config.js`
  set the installation default.

### An entity I expect just doesn't show up anywhere

Start from Settings → Diagnostica → "N entities not shown" (v1.7.1): every
entity discovery skipped is listed there with the reason — no area, unknown
area, no live state, claimed by a module, disabled/hidden, diagnostic
entity. If it isn't in that list, check that its domain is one rooms show
(see "Known limits" in README.md for the full list of domains and sensor
`device_class`es); any other sensor isn't grouped into rooms at all, but can
still be wired into Energy/Irrigation/Vehicle via `config.js`, which take
explicit entity IDs.

### Entities show `unavailable` in grey

This is intentional, not a bug — the dashboard shows "unreachable" instead of
printing the raw `unavailable` state, and dims the row. It means Home
Assistant itself has lost contact with that entity.

### The Energy card shows an entity ID and "Open settings" instead of the ring

That's the empty-state the dashboard shows (v1.6.0) when `config.energy`
points at an entity ID that no longer exists in Home Assistant — usually a
sensor an integration update renamed or removed, with the rest of the
install otherwise fine. The listed ID is exactly what to search for in
**Developer Tools → States**; the button jumps straight to Settings →
Energy, which lists the same verdict per role. Reproduce it on demand with
`?demo&scenario=missing`. This is a different case from "Energy charts are
empty or look wrong" below, which is about *daily totals* pointed at the
wrong kind of sensor, not a missing one — and different again from having no
`config.energy` at all, which just hides the whole card (see "A whole
section... is missing" further down).

### "Derived house consumption" shows "—", or the settings toggle says it's probably inverted

- **"—" instead of a number**: the instantaneous consumption derivation
  (v1.6.0 — see README's "House consumption, derived" section) needs
  `production`, `gridImport` *and* `gridExport` all resolved; missing any
  one of the three, it shows "—" rather than a number computed from an
  incomplete formula. Check Settings → Energy's "Energy — instantaneous
  values" list for which of the three is the gap.
- **The derived value is negative, or Settings → Energy shows "The battery
  convention is probably inverted"**: your battery power sensor's sign
  doesn't match what's selected under **Battery power** in Settings →
  Energy. There's no universal convention across integrations for whether
  positive means charging or discharging — flip the toggle (or tap
  **Invert** on the warning itself) and watch the live value shown right
  below it become plausible again. The warning only fires after several
  samples come out negative in a row (a single noisy blip doesn't trigger
  it), and the dashboard never shows a negative "house consumption" number
  either way — an honest "—" during the bad window beats a wrong-looking
  number.
- This entire control only appears when a single signed
  `config.energy.battery.power` sensor is configured (and `consumption`
  isn't set directly, since then there's nothing to derive). Two separate
  `chargePower`/`dischargePower` sensors, both always positive, need no
  convention and show no toggle at all.

### Energy charts are empty or look wrong

- **Open Settings → Diagnostica first.** Its "Energy — instantaneous values"
  and "Energy — daily totals" blocks name the exact entity ID behind every
  role, where it came from (`config.js`, Home Assistant's own Energy
  dashboard, or auto-discovery), and flag the two mistakes this section used
  to require reading console.info to catch: a power role wired to a
  kWh/energy sensor instead of a W/kW one, and a `*Today` field pointed at a
  lifetime-cumulative sensor (`state_class: total_increasing`, no
  `last_reset`) instead of a real daily counter.
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

Fixed in v1.5.4 — before that release, the live view always tried
`camera_proxy_stream` (MJPEG), which RTSP/ONVIF/generic cameras (most of
the installed base) never implement, producing exactly this black
rectangle even though the still preview worked fine (previews use a
different, universal endpoint). If you're still seeing this on v1.5.4 or
later: open Settings → Diagnostica and check the camera's row — it names
which layer (WebRTC / hls.js / native HLS / fast previews) is active, and
which one it fell back from and why if a layer failed while playing,
and whether `camera/stream` itself succeeded or failed, which narrows down
whether the problem is the `stream` integration, the browser, or something
else. On a current version, the worst case should be "anteprima
aggiornata"/"preview refreshing" stills, never a black rectangle.

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
this dashboard doesn't second-guess it. `supported_features` absent or `0`
means only status and Disarm show, on purpose. If the whole card is
missing, check whether you actually have an `alarm_control_panel.*`
entity in this Home Assistant instance at all — since v1.5.4 the alarm
card is auto-discovered the same way rooms/weather/people are, no
`config.alarm` required; it only needs setting explicitly if you have more
than one alarm panel and discovery (first alphabetically) picked the wrong
one.

### Alarm buttons tap but nothing happens

If the entity declares a `code_format` (a PIN/code the integration
requires), every arm/disarm opens a PIN pad first (v1.9.0): a numeric
keypad for `code_format: number`, a password field with the system keyboard
otherwise. A code the panel rejects keeps the pad open with "Code not
accepted" and an error toast. The code is never saved, logged or included
in "Copy diagnostics". If a tap still does nothing, open Settings →
Diagnostica → Recent actions: it shows the call and Home Assistant's
answer. Before v1.9.0 there was no pad, and a code-gated action was a no-op
with a note under the buttons.

### A whole section (Energy / Irrigation / Vehicle / Cameras / Modes / People) is missing

That's by design when it isn't configured: `modes`/`energy`/`irrigation`/
`vehicle` are all opt-in in `config.js` (`null` hides them); `people`/
`weather`/`cameras`/`alarm` auto-discover but hide themselves if nothing is
found. Nothing here indicates an error — see `live_dashboard_config.example.js` for what
each section needs.

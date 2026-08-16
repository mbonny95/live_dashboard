# Changelog

All notable changes to this project are documented here. Format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [1.4.7] - 2026-08-15

### Fixed

- **On a zero-config install (HA's own Energy dashboard auto-discovered,
  no `config.energy` block), the Energy tab opened on four empty cells
  even though the home screen's Fotovoltaico card worked fine** —
  reported by a user on Reddit ("On the homescreen I see the solar but
  not on the energy tab"). Those instant-power (kW) cells only ever
  come from `config.energy` — `energy/get_prefs` and auto-discovery
  both work in energy (kWh) counters, not power — so an install relying
  on either of those two now sees the same double-ring and daily
  totals the home screen already resolved, instead of a broken-looking
  blank header. Installs with power sensors configured see no change.
- **The trend chart drew a flat row of zero-height bars when there was
  no history yet**, which reads as "you produce nothing" rather than
  "no data yet" — a zero-config install never gets chart history either
  (the same `config.energy` gap above), so this was almost certainly
  part of what the reporting user saw. Replaced with a plain message
  when the chosen period has no data for any series.

## [1.4.6] - 2026-08-15

### Fixed

- **Card shadows were visibly cut off at the four edges of the page**,
  reported by a user on Reddit. The root container's padding (16px
  top/bottom, 18px left/right) was smaller than the neumorphic shadow's
  own reach (up to 22px), so any card sitting flush against the page
  edge had its shadow clipped by the root's `overflow:hidden` instead
  of fading out — most visible exactly where the gradient should have
  been softest. Padding is now 22px/24px, matching the shadow's reach;
  nothing else changed (gaps, card padding, and the scrollable inner
  areas — where a clipped edge reads as scrolling, not a defect — are
  untouched). Mobile wasn't affected: its page isn't clipped in the
  first place, so there was nothing to fix there.

## [1.4.5] - 2026-08-15

### Fixed

- **The three home-screen energy values (self-consumption, grid, fed to
  grid) were invisible whenever surveillance cameras were also
  configured.** The compact Fotovoltaico card — the layout used on any
  install with cameras, so the normal case — swapped the three-line
  legend for a one-line summary instead of dropping the values
  somewhere else; they simply weren't in the markup. Replaced with
  three small tiles under the ring, showing the same numbers the
  full-size card already had, with a shortened summary line underneath.
- **The Energy view's chart colored production and grid import the
  opposite way from the home-screen ring** — sage meant solar there and
  terracotta meant grid, but the chart had them backwards. Fixed
  alongside adding the fed-to-grid bar (see below), since correcting
  one without the other would have left the two views agreeing on
  nothing.

### Added

- **A third bar for energy fed back to the grid**, next to production
  and grid import, in both the desktop chart and the mobile
  stick-chart — the daily total the ring already tracks but the trend
  chart never showed. Installs without an export sensor mapped keep
  the original two-bar layout; no sensor means no bar, not a bar stuck
  at zero.

## [1.4.4] - 2026-08-15

### Fixed

- **On mobile, every appliance (Lavatrice, Asciugatrice) was rendered
  twice inside its room card.** `dash_neumo_mobile.html` had two
  identical loops over the appliance list — a copy-paste leftover the
  desktop layout never had. The duplicate loop is gone; each appliance
  now appears once, same as desktop.

### Changed

- **Removed the "N min remaining" text shown next to a running
  appliance.** Home Assistant integrations report a washer/dryer's
  remaining-time sensor inconsistently enough (units, absolute vs.
  relative values) that it could render nonsense on some installs — a
  running Lavatrice showing "2026 min remaining" on one setup, for
  example. Rather than add per-integration guessing, the appliance card
  now just shows its state label (e.g. "Lavaggio") while running; the
  optional `remaining` config field, its i18n string, and the demo
  sensor for it are removed. `energyToday` (shown while idle) is
  unaffected.

## [1.4.3] - 2026-08-14

### Fixed

- **On installs with a single grid meter, the Energy ring showed
  production but never prelievo (grid import) or immissione (grid
  export), even though Home Assistant's own Energy dashboard had both.**
  Home Assistant reports a grid source's import/export sensors two
  different ways depending on the install: some list them under
  `flow_from`/`flow_to` (handled since 1.4.1), others put them directly
  on the source — the shape this project hadn't handled at all until
  now. Both are read equally now, and if an install somehow reports a
  sensor both ways, it's only counted once rather than doubled.
- If a future install reports its grid or solar source in a shape this
  page still doesn't recognize, the diagnostic log (`[live_dashboard]
  energia`, printed on every load) now also lists the field names it
  did find on that source — enough to tell at a glance what's different,
  instead of just "not found".

## [1.4.2] - 2026-08-14

### Fixed

- **Every page load logged a red console error for each icon and camera
  image the page hadn't loaded data for yet — 15+ of them, plus one for
  the irrigation sparkline chart.** These looked like broken requests
  (`GET /local/.../%7B%7B%20m.icon%20%7D%7D 404`) because they were: the
  browser's own HTML parser fetches an `<img src>` or `<use href>` the
  instant it sees the tag, before this page's own code has run at all, and
  it doesn't know `{{ m.icon }}` is a placeholder waiting for real data —
  it just tries to load that text as a URL. Confirmed happening within
  ~30ms of navigation start, well before anything on the page could
  reasonably have set a real value yet. Every one of these is now set
  after the fact, once real data exists, instead of being written directly
  into the page.
- The same root cause made the irrigation soil-moisture chart occasionally
  log `<polyline> attribute points: Expected number` — fixed the same way.
- A separate, unrelated issue produced console warnings like `{{
  S.onNow }} never resolved` on every load, for text that in fact always
  ended up correct on screen — the page's very first render (before any
  real data has loaded at all) used to leave a gap where some labels
  briefly had no value yet, which is normal, but was being logged as if it
  were permanent. That first render now resolves to nothing shown, rather
  than to a warning, with no change to what appears once real data loads a
  moment later.
- Fixed a related timing gap from 1.4.0: whether a card like Energy or the
  no-areas-assigned message showed up could very briefly disagree with
  whether its text was ready, depending on exactly when Home Assistant's
  next update arrived during startup. Both now always become ready
  together.

## [1.4.1] - 2026-08-14

### Fixed

- The Fotovoltaico ring's auto-discovery from Home Assistant's Energy
  dashboard (`energy/get_prefs`, added in 1.4.0) could resolve production
  but not grid import/export on real installs with more than one solar
  array or more than one grid meter/contract — the mapping only ever kept
  the first entry for each role and silently dropped the rest. It now sums
  every entry HA reports for a role, which is what installs with a second
  array or a second contract actually need.
- A near-zero segment (e.g. an install feeding back a fraction of a percent
  to the grid) could draw a small stray dot on the ring at the segment
  boundary instead of just not showing, because `stroke-linecap: round`
  still paints a dot for a zero-length dash. Segments this small now use
  `stroke-linecap: butt` instead, which draws nothing for zero length, same
  as intended.

### Added

- A `console.info` at boot naming, for each of production/grid-import/
  grid-export: which tier resolved it (`config.js`, HA's Energy dashboard,
  or auto-discovery), which entity/statistic it resolved to, and the value
  read. A ring showing a wrong or missing number was previously
  indistinguishable from one that couldn't find its sensors at all — this
  makes the difference visible in the console without guessing.
- A real `energy/get_prefs` failure (unsupported command, permissions) is
  now logged with `console.warn` instead of being silently treated the same
  as "no Energy dashboard configured" — the two cases were previously
  indistinguishable from the console.

## [1.4.0] - 2026-08-14

### Changed

- **The Fotovoltaico ring is now two concentric rings, and the number in
  the middle means something different than before.** The previous ring
  compared today's solar production against today's grid import — two
  numbers that were never meant to sum to anything, so the percentage it
  showed didn't correspond to a real quantity. The new ring shows two real
  totals instead: the outer ring is today's house consumption (self-used
  solar + grid import), the inner ring is today's solar production
  (self-used solar + fed back to the grid). The self-used-solar segment is
  the same color and the same starting point in both, since it's the one
  number shared between them. If you've been reading the old percentage
  for a while, expect it to look different now — this isn't a restyle of
  the same math, it's different math. See the README's "Enabling Energy"
  section for the two identities behind it.
- **Energy setup is optional if you've already configured it in Home
  Assistant.** The ring now reads your solar/grid sensor mapping straight
  from HA's own Energy dashboard (Settings -> Dashboards -> Energy) when
  you have one set up, and falls back to a best-effort guess from
  `device_class: energy` sensors when you don't — `config.js`'s `energy`
  block is only needed to override either of those, not to see the ring at
  all. Explicit `config.js` values still always win when set.
- With no grid-export sensor available anywhere, the ring falls back to the
  previous single-ring view rather than guessing or showing an empty inner
  ring — see the README for the full set of fallback rules.

### Added

- `config.energy.gridExportToday` and `config.energy.consumptionToday`,
  both optional, for installs that want to point the new ring at specific
  sensors rather than let it derive or auto-discover them.
- A install-time self-check for the single most common HACS/manual install
  mistake: `panel_custom`'s `name:` not matching the folder the dashboard
  is actually running from. Previously this produced a blank/black panel
  with nothing in the console to explain why. It now prints a
  `console.error` naming the `name:` it expected, and shows the same
  message on the page itself for anyone who doesn't open dev tools.

### Fixed

- The README's manual-install section showed a "second copy side by side"
  pattern (`casa` / `casa2`, picking your own `name:` per copy) that only
  ever applied to manual installs — nothing marked it as such, so it read
  as generally applicable and could lead a HACS install to a `name:`
  mismatch (the exact failure the self-check above now catches). Both the
  manual and HACS sections now say explicitly that HACS's folder — and
  therefore its `name:` — isn't a per-install choice.

## [1.3.1] - 2026-08-14

### Fixed

- The shipped example config file is renamed `live_dashboard_config.example.js`
  (was `live_dashboard_config.js` in 1.3.0). It always was inert on its own —
  the config lookup only ever checks for `config.js` or
  `live_dashboard_config.js`, never a `.example.js` file — but sharing its
  name with the file you're supposed to create in `config/www/` was an easy
  trap: someone editing it in place, inside the plugin's own folder, would
  see it work right up until the next update overwrote it.

## [1.3.0] - 2026-08-14

### Added

- **HACS support.** The dashboard can now be installed and updated through
  HACS as a custom repository, category **Dashboard**, alongside the
  existing manual install method — see the README's "Via HACS" section.
- **A config location that HACS updates can't erase.** Your `config.js`
  overrides can now live at `config/www/live_dashboard_config.js`. This is
  the new recommended spot, because it sits outside the folder a HACS
  update overwrites — previous versions only supported placing it next to
  the dashboard's own files, which meant an update would wipe it out on a
  HACS install. If you already have a working `config.js` from a manual
  install, it's picked up exactly as before — nothing to change, nothing
  breaks.

## [1.2.0] - 2026-08-14

### Added

- Weather station (optional, `config.weatherStation`): outdoor
  temperature/humidity in the weather widget and its detail card can now
  prefer a local weather station's own sensors over the `weather:`
  entity's current-conditions attributes, plus wind, rain, irradiance,
  ET₀, feels-like, and dew point — none of which a `weather.*` entity
  reliably exposes. Reuses `irrigation.weather`/`irrigation.et0` when
  already set, so an install with irrigation configured only has to add
  `feelsLike`/`dewPoint`, which have no other field to live in. Entirely
  optional and additive — with nothing configured, behavior is unchanged.

### Changed

- The weather detail card no longer lists per-zone soil moisture as
  duplicate pills (it already has its own numbers in the Irrigation tab);
  the existing "go to irrigation" link with a one-line summary covers that
  instead of repeating the same figures in two places.

## [1.1.2] - 2026-08-14

### Fixed

- An entity already wired into a specialized module — an appliance's
  `powerSwitch`, an irrigation zone's `valve`, the weather-station sensors
  used for ET0 — could also show up as a plain generic control or room
  "environment" pill if it happened to be assigned to an area, duplicating
  it with unrelated context. Found on a real installation: a weather
  station's outdoor temperature/humidity (already driving irrigation math)
  was cluttering its area's room card as a generic sensor reading, right
  alongside genuinely unrelated numbers like an inverter's internal
  temperature. `discoverRooms()` now excludes any entity referenced
  anywhere in `config.js`, not just appliance switches, from the generic
  per-room lists — one config-schema-agnostic exclusion instead of a
  hardcoded field list to keep in sync as modules grow.

## [1.1.1] - 2026-08-14

### Fixed

- `dash_neumo.html`/`dash_neumo_mobile.html` cache-bust `?v=` only ever
  covered the page itself (via the iframe src) — the scripts it loads in
  turn (`discovery.js`, `config.js`, the i18n/backend files) had no
  cache-bust at all, so a browser could keep a stale `discovery.js` (missing
  a recent fix or feature) even after a fresh deploy and a full HA restart,
  with no visible sign anything was wrong. Found validating Appliances
  (1.1.0) against a real installation: the page was demonstrably fresh
  (correct `ASSET_VERSION` in the iframe URL) but behavior still matched
  the pre-1.1.0 code. Every `loadScript()` call now reuses the same `?v=`
  the page itself was loaded with, so one `ASSET_VERSION` bump busts the
  whole chain, not just the page.

## [1.1.0] - 2026-08-14

### Added

- Appliances (optional, `config.appliances`): washer/dryer-style status —
  running state, remaining minutes, energy today — for setups where a plain
  switch isn't enough to show whether something is actually running. Like
  Vehicle, this is explicit config since no Home Assistant domain
  standardizes it. Appliances appear in the Casa "on right now" list, the
  room summary, and a dedicated card in the room panel; a `powerSwitch` set
  on one stops being auto-discovered as a plain toggle in its room, so it
  isn't shown twice.

### Fixed

- Desktop's "on right now" list had a few labels hardcoded in Italian
  instead of going through translation — invisible until `hass.language`
  (or a browser set to English) actually requested English. Mobile already
  did this correctly; desktop now matches it.

## [1.0.1] - 2026-08-14

### Fixed

- The "selected" state (`[data-sel="true"]`) — modes, tabs, alarm buttons,
  range pickers, light/switch toggle chips — was completely inert
  wherever a button's own inline `style` also set `background`/
  `box-shadow`/`color`, which inline styles always win over a plain
  stylesheet rule regardless of specificity. On mobile's mode buttons this
  meant zero visible difference between the active mode and the others —
  not subtle, literally no difference in computed style. Fixed with
  `!important` on the override (verified against every affected surface on
  both layouts) and, while touching it, made the state itself easier to
  read at a glance: a soft tinted background alongside the existing
  inset-shadow and accent-color change, instead of the shadow alone.

## [1.0.0] - 2026-08-13

Validated end to end against a real Home Assistant installation, running
alongside its original hand-built dashboard, not just the demo dataset.

### Added

- Empty-state guidance when zero Home Assistant areas exist: a message and
  a direct link to Settings → Areas instead of a silently blank Stanze
  section — this is the single most likely reason a fresh install would
  look broken on first load.
- Inline tooltip on the Fotovoltaico card's "grid" figure (dotted
  underline, hover/tap) clarifying it's energy imported from the grid, not
  total house consumption — in the dashboard itself, not only the README,
  since someone who clones the repo may never open it.

### Fixed

- Mobile's Energia tab showed a tile labeled "Consumo casa" that actually
  duplicated the grid-import value — the same number as the adjacent,
  correctly-labeled "Dalla rete" tile. Found while adding the tooltip
  above. The mislabeled tile is removed.

## [0.3.0] - 2026-08-13

### Added

- Irrigation zones can now run timed watering through `buttons` — one
  `input_button.*` per duration — as an alternative to `valve` +
  `durations`. Found while validating against a real installation whose
  zones are opened by a script/automation already owning the timing, with
  no switch entity for the dashboard to drive directly; `valve` alone
  couldn't represent that setup. `buttons` takes over from `valve` when
  both are set.

## [0.2.1] - 2026-08-13

### Fixed

- `panel.js` registered its custom element under a hardcoded `casa-panel`
  tag regardless of the folder it was deployed to or the `name:` set in
  `configuration.yaml`. Any install using a different `panel_custom.name`
  (a renamed folder, or a second install running side by side with a
  working one to try the public build without touching it) loaded as a
  blank/black panel with no error in the console, because Home Assistant
  created an element nothing had ever registered. The tag is now derived
  from the module's own deploy folder (`config/www/<folder>/panel.js`
  registers `<folder>-panel`), so `name:` just has to match the folder —
  and two installs can now run side by side without a
  `customElements.define()` collision. Documented in README.md/README.it.md
  and TROUBLESHOOTING.md, along with the separate (and easy to conflate)
  failure mode of a missing/stale `?v=` cache-bust on `module_url`.

## [0.2.0] - 2026-08-12

### Added

- Cameras (optional, auto-discovered): a "Sorveglianza"/"Surveillance" tab
  (from 2+ cameras), a featured-camera card in Casa, snapshot previews that
  refresh on a timer (paused while the page isn't visible), a tap-to-live
  MJPEG fullscreen overlay with a 2-minute auto-close, and a `hideUntilTap`
  privacy mode for indoor cameras. Motion is read from any `binary_sensor`
  with `device_class: motion` on the same device as the camera. The
  Fotovoltaico card in Casa compacts itself when cameras are present, to
  keep the fixed 1200×800 no-scroll layout.

## [0.1.0] - 2026-08-12

### Added

- First public release. Auto-discovery of rooms, people, weather, alarm and
  quick actions from Home Assistant's area/device/entity registries.
- Optional modules, each hidden until configured: Energy (any inverter/meter
  integration via role mapping), Irrigation (per-zone, degrades gracefully),
  Vehicle (explicit sensor mapping, no generic HA domain for this exists).
- Demo mode with a fully invented dataset — opens from `file://` or with
  `?demo`, no Home Assistant required.
- Italian and English UI, chosen from `hass.language` with a `config.js`
  override and an English fallback.
- `panel_custom` installation only for this release (see README).

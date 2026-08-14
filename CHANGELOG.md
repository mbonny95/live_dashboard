# Changelog

All notable changes to this project are documented here. Format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

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

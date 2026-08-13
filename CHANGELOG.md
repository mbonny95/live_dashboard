# Changelog

All notable changes to this project are documented here. Format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

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

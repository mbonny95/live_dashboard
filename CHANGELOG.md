# Changelog

All notable changes to this project are documented here. Format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

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

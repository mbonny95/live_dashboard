# Changelog

All notable changes to this project are documented here. Format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

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

<!-- title: Live Dashboard -->
# Live Dashboard

*[Leggi in italiano](README.it.md)*

A hand-written, single-page Home Assistant dashboard for a wall-mounted
tablet: rooms, alarm, weather and quick actions on one screen, with optional
Energy and Irrigation views. No Lovelace cards, no YAML dashboard config — it
discovers your rooms and entities from Home Assistant's own registries and
draws itself.

![Casa view, demo mode](docs/screenshots/casa.png)

**Try it without installing anything:** clone this repo and open
`public/dash_neumo.html?demo` in a browser — works straight from `file://`,
no Home Assistant required. It shows invented data and a `DEMO` badge; see
[Demo mode](#demo-mode) below.

## What this is, and isn't

- A single page that lives in its own `panel_custom` panel, not a Lovelace
  dashboard and not a card. It doesn't try to be either.
- Built for a **tablet mounted on a wall, in landscape**, at a fixed
  1200×800-ish size with no scrolling on the main Casa view — that constraint
  is deliberate (see "Kiosk mode" below), not a bug.
- The mobile page (`dash_neumo_mobile.html`) is a real, complete second layout
  for phones, but it's secondary: the design decisions (grid density, no
  scroll) are made for the wall tablet first.

## Requirements

- Home Assistant with `www/` access (to copy files into `config/www/`) and
  a `configuration.yaml` you can edit for the `panel_custom` integration.
- No minimum version is enforced, but the area/device/entity registry calls
  this uses (`config/area_registry/list` etc.) have been standard since
  Home Assistant 2022.x; anything reasonably current works.
- No npm, no build step. Everything is plain HTML/CSS/JS, loaded as ES
  modules straight from `config/www/`.

## Installation

1. Copy the whole `public/` folder into `config/www/casa/` (rename as you
   like — `casa` is just what the example below uses).
2. Add to `configuration.yaml`:

   ```yaml
   panel_custom:
     - name: casa-panel
       url_path: casa
       sidebar_title: Casa
       sidebar_icon: mdi:home-heart
       module_url: /local/casa/panel.js
       embed_iframe: true
       trust_external_script: false
   ```

3. Restart Home Assistant. Open the new sidebar entry.

That's it — with no `config.js` at all, the dashboard auto-discovers your
areas and shows up to 8 of them as room tiles, plus any `person.*` entities
and the first `weather.*` entity it finds. Alarm, house-mode scene switcher,
Energy, Irrigation and Vehicle stay hidden until you opt into them (see
below) — there's no way to guess a "house mode" script pairing or which of
several alarm panels is "the" one, so those stay off by default rather than
guessing wrong.

### Configuring the rest

Copy `config.example.js` to `config.js` **in the same folder** (next to
`panel.js`) and uncomment what you need — every key is documented inline
there. `config.js` is meant to hold your own entity IDs; keep it out of
version control (the provided `.gitignore` already excludes it).

## Enabling Energy

`config.js`'s `energy` block asks for sensors by **role**, not by brand, so
it works with anything that exposes these. `productionToday` /
`gridToday` must be daily counters that reset at midnight — see
TROUBLESHOOTING.md if the charts look wrong.

| Role | Huawei FusionSolar | SolarEdge | Fronius | Shelly EM | HA Energy Dashboard |
| --- | --- | --- | --- | --- | --- |
| `production` | `sensor.*_panel_production_power` | `sensor.solaredge_current_power` | `sensor.inverter_power` | `sensor.shellyem_channel_a_power` | `sensor.solar_power` (your own) |
| `consumption` | `sensor.*_house_load_power` | — (add a utility meter) | — | `sensor.shellyem_channel_b_power` | `sensor.house_power` |
| `gridImport` | `sensor.*_grid_consumption_power` | `sensor.solaredge_m1_ac_power` (import side) | `sensor.meter_power` | `sensor.shellyem_channel_b_power` | your grid import sensor |
| `gridExport` | `sensor.*_grid_injection_power` | same meter, export side | `sensor.meter_power` (negative) | same, inverted | your grid export sensor |
| `productionToday` | `sensor.*_panel_production_today` | `sensor.solaredge_lifetime_energy` (diffed) | `sensor.energy_day` | Shelly EM has no daily counter — add a `utility_meter` helper | `sensor.solar_energy_today` |
| `gridToday` | `sensor.*_grid_consumption_today` | via a `utility_meter` helper | `sensor.grid_energy_day` | via a `utility_meter` helper | `sensor.grid_import_today` |
| `battery` | `sensor.*_battery_soc` / `_power` | SolarEdge Battery integration | Fronius battery sensors | — | — |
| `inverterStatus` | `sensor.*_inverter_inverter_status` | `sensor.solaredge_status` | `sensor.status_code` | — | — |

If your integration doesn't expose a daily counter for a given role, add a
[`utility_meter` helper](https://www.home-assistant.io/integrations/utility_meter/)
in Home Assistant that resets daily and point `config.js` at that instead.

## Enabling Irrigation

Each zone needs only `moisture` (a `sensor.*` with `%` state) and `valve` (a
`switch.*`) to be useful: sparkline, valve state, and timed-run buttons that
just call `switch.turn_on` then `switch.turn_off` after N minutes — no extra
helper entities required for that part.

Everything else (`advisory`, `deficit`, `weekMm`, `lastRun`, `et0`, `etc`,
`effectiveRain`, `summary`) is optional and only appears if you set it.
**The agronomic math (ET₀/ETc, accumulated deficit) is not part of this
project** — it depends on your own weather station and soil data. The
automations that compute it in the original installation this dashboard was
extracted from are a separate, personal setup and aren't included here;
build your own (any automation that writes the result into an
`input_number`/`sensor` and points `config.js` at it will work), or leave
those fields unset and use the dashboard for live moisture + manual watering
only.

## Vehicle (optional)

There's no Home Assistant domain that standardizes car telemetry, so
`config.vehicle` is an explicit field-by-field mapping (fuel or battery,
range, odometer, extra cells, warning binary_sensors). It's been used with a
Mercedes `mbapi2020` install; it should work with any integration that
exposes comparable sensors (Volvo, Kia Connect, BMW Connected Drive,
generic OBD-II readers) since nothing here is brand-specific.

## Kiosk mode for the wall tablet

Point [Fully Kiosk Browser](https://www.fully-kiosk.com/) (or any kiosk
browser) at `https://<your-ha>/casa`. To hide the Home Assistant sidebar and
header on top of the panel, use
[kiosk-mode](https://github.com/NemesisRE/kiosk-mode) from HACS, or Fully
Kiosk's own "Web Content Zoom"/immersive settings. Target resolution
1280×800 landscape — anything narrower or shorter than that switches the
Casa view into a scrolling layout (deliberately — see TROUBLESHOOTING.md).

## Demo mode

Open the page with `?demo` appended to the URL (or just open it directly
outside of `panel_custom` — from `file://`, the dashboard has no host to
talk to and falls back to the same demo backend automatically after a short
timeout). It shows all four views — Casa, Irrigazione, Energia, Auto — with
invented data and a visible `DEMO` badge, and never calls a real service.

## Known limits

- Built for a landscape wall tablet first; the mobile page is complete but
  secondary, not the primary design target.
- Not a Lovelace replacement — no card picker, no drag-and-drop layout, no
  YAML dashboard config. It's one page that reflects your registries.
- `panel_custom` is the only supported install method in this release — see
  CHANGELOG.md.

## More

- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) — white panel, empty rooms, wrong
  charts, missing alarm buttons.
- [CHANGELOG.md](CHANGELOG.md)
- [config.example.js](public/config.example.js) — every override, documented
  inline.

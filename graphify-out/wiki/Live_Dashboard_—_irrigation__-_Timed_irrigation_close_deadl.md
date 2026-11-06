# Live Dashboard — irrigation  / Timed irrigation close deadl

> 18 nodes

## Key Concepts

- **Live Dashboard — irrigation safety close (automation blueprint)** (7 connections) — `blueprints/automation/live_dashboard/irrigation_safety_close.yaml`
- **Timed irrigation close deadline persisted to frontend/user_data** (6 connections) — `CHANGELOG.md`
- **Irrigation buttons mode (input_button per duration)** (5 connections) — `CHANGELOG.md`
- **Enabling Irrigation (valve vs buttons)** (5 connections) — `README.md`
- **too_long trigger (state on/open for max_minutes)** (4 connections) — `blueprints/automation/live_dashboard/irrigation_safety_close.yaml`
- **Irrigation safety close automation blueprint** (4 connections) — `CHANGELOG.md`
- **Irrigation state read from the valve entity** (4 connections) — `CHANGELOG.md`
- **valves input (switch.* / valve.* multi-entity selector)** (3 connections) — `blueprints/automation/live_dashboard/irrigation_safety_close.yaml`
- **Weather station sensors preferred over weather entity** (3 connections) — `CHANGELOG.md`
- **Weather station (optional)** (3 connections) — `README.md`
- **max_minutes input (default 20, 1-240 min)** (2 connections) — `blueprints/automation/live_dashboard/irrigation_safety_close.yaml`
- **restart trigger (homeassistant start)** (2 connections) — `blueprints/automation/live_dashboard/irrigation_safety_close.yaml`
- **Restart sweep closing still-open switches and valves** (2 connections) — `blueprints/automation/live_dashboard/irrigation_safety_close.yaml`
- **CHANGELOG v1.2.0** (2 connections) — `CHANGELOG.md`
- **CHANGELOG v1.1.2** (2 connections) — `CHANGELOG.md`
- **CHANGELOG v0.3.0** (2 connections) — `CHANGELOG.md`
- **Exclusion of config-referenced entities from generic room lists** (2 connections) — `CHANGELOG.md`
- **Domain-aware close action (switch.turn_off / valve.close_valve)** (1 connections) — `blueprints/automation/live_dashboard/irrigation_safety_close.yaml`

## Relationships

- [CHANGELOG / Config at config/www/live_da](CHANGELOG_-_Config_at_config-www-live_da.md) (3 shared connections)
- [README / CHANGELOG v1.9.0](README_-_CHANGELOG_v1.9.0.md) (3 shared connections)
- [TROUBLESHOOTING / Diagnostics panel](TROUBLESHOOTING_-_Diagnostics_panel.md) (2 shared connections)
- [Settings panel / Home section order](Settings_panel_-_Home_section_order.md) (1 shared connections)

## Source Files

- `CHANGELOG.md`
- `README.md`
- `blueprints/automation/live_dashboard/irrigation_safety_close.yaml`

## Audit Trail

- EXTRACTED: 44 (75%)
- INFERRED: 15 (25%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
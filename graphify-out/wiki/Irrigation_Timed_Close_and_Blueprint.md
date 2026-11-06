# Irrigation Timed Close and Blueprint

> 18 nodes · cohesion 0.16

## Key Concepts

- **v1.8.1** (14 connections) — `CHANGELOG.md`
- **Live Dashboard — irrigation safety close (automation blueprint)** (8 connections) — `blueprints/automation/live_dashboard/irrigation_safety_close.yaml`
- **Persistent timed-close deadline (frontend/user_data, checked every 15 s)** (6 connections) — `CHANGELOG.md`
- **too_long trigger (state on/open for max_minutes)** (4 connections) — `blueprints/automation/live_dashboard/irrigation_safety_close.yaml`
- **valves input (switch.* / valve.* multi-entity selector)** (3 connections) — `blueprints/automation/live_dashboard/irrigation_safety_close.yaml`
- **Demo scenario ?demo&scenario=call-timeout** (3 connections) — `CHANGELOG.md`
- **Irrigation buttons mode (input_button per duration)** (3 connections) — `CHANGELOG.md`
- **Irrigation safety close blueprint** (3 connections) — `CHANGELOG.md`
- **max_minutes input (default 20, 1-240 min)** (2 connections) — `blueprints/automation/live_dashboard/irrigation_safety_close.yaml`
- **Restart sweep closing still-open switches and valves** (2 connections) — `blueprints/automation/live_dashboard/irrigation_safety_close.yaml`
- **restart trigger (homeassistant start)** (2 connections) — `blueprints/automation/live_dashboard/irrigation_safety_close.yaml`
- **Diagnostica -> Irrigazione (planned/expired close time)** (2 connections) — `CHANGELOG.md`
- **Error/timeout toast** (2 connections) — `CHANGELOG.md`
- **Irrigation state from the valve entity** (2 connections) — `CHANGELOG.md`
- **Timeout error .code = 'timeout' (15 s in ha-backend-panel.js)** (2 connections) — `CHANGELOG.md`
- **Domain-aware close action (switch.turn_off / valve.close_valve)** (1 connections) — `blueprints/automation/live_dashboard/irrigation_safety_close.yaml`
- **Diagnostica -> Ambiente embed_iframe (panel_custom) row** (1 connections) — `CHANGELOG.md`
- **Irrigation duration buttons pressed until outcome (double-tap guard)** (1 connections) — `CHANGELOG.md`

## Relationships

- [Alarm PIN Pad](Alarm_PIN_Pad.md) (2 shared connections)
- [Service Calls and Diagnostica](Service_Calls_and_Diagnostica.md) (2 shared connections)
- [Early Releases 0.x](Early_Releases_0.x.md) (2 shared connections)
- [v1.9.0 Offline and Tests](v1.9.0_Offline_and_Tests.md) (2 shared connections)
- [Settings Panel and Persistence](Settings_Panel_and_Persistence.md) (1 shared connections)
- [Templating Constraints](Templating_Constraints.md) (1 shared connections)
- [Energy Role Colors and Ring](Energy_Role_Colors_and_Ring.md) (1 shared connections)

## Source Files

- `CHANGELOG.md`
- `blueprints/automation/live_dashboard/irrigation_safety_close.yaml`

## Audit Trail

- EXTRACTED: 55 (90%)
- INFERRED: 6 (10%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
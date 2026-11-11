# Live Dashboard — irrigation  / too_long trigger

> 7 nodes

## Key Concepts

- **Live Dashboard — irrigation safety close (automation blueprint)** (5 connections) — `blueprints/automation/live_dashboard/irrigation_safety_close.yaml`
- **too_long trigger (state on/open for max_minutes)** (4 connections) — `blueprints/automation/live_dashboard/irrigation_safety_close.yaml`
- **valves input (switch.* / valve.* multi-entity selector)** (3 connections) — `blueprints/automation/live_dashboard/irrigation_safety_close.yaml`
- **max_minutes input (default 20, 1-240 min)** (2 connections) — `blueprints/automation/live_dashboard/irrigation_safety_close.yaml`
- **restart trigger (homeassistant start)** (2 connections) — `blueprints/automation/live_dashboard/irrigation_safety_close.yaml`
- **Restart sweep closing still-open switches and valves** (2 connections) — `blueprints/automation/live_dashboard/irrigation_safety_close.yaml`
- **Domain-aware close action (switch.turn_off / valve.close_valve)** (1 connections) — `blueprints/automation/live_dashboard/irrigation_safety_close.yaml`

## Relationships

- [v1.8.1 / Diagnostica → Ultime azioni ](v1.8.1_-_Diagnostica_%E2%86%92_Ultime_azioni_.md) (1 shared connections)

## Source Files

- `blueprints/automation/live_dashboard/irrigation_safety_close.yaml`

## Audit Trail

- EXTRACTED: 19 (100%)
- INFERRED: 0 (0%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
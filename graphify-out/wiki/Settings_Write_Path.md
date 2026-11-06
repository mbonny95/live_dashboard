# Settings Write Path

> 8 nodes · cohesion 0.36

## Key Concepts

- **SETTINGS_* handlers (room/entity/camera/module/power unit/plug threshold/battery sign/reset)** (6 connections) — `public/dash_neumo.html`
- **SAVE_PREFS()** (5 connections) — `public/dash_neumo.html`
- **SETTINGS_SET_ENTITY()** (3 connections) — `public/dash_neumo.html`
- **doExport (config.js export to clipboard)** (2 connections) — `public/dash_neumo.html`
- **SETTINGS_LONG_HIDE()** (2 connections) — `public/dash_neumo.html`
- **SETTINGS_MOVE_SECTION()** (2 connections) — `public/dash_neumo.html`
- **SETTINGS_SET_BATTERY_SIGN()** (2 connections) — `public/dash_neumo.html`
- **_panelLpDown/_panelLpMove/_panelLpUp/_panelLpMenu long-press-to-hide** (1 connections) — `public/dash_neumo.html`

## Relationships

- [Desktop Component Logic](Desktop_Component_Logic.md) (2 shared connections)
- [Shared Component Methods](Shared_Component_Methods.md) (1 shared connections)

## Source Files

- `public/dash_neumo.html`

## Audit Trail

- EXTRACTED: 12 (52%)
- INFERRED: 11 (48%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
# Diagnostics panel (settings gear -> Diagnostica)

> God node · 11 connections · `CHANGELOG.md`

**Community:** [CHANGELOG: Config Keys & HA APIs](CHANGELOG-_Config_Keys_%26_HA_APIs.md)

## Connections by Relation

### conceptually_related_to
- Energy daily-totals diagnostics (_resolveEnergyDaily source) `EXTRACTED`
- frontend/set_user_data persistence with localStorage fallback `INFERRED`
- Config block: exact config.js path loaded / paths tried `EXTRACTED`
- Energy instantaneous-values diagnostics rows + kWh-in-power-role check `EXTRACTED`
- Copy diagnostics clipboard button with selectable-text fallback `EXTRACTED`
- Environment block: version, backend, iframe, language, counts `EXTRACTED`
- Diagnostics panel renders even when discovery/backend/config fails `EXTRACTED`

### rationale_for
- Shelly EM support case: 6 messages to find silent console.info clue `EXTRACTED`
- No new configuration keys; only surfaces existing decisions `EXTRACTED`

### references
- v1.5.1 release `EXTRACTED`
- Diagnostics-verified-issue tab dot + auto-jump `EXTRACTED`

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
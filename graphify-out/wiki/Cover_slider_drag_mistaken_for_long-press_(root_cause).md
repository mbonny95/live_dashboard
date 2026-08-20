# Cover slider drag mistaken for long-press (root cause)

> God node · 11 connections · `CHANGELOG.md`

**Community:** [CHANGELOG: Cover Slider Gesture Fix (v1.5.2)](CHANGELOG-_Cover_Slider_Gesture_Fix_%28v1.5.2%29.md)

## Connections by Relation

### conceptually_related_to
- Slider shown only when SET_POSITION feature bit present `INFERRED`

### rationale_for
- set_cover_position called at most once per drag `EXTRACTED`
- Cover row removed from long-press-to-hide gesture `EXTRACTED`
- Long-press timer cancelled on pointermove/pointercancel `EXTRACTED`
- Non-finite (NaN) value dropped before service call `EXTRACTED`
- Unchanged released value skipped before service call `EXTRACTED`
- touch-action:none/user-select:none on position slider `EXTRACTED`
- Fix duplicated identically in dash_neumo.html and mobile variant `EXTRACTED`

### references
- [v1.5.2 release](v1.5.2_release.md) `EXTRACTED`
- Verified cover.set_cover_position vs set_position naming `EXTRACTED`

### semantically_similar_to
- Inline style always wins over stylesheet, made 'selected' state inert `INFERRED`

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
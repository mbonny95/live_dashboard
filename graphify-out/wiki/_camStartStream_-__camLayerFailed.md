# _camStartStream / _camLayerFailed

> 19 nodes

## Key Concepts

- **_camStartStream()** (7 connections) — `public/dash_neumo.html`
- **_camVideoRef(layer, url)** (6 connections) — `public/dash_neumo.html`
- **_camLayerFailed(layer, detail)** (6 connections) — `public/dash_neumo.html`
- **_camStartFastPoll()** (6 connections) — `public/dash_neumo.html`
- **Camera live-view state (camStreamLayer/camStreamUrl/camPlayingUrl/camStillSrc)** (5 connections) — `public/dash_neumo.html`
- **componentDidMount()** (5 connections) — `public/dash_neumo.html`
- **_camStopFastPoll()** (4 connections) — `public/dash_neumo.html`
- **Camera detail template (<video ref=camVideoRef>, <img ref=camStreamSrcRef>)** (4 connections) — `public/dash_neumo.html`
- **_closeCam()** (3 connections) — `public/dash_neumo.html`
- **_setCamDiag()** (3 connections) — `public/dash_neumo.html`
- **_bindAttr(name, value)** (3 connections) — `public/dash_neumo.html`
- **Camera badge (Connecting… vs Live vs snapshot)** (3 connections) — `public/dash_neumo.html`
- **_openCam()** (2 connections) — `public/dash_neumo.html`
- **_camCanNative()** (2 connections) — `public/dash_neumo.html`
- **camDiag (per-camera layer diagnostics)** (2 connections) — `public/dash_neumo.html`
- **_attachHlsJs(video, url)** (2 connections) — `public/dash_neumo.html`
- **_camStillGen generation counter** (2 connections) — `public/dash_neumo.html`
- **Diagnostica camera rows (layer · ws · fell back from)** (2 connections) — `public/dash_neumo.html`
- **Layered camera live-view fallback (hls.js -> native HLS -> stills)** (2 connections) — `public/dash_neumo.html`

## Relationships

- [discovery.js / renderVals](discovery.js_-_renderVals.md) (5 shared connections)
- [dash_neumo.html / call](dash_neumo.html_-_call.md) (2 shared connections)
- [_boot / prefs.js](_boot_-_prefs.js.md) (2 shared connections)

## Source Files

- `public/dash_neumo.html`

## Audit Trail

- EXTRACTED: 63 (91%)
- INFERRED: 6 (9%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
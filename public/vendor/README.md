# Vendored third-party files

Shipped with the dashboard so it starts and plays camera streams without
internet access. Never edited by hand: replace them only with the exact file
from the upstream package, and update this table and
`tests/assets.test.mjs` in the same commit.

| File | Package | Version | License | Loaded |
|---|---|---|---|---|
| `react-18.3.1.production.min.js` | `react` (UMD) | 18.3.1 | MIT (`LICENSE-react.txt`) | always, before `support.js` |
| `react-dom-18.3.1.production.min.js` | `react-dom` (UMD) | 18.3.1 | MIT (`LICENSE-react.txt`) | always, before `support.js` |
| `fonts/caprasimo-latin*.woff2` | Caprasimo (Google Fonts, v6) | 1.0 | OFL-1.1 (`fonts/OFL-Caprasimo.txt`) | always, headings |
| `fonts/figtree-latin*.woff2` | Figtree variable (Google Fonts, v9) | — | OFL-1.1 (`fonts/OFL-Figtree.txt`) | always, body text |
| `hls.light.min.js` | `hls.js` (`dist/hls.light.min.js`) | 1.7.4 | Apache-2.0 (`LICENSE-hls.js.txt`) | only when a camera's live view opens, on any browser with Media Source (all but iOS before 17.1) |

Integrity:

- React files: SHA-384 equal to the SRI pinned in `support.js`
  (`REACT_SRI`, `REACT_DOM_SRI`), checked by `tests/assets.test.mjs`.
- `hls.light.min.js`: byte-identical to the file in the npm tarball
  `hls.js-1.7.4.tgz` (registry integrity
  `sha512-3GlxGdPvT2YHvQYOt+yOzT/DEior/qJVNIylHA77kgeoBTdQQqi70GwefNEUmHQeNGyjC8U62+bruqW/Tpm+tg==`).
  File SHA-384:
  `sha384-vpNtFjJmrPAaL9LfqByx3MxTVjqrtQ6Ue6UVNnFeghNrhE0uvpydDr3tkTVcBgDz`,
  checked by `tests/assets.test.mjs`.

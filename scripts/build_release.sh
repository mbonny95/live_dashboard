#!/usr/bin/env bash
# Builds live_dashboard.zip, the asset HACS downloads (used by
# .github/workflows/release.yml, and locally to test it).
#
# Layout — what HACS extracts into custom_components/live_dashboard/:
#   __init__.py, manifest.json, ... , brand/   the integration
#   www/                                        public/, served at /live_dashboard/
#
# v2 migration bridge, for a 1.x HACS *Dashboard* install that receives this
# update: HACS extracts the same zip into config/www/community/live_dashboard/
# instead, where the 1.x panel_custom block still loads ./panel.js. So the
# zip's top level also has:
#   panel.js                  imports ./www/panel.js (which names itself after
#                             the folder above www/: live_dashboard-panel)
#   dash_neumo.html,          redirect to ./www/…, for browsers still running
#   dash_neumo_mobile.html    the cached 1.x panel.js (31-day /local/ cache)
# These files are inert inside an integration install.
set -euo pipefail
cd "$(dirname "$0")/.."
VERSION=$(python3 -c "import json;print(json.load(open('custom_components/live_dashboard/manifest.json'))['version'])")
rm -rf build live_dashboard.zip
mkdir -p build/www
cp -R custom_components/live_dashboard/. build/
rm -rf build/www && mkdir -p build/www && cp -R public/. build/www/
cat > build/panel.js <<JS
// Live Dashboard ${VERSION} — bridge for 1.x HACS Dashboard installs (see
// scripts/build_release.sh). The dashboard now lives in ./www/; switch to the
// integration (README "Upgrading from 1.x") and this file is no longer used.
import './www/panel.js?v=${VERSION}';
JS
for page in dash_neumo.html dash_neumo_mobile.html; do
  cat > "build/$page" <<HTML
<!doctype html><meta charset="utf-8"><title>Live Dashboard</title>
<script>location.replace('./www/${page}' + location.search + location.hash);</script>
HTML
done
find build -name '__pycache__' -prune -exec rm -rf {} + ; find build -name '.DS_Store' -delete
(cd build && zip -qr ../live_dashboard.zip .)
echo "built live_dashboard.zip (version ${VERSION})"

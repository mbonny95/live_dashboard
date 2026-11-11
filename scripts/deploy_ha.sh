#!/usr/bin/env bash
# Development deploy of the v2 integration to a Home Assistant over SSH:
# custom_components/live_dashboard/ plus public/ as its www/ folder, the same
# layout the release zip has. Needs an SSH host with passwordless sudo (the
# Advanced SSH add-on as a wheel user works).
#
#   scripts/deploy_ha.sh [ssh-host]      default host: homeassistant
#
# Changes to panel.js or to the Python files need a Home Assistant restart;
# changes to the pages reach clients on their next load (version.json).
set -euo pipefail
HOST="${1:-homeassistant}"
DEST=/config/custom_components/live_dashboard
cd "$(dirname "$0")/.."
RSYNC=(rsync -rt --delete --exclude '__pycache__' --exclude '.DS_Store' --rsync-path="sudo -n rsync")
"${RSYNC[@]}" --filter='P www/' custom_components/live_dashboard/ "$HOST:$DEST/"
"${RSYNC[@]}" public/ "$HOST:$DEST/www/"
echo "deployed to $HOST:$DEST"

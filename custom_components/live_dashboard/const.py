"""Constants for the Live Dashboard integration."""

from __future__ import annotations

import re

DOMAIN = "live_dashboard"

# The dashboard's files (a copy of the repo's public/ folder, put in www/ by
# the release workflow) are served from here. panel.js derives its custom
# element name from the last path segment ("live_dashboard" ->
# "live_dashboard-panel"), so this path and PANEL_ELEMENT must agree.
URL_BASE = "/live_dashboard"
PANEL_ELEMENT = "live_dashboard-panel"

CONF_SIDEBAR_TITLE = "sidebar_title"
CONF_SIDEBAR_ICON = "sidebar_icon"
CONF_URL_PATH = "url_path"
CONF_REQUIRE_ADMIN = "require_admin"

DEFAULT_OPTIONS = {
    CONF_SIDEBAR_TITLE: "Casa",
    CONF_SIDEBAR_ICON: "mdi:home-heart",
    CONF_URL_PATH: "casa",
    CONF_REQUIRE_ADMIN: False,
}

# Same rule as Home Assistant's own dashboard URLs: lowercase, digits,
# dashes; at least one character; no leading or trailing dash.
URL_PATH_RE = re.compile(r"^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$")

ISSUE_URL_PATH_IN_USE = "url_path_in_use"
ISSUE_FILES_MISSING = "files_missing"
ISSUE_LEGACY_DASHBOARD = "legacy_dashboard_installed"

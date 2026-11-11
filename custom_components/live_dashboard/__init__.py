"""Live Dashboard: registers the dashboard as a Home Assistant sidebar panel.

v2. Until 1.x the dashboard needed a hand-written `panel_custom` block in
configuration.yaml, with three documented traps: `name:` had to be
`<folder>-panel` or the panel loaded black, `module_url` needed a `?v=` bumped
on every release (HA serves /local/ with a 31-day cache), and every change
needed a restart. This integration serves the dashboard's files itself and
registers the panel from the config entry, so none of that is the user's job.

The manual install (public/ copied into config/www/ + panel_custom in YAML)
keeps working unchanged; the pages don't depend on how they were served.
"""

from __future__ import annotations

import logging
from pathlib import Path

from homeassistant.components import frontend, panel_custom
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers import issue_registry as ir
from homeassistant.loader import async_get_integration

from .config_store import SharedConfig, async_register_websocket
from .const import (
    CONF_REQUIRE_ADMIN,
    CONF_SIDEBAR_ICON,
    CONF_SIDEBAR_TITLE,
    CONF_URL_PATH,
    DEFAULT_OPTIONS,
    DOMAIN,
    ISSUE_FILES_MISSING,
    ISSUE_LEGACY_DASHBOARD,
    ISSUE_URL_PATH_IN_USE,
    PANEL_ELEMENT,
    URL_BASE,
)

_LOGGER = logging.getLogger(__name__)

WWW_DIR = Path(__file__).parent / "www"


def entry_options(entry: ConfigEntry) -> dict:
    """Defaults, overridden by what the user chose (options win over data)."""
    return {**DEFAULT_OPTIONS, **entry.data, **entry.options}


def panel_url_in_use(hass: HomeAssistant, url_path: str) -> bool:
    """True when another panel (typically a 1.x panel_custom block) owns url_path."""
    return url_path in hass.data.get(frontend.DATA_PANELS, {})


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Serve the dashboard's files and register its sidebar panel."""
    data = hass.data.setdefault(DOMAIN, {})

    # File-system checks off the event loop (HA flags blocking I/O there).
    legacy_dir = Path(hass.config.path("www", "community", "live_dashboard"))
    files_ok, legacy_present = await hass.async_add_executor_job(
        lambda: ((WWW_DIR / "panel.js").is_file(), legacy_dir.is_dir())
    )

    if not files_ok:
        # A checkout of the repository, not a release zip: www/ is created by
        # the release workflow. Said in Repairs, not only in the log.
        ir.async_create_issue(
            hass, DOMAIN, ISSUE_FILES_MISSING,
            is_fixable=False, severity=ir.IssueSeverity.ERROR,
            translation_key=ISSUE_FILES_MISSING,
            translation_placeholders={"path": str(WWW_DIR)},
        )
        return False
    ir.async_delete_issue(hass, DOMAIN, ISSUE_FILES_MISSING)

    # v2 migration: the 1.x HACS Dashboard folder still there means HACS
    # still has the old Dashboard entry, which would keep receiving updates
    # next to the integration. Not an error (the dashboard works), a nudge.
    if legacy_present:
        ir.async_create_issue(
            hass, DOMAIN, ISSUE_LEGACY_DASHBOARD,
            is_fixable=False, severity=ir.IssueSeverity.WARNING,
            translation_key=ISSUE_LEGACY_DASHBOARD,
            translation_placeholders={"path": str(legacy_dir)},
        )
    else:
        ir.async_delete_issue(hass, DOMAIN, ISSUE_LEGACY_DASHBOARD)

    # Shared configuration (v2): loaded and its WebSocket commands
    # registered once per run, like the static path below.
    if "shared_config" not in data:
        shared = SharedConfig(hass)
        await shared.async_load()
        async_register_websocket(hass, shared)
        data["shared_config"] = shared

    # A static path can't be unregistered, so it's registered once per Home
    # Assistant run and survives entry reloads (options changes). No long
    # cache headers: unlike /local/, a new version is picked up on the next
    # load without a ?v= the user has to remember.
    if not data.get("static_registered"):
        await hass.http.async_register_static_paths(
            [StaticPathConfig(URL_BASE, str(WWW_DIR), cache_headers=False)]
        )
        data["static_registered"] = True

    opts = entry_options(entry)
    url_path = opts[CONF_URL_PATH]
    issue_id = f"{ISSUE_URL_PATH_IN_USE}_{url_path}"
    if panel_url_in_use(hass, url_path):
        # Almost always the 1.x panel_custom block still in configuration.yaml.
        ir.async_create_issue(
            hass, DOMAIN, issue_id,
            is_fixable=False, severity=ir.IssueSeverity.ERROR,
            translation_key=ISSUE_URL_PATH_IN_USE,
            translation_placeholders={"url_path": url_path},
        )
        _LOGGER.error("Panel path /%s is already used by another panel: see Settings -> Repairs", url_path)
        return False
    ir.async_delete_issue(hass, DOMAIN, issue_id)

    version = str((await async_get_integration(hass, DOMAIN)).version)
    await panel_custom.async_register_panel(
        hass,
        frontend_url_path=url_path,
        webcomponent_name=PANEL_ELEMENT,
        sidebar_title=opts[CONF_SIDEBAR_TITLE],
        sidebar_icon=opts[CONF_SIDEBAR_ICON],
        module_url=f"{URL_BASE}/panel.js?v={version}",
        embed_iframe=True,
        trust_external=False,
        require_admin=opts[CONF_REQUIRE_ADMIN],
        # Read by panel.js and shown in Diagnostica -> Environment.
        config={"install": "integration", "version": version},
    )
    data["url_path"] = url_path
    entry.async_on_unload(entry.add_update_listener(_async_options_updated))
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Remove the sidebar panel (the static files stay registered)."""
    url_path = hass.data.get(DOMAIN, {}).pop("url_path", None)
    if url_path:
        frontend.async_remove_panel(hass, url_path)
    return True


async def _async_options_updated(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """New title, icon, path or admin setting: re-register the panel."""
    await hass.config_entries.async_reload(entry.entry_id)

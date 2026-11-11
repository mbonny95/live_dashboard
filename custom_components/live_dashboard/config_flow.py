"""Config flow for Live Dashboard: where the panel goes in the sidebar.

One step, four fields (title, icon, URL path, admin only), all with working
defaults, so adding the integration is one click. The same fields are the
options flow, so they can be changed later without reinstalling.
"""

from __future__ import annotations

from typing import Any

import voluptuous as vol
from homeassistant.config_entries import ConfigEntry, ConfigFlow, ConfigFlowResult, OptionsFlow
from homeassistant.core import callback
from homeassistant.helpers import selector

from . import panel_url_in_use
from .const import (
    CONF_REQUIRE_ADMIN,
    CONF_SIDEBAR_ICON,
    CONF_SIDEBAR_TITLE,
    CONF_URL_PATH,
    DEFAULT_OPTIONS,
    DOMAIN,
    URL_PATH_RE,
)


def _schema(values: dict[str, Any]) -> vol.Schema:
    return vol.Schema(
        {
            vol.Required(CONF_SIDEBAR_TITLE, default=values[CONF_SIDEBAR_TITLE]): selector.TextSelector(),
            vol.Required(CONF_SIDEBAR_ICON, default=values[CONF_SIDEBAR_ICON]): selector.IconSelector(),
            vol.Required(CONF_URL_PATH, default=values[CONF_URL_PATH]): selector.TextSelector(),
            vol.Required(CONF_REQUIRE_ADMIN, default=values[CONF_REQUIRE_ADMIN]): selector.BooleanSelector(),
        }
    )


def _clean(user_input: dict[str, Any]) -> dict[str, Any]:
    out = dict(user_input)
    out[CONF_SIDEBAR_TITLE] = str(out[CONF_SIDEBAR_TITLE]).strip() or DEFAULT_OPTIONS[CONF_SIDEBAR_TITLE]
    out[CONF_URL_PATH] = str(out[CONF_URL_PATH]).strip().strip("/").lower()
    return out


def _validate(hass, values: dict[str, Any], current_url_path: str | None) -> dict[str, str]:
    """Errors keyed by field. A path is "in use" only if someone else owns it:
    the panel this entry registered itself is fine to keep."""
    url_path = values[CONF_URL_PATH]
    if not URL_PATH_RE.match(url_path):
        return {CONF_URL_PATH: "invalid_url_path"}
    if url_path != current_url_path and panel_url_in_use(hass, url_path):
        return {CONF_URL_PATH: "url_path_in_use"}
    return {}


class LiveDashboardConfigFlow(ConfigFlow, domain=DOMAIN):
    """Add Live Dashboard from Settings -> Devices & services."""

    VERSION = 1

    async def async_step_user(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        errors: dict[str, str] = {}
        values = dict(DEFAULT_OPTIONS)
        if user_input is not None:
            values = _clean(user_input)
            errors = _validate(self.hass, values, None)
            if not errors:
                return self.async_create_entry(title="Live Dashboard", data={}, options=values)
        return self.async_show_form(step_id="user", data_schema=_schema(values), errors=errors)

    @staticmethod
    @callback
    def async_get_options_flow(config_entry: ConfigEntry) -> OptionsFlow:
        return LiveDashboardOptionsFlow()


class LiveDashboardOptionsFlow(OptionsFlow):
    """Change title, icon, path or admin-only later; the entry reloads."""

    async def async_step_init(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        current = {**DEFAULT_OPTIONS, **self.config_entry.options}
        errors: dict[str, str] = {}
        values = current
        if user_input is not None:
            values = _clean(user_input)
            errors = _validate(self.hass, values, current[CONF_URL_PATH])
            if not errors:
                return self.async_create_entry(data=values)
        return self.async_show_form(step_id="init", data_schema=_schema(values), errors=errors)

"""Shared dashboard configuration stored inside Home Assistant (v2).

Until 1.x the dashboard's configuration lived only in
config/www/live_dashboard_config.js, edited by hand. With the integration it
can live here instead: one object, the same for every user and device,
written from the dashboard's Settings -> Configuration by an administrator.
When it is set it wins over the file; clearing it falls back to the file.

The stored object has exactly the shape of window.CASA_CONFIG (see
public/live_dashboard_config.example.js): this module doesn't interpret it,
it only checks that it is a JSON object of a sane size.
"""

from __future__ import annotations

import json
from datetime import datetime, timezone
from typing import Any

import voluptuous as vol
from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.storage import Store

from .const import DOMAIN

STORAGE_KEY = f"{DOMAIN}.config"
STORAGE_VERSION = 1
MAX_CONFIG_BYTES = 256 * 1024

WS_GET = f"{DOMAIN}/config/get"
WS_SET = f"{DOMAIN}/config/set"


class SharedConfig:
    """The stored config plus who saved it and when."""

    def __init__(self, hass: HomeAssistant) -> None:
        self._store: Store[dict[str, Any]] = Store(hass, STORAGE_VERSION, STORAGE_KEY)
        self.data: dict[str, Any] = {"config": None, "updated_at": None, "updated_by": None}

    async def async_load(self) -> None:
        stored = await self._store.async_load()
        if isinstance(stored, dict):
            self.data.update(stored)

    async def async_set(self, config: dict[str, Any] | None, user_name: str | None) -> None:
        self.data = {
            "config": config,
            "updated_at": datetime.now(timezone.utc).isoformat(),
            "updated_by": user_name,
        }
        await self._store.async_save(self.data)


def validate_config(config: Any) -> str | None:
    """Error code, or None when the config can be stored."""
    if config is None:
        return None
    if not isinstance(config, dict):
        return "not_an_object"
    try:
        size = len(json.dumps(config))
    except (TypeError, ValueError):
        return "not_json"
    if size > MAX_CONFIG_BYTES:
        return "too_large"
    return None


@callback
def async_register_websocket(hass: HomeAssistant, shared: SharedConfig) -> None:
    """Register the two commands (once per Home Assistant run)."""

    @websocket_api.websocket_command({vol.Required("type"): WS_GET})
    @callback
    def ws_get(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
        connection.send_result(msg["id"], shared.data)

    @websocket_api.require_admin
    @websocket_api.websocket_command({vol.Required("type"): WS_SET, vol.Required("config"): vol.Any(None, dict)})
    @websocket_api.async_response
    async def ws_set(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
        error = validate_config(msg["config"])
        if error:
            connection.send_error(msg["id"], error, f"Invalid configuration: {error}")
            return
        user = connection.user
        await shared.async_set(msg["config"], user.name if user else None)
        connection.send_result(msg["id"], shared.data)

    websocket_api.async_register_command(hass, ws_get)
    websocket_api.async_register_command(hass, ws_set)

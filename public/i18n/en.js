window.CasaStrings = window.CasaStrings || {}; window.CasaStrings.en = {
  // static labels, referenced in markup as {{ S.xxx }}
  alarm: 'Alarm', allOff: 'Everything off. Nothing to see here.', appliances: 'Appliances',
  closeCoversTitle: 'Close covers', covers: 'Covers', dayNight: 'Day / night',
  deficitAccumulated: 'Accumulated deficit', demoBadge: 'DEMO',
  demoTooltip: 'Demo — made-up data, no real installation connected',
  details: 'Details', down: 'Down', environment: 'Environment', fromGrid: 'From grid',
  goToIrrigation: 'Go to irrigation', kwhToday: 'kWh produced today', kwhTodayShort: 'kWh today', lighting: 'Lighting',
  lightsTitle: 'Lights', mmPerWeek: 'mm per week', multimedia: 'Multimedia', onNow: 'things on right now',
  open: 'Open', openCoversTitle: 'Open covers', other: 'Other', otherRooms: 'Other rooms',
  produced: 'Produced', production: 'Production', productionAndGrid: 'Production & grid',
  quickActions: 'Quick actions', resetWeek: 'Reset week', rooms: 'Rooms', soil: 'soil',
  soilMoisture48h: 'Soil moisture · 48h', solar: 'Solar', stop: 'Stop', switches: 'Switches',
  turnOff: 'Turn off', turnOn: 'Turn on', up: 'Up', warnings: 'Warnings', weatherStation: 'Weather station',
  houseMode: 'House mode', whoIsHome: "Who's home", lightsOffShort: 'Lights off', allOffShort: 'Everything off.',
  coversDown: 'Covers down', coversUp: 'Covers up', now: 'Now', producedToday: 'Produced today',
  consumption: 'House consumption', controls: 'Controls',
  surveillance: 'Surveillance', motion: 'Motion', live: 'Live', camAutoClose: 'Closes automatically in',
  noAreasTitle: 'No areas found', noAreasCta: 'Go to Areas',
  noAreasBody: "This dashboard builds itself from Home Assistant's areas: assign your entities to an area to see rooms here.",
  fromGridHint: 'Energy drawn from the grid today — not total house consumption',

  // settings panel (v1.5.0), static labels
  settings: 'Settings', settingsBack: 'Back', settingsCameras: 'Cameras', settingsSections: 'Sections',
  settingsExport: 'Export as config.js', settingsReset: 'Reset', settingsSavedHass: 'Saved to your Home Assistant account',
  settingsSavedLocal: 'Saved only on this device', settingsSectionsNote: "A section with nothing configured stays hidden either way.",
  settingsHideUntilTap: 'Icon until tapped', settingsDiffFromConfig: 'differs from config.js',
  settingsLongPressHide: 'Hide this', settingsExportCopied: 'Copied to clipboard',
  settingsExportSelect: 'Select and copy the text below', settingsExportOffer: 'Clear the overrides now that they’re in the file?',
  settingsExportKeep: 'Keep', settingsExportClear: 'Clear',

  // settings panel tabs + power unit (v1.5.3), static labels — tab labels
  // reuse rooms/settingsCameras/diagTitle rather than adding parallel keys
  settingsPowerUnitLabel: 'Instantaneous power unit', settingsPowerUnitAuto: 'Auto',
  settingsPowerUnitW: 'W', settingsPowerUnitKw: 'kW',
  settingsPowerUnitDailyNote: 'Daily totals stay in kWh.',
  settingsPlugThresholdLabel: 'Active-plug threshold',
  settingsPlugThresholdNote: 'Below this power, a switched-on plug reads as standby, not running.',

  // diagnostics panel (v1.5.1), static labels
  diagTitle: 'Diagnostics', diagConfigHeading: 'Config',
  diagConfigOutsideIframe: "This page isn't running inside the Home Assistant panel: the /local/ paths aren't even attempted, so your config.js can't be seen from here.",
  diagConfigNotFound: 'No config found.',
  diagConfigNotExecutedMsg: 'live_dashboard_config.js found but not executed. Either a syntax error in the file (a missing bracket or comma), or it\'s missing "window.CASA_CONFIG =" at the top. The dashboard is running on auto-discovery alone.',
  diagConfigVerdictMissing: 'missing (404)', diagConfigVerdictOk: 'found', diagConfigVerdictNotExecuted: 'found but not executed',
  diagEnergyInstantHeading: 'Energy — instantaneous values',
  diagRoleProduction: 'production', diagRoleConsumption: 'consumption', diagRoleGridImport: 'gridImport', diagRoleGridExport: 'gridExport',
  diagRoleBatteryPower: 'battery.power', diagRoleBatterySoc: 'battery.soc', diagRoleInverterStatus: 'inverterStatus',
  diagVerdictOk: 'ok', diagVerdictUnconfigured: 'not configured', diagVerdictMissing: 'entity does not exist', diagVerdictUnavailable: 'unavailable',
  diagUnitMismatch: 'This entity is in kWh (device_class energy): this role needs a power sensor (W/kW) — likely the wrong entity.',
  diagNotConfiguredLabel: '(not configured)',
  diagEnergyDailyHeading: 'Energy — daily totals',
  diagSourceConfig: 'from config.js', diagSourceHaPrefs: "from Home Assistant's Energy dashboard",
  diagSourceAuto: 'guessed from the sensor name', diagSourceNone: 'no source found',
  diagPrefsFailedMsg: 'energy/get_prefs failed: only what auto-discovery can guess from the sensor name shows up below.',
  diagCounterWarn: "This sensor is a lifetime total (state_class total_increasing) with no last_reset: it never resets at midnight, so it'll keep growing forever.",
  diagEnvVersion: 'Version', diagEnvVersionDev: 'dev/demo (no ?v=)',
  diagEnvBackend: 'Backend', diagEnvBackendPanel: 'panel', diagEnvBackendDemo: 'demo',
  diagEnvIframe: 'Inside HA panel', diagEnvIframeYes: 'yes', diagEnvIframeNo: 'no',
  diagEnvLang: 'Detected language', diagEnvAreas: 'Areas seen by discovery', diagEnvEntities: 'Entities seen by discovery',
  diagEnvRooms: 'Rooms resulting', diagEnvCameras: 'Cameras resulting', diagEnvPrefsOutcome: 'energy/get_prefs outcome',
  diagEnvPrefsOk: 'ok', diagEnvPrefsFailed: 'failed', diagEnvPrefsUnknown: 'not attempted',
  diagCopyButton: 'Copy diagnostics', diagCopyPrivacyNote: 'Contains the names of your entities and rooms, no passwords.',

  // v1.5.4 — cameras/ring/alarm, static labels
  diagCameraHeading: 'Cameras — live', diagCamNotOpened: 'not opened yet',
  diagCamLayerNative: 'native HLS', diagCamLayerHlsjs: 'hls.js', diagCamLayerSnapshot: 'fast previews',
  diagCamWsNotAttempted: 'camera/stream unavailable on this backend', diagCamWsOk: 'camera/stream ok', diagCamWsFailed: 'camera/stream failed',
  diagRingHeading: 'Energy ring', diagRingInUse: 'In use', diagRingNoEnergy: 'no ring (energy not configured)',
  diagRingDoubleLabel: 'double ring', diagRingSingleGeneric: 'single ring',
  diagSourceDomain: 'found via the alarm_control_panel domain',
  diagAlarmHeading: 'Alarm', diagAlarmEntity: 'Entity', diagAlarmFoundVia: 'Found via',
  diagAlarmCapabilities: 'Declared capabilities', diagAlarmDisarmOnly: 'disarm only',
  diagAlarmCodeRequired: 'Requires a code', diagVerdictYes: 'yes', diagVerdictNo: 'no',

  // dynamic strings, referenced via this.t('key', vars)
  'alarm.armedAway': 'Armed · away', 'alarm.armedHome': 'Armed · home', 'alarm.armedNight': 'Armed · night',
  'alarm.armedVacation': 'Armed · vacation', 'alarm.arming': 'Arming…',
  'alarm.btnAway': 'Away', 'alarm.btnHome': 'Home', 'alarm.btnNight': 'Night', 'alarm.btnVacation': 'Vacation',
  'alarm.btnCustom': 'Custom',
  'alarm.disarmed': 'Disarmed', 'alarm.pending': 'Pending…', 'alarm.triggered': 'ALARM TRIGGERED',
  'alarm.codeRequired': 'This panel requires a code: use the Home Assistant app to arm/disarm.',

  'appliance.energyToday': '{val} today',

  'cameras.motionDetected': 'Motion detected · {name}', 'cameras.allQuiet': 'All quiet',
  'cameras.tabSub': '{n} cameras · previews refresh every {seconds} seconds',
  'cameras.moreCount': '+{n} more', 'cameras.snapshotBadge': 'Preview refreshing',

  'chart.hide': 'Hide trend', 'chart.show': 'Show trend', 'chart.show48h': 'Show 48h trend',

  'common.off': 'off', 'common.on': 'on', 'common.unreachable': 'unreachable',

  'cover.closed': 'closed', 'cover.fullyOpen': 'fully open', 'cover.openAt': 'open at {pct}%',

  'energy.avgPerDay': 'Average produced per day', 'energy.consumptionNow': 'House consumption now',
  'energy.days': '{n} days', 'energy.fromGridShort': 'from grid', 'energy.gridCost': 'Cost of grid import',
  'energy.gridImportNow': 'Grid import now', 'energy.inverterProducing': 'inverter producing',
  'energy.inverterStandby': 'inverter on standby', 'energy.periodNote': 'produced over the last {n} days · {grid} taken from the grid',
  'energy.producedPeriod': 'Produced this period', 'energy.producedShort': 'produced', 'energy.productionNow': 'Production now',
  'energy.takenFromGrid': 'Taken from grid', 'energy.selfConsumption': '{pct} self-consumption',
  'energy.selfConsumptionShort': 'self-consumption',
  'energy.gridNote': '{grid} from grid · {exportVal} exported · {status}',
  'energy.selfConsumptionLabel': 'Self-consumption', 'energy.feedIn': 'Fed to grid', 'energy.kwhConsumed': 'kWh consumed',
  'energy.selfShort': 'self-cons.', 'energy.gridShort': 'from grid', 'energy.feedShort': 'fed in',
  'energy.compactSummary': 'kWh today · {pct} self-consumed',
  'energy.noHistory': 'No history for this period',

  'greeting.afternoon': 'Good afternoon', 'greeting.evening': 'Good evening', 'greeting.morning': 'Good morning', 'greeting.night': 'Night',

  'irrigation.defaultSummary': '{n} zones monitored', 'irrigation.deficitShort': 'deficit', 'irrigation.effectiveRain': 'Effective rain',
  'irrigation.et0Today': 'ET₀ today', 'irrigation.etcShort': 'ETc', 'irrigation.etcToday': 'ETc today',
  'irrigation.minutes': '{n} min', 'irrigation.needsWaterMatch': 'water', 'irrigation.recommendedMin': 'recommended {n} min',
  'irrigation.soilOf': '{zone} soil', 'irrigation.lastRun': 'Last watered · {when}',

  'light.brightnessSuffix': 'brightness',

  'lock.locked': 'locked', 'lock.unlocked': 'unlocked',
  'lock.lockAction': 'Lock', 'lock.unlockAction': 'Unlock',

  'media.playing': 'playing',

  'people.away': 'away', 'people.home': 'home',

  // room card pills, keyed by binary_sensor device_class (see B2/discovery.js)
  'pill.door': 'open', 'pill.window': 'open', 'pill.opening': 'open', 'pill.garage_door': 'open',
  'pill.motion': 'motion', 'pill.occupancy': 'occupied', 'pill.presence': 'presence',
  'pill.moisture': 'flooding', 'pill.smoke': 'smoke', 'pill.gas': 'gas',

  'quick.all': 'all', 'quick.alreadyOff': 'already off', 'quick.coversDown': 'Covers down',
  'quick.coversUp': 'Covers up', 'quick.lightsOff': 'Turn off all lights', 'quick.onCount': '{n} on',
  'quick.openFraction': '{open}/{total} open',

  'room.coverPct': 'cover {pct}%', 'room.coversClosed': 'covers closed', 'room.coversOpenCount': '{open}/{total} covers open',
  'room.lightsOff': 'lights off', 'room.lightsOnCount': '{n} lights on', 'room.nothingActive': 'nothing active',
  'room.switchRunning': '{name} running', 'room.tvOn': 'TV on', 'room.vacuumRunning': 'vacuum cleaning',

  'rooms.overflow': '+{n} rooms',

  'settings.entityCount': '{n} entities · {m} hidden', 'settings.reasonDomain': 'domain {domain}',
  'settings.reasonDeviceClass': 'device_class {dc}',

  'diag.configResolved': 'Config loaded from {path}.',
  'diag.ringMissing': 'single ring — missing {field}',

  'siren.sounding': 'sounding',

  'status.connected': 'Connected', 'status.connecting': 'Connecting…', 'status.error': 'Not connected',

  'switch.off': 'off', 'switch.running': 'running', 'switch.active': 'active',

  'valve.open': 'open', 'valve.closed': 'closed',
  'valve.openAction': 'Open', 'valve.closeAction': 'Close',

  'tab.casa': 'Home', 'tab.cameras': 'Surveillance', 'tab.energy': 'Energy', 'tab.irrigation': 'Irrigation', 'tab.vehicle': 'Vehicle', 'tab.weather': 'Weather',

  'vacuum.cleaning': 'cleaning', 'vacuum.name': 'Vacuum', 'vacuum.returning': 'returning to base',

  'vehicle.check': 'check', 'vehicle.meta': 'Range {range} · {odometer} total', 'vehicle.ok': 'ok',
  'vehicle.rangeLine': 'Range {range}',

  'wx.airHumidity': 'Air humidity', 'wx.cloudy': 'Cloudy', 'wx.irradiance': 'Irradiance',
  'wx.outdoorHumidity': 'Outdoor humidity', 'wx.outdoorTemp': 'Outdoor temperature', 'wx.partlyCloudy': 'Partly cloudy',
  'wx.pouring': 'Heavy rain', 'wx.rainToday': 'Rain today', 'wx.rainy': 'Rainy', 'wx.sunny': 'Clear',
  'wx.temperature': 'Temperature', 'wx.wind': 'Wind', 'wx.windy': 'Windy', 'wx.detailLine': '{label} · {temp} outside',
  'wx.humidityDetailLine': '{label} · {humidity} humidity',
  'wx.feelsLike': 'Feels like', 'wx.dewPoint': 'Dew point',

  'energy.summaryLine': '{status} · {pct} self-consumption'
};

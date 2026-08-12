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

  // dynamic strings, referenced via this.t('key', vars)
  'alarm.armedAway': 'Armed · away', 'alarm.armedHome': 'Armed · home', 'alarm.armedNight': 'Armed · night',
  'alarm.armedVacation': 'Armed · vacation', 'alarm.arming': 'Arming…',
  'alarm.btnAway': 'Away', 'alarm.btnHome': 'Home', 'alarm.btnNight': 'Night', 'alarm.btnVacation': 'Vacation',
  'alarm.disarmed': 'Disarmed', 'alarm.pending': 'Pending…', 'alarm.triggered': 'ALARM TRIGGERED',

  'cameras.motionDetected': 'Motion detected · {name}', 'cameras.allQuiet': 'All quiet',
  'cameras.tabSub': '{n} cameras · previews refresh every {seconds} seconds',

  'chart.hide': 'Hide trend', 'chart.show': 'Show trend', 'chart.show48h': 'Show 48h trend',

  'common.off': 'off', 'common.on': 'on', 'common.unreachable': 'unreachable',

  'cover.closed': 'closed', 'cover.fullyOpen': 'fully open', 'cover.openAt': 'open at {pct}%',

  'energy.avgPerDay': 'Average produced per day', 'energy.consumptionNow': 'House consumption now',
  'energy.days': '{n} days', 'energy.fromGridShort': 'from grid', 'energy.gridCost': 'Cost of grid import',
  'energy.gridImportNow': 'Grid import now', 'energy.inverterProducing': 'inverter producing',
  'energy.inverterStandby': 'inverter on standby', 'energy.periodNote': 'produced over the last {n} days · {grid} kWh taken from the grid',
  'energy.producedPeriod': 'Produced this period', 'energy.producedShort': 'produced', 'energy.productionNow': 'Production now',
  'energy.takenFromGrid': 'Taken from grid', 'energy.selfConsumption': '{pct} self-consumption',
  'energy.selfConsumptionShort': 'self-consumption',
  'energy.gridNote': '{grid} from grid · {exportVal} kW exporting · {status}',

  'greeting.afternoon': 'Good afternoon', 'greeting.evening': 'Good evening', 'greeting.morning': 'Good morning', 'greeting.night': 'Night',

  'irrigation.defaultSummary': '{n} zones monitored', 'irrigation.deficitShort': 'deficit', 'irrigation.effectiveRain': 'Effective rain',
  'irrigation.et0Today': 'ET₀ today', 'irrigation.etcShort': 'ETc', 'irrigation.etcToday': 'ETc today',
  'irrigation.minutes': '{n} min', 'irrigation.needsWaterMatch': 'water', 'irrigation.recommendedMin': 'recommended {n} min',
  'irrigation.soilOf': '{zone} soil', 'irrigation.lastRun': 'Last watered · {when}',

  'light.brightnessSuffix': 'brightness',

  'media.playing': 'playing',

  'people.away': 'away', 'people.home': 'home',

  'quick.all': 'all', 'quick.alreadyOff': 'already off', 'quick.coversDown': 'Covers down',
  'quick.coversUp': 'Covers up', 'quick.lightsOff': 'Turn off all lights', 'quick.onCount': '{n} on',
  'quick.openFraction': '{open}/{total} open',

  'room.coverPct': 'cover {pct}%', 'room.coversClosed': 'covers closed', 'room.coversOpenCount': '{open}/{total} covers open',
  'room.lightsOff': 'lights off', 'room.lightsOnCount': '{n} lights on', 'room.nothingActive': 'nothing active',
  'room.switchRunning': '{name} running', 'room.tvOn': 'TV on', 'room.vacuumRunning': 'vacuum cleaning',

  'rooms.overflow': '+{n} rooms',

  'status.connected': 'Connected', 'status.connecting': 'Connecting…', 'status.error': 'Not connected',

  'switch.off': 'off', 'switch.running': 'running',

  'tab.casa': 'Home', 'tab.cameras': 'Surveillance', 'tab.energy': 'Energy', 'tab.irrigation': 'Irrigation', 'tab.vehicle': 'Vehicle', 'tab.weather': 'Weather',

  'vacuum.cleaning': 'cleaning', 'vacuum.name': 'Vacuum', 'vacuum.returning': 'returning to base',

  'vehicle.check': 'check', 'vehicle.meta': 'Range {range} · {odometer} total', 'vehicle.ok': 'ok',
  'vehicle.rangeLine': 'Range {range}',

  'wx.airHumidity': 'Air humidity', 'wx.cloudy': 'Cloudy', 'wx.irradiance': 'Irradiance',
  'wx.outdoorHumidity': 'Outdoor humidity', 'wx.outdoorTemp': 'Outdoor temperature', 'wx.partlyCloudy': 'Partly cloudy',
  'wx.pouring': 'Heavy rain', 'wx.rainToday': 'Rain today', 'wx.rainy': 'Rainy', 'wx.sunny': 'Clear',
  'wx.temperature': 'Temperature', 'wx.wind': 'Wind', 'wx.windy': 'Windy', 'wx.detailLine': '{label} · {temp} outside',
  'wx.humidityDetailLine': '{label} · {humidity} humidity',

  'energy.summaryLine': '{status} · {pct} self-consumption'
};

window.CasaStrings = window.CasaStrings || {}; window.CasaStrings.it = {
  // static labels, referenced in markup as {{ S.xxx }}
  alarm: 'Allarme', allOff: 'Tutto spento. Niente da vedere qui.', appliances: 'Elettrodomestici',
  closeCoversTitle: 'Chiudi le tapparelle', covers: 'Tapparelle', dayNight: 'Giorno / notte',
  deficitAccumulated: 'Deficit accumulato', demoBadge: 'DEMO',
  demoTooltip: 'Demo — dati inventati, nessuna installazione reale collegata',
  details: 'Dettagli', down: 'Giù', environment: 'Ambiente', fromGrid: 'Dalla rete',
  goToIrrigation: "Vai all'irrigazione", kwhToday: 'kWh prodotti oggi', kwhTodayShort: 'kWh oggi', lighting: 'Illuminazione',
  lightsTitle: 'Luci', mmPerWeek: 'mm settimana', multimedia: 'Multimedia', onNow: 'cose accese adesso',
  open: 'Apri', openCoversTitle: 'Apri le tapparelle', other: 'Altro', otherRooms: 'Altre stanze',
  produced: 'Prodotti', production: 'Produzione', productionAndGrid: 'Produzione e prelievo',
  quickActions: 'Azioni rapide', resetWeek: 'Reset settimana', rooms: 'Stanze', soil: 'suolo',
  soilMoisture48h: 'Umidità suolo · 48h', solar: 'Fotovoltaico', stop: 'Stop', switches: 'Interruttori',
  turnOff: 'Spegni', turnOn: 'Accendi', up: 'Su', warnings: 'Avvisi', weatherStation: 'Stazione meteo',
  houseMode: 'Modalità casa', whoIsHome: 'Chi è in casa', lightsOffShort: 'Spegni luci', allOffShort: 'Tutto spento.',
  coversDown: 'Tapparelle giù', coversUp: 'Tapparelle su', now: 'Adesso', producedToday: 'Prodotti oggi',
  consumption: 'Consumo casa', controls: 'Controlli',
  surveillance: 'Sorveglianza', motion: 'Movimento', live: 'Live', camAutoClose: 'Chiusura automatica tra',
  noAreasTitle: 'Nessuna area trovata', noAreasCta: 'Vai alle Aree',
  noAreasBody: "Questa dashboard si costruisce dalle aree di Home Assistant: assegna le tue entità a un'area per vedere le stanze qui.",
  fromGridHint: 'Energia prelevata dalla rete oggi — non è il consumo totale della casa',

  // dynamic strings, referenced via this.t('key', vars)
  'alarm.armedAway': 'Inserito · fuori', 'alarm.armedHome': 'Inserito · in casa', 'alarm.armedNight': 'Inserito · notte',
  'alarm.armedVacation': 'Inserito · vacanza', 'alarm.arming': 'In inserimento…',
  'alarm.btnAway': 'Fuori', 'alarm.btnHome': 'In casa', 'alarm.btnNight': 'Notte', 'alarm.btnVacation': 'Vacanza',
  'alarm.disarmed': 'Disinserito', 'alarm.pending': 'In attesa…', 'alarm.triggered': 'ALLARME IN CORSO',

  'appliance.energyToday': '{val} oggi',

  'cameras.motionDetected': 'Movimento rilevato · {name}', 'cameras.allQuiet': 'Tutto tranquillo',
  'cameras.tabSub': '{n} telecamere · anteprime aggiornate ogni {seconds} secondi',

  'chart.hide': 'Nascondi andamento', 'chart.show': 'Vedi andamento', 'chart.show48h': 'Vedi andamento 48h',

  'common.off': 'spenta', 'common.on': 'accesa', 'common.unreachable': 'non raggiungibile',

  'cover.closed': 'chiusa', 'cover.fullyOpen': 'tutta aperta', 'cover.openAt': 'aperta al {pct}%',

  'energy.avgPerDay': 'Media prodotta al giorno', 'energy.consumptionNow': 'Consumo casa adesso',
  'energy.days': '{n} giorni', 'energy.fromGridShort': 'dalla rete', 'energy.gridCost': 'Costo del prelievo',
  'energy.gridImportNow': 'Prelievo dalla rete', 'energy.inverterProducing': 'inverter in produzione',
  'energy.inverterStandby': 'inverter in standby', 'energy.periodNote': 'prodotti negli ultimi {n} giorni · {grid} kWh presi dalla rete',
  'energy.producedPeriod': 'Prodotti nel periodo', 'energy.producedShort': 'prodotti', 'energy.productionNow': 'Produzione adesso',
  'energy.takenFromGrid': 'Prelevati dalla rete', 'energy.selfConsumption': '{pct} di autoconsumo',
  'energy.selfConsumptionShort': 'autoconsumo',
  'energy.gridNote': '{grid} dalla rete · {exportVal} kW in immissione · {status}',
  'energy.selfConsumptionLabel': 'Autoconsumo', 'energy.feedIn': 'Immissione', 'energy.kwhConsumed': 'kWh consumati',
  'energy.selfShort': 'autocons.', 'energy.gridShort': 'dalla rete', 'energy.feedShort': 'immessi',
  'energy.compactSummary': 'kWh oggi · {pct} di autoconsumo',
  'energy.noHistory': 'Nessun dato storico per questo periodo',

  'greeting.afternoon': 'Buon pomeriggio', 'greeting.evening': 'Buonasera', 'greeting.morning': 'Buongiorno', 'greeting.night': 'Notte',

  'irrigation.defaultSummary': '{n} zone monitorate', 'irrigation.deficitShort': 'deficit', 'irrigation.effectiveRain': 'Pioggia efficace',
  'irrigation.et0Today': 'ET₀ oggi', 'irrigation.etcShort': 'ETc', 'irrigation.etcToday': 'ETc oggi',
  'irrigation.minutes': '{n} min', 'irrigation.needsWaterMatch': 'irrigare', 'irrigation.recommendedMin': 'consigliati {n} min',
  'irrigation.soilOf': 'Suolo {zone}', 'irrigation.lastRun': 'Ultima irrigazione · {when}',

  'light.brightnessSuffix': 'luminosità',

  'media.playing': 'in riproduzione',

  'people.away': 'fuori', 'people.home': 'in casa',

  'quick.all': 'tutte', 'quick.alreadyOff': 'già spente', 'quick.coversDown': 'Tapparelle giù',
  'quick.coversUp': 'Tapparelle su', 'quick.lightsOff': 'Spegni tutte le luci', 'quick.onCount': '{n} accese',
  'quick.openFraction': '{open}/{total} aperte',

  'room.coverPct': 'tapparella {pct}%', 'room.coversClosed': 'tapparelle chiuse', 'room.coversOpenCount': '{open}/{total} tapparelle aperte',
  'room.lightsOff': 'luci spente', 'room.lightsOnCount': '{n} luci accese', 'room.nothingActive': 'niente di attivo',
  'room.switchRunning': '{name} in corso', 'room.tvOn': 'TV accesa', 'room.vacuumRunning': 'aspirapolvere in pulizia',

  'rooms.overflow': '+{n} stanze',

  'status.connected': 'Collegato', 'status.connecting': 'Connessione…', 'status.error': 'Non collegato',

  'switch.off': 'spenta', 'switch.running': 'in funzione',

  'tab.casa': 'Casa', 'tab.cameras': 'Sorveglianza', 'tab.energy': 'Energia', 'tab.irrigation': 'Irrigazione', 'tab.vehicle': 'Auto', 'tab.weather': 'Meteo',

  'vacuum.cleaning': 'in pulizia', 'vacuum.name': 'Aspirapolvere', 'vacuum.returning': 'in rientro',

  'vehicle.check': 'da controllare', 'vehicle.meta': 'Autonomia {range} · {odometer} totali', 'vehicle.ok': 'ok',
  'vehicle.rangeLine': 'Autonomia {range}',

  'wx.airHumidity': 'Umidità aria', 'wx.cloudy': 'Nuvoloso', 'wx.irradiance': 'Irraggiamento',
  'wx.outdoorHumidity': 'Umidità esterna', 'wx.outdoorTemp': 'Temperatura esterna', 'wx.partlyCloudy': 'Poco nuvoloso',
  'wx.pouring': 'Pioggia forte', 'wx.rainToday': 'Pioggia oggi', 'wx.rainy': 'Pioggia', 'wx.sunny': 'Sereno',
  'wx.temperature': 'Temperatura', 'wx.wind': 'Vento', 'wx.windy': 'Ventoso', 'wx.detailLine': '{label} · {temp} fuori',
  'wx.humidityDetailLine': '{label} · umidità {humidity}',
  'wx.feelsLike': 'Percepita', 'wx.dewPoint': 'Punto di rugiada',

  'energy.summaryLine': '{status} · autoconsumo {pct}'
};

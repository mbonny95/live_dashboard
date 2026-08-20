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

  // settings panel (v1.5.0), static labels
  settings: 'Impostazioni', settingsBack: 'Indietro', settingsCameras: 'Telecamere', settingsSections: 'Sezioni',
  settingsExport: 'Esporta come config.js', settingsReset: 'Ripristina', settingsSavedHass: 'Salvate sul tuo utente di Home Assistant',
  settingsSavedLocal: 'Salvate solo su questo dispositivo', settingsSectionsNote: 'Una sezione senza sensori configurati resta comunque nascosta.',
  settingsHideUntilTap: 'Icona finché non la tocchi', settingsDiffFromConfig: 'diverso dal config',
  settingsLongPressHide: 'Nascondi questa', settingsExportCopied: 'Copiato negli appunti',
  settingsExportSelect: 'Seleziona e copia il testo qui sotto', settingsExportOffer: 'Azzero gli override ora che sono nel file?',
  settingsExportKeep: 'Mantieni', settingsExportClear: 'Azzera',

  // settings panel tabs + power unit (v1.5.3), static labels — tab labels
  // reuse rooms/settingsCameras/diagTitle rather than adding parallel keys
  settingsPowerUnitLabel: 'Unità potenza istantanea', settingsPowerUnitAuto: 'Auto',
  settingsPowerUnitW: 'W', settingsPowerUnitKw: 'kW',
  settingsPowerUnitDailyNote: 'I totali giornalieri restano in kWh.',

  // diagnostics panel (v1.5.1), static labels
  diagTitle: 'Diagnostica', diagConfigHeading: 'Config',
  diagConfigOutsideIframe: 'La pagina non gira dentro il pannello di Home Assistant: i percorsi /local/ non vengono nemmeno tentati, quindi la tua config.js non può essere vista da qui.',
  diagConfigNotFound: 'Nessuna config trovata.',
  diagConfigNotExecutedMsg: 'live_dashboard_config.js trovato ma non eseguito. Errore di sintassi nel file (parentesi o virgola mancante), oppure manca "window.CASA_CONFIG =" all’inizio. La dashboard sta girando con la sola auto-discovery.',
  diagConfigVerdictMissing: 'assente (404)', diagConfigVerdictOk: 'trovata', diagConfigVerdictNotExecuted: 'trovata ma non eseguita',
  diagEnergyInstantHeading: 'Energia — valori istantanei',
  diagRoleProduction: 'production', diagRoleConsumption: 'consumption', diagRoleGridImport: 'gridImport', diagRoleGridExport: 'gridExport',
  diagRoleBatteryPower: 'battery.power', diagRoleBatterySoc: 'battery.soc', diagRoleInverterStatus: 'inverterStatus',
  diagVerdictOk: 'ok', diagVerdictUnconfigured: 'non configurato', diagVerdictMissing: 'entità inesistente', diagVerdictUnavailable: 'non disponibile',
  diagUnitMismatch: 'Questa entità è in kWh (device_class energy): qui serve un sensore di potenza (W/kW), probabile ruolo sbagliato.',
  diagNotConfiguredLabel: '(non configurato)',
  diagEnergyDailyHeading: 'Energia — totali giornalieri',
  diagSourceConfig: 'da config.js', diagSourceHaPrefs: 'dalla dashboard Energia di Home Assistant',
  diagSourceAuto: 'indovinata dal nome del sensore', diagSourceNone: 'nessuna fonte trovata',
  diagPrefsFailedMsg: 'energy/get_prefs è fallito: qui sotto arriva solo quello che l’auto-discovery per nome sensore riesce a indovinare.',
  diagCounterWarn: 'Questo sensore è un totale di vita (state_class total_increasing) senza last_reset: non si azzera a mezzanotte, quindi crescerà sempre.',
  diagEnvVersion: 'Versione', diagEnvVersionDev: 'sviluppo/demo (nessun ?v=)',
  diagEnvBackend: 'Backend', diagEnvBackendPanel: 'pannello', diagEnvBackendDemo: 'demo',
  diagEnvIframe: 'Dentro il pannello HA', diagEnvIframeYes: 'sì', diagEnvIframeNo: 'no',
  diagEnvLang: 'Lingua rilevata', diagEnvAreas: 'Aree viste da discovery', diagEnvEntities: 'Entità viste da discovery',
  diagEnvRooms: 'Stanze risultanti', diagEnvCameras: 'Telecamere risultanti', diagEnvPrefsOutcome: 'Esito energy/get_prefs',
  diagEnvPrefsOk: 'ok', diagEnvPrefsFailed: 'fallito', diagEnvPrefsUnknown: 'non tentato',
  diagCopyButton: 'Copia diagnostica', diagCopyPrivacyNote: 'Contiene i nomi delle tue entità e stanze, nessuna password.',

  // dynamic strings, referenced via this.t('key', vars)
  'alarm.armedAway': 'Inserito · fuori', 'alarm.armedHome': 'Inserito · in casa', 'alarm.armedNight': 'Inserito · notte',
  'alarm.armedVacation': 'Inserito · vacanza', 'alarm.arming': 'In inserimento…',
  'alarm.btnAway': 'Fuori', 'alarm.btnHome': 'In casa', 'alarm.btnNight': 'Notte', 'alarm.btnVacation': 'Vacanza',
  'alarm.disarmed': 'Disinserito', 'alarm.pending': 'In attesa…', 'alarm.triggered': 'ALLARME IN CORSO',

  'appliance.energyToday': '{val} oggi',

  'cameras.motionDetected': 'Movimento rilevato · {name}', 'cameras.allQuiet': 'Tutto tranquillo',
  'cameras.tabSub': '{n} telecamere · anteprime aggiornate ogni {seconds} secondi',
  'cameras.moreCount': '+{n} altre',

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
  'energy.gridNote': '{grid} dalla rete · {exportVal} in immissione · {status}',
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

  'lock.locked': 'bloccata', 'lock.unlocked': 'sbloccata',
  'lock.lockAction': 'Blocca', 'lock.unlockAction': 'Sblocca',

  'media.playing': 'in riproduzione',

  'people.away': 'fuori', 'people.home': 'in casa',

  // room card pills, keyed by binary_sensor device_class (see B2/discovery.js)
  'pill.door': 'aperta', 'pill.window': 'aperta', 'pill.opening': 'aperta', 'pill.garage_door': 'aperto',
  'pill.motion': 'movimento', 'pill.occupancy': 'presenza', 'pill.presence': 'presenza',
  'pill.moisture': 'allagamento', 'pill.smoke': 'fumo', 'pill.gas': 'gas',

  'quick.all': 'tutte', 'quick.alreadyOff': 'già spente', 'quick.coversDown': 'Tapparelle giù',
  'quick.coversUp': 'Tapparelle su', 'quick.lightsOff': 'Spegni tutte le luci', 'quick.onCount': '{n} accese',
  'quick.openFraction': '{open}/{total} aperte',

  'room.coverPct': 'tapparella {pct}%', 'room.coversClosed': 'tapparelle chiuse', 'room.coversOpenCount': '{open}/{total} tapparelle aperte',
  'room.lightsOff': 'luci spente', 'room.lightsOnCount': '{n} luci accese', 'room.nothingActive': 'niente di attivo',
  'room.switchRunning': '{name} in corso', 'room.tvOn': 'TV accesa', 'room.vacuumRunning': 'aspirapolvere in pulizia',

  'rooms.overflow': '+{n} stanze',

  'settings.entityCount': '{n} entità · {m} nascoste', 'settings.reasonDomain': 'dominio {domain}',
  'settings.reasonDeviceClass': 'device_class {dc}',

  'diag.configResolved': 'Config caricata da {path}.',

  'siren.sounding': 'in suono',

  'status.connected': 'Collegato', 'status.connecting': 'Connessione…', 'status.error': 'Non collegato',

  'switch.off': 'spenta', 'switch.running': 'in funzione',

  'valve.open': 'aperta', 'valve.closed': 'chiusa',
  'valve.openAction': 'Apri', 'valve.closeAction': 'Chiudi',

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

<!-- title: Live Dashboard -->
![Live Dashboard](assets/readme-header.png)

# Live Dashboard

[![Ultima release](https://img.shields.io/github/v/tag/mbonny95/live_dashboard?sort=semver&label=release&color=c67139)](https://github.com/mbonny95/live_dashboard/releases)
[![Licenza: MIT](https://img.shields.io/badge/licenza-MIT-c67139)](LICENSE)
[![Home Assistant](https://img.shields.io/badge/Home%20Assistant-2022.x%2B-c67139)](#requisiti)

*[Read in English](README.md)*

Una dashboard per Home Assistant scritta a mano, a pagina singola, pensata
per un tablet a muro: stanze, allarme, meteo e azioni rapide in un'unica
schermata, con le view opzionali Energia e Irrigazione. Nessuna card
Lovelace, nessuna dashboard YAML — legge le stanze e le entità direttamente
dai registri di Home Assistant e si costruisce da sola.

![Vista Casa, modalità demo](docs/screenshots/casa.png)

**Provala senza installare nulla:** clona questo repo e apri
`public/dash_neumo.html?demo` in un browser — funziona anche da `file://`,
senza bisogno di Home Assistant. Mostra dati inventati e un badge `DEMO`;
vedi [Modalità demo](#modalità-demo) più sotto.

## Cos'è, e cosa non è

- Una pagina singola che vive in un proprio pannello `panel_custom`, non una
  dashboard Lovelace e non una card. Non cerca di essere nessuna delle due.
- Pensata per un **tablet a muro, in orizzontale**, a una dimensione fissa
  di circa 1200×800 senza scroll nella view Casa — è un vincolo voluto (vedi
  "Modalità kiosk" più sotto), non un difetto.
- La pagina mobile (`dash_neumo_mobile.html`) è un secondo layout completo
  per telefono, ma è secondario: le scelte di design (densità della griglia,
  niente scroll) sono pensate prima di tutto per il tablet a muro.

## Requisiti

- Home Assistant con accesso a `www/` (per copiare i file in `config/www/`)
  e un `configuration.yaml` modificabile per l'integrazione `panel_custom`.
- Nessuna versione minima imposta, ma le chiamate ai registri area/device/
  entity usate qui (`config/area_registry/list` ecc.) sono standard da Home
  Assistant 2022.x in poi; qualunque versione ragionevolmente recente va bene.
- Niente npm, niente build step. Solo HTML/CSS/JS semplice, caricato come
  moduli ES direttamente da `config/www/`.

## Installazione

Ci sono due modi per installarla: via HACS (consigliato — ricevi notifiche
di aggiornamento e un update con un click ogni volta che esce una nuova
versione), oppure copiando i file a mano. In entrambi i casi la dashboard
che gira è la stessa; l'unica differenza reale è `module_url` e dove vivono
i file del plugin, cosa che conta se mai passi dall'uno all'altro.

### Via HACS (consigliato)

1. In HACS aggiungi questo repo come repository personalizzato: **menu ⋮ →
   Custom repositories**, URL `https://github.com/mbonny95/live_dashboard`,
   categoria **Dashboard**.
2. Trova "Live Dashboard" in HACS e clicca **Download**. HACS la installa in
   `config/www/community/live_dashboard/` — quel percorso esatto, non un
   nome a tua scelta (è la convenzione di HACS per la categoria Dashboard,
   ed è ciò che `name:`/`module_url:` qui sotto danno per scontato).
3. Aggiungi a `configuration.yaml`:

   ```yaml
   panel_custom:
     - name: live_dashboard-panel
       url_path: casa
       sidebar_title: Casa
       sidebar_icon: mdi:home-heart
       module_url: /local/community/live_dashboard/panel.js?v=1.3.0
       embed_iframe: true
       trust_external_script: false
   ```

   `name:` deve essere esattamente `live_dashboard-panel` — l'elemento del
   pannello si registra sotto `<cartella>-panel`, derivato dalla cartella in
   cui gira, e per un'installazione HACS quella cartella è sempre
   `live_dashboard`. Se non corrisponde, il pannello resta uno schermo
   vuoto/nero senza nulla in console.

   Quel `?v=1.3.0` su `module_url` conta più di quanto sembri: `/local/`
   viene servito con cache lunga, e i browser cachano i moduli ES in modo
   particolarmente aggressivo, quindi un hard refresh da solo non forza
   sempre un nuovo fetch di `panel.js` dopo un aggiornamento. Allinealo alla
   versione appena installata (mostrata in HACS, e loggata in console
   all'avvio come `[live_dashboard] vX.Y.Z`) e incrementalo di nuovo al
   prossimo aggiornamento.
4. **Riavvia Home Assistant** — le voci `panel_custom` si registrano
   all'avvio, non si ricaricano a caldo, quindi modificare
   `configuration.yaml` da solo non ha effetto finché non riavvii. Poi apri
   la nuova voce nella sidebar.

**Importante — leggi prima del primo aggiornamento:**

- HACS aggiorna i *file* del plugin, mai `configuration.yaml`. Il blocco
  `panel_custom` sopra si scrive una volta sola e non va più toccato per gli
  aggiornamenti di routine.
- La tua config va in **`config/www/live_dashboard_config.js`** — un
  livello sopra `config/www/community/live_dashboard/`, non dentro. Quella
  cartella interna viene interamente sovrascritta a ogni aggiornamento HACS,
  quindi un file di config lasciato lì viene cancellato al prossimo update;
  `config/www/` invece non viene mai toccata da HACS. Vedi "Configurare il
  resto" più sotto.

### Installazione manuale

1. Copia l'intera cartella `public/` in `config/www/casa/` (il nome è
   arbitrario — `casa` è solo l'esempio usato qui sotto; è anche così che
   puoi tenere una seconda copia in parallelo, es. `casa2/`, senza toccare
   un'installazione `casa/` già funzionante).
2. Aggiungi a `configuration.yaml`. **`name:` deve essere `<cartella>-panel`**,
   corrispondente alla cartella scelta sopra:

   ```yaml
   panel_custom:
     - name: casa-panel
       url_path: casa
       sidebar_title: Casa
       sidebar_icon: mdi:home-heart
       module_url: /local/casa/panel.js?v=1
       embed_iframe: true
       trust_external_script: false
   ```

   Stessa nota sul cache-busting di sopra: incrementa `?v=1` → `?v=2` → …
   a mano ogni volta che aggiorni i file in questa cartella, dato che qui
   non c'è una versione HACS da cui leggerlo.
3. **Riavvia Home Assistant**, poi apri la nuova voce nella sidebar.

**Stai passando da un'installazione manuale a HACS?** `module_url` e
`name:` sopra sono diversi tra i due casi — aggiorna entrambe le righe, non
solo una, altrimenti il pannello continua a caricare la copia vecchia (o
niente del tutto).

Fatto — senza nessun file di config, la dashboard scopre da sola le tue aree
e ne mostra fino a 8 come tessere stanza, più le eventuali entità `person.*`
e la prima `weather.*` che trova. Allarme, selettore di modalità casa,
Energia, Irrigazione e Auto restano nascosti finché non li attivi (vedi
sotto) — non c'è modo di indovinare l'accoppiata giusta per uno script
"modalità casa", né quale, tra più pannelli allarme, sia "quello giusto":
per questo restano spenti di default invece di tentare a caso.

### Configurare il resto

Copia [`live_dashboard_config.js`](public/live_dashboard_config.js) e
scommenta quello che ti serve — ogni chiave è documentata in linea nel
file. Viene cercato in quest'ordine, vince il primo trovato:

1. `config/www/live_dashboard_config.js` — **consigliato per ogni
   installazione, HACS o manuale.** Fuori da qualsiasi cartella gestita da
   HACS, quindi gli aggiornamenti non lo toccano mai.
2. `config/www/community/live_dashboard/config.js` — retrocompatibilità con
   un layout HACS precedente; per nuove installazioni preferisci il
   percorso 1.
3. `config.js` accanto a `panel.js`, dentro la cartella in cui hai copiato
   `public/` (solo installazioni manuali) — retrocompatibilità con
   installazioni manuali esistenti; funziona ancora invariato, ma un
   aggiornamento HACS lo cancellerebbe se usato lì, quindi non usare questo
   percorso una volta passati a HACS.

Qualunque percorso tu usi, tienilo fuori dal controllo di versione — contiene
i tuoi entity ID (il `.gitignore` fornito esclude già `config.js` sotto
`public/`; una copia sotto `config/www/` è comunque fuori da questo repo).

## Attivare l'Energia

Il blocco `energy` di `config.js` chiede i sensori per **ruolo**, non per
marca, quindi funziona con qualunque integrazione li esponga.
`productionToday` / `gridToday` devono essere contatori giornalieri che si
azzerano a mezzanotte — vedi TROUBLESHOOTING.md se i grafici sembrano sbagliati.

| Ruolo | Huawei FusionSolar | SolarEdge | Fronius | Shelly EM | Energy Dashboard di HA |
| --- | --- | --- | --- | --- | --- |
| `production` | `sensor.*_panel_production_power` | `sensor.solaredge_current_power` | `sensor.inverter_power` | `sensor.shellyem_channel_a_power` | `sensor.solar_power` (tuo) |
| `consumption` | `sensor.*_house_load_power` | — (serve un utility meter) | — | `sensor.shellyem_channel_b_power` | `sensor.house_power` |
| `gridImport` | `sensor.*_grid_consumption_power` | `sensor.solaredge_m1_ac_power` (lato prelievo) | `sensor.meter_power` | `sensor.shellyem_channel_b_power` | il tuo sensore di prelievo |
| `gridExport` | `sensor.*_grid_injection_power` | stesso contatore, lato immissione | `sensor.meter_power` (negativo) | lo stesso, invertito | il tuo sensore di immissione |
| `productionToday` | `sensor.*_panel_production_today` | `sensor.solaredge_lifetime_energy` (diff) | `sensor.energy_day` | Shelly EM non ha un contatore giornaliero — aggiungi un helper `utility_meter` | `sensor.solar_energy_today` |
| `gridToday` | `sensor.*_grid_consumption_today` | via un helper `utility_meter` | `sensor.grid_energy_day` | via un helper `utility_meter` | `sensor.grid_import_today` |
| `battery` | `sensor.*_battery_soc` / `_power` | integrazione SolarEdge Battery | sensori batteria Fronius | — | — |
| `inverterStatus` | `sensor.*_inverter_inverter_status` | `sensor.solaredge_status` | `sensor.status_code` | — | — |

Se la tua integrazione non espone un contatore giornaliero per un ruolo,
aggiungi un helper
[`utility_meter`](https://www.home-assistant.io/integrations/utility_meter/)
in Home Assistant che si azzeri ogni giorno e punta `config.js` su quello.

**L'anello Fotovoltaico e la sua seconda riga confrontano `productionToday`
con `gridToday` — produzione contro energia *prelevata dalla rete*, non
consumo totale della casa.** Se vieni da una dashboard scritta a mano che
confrontava la produzione con un contatore "consumo casa oggi", aspettati
qui un numero più piccolo e diverso: il prelievo dalla rete è solo la parte
di consumo che la rete ha coperto, non tutto quello che la casa ha usato.
Lo schema chiede solo questi due ruoli perché sono gli unici contatori
giornalieri garantiti su tutte le integrazioni — un contatore "consumo casa
oggi" non è universale come lo è per FusionSolar. Se la tua integrazione ne
espone uno e vuoi quell'abbinamento, in questa release non c'è un campo di
config per farlo — apri una issue o adatta direttamente la sezione energia
in `dash_neumo*.html`.

## Attivare l'Irrigazione

Ogni zona è già utile con solo `moisture` (un `sensor.*` con stato in `%`) e
un modo di far scorrere l'acqua: sparkline, stato valvola e pulsanti a
durata. Due modi per collegare questa seconda parte, scegli quello che
combacia con il tuo impianto:

- `valve` — uno `switch.*` che questa dashboard apre da sola, chiamando
  `switch.turn_on` e poi `switch.turn_off` dopo N minuti. Nessuna entità
  helper aggiuntiva richiesta.
- `buttons` — un `input_button.*` per ogni durata, per impianti dove uno
  script/un'automazione possiede già la temporizzazione (es. un'automazione
  quick-action per ogni durata) e non c'è uno switch da comandare
  direttamente. Ha la precedenza su `valve` se sono impostati entrambi.

Tutto il resto (`advisory`, `deficit`, `weekMm`, `lastRun`, `et0`, `etc`,
`effectiveRain`, `summary`) è opzionale e compare solo se lo imposti.
**La parte agronomica (ET₀/ETc, deficit accumulato) non fa parte di questo
progetto**: dipende dalla tua stazione meteo e dai tuoi dati di suolo. Le
automazioni che la calcolano nell'installazione originale da cui è nata
questa dashboard sono una configurazione personale e non sono incluse qui;
costruisci le tue (qualunque automazione che scriva il risultato in un
`input_number`/`sensor` e lo punti da `config.js` funziona), oppure lascia
questi campi non impostati e usa la dashboard solo per l'umidità in tempo
reale e l'irrigazione manuale.

## Stazione meteo (opzionale)

Il widget meteo cliccabile (in alto in Casa, o una tab a sé su mobile)
mostra temperatura/umidità esterna dall'entità `weather:` sopra, per
impostazione predefinita. Se hai una stazione meteo locale,
`config.weatherStation` fa in modo che i suoi sensori diventino la fonte
preferita — di solito più precisa e più locale della stima "condizioni
attuali" di un provider meteo — e aggiunge vento, pioggia, irraggiamento,
ET₀, percepita e punto di rugiada, dati che un'entità `weather.*` in
genere non espone in modo affidabile.

Se hai già compilato `irrigation.weather` (sopra), temperatura, umidità,
vento, pioggia, irraggiamento ed ET₀ vengono riusati automaticamente: qui
serve aggiungere solo `feelsLike`/`dewPoint`, che non hanno altrove una
casa. Del tutto opzionale: lascialo non impostato e l'entità `weather:`
resta l'unica fonte, come prima.

## Auto (opzionale)

Non esiste un dominio Home Assistant che standardizzi la telematica
veicolare, quindi `config.vehicle` è una mappatura esplicita campo per campo
(carburante o batteria, autonomia, contachilometri, celle extra,
binary_sensor di avviso). È stata usata con un'installazione Mercedes
`mbapi2020`; dovrebbe funzionare con qualunque integrazione esponga sensori
comparabili (Volvo, Kia Connect, BMW Connected Drive, lettori OBD-II
generici), dato che qui non c'è nulla di specifico per una marca.

## Elettrodomestici (opzionale)

Lavatrice, asciugatrice, o qualunque cosa dove "è in funzione" conta più di
un semplice acceso/spento. Nemmeno qui c'è un dominio standard, quindi
`config.appliances` è un elenco esplicito, ogni voce abbinata a una stanza
risolvendo l'area della sua entità `status` (stessa regola di tutto il
resto — nessun campo stanza separato da compilare).

- `status` — qualunque `sensor.*`/`binary_sensor.*`. Il suo stato grezzo
  viene mostrato così com'è a meno che tu non lo mappi con `stateLabels`
  (consigliato per un sensore a stato testuale come `sensor.lavatrice_stato`,
  il cui vocabolario è interamente specifico dell'integrazione — un
  `binary_sensor` con `on`/`off` si legge bene anche senza).
- `idleStates` — quali stati contano come "non in funzione" (default
  `off`/`power_off`/`idle`/`unavailable`/`unknown`). Sovrascrivilo se la tua
  integrazione usa parole diverse per "fermo".
- `remaining` (minuti) ed `energyToday` sono entrambi opzionali e compaiono
  solo nello stato per cui hanno senso — il tempo rimanente mentre è in
  funzione, l'energia mentre è fermo.
- `powerSwitch` è opzionale e aggiunge solo un pulsante di spegnimento — uno
  switch "acceso" non viene trattato come "in funzione" (una lavatrice può
  restare alimentata tra un ciclo e l'altro), quindi non decide mai cosa
  viene mostrato. Se lo imposti, quello switch smette anche di comparire
  come interruttore generico nella sua stanza, altrimenti si vedrebbe due
  volte.

Gli elettrodomestici in funzione compaiono anche in "cose accese adesso" in
Casa e nel riepilogo della stanza, come una luce o un robot in pulizia.

## Telecamere (opzionale)

Auto-discovery completo da ogni entità `camera.*` che Home Assistant
espone — area dal registry, movimento da un `binary_sensor` con
`device_class: motion` sullo stesso device. `config.cameras` sovrascrive
solo le eccezioni (vedi `live_dashboard_config.js`); non c'è nessun elenco di
telecamere da mantenere a mano.

- **Anteprime, non video.** Ogni tessera mostra uno snapshot da
  `entity_picture` (l'URL che Home Assistant firma già da solo), ricaricato
  ogni `snapshotInterval` secondi (10 di default). Il refresh si sospende
  quando la scheda/pagina non è visibile.
- **Live al tap.** Toccare un'anteprima apre uno stream MJPEG a schermo
  intero (lo stesso URL firmato, con `/api/camera_proxy/` sostituito da
  `/api/camera_proxy_stream/`) — niente `hls.js`, niente WebRTC, niente
  build step. Si chiude da sola dopo 2 minuti, o al tap.
- **Privacy per le telecamere interne**: elenca un entity_id in
  `hideUntilTap` e la sua tessera mostra solo un'icona — nessuna anteprima
  caricata — finché qualcuno non la tocca una volta per vedere lo snapshot,
  e una seconda per andare live. Pensata per una telecamera puntata su un
  corridoio dove vive lo stesso tablet.
- La tab "Sorveglianza" compare solo da **due telecamere in su** — con una
  sola, la card in Casa e il suo overlay a schermo intero al tap sono già
  tutta la funzione: una tab con una tessera sola non aggiungerebbe nulla.
  Oltre `gridTab` telecamere (6 di default) la griglia della tab passa da 2
  a 3 colonne.
- Funziona solo su `panel_custom` (vedi "Cos'è, e cosa non è" sopra): gli
  URL di snapshot/stream sono firmati da HA e same-origin col pannello, che
  è esattamente ciò che un'eventuale variante standalone/token dovrebbe
  gestire diversamente.

## Modalità kiosk per il tablet a muro

Punta [Fully Kiosk Browser](https://www.fully-kiosk.com/) (o un altro
browser kiosk) su `https://<tuo-ha>/casa`. Per nascondere sidebar e header
di Home Assistant sopra al pannello, usa
[kiosk-mode](https://github.com/NemesisRE/kiosk-mode) da HACS, oppure le
impostazioni immersive/zoom di Fully Kiosk. Risoluzione di riferimento
1280×800 orizzontale — sotto quella larghezza o altezza la view Casa passa a
un layout scorrevole (voluto — vedi TROUBLESHOOTING.md).

## Modalità demo

Apri la pagina con `?demo` in coda all'URL (oppure aprila direttamente fuori
da `panel_custom` — da `file://` la dashboard non ha nessun host con cui
parlare e passa da sola allo stesso backend demo dopo un breve timeout).
Mostra tutte le view — Casa, Sorveglianza, Irrigazione, Energia, Auto — con
dati inventati e un badge `DEMO` visibile, e non chiama mai un servizio
reale. Le telecamere demo mostrano solo l'icona segnaposto (non c'è un feed
vero da inventare), compresa una impostata `hideUntilTap` per far vedere
anche quel comportamento.

## Limiti noti

- **Il risultato vale quanto le tue aree assegnate.** Ogni stanza,
  dispositivo e telecamera su questa dashboard viene dai registri di
  Home Assistant (aree/dispositivi/entità) — non c'è nessuna logica di
  raggruppamento o denominazione alternativa oltre a quella. Se la tua
  installazione ha le aree assegnate con coerenza, la dashboard ha già
  senso al primo avvio, senza scrivere una riga di config. Se non hai mai
  assegnato le aree — tutto resta sotto "nessuna area", come capita spesso
  a un'installazione appena fatta — la dashboard sembrerà quasi vuota, e
  non è un bug da segnalare: è `Impostazioni -> Aree` di Home Assistant che
  aspetta di essere compilato, cosa che questa dashboard non può indovinare
  al posto tuo.
- Pensata prima di tutto per un tablet a muro in orizzontale; la pagina
  mobile è completa ma secondaria, non l'obiettivo primario del design.
- Non sostituisce Lovelace: nessun selettore di card, nessun layout
  drag-and-drop, nessuna dashboard YAML. È una pagina che riflette i tuoi
  registri.
- `panel_custom` è l'unico metodo di installazione supportato in questa
  release — vedi CHANGELOG.md.

## Altro

- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) — pannello bianco, stanze vuote,
  grafici sbagliati, allarme senza pulsanti. (In inglese.)
- [CHANGELOG.md](CHANGELOG.md)
- [live_dashboard_config.js](public/live_dashboard_config.js) — ogni opzione, documentata
  in linea.

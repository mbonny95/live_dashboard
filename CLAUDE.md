# Istruzioni di progetto — Dashboard domotica

## Metodo

- **Le modifiche di presentazione si verificano guardando il risultato, non
  rileggendo il codice.** Screenshot o misura nel DOM prima di dire che è fatto.
  Vale per legende, barre, anelli, tipografia, spaziature: il codice può essere
  corretto e il pixel sbagliato (o invisibile).
- Quando un elemento non compare, sospetta prima il markup che la logica.

## Vincoli del templating (trovati sul campo, non ovvi)

1. **`style=` letterale.** I nomi delle proprietà CSS sono letti dal testo
   letterale dell'attributo a compile time. `style="{{ barWidth }};border-radius:6px"`
   con `barWidth = "width:13px"` compila a uno style **vuoto**, senza errori:
   l'elemento sparisce. Forma obbligatoria: `proprietà:{{ valore }}`, una
   proprietà per hole.
2. **`src` / `href` / `points` dinamici.** Il parser HTML del browser li carica
   prima che il JS giri: vanno impostati da un ref callback dopo il mount, non
   con un hole.
3. **`window.CASA_CONFIG`.** `import()` è bloccato sotto `file://` (la demo mode
   gira così), quindi la config utente è un global, non un modulo.
4. **Tag di `panel_custom` derivato dalla cartella** (`<cartella>-panel`, sotto
   HACS sempre `live_dashboard-panel`). Sbagliarlo dava schermo nero silenzioso.
5. **Schema energia di Home Assistant piatto** per la sorgente `grid`:
   `stat_energy_from` al top level, non annidato in `flow_from[]`.
6. **Mai la stessa espressione in due `sc-if` con `hint-placeholder-val`
   opposti.** Due `sc-if value="{{ x }}"` affiancati, uno per lo stato vuoto e
   uno per le righe, con placeholder `true` / `false`, rendevano **entrambi** i
   rami nel DOM vivo, non solo al primo paint (v1.8.1, Ultime azioni). Il ramo
   negato va esposto con un nome suo da `renderVals()` (`noDiagActionRows`),
   non con la stessa stringa ripetuta.

## Dove va il codice (v2)

- **La logica sta in `public/casa-core.js`, una volta sola.** Desktop
  (`dash_neumo.html`) e mobile (`dash_neumo_mobile.html`) dichiarano
  `class Component extends window.CasaCore.base(DCLogic)` e contengono solo
  il proprio layout: template, `state` iniziale, `renderVals()`, e (mobile)
  `chartOn` / `toggleChart` / `roomDetail`. Un metodo nuovo o una correzione
  va in `casa-core.js`; un test fallisce se una pagina ridefinisce un metodo
  della base.
- **Blocchi comuni di `renderVals()` = metodi `vm*()`** in `casa-core.js`
  (`vmSettingsDiag`, `vmAlarm`, `vmCameraDetail`, `vmEnergyRing`,
  `vmHourlyStrip`, `vmEnergyEmpty`, `vmLiveConsumption`): ricevono i valori
  che `renderVals()` ha già calcolato e restituiscono gli stessi nomi che i
  template usano. Ciò che resta in `renderVals()` è assemblaggio del layout.
- **`casa-core.js` si carica in `<head>` prima di `support.js`** (il runtime
  valuta la classe del componente subito dopo React), con lo stesso `?v=`
  della pagina. Script classico, non modulo ES, per il vincolo 3.
- **`support.js` non si modifica**: è generato da un `dc-runtime/` che non è
  nel repo; un test ne fissa l'hash.
- **Refactor senza cambi visibili si verificano col confronto "golden"**:
  l'output di `renderVals()` prima/dopo su tutti gli scenari demo, i due
  layout e gli stati dell'interfaccia (impostazioni, stanza, telecamera, PIN).
  Deve risultare identico.

## Densità prima del "sta tutto in una schermata"

Il vincolo storico «la view Casa sta in 1280×800 senza scroll» **è stato
ritirato** (v1.4.9). Con 12 stanze e 4 telecamere lo scroll interno delle
colonne è normale e accettato. La regola che lo sostituisce: mai comprimere
tipografia, bersagli tattili o spaziature per far entrare più roba nella prima
schermata — si scorre. Minimi non negoziabili: 44 px sui bersagli, 10 px sul
testo.

## Colori dei ruoli energia (non negoziabili)

Famiglia salvia = sole, terracotta = rete. Autoconsumo `--sage`, prelievo
`--acc`, immissione `--feed` (salvia schiarita). Anello e barre devono usare la
stessa grammatica: se una vista si discosta, è un bug.

## All'inizio di ogni sessione

Orientati prima di scrivere, non ricostruire a memoria dove sta una cosa:

- `graphify-out/wiki/index.md` se c'è — è la versione pensata per essere
  navigata leggendo file, un articolo per area del repo. Genera con
  `/graphify . --wiki`.
- altrimenti `graphify-out/GRAPH_REPORT.md` (nodi centrali, connessioni,
  domande che il grafo sa già rispondere).
- per una domanda puntuale, `/graphify query "…"` invece di aprire mezzo repo.
- poi la voce più recente del `CHANGELOG.md`, per sapere cosa è cambiato
  nell'ultima release.

La mappa può essere indietro rispetto al codice (vedi sotto): il report dice
da quale commit è stata costruita (`Built from commit`). Per ciò che è
cambiato dopo, fa fede il codice.

## Graphify: solo su richiesta

**Non si rigenera a ogni commit.** La ricostruzione semantica costa molto
(un agente per ogni file di documenti cambiato, ~100k token l'uno) e su una
serie di commit ravvicinati è lavoro buttato. Si rigenera **solo quando
l'utente lo chiede** (`/graphify . --wiki`), di norma prima di una release o
dopo un blocco di lavoro grosso, e in quel caso `graphify-out/` va in un
commit suo. Un commit di codice non tocca `graphify-out/`.

Quando si rigenera: **`public/casa-core.js` va dato all'estrazione semantica**
come i documenti, non lasciato all'AST. La classe è definita dentro una
funzione (`CasaCore.base(DCLogic)`) e l'AST ne vede solo le funzioni di primo
livello: senza agente gli ~90 metodi spariscono dalla mappa.

**Il numero di nodi non è un segnale di regressione.** L'estrazione è semantica
e distribuita: quanti nodi escono dipende da come è stata spezzata quella corsa
(492 → 571 → 615 → 513 su quattro release consecutive, tutte in crescita di
codice). Non confrontare i totali fra due rigenerazioni e non usarli come
baseline. **Verifica la copertura per simboli**: grep su `graphify-out/` dei nomi
introdotti dalla release (funzioni, metodi del bridge, campi nuovi). Se ci sono
tutti, il grafo copre il codice; se ne manca uno, quello indica il chunk
incompleto.

**Niente hook post-commit in questo repo.** Il
hook di graphify fa un rebuild solo-AST *dopo* il commit e sovrascrive il grafo
semantico con uno più povero (visto sul campo: 254 nodi al posto di 298). Se lo
trovi installato, disinstallalo.

## Release

Config utente in `config/www/live_dashboard_config.js`, **fuori** dalla cartella
gestita da HACS, così gli update non la sovrascrivono. `VERSION` unica in
`public/panel.js` per il cache-busting. Tag con prefisso `v`.

**Un tag non è una release.** Ogni volta che crei un tag, nello stesso passaggio:

1. `git push origin <tag>` — un tag locale non esiste per nessun altro.
2. Crea la **release su GitHub** su quel tag (`gh release create v1.5.1 --title … --notes …`), con le note prese dalla voce corrispondente del `CHANGELOG.md`.

HACS mostra agli utenti le *release*, non i tag: un tag pushato senza release
non arriva a nessuno, e la dashboard di chi ha già installato non propone
l'aggiornamento. Se il workflow di release allega `live_dashboard.zip`,
verifica che l'asset ci sia davvero prima di considerare fatta la pubblicazione.

## Diagnostica

La maggior parte degli utenti sta su companion app o tablet a muro: **per loro
`console.log` non esiste**. Ogni messaggio diagnostico pensato per l'utente
finale deve avere una controparte visibile in dashboard (sezione Diagnostica
del pannello impostazioni). La console resta, ma è per noi, non per loro.

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

## Prima di ogni commit

Rigenera **graphify** e includi `graphify-out/` nello stesso commit delle
modifiche al codice. Non è un artefatto di build da ignorare: è la mappa del
repo che si legge per orientarsi, e se resta indietro descrive una versione che
non esiste più. Un commit che tocca `public/` e lascia `graphify-out/` vecchia
va rifatto.

**Niente hook post-commit in questo repo.** Rigenera a mano prima del commit. Il
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

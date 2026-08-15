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

## Colori dei ruoli energia (non negoziabili)

Famiglia salvia = sole, terracotta = rete. Autoconsumo `--sage`, prelievo
`--acc`, immissione `--feed` (salvia schiarita). Anello e barre devono usare la
stessa grammatica: se una vista si discosta, è un bug.

## Prima di ogni commit

Rigenera **graphify** e includi `graphify-out/` nello stesso commit delle
modifiche al codice. Non è un artefatto di build da ignorare: è la mappa del
repo che si legge per orientarsi, e se resta indietro descrive una versione che
non esiste più. Un commit che tocca `public/` e lascia `graphify-out/` vecchia
va rifatto.

## Release

Config utente in `config/www/live_dashboard_config.js`, **fuori** dalla cartella
gestita da HACS, così gli update non la sovrascrivono. `VERSION` unica in
`public/panel.js` per il cache-busting. Tag con prefisso `v`.

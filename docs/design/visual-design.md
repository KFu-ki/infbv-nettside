# Visuelt design og grensesnittprinsipp

## Observerte designval

Denne fila skildrar eksisterande implementasjon, ikkje ei vedteken designmanual. Nye komponentar bør følgje mønstra, men endring av visuell retning krev gjennomgang.

### INFBV-forside

- Mørk marine bakgrunn (`slate-950/900`) med varme gylne/amber aksentar for bachelortrinn.
- Indigo/lilla aksent for mastertrinn 4–5.
- Serif/georgia vert brukt i merkevare og overskrifter; sans-serif for brødtekst; monospaced småetikettar for emnekodar.
- Femtrinns kompetansetrapp er primær navigasjon; innhaldskort koplar emne til 14 ferdigheiter.
- Tailwind CDN og inline Tailwind-theme-konfigurasjon er brukt i `index.html`; `styles.css` gjer fokusmarkering og mobiltrapp.
- Ein brytar i toppfeltet byter mellom mørkt og lyst tema. Valet vert lagra lokalt i nettlesaren; mørkt tema er standard, og temavalet gjeld berre framsida.
- Lyst tema brukar varm offwhite bakgrunn, lyse kort, lyse emneetikettar og mørkare amber-, indigo- og grøn aksenttekst. Representativ kontrastmåling for vanleg tekst gav minst 6,08:1; dette er ikkje ei full WCAG-samsvarsvurdering.
- Fokusmarkeringa har ein mørk, tydeleg kontur i lyst tema. Temabrytaren og trinnvala eksponerar tilstand med ARIA; trinn, meny og hurtignavigasjon kan styrast med tastatur.
- Kompetansetrappa er lågare på store skjermar, og trinnnummer står synleg i mobilvising. Merkevarelinja vert visuelt gøymd på svært smale skjermar, men blir verande for hjelpemiddel.

### Budsjett

- Lys standardflate med sidebar, KPI-kort, tydeleg tabellhierarki og fargekode for fem program.
- Scenario-knappar ligg i topplinja; rapporthandlingar for utskrift/PDF og Excel.
- CSS-variablar styrer tema; `localStorage` held berre lys/mørk modus.
- Diagram/tabellar er genererte frå frontendstate; nye visningar må vere samstemd med eksisterande datagrunnlag og einingar.

### Timeplan

- Lys, tabellbasert vising med emnefilter, fritekstsøk, dato/klokkeslett, rom, tilsett og detaljmerknader.
- Forslagsmodus er synleg merka; lokale redigeringar vert aldri framstilte som godkjende/live.
- Mobil bruk har sidevegs rulling og mobilhint; utskrift har eiga handling.

## Tilgjenge og responsivitet

- Bruk synleg tastaturfokus (`:focus-visible` på rotflata) og semantiske `button`, `label`, `table`, `nav`, `main`.
- Oppretthald kontrast mellom statusfargar og tekst; farge skal ikkje vere einaste forklaring.
- Test keyboard, mobil viewport, zoom, skjermlesarlabel og `prefers-reduced-motion`.
- Bevar tekst i DOM når berre visuell tekst vert skjult på mobil.
- Kontroller `aria-label`, `aria-pressed` og fokus for dynamisk genererte kontrollar.

## Bilete, tredjepart og utskrift

- AMF har lokalt `budsjett/assets/amf-brand.jpg`.
- Tailwind CSS lastast frå CDN; root-UI kan miste stil dersom eksterne ressursar ikkje er tilgjengelege.
- Timeplan lenkjer til eksterne TimeEdit-/SharePoint-adresser. Kontroller at dei framleis er gyldige før endring.
- Utskrift/PDF vert handtert av nettlesaren via print-oppsett/`window.print()`; dette er ikkje den nye utviklingsmanual-PDF-generatoren.

## Visuell endring

Endre helst ein komponent om gongen. Kontroller minst stor/smal skjerm, tastatur og data med lange norske tekstar. Ta skjermbilete eller beskriv manuell visuell kontroll; ikkje påstå browser-test utan at han er køyrd. Oppdater denne fila når gjennomgåtte mønster endrar seg.

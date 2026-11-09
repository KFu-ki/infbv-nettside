# Frontend og brukarflater

## Felles teknikk

Sidene er vanleg HTML/CSS/JavaScript, utan bundlar, npm-manifest eller TypeScript. Ingen frontend-byggsteg er naudsynt. Root-sida lastar Tailwind frå `https://cdn.tailwindcss.com`; dette er ein ekstern runtime-avhengnad. Budsjett og timeplan brukar eigne CSS-filer og defer-lasta JS.

## INFBV-forside

- `index.html` definerer sidelenkjer, femtrinns trapp, emne/ferdigheitsområde og hjelparar/tilgjengeleg struktur.
- `app.js` inneheld `STAGES`, `COURSE_CONTENT` og `SKILLS`. `DOMContentLoaded` viser første trinn, ferdigheitsgrid og event-lyttarar.
- `selectStep()` oppdaterer aktivt trinn; `renderStepDetails()` viser emne og kopla ferdigheiter; `openCourse()` viser emneinnhald; `showHome()` går tilbake til framsida.
- `styles.css` legg til fokusstil, valt trinn, mobilframstilling og lyst tema; hovudfargane i mørkt tema kjem òg frå inline Tailwind-konfigurasjon i HTML. Temabrytaren i `index.html` brukar `localStorage` og endrar berre framsida. Trinnvala er tastaturstyrte rolleknappar med oppgitt valt tilstand.
- Ferdigheits-/emnedata er statiske JS-konstanter. Endringar må haldast internt konsistente; det finst ikkje eit separat CMS eller API. Emnekodar, gjeldande nynorske visingsnamn og tomme omsetjingsfelt er registrerte i `INFBV-studiemodell/`; `app.js` er framleis den køyrande kjelda for nettsida.

## AMF-budsjett

- `budsjett/index.html` er semantisk struktur for meny, KPI-kort, ressursar, løyvingsoversikt, analysepanel, diagram og eksportknappar.
- `budsjett/app.js` hentar `budsjett/data.json`, held scenario-/redigeringstilstand i minnet og byggjer tabellar, SVG/HTML og eksportinnhald.
- `budsjett/styles.css` utformar kort, tabellar, diagram, lys/mørk modus og mobiloppsett.
- `assets/amf-brand.jpg` er lokal logo/bilde.
- Brukarendringar er scenario-/førehandsvising i nettlesaren; dei skriv ikkje `data.json` tilbake.

## Timeplan 2027

- `timeplan2027/index.html` definerer søk, emnefilter, radredigering, merknader, forslagsskjema, utskrift og eksport.
- `timeplan2027/app.js` hentar `timeplanside/timeplan-2027.json`, søkjer/sorterer, lagrar lokale `description`/`staff`-kladdar i `localStorage`, og opnar GitHub issue-kast for innsending.
- Lokal kladd er per nettlesar/profil og er ekki sameiginleg eða live-gagnagrunnur.
- `timeplan2027/styles.css` styrir tabell, mobilrulling og utskriftsvising.
- Forslagslenkje er hardkoda til `KFu-ki/infbv-nettside`; endring av repo krev samtidig endring i JS og issue-mal.

## Sikker dynamisk HTML og tilgjenge

Timeplanen brukar `escapeHtml()` før feltdata vert sette inn i HTML. Budsjett har `esc()` for verdiar i fleire malar, men kvar ny dynamisk mal må gjennomgåast. Bruk semantisk HTML, `aria-label`/`aria-pressed` og fokusstil ved utviding. Ikkje bygg HTML frå ubearbeidde kjeldeverdiar.

## Frontendvalidering

- Opne kvar av dei tre sidene ved statisk hosting eller FastAPI.
- Kontroller desktop og smal viewport, keyboard-fokus, tomme/ugyldige data og konsollfeil.
- Verifiser scenario-/filter-/kladdoppførsel og eksportfallback når API er utilgjengeleg.
- Det finst ikkje no ein browser-test- eller byggrunner; manuell kontroll må rapporterast som manuell.

# Komponentar og kodekart

Dette er eit lesekart, ikkje eit separat rammeverk. Koden er autoritativ dersom teksten vert utdatert.

## Rotnivå

| Fil | Språk/teknologi | Ansvar |
|---|---|---|
| `index.html` | HTML + Tailwind CDN | Strukturen til INFBV-forsida |
| `app.js` | JavaScript | Kompetansetrinn, emne, ferdigheiter og navigasjon |
| `styles.css` | CSS | Små visuelle tilpassingar og responsiv trapp på mobil |
| `app.py` | Python/FastAPI | API-ruter, XLSX-ruter og servering av hovudsida |
| `xlsx_export.py` | Python standardbibliotek | Byggjer XLSX-zip/XML frå JSON-liknande payloads |
| `requirements.txt` | pip | FastAPI og Uvicorn |
| `version.txt` | tekst | Versjonsstempel som hovudsida kan hente |

## Frontendmapper

| Mappe | Innhald |
|---|---|
| `budsjett/` | `index.html`, `styles.css`, `app.js`, offentleg `data.json` og merkevarebilete. Budsjettens datalasting, modellberekningar, scenario, diagram og eksport ligg i `app.js`. |
| `timeplan2027/` | Statisk vising, filtrering, nettlesarkladdar, GitHub-forslag og XLSX/CSV-eksport. |
| `timeplanside/` | JSON som timeplanen les, og eksisterande/genererte XLSX-filer. Det er ikkje same mappe som frontend. |

## Skript og hovudfunksjonar

- `scripts/update_budsjett_data.py`: lastar eksternt lokal Python-modul frå sti, set arbeidsbokstiar, kallar `read_dashboard_data()` og skriv JSON atomisk.
- `scripts/import_timeplan.py`: les XLSX-XML, validerer TimeEdit-overskrifter, normaliserer rader, bevarer supplerande oppføringar og lagar tidsstempla Excel.
- `scripts/export_timeplan.py`: lagar ny tidsstempla Excel frå godkjend JSON utan ny kjeldeimport.
- `scripts/check_documentation.py`: sjekkar obligatoriske dokument, relative Markdown-lenkjer og kjende tracked credential-filnamn.
- `scripts/build_manual.py`: samlar Markdown til ein søkbar manual og katalog og lagar PDF med innebygd PDF-skrivar i Python-standardbiblioteket.
- `scripts/knowledge_lookup.py`: gir korte relevante dokumentutdrag utan å sende noko til ein ekstern teneste.

Sjå [skriptoversynet](../../scripts/README.md) for inndata, kommandoar og feilsituasjonar.

## Skilje mellom ansvar

- Presentasjon og nettlesarlogikk høyrer til dei tre nettsideflatene.
- Serverruter og filtilgang høyrer til `app.py`.
- Formatkonvertering til XLSX høyrer til `xlsx_export.py`.
- Lokale kjeldeimportar/eksportar høyrer til `scripts/`.
- Offentlege datautdrag er eksplisitte JSON-filer; kjeldearbeidsbøker og eksterne lesarmodular må hentast lokalt.
- Agentreglar bur i `AGENTS.md`; leverandørspesifikke filer peikar til denne autoritative kjelda.

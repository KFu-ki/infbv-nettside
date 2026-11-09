# Dataflyt frå kjelde til brukar

## Prinsipp

- Rå Excel-filer vert verande utanfor repoet og vert ikkje endra manuelt.
- Skripta lagar normaliserte/offentlege JSON-utdrag og/eller tidsstempla Excel-kopiar.
- Frontend les JSON-filer frå Git/deploy; den brukar ikkje kjeldearbeidsbøkene direkte.
- Godkjenning er manuell før endring av publiserte data. Eksport til OneDrive/SharePoint er lokal filkopiering til synka mappe, ikkje direkte Graph-opplasting.

## Budsjett

```text
Student-/AMF-kjeldearbeidsbøker (lokale, utanfor Git)
       + ekstern lokal dashboard-server.py / read_dashboard_data()
       |
       | python3 scripts/update_budsjett_data.py --dashboard-server ... \
       |   --students-workbook ... --amf-workbook ...
       v
budsjett/data.json (publisert, aggregert JSON-utdrag)
       |
       +--> budsjett/app.js (statisk GET /budsjett/data.json)
       +--> app.py GET /api/data (dersom FastAPI er aktiv)
       +--> XLSX-eksportpayload frå nettlesaren --> app.py --> xlsx_export.py
```

Scriptet importerer ein lokal Python-modul frå `--dashboard-server`, set `WORKBOOK` og `NOTE_WORKBOOK`, kallar `read_dashboard_data()`, og skriv `budsjett/data.json` via mellombels fil og atomisk `os.replace`. Dersom generering feilar før erstatting, eksisterande JSON vert ikkje bytt ut. Etterpå: kontroller `git diff`, proveniens, aggregering, personvern og synlege summer.

## Timeplan

```text
TimeEdit XLSX (lokal)
       |
       | scripts/import_timeplan.py: ark TimeEdit + overskrifter rad 6
       v
timeplanside/timeplan-2027.json (normaliserte rader + proveniens)
       |                 \
       |                  \ xlsx_export.py
       |                   v
       |            tidsstempla XLSX -> valfri lokal OneDrive-synka mappe
       v
timeplan2027/app.js (GET /timeplanside/timeplan-2027.json)
       |
       +--> nettlesarkladd i localStorage (berre description/staff)
       +--> preutfylt GitHub issue for manuell vurdering
                                  |
                                  v
                        administrator vurderer/oppdaterer JSON
                                  |
                                  +--> scripts/export_timeplan.py --> ny XLSX
                                  +--> Git push etter godkjenning --> hosting
```

Importen bruker XLSX-zip/XML i Python-standardbiblioteket. Den validerer at `TimeEdit`-arket har nødvendige felt i rad 6. Rad-ID vert `r<kjelderad>` og kjende emnekodar vert trekt ut frå kursnamnet. Skildring vert sett saman av ekstern kommentar og aktivitet. Supplerande JSON-rader med `supplemental: true` vert bevarte når dei ikkje kolliderer med importerte ID-ar.

## Generering av dokumentasjon

```text
Kjeldefiler (*.md)
    | scripts/build_manual.py
    +--> docs/manual/knowledge-catalog.md
    +--> docs/manual/development-manual.md
    +--> docs/manual/development-manual.pdf
    |
    +--> CI sjekkar --check og lastar opp PDF-artifakt
```

Genererte filer er avleidd output, ikkje kjelder. Oppdater forklaringa i kjelde-Markdown, køyr generatoren, og gjennomgå endringar. CI kan ikkje skrive tilbake til branch og publiserer ikkje produksjon.

## Feilkjelder og kontrollpunkt

- Manglande/endra Excel-arkoverskrifter stoppar import.
- Lokal lesarmodul eller kjeldearbeidsbøker kan vere utilgjengelege; dei er ikkje versjonerte.
- Ugyldig JSON må stoppe vidare arbeid; ikkje skriv blank/suksessliknande fallback.
- Ein gyldig JSON kan likevel vere forretningsmessig feil. Summeringsavvik og kjeldegrunnlag må visast, ikkje automatisk rettast.
- OneDrive-synk må fullførast og stadfestast separat.
- Preview/deploy og GitHub Pages/Vercel-konfigurasjon må kontrollerast i vertstenesta.

Sjå [kjeldefelt og avgrensingar](../data-sources/source-register.md) og [JSON-kontraktar](../data-sources/json-contracts.md).

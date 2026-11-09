# No-situasjon

**Sist kontrollert:** 2026-11-09
**Branch:** `main`
**Arbeidskopi før dokumentasjonsarbeidet:** rein. Backup vart laga før endringane; sjå [backup og gjenoppretting](../operations/backup-and-recovery.md).

## Kva som finst og fungerer

- Offentleg fagportal med HTML/CSS/JavaScript-framside, budsjettoversikt og Timeplan 2027.
- INFBV-framsida har ein tilgjengeleg lys/mørk-brytar med lokalt lagra val; mørkt tema er standard. Trinnval, navigasjonsmeny og hurtignavigasjon kan styrast med tastatur.
- `INFBV-studiemodell/` samlar emneoversikt og språkvariantar. `app.js` er framleis køyrande kjelde; registeret støttar manuell kontroll og seinare omsetjing.
- FastAPI-app i `app.py` tilbyr data- og Excel-endepunkt og serverer sidene.
- JSON-utdrag finst i `budsjett/data.json` og `timeplanside/timeplan-2027.json`; README seier dei vert brukte av statiske sider.
- Tre eksisterande dataskript handterer budsjettoppdatering, TimeEdit-import og timeplaneksport. Tre nye skript kontrollerer dokumentasjon, byggjer manual og gjer lokale kunnskapsoppslag.
- Python-avhengnader er FastAPI og Uvicorn. Frontend har ingen deklarert pakkebehandlar eller byggsteg.
- `origin` peikar på `https://github.com/KFu-ki/infbv-nettside.git`. Vercel-prosjektet `infbv-nettside` deployar frå `main` til `infbv-nettside.vercel.app`.
- To lokale GitHub Pages-workflowfiler er uversjonerte og ikkje inkluderte i denne deployen; eigarskap/vidare bruk er uavklart.
- Dokumentasjonen har no detaljert komponentkart, backend/API, frontend, datakontraktar og flytar, budsjettformlar frå kode, designsamandrag og stegvis manuell gjenoppbygging.
- KI-adapterar finst for Copilot, Claude, Gemini, Cursor, Windsurf, Cline, Roo Code, Continue og Amazon Q. Dei peikar til `AGENTS.md`.
- `scripts/knowledge_lookup.py` gjer avgrensa lokale oppslag. `scripts/build_manual.py` genererer katalog, samla Markdown og PDF utan tredjeparts Python-pakkar.

## Fungerer ikkje eller manglar

- Ingen automatiserte test-, lint- eller frontend-byggkommandoar er definerte.
- Ingen `package.json` eller `vercel.json` fanst ved kontrollen. Applikasjonskoden les ikkje miljøvariablar; `.env.example` dokumenterer dette.
- Repoet inneheld ikkje kjeldearbeidsbøkene for budsjett. Importen krev lokal lesarkode og arbeidsbøker.
- Vercel Preview-policy er ikkje kontrollert. Dei lokale Pages-workflowfilene er ikkje publiserte eller stadfesta som produksjonsveg.

## Uavklart

- Om dei lokale Pages-workflowfilene skal versjonerast/brukast; production er Vercel `main`.
- Vercel Preview-policy.
- Eigar, lisens, tilgangsnivå og godkjend personvernklassifisering for kjeldedata. Timeplandata inneheld tilsettnamn og er persondata.
- Om budsjettutdraget og kjeldearbeidsbøkene har godkjend publiserings-/lagringsgrunnlag.
- Forretningsreglane bak alle budsjettberekningar må stadfestast av dataeigar før endringar.
- Fullstendige historiske samtaletranskript eller generelt agent-/modellminne finst ikkje i repoet. Diskusjonsloggen er eit avgrensa samandrag, ikkje eit transkript.
- PDF-utforming og manuell gjenoppbygging av eksterne tenester/kontotilgang er ikkje verifiserte.

## Køyrde kontrollar og resultat

Ved dokumentasjonsoppstart var `git status --short` tom, og `git ls-files` viste 25 versjonskontrollerte filer. Lokal Python var 3.14.5. Ingen test-, lint- eller byggmanifest vart funne. FastAPI/Uvicorn vart ikkje funne i lokal pip-pakkeoversikt; backend-smoketest vart difor ikkje køyrd. GitHub Actions-kontrollane vart ikkje køyrde lokalt.

| Kommando/kontroll | Resultat |
|---|---|
| `git status --short` før endringar | Bestått: rein arbeidskopi |
| `git archive HEAD` til `_backup/2026-11-08_210007/` | Bestått: 25 filer kopierte |
| `python3 scripts/check_documentation.py` | Bestått: obligatoriske dokument, kjeldelenkjer, full docs-indeks, adapterreferansar og tracked credential-filnamn |
| `python3 -m compileall -q app.py xlsx_export.py scripts` | Bestått: Python-syntaks |
| `python3 -m json.tool budsjett/data.json` og `python3 -m json.tool timeplanside/timeplan-2027.json` | Bestått: begge JSON-filer parse |
| `python3 scripts/import_timeplan.py --help` | Bestått |
| `python3 scripts/export_timeplan.py --help` | Bestått |
| `python3 scripts/update_budsjett_data.py --help` | Bestått |
| `python3 scripts/knowledge_lookup.py "timeplan import"` | Bestått: viser rangerte kjeldetreff med linjenummer og avgrensa utdrag |
| `python3 scripts/build_manual.py` | Bestått: kodekart, katalog, manual og PDF generert |
| `python3 scripts/build_manual.py --check` | Bestått: alle fire genererte manualfiler er ferske |
| `python3 scripts/knowledge_lookup.py "timeplan import" --max-results 3 --max-chars 1200` | Bestått: kort lokalt oppslag med filbane og linjenummer |
| PDF-header/side- og filtypekontroll | Bestått: `file` identifiserer PDF 1.4, 47 sider |
| `git diff --check` og whitespace-sjekk av nye/endra filer | Bestått |
| YAML/JSON-konfigurasjon med Ruby Psych | Bestått: GitHub Actions-workflows og VS Code-utvidingsfil parse |
| App-test, automatiserte testar, lint og bygg | Ikkje køyrde: pakkar/testar/lint-/byggkommando manglar lokalt/i repoet |
| `node --check app.js` | Ikkje køyrd: Node.js er ikkje installert på arbeidsmiljøet |
| Lokal statisk nettlesarkontroll | Bestått: forsida lasta, temabrytaren rapporterte rett av/på-tilstand og lagra valet |
| `python3 scripts/check_documentation.py`, `git diff --check` og `python3 scripts/build_manual.py --check` | Bestått etter dokumentasjonsendringane |
| Revisjon av emnenamn frå `Revisjon nov 2026.pdf`, side 1 | Stadfesta: berre SAJ101-koden var utdatert (var SAL101); INF213 hadde ufullstendig visingsnamn; MEV221-namnet er halde på nynorsk |
| Produksjonsdeploy av lyst/mørkt tema og tilgjengeendring, commit `65ec0fb` | READY på Vercel; alias `infbv-nettside.vercel.app` stadfesta |
| Lokal nettlesarkontroll av tilgjenge | Bestått: temaet overlevde omlasting; trinn vart valde med mellomrom; meny opna/lukka med tastatur og Escape |
| `python3 scripts/build_manual.py` og `--check` etter studiemodellregisteret | Bestått; manual og kodekart oppdaterte |
| `python3 scripts/check_documentation.py`, `git diff --check` og `python3 scripts/build_manual.py --check` etter denne endringa | Bestått etter bygging av den endelege manualen |
| Representativ kontrastmåling av lyst tema | Bestått: lågaste målte tekstpar 6,08:1; målinga dekkjer ikkje alle tilstandar/komponentar og er ikkje full WCAG-revisjon |
| Publisering av studiemodellregister og emneendringar, commit `a8c7e95` | READY på Vercel; live-side stadfesta SAJ101 og det oppdaterte INF213-namnet |

Kontrollane seier ikkje noko om ekstern deploy, produksjonsdrift eller gyldigheita av eksterne kjeldedata.

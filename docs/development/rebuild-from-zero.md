# Bygg prosjektet opp att manuelt

Denne rettleiinga gjer det mogleg å byggje dei same prosjektområda stegvis. Ho er ikkje ein installasjonsgaranti for eksterne kontoar/data. Følg rekkjefølgja og test kvar del før neste.

## 0. Føresetnader

- Git og Python 3; lokalt kontrollert runtime i prosjektstatusen.
- Nettlesar for statiske sider.
- Excel-/TimeEdit-kjelder og ekstern dashboard-lesarmodul for dataimport, med godkjenning og lokal tilgang.
- Valfri OneDrive-synka mappe om XLSX skal flyttast til SharePoint.
- GitHub-/Vercel-kontotilgang er separat; ingen legitimasjon ligg i repoet.

## 1. Lag skjelett

```text
project/
  index.html app.js styles.css
  app.py xlsx_export.py requirements.txt
  budsjett/{index.html,app.js,styles.css,data.json,assets/}
  timeplan2027/{index.html,app.js,styles.css}
  timeplanside/{timeplan-2027.json}
  scripts/{import_timeplan.py,export_timeplan.py,update_budsjett_data.py}
  docs/ data/ .github/ .vscode/
```

Hald koden med HTML/CSS/JS og Python. Ikkje innfør frontend-bundlar eller ny database utan dokumentert behov og ADR.

## 2. Bygg statisk forsida

1. Lag `index.html` med `lang="nn"`, viewport, nav, main og mobiltilpassing.
2. Flyt fem `STAGES`, emne og ferdigheiter til `app.js`; event-handlarar rendrar val og detaljar.
3. Hald visuell CSS i `styles.css`; test keyboard focus og smal viewport.
4. Eksternt Tailwind-CDN er noverande val, ikkje føresetnad. Om du fjernar/erstattar det, migrer utility-klassar og valider utseendet.

## 3. Bygg budsjettflata

1. Opprett HTML-seksjonar for navigasjon, KPI, scenario, tabellar, diagram og eksport.
2. Definer stabil JSON-struktur etter [JSON-kontrakt](../data-sources/json-contracts.md).
3. Implementer formateringshjelparar og berekningar i reine/avgrensa JS-funksjonar.
4. Render data med trygg tekstescaping; ikkje set rå dataverdiar inn i HTML.
5. Legg til scenario, redigeringar i minnet, diagram og eksport etter stadfesta forretningsreglar.
6. Gjennomgå nullverdiar, totalsummar, einingar og dataeigarens arbeidsbok.

## 4. Bygg timeplanflata

1. Lag HTML for søk, emnefilter, timeplanrader og tydeleg forslagsskjema.
2. Hent `timeplanside/timeplan-2027.json`; valider `items`-liste og datoformat.
3. Lag søk/sortering/filter og trygt escaping av alt importert innhald.
4. Lag berre lokale kladdar i `localStorage`; lag GitHub-forslag som eksplisitt ventar på menneskeleg godkjenning.
5. Lag XLSX via backend eller CSV-reserve ved statisk hosting.

## 5. Bygg backend (valfri)

```bash
python3 -m pip install -r requirements.txt
uvicorn app:app --reload
```

Lag FastAPI-ruter for lesing av JSON og generering av XLSX i minnet. Backend les dei same JSON-filene. Ikkje legg til skrive-API, database eller autentisering utan krav, tilgangsmodell og tryggleiksvurdering.

## 6. Rekonstruer datapipeline

- Timeplan: følg `scripts/import_timeplan.py`, valider arknamn/headers, metadata/proveniens og bevaring av supplemental rows.
- Godkjend endring: oppdater JSON, gjennomgå diff, køyr `scripts/export_timeplan.py` og kontroller XLSX.
- Budsjett: skaff godkjende lokale kjeldefiler og ekstern `server.py`; køyr `scripts/update_budsjett_data.py` og kontroller JSON.
- Legg rådata utanfor Git; ikkje handrediger eller skriv tilbake til kjelda.

Sjå [dataflyt](../architecture/data-flows.md), [dataregister](../data-sources/source-register.md) og [skript](../../scripts/README.md).

## 7. Kontroller og publiser

1. Køyr `python3 scripts/check_documentation.py`.
2. Køyr `python3 -m compileall -q app.py xlsx_export.py scripts` og JSON-kontroll.
3. Med backend-avhengnader installerte: test API/XLSX; utfør ein nettlesar-smoketest av kvar flate.
4. Køyr `python3 scripts/build_manual.py` for oppdatert katalog, Markdown-manual og PDF.
5. Kontroller `git diff --check`, status, data/personvern og preview.
6. Commit/push/deploy skjer berre etter uttrykkjeleg godkjenning og stadfesta hostingpolicy.

## 8. Eksterne oppsett du må gjenskape manuelt

- GitHub repo/branch, Pages-innstillingar og endeleg éin deployworkflow (i dag er to overlappande workflows dokumenterte).
- Vercel project/root/runtime/branch/preview må stadfestast i tenesta; repoet inneheld ikkje `vercel.json`.
- OneDrive/SharePoint sync path må vere lokal og tilgjengeleg ved skriptkøyring.
- Kjeldefiltilgang, dataeigar, lisens og personvern kan ikkje utleiast av kode.

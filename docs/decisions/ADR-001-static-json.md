# ADR-001: Bruk statiske JSON-utdrag for offentlege data

- **Dato:** 2026-11-08 (dokumentert; opphavleg avgjerdsdato er ukjend)
- **Status:** Godkjend (eksisterande praksis)

## Kontekst

README og frontend viser at offentlege sider hentar data frå JSON-filer i repoet. FastAPI har tilsvarande leseruter og eksportendepunkt, medan statiske sider skal fungere utan backend.

## Avgjerda

Hald dei offentlege datautdraga som statiske JSON-filer som sidene kan lese. FastAPI kan tilby same data og XLSX-eksport når backend er tilgjengeleg. Råarbeidsbøker skal ikkje automatisk publiserast saman med utdraga.

## Vurderte alternativ

- Berre backend/API: ville gjere sidene avhengige av køyrande backend.
- Direkte publisering av arbeidsbøkene: ville eksponere kjeldefiler og er ikkje den dokumenterte praksisen.

## Konsekvensar

JSON-utdraga er offentleg tilgjengelege i repoet/hosting og må gjennomgåast før oppdatering. Dataeigar må stadfeste publiseringsgrunnlag og personvern. API-/frontend-endringar må halde statisk hosting i drift eller dokumentere ei ny avgjerd.

## Reversering

Krev ny ADR, plan for API-tilgjenge og migrering av frontend. Test statisk og backend-basert vising før publisering.

## Relaterte filer

- `README.md`
- `app.py`
- `budsjett/app.js`
- `budsjett/data.json`
- `timeplan2027/app.js`
- `timeplanside/timeplan-2027.json`
- `docs/data-sources/source-register.md`

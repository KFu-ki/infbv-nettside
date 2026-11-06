# INFBV fagportal

Nettsida kan publiserast frå dette GitHub-repoet med Vercel. INFBV-forsida ligg på `/`, AMF-dashbordet på `/budsjett/`, og Timeplan 2027 på `/timeplan2027/`.

## Lokal utvikling

Installer Python-avhengnadene og start appen:

```bash
python3 -m pip install -r requirements.txt
uvicorn app:app --reload
```

Opne `http://127.0.0.1:8000`.

## Vercel

Importer `KFu-ki/infbv-nettside` i Vercel, og la prosjektroten vere rota i repoet. Vercel finn FastAPI-appen frå `app.py` og `requirements.txt`. Appen serverer INFBV-forsida, budsjett- og timeplandashbordet, og data- og Excel-eksportendepunkta. Når repoet er kopla til, lagar Vercel automatisk deploy ved push og førehandsvisingar for pull requests.

## Offentlege budsjettdata

Det publiserte dashbordet brukar det avgrensa datautdraget i `budsjett/data.json`. Kjeldefilene i Excel og den lokale `.backups`-mappa ligg ikkje i repoet. Datautdraget og dashbordet er offentlege.

For å oppdatere datautdraget frå den lokale Excel-lesaren, køyr `scripts/update_budsjett_data.py` med stiar til lesaren og dei to kjeldearbeidsbøkene:

```bash
python3 scripts/update_budsjett_data.py \
  --dashboard-server "/path/to/Budsjett/dashbord/server.py" \
  --students-workbook "/path/to/Registrerte studenter tidsserie utvida.xls-3.xlsx" \
  --amf-workbook "/path/to/AMF_2027_arbeidsnotat_design_v2.xlsx"
```

Kontroller endringane i `budsjett/data.json` før du lagrar og sender dei til GitHub. Den publiserte sida brukar deretter det nye datautdraget.

## Timeplan 2027

Timeplanen er publisert som eit JSON-utdrag i `timeplanside/timeplan-2027.json`. Ho er offentleg lesbar. Skildring/Innhald, type og Tilsett kan redigerast som lokale utkast i nettlesaren; dei blir ikkje skrivne til live-data eller synlege for andre. «Foreslå ei endring» opnar eit førehandsutfylt GitHub-innspel. Repoet er offentleg, så innspela og kommentarane blir offentlege når dei blir sende inn; bidragsytaren må logge inn på GitHub. Ein administrator må vurdere og godkjenne endringa før ho blir lagd inn i datafila og deploya.

Kjelda er TimeEdit-arket `MEV131 - INF142 - KOM102 - INF213 - MMP311.xlsx`. Importskriptet lagrar normaliserte data og lagar ei ny tidsstempla Excel-arbeidsbok:

```bash
python3 scripts/import_timeplan.py \
  --source "/path/to/MEV131 - INF142 - KOM102 - INF213 - MMP311.xlsx" \
  --output-dir timeplanside \
  --sharepoint-folder "/path/to/2027/plan27/timeplanside"
```

`--sharepoint-folder` må peike på ei lokal mappe som OneDrive synkar. Skriptet kopierer kjeldearbeidsboka dit og legg den nye tidsstempla Excel-fila der. Dette er OneDrive-synk, ikkje direkte Microsoft Graph-opplasting frå Vercel. Etter at eit forslag er godkjent, må den oppdaterte JSON-fila og Excel-versjonen lagrast/synkast, kontrollerast, og endringane pushast til GitHub for å oppdatere den offentlege nettsida.

Når eit forslag er gjennomgått og `timeplanside/timeplan-2027.json` er oppdatert, lag ei ny arbeidsbokversjon utan å lese inn kjeldearket på nytt:

```bash
python3 scripts/export_timeplan.py \
  --data timeplanside/timeplan-2027.json \
  --output-dir timeplanside \
  --sharepoint-folder "/path/to/2027/plan27/timeplanside"
```

Endringane blir live først når den godkjende JSON-oppdateringa er pusha til GitHub og Vercel har fullført deployen. Den nye Excel-kopien blir skriven i OneDrive-synka mappe, slik at OneDrive synkar ho til SharePoint.

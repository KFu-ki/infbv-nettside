# INFBV fagportal

Nettsida kan publiserast frå dette GitHub-repoet med Vercel. INFBV-forsida ligg på `/`, og AMF-dashbordet ligg på `/budsjett/`.

## Lokal utvikling

Installer Python-avhengnadene og start appen:

```bash
python3 -m pip install -r requirements.txt
uvicorn app:app --reload
```

Opne `http://127.0.0.1:8000`.

## Vercel

Importer `KFu-ki/infbv-nettside` i Vercel, og la prosjektroten vere rota i repoet. Vercel finn FastAPI-appen frå `app.py` og `requirements.txt`. Appen serverer INFBV-forsida og dashbordet på `/budsjett/`, inkludert data- og Excel-eksportendepunkta. Når repoet er kopla til, lagar Vercel automatisk deploy ved push og førehandsvisingar for pull requests.

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

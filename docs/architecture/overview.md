# Arkitekturoversyn

## Teknologistakk og flater

- Frontend: HTML, CSS og JavaScript utan deklarert frontend-pakkebehandlar eller byggsteg.
- Backend: FastAPI frå `app.py`, køyrt lokalt med Uvicorn; avhengnader ligg i `requirements.txt`.
- Data: JSON-filer i repoet. `budsjett/data.json` og `timeplanside/timeplan-2027.json` kan hentast direkte av statiske sider.
- Excel: `xlsx_export.py` lagar XLSX-responsar når backend er tilgjengeleg. Statisk timeplan har òg nettlesarbasert CSV-fallback, slik README skildrar.

## Komponentkart

| Flate/komponent | Plassering | Rolle |
|---|---|---|
| INFBV-framside | `index.html`, `app.js`, `styles.css` | Hovudside |
| AMF-budsjett | `budsjett/` | Offentleg dashbord og JSON-utdrag |
| Timeplan 2027 | `timeplan2027/` | Offentleg vising; datafila er `timeplanside/timeplan-2027.json` |
| FastAPI | `app.py` | `/api/data`, `/api/timeplan` og XLSX-endepunkt; serverer òg statiske sider |
| Excel-funksjonar | `xlsx_export.py` | Lag XLSX for budsjett og timeplan |
| Import/eksport | `scripts/` | Lokal transformasjon av kjelder og generering av eksportar |

FastAPI har no leseendepunkt for data og POST-endepunkt for Excel-eksport. Det er ikkje dokumentert innlogging eller skriving av data til API-et. Timeplanutkast i nettlesaren vert lagra lokalt; godkjende endringar må førast inn i datafila manuelt.

## Publisering

`.github/workflows/static.yml` og `.github/workflows/deploy-pages.yml` utløyser begge GitHub Pages-deploy ved push til `main`. Dei lastar opp rota og bruker ulike versjonar/oppførsel; dette er ein observert duplisering, ikkje ei stadfesta avgjerd om kva som skal vere aktivt. Sjå [neste steg](../project/next-actions.md).

README omtalar Vercel, men repoet har ikkje `vercel.json` eller `package.json`. Vercel-kopling, prosjektinnstillingar og produksjonsbranch er ikkje verifiserte. Sjå [Vercel og publisering](../operations/vercel.md).

## Dataflyt og kjende avgrensingar

- Budsjett: lokale arbeidsbøker og ein ekstern, lokal Python-lesar → `scripts/update_budsjett_data.py` → offentleg `budsjett/data.json` → dashbord.
- Timeplan: TimeEdit-arbeidsbok → `scripts/import_timeplan.py` → normalisert JSON og XLSX. Skriptet bevarer supplerande JSON-oppføringar. Godkjende redigeringar kan eksporterast med `scripts/export_timeplan.py`.
- OneDrive/SharePoint-flyten brukar lokal synkronisering; skripta dokumenterer ikkje direkte Graph-opplasting.
- Ingen test-, lint- eller frontend-byggkommando er definert i repoet ved siste kontroll.
- Kode og README stadfestar at data vert levert statisk, men deployar og eksterne konto-/tilgangsinnstillingar må stadfestast i dei respektive tenestene.

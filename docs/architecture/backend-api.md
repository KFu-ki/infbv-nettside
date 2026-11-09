# Backend og API

## Køyremodell

`app.py` opprettar FastAPI-appen med tittelen `INFBV fagportal`. Lokal kommando frå repo-rota:

```bash
python3 -m pip install -r requirements.txt
uvicorn app:app --reload
```

Default utviklingsadresse er `http://127.0.0.1:8000`. `requirements.txt` avgrensar versjonsintervall for `fastapi` og `uvicorn`; Python-versjon er ikkje pinna. Vercel/serverless runtime er ikkje stadfesta i repoet.

## Ruter

| Metode og rute | Inndata | Utdata | Bruk |
|---|---|---|---|
| `GET /api/data` | Ingen | `budsjett/data.json` som JSON, `Cache-Control: no-store` | Backendvariant av dashboarddata |
| `POST /api/export.xlsx` | JSON med `overview`, `details`, `staffing`, `budget` | XLSX binærdata | Budsjetteksport |
| `GET /api/timeplan` | Ingen | `timeplanside/timeplan-2027.json` som JSON, `Cache-Control: no-store` | Backendvariant av timeplandata |
| `POST /api/timeplan/export.xlsx` | JSON med `items`-liste av radobjekt | XLSX binærdata | Timeplaneksport |
| `GET /` | Ingen | `index.html` | INFBV-forside |
| `GET /app.js`, `/styles.css`, `/version.txt` | Ingen | Statiske rotfiler | Forsideressursar |
| `GET /budsjett/...` | Ingen | FastAPI `StaticFiles` frå `budsjett/` | Budsjettflate og JSON |
| `GET /timeplan2027/...` | Ingen | FastAPI `StaticFiles` frå `timeplan2027/` | Timeplanflate |

API-eksportane handterer kjende `KeyError`, `TypeError` og `ValueError` som HTTP 400. Lesefeil på JSON vert HTTP 500. Ruter krev ikkje autentisering slik koden no står; dei skal ikkje gjerast til skrive-API utan ny tryggleiksvurdering/avgjerd.

## Data og reserveoppførsel

Frontendene hentar i praksis statiske filer (`/budsjett/data.json`, `/timeplanside/timeplan-2027.json`). Dette gjer at dei kan fungere på statisk hosting utan FastAPI:

- Budsjettet har CSV-reserve dersom XLSX-endepunktet feilar; feil vert vist i grensesnittet.
- Timeplanen fell tilbake til CSV ved manglande/ikkje støtta XLSX-endepunktstatus (404, 405, 501); andre feil vert viste.

Ein deployment kan difor vise nettsida og JSON utan at API-rutene er aktive. Ikkje påstå at Excel-endepunkta fungerer i produksjon før dei er testa der.

## Feilhandtering og endringsreglar

- Data-lesing brukar UTF-8 og synleg HTTP-feil ved I/O-/JSON-feil.
- Payloadar vert tekne frå klienten. Eksportfunksjonane forventar kjende felt; strengare skjemavalidering er ikkje implementert.
- Ikkje legg inn autentisering, skriving til kjelde-JSON, CORS eller nye API-flater utan krav og ADR.
- API-endringar skal validerast med testklient når FastAPI-avhengnader er installerte; skriv tester før endra eksportformat vert publisert.

## Autoritative kjelder

- [API-implementasjon](../../app.py)
- [XLSX-format](../../xlsx_export.py)
- [Avhengnader](../../requirements.txt)
- [Frontend og reserveoppførsel](frontend.md)

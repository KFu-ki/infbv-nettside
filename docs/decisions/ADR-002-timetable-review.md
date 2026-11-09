# ADR-002: Vurder timeplanforslag før offentleg publisering

- **Dato:** 2026-11-08 (dokumentert; opphavleg avgjerdsdato er ukjend)
- **Status:** Godkjend (eksisterande praksis)

## Kontekst

README seier at timeplanforslag vert sende inn via GitHub, må vurderast og godkjennast av administrator, og vert publiserte etter at datafila er oppdatert og pusha. Nettlesarutkast er lokale og vert ikkje skrivne til live-data.

## Avgjerda

Ikkje publiser eit forslag som godkjend timeplanendring før ein administrator har vurdert det og oppdatert den offentlege datakjelda.

## Vurderte alternativ

- Automatisk publisering av innsendte forslag: ikkje dokumentert og ville fjerne den eksplisitte vurderinga.
- Lokal kladd utan GitHub-innsending: finst som nettlesarutkast, men deler ikkje endringa med andre.

## Konsekvensar

GitHub-innspel i det offentlege repoet kan vere offentlege. Den som behandlar eit forslag må kontrollere innhald og personopplysningar før samanslåing/publisering. XLSX-/OneDrive-eksport er ein separat manuell operasjon.

## Reversering

Krev ny godkjend ADR, gjennomgang av tilgangar, personvern og automatisk publiseringsrisiko før godkjenningssteget vert endra.

## Relaterte filer

- `README.md`
- `.github/ISSUE_TEMPLATE/timeplan-forslag.md`
- `timeplan2027/app.js`
- `scripts/import_timeplan.py`
- `scripts/export_timeplan.py`
- `timeplanside/timeplan-2027.json`

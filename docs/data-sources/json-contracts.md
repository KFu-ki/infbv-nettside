# JSON-kontraktar

Dette dokumentet viser felt og ansvar basert på filer i repoet. Det er ikkje eit JSON Schema, og dataeigar må stadfeste semantikk før nye transformasjonar.

## `budsjett/data.json`

To hovudområde vert brukte av `budsjett/app.js`:

- `programs`: liste av programobjekt med `code`, `name`, `students`, `credits`, `budget`, `staff` og farge-/forslagsfelt.
- `staffing`: summer av programtilsette, `flow`, `administration`, `total`, og budsjett-/noteinformasjon.
- `proposal`: budsjettutkast med fordelings-einingar, grunnlag, komponentar og synlege summer. Tal er i tusen kroner i eksisterande datastruktur.
- `students`: årstal, programfordeling, tidsseriar, kjelde og endringsdato.

`budsjett/app.js` les mellom anna `programs`, `staffing`, `proposal` og `students.studentsByYear`; endrar ikkje felt utan å kontrollere render-/eksportbruk.

## `timeplanside/timeplan-2027.json`

Toppnivå har kjelde/proveniens som `sourceFile`, `sourcePathHint`, `sheet`, `createdAt`, `period`, eventuelt `supplementalSource`, og påkravd `items`-liste.

Kvar item har normalt:

| Felt | Innhald |
|---|---|
| `id`, `sourceRow` | Stabil ID/Excel-rad; `r<row>` for importer |
| `course`, `courseName` | Emnekode(ar) og kjeldeemnenamn |
| `week`, `weekday` | Veke og vekedag frå kjelde |
| `startDate`, `startTime`, `endDate`, `endTime` | Dato `DD.MM.YYYY` og klokkeslettstreng |
| `activity`, `description` | Aktivitet og visings-/innhaldsfelt |
| `room`, `otherObjects`, `staff` | Stad, objekt og tilsett |
| `status` | Statusstreng, importer set `Forslag` |
| `externalComment`, `internalComment`, `link` | Kjeldemerknad/URL; vurder personvern før publisering |
| `supplemental` | `true` for oppføringar som importen skal bevare |

Frontend redigerer lokalt berre `description` og `staff`; eksporten kan innehalde alle felta. `supplementalSource` og `sourceFile` er proveniens, ikkje UI-felt.

## Kontraktskontroll

- JSON skal parse med UTF-8.
- Timeplan toppnivå skal vere objekt med `items` som liste.
- Ikkje kast ukjende metadatafelt ved import/eksport utan eksplisitt avgjerd.
- Bevar kildeidentifikatorar og supplerande rader når det er tilsikta.
- Sjekk datotype, duplikate ID-ar, tomme felt og antall rader før publisering.
- Budsjettresultat må samanliknast med opphavleg kjelde; summer skal ikkje normaliserast bort automatisk.
- Valider offentleg JSON for personopplysningar og lisens før commit.

Kjeldekodene som faktisk les/skriv kontraktane: [`app.js`](../../budsjett/app.js), [`timeplan-app.js`](../../timeplan2027/app.js), [`import_timeplan.py`](../../scripts/import_timeplan.py) og [`xlsx_export.py`](../../xlsx_export.py).

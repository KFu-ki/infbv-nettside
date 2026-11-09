# Budsjettmodellar og berekningsreglar i grensesnittet

## Omfang og åtvaring

Dette er kodebasert dokumentasjon av scenarioformlar i `budsjett/app.js`, ikkje eit vedtak eller ei godkjend økonomisk fordelingsregel. Dataeigar/fagansvarleg må godkjenne formlar, grunnlag og avrunding før dei vert brukte til styring. JSON-kjelda inneheld òg skilje mellom arbeidsnotat og leiingsutkast; tala vert ikkje automatisk forsona.

## Grunnverdiar

- Programkode: `PR`, `JOU`, `MPRO`, `ANI`, `MMP`.
- `students`, `credits`, `budget`, `staff` vert lesne frå `budsjett/data.json`.
- I eksisterande fil er budsjett- og studiepoengbaserte beløp uttrykte i **tusen kroner**; visingshjelparen multipliserer med 1 000 for å vise kroner.
- `staff` er årsverk. `flow` og `administration` er eigne ressursgrupper.
- Programfargar er statiske metadata i frontend.

## Dagens modell (`scenario === "current"`)

1. `baseStaff = sum(program.staff)`.
2. Tilbakeført felleskapasitet er `flow × flowPercent/100 + administration × administrationPercent/100`.
3. Denne tilbakeføringa vert fordelt til programma proporsjonalt med programmet sine opphavlege `staff`-årsverk; ved null sum er tillegg null.
4. `staffEffective = staff + programandel av tilbakeført felleskapasitet`.
5. `creditsPerStaff = credits / staffEffective`; `studentsPerStaff = students / staffEffective`; budsjett per årsverk/student vert tilsvarande rekna. For nullnemnar brukar visse visningsuttrykk 1 som reserve, ikkje ei fagleg nullverdi.
6. `avgCredits = sum(credits) / sum(staffEffective)`.
7. `idealStaff = program.credits / avgCredits`.
8. `deviation = idealStaff - staffEffective`.
9. Belastning «over snitt» vert markert når studentar per effektivt årsverk er meir enn 105 % av gjennomsnittet.

## Alternative modellar

`alternativeCapacity()` bruker total årsverk, med ikkje-produktiv del avgrensa til `min(4.5, total)`. Program-poolen vert total minus denne delen. I koden finst òg delverdiane `shared = min(4, nonProduction)` og rest; ikkje alle vert fordelte på program.

- **A:** program-poolinnehav proporsjonalt med studiepoengsproduksjon.
- **B:** program-pool fordelt proporsjonalt med studenttal.
- **C:** gjennomsnittet av kvart program sin del av produksjon og del av studenttal.

Alternativ vekting bruker samla produksjon/studentar; ved null totalsum er nemnaren 1. Dette er scenarioføresetnader i frontend, ikkje dataeigarverifiserte reglar. KPI-ar/diagram oppdaterer seg ved val.

## Leiingsutkast og redigering

`proposal` har eigne einingar, komponentar og summer i statisk JSON. Grunnlag og løyvingskomponentar vert presenterte med kjeldemerknader. Redigeringsmodus endrar data i nettlesarens minne og rekalkulerer visse summer; ingenting vert lagra tilbake i JSON. Synlege rapportar viser avvik mellom oppgitt sum og summen av komponentar. Koden dokumenterer at avvik i trykte summer og MPRO-budsjett ikkje vert korrigerte automatisk.

## Avrunding, valuta og kontroll

- `Intl.NumberFormat("nb-NO")` formaterer verdiar; heile beløp rundast i vising.
- Kroner bereknast frå tusenkroner med faktor 1 000.
- Endring i årsverk endrar ikkje budsjettbeløp i alternativtabellen.
- Eksporten inneheld både oppgitt sum og sum av einingar, samt forklarande merknad om avvik.
- Ved endring: legg inn tester for nullgrunnlag, lik fordeling, grenseverdiar, summer og budsjettgrunnlag; samanlikn med kjeldearbeidsbok/dataeigar. Ikkje endre tolkning for å få summane til å passe.

## Kjelder

- Implementasjon: [`budsjett/app.js`](../../budsjett/app.js)
- Strukturelle data: [`budsjett/data.json`](../../budsjett/data.json)
- XLSX-eksport: [`xlsx_export.py`](../../xlsx_export.py)
- Uavklara forretningsgrunnlag: [kjelderegister](../data-sources/source-register.md)

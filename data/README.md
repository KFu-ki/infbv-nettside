# Datafiler og proveniens

Bruk desse katalogane for nye dataflytar:

- `data/raw/`: uendra kjeldedata. Aldri rediger rådata manuelt.
- `data/processed/`: transformerte data med dokumentert kjelde og reproduksjonsmetode.
- `data/reference/`: små, stabile referansedata som er godkjende for versjonskontroll.
- `data/exports/`: genererte eksportar; normalt regenererbare.

Dei tre første katalogane er berre strukturmarkørar no. Eksisterande publiserte data ligg framleis i `budsjett/data.json` og `timeplanside/timeplan-2027.json` fordi applikasjonen viser til dei. Ikkje flytt dei utan kodeendring, test og godkjend plan.

`data/raw/`, `data/processed/` og `data/exports/` ignorerer innhald i Git som standard. Det hindrar utilsikta innsjekking av store, sensitive eller regenererbare filer; legg aldri til slikt innhald med tvang utan eksplisitt godkjenning. Små, stabile referansedata kan versjonerast etter vurdering. Innhaldet i eksisterande JSON-utdrag er allereie offentleg i repoet, men framtidige oppdateringar må framleis personvern- og kvalitetssjekkast.

Registrer kjelde, eigar, plassering, format, lisens, tilgang, personvern, transformasjon, kvalitet og dato i [kjelderegisteret](../docs/data-sources/source-register.md). Bevar provenance/metadata i alle transformerte utdata. Verifiser at kjelda kan gjenopprettast før import; backup er ikkje ei erstatning for kjeldeproveniens.

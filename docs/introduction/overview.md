# Introduksjon til INFBV fagportal

## Kva prosjektet er

Repoet byggjer ei fagportal for Institutt for kommunikasjon ved Høgskulen i Volda. Det inneheld tre brukarflater:

1. **INFBV-forsida** (`/`) viser ei femtrinns kompetansetrapp, emne og ferdigheiter.
2. **AMF-budsjett** (`/budsjett/`) viser aggregerte studenttal, ressursar, scenariomodellar og eit arbeidsutkast til løyving.
3. **Timeplan 2027** (`/timeplan2027/`) viser offentlege undervisningsøkter, søk/filter og lokale endringsutkast.

Nettsidene er primært HTML, CSS og JavaScript. Python/FastAPI er eit valfritt serverlag for JSON-ruter og Excel-eksport. Dei offentlege JSON-filene er kjeldeutdrag som ligg i repoet; dei lokale Excel-kjeldane er ikkje med.

## Kven og kva som er autoritativt

- Repo og kontrollert kjeldekode er arbeidsgrunnlaget.
- `docs/INDEX.md` viser konfliktprioritet og kva for dokument som er autoritative.
- Faktisk kode og validerte testar går framfor tekst som ikkje er oppdatert.
- Utrekningar i budsjettgrensesnittet er forklarande scenario, ikkje stadfesta økonomiske vedtak. Dataeigar må godkjenne forretningsreglar.
- Timeplanutkast og GitHub-innspel er ikkje godkjende endringar. Ein administrator skal vurdere og oppdatere den publiserte JSON-fila.

## Korleis kome i gang

1. Les [README](../../README.md), [prosjektstatus](../project/current-state.md) og [neste steg](../project/next-actions.md).
2. Vel eit avgrensa arbeid og les relevant [arkitektur](../architecture/overview.md), dataflyt og avgjerder.
3. Kontroller `git status --short`.
4. Installer Python-avhengnader berre dersom backend eller Python-verktøy skal køyrast.
5. Sjå [gjenoppbygging frå null](../development/rebuild-from-zero.md) for kommandoar og manuell oppsetjing.

## Kva som ikkje er lova

- Vercel-kopling og Pages-innstillingar er ikkje verifiserte frå repoet.
- Ingen chatkommando publiserer i seg sjølv endringar.
- Agentar kan dele repo-filer, men ikkje nødvendigvis chatloggar, minne, kontoar eller lokalt kjeldemateriale.
- Ingen av denne dokumentasjonen stadfestar lisens, publiseringsgrunnlag eller personvernstatus for eksterne data.

## Dokumentasjon med lågt tokenforbruk

Start med [AGENTS.md](../../AGENTS.md) og [dokumentasjonsindeksen](../INDEX.md). Bruk `python3 scripts/knowledge_lookup.py "<emne>"` for korte, lokale utdrag frå dokumentasjonen. Les berre dei kjeldefilene som trengst. Fullmanualen er generert og ligg i `docs/manual/`.

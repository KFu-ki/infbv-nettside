# Agentinstruksjonar

Dette er den leverandøruavhengige inngangen for alle KI-agentar. Les repoet, ikkje chatminne, som kjelde til prosjektkunnskap.

## Før arbeid

1. Les `README.md`, `docs/INDEX.md`, `docs/project/current-state.md` og `docs/project/next-actions.md`.
2. Les relevante arkitektur-, data- og avgjerdsfiler før du endrar noko.
3. Kontroller `git status --short`. Bevar alle eksisterande og urelaterte endringar.
4. Finnande kunnskap i repoet går framfor tidlegare chatminne.
5. Bruk `python3 scripts/knowledge_lookup.py "<emne>"` for eit kort lokalt oppslag før du les mange dokument; opne kjeldefila for nødvendig kontekst.

## Gjennomføring

- Gjer den minste forsvarlege, komplette endringa. Bruk eksisterande runtime, pakkar og mønster.
- Hald presentasjon, dataimport og forretningslogikk skilde; legg berekningar i testbare funksjonar.
- Ikkje overskriv ei dokumentert avgjerd. Føreslå ei ny ADR før ei slik avgjerd vert endra.
- Ikkje legg løyndomar, passord, API-nøklar eller persondata i repoet. Stopp dersom ei endring kan øydeleggje data eller påverke produksjon utan godkjenning.
- Bevar dataproveniens; endre aldri rådata manuelt.
- Køyr den rimelegaste relevante testen, lintinga og bygginga. Sei tydeleg frå om kontrollar som manglar eller feilar.

## Etter arbeid

- Oppdater berre dokumentasjonen som faktisk er påverka, inkludert endringslogg og neste steg ved behov.
- Oppdater `docs/project/current-state.md`, `docs/project/next-actions.md`, `docs/changes/CHANGELOG.md` og `docs/changes/project-journal.md` når arbeidet påverkar dei.
- Etter endringar i Markdown, kode eller skript: køyr `python3 scripts/build_manual.py` og kontroller resultatet; ikkje rediger dei genererte manualfilene direkte.
- Kontroller `git status --short`; ikkje commit, push eller publiser utan uttrykkjeleg godkjenning.

Sjå `docs/INDEX.md` for dokumentrekkjefølgje og autoritative kjelder.

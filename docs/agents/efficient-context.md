# Agentkontekst, leverandørbyte og kostnad

## Éi kjelde til sanning

`AGENTS.md` er leverandøruavhengig arbeidsinngang. `docs/INDEX.md` bestemmer kva kjelde som er autoritativ ved konflikt. Provider-adapterar skal berre peike dit; kopier ikkje full kunnskapsbase i kvar agentkonfigurasjon.

## Økonomisk oppslagsflyt

1. Les dei korte obligatoriske filene: `AGENTS.md`, `docs/INDEX.md`, `current-state.md`, `next-actions.md`.
2. Køyr `python3 scripts/knowledge_lookup.py "<konkret emne>" --max-results 5` for smale utdrag; skriptet går lokalt og sender ikkje data til API.
3. Opne relevante kjeldefiler. Søk i kode berre for den aktuelle komponenten.
4. Bruk generert `docs/manual/knowledge-catalog.md` for å finne rett dokument; les PDF-en berre for menneskeleg referanse.
5. Etter innhald/kodeendring: oppdater dei påverka kjeldene, køyr kontroller og regenerer manual med `python3 scripts/build_manual.py`.

## Kva automatisering kan og ikkje kan gjere

- `build_manual.py` regenererer kodekart, katalog, samla Markdown-manual og PDF frå repo-kjeldene.
- CI kontrollerer at generert innhald er oppdatert og lastar opp ei fersk PDF som byggartefakt.
- `knowledge_lookup.py` finn lokale dokumentutdrag; det er ingen vektordatabase, ekstern embedding, LLM-API eller bakgrunnsopplasting.
- Agentar kan foreslå eller skrive repo-filer dersom brukaren har bede om det; dei skal aldri «oppdatere seg sjølve» ved å endre leverandørmodell, skjulte systempromptar, kvotar eller kontominne.
- Ingen skript kan hente private chatloggar automatisk. Samtalehistorikk vert berre oppsummert når ho er eksplisitt kjend og relevant, utan å lagre sensitivt innhald.
- Endring i kjelde-Markdown endrar manualen; endring i kode endrar kodekart-hashane. `--check` varslar om output ikkje er regenerert.
- Katalog/manual kan synkroniserast; prosjektkunnskap må framleis menneskeleg gjennomgåast for korrektheit.

## Byte av leverandør

Les relevant agentkonfigurasjon frå [provider-oversynet](providers.md), deretter den delte `AGENTS.md`. Same repo er delt arbeidsflate; chathistorikk, modelltilstand, konto, kvote og lisensvilkår er separate. Verifiser gjeldande leverandørpolicy før bruk av data.

## Tokenreduserande arbeidsvanar

- Be om avgrensa mål og rapporter berre relevante filer, diff og kontrollar.
- Bruk konkret søkeord heller enn å sende heile manualen til modellen.
- Bruk `--max-results` og korte utdrag.
- Ikkje send JSON-datasett eller kjeldearbeidsbøker i heile dersom berre feltkontrakt er relevant.
- Ikkje be kvar provider om å lese alle adapterane; les felles inngang ein gong.
- Hugs at lågare promptlengd ikkje skal gå på kostnad av validering eller personvern.

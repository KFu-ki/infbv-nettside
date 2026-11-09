# Prosjektdiskusjonar og dokumenterte avklaringar

Dette er eit selektivt, kjeldebasert diskusjonssamandrag, ikkje ein fullstendig chateksport. Repoet har ikkje ei arkivert full samtalehistorikk. Ikkje fyll hol med gjetting og ikkje kopier private promptar eller persondata inn i Git.

| Dato | Tema | Dokumentert innspel/avklaring | Kva som vart gjort / kjelde | Uavklart |
|---|---|---|---|---|
| 2026-11-08 | Agentkunnskap | Felles, leverandøruavhengig inngang med adapterar framfor kopiert kunnskapsbase | `AGENTS.md`, `.github/copilot-instructions.md`, `CLAUDE.md`, `GEMINI.md`, `docs/INDEX.md` | Kva klientversjon som les kvar adapter er ikkje verifisert |
| 2026-11-08 | Prosjektmanual | Dokumenter oppbygging, kode, UI, backend, JSON, dataflyt, design, skript og manuell gjenoppbygging | Nye dokument i `docs/introduction/`, `docs/architecture/`, `docs/data-sources/`, `docs/business-rules/`, `docs/design/` og `docs/development/` | Eksterne data-/driftskontoar kan berre dokumenterast etter eigarverifikasjon |
| 2026-11-08 | Kostnad og sjølvoppdatering | Lokal søk/utdrag og regenerering av manual skal spare gjenteken opplesing; ingen modell-/konto-/chatminne kan endrast av repo-skript | `scripts/knowledge_lookup.py`, `scripts/build_manual.py`, `docs/agents/efficient-context.md` | Faktisk token-/kostnadssparing avheng av agent og brukar; ikkje målt |
| 2026-11-08 | PDF-manual | Genererbar, versjonert PDF og Markdown frå Markdown-kjeldene, utan ny Python-avhengnad; CI skal validere/tilby artefakt | `docs/manual/`, `.github/workflows/manual.yml` | Lokale PDF-lesarar/utsjånad er ikkje nettlesartesta |
| 2026-11-08 | Eksisterande design/dataavgjerder | Statisk JSON og manuell vurdering før timeplanpublisering vert behandla som eksisterande praksis fordi README/kode seier det | [ADR-001](../decisions/ADR-001-static-json.md), [ADR-002](../decisions/ADR-002-timetable-review.md) | Opphavleg avgjerdsdato, eigar og formell godkjenning er ukjend; ADR-dato er dokumentasjonsdato |
| 2026-11-08 | Hosting | Repo omtalar Vercel og har to GitHub Pages-workflows; ingen av desse dokumenterer kva produksjonsprosjekt som faktisk er aktivt | [Hostingstatus](../operations/vercel.md), [prosjektstatus](../project/current-state.md) | Hostingkonti, branch-policy, previews og aktiv workflow må stadfestast av eigar |

## Slik fører ein ny post

- Skriv dato, avgrensa tema, avgjerd berre når ho er eksplisitt og kjeldebasert.
- Len til fil/ADR/issue/PR som dokumenterer avgjerda.
- Skil mellom observasjon, forslag, godkjend val og uavklart punkt.
- Ikkje lim inn full prompt-/chatlogg, API-token, privat e-post eller personopplysningar.
- Dersom ei eldre avgjerd vert endra: opprett ny ADR med relasjon til den førre.

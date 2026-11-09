# GitHub Copilot

Følg [AGENTS.md](../AGENTS.md) og les [dokumentasjonsindeksen](../docs/INDEX.md), [prosjektstatus](../docs/project/current-state.md) og relevante filer under `docs/` før du endrar prosjektet. Følg autoritetsrekkjefølgja i indeksen; ikkje dupliser kunnskapsbasen her.

Bruk Copilot-spesifikke funksjonar berre som arbeidsmåte: føreslå avgrensa diffar, vis kva kontrollar som faktisk vart køyrde, og ikkje godkjenn eller publiser endringar på vegner av brukaren.

For eit kort, lokalt kunnskapsoppslag før du les fleire filer, køyr `python3 scripts/knowledge_lookup.py "<emne>"`. Opne kjeldedokumentet før du endrar kode. Etter Markdown-/kodeendringar, køyr `python3 scripts/build_manual.py`; ikkje rediger genererte filer direkte.


For INFBV emnekodar, nynorske visingsnamn og språkvariantar, bruk `INFBV-studiemodell/studiemodell.md` og `INFBV-studiemodell/studiemodell.xlsx` som den kuraterte registerinngangen. Ikkje gjer heile kurskatalogen om når berre nokre namn er endra. For ein gjenbrukbar oppstartsarbeidsflyt i støtta Copilot IDE-ar, køyr prompten `.github/prompts/infbv-work.prompt.md`.

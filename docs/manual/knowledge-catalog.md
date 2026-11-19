# Kunnskapskatalog (generert)

Automatisk oversyn over Markdown-kjeldene. Innhaldet vert regenerert av `scripts/build_manual.py`.

| Fil | Tittel | Kort samandrag |
|---|---|---|
| `docs/manual/code-map.md` | Kodekart (generert) | Filoversyn og symboler; hash endrar seg med kjeldekode. |
| `.amazonq/rules/project.md` | Shared project rules | Follow the root `AGENTS.md` and `docs/INDEX.md`. Read the README, current state, next actions, and relevant architecture/data/decision documents before changes. Use `python3 scripts/knowledge_lookup.py "<topic>"` for concise local context. Preserve existing changes; do not publish without approval. Run `python3 scripts/build_manual.py` after source or Markdown changes; generated manual files are not edited by hand. |
| `.clinerules/project.md` | Shared project rules | Follow the root `AGENTS.md` and `docs/INDEX.md`. Read the README, current state, next actions, and relevant architecture/data/decision documents before changes. Run `python3 scripts/knowledge_lookup.py "<topic>"` to find concise local context. Preserve existing changes; do not publish without approval. Refresh generated documentation with `python3 scripts/build_manual.py` after source or Markdown changes. |
| `.continue/rules/project.md` | Shared project rules | Follow the root `AGENTS.md` and `docs/INDEX.md`. Read the README, current state, next actions, and relevant architecture/data/decision documents before changes. Use `python3 scripts/knowledge_lookup.py "<topic>"` for concise local context. Preserve existing changes; do not publish without approval. Run `python3 scripts/build_manual.py` after source or Markdown changes; generated manual files are not edited by hand. |
| `.cursor/rules/project.mdc` | project.mdc | description: Shared INFBV project rules and repository knowledge |
| `.github/copilot-instructions.md` | GitHub Copilot | Følg [AGENTS.md](../AGENTS.md) og les [dokumentasjonsindeksen](../docs/INDEX.md), [prosjektstatus](../docs/project/current-state.md) og relevante filer under `docs/` før du endrar prosjektet. Følg autoritetsrekkjefølgja i indeksen; ikkje dupliser kunnskapsbasen her. |
| `.github/ISSUE_TEMPLATE/timeplan-forslag.md` | timeplan-forslag | name: Forslag til Timeplan 2027 |
| `.github/prompts/add-feature.prompt.md` | Legg til funksjon | Funksjon: `${input:feature}` |
| `.github/prompts/continue-work.prompt.md` | Fortset arbeid | 1. Les `AGENTS.md`, `docs/INDEX.md`, `docs/project/current-state.md` og `docs/project/next-actions.md`. |
| `.github/prompts/deploy.prompt.md` | Førebu deploy | - Les `AGENTS.md`, `docs/INDEX.md` og `docs/operations/vercel.md`. |
| `.github/prompts/fix-bug.prompt.md` | Rett feil | Feil: `${input:bug}` |
| `.github/prompts/import-data.prompt.md` | Importer data | Kjelde: `${input:source}` |
| `.github/prompts/infbv-work.prompt.md` | infbv-work.prompt | name: infbv-work |
| `.roo/rules/01-project.md` | Shared project rules | Follow the root `AGENTS.md` and `docs/INDEX.md`. Read the README, current state, next actions, and relevant architecture/data/decision documents before changes. Use `python3 scripts/knowledge_lookup.py "<topic>"` for concise local context. Preserve existing changes; do not publish without approval. Run `python3 scripts/build_manual.py` after source or Markdown changes; generated manual files are not edited by hand. |
| `.windsurfrules` | .windsurfrules | Follow root `AGENTS.md` and the documentation order in `docs/INDEX.md`. Read `README.md`, `docs/project/current-state.md`, and `docs/project/next-actions.md` before work. Use `python3 scripts/knowledge_lookup.py "<topic>"` for a concise local lookup, then inspect source files. Preserve user changes; do not publish without approval. After source/documentation changes, run `python3 scripts/build_manual.py`; do not edit generated files directly. |
| `AGENTS.md` | Agentinstruksjonar | Dette er den leverandøruavhengige inngangen for alle KI-agentar. Les repoet, ikkje chatminne, som kjelde til prosjektkunnskap. |
| `CLAUDE.md` | Claude | Følg [AGENTS.md](AGENTS.md), [dokumentasjonsindeksen](docs/INDEX.md), [prosjektstatus](docs/project/current-state.md) og relevante dokument under `docs/`. `AGENTS.md` og prosjektfilene er autoritative; ikkje kopier kunnskapsbasen hit. |
| `data/README.md` | Datafiler og proveniens | Bruk desse katalogane for nye dataflytar: |
| `docs/agents/copilot-chat-basic-context.md` | INFBV-kontekst for Copilot Chat | Bruk denne korte fila som startkontekst i vanleg Microsoft Copilot Chat. Ho peikar ut prosjektreglar og kjelder, men erstattar ikkje kjeldefilene for ei konkret oppgåve. |
| `docs/agents/copilot-chat-specialist-agent-prompt.md` | Prompt for INFBV-spesialistagent i Microsoft Copilot Chat | Bruk teksten under i `Agents` → `New agent` dersom HVO-kontoen viser Agent Builder. Han er skriven for Copilot Chat (Basic) og krev ikkje GitHub Copilot, lokal repo-tilgang eller Copilot Studio. |
| `docs/agents/efficient-context.md` | Agentkontekst, leverandørbyte og kostnad | `AGENTS.md` er leverandøruavhengig arbeidsinngang. `docs/INDEX.md` bestemmer kva kjelde som er autoritativ ved konflikt. Provider-adapterar skal berre peike dit; kopier ikkje full kunnskapsbase i kvar agentkonfigurasjon. |
| `docs/agents/providers.md` | KI-agentar og konfigurasjonsadapterar | Dette repoet har ei felles regelkjelde og korte adapterar for vanlege editoragentar. Filformat og støtte kan endre seg; kontroller den installerte utgåva si dokumentasjon før du aktiverer ein ny funksjon. |
| `docs/architecture/backend-api.md` | Backend og API | `app.py` opprettar FastAPI-appen med tittelen `INFBV fagportal`. Lokal kommando frå repo-rota: |
| `docs/architecture/components.md` | Komponentar og kodekart | Dette er eit lesekart, ikkje eit separat rammeverk. Koden er autoritativ dersom teksten vert utdatert. |
| `docs/architecture/data-flows.md` | Dataflyt frå kjelde til brukar | - Rå Excel-filer vert verande utanfor repoet og vert ikkje endra manuelt. |
| `docs/architecture/frontend.md` | Frontend og brukarflater | Sidene er vanleg HTML/CSS/JavaScript, utan bundlar, npm-manifest eller TypeScript. Ingen frontend-byggsteg er naudsynt. Root-sida lastar Tailwind frå `https://cdn.tailwindcss.com`; dette er ein ekstern runtime-avhengnad. Budsjett og timeplan brukar eigne CSS-filer og defer-lasta JS. |
| `docs/architecture/overview.md` | Arkitekturoversyn | - Frontend: HTML, CSS og JavaScript utan deklarert frontend-pakkebehandlar eller byggsteg. |
| `docs/business-rules/budget-calculations.md` | Budsjettmodellar og berekningsreglar i grensesnittet | Dette er kodebasert dokumentasjon av scenarioformlar i `budsjett/app.js`, ikkje eit vedtak eller ei godkjend økonomisk fordelingsregel. Dataeigar/fagansvarleg må godkjenne formlar, grunnlag og avrunding før dei vert brukte til styring. JSON-kjelda inneheld òg skilje mellom arbeidsnotat og leiingsutkast; tala vert ikkje automatisk forsona. |
| `docs/changes/CHANGELOG.md` | Endringslogg | - Oppdaterte dei 11 bachelor-emna i INFBV-framsida og studiemodellregisteret frå `Nye emnenamn.xlsx`. Fjerna eldre «PR og kommunikasjon 1/3/5»-prefiks. |
| `docs/changes/project-journal.md` | Prosjektjournal | - Oppdaterte INFBV-framsida og registeret frå `Nye emnenamn.xlsx`; fjerna eldre programnamnprefiks frå kursnamna. |
| `docs/data-sources/json-contracts.md` | JSON-kontraktar | Dette dokumentet viser felt og ansvar basert på filer i repoet. Det er ikkje eit JSON Schema, og dataeigar må stadfeste semantikk før nye transformasjonar. |
| `docs/data-sources/source-register.md` | Register over datakjelder | Ukjende eigarar, lisensar og tilgangar er merkte som ukjende, ikkje utleidde. JSON-utdraga er offentleg lesbare i repoet/hosting. Kjeldearbeidsbøker er ikkje i repoet. |
| `docs/decisions/ADR-000-template.md` | ADR-NNN: Tittel | - **Dato:** ÅÅÅÅ-MM-DD |
| `docs/decisions/ADR-001-static-json.md` | ADR-001: Bruk statiske JSON-utdrag for offentlege data | - **Dato:** 2026-11-08 (dokumentert; opphavleg avgjerdsdato er ukjend) |
| `docs/decisions/ADR-002-timetable-review.md` | ADR-002: Vurder timeplanforslag før offentleg publisering | - **Dato:** 2026-11-08 (dokumentert; opphavleg avgjerdsdato er ukjend) |
| `docs/design/visual-design.md` | Visuelt design og grensesnittprinsipp | Denne fila skildrar eksisterande implementasjon, ikkje ei vedteken designmanual. Nye komponentar bør følgje mønstra, men endring av visuell retning krev gjennomgang. |
| `docs/developer-guides/visual-studio-code.md` | Utvikling i Visual Studio Code | `.vscode/extensions.json` tilrår Python og Pylance for Python-koden. Dette er tilrådingar, ikkje krav. Git- og Markdown-støtte frå VS Code er valfri. Ingen KI-leverandør er obligatorisk. |
| `docs/development/rebuild-from-zero.md` | Bygg prosjektet opp att manuelt | Denne rettleiinga gjer det mogleg å byggje dei same prosjektområda stegvis. Ho er ikkje ein installasjonsgaranti for eksterne kontoar/data. Følg rekkjefølgja og test kvar del før neste. |
| `docs/history/discussion-log.md` | Prosjektdiskusjonar og dokumenterte avklaringar | Dette er eit selektivt, kjeldebasert diskusjonssamandrag, ikkje ein fullstendig chateksport. Repoet har ikkje ei arkivert full samtalehistorikk. Ikkje fyll hol med gjetting og ikkje kopier private promptar eller persondata inn i Git. |
| `docs/INDEX.md` | Prosjektdokumentasjon | Denne sida er inngangen til prosjektkunnskapen. Agentar skal lese `README.md`, denne fila, `project/current-state.md` og `project/next-actions.md` før arbeid, og deretter relevante dokument. Ved motstrid gjeld denne rekkjefølgja: |
| `docs/introduction/overview.md` | Introduksjon til INFBV fagportal | Repoet byggjer ei fagportal for Institutt for kommunikasjon ved Høgskulen i Volda. Det inneheld tre brukarflater: |
| `docs/manual/README.md` | Generert utviklingsmanual | `code-map.md`, `development-manual.md`, `knowledge-catalog.md` og `development-manual.pdf` er genererte leveransar. Rediger kjelde-Markdown i prosjektet, ikkje desse utfilene. |
| `docs/operations/automatic-backup.md` | Automatisk backup av INFBV-fagportalen | Backupordninga vernar den autoritative arbeidskopien av `KFu-ki/infbv-nettside`, inkludert Git-historikk, versjonerte filer og lokale filer som enno ikkje er committe. Backupane vert lagra utanfor repoet i OneDrive. |
| `docs/operations/backup-and-recovery.md` | Backup og gjenoppretting | Før dokumentasjonsendringane vart dei 25 versjonskontrollerte filene kopierte frå `HEAD` med `git archive` til `_backup/2026-11-08_210007/`. Backupen er ei lokal, Git-ignorert kopi av tracked-filer, ikkje kryptert og ikkje utanfor denne maskina/synka OneDrive-rot. Ignorerte cache-filer og eksterne arbeidsbøker er ikkje med. Denne rapporten dokumenterer kva som vart gjort; ho garanterer ikkje backupintegritet. |
| `docs/operations/vercel.md` | Vercel og publisering | - Git remote `origin` er `https://github.com/KFu-ki/infbv-nettside.git`; lokal branch var `main` ved kontroll. |
| `docs/operations/version-restore.md` | Versjonar og trygg gjenoppretting | Den offentlege sida `/versjonar/` viser dei 20 nyaste commitane på `main` i `KFu-ki/infbv-nettside`. Sida gjev oversikt, men har ikkje løyndomar, GitHub-token eller direkte skrivetilgang. |
| `docs/project/ARBEIDSFLYT.md` | Arbeidsflyt for INFBV | /Users/kristian/.copilot/repos/infbv-nettside |
| `docs/project/current-state.md` | No-situasjon | **Sist kontrollert:** 2026-11-09 |
| `docs/project/next-actions.md` | Neste steg | Prioritering: `No` → `Neste` → `Seinare`. `Blokkert` krev avklaring før gjennomføring. |
| `docs/user-guides/copilot-chat-basic.md` | Arbeide med INFBV i vanleg Microsoft Copilot Chat | Denne rettleiinga er for Copilot Chat (Basic) med Høgskulen i Volda-konto. Ho føreset ikkje GitHub Copilot, VS Code-agent, Copilot Code, Copilot Studio eller lokal disktilgang. |
| `docs/user-guides/copilot-chat-start-prompt.md` | Startprompt for Copilot Chat: INFBV-arbeid med publisering | Kopier prompten nedanfor inn i ein ny HVO Copilot Chat. Han ber Copilot sjekke kva tilkoplingar han faktisk har, lese prosjektinstruksane, og bruke den førehandsautoriserte GitHub/Vercel-flyten når oppgåva krev publisering. |
| `docs/user-guides/mobile-use.md` | Bruk frå mobil og nettbrett | Opne nettadressa som eigaren har delt, i nettlesaren på mobil/nettbrett. Dette brukar nettsida; det endrar ikkje Git-filer. |
| `GEMINI.md` | Gemini | Følg [AGENTS.md](AGENTS.md), [dokumentasjonsindeksen](docs/INDEX.md), [prosjektstatus](docs/project/current-state.md) og relevante dokument under `docs/`. `AGENTS.md` og prosjektfilene er autoritative; ikkje kopier kunnskapsbasen hit. |
| `INFBV-studiemodell/studiemodell.md` | INFBV-studiemodell | Dette registeret samlar emnekodar, emnenamn på nynorsk, bokmål og engelsk, semester og studiepoeng for INFBV-framsida. Excel-arbeidsboka `studiemodell.xlsx` er den redigerbare fleirspråklege oversikta. |
| `kunnskap/prosjektregister/fou-oversikt.md` | FoU-portefølje | Sist oppdatert: 2026-11-18 |
| `kunnskap/README.md` | README | Markdown-kjelde i prosjektet. |
| `modellar/README.md` | README | Markdown-kjelde i prosjektet. |
| `README.md` | INFBV fagportal | Sjå [dokumentasjonsindeksen](docs/INDEX.md) for prosjektstatus, arkitektur, datakjelder, drift og utviklarrettleiingar. |
| `scripts/README.md` | Skript | Køyr frå prosjektrota med Python 3. Bruk berre kjelder du har løyve til å lese. Importskripta kan skrive over datautdrag; vurder diff og ta backup før du køyrer dei. |
| `tekst/deliberasjon/index.md` | deliberasjon | Status: Arbeidsmanus |
| `tekst/deliberasjon/README.md` | README | Markdown-kjelde i prosjektet. |
| `tekst/klima-og-berekraft/abstract.md` | Climate in the Classroom | > **Working abstract: pre-publication draft** |
| `tekst/klima-og-berekraft/index.md` | Klima og berekraft | Status: Arbeidsmanus |
| `tekst/klima-og-berekraft/litteratur.md` | Litteratur | Kapabilitetstilnærming. |
| `tekst/klima-og-berekraft/prosjektlogg.md` | Prosjektlogg | Prosjektrom oppretta i INFBV-systemet. |
| `tekst/klima-og-berekraft/README.md` | README | Markdown-kjelde i prosjektet. |
| `tekst/krisekommunikasjon-med-bakkekontakt/index.md` | krisekommunikasjon-med-bakkekontakt | Status: Arbeidsmanus |
| `tekst/krisekommunikasjon-med-bakkekontakt/kapittel-01.md` | kapittel-01 | Markdown-kjelde i prosjektet. |
| `tekst/krisekommunikasjon-med-bakkekontakt/kapittel-02.md` | kapittel-02 | Markdown-kjelde i prosjektet. |
| `tekst/krisekommunikasjon-med-bakkekontakt/kapittel-03.md` | kapittel-03 | Markdown-kjelde i prosjektet. |
| `tekst/krisekommunikasjon-med-bakkekontakt/kapittel-04.md` | kapittel-04 | Markdown-kjelde i prosjektet. |
| `tekst/krisekommunikasjon-med-bakkekontakt/kapittel-05.md` | kapittel-05 | Markdown-kjelde i prosjektet. |
| `tekst/krisekommunikasjon-med-bakkekontakt/kapittel-06.md` | kapittel-06 | Markdown-kjelde i prosjektet. |
| `tekst/krisekommunikasjon-med-bakkekontakt/kapittel-07.md` | kapittel-07 | Markdown-kjelde i prosjektet. |
| `tekst/krisekommunikasjon-med-bakkekontakt/kapittel-08.md` | kapittel-08 | Markdown-kjelde i prosjektet. |
| `tekst/krisekommunikasjon-med-bakkekontakt/kapittel-09.md` | kapittel-09 | Markdown-kjelde i prosjektet. |
| `tekst/krisekommunikasjon-med-bakkekontakt/kapittel-10.md` | kapittel-10 | Markdown-kjelde i prosjektet. |
| `tekst/krisekommunikasjon-med-bakkekontakt/README.md` | README | Markdown-kjelde i prosjektet. |
| `tekst/README.md` | Tekst | Arbeidsmanus, pågåande forsking og publiserte tekstar. |
| `tekst/samtalepodkastar/index.md` | samtalepodkastar | Status: Arbeidsmanus |
| `tekst/samtalepodkastar/README.md` | README | Markdown-kjelde i prosjektet. |
| `tekst/totalforsvarsaret-2026/index.md` | totalforsvarsaret-2026 | Status: Arbeidsmanus |
| `tekst/totalforsvarsaret-2026/README.md` | README | Markdown-kjelde i prosjektet. |
| `tekst/weird-crisis-exercises/index.md` | weird-crisis-exercises | Status: Arbeidsmanus |
| `tekst/weird-crisis-exercises/README.md` | README | Markdown-kjelde i prosjektet. |
| `undervisning/README.md` | README | Markdown-kjelde i prosjektet. |

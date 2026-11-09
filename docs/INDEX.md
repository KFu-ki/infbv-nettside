# Prosjektdokumentasjon

Denne sida er inngangen til prosjektkunnskapen. Agentar skal lese `README.md`, denne fila, `project/current-state.md` og `project/next-actions.md` før arbeid, og deretter relevante dokument. Ved motstrid gjeld denne rekkjefølgja:

1. Køyrande kode og validerte testar
2. ADR-ar med status `Godkjend`
3. Arkitekturdokumentasjon
4. Datakjelde- og forretningsreglar
5. `current-state.md`
6. README-filer
7. Historiske loggar og gamle notat

Usemje mellom kode og dokumentasjon skal noterast og rettast; ikkje framstill kjeldene som samsvarande før dei er det. README-filer er inngangar, ikkje overstyrande tekniske kjelder.

## Dokument

| Fil | Formål | Les når | Oppdater når | Autoritativ ved konflikt |
|---|---|---|---|---|
| [Denne indeksen](INDEX.md) | Navigasjon og konfliktprioritet | Før prosjektarbeid | Dokumentstruktur, prioritet eller autoritative kjelder endrar seg | Kode/testar, godkjende ADR-ar og respektive kjeldeområde |
| [Introduksjon](introduction/overview.md) | Kort om prosjekt, mål og kva som er/ikkje er stadfesta | Nye bidragsytarar eller agentar | Omfang eller hovudfunksjonar endrar seg | Kode, ADR-ar og prosjektstatus |
| [README.md](../README.md) | Brukarorientert oversyn og eksisterande kommandoar | Før lokal oppstart eller dataoppdatering | Oppstart, brukarsteg eller kommandoar endrar seg | Kode, godkjende ADR-ar, arkitektur og datadokumentasjon |
| [AGENTS.md](../AGENTS.md) | Felles, leverandøruavhengige agentreglar | Før kvar agentoppgåve | Felles arbeidsreglar endrar seg | Denne fila for prosjektfakta; AGENTS for arbeidsmåte |
| [Arkitekturoversyn](architecture/overview.md) | Komponentar, dataflyt og publiseringsflater | Endringar i app, dataflyt eller hosting | Kode/hostingarkitektur endrar seg | Kode og godkjende ADR-ar |
| [Komponentkart](architecture/components.md) | Ansvar og plassering for kvar kodeflate, modul og skript | Før du vel kva filer som skal endrast | Nye, fjerna eller omplasserte komponentar | Filene sjølve og validerte runtime-testar |
| [Backend og API](architecture/backend-api.md) | Ruter, payloads, hosting- og reserveoppførsel | Endringar i FastAPI, eksport eller runtime | API- eller backendoppførsel endrar seg | Køyrande backend-kode/testar |
| [Frontend](architecture/frontend.md) | Oppdeling og samspel mellom dei tre UI-flatene | Frontend-/interaksjonsendringar | UI-struktur, state eller ressurslast endrar seg | Køyrande HTML/CSS/JavaScript |
| [Dataflyt](architecture/data-flows.md) | Kjelde-til-JSON-til-UI/eksport-flyt | Import, publisering eller feilsøking | Import-/eksportsteg eller eigarskap endrar seg | Køyrande skript og kjelderegister |
| [Kjelderegister](data-sources/source-register.md) | Kjende data, proveniens, tilgang og avgrensingar | Import, transformasjon eller publisering av data | Ei kjelde, transformasjon eller klassifisering endrar seg | Køyredata og godkjende ADR-ar; avvik skal noterast |
| [JSON-kontraktar](data-sources/json-contracts.md) | Observerte felt, bruk og datavalidering for offentlege JSON | Endring av felt, import eller eksport | JSON-formatet/konsumentane endrar seg | JSON-filer og kode som les dei |
| [Budsjettmodell](business-rules/budget-calculations.md) | Formlar og scenario som faktisk ligg i dashboardkoden | Endring av rekning, tolkning eller ressursmodell | Formel/implementasjon vert stadfesta eller endra | Køyrande kode og dataeigarverifiserte reglar |
| [Visuelt design](design/visual-design.md) | Observerte UI-mønster, responsivitet og tilgjenge | Visuell endring | Gjennomgåtte designmønster endrar seg | Køyrande frontend og validerte skjermbilete |
| [INFBV-studiemodell](../INFBV-studiemodell/studiemodell.md) | Emnekodar, visingsnamn, semester og språkvariantar for INFBV-framsida | Endring av emneoversikta eller omsetjingar | Godkjende studiemodellnamn eller språkvariantar endrar seg | Studietabell og registeret; køyredata er `app.js` |
| [Manuell gjenoppbygging](development/rebuild-from-zero.md) | Stegvis rekonstruksjon av kode, data og hosting | Ny maskin eller full manuell oppbygging | Føresetnader/kommandoar endrar seg | Faktisk kode, installasjon og hostingkonto |
| [ADR-mal](decisions/ADR-000-template.md) | Format for nye avgjerder | Før ein ny ADR vert skriven | Avgjerdeformatet vert endra | Godkjende ADR-ar for avgjerder; malen er ikkje ei avgjerd |
| [ADR-001](decisions/ADR-001-static-json.md) | Dokumenterer statiske JSON-utdrag som publikumsdata | Endring av datadistribusjon | Avgjerda vert formelt endra via ny ADR | Køyrande kode, deretter ny godkjend ADR |
| [ADR-002](decisions/ADR-002-timetable-review.md) | Dokumenterer manuell vurdering av timeplanforslag | Endring av publiserings-/godkjenningsflyt | Godkjenningsflyten vert formelt endra via ny ADR | Køyrande kode og ny godkjend ADR |
| [Prosjektstatus](project/current-state.md) | Kontrollert no-situasjon og faktiske valideringar | Før arbeid og ved overlevering | Etter relevante kode-, drift- eller kontrollendringar | Kode/testar, ADR-ar og arkitektur |
| [Neste steg](project/next-actions.md) | Prioritert, avgrensa arbeidsliste | Når neste oppgåve skal veljast | Prioritet eller ferdigkriterium endrar seg | Godkjende ADR-ar og gjeldande kode |
| [Endringslogg](changes/CHANGELOG.md) | Samandrag av endringar etter kategori | Ved gjennomgang av nylege endringar | Ved kvar vesentleg prosjektendring | Git-diff og køyrande kode |
| [Prosjektjournal](changes/project-journal.md) | Daterte hendingar, kontrollar og overleveringar | Historikk må sporast | Ved oppstart, kontroll eller vesentleg hending | Git og kontrollresultat |
| [Diskusjonslogg](history/discussion-log.md) | Korte, kjeldebaserte avklaringar; ikkje chateksport | Tidlegare prosjektval er relevante | Ny avgjerd eller uavklart punkt vert teke opp | Godkjende ADR-ar og verifiserte repo-/issue-kjelder |
| [Agentkontekst og kostnad](agents/efficient-context.md) | Lokal oppslagsflyt, tokenøkonomi og automatiseringsgrenser | Agent skal hente kontekst effektivt | Agent-/oppslagsverktøy endrar seg | `AGENTS.md` og faktisk skriptoppførsel |
| [KI-leverandørar](agents/providers.md) | Adapteroversyn, felles reglar og leverandørskilje | Agent eller editor vert bytt | Nye adapterar vert lagde til | Leverandørdokumentasjon for format; `AGENTS.md` for prosjektreglar |
| [Manual-generator](manual/README.md) | Korleis samla Markdown, katalog og PDF vert bygde | Manual skal regenererast eller validerast | Generator/CI/output endrar seg | `scripts/build_manual.py` og CI |
| [Generert kodekart](manual/code-map.md) | Fil-/symboloversyn med kontrollsummar som endrar seg ved kodeendring | Agent eller utviklar treng komponentkart | Berre via manuell regenerering etter kjeldeendring | Køyrefiler og byggjar |
| [Generert kunnskapskatalog](manual/knowledge-catalog.md) | Automatisk Markdown-register og korte samandrag | Ein vil finne rett dokument raskt | Berre via manuell regenerering etter kjeldeendring | Genereringsskriptet og kjelde-Markdown |
| [Samla utviklingsmanual](manual/development-manual.md) | Søkbar samling av prosjektdokumentasjon | Offline/sekvensiell gjennomlesing | Berre via manuell regenerering etter kjeldeendring | Kjelde-Markdown |
| [PDF-utviklingsmanual](manual/development-manual.pdf) | Tekstbasert PDF av Markdown-kjeldene | Menneskeleg gjennomlesing/utskrift | Berre via generator/CI | Kjelde-Markdown og generator |
| [Vercel og publisering](operations/vercel.md) | Hosting, miljø og trygg deployflyt | Før hostingoppsett eller publisering | Hosting, branch-policy eller miljøkrav endrar seg | Faktisk Vercel-/GitHub-konfigurasjon og godkjend ADR |
| [Backup og gjenoppretting](operations/backup-and-recovery.md) | Backupformat, avgrensingar og kontroll | Før strukturelle endringar eller gjenoppretting | Backupmetode eller lagringsstad endrar seg | Faktiske kommandoar og backupinnhald |
| [Mobil og nettbrett](user-guides/mobile-use.md) | Trygg bruk og redigering frå mobil | Mobil bruk eller godkjenning | GitHub-/Codespaces-arbeidsflyt endrar seg | Faktisk brukargrensesnitt og plattforminnstillingar |
| [VS Code](developer-guides/visual-studio-code.md) | Utvidingar, agentbyte og VS Code-funksjonar | Lokal utviklingsoppsett | Tilrådingar eller agentoppsett endrar seg | Faktiske repo-innstillingar og utvidingar |
| [Skriptoversyn](../scripts/README.md) | Føresetnader, kommandoar, inndata/utdata og feil for skript | Før eit skript vert køyrt eller endra | Skript eller føresetnader endrar seg | Skriptkoden |
| [Datahandtering](../data/README.md) | Konvensjonar for rådata, transformert data og eksport | Ny datakjelde eller lagringsbehov | Datareglar endrar seg | Datakjeldeavtalar og godkjende ADR-ar |

## Agent- og kontrollfiler

| Fil | Formål | Les/bruk når | Oppdater når | Autoritativ ved konflikt |
|---|---|---|---|---|
| [Copilot-instruksjonar](../.github/copilot-instructions.md) | Tynn GitHub Copilot-adapter | Copilot arbeider i repoet | Copilot-spesifikk arbeidsmåte endrar seg | `AGENTS.md` |
| [Claude-adapter](../CLAUDE.md) | Peikar Claude til felles instruksjonar | Claude arbeider i repoet | Agentinngangen endrar seg | `AGENTS.md` |
| [Gemini-adapter](../GEMINI.md) | Peikar Gemini til felles instruksjonar | Gemini arbeider i repoet | Agentinngangen endrar seg | `AGENTS.md` |
| [Timeplan-issue-mal](../.github/ISSUE_TEMPLATE/timeplan-forslag.md) | Skjema for offentlege timeplanforslag | Forslag vert sende inn eller malen vert endra | Forslagsflyt eller påkravde felt endrar seg | Køyrande data-/godkjenningsflyt og ADR-002 |
| [Fortset arbeid](../.github/prompts/continue-work.prompt.md) | Kort arbeidsstartprompt | Fortsetjing av ei oppgåve | Felles arbeidsflyt endrar seg | `AGENTS.md` og `next-actions.md` |
| [Legg til funksjon](../.github/prompts/add-feature.prompt.md) | Funksjonsarbeid | Ny funksjon | Funksjonsarbeidsflyt endrar seg | Kode, ADR-ar og krav |
| [Rett feil](../.github/prompts/fix-bug.prompt.md) | Feilretting | Feil skal reproduserast/rettast | Feilrettingsflyt endrar seg | Kode og validerte testar |
| [Importer data](../.github/prompts/import-data.prompt.md) | Kontrollert dataimport | Ny eller endra import | Importarbeidsflyt endrar seg | Skript og kjelderegister |
| [Deploy](../.github/prompts/deploy.prompt.md) | Deploy-sjekkliste utan automatisk publisering | Før deploy | Deploy-policy endrar seg | Faktisk hostingkonfigurasjon og godkjenning |
| [Cursor-regel](../.cursor/rules/project.mdc) | Kort Cursor-adapter | Cursor arbeider i repoet | Agentinngang eller konfigurasjonsformat endrar seg | `AGENTS.md` |
| [Windsurf-regel](../.windsurfrules) | Kort Windsurf-adapter | Windsurf arbeider i repoet | Agentinngang eller klientformat endrar seg | `AGENTS.md` |
| [Cline-regel](../.clinerules/project.md) | Kort Cline-adapter | Cline arbeider i repoet | Agentinngang endrar seg | `AGENTS.md` |
| [Roo Code-regel](../.roo/rules/01-project.md) | Kort Roo Code-adapter | Roo Code arbeider i repoet | Agentinngang endrar seg | `AGENTS.md` |
| [Continue-regel](../.continue/rules/project.md) | Kort Continue-adapter | Continue arbeider i repoet | Agentinngang endrar seg | `AGENTS.md` |
| [Amazon Q-regel](../.amazonq/rules/project.md) | Kort Amazon Q-adapter | Amazon Q arbeider i repoet | Agentinngang endrar seg | `AGENTS.md` |
| [Skriptkontroll](../scripts/check_documentation.py) | Obligatoriske dokument, interne lenkjer, tracked credential-filnamn | Før dokumentasjonsendring/CI | Kontrollomfang endrar seg | Faktisk repo-policy og testresultat |
| [Manual-byggjar](../scripts/build_manual.py) | Genererer kunnskapskatalog, full Markdown-manual og PDF | Etter Markdown-/kodeendring | Generert output vert utdatert | Kjeldefilene og byggjar |
| [Kunnskapsoppslag](../scripts/knowledge_lookup.py) | Korte lokale relevante utdrag for agent | Før mange dokument vert lesne | Oppslagslogikk endrar seg | Skriptet og kjelde-Markdown |
| [CI](../.github/workflows/ci.yml) | Validerer Python-syntaks og publisert JSON utan publisering/løyndomar | Ved backend-/dataendring | Valideringskrav endrar seg | Faktisk kode og testkommandoar |
| [Dokumentasjons-CI](../.github/workflows/documentation-check.yml) | Sjekkar obligatoriske dokument, lenkjer, `.env`, adapterar og fersk manual | Ved dokumentasjonsendring | Kontrollomfang endrar seg | Kontrollskriptet og repo-policy |
| [Manual-CI](../.github/workflows/manual.yml) | Byggjer PDF/Markdown og lastar opp Actions-artifakt | Når manual skal vere nedlastbar | Output-/artefaktpolicy endrar seg | Workflow og `scripts/build_manual.py` |

## Uavklarte punkt

Sjå [current-state.md](project/current-state.md) og [next-actions.md](project/next-actions.md). To lokale GitHub Pages-workflowfiler er uversjonerte og ikkje med i denne Vercel-publiseringa; sjå `project/next-actions.md` før dei eventuelt vert lagde til.

## Genererte manualfiler

`manual/knowledge-catalog.md`, `manual/development-manual.md` og PDF er bygde frå kjelde-Markdown. Ikkje rediger dei for hand. Køyr `python3 scripts/build_manual.py` etter kjeldeendringar; CI kontrollerer at output er fersk. Manuellrapport/manual og agentreglar er informasjonssider, ikkje ny kjelde til fakta.

# KI-agentar og konfigurasjonsadapterar

Dette repoet har ei felles regelkjelde og korte adapterar for vanlege editoragentar. Filformat og støtte kan endre seg; kontroller den installerte utgåva si dokumentasjon før du aktiverer ein ny funksjon.

| Verktøy/agent | Repo-inngang | Kva adapteren gjer |
|---|---|---|
| GitHub Copilot | `.github/copilot-instructions.md` | Peikar til `AGENTS.md` og dokumentasjonsrekkjefølgja |
| Claude Code | `CLAUDE.md` | Peikar til felles instruksjonar |
| Gemini CLI | `GEMINI.md` | Peikar til felles instruksjonar |
| Cursor | `.cursor/rules/project.mdc` | Always-apply regel som viser til AGENTS |
| Windsurf | `.windsurfrules` | Kort prosjektregel |
| Cline | `.clinerules/project.md` | Prosjektregel |
| Roo Code | `.roo/rules/01-project.md` | Prosjektregel |
| Continue | `.continue/rules/project.md` | Prosjektregel |
| Amazon Q Developer | `.amazonq/rules/project.md` | Prosjektregel |
| OpenAI Codex/andre verktøy som støttar `AGENTS.md` | `AGENTS.md` | Bruker den delte filen direkte; særskild konfigurasjon er ikkje stadfesta |

Adapterane er korte med vilje. Dei etablerer ikkje ekstra kunnskapskopiar. Om ein agent ikkje lastar den venta fila automatisk, opne den eksplisitt i agentinstruksen; ikkje føreset at ein adapter vert støtta.

## Kvar leverandør sine grenser

- Innlogging, kvotar/kredittar, modellval og vilkår er eigne per leverandør.
- Felles filsystem betyr ikkje at agentar deler chatloggar eller langtidsminne.
- Provider-agentar kan sende prompt/valde kontekst til leverandørtenesta i samsvar med kontoinnstillingar. Ikkje inkluder løyndomar, sensitiv persondata eller private arbeidsbøker.
- Repo-konfigurasjon kan ikkje endre eller oppdatere leverandørmodellen, fakturering eller privat chatminne.

## Oppsett

Installer berre agenten du vil bruke, logg inn separat, opne repoet og kontroller at den les felles agentinngang. Deaktiver agentutvidingar per arbeidsområde eller via VS Code Profile ved behov. Følg [VS Code-rettleiinga](../developer-guides/visual-studio-code.md) og [kostnadssparsamt oppslag](efficient-context.md).

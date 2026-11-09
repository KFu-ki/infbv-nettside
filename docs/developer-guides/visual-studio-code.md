# Utvikling i Visual Studio Code

## Utvidingar

`.vscode/extensions.json` tilrår Python og Pylance for Python-koden. Dette er tilrådingar, ikkje krav. Git- og Markdown-støtte frå VS Code er valfri. Ingen KI-leverandør er obligatorisk.

## Byte mellom agentar

GitHub Copilot, Gemini, Claude, OpenAI Codex/andre agentar kan nyttast gjennom relevante utvidingar eller appar. Vel, installer og autentiser kvar leverandør separat. Kvar har eiga innlogging, kvotar, databehandling og vilkår; kontroller gjeldande vilkår hos leverandøren. Agentar kan endre dei same prosjektfilene dersom dei har repo-tilgang, men chatloggar og privat kontekst vert ikkje nødvendigvis delte. Alle agentar skal lese `AGENTS.md` og prosjektindeksen.

## Profilar, synk og arbeidsområde

- VS Code Profiles kan halde ulike utvidingar/innstillingar for til dømes generell Python-utvikling og ulike KI-verktøy. Vel profil via Profile-menyen.
- Settings Sync kan synkronisere brukarinnstillingar, utvidingar, tastatursnarvegar og profilar når du loggar inn og slår det på. Det synkroniserer ikkje automatisk prosjektfiler eller agentchat.
- I Extensions-visinga kan ei utviding aktiverast/deaktiverast globalt eller berre for dette arbeidsområdet. Bruk workspace-scope ved behov.
- `.vscode/extensions.json` inneheld berre frivillige forslag. Repoet har ikkje `.vscode/settings.json`; legg berre til trygge, prosjektspesifikke innstillingar når dei er grunngjevne.

Kontroller repo og diff før agentendringar vert godkjende; del aldri løyndomar i promptar eller prosjektfiler.

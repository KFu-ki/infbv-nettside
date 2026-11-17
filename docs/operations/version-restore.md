# Versjonar og trygg gjenoppretting

## Formål

Den offentlege sida `/versjonar/` viser dei 20 nyaste commitane på `main` i `KFu-ki/infbv-nettside`. Sida gjev oversikt, men har ikkje løyndomar, GitHub-token eller direkte skrivetilgang.

## Brukarflate

Sida hentar offentleg commitmetadata frå GitHub API. Kvar oppføring viser kort commit-ID, commitmelding, forfattarnamn og tidspunkt. Brukaren kan kopiere full commit-ID eller opne commiten i GitHub.

Ei gjenoppretting startar frå GitHub Actions-workflowen «Gjenopprett tidlegare versjon». GitHub krev innlogging og skrivetilgang til repoet.

## Trygg gjenoppretting

Workflowen krev:

1. full commit-SHA;
2. stadfestingsteksten `GJENOPPRETT`;
3. at commiten finst og er ein stamfar til gjeldande `main`;
4. at valt innhald faktisk skil seg frå gjeldande versjon.

Før endringa lagar workflowen eit arkiv av gjeldande `HEAD` og lastar det opp som GitHub Actions-artifakt i 30 dagar. Workflowen lagar deretter ein ny commit som gjer arbeidsinnhaldet likt den valde eldre commiten. Historikken vert ikkje sletta eller omskriven. Push til `main` utløyser eksisterande Vercel-produksjonsdeploy.

## Avgrensingar

- Sida viser Git-versjonar, ikkje lokale ZIP-backupar i OneDrive.
- Lokale ZIP-backupar er eit separat siste sikringslag.
- GitHub API kan rateavgrense anonyme kall. Då kan brukaren framleis opne workflowen direkte.
- Workflowen rullar tilbake heile repo-innhaldet til vald commit, ikkje berre éi nettsidefil.
- Dersom branch protection krev pull request eller andre kontrollar, vil direkte push frå workflowen stoppe. Då må policyen tilpassast eller gjenopprettinga gjennomførast via pull request.

## Test

Første test skal bruke ein ufarlig testcommit som straks kan gjenopprettast. Kontroller at:

- `/versjonar/` lastar commitlista;
- commit-ID kan kopierast;
- workflowen krev innlogging og stadfesting;
- valt commit vert validert;
- sikringsartifakten vert oppretta;
- ny gjenopprettingscommit vert pusha til `main`;
- Vercel-prosjektet `infbv-nettside` vert `READY`;
- hovudportalen peikar på rett innhald.

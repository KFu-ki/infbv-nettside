# Bruk frå mobil og nettbrett

## 1. Bruke den publiserte nettsida

Opne nettadressa som eigaren har delt, i nettlesaren på mobil/nettbrett. Dette brukar nettsida; det endrar ikkje Git-filer.

## 2. Redigere filer i GitHub-nettlesaren

Logg inn på GitHub, vel repo og fil, og bruk nettredigering. Lag helst branch og pull request; sjå diff før innsending. Endringar vert ikkje publiserte før dei kjem inn på branch som hosting faktisk overvaker.

## 3. GitHub Codespaces

Opne repoet i Codespaces for eit skybasert utviklingsmiljø. Kontroller at Python-versjon og avhengnader er rette, les `AGENTS.md`, køyr kontrollar, og lag pull request. Codespaces gir ikkje automatisk produksjonsgodkjenning.

## 4. KI-app eller agent mot GitHub

Ein KI-app kan hjelpe med repoet dersom han har naudsynt tilgang. Gje minst mogleg tilgang; les agentdiff og kontrollresultat. Agenten må følgje `AGENTS.md`. Agentar deler prosjektfiler berre når dei arbeider mot same repo/branch; dei deler ikkje nødvendigvis chatloggar, kontekst, kontoar eller lokale filer.

## 5. Godkjenne pull requests og preview

Gjennomgå diff, CI-resultat, data/personvern og relevante Vercel-preview på einingar der dei er lesbare. Godkjenn berre endringar du forstår og har fullmakt til å godkjenne. Faktisk preview-oppsett må kontrollerast i GitHub/Vercel.

## 6. Publisere til produksjon

Produksjon vert oppdatert etter repoets faktiske branch- og hostingpolicy. Ein chatkommando på iPhone/iPad publiserer ingenting av seg sjølv. Automatisk publisering føreset ei faktisk filendring i Git-repoet, commit og push til branch som Vercel overvaker (eller anna stadfesta deployflyt). Følg [deployrettleiinga](../operations/vercel.md); ikkje push eller publiser utan godkjenning.

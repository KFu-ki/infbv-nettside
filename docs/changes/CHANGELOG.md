## 2026-11-09 — Emnenamn og Copilot-arbeidsflyt

- Oppdaterte INFBV-framsida med SAJ101-koden og fullført INF213-visingsnamn frå revisjonstabellen.
- La til studiemodellregister med bokmåls- og engelsk omsetjingskolonnar, og gjenbrukbar Copilot-prompt.

# Endringslogg

## 2026-11-09 — Tema og visuell justering av INFBV-framsida

### Lagt til

- Temaknapp i toppfeltet som byter mellom lyst og mørkt tema og hugsar valet i nettlesaren.
- Eit lyst fargeoppsett med kontrastjusterte amber-/indigoaksentar.

### Endra

- Kompetansetrappa tek mindre plass på store skjermar, og viser trinnnummer på smale skjermar.

## 2026-11-09 — Ny tilgjengelegheitsgjennomgang

### Endra

- Bytte ut mørke emneetikettar i lyst tema med lyse flater og lesbar tekst; styrkte fokusmarkering og aksentkontrast.
- Gjorde temabrytar, kompetansetrinn, navigasjonsmeny og hurtignavigasjon tilgjengelege for skjermlesar og tastatur.
- Gav kontrollane større trykkflater og lét tastaturbrukarar opne emne med tydeleg fokus på emneoverskrifta.

## 2026-11-08 — Prosjektoppstart og dokumentasjonsgrunnlag

### Lagt til

- Leverandøruavhengige agentinstruksjonar, Copilot-/Claude-/Gemini-adapterar og gjenbrukbare promptar.
- Prosjektdokumentasjon for arkitektur, kjelder, drift, mobil, VS Code, ADR-ar og skript.
- Dokumentasjonskontroll, trygg CI og mappestruktur for data.

### Endra

- README viser no til dokumentasjonsindeksen.
- `.gitignore` ignorerer backup og rå/genererbare data etter dokumentert policy.

### Fjerna

- Ingen.

### Retta

- Ingen kodefeil retta i denne oppstarten.

### Tryggleik

- `.env.example` dokumenterer at appen ikkje krev miljøvariablar; verkelege løyndomar vart ikkje oppretta.
- Dokumentert at timeplanutdraget inneheld tilsettnamn, med personvernklassifisering som uavklart.

### Dokumentasjon

- Registrert eksisterande deployduplisering og manglande test-/lint-/byggkommandoar som uavklart.

## 2026-11-08 — Utvida utviklar- og agentmanual

### Lagt til

- Detaljerte introduksjons-, backend-, frontend-, komponent-, dataflyt-, JSON-kontrakt-, budsjettmodell-, design- og gjenoppbyggingsrettleiingar.
- Adapterar for Cursor, Windsurf, Cline, Roo Code, Continue og Amazon Q som viser til `AGENTS.md`.
- Lokalt kunnskapsoppslag, Markdown-katalog og standardbibliotek-basert Markdown/PDF-manual med CI-artifakt.
- Generert kodekart med kontrollsummar som gjer at kjeldekodeendringar krev ny manuell bygging.
- Kjeldebasert diskusjonssamandrag med eksplisitt skilje mellom kjende avgjerder og uavklarte punkt.

### Endra

- `AGENTS.md` og Copilot-instruksjonane viser no til lokalt oppslag og regenerering av manual.
- Indeksen dekkjer nye dokument, adapterar, scripts og genererte manualar.
- Dokumentasjonskontroll validerer no indeksdekning, adapterreferansar og fersk generert manual.

### Fjerna

- Ingen.

### Retta

- Ingen applikasjonsfeil retta.

### Tryggleik

- Kunnskapsoppslag held seg lokalt; CI lastar opp ein avgrensa dokumentasjonsartefakt og skriv ikkje til repoet.
- Ingen provider-modell, skjult prompt, kontominne eller chatlogg vert automatisk endra.

### Dokumentasjon

- Skildra faktiske kodeflater, API, statiske dataflytar, observerte designmønster og kodedefinerte budsjettformlar.
- Noterte at historiske fulltranskript, Vercel-innstillingar og eksterne dataløyve ikkje ligg verifiserte i repoet.

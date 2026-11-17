## 2026-11-09 — Emnenamn på nynorsk, bokmål og engelsk

- Oppdaterte dei 11 bachelor-emna i INFBV-framsida og studiemodellregisteret frå `Nye emnenamn.xlsx`. Fjerna eldre «PR og kommunikasjon 1/3/5»-prefiks.
- Fylte bokmåls- og engelske namn i Excel-arbeidsboka; dokumenterte to openberre kjeldekorreksjonar.

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
## 2026-11-09 — Rettleiing for Microsoft Copilot Chat (Basic)

- La til brukarrettleiing for filopplasting og avgrensingar i vanleg Copilot Chat, ei kort prosjektkontekstfil og ein prompt for INFBV-spesialistagent i Agent Builder.
- Dokumenterte at grunnkontoen ikkje har automatisk tilgang til lokal repo eller Microsoft Graph-arbeidsdata; varig agentkunnskap frå tenant-filer kan krevje lisens eller målt bruk.
## 2026-11-09 — Copilot-startprompt med publiseringsfullmakt

- La til ein startprompt som ber Copilot teste repo-/GitHub-/Vercel-tilgang, lese prosjektkjeldene og utføre oppgåverelatert commit/push/deploy utan ny godkjenning per steg.
- Avgrensa fullmakta til eksisterande repo, `main` og Vercel-prosjektet `infbv-nettside`; tilgangen må vere teknisk aktiv, og personvern-/konfliktstopp gjeld framleis.

## 2026-11-17

- La til ein første språkveljar på INFBV-framsida med nynorsk og engelsk.
- Engelsk vising prioriterer trinn 4 og 5 i kompetansetrappa og MMP311. Språkvalet kan opnast direkte med `?lang=en` og vert lagra lokalt i nettlesaren.

- Retta engelsk vising slik at sjølve kompetansetrappa, alle fem nivånamna, nivåetikettane, forklaringane og tilgjengeetikettane vert omsette.

## 2026-11-17 — MMP311 Learning Hub
- La til ei engelskspråkleg læringsflate på `/mmp311/` med kursoversyn, læringssti, PRK, SOFT, FIVER og kontrollerte kjelder.
- Kopla MMP311-emnevisinga på INFBV-framsida til læringsflata.
- La til originale, tilgjengeleg skildra modellillustrasjonar utan persondata.

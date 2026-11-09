## 2026-11-09 — Studiemodellregister og Copilot

- Leste og visuelt kontrollerte revisjonstabellen på side 1. Oppdaterte berre emnekoden SAJ101 og det utvida INF213-namnet; MEV221 er halde på nynorsk.
- Oppretta `INFBV-studiemodell/` med arbeidsbok, Markdown-register og gjenbrukbar GitHub Copilot IDE-prompt.
- Kontrollerte repoet sin GitHub/Vercel-deployflyt før publisering.

# Prosjektjournal

## 2026-11-09 — Lyst og mørkt tema på INFBV-framsida

- Gjennomgjekk den publiserte forsida visuelt: mørk marinepalett, kompetansetrapp og emnekort; smal vising gjorde trappa til umerkte fargefelt.
- La til tastaturtilgjengeleg temaknapp med lagring i `localStorage`, lys fargepalett, kontrastjusterte aksentar og synlege trinnnummer på smale skjermar.
- Kontrollerte temabyting og utsjånad på lokal statisk server. Produksjonsdeploy vart ikkje utført.

## 2026-11-09 — Tilgjengelegheitsgjennomgang av lyst tema

- Ny visuell kontroll synte at emneetikettar framleis hadde mørk bakgrunn og svak tekst i lyst tema.
- La om flater og tekstfargar, gav fokusmarkering høg kontrast, og gjorde trinn, meny og hurtignavigasjon tastaturstyrte med ARIA-tilstand og Escape-lukking.
- Målte representative tekstpar til minst 6,08:1 mot 4,5:1-kravet for vanleg tekst i WCAG 2.2 AA. Full konformitetsrevisjon er ikkje utført.
- Lokal nettlesarkontroll stadfesta temaendring og lagring etter omlasting, trinnval med mellomrom og opning/lukking av meny med Escape.

## 2026-11-08 — Dokumentasjons- og agentoppstart

- Kontrollerte rein `main`-arbeidskopi, repo-layout, README, Python-avhengnader, skript, JSON og GitHub Actions.
- Kartla HTML/CSS/JavaScript, FastAPI/Uvicorn, lokale Excel-importar og statiske JSON-datakjelder.
- Oppretta backup av 25 versjonskontrollerte filer i `_backup/2026-11-08_210007/`; ignorerte cache-filer vart ikkje kopierte.
- Oppdaga to GitHub Pages-workflowar med overlappande deployutløysing. Kva som skal vere autoritativt er ikkje avgjort.
- Vercel-kopling, datalisens/eigarskap og personvernstatus vart ikkje verifiserte.
- Dokumentasjons-/lenkjesjekk, Python-syntaks, JSON-filer, CLI-hjelp, YAML/JSON-konfigurasjon og diff-/whitespacekontrollar bestod.
- App-test, automatiserte testar, lint og bygg vart ikkje køyrde; dei er ikkje sette opp lokalt/i repoet. Ingen deploy, commit eller push vart utført.

## 2026-11-08 — Utvida manual og kunnskapsoppslag

- Kartla eksisterande FastAPI-ruter, JavaScript-UI, JSON-konsumentar, dataimport og XLSX-generator.
- Dokumenterte frontend/backend-arkitektur, dataflyt, JSON-felt, scenarioformlar frå kode, observerte UI-design og stegvis gjenoppbygging.
- Laga tynne Cursor/Windsurf/Cline/Roo/Continue/Amazon Q-adapterar; felles reglar vert framleis haldne i `AGENTS.md`.
- Laga lokale scripts for dokumentoppslag og generering av Markdown-katalog/manual/PDF. CI skal validere kjeldeindeks og kunne levere manual som Actions-artifakt, utan commit eller deploy.
- Samtalehistorikk i repoet er ikkje fullstendig; loggen er avgrensa til samandrag som kan knytast til brukarønske eller dokumentert repo-praksis.
- Dokumentasjons-/indekssjekk, generator `--check`, lokalt oppslag, Python-syntaks, JSON-filer, CLI-hjelp, YAML/JSON-konfigurasjon og `git diff --check` bestod. PDF-generatoren produserte ei gyldig PDF 1.4-fil med 45 sider.
- Målklientane for agentadapterane er ikkje installerte/verifiserte; app-test, lint, bygg, ekstern hosting og visuell PDF-gjennomgang vart ikkje køyrde.

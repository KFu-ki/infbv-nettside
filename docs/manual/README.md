# Generert utviklingsmanual

`code-map.md`, `development-manual.md`, `knowledge-catalog.md` og `development-manual.pdf` er genererte leveransar. Rediger kjelde-Markdown i prosjektet, ikkje desse utfilene.

```bash
python3 scripts/build_manual.py
```

Generatoren brukar berre Python-standardbiblioteket. Han lagar eit kodekart med kjeldebaner, synlege symbol/metadata og korte SHA-256-prefiksar for å oppdage kodeendringar, og samlar deretter kodekart og Markdown-kjelder til ein manual. PDF-en er tekstorientert med innebygd Helvetica-font; han har ikkje bilete, klikkbare lenkjer eller rik Markdown-layout. Kjeldene beheld full Markdown-formatering og lenkjer. Opne PDF-en lokalt for visuell gjennomgang.

Kontroller at genererte filer samsvarer:

```bash
python3 scripts/build_manual.py --check
```

CI kontrollerer at manualen er fersk. Ein eigen GitHub Actions-jobb byggjer og tilbyr PDF-en som ein nedlastbar workflow-artifact; han pushar/committar ikkje endringar. Manuell køyring oppdaterer arbeidskopien; vurder diff og commit berre etter godkjenning.

Utvalet omfattar repo-Markdown og Markdown-liknande agentfiler (`.mdc` og `.windsurfrules`), inkludert adapterar og promptar, og kodekart for kjelde-/konfigurasjonsfiler. Det ekskluderer backup, Git-metadata, cache og sjølve genererte outputfiler for å unngå rekursjon. Hashar oppdagar endring, men erstattar ikkje menneskeleg oppdatering av forklarande dokumentasjon. Ikkje legg sensitive notat eller løyndomar i Markdown med forventning om at PDF-bygg vil halde dei private.

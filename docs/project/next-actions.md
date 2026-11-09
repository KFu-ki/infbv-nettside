# Neste steg

Prioritering: `No` → `Neste` → `Seinare`. `Blokkert` krev avklaring før gjennomføring.

## No

- **Gjennomgå automatisk manual og provider-adapterar i målklientane.** Filer: `docs/manual/development-manual.pdf`, `.cursor/`, `.clinerules/`, `.roo/`, `.continue/`, `.amazonq/`. Ferdig når PDF er visuelt kontrollert og dei installerte klientane les adapteren som tiltenkt. **Avhengnad:** målklient/installasjon må vere tilgjengeleg.
- **Avklar dei lokale GitHub Pages-workflowfilene.** Filer: `.github/workflows/static.yml`, `.github/workflows/deploy-pages.yml` (uversjonerte i denne arbeidskopien). Ikkje legg dei til/publiser dei før eigar stadfestar om Pages skal vere ein ekstra produksjonsflate.
- **Avklar offentleg data og personvern.** Filer: `budsjett/data.json`, `timeplanside/timeplan-2027.json`, `docs/data-sources/source-register.md`. Ferdig når dataeigar stadfestar publiseringsgrunnlag, tilgang og handtering av tilsettnamn/eksterne kommentarar. **Avhengnad:** dataeigar/personvernansvarleg.

## Neste

- **Avklar Vercel-preview-policy.** Fil: `docs/operations/vercel.md`. Produksjonsprosjekt og `main`-branch er stadfesta; preview-reglane er framleis ukjende.
- **Legg til målretta funksjons- og datavalideringstestar.** Filer: `app.py`, `xlsx_export.py`, `scripts/`, nye testfiler. Ferdig når minst dataimport og sentrale eksport-/berekningsreglar har repeterbare testar og ein dokumentert kommando.
- **Dokumenter eigarskap og lisens for datakjeldene.** Fil: `docs/data-sources/source-register.md`. Ferdig når kjeldeeigarane stadfestar felt som no står «ukjend».

## Seinare

- **Vurder standard Python lint/type-kontroll.** Filer: `requirements.txt`, eventuell prosjektkonfigurasjon, CI. Ferdig når eksisterande kode er baseline-kontrollert og kommandoen køyrer i CI utan nye, urelaterte verktøy.
- **Vurder datastruktur og arkivering av genererte eksportar.** Filer: `data/README.md`, `.gitignore`, `docs/data-sources/source-register.md`. Ferdig når eigar har avgjort kva som skal versjonerast; ikkje flytt eksisterande data utan eigen validering.

## Blokkert

- **Endre eller republisere rådata.** Filer: lokale arbeidsbøker og importskript. Blokkert til kjeldeeigar, tilgang og personvernstatus er stadfesta; rådata skal ikkje endrast manuelt.

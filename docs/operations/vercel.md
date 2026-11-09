# Vercel og publisering

## Det som er verifisert i repoet

- Git remote `origin` er `https://github.com/KFu-ki/infbv-nettside.git`; lokal branch var `main` ved kontroll.
- Vercel-prosjektet `infbv-nettside` er kopla til GitHub-repoet. Push til `main` utløyser produksjonsdeploy; produksjonsalias er `infbv-nettside.vercel.app`.
- Ingen `vercel.json` eller `package.json` finst. Python-avhengnader er i `requirements.txt`; lokalt startpunkt er `uvicorn app:app --reload`.
- Arbeidskopien inneheld to uversjonerte GitHub Pages-workflowfiler som ikkje er med i denne publiseringa. Dei skal ikkje reknast som kontrollert produksjonsveg.

## Bygg, miljø og output

Det er ikkje deklarert npm/pakkebehandlar, frontend-byggekommando eller bygg-output. Dei statiske filene ligg i repoet. FastAPI-data-/Excel-endepunkt krev at Python-appen køyrer; statiske datafiler kan lesast utan backend. Verifiser Vercel sin faktiske runtime/bygginnstilling før du legg til konfigurasjon.

Ingen miljøvariablar er lesne av applikasjonskoden ved siste kontroll. [`.env.example`](../../.env.example) seier det same. Ikkje lag verkelege løyndomar eller legg dei i Git. Dersom seinare endringar treng miljøvariablar, oppdater `.env.example` og Vercel-konfigurasjonen med namn/føremål, ikkje verdiane.

## Kopling og publiseringspolicy

| Ledd | Kjent status |
|---|---|
| Lokal Git | Repo ligg på branch `main`; kontroller `git status` før arbeid |
| GitHub | `origin` peikar på `KFu-ki/infbv-nettside` |
| GitHub-branch | Eksisterande Actions-filer lyttar på `main` |
| Vercel-prosjekt | `infbv-nettside`, kopla til `KFu-ki/infbv-nettside` |
| Preview | Ikkje kontrollert |
| Production | Branch `main`; push gav READY produksjonsdeploy med alias `infbv-nettside.vercel.app` |

## Trygg arbeidsflyt

1. KI endrar filer og viser diff.
2. Køyr relevante kontrollar og bygg; rapporter alt som manglar/feilar.
3. Brukaren vurderer endringane, data/personvern og deploymål.
4. Commit og push skjer berre etter uttrykkjeleg godkjenning.
5. Når push er godkjend, kontroller at riktig commit er READY og aliaset peikar på henne.

Ei chatkommando utløyser ikkje i seg sjølv commit, push eller publisering. Ikkje start deploy automatisk frå agent eller lokal arbeidskopi.

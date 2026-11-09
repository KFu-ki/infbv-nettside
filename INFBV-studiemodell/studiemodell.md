# INFBV-studiemodell

Dette registeret samlar emnekodar og visingsnamn for kompetansetrappa på INFBV-framsida. Bruk det når du oppdaterer emneoversikta eller legg til språkvariantar. Excel-arbeidsboka `studiemodell.xlsx` har same emneliste og eigne kolonnar for bokmål og engelsk.

## Kjelde og språk

- Revisjonstabellen: `Revisjon nov 2026.pdf`, side 1. Ho listar obligatoriske emne og studiepoeng per semester.
- Masteremne som ikkje står i revisjonstabellen, er tekne frå den eksisterande INFBV-framsida.
- Visingsnamna nedanfor følgjer nynorsk der det finst ein nynorsk variant. Engelske emnenamn blir ståande på engelsk når det er namnet som er brukt på nettsida.
- PDF-en har «Medievitenskap» for MEV221. Nettsida brukar nynorskforma «Medievitskap», som skal behaldast.
- Excel-kolonnane for bokmål og engelsk er tomme fram til eigar legg inn kontrollerte omsetjingar. Ikkje omset offisielle emnenamn automatisk.

## Endringar mot nettsida

| Emnekode | Gjeldande vising | Kva vart endra |
|---|---|---|
| SAJ101 | Innføring i norsk samfunnsliv | Koden var SAL101 på nettsida. Namnet er uendra. |
| INF213 | Arbeidslivsrelevans gjennom praksis / Internasjonalisering/utveksling | Tok med «Internasjonalisering/utveksling» frå den andre tekstlina under INF213 i revisjonstabellen. |

Alle andre namn frå revisjonstabellen er alt i samsvar med nettsida, med nynorsk skrivemåte og mindre skilnader i tankestrek/typografi. Ikkje normaliser eller skriv om dei utan ei ny kjelde.

## Emneliste på nettsida

| Trinn | Emnekode | Visingsnamn | Kjelde i revisjonen | Semester | Studiepoeng | Merknad |
|---|---|---|---|---|---:|---|
| 1 | INF131 | PR og kommunikasjon 1: Innføring med praktiske øvingar | PR og kommunikasjon 1: Innføring med praktiske øvingar | 26 H | 15 | Uendra |
| 1 | SAJ101 | Innføring i norsk samfunnsliv | Innføring i norsk samfunnsliv | 26 H | 15 | Kode retta frå SAL101 |
| 1 | INF142 | Arbeidsliv og kommunikasjon i praksis | Arbeidsliv og kommunikasjon i praksis | 27 V | 10 | Uendra |
| 1 | KOM102 | Journalistiske metodar i kommunikasjonsarbeid | Journalistiske metodar i kommunikasjonsarbeid | 27 V | 10 | Uendra |
| 1 | MEV131 | Medievitskap 1 — Medium, offentlegheit og ytringsfridom | Medievitskap 1 - Medium, offentlegheit og ytringsfridom | 27 V | 10 | Nynorsk; typografi justert |
| 2 | KOM201 | Crisis Communication | Crisis Communication | 27 H | 10 | Uendra |
| 2 | KOM202 | Kommunikasjonsprosjekt | Kommunikasjonsprosjekt | 27 H | 10 | Uendra |
| 2 | MEV132 | Medievitskap 2 — Media, kommunikasjon og makt | Medievitskap 2 - Media, kommunikasjon og makt | 27 H | 10 | Nynorsk; typografi justert |
| 3 | INF211 | PR og kommunikasjon 3: Samfunnskommunikasjon og CSR | PR og kommunikasjon 3: Samfunnskommunikasjon og CSR | 28 V | 15 | Uendra |
| 3 | MEV221 | Medievitskap 3 — Frå fag til forsking: Korleis analysere medium | Medievitenskap 3 - Frå fag til forsking: Korleis analysere medium | 28 V | 15 | Nynorsk på nettsida; PDF-teksten er bokmål |
| 3 | INF213 | Arbeidslivsrelevans gjennom praksis / Internasjonalisering/utveksling | Arbeidslivsrelevans gjennom praksis; Internasjonalisering/utveksling | 28 H | 30 | Samla dei to tekstlinene under INF213 |
| 4 | MMP301 | Storytelling, Representation and Rhetoric | — | — | — | Masteremne; ikkje i PDF-tabellen |
| 4 | MMP302 | Media, Professions and Society | — | — | — | Masteremne; ikkje i PDF-tabellen |
| 4 | MMP303 | Undersøkande journalistikk | — | — | — | Valemne; ikkje i PDF-tabellen |
| 4 | MMP308 | Media Producing | — | — | — | Valemne; ikkje i PDF-tabellen |
| 4 | MMP309 | Professional Media Practice | — | — | — | Valemne; ikkje i PDF-tabellen |
| 4 | MMP310 | Web Documentary | — | — | — | Valemne; ikkje i PDF-tabellen |
| 4 | MMP311 | Risk Communication and Issue Management | — | — | — | Valemne; ikkje i PDF-tabellen |
| 4 | MMP317 | Design Strategies and Concepts | — | — | — | Valemne; ikkje i PDF-tabellen |
| 4 | IPA302 | Process Facilitating | — | — | — | Valemne frå anna masterprogram; ikkje i PDF-tabellen |
| 4 | IPA303 | Public Sector Leadership and Communication | — | — | — | Valemne frå anna masterprogram; ikkje i PDF-tabellen |
| 5 | MMP312 | Research Design and Methods | — | — | — | Masteremne; ikkje i PDF-tabellen |
| 5 | MMP313 | Project Based Master Thesis | — | — | — | Eitt av to oppgåvealternativ; ikkje i PDF-tabellen |
| 5 | MMP314 | Written Master Thesis | — | — | — | Eitt av to oppgåvealternativ; ikkje i PDF-tabellen |

## Vedlikehald

1. Oppdater emnenamn og omsetjingar i `studiemodell.xlsx`, og spegl endringane i denne Markdown-tabellen.
2. Kontroller at kvar emnekode framleis finst i `app.js` under rett trinn. Oppdater `STAGES` og eventuelle koplingar i `SKILLS` berre når emnekoden faktisk har endra seg.
3. Endre berre namn/kodar som er dokumenterte som endra. Behald etablerte nynorske visingsnamn elles.
4. Oppdater dei relevante felta i `app.js`, kontroller framvisinga, bygg manualen og følg prosjektets deployrutine.
5. Fyll språkvariantar berre når eigar har godkjent omsetjinga. La ukjende variantar stå tomme.

# Arbeide med INFBV i vanleg Microsoft Copilot Chat

Denne rettleiinga er for Copilot Chat (Basic) med Høgskulen i Volda-konto. Ho føreset ikkje GitHub Copilot, VS Code-agent, Copilot Code, Copilot Studio eller lokal disktilgang.

## Kva grunnversjonen kan gjere

Copilot Chat kan svare frå offentleg nettinnhald og lese filer du legg ved i chatten. Microsoft listar Markdown (`.md`), Excel (`.xlsx`) og PDF som støtta filtypar. Støttesida oppgir opptil 20 filer per samtale og 50 MB per fil; kapasitet og funksjonar kan variere med utrulling og HVO sine innstillingar.

Utan Microsoft 365 Copilot-lisens har chatten ikkje generell Microsoft Graph-tilgang til arbeidsfiler, e-post, Teams eller SharePoint. Han ser heller ikkje automatisk filer på Macen eller i Git-klonen. Legg filene ved sjølv, eller bruk offentleg nettinnhald Copilot faktisk kan opne. Ikkje ta for gitt at Copilot har lese heile GitHub-repoet fordi du nemner repo-namnet.

## Kort arbeidsflyt for kvar oppgåve

1. Start ein chat med HVO-jobbkontoen.
2. Legg ved `docs/agents/copilot-chat-basic-context.md` frå repoet.
3. Legg ved berre dei kjeldefilene oppgåva treng. For emnenamn: `INFBV-studiemodell/studiemodell.md`, `INFBV-studiemodell/studiemodell.xlsx`, ny godkjend namnekjelde og `app.js`. For design: relevante filer som `index.html`, `styles.css`, `app.js` og `docs/design/visual-design.md`.
4. Lim inn startprompten nedanfor og skriv oppgåva. Be Copilot lista vedlegga han faktisk brukte og peike på kjelde/fil/ark.
5. Dersom Copilot har verktøytilgang til GitHub og Vercel, bruk [startprompten for repoarbeid og deploy](copilot-chat-start-prompt.md). Ho gir ei avgrensa uttrykkjeleg fullmakt til å pushe og publisere oppgåverelaterte endringar til eksisterande produksjon.
6. Dersom Chat berre kan lese vedlegg og offentleg nett, be om eit avgrensa forslag eller ein diff. Legg sjølv endringane inn i arbeidskopien og køyr kontrollane lokalt.
7. Kontroller at eventuelle kontrollar og deployar Copilot rapporterer faktisk er gjennomførte.

### Startprompt for ein vanleg chat

```text
Du skal hjelpe meg med KFu-ki/infbv-nettside. Eg brukar Microsoft Copilot Chat (Basic), så du har berre tilgang til vedlagde filer og offentleg nettinnhald du faktisk kan opne. Du har ikkje automatisk tilgang til lokal disk, Git-status, GitHub-skriving eller terminal.

Les først vedlagde «INFBV-kontekst for Copilot Chat». Bruk repo-filer, ikkje gamle chatminne, som prosjektkjelde. Sei kort kva vedlegg du faktisk har lese. Be meg om ei konkret manglande kjeldefil dersom ho trengst. Ikkje lat som du har lese repoet eller køyrt kommandoar.

Oppgåve: [skriv oppgåva her]
```

## Lage ein varig spesialistagent når funksjonen finst

Microsoft Agent Builder kan vere tilgjengeleg frå `Agents` → `New agent`. Prøv prompten i [agentprompten](../agents/copilot-chat-specialist-agent-prompt.md). Agent Builder og agenttypar kan vere styrte av lisens og administrator. Agentar med offentlege kjelder kan vere tilgjengelege for Copilot Chat (Basic) utan ekstra kostnad. Bruk av OneDrive/SharePoint eller innebygde filer som varig agentkunnskap kan krevje lisens eller målt Copilot Studio-bruk. Prompten er laga utan slike krav.

Om `New agent` manglar, bruk startprompten ovanfor i vanleg Chat og legg ved kontekstfila og relevante kjeldefiler i kvar ny samtale.

## Kostnad og personvern

Copilot Chat (Basic) har standard tilgang og kapasitetsgrenser; han lovar ikkje uavgrensa bruk. Filopplasting i ein vanleg chat er noko anna enn å leggje filer inn som varige kunnskapskjelder i ein agent. Følg eventuelle grenser som appen viser.

Når du er innlogga med jobb-/skulekonto, har Copilot Chat enterprise datavern, men promptar og svar kan loggførast og vere tilgjengelege for HVO sin IT-administrator. Følg HVO-reglane for dataklassifisering. Ikkje last opp løyndomar eller personopplysningar, særleg ikkje tilsettnamn frå timeplandata.

## Offisielle Microsoft-kjelder

- [Copilot Chat med og utan Microsoft 365 Copilot-lisens](https://support.microsoft.com/en-us/microsoft-365-copilot/how-copilot-chat-works-with-and-without-a-microsoft-365-copilot-license)
- [Filopplasting i Microsoft Copilot](https://support.microsoft.com/en-us/microsoft-365-copilot/file-upload-in-microsoft-copilot)
- [Agentar for Microsoft Copilot Chat](https://learn.microsoft.com/en-us/copilot/agents)
- [Lisensar og kostnad for agentar](https://learn.microsoft.com/copilot/agents)
- [Datavern for arbeid/skule-konto](https://support.microsoft.com/en-us/privacy/data-protection-when-using-microsoft-365-copilot-chat-for-work-or-school)

Kontrollert mot Microsoft-dokumentasjon 2026-11-09. Appfunksjonar og administratorinnstillingar kan endre seg.

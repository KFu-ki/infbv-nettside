# Automatisk backup av INFBV-fagportalen

## Formål

Backupordninga vernar den autoritative arbeidskopien av `KFu-ki/infbv-nettside`, inkludert Git-historikk, versjonerte filer og lokale filer som enno ikkje er committe. Backupane vert lagra utanfor repoet i OneDrive.

## Autoritativ arbeidskopi

```text
/Users/kristian/Library/CloudStorage/OneDrive-HøgskuleniVolda/FOU/infbv-nettside/infbv-nettside/infbv-nettside
```

Dei to ytre mappene med same namn er nøsta kopiar og skal ikkje brukast til commit, push eller deploy.

## Automatikk

macOS LaunchAgent `no.hivolda.infbv.backup` køyrer backup:

- ved innlogging eller når agenten vert lasta;
- kvar 30. minutt medan brukaren er innlogga;
- før kvar Git-commit gjennom `.git/hooks/pre-commit`.

Det er ikkje teknisk mogleg å garantere ein backup før kvart enkelt tastetrykk eller kvar filredigering. Intervallbackup og pre-commit-backup reduserer tidsrommet for mogleg tap til høgst om lag 30 minutt, så lenge OneDrive og LaunchAgent fungerer.

## Backupinnhald og lagring

Backupen vert laga som ei full ZIP-fil med `.git`-mappa inkludert. Kvar ZIP får ei SHA-256-kontrollsum. Dei 30 nyaste ZIP-backupane vert bevarte.

```text
/Users/kristian/Library/CloudStorage/OneDrive-HøgskuleniVolda/FOU/INFBV-backups
```

Backupane skal ikkje leggjast i Git eller deployast til Vercel.

## Installerte filer

```text
~/.local/bin/infbv-backup.sh
~/Library/LaunchAgents/no.hivolda.infbv.backup.plist
~/Library/Logs/INFBV-backup/backup.log
~/Library/Logs/INFBV-backup/backup-error.log
.git/hooks/pre-commit
```

Dersom repoet hadde ein eksisterande pre-commit-hook, vert han bevart som `.git/hooks/pre-commit.local` og køyrd etter backupen.

## Kontroll

Kontroller agenten:

```bash
launchctl print gui/$(id -u)/no.hivolda.infbv.backup
```

Start ein kontrollert backup straks:

```bash
launchctl kickstart -k gui/$(id -u)/no.hivolda.infbv.backup
```

Kontroller loggane:

```bash
tail -50 "$HOME/Library/Logs/INFBV-backup/backup.log"
tail -50 "$HOME/Library/Logs/INFBV-backup/backup-error.log"
```

Kontroller den nyaste ZIP-fila:

```bash
latest=$(find "$HOME/Library/CloudStorage/OneDrive-HøgskuleniVolda/FOU/INFBV-backups" -name 'infbv-nettside-*.zip' -type f -print0 | xargs -0 ls -t | head -1)
unzip -t "$latest"
shasum -a 256 -c "$latest.sha256"
```

## Gjenoppretting

1. Stopp arbeid i repoet.
2. Finn den nyaste verifiserte ZIP-fila.
3. Pakk henne ut i ei ny mappe, ikkje over den aktive arbeidskopien.
4. Kontroller `git status`, `git log -1 --oneline` og nødvendige filer.
5. Flytt berre verifisert innhald tilbake. Ikkje overskriv aktiv arbeidskopi ukritisk.

## Feilsøking

Dersom loggen viser `Operation not permitted`, må macOS gje Terminal eller bakgrunnsprosessen tilgang til OneDrive-området under **Systeminnstillingar → Personvern og tryggleik**. Kontroller òg at OneDrive køyrer og at backupmappa er tilgjengeleg lokalt.

Dersom agenten ikkje er lasta, køyr:

```bash
launchctl bootstrap gui/$(id -u) "$HOME/Library/LaunchAgents/no.hivolda.infbv.backup.plist"
launchctl kickstart -k gui/$(id -u)/no.hivolda.infbv.backup
```

## Forvaltingsregel

Før større strukturelle endringar, rådataimport eller gjenoppretting skal ein framleis kontrollere at ein fersk backup finst. Automatikk reduserer risiko, men erstattar ikkje kontroll før handlingar som kan øydeleggje data.

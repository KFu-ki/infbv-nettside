# Backup og gjenoppretting

## Oppstartsbackup

Før dokumentasjonsendringane vart dei 25 versjonskontrollerte filene kopierte frå `HEAD` med `git archive` til `_backup/2026-11-08_210007/`. Backupen er ei lokal, Git-ignorert kopi av tracked-filer, ikkje kryptert og ikkje utanfor denne maskina/synka OneDrive-rot. Ignorerte cache-filer og eksterne arbeidsbøker er ikkje med. Denne rapporten dokumenterer kva som vart gjort; ho garanterer ikkje backupintegritet.

## Rutine før risikofylt endring

- Kontroller `git status --short`; bevar urelaterte endringar.
- For kode/dokumentasjon kan Git og ein verifisert kopi vere tilstrekkeleg. Før data- eller strukturendring: finn kjeldeeigar, tilgangsreglar og gjenopprettbar kopi.
- Legg backup utanfor vanleg kjeldekode ved behov; namngje med dato/klokkeslett. Ikkje kopier `.git`, cache, avhengnadsmapper eller byggartefaktar.
- Kontroller filtal/storleik og opne eit lite utval av backupen før arbeid held fram.
- Ikkje legg backup av sensitive eller store data i Git. Krypter og lagre etter organisasjonen sine reglar.
- Stopp dersom trygg backup eller trygg gjenoppretting ikkje kan stadfestast.

## Gjenoppretting

Gjenopprett berre dei uttrykkeleg endra filene frå ein verifisert backup etter å ha kontrollert målsti og gjeldande arbeidskopi. Samanlikn resultatet med kjelda og køyr relevante valideringar. Ikkje overskriv seinare arbeid blindt. For datafiler må proveniens og godkjenning frå dataeigar vere på plass.

`_backup/` er ignorert i Git. Oppstartsbackupen vart ikkje commit/pusha og inneheld berre versjonskontrollerte filer frå `HEAD`.

---
sidebar_position: 3
---

# Agent-instructies

Zonder expliciete instructies gedraagt een OpenCode-agent zich
niet-deterministisch: de outputtaal varieert, codepatronen zijn inconsistent
en de agent heeft geen kennis van de architectuurkeuzes van je team. Xpedite
geeft elke agentrun een vaste set instructies mee die dit gedrag beperken.

## Hoe het werkt

De instructies worden op twee niveaus meegegeven:

**Statisch via `opencode.jsonc`** het `instructions`-veld in de
OpenCode-configuratie bevat richtlijnen die gelden voor elke sessie,
ongeacht de taak.

**Dynamisch via `entrypoint.sh`** bij elke agentrun wordt een `PROMPT_PREFIX`
samengesteld die wordt samengevoegd met de issuebeschrijving voordat die naar
de agent wordt gestuurd. Zo kan de prefix in de toekomst worden uitgebreid met
context die pas bekend is op het moment van uitvoering (bijv. de taal van het
issue-label).

## Wat de instructies afdwingen

### Outputtaal

Alle output van de agent: code, inline comments, commit messages, wordt in het
Engels geschreven, ongeacht de taal van het ingediende issue.

### Tech stack

De agent krijgt expliciete versie-ankers mee zodat hij geen verouderde patronen
toepast:

| Laag | Instructie |
|---|---|
| Backend | Java 21+, Spring Boot 4 (Spring Framework 7) |
| Java-features | Records, sealed classes, pattern matching, virtual threads |
| Frontend | React 19, functionele componenten, hooks |
| Build | Maven |

### Architectuurregels

Twee architectuurregels worden als non-negotiable meegegeven:

- **Feature-gebaseerde packagestructuur** — packages worden georganiseerd per
  feature, niet per laag (`controller/`, `service/`, `repository/`).
- **Domain-Driven Design** — services retourneren domeinmodellen, geen DTO's.
  Controllers zijn verantwoordelijk voor de conversie.

## Uitbreidbaarheid

De huidige instructies zijn bewust minimaal gehouden. Bredere aanpassing van
agentgedrag via OpenCode skills die projectspecifieke context, testpatronen of
reviewcriteria bevatten is gepland voor een volgende sprint.
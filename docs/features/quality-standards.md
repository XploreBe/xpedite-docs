---
sidebar_position: 1
---

# Afgedwongen kwaliteitsstandaarden

Een van de kernproblemen met algemene AI coding agents is dat ze code
produceren in een vacuüm — zonder kennis van de conventies, toolingconfiguratie
of kwaliteitsdrempelwaarden van jouw team.

Xpedite lost dit op door een bibliotheek van **hooks en skills** te draaien die
jouw standaarden automatisch afdwingen, voordat output wordt geaccepteerd.

## Hoe het werkt

Wanneer een agent een wijziging produceert, voert Xpedite de kwaliteitstools
van je project uit tegen die output. Als de code niet slaagt, krijgt de agent
de instructie het probleem op te lossen voordat de wijziging wordt vastgelegd.
Deze lus herhaalt zich totdat de output aan de lat voldoet — of totdat de agent
escaleert naar een mens.

## Ondersteunde tools

### Checkstyle
Valideert codestijl aan de hand van de ruleset van jouw team. Xpedite gebruikt
jouw bestaande `checkstyle.xml` — geen aparte configuratie nodig.

### PMD
Voert statische analyse uit om veelvoorkomende bugs, dode code en te complexe
methoden te detecteren. Regels worden geladen vanuit de PMD-configuratie van
je project.

### JaCoCo
Dwingt testcoverage-drempelwaarden af. Als de agent nieuwe code schrijft zonder
voldoende tests, markeert JaCoCo dit en krijgt de agent de instructie coverage
toe te voegen voordat hij verder gaat.

### OpenRewrite
Past geautomatiseerde codemigraties en refactoring-recepten toe. Handig om je
codebase up-to-date te houden met nieuwe Java-versies, framework-upgrades of
teamwide refactoring-initiatieven.

## Configuratie

Alle kwaliteitstools worden aangestuurd door de bestaande configuratie van je
project. Xpedite leest je `pom.xml` of `build.gradle` en past de daarin
gedeclareerde plugins toe — er wordt geen parallelle configuratielaag
geïntroduceerd.
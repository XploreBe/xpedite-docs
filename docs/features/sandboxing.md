---
sidebar_position: 2
---

# Veilige, onbeheerde uitvoering

Een AI-agent op je codebase laten draaien brengt reëel risico met zich mee:
de agent kan shell-commando's uitvoeren, bestanden wijzigen, dependencies
installeren en met je buildsysteem interageren. Zonder guardrails kan een
verkeerd geconfigureerde of falende agent echte schade aanrichten.

Xpedite wikkelt elke agentsessie in een **sandbox** zodat je een taak kunt
indienen en met vertrouwen weg kunt lopen.

## Wat de sandbox biedt

### Resourcelimieten
CPU- en geheugengebruik worden per sessie begrensd. Een vastgelopen build of
oneindige lus legt de rest van je systeem niet plat.

### Bestandssysteemisolatie
De agent werkt op een geïsoleerde kopie van je project. Wijzigingen worden
klaargezet en gereviewd voordat ze worden toegepast op je werkdirectory.

### Netwerkbeperkingen
Uitgaand netwerkverkeer kan worden beperkt tot een configureerbare allowlist.
Dit voorkomt dat de agent tijdens de uitvoering onverwachte externe calls maakt.

### Auditspoor
Elke actie van de agent — bestandslezingen, schrijfacties, shell-commando's,
tool calls — wordt gelogd en beschikbaar gesteld in het observability dashboard.

## Implementatie

De sandbox is gebouwd op standaard Linux-containerprimitieven:

- **cgroups** — resourcelimieten (CPU, geheugen)
- **namespaces** — proces- en bestandssysteemisolatie
- **seccomp** — filtering van systeemaanroepen

Xpedite gebruikt Docker als containerruntime. Er zijn geen aangepaste
kernelmodules of geprivilegieerde setup vereist buiten een standaard
Docker-installatie.
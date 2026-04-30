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

## Architectuur

Elke agentsessie start een geïsoleerde Docker-container. De backend communiceert
met Docker via een **socket proxy** die de toegang tot de Docker API beperkt
tot alleen de strikt noodzakelijke operaties.

```
Backend ──► Docker Socket Proxy ──► Docker daemon ──► Agent container
             (HAProxy, allowlist)                       (xpedite-agent)
```

## De agent container

### Base image en runtime

De agent container is gebouwd op `eclipse-temurin:21-jdk-slim`, met Node.js 20
en Maven via apt. De keuze voor deze base image is bewust: de JDK is vereist
om de door de agent gegenereerde Java-code te compileren en te testen binnen
de sandbox, vóór commit.

### Beveiliging

De container draait als een dedicated niet-root gebruiker (`xpedite`). Build-only
tools die enkel nodig zijn tijdens het bouwen van de image (`gpg`, `curl`) worden
verwijderd na installatie, zodat ze niet beschikbaar zijn tijdens runtime. De
image wordt gescand met Trivy; de huidige baseline heeft 0 kritieke CVE's in
geïnstalleerde pakketten.

### Maven build cache

Om te voorkomen dat Maven-dependencies bij elke agentrun opnieuw worden
gedownload, ondersteunt Xpedite een optionele read-only bind mount van de
`.m2`-cache van de host naar `/home/xpedite/.m2` in de container.

Dit gedrag is opt-in en wordt geconfigureerd via twee properties:

| Property | Standaard | Beschrijving |
|---|---|---|
| `xpedite.agent.m2-cache-enabled` | `false` | Schakelt de cache mount in |
| `xpedite.agent.m2-cache-path` | — | Pad naar de `.m2`-cache op de host |

## Docker Socket Proxy

De Spring Boot backend heeft Docker-toegang nodig om containers op te starten,
te bevragen en te stoppen. In plaats van de volledige Docker socket te
mounten — wat de backend volledige controle over de Docker daemon zou geven —
zit er een **Tecnativa Docker Socket Proxy** tussen.

Deze proxy is een HAProxy-instantie die alleen de volgende Docker API-routes
doorlaat:

| Route | Waarvoor |
|---|---|
| `POST /containers/create` | Container aanmaken |
| `POST /containers/{id}/start` | Container starten |
| `GET /containers/{id}/logs` | Logs opvragen |
| `POST /containers/{id}/wait` | Wachten op exit |
| `DELETE /containers/{id}` | Container opruimen |

Alle andere routes — waaronder `/images`, `/volumes` en `/networks` — geven
een `403 Forbidden` terug. De proxy is bereikbaar via een intern Docker-netwerk
en is niet blootgesteld aan de host of het externe netwerk.

## Uitvoering: entrypoint.sh

Elke agent container voert bij opstart `entrypoint.sh` uit. Dit script
orkestreert de volledige levenscyclus van een agentsessie.

### Pre-flight checks

Voordat de agent wordt gestart, voert het script twee controles uit:

**LLM bereikbaarheid** — het script verifieert dat de inferentieserver
bereikbaar is op het geconfigureerde endpoint. Als het model niet beschikbaar
is, stopt de sessie onmiddellijk met een duidelijke foutmelding in plaats van
te wachten tot een timeout diep in de uitvoering.

**GitHub token validatie** — het script verifieert dat het meegeleverde token
geldig is en voldoende rechten heeft voordat er een branch of PR wordt aangemaakt.

### Foutdiagnose

Bij een onverwachte fout tijdens de uitvoering genereert het script via een
`trap ERR` automatisch een diagnostische snapshot: de uitvoercontext, de
LLM-health op dat moment, de git-remote configuratie en het schijfgebruik.
Dit maakt het debuggen van gefaalde agentsessies aanzienlijk eenvoudiger.

### `.gitignore` validatie

Vóór elke `git add` controleert het script of de output-repository een geldige
`.gitignore` bevat. Als die ontbreekt of onvolledig is, wordt hij automatisch
aangevuld. Dit voorkomt dat grote diffs (bijv. `node_modules`,
Maven-buildartifacten, IDE-bestanden) in pull requests terechtkomen.

### Git- en PR-workflow

Na een succesvolle agentrun maakt het script automatisch een feature branch aan,
commit de wijzigingen, pusht naar de remote en opent een pull request via de
GitHub CLI. De PR-titel en -body bevatten een verwijzing naar het oorspronkelijke
issue.
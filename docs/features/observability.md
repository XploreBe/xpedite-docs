---
sidebar_position: 4
---

# Volledige observability

Wanneer een AI-agent autonoom werkt aan je codebase, moet je precies weten wat
hij doet, in realtime. Xpedite biedt volledige zichtbaarheid in elke
draaiende agentsessie, zowel via de ingebouwde interface van OpenCode als via
het eigen Xpedite-dashboard dat momenteel in ontwikkeling is.

## Huidig: observability via OpenCode

In de huidige fase verloopt de observability primair via **OpenCode**, het
onderliggende agent-framework waarop Xpedite is gebouwd. OpenCode biedt
out-of-the-box inzicht in wat de agent doet:

- **Live tool calls** — je ziet in realtime welke acties de agent uitvoert:
  bestanden lezen, schrijven, shell-commando's uitvoeren
- **Redeneersstappen** — het interne denkproces van het model wordt zichtbaar
  gemaakt via de reasoning-output van Nemotron
- **Sessiestatistieken** — tokengebruik, contextbezetting en uitvoeringstijd
  worden per sessie gerapporteerd
- **Diff-weergave** — bestandswijzigingen zijn zichtbaar voordat ze worden
  doorgevoerd

## Toekomst: Xpedite observability dashboard

Naast de OpenCode-interface werkt Xpedite aan een eigen realtime dashboard
dat dieper inzicht biedt in agentsessies, specifiek afgestemd op
Java-projecten en teamgebruik:

### Live logstreaming
Agentoutput, tool calls en redeneersstappen worden gestreamt terwijl ze
plaatsvinden, zonder te wachten tot een sessie klaar is.

### Diff-viewer
Elke bestandswijziging die de agent klaarzet wordt getoond als diff voordat
hij wordt toegepast. Individuele wijzigingen kunnen worden gereviewd,
goedgekeurd of afgewezen zonder de sessie te onderbreken.

### Kostenbewaking
Tokengebruik en kosten worden per sessie bijgehouden en over tijd
geaggregeerd. Bij gebruik van een lokaal model (zoals Nemotron op de DGX
Spark) zijn de API-kosten nul, de bewaking richt zich dan op
resourcegebruik en uitvoeringstijd.

### Sessiegeschiedenis
Voltooide sessies worden opgeslagen met hun volledige logs, diffs en
statistieken, als referentie voor toekomstige runs en gedragsoptimalisatie.

## Technologie

Het Xpedite dashboard wordt gebouwd met **React** en **Spring Boot**, en
communiceert met de backend via een streaming API. Events worden in realtime
gepusht via Server-Sent Events (SSE).
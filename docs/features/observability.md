---
sidebar_position: 3
---

# Volledige observability

Wanneer een AI-agent autonoom werkt aan je codebase, moet je precies weten wat
hij doet — in realtime. Het observability dashboard van Xpedite geeft je
volledige zichtbaarheid in elke draaiende agentsessie.

## Dashboardfuncties

### Live logstreaming
Agentoutput, tool calls en redeneersstappen worden naar het dashboard
gestreamt terwijl ze plaatsvinden. Je hoeft niet te wachten tot een sessie
klaar is om te zien wat de agent doet.

### Diff-viewer
Elke bestandswijziging die de agent klaarzet wordt getoond als diff voordat
hij wordt toegepast. Je kunt individuele wijzigingen reviewen, goedkeuren of
afwijzen zonder de sessie te onderbreken.

### Kostenbewaking
Tokengebruik en geschatte kosten worden per sessie bijgehouden en over tijd
geaggregeerd. Zo krijg je inzicht in het kostenprofiel van verschillende
taaktypen en kun je optimaliseren.

### Sessiegeschiedenis
Voltooide sessies worden opgeslagen met hun volledige logs, diffs en
statistieken. Je kunt elke sessie herbekijken om te begrijpen wat er is
gebeurd, of als referentie gebruiken om het gedrag van de agent bij te sturen.

## Technologie

Het dashboard is gebouwd met **React** en **Next.js**, en communiceert met de
Xpedite backend via een streaming API. Events worden in realtime gepusht via
Server-Sent Events (SSE).
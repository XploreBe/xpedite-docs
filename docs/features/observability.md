---
sidebar_position: 4
---

# Volledige observability

Wanneer een AI-agent autonoom werkt aan je codebase, moet je precies weten wat
hij doet, in realtime. Xpedite biedt volledige zichtbaarheid in elke
draaiende agentsessie via het eigen dashboard en via de ingebouwde interface
van OpenCode.

## Live logstreaming

Agentoutput, tool calls en redeneersstappen worden gestreamt via
**Server-Sent Events (SSE)** terwijl ze plaatsvinden, zonder te wachten tot
een sessie klaar is. De frontend verbindt zich met de SSE-stream van de backend
en toont logs in realtime in de queue- en issuepagina's.

Elke issue-kaart in de queue builder heeft een logknop die actief wordt zodra
de bijbehorende agentrun gestart is. Zo kun je meerdere parallelle runs
tegelijk volgen zonder tussen schermen te wisselen.

## Observability via OpenCode

Xpedite is gebouwd bovenop **OpenCode**, het onderliggende agent-framework.
OpenCode biedt aanvullend inzicht in wat de agent doet:

- **Live tool calls** — je ziet in realtime welke acties de agent uitvoert:
  bestanden lezen, schrijven, shell-commando's uitvoeren
- **Redeneersstappen** — het interne denkproces van het model wordt zichtbaar
  gemaakt via de reasoning-output van Nemotron
- **Sessiestatistieken** — tokengebruik, contextbezetting en uitvoeringstijd
  worden per sessie gerapporteerd
- **Diff-weergave** — bestandswijzigingen zijn zichtbaar voordat ze worden
  doorgevoerd

## Infrastructuurmonitoring

Naast de agent-observability biedt Xpedite realtime inzicht in de
gezondheid van de LLM-inferentieserver. Zie [Monitoring](./monitoring) voor
het Grafana-dashboard met beschikbaarheid, systeemresources en
inferentieprestaties.

## Gepland

De volgende observability-features zijn voorzien voor komende sprints:

- **Diff-viewer** — elke bestandswijziging die de agent klaarzet getoond als
  diff, met de mogelijkheid individuele wijzigingen te reviewen of af te wijzen
- **Sessiegeschiedenis** — voltooide sessies opgeslagen met hun volledige logs,
  diffs en statistieken als referentie voor toekomstige runs

## Technologie

Het Xpedite dashboard is gebouwd met **React** en **Spring Boot**, en
communiceert met de backend via een streaming API. Events worden in realtime
gepusht via Server-Sent Events (SSE).
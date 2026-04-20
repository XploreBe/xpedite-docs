---
sidebar_position: 4
title: Monitoring
---

# 📊 Monitoring

Xpedite biedt realtime inzicht in de gezondheid en prestaties van de LLM-inferentieserver via een Grafana-dashboard. Zo weet je altijd of het model beschikbaar is en hoe het presteert onder belasting.

## Wat wordt gemonitord?

Het dashboard toont drie categorieën:

### Beschikbaarheid
Een health check controleert continu of vLLM bereikbaar is via HTTP. Het paneel toont direct **Online** of **Offline**.

### Systeemresources
CPU- en geheugengebruik van de DGX Spark. Omdat de GB10 unified memory gebruikt, is het geheugengebruik meteen ook een indicator van de GPU-belasting.

### Inferentieprestaties
Rechtstreeks uit vLLM:

| Metric | Wat het zegt |
|---|---|
| Actieve requests | Hoeveel requests het model op dit moment verwerkt |
| Wachtrij | Hoeveel requests wachten om verwerkt te worden |
| KV-cache gebruik | Geheugendruk tijdens inferentie |
| Tokens/seconde | Doorvoersnelheid van het model |
| Time to first token (p95) | Hoe snel het model begint te antwoorden |
| End-to-end latency (p95) | Totale responstijd van een request |

## Hoe werkt het?

```
vLLM ──► Grafana Alloy ──► Grafana Cloud ──► Dashboard
         (scrapet elke 15s)   (Prometheus)
```

Grafana Alloy draait op de DGX Spark en scrapet metrics van vLLM. Een Blackbox Exporter controleert daarnaast of de health endpoint bereikbaar is. Beide datastromen komen samen in Grafana Cloud.
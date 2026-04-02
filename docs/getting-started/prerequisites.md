---
sidebar_position: 1
---

# Vereisten

Zorg dat de volgende tools beschikbaar zijn op je systeem voordat je Xpedite
opstart.

## Verplicht

| Tool | Versie | Doel |
|------|--------|------|
| Java | 21+ | Backend runtime |
| Gradle of Maven | Laatste stabiele versie | Build tooling |
| Docker | 24+ | Sandbox-uitvoering |
| Node.js | 18+ | Observability dashboard |

## Aanbevolen

- **OpenCode** — het onderliggende agent-framework waarop Xpedite is gebouwd
- Een lokaal of remote LLM-endpoint dat compatibel is met de OpenAI API
  (bijv. via vLLM)

## Java-projectvereisten

Xpedite werkt het best met Java-projecten die al een buildbestand hebben
(`pom.xml` of `build.gradle`). De kwaliteitshandhaving integreert met:

- **Checkstyle** — validatie van codestijl
- **PMD** — statische analyse
- **JaCoCo** — handhaving van testcoverage
- **OpenRewrite** — geautomatiseerde codemigraties en refactoring
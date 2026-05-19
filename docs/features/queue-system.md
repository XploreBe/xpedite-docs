---
sidebar_position: 6
---

# Queue-gebaseerde uitvoering

In plaats van issues één voor één handmatig toe te wijzen aan een agent, laat
het queue-systeem je een volledige backlog indienen als een geordend uitvoerplan.
Xpedite werkt de issues dan sequentieel — en waar mogelijk parallel — af, zonder
verdere tussenkomst.

## Hoe het werkt

Je selecteert een set GitHub-issues, bepaalt de volgorde en geeft aan welke
issues tegelijk uitgewerkt kunnen worden. Xpedite vertaalt dit plan naar een
reeks agentruns en beheert de uitvoering automatisch.

Issues die in dezelfde groep zitten worden parallel uitgevoerd. Groepen worden
sequentieel afgewerkt: de volgende groep start pas als alle issues in de vorige
groep klaar zijn.

```
Groep 1: [Issue 3, Issue 5]  ──► parallel
         ↓ (beide klaar)
Groep 2: [Issue 7]           ──► sequentieel
         ↓
Groep 3: [Issue 12, Issue 14] ──► parallel
```

## Queue builder

De frontend biedt een visuele queue builder. Links selecteer je issues uit de
GitHub-repository. Rechts bouw je het uitvoerplan op als een geordende lijst
van groepen.

Een groep met één issue wordt sequentieel uitgevoerd. Sleep je een tweede issue
op een bestaande groep, dan worden ze parallel uitgevoerd. Groepen herorden je
via drag-and-drop of de pijlknoppen per groep.

Elke issue-kaart in de queue heeft een logknop die actief wordt zodra de
agentrun voor dat issue gestart is.

## AI-gestuurde planning

Naast de manuele queue builder ondersteunt Xpedite een AI-gestuurde variant:
je selecteert de issues, en het model analyseert ze zelf om een volgorde en
parallelisatiestrategie voor te stellen. Je kan het voorstel vervolgens
bekijken en aanpassen voor je de queue start.

## Backend

De queue wordt via een `POST /api/queue/run` request naar de backend gestuurd
als een geordende lijst van groepen:

```json
{
  "repositoryUri": "https://github.com/org/repo",
  "groups": [[3, 5], [7], [12, 14]]
}
```

De backend verwerkt de groepen sequentieel. Binnen elke groep worden de
agentruns parallel gestart via virtual threads. De bestaande agent-uitvoerlogica
(ook gebruikt door het individuele issue board) wordt hergebruikt.
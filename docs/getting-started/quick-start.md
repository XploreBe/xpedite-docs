---
sidebar_position: 2
---

# Snelstart

Deze gids laat Xpedite in een paar minuten draaien tegen jouw Java-project.

## 1. Repository klonen
```bash
git clone https://github.com/XploreBe/xpedite.git
cd xpedite
```

## 2. Backend starten
```bash
cd backend
./gradlew bootRun
```

De backend stelt een REST API beschikbaar die agentsessies orkestreert, de
sandbox beheert en observability-events streamt.

## 3. Dashboard starten
```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) om het realtime
observability dashboard te bekijken.

## 4. LLM verbinden

Xpedite verbindt met elk OpenAI-compatibel LLM-endpoint. Configureer je
provider via het instellingenpaneel van het dashboard, of via het
configuratiebestand:
```json
{
  "llm": {
    "baseUrl": "http://jouw-llm-endpoint/v1",
    "model": "jouw-modelnaam"
  }
}
```

## 5. Xpedite naar je project wijzen

Open het dashboard en maak een nieuwe agentsessie aan. Geef het pad naar je
Java-project op en selecteer een taak. Xpedite past kwaliteitshooks
automatisch toe voordat wijzigingen worden doorgevoerd.
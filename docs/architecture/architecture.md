---
sidebar_position: 1
---

# Architectuur

## Backend: Ports & Adapters

De Xpedite backend is gestructureerd volgens het **hexagonale architectuurpatroon**
(ook bekend als Ports & Adapters). Het doel is dat domeinlogica onafhankelijk
blijft van infrastructuurkeuzes: de backend weet niet of hij met GitHub of
GitLab praat, en niet of agents in Docker of een andere runtime draaien. Enkel
de adapter-laag weet dat.

### Module-indeling

De backend is opgesplitst in vier Gradle-modules met een strikte
afhankelijkheidsrichting:

```
adapters/incoming  ──►  application  ──►  core
adapters/outgoing  ──►  application  ──►  core
```

| Module | Inhoud |
|---|---|
| `core` | Domeinmodellen, port-interfaces, domeinlogica |
| `application` | Use cases en applicatieservices die ports aanroepen |
| `adapters/incoming` | REST-controllers, Spring Boot main class, composition root |
| `adapters/outgoing` | Concrete implementaties van ports: GitHub, Docker, database |

### Afhankelijkheidsregel

De pijlen wijzen altijd naar binnen. `adapters/outgoing` mag `core` kennen,
maar `core` mag `adapters/outgoing` nooit importeren. Schendingen van deze
regel worden geblokkeerd via de Gradle-module-grenzen: een verkeerde import
compileert simpelweg niet.

### De Runtime port

Een concreet voorbeeld van het patroon is de `Runtime` port. In `core` bestaat
een interface:

```java
// core/src/main/java/be/xpedite/run/domain/Runtime.java
public interface Runtime {
    String start(ExecutionSpec spec);
    Integer await(String executionId);
    void remove(String executionId);
}
```

De `DockerContainerRuntime` in `adapters/outgoing` implementeert deze interface
met docker-java. `RunManager` in `application` kent alleen de `Runtime`
interface — niet Docker. Wil je in de toekomst native uitvoering of Firecracker
ondersteunen, dan voeg je een nieuwe adapter toe zonder één regel domeinlogica
te wijzigen.

### Domeinmodel

Het domeinmodel bevat geen provider-specifieke velden of factory methods.
Mapping van GitHub-specifieke velden (zoals `htmlUrl`) naar het generieke
domeinmodel `Issue` is de verantwoordelijkheid van `GitHubIssueProvider` in
`adapters/outgoing`. `BoardStatus` heeft geen GitHub-specifieke factory methods
meer; die mapping leeft eveneens in de infrastructure laag.

## Agent-instructies en architectuur

De Ports & Adapters-structuur wordt ook als non-negotiable meeggeven aan de
coding agent. De agent mag geen infrastructure-imports introduceren in domein-
of applicatie-packages. Zie [Agent-instructies](agent-instructions.md)
voor de volledige lijst van architectuurregels die aan de agent worden opgelegd.
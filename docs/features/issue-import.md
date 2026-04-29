---
sidebar_position: 5
---

# Issue import (JSON)

Deze pagina beschrijft het JSON-formaat en de importflow voor issues in Xpedite.

## Flow

1. Selecteer een repository op de Issues-pagina.
2. Upload een JSON-bestand.
3. De frontend valideert en normaliseert de payload.
4. De frontend stuurt data naar `POST /api/issues/import`.
5. De backend importeert de issues en geeft `importedCount` terug.
6. De UI toont feedback en refresht de lijst.

## Ondersteunde inputformaten

De frontend accepteert:

- Een array van issues.
- Een object met een `issues` array.

Voorbeeld array:

```json
[
  {
    "number": 101,
    "title": "Fix null pointer in run polling",
    "description": "Intermittent failure in useIssueRuns",
    "state": "open",
    "htmlUrl": "https://github.com/org/repo/issues/101",
    "boardStatus": "todo"
  }
]
```

Voorbeeld object:

```json
{
  "issues": [
    {
      "number": 102,
      "title": "Add retry to GitHub token fetch"
    }
  ]
}
```

## Velden en defaults

- `title` (verplicht): niet-lege string.
- `number` (optioneel): default `0`.
- `description` (optioneel): default `""`.
- `state` (optioneel): default `"open"`.
- `htmlUrl` (optioneel): default `""`.
- `boardStatus` (optioneel): default `"backlog"`.

Toegestane `boardStatus` waarden:

- `backlog`
- `todo`
- `inprogress`
- `inreview`
- `done`

## Endpoint contract

Endpoint:

- `POST /api/issues/import`

Request:

```json
{
  "repositoryUri": "https://github.com/org/repo",
  "issues": [
    {
      "number": 101,
      "title": "Fix null pointer in run polling",
      "description": "Intermittent failure in useIssueRuns",
      "state": "open",
      "htmlUrl": "https://github.com/org/repo/issues/101",
      "boardStatus": "todo"
    }
  ]
}
```

Response:

```json
{
  "importedCount": 1
}
```

## Validatie en foutgevallen

Frontend (normalisatie):

- Payload moet array zijn of object met `issues` array.
- Elk item moet een object zijn.
- `title` moet aanwezig en niet leeg zijn.

Typische fouten:

- `Invalid JSON format. Use an array or an object with an issues array.`
- `Issue at index N is not an object.`
- `Issue at index N is missing a valid title.`

Backend:

- `issues` mag niet `null` zijn.
- Ongeldige `boardStatus` geeft een `IllegalArgumentException`.

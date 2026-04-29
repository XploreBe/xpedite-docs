---
sidebar_position: 3
---

# Configuratie en secrets

Deze gids legt stap voor stap uit **wat** je moet invullen, **waar** je die waarden haalt en **hoe** je controleert dat alles correct staat.

Bronnen in de code:

- `backend/src/main/resources/application.properties`
- `compose.yaml`

## 1) Maak je `.env` bestand aan

Maak in de root van `xpedite` een `.env` bestand (naast `compose.yaml`).

Start met dit template:

```dotenv
# Postgres
POSTGRES_DB=xpedite
POSTGRES_USER=xpedite
POSTGRES_PASSWORD=change-me

# Grafana
GF_SECURITY_ADMIN_USER=admin
GF_SECURITY_ADMIN_PASSWORD=change-me

# Absolute path naar je GitHub App private key
GITHUB_APP_PRIVATE_KEY_FILE=/absolute/path/to/github-app.private-key.pem

# Optioneel: override LLM endpoint
# LLM_BASE_URL=http://localhost:8000/v1
```

## 2) GitHub App gegevens ophalen (vereist)

Xpedite gebruikt een GitHub App installatie-token om veilig met GitHub API te praten.

Je hebt nodig:

- `github.app.id` (Application ID)
- `github.app.installation-id` (Installatie ID)
- `GITHUB_APP_PRIVATE_KEY_FILE` (pad naar private key `.pem`)

### 2.1 Application ID vinden

1. Open GitHub in browser.
2. Ga naar **Settings** -> **Developer settings** -> **GitHub Apps**.
3. Open jouw app.
4. Neem de **App ID** over.


### 2.2 Installation ID vinden

1. In dezelfde GitHub App ga naar **Install App** / **Configure**.
2. Open de installatie voor de juiste org/repo.
3. URL bevat meestal `/installations/<id>`.
4. Neem dat getal over als installation ID.


### 2.3 Private key genereren en opslaan

1. In GitHub App pagina: **Private keys** -> **Generate a private key**.
2. Download het `.pem` bestand.
3. Bewaar dit buiten de repo, bijvoorbeeld:
   - Windows: `C:\secrets\xpedite\github-app.pem`
   - Linux/macOS: `/opt/secrets/xpedite/github-app.pem`
4. Zet in `.env`:
   - Windows pad in compose kan met slashes: `C:/secrets/xpedite/github-app.pem`
   - Voorbeeld: `GITHUB_APP_PRIVATE_KEY_FILE=C:/secrets/xpedite/github-app.pem`

De backend mount dit bestand als read-only naar:

- `/run/secrets/github_app_key`

en gebruikt dat via:

- `GITHUB_APP_PRIVATE_KEY_PATH=/run/secrets/github_app_key`

## 3) Database variabelen invullen

Voor lokale compose zijn dit de minimale DB variabelen:

- `POSTGRES_DB`: naam van je database (bv. `xpedite`)
- `POSTGRES_USER`: database user (bv. `xpedite`)
- `POSTGRES_PASSWORD`: sterk wachtwoord

`application.properties` bouwt standaard de datasource URL op uit deze waarden, je hoeft `SPRING_DATASOURCE_*` lokaal meestal niet manueel te zetten.

## 4) Grafana login instellen

Voor monitoring UI:

- `GF_SECURITY_ADMIN_USER`: admin gebruikersnaam
- `GF_SECURITY_ADMIN_PASSWORD`: admin wachtwoord

Na opstarten log je in op Grafana met deze waarden.

## 5) LLM en runtime opties (optioneel, maar vaak nuttig)

- `LLM_BASE_URL`: OpenAI-compatibel endpoint voor je modelserver.
  - Default: `http://localhost:8000/v1`
  - Alleen aanpassen als je model elders draait.
- `AGENT_IMAGE`: docker image voor de agent runtime.
  - Default: `xpedite-agent:latest`
- `M2_CACHE_ENABLED`: `true/false` om host Maven cache read-only te mounten.
- `M2_CACHE_PATH`: pad naar host Maven cache als `M2_CACHE_ENABLED=true`.

## 6) Docker variabelen begrijpen

- `DOCKER_HOST`
  - Standaard: lokale socket
  - In compose wordt dit overschreven naar `tcp://dockerproxy:2375`.
- `DOCKER_NETWORK_MODE`
  - Default: `bridge`
  - Alleen wijzigen als je specifieke netwerkvereisten hebt.

## 7) Volledige checklist voor eerste run

Voor `docker compose up`:

- `.env` bestaat in project root.
- `POSTGRES_*` ingevuld.
- `GF_SECURITY_ADMIN_*` ingevuld.
- `GITHUB_APP_PRIVATE_KEY_FILE` wijst naar bestaand `.pem` bestand.
- GitHub App is geïnstalleerd op de repo/org waarmee je werkt.

## 8) Verifiëren dat config werkt

Na opstarten:

1. Backend health:
   - `GET http://localhost:8080/api/ping` moet `ok` geven.
2. Grafana:
   - Open `http://localhost:3000` en log in met `GF_SECURITY_ADMIN_*`.
3. GitHub token flow:
   - Start een run vanuit UI; bij misconfiguratie zie je token/private-key fouten in backend logs.
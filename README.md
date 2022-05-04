# Nav.no EnonicXP frontend

React/[Next.js](https://nextjs.org/) frontend for åpne sider på nav.no. Benytter Enonic XP som headless CMS.

![Deploy to prod](https://github.com/navikt/nav-enonicxp-frontend/workflows/Deploy%20to%20prod/badge.svg) <br>
![Deploy to prod (failover)](https://github.com/navikt/nav-enonicxp-frontend/workflows/Deploy%20to%20prod-failover/badge.svg) <br>
![Deploy to dev1](https://github.com/navikt/nav-enonicxp-frontend/workflows/Deploy%20to%20dev1/badge.svg) <br>
![Deploy to dev2](https://github.com/navikt/nav-enonicxp-frontend/workflows/Deploy%20to%20dev2/badge.svg)

## Lokal kjøring

Kjører lokalt på [http://localhost:3000](http://localhost:3000).

Appen er avhengig av en lokalt tilgjengelig instans av [Enonic XP](https://github.com/navikt/nav-enonicxp).

Øvrige avhengigheter kan startes ved å kjøre `docker compose up`

#### Development mode:

Kjør `npm run dev`

#### Production mode:

Kopier .env.development til .env.local, og sett `NODE_ENV=production`

Kjør så `npm run start-clean`

## Deploy til test-miljø

-   Generer en personal access token på Github med repo-tilgang (husk SSO)
-   Opprett fila .github-token og legg tokenet inn i denne
-   Push branchen din til Github og kjør en av følgende kommandoer for å deploye:

`npm run deploy-dev1`

`npm run deploy-dev2`

`npm run deploy <workflow-filnavn|workflow-id> <remote branch|tag>`

#### Alternativt:

[Actions](https://github.com/navikt/nav-enonicxp-frontend/actions) -> Velg workflow -> Run workflow -> Velg branch -> Run workflow

## Prodsetting

-   Lag en PR til master, og merge inn etter godkjenning
-   Lag en release på master med versjon-bump, beskrivende tittel og oppsummering av endringene dine
-   Publiser release'en for å starte deploy til prod

# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes mot https://github.com/orgs/navikt/teams/personbruker

## For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #team-personbruker

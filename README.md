# Nav.no EnonicXP frontend

React/[Next.js](https://nextjs.org/) frontend for åpne sider på nav.no. Benytter Enonic XP som headless CMS.

![Deploy-to-prod](https://github.com/navikt/nav-enonicxp-frontend/workflows/Deploy-to-prod/badge.svg) <br>
![Deploy-to-dev](https://github.com/navikt/nav-enonicxp-frontend/workflows/Deploy-to-dev/badge.svg) | ![Deploy-to-q1](https://github.com/navikt/nav-enonicxp-frontend/workflows/Deploy-to-q1/badge.svg) | ![Deploy-to-q6](https://github.com/navikt/nav-enonicxp-frontend/workflows/Deploy-to-q6/badge.svg)

## Lokal kjøring

Kjører lokalt på [http://localhost:3000](http://localhost:3000). Appen er avhengig av en
lokalt tilgjengelig instans av [Enonic XP](https://github.com/navikt/nav-enonicxp).

Dekoratøren kan startes lokalt med `docker-compose up`

#### Development mode:

Kjør `npm run dev`

#### Production mode:

Kopier først innhold fra .env.development til .env.local

Kjør så `npm run start-clean`

## Deploy til test-miljø

Generer en personal access token på Github med repo-tilgang (husk SSO), opprett fila .github-token og kopier inn tokenet.
Push branchen din til Github og kjør en av følgende kommandoer for å deploye:

`npm run deploy-dev`

`npm run deploy-q1`

`npm run deploy-q6`

Alternativt:
`npm run deploy <workflow-filnavn|workflow-id> <remote branch>`

## Prodsetting

Master deployes til prod ved publisering av ny release.

## Secrets

Secrets hentes fra Environment secrets på Github. For å legge til secrets gå til: Settings -> Environments

## vhost mappings i Enonic XP config

Mappings legges inn i com.enonic.xp.web.vhost.cfg.

#### lokalt

```
mapping.next.host = localhost
mapping.next.source = /_next
mapping.next.target = /_/service/no.nav.navno/nextProxy
mapping.next.idProvider.system = default

mapping.legacy.host = localhost
mapping.legacy.source = /_/legacy
mapping.legacy.target = /site/default/master/www.nav.no/
mapping.legacy.idProvider.system = default
```

##### dev/q/prod:

```
mapping.next.host = portal-admin<-dev|-q-n>.oera.no
mapping.next.source = /_next
mapping.next.target = /_/service/no.nav.navno/nextProxy
mapping.next.idProvider.adfs = default

mapping.legacy.host = www<-dev|-q-n>.nav.no
mapping.legacy.source = /_/legacy
mapping.legacy.target = /site/default/master/www.nav.no/
mapping.legacy.idProvider.adfs = default
```

# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes mot https://github.com/orgs/navikt/teams/personbruker

## For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #team-personbruker

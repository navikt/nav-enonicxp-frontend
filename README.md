# Nav.no EnonicXP frontend

React/[Next.js](https://nextjs.org/) frontend for åpne sider på nav.no. Benytter Enonic XP som headless CMS.

[Dokumentasjon av caching](https://github.com/navikt/nav-enonicxp/wiki/Caching)

## Lokal utvikling

Kjøres lokalt på [http://localhost:3000](http://localhost:3000).

Som default kreves en lokal instans av Enonic XP med [nav-enonicxp](https://github.com/navikt/nav-enonicxp) installert. Alternativt kan en dev eller prod-instans av XP benyttes via [nav-enonicxp-dev-proxy](https://github.com/navikt/nav-enonicxp-dev-proxy).

### Development mode:

#### Med lokal XP:

-   Start en XP sandbox (se nav-enonicxp readme for fremgangsmåte)
-   Kjør `npm run dev`

#### Via dev-proxy:

-   Kopier .env.development til .env.development.local.
-   Sett f.eks. `XP_ORIGIN=https://nav-enonicxp-proxy.intern.dev.nav.no/dev1` (se dev-proxy readme for andre alternativer)
-   Kjør `npm run dev-custom`

### Production mode:

Kjør `npm run start-clean`

### Storybook

Kjør Storybook lokalt med `npm run storybook`

### Andre lokale avhengigheter

[Dekoratøren](https://github.com/navikt/nav-dekoratoren) og [revalidator-proxy](https://github.com/navikt/nav-enonicxp-frontend-revalidator-proxy) kan kjøres lokalt med `docker compose up`. Du må først autentisere til GAR image registry'et:

```
gcloud auth login
gcloud auth configure-docker europe-north1-docker.pkg.dev
```

Se også https://cloud.google.com/artifact-registry/docs/docker/authentication#gcloud-helper

## Deploy til test-miljø

[Actions](https://github.com/navikt/nav-enonicxp-frontend/actions) -> Velg workflow -> Run workflow -> Velg branch -> Run workflow

## Prodsetting

-   Lag en PR til main, og merge inn etter godkjenning
-   Lag en release på main med versjon-bump, beskrivende tittel og oppsummering av endringene dine
-   Publiser release'en for å starte deploy til prod

## Logger og metrikker

[Kibana](https://logs.adeo.no/app/discover#/view/952d2110-d396-11eb-af21-ffc7c2f0592f)

[Grafana](https://grafana.nav.cloud.nais.io/d/acb4618a-aa49-4036-9534-c058bc1af783/nav-no-frontend-detaljert)

## Failover

I tillegg til den ordinære instansen av appen på www.nav.no, deployes også daglig et statisk bygg av appen til www-failover.nav.no.
Ved server-feil ved rendring av en side i den ordinære app-instansen, vil error-page'en forsøke å hente html for tilsvarende side fra failover-appen,
og servere denne som en fallback.

Failover deployes ikke automatisk til dev-miljøer. For å bygge og deploye til et dev-miljø, gjør følgende:

-   Legg inn relevante secrets lokalt som spesifisert i kommentarer i `/failover/build-dev-failover-image.sh`
-   Kjør `/failover/build-dev-failover-image.sh <dev1|dev2> <image-navn>`
-   Vent på at imaget bygges (det tar normalt 15-20 min)
-   Kjør Github workflow'en `deploy-failover.dev` med dev-miljøet og image-navnet du valgte som input

Failover-appen kan ikke navigeres direkte, kun via den ordinære appen. For å teste en deployet failover-instans kan du f.eks. slå av
nav.no-appen i XP og så slette frontend-cachen (helst ikke i prod :).

## Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes mot https://github.com/orgs/navikt/teams/personbruker

### For Nav-ansatte

Interne henvendelser kan sendes via Slack i kanalen #team-personbruker

# Nav.no EnonicXP frontend

React/[Next.js](https://nextjs.org/) frontend for åpne sider på nav.no. Benytter Enonic XP som headless CMS.

[Dokumentasjon av caching](https://github.com/navikt/nav-enonicxp/wiki/Caching)

## Lokal utvikling

Kjøres lokalt på [http://localhost:3000](http://localhost:3000).

Som default kreves en lokal instans av Enonic XP med [nav-enonicxp](https://github.com/navikt/nav-enonicxp) installert. Alternativt kan en dev eller prod-instans av XP benyttes via [nav-enonicxp-dev-proxy](https://github.com/navikt/nav-enonicxp-dev-proxy).

### VS Code

Hvis lintingreglene i pakkene ikke plukkes opp av VS Code, sørg for å ha følgende innstillinger i .vscode/settings.json:

```
{
  "eslint.workingDirectories": ["./packages/nextjs", "./packages/shared", "./packages/server"]
}
```

### Development mode:

#### Med lokal XP:

- Start en XP sandbox (se nav-enonicxp readme for fremgangsmåte)
- Kjør `npm run dev`

#### Via dev-proxy:

- Kopier .env.development til .env.development.local.
- Sett f.eks. `XP_ORIGIN=https://nav-enonicxp-proxy.intern.dev.nav.no/dev1` (se dev-proxy readme for andre alternativer)
- Kjør `npm run dev-custom`

### Production mode:

Kjør `npm run start-local-clean`

### Storybook

Kjør Storybook lokalt med `npm run storybook` eller besøk den deploya versjonen [https://navikt.github.io/nav-enonicxp-frontend/](https://navikt.github.io/nav-enonicxp-frontend/)

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

Lag en PR til main, og merge inn etter godkjenning (En automatisk release vil oppstå ved deploy til main).

## Logger og metrikker

[Kibana](https://logs.adeo.no/app/discover#/view/952d2110-d396-11eb-af21-ffc7c2f0592f)

[Grafana](https://grafana.nav.cloud.nais.io/d/acb4618a-aa49-4036-9534-c058bc1af783/nav-no-frontend-detaljert)

## Failover

I tillegg til den ordinære instansen av appen på www.nav.no, deployes også nattlig et statisk bygg av appen til www-failover.nav.no.
Ved server-feil ved rendring av en side i den ordinære app-instansen, vil error-page'en forsøke å hente html for tilsvarende side fra failover-appen,
og servere denne som en fallback.

Github workflows har ikke tilgang til q-miljøer i Nav (feks dev), så imaget må bygges lokalt slik at byggeprosessen får tak i tjenestene i XP i dev. Deretter pushes imaget til GAR (Google Artifact Registry) og så deployes via Github Actions.

### Slik bygger og deployer du failover til dev

- Legg inn relevante secrets lokalt som spesifisert i kommentarene øverst i `.failover/build-dev-failover-image.sh`
- Husk at du i tillegg må være på naisdevice!
- Kjør `npm run build-and-push-dev-failover --app_env=dev1|dev2 --image_name=ditt-valgte-image-navn`
- Vent på at imaget bygges (det tar normalt 15-20 min)
- I rapporten vil du få en Digest ("sha256:ab372a...."). Kopier selve sha'en (dvs ikke 'sha256:') til bruk i neste steg.
- Kjør Github workflow'en `deploy-failover.dev` med dev-miljøet og sha'en som du fikk etter push.

Merk at Failover-appen ikke kan brukes direkte, selv om den kjører på egen ingress. Den er sattopp til å blokkere kall utenifra. Istedet vil den vanlige
NextJS-instansen hente statisk rendret html- og json-innhold fra Failover via API dersom det ikke er mulig å hente fra hverken NextJS sin egen cache, Valkey eller XP.

For å teste en deployet failover-instans i dev kan du f.eks. slå av nav.no-appen i XP og så slette frontend-cachen. Ikke i prod, med mindre det er helt nødvendig og
varslet i god tid på #varsling-nedetid.

## Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes mot https://github.com/orgs/navikt/teams/personbruker

### For Nav-ansatte

Interne henvendelser kan sendes via Slack i kanalen #team-personbruker

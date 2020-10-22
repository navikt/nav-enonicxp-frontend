React/[Next.js](https://nextjs.org/) frontend for Enonic XP headless CMS. 

## Lokal kjøring

Kjører lokalt på [http://localhost:3000](http://localhost:3000). Appen er avhengig av en
lokalt tilgjengelig instans av [denne branchen](https://github.com/navikt/nav-enonicxp/tree/headless-guillotine)
av Enonic XP.

#### Development mode:
```
npm run dev
```

#### Production mode:
Kopier først innhold fra .env.development til .env.local

```
npm run build && npm start
```

## vhost config
Mappings legges inn i com.enonic.xp.web.vhost.cfg.

#### lokalt

```
mapping.next.host = localhost
mapping.next.source = /_next
mapping.next.target = /_/service/no.nav.navno/nextProxy
mapping.next.idProvider.system = default

mapping.draft.host = localhost
mapping.draft.source = /_/draft
mapping.draft.target = /site/default/draft/www.nav.no/
mapping.draft.idProvider.system = default

mapping.legacy.host = localhost
mapping.legacy.source = /_/legacy
mapping.legacy.target = /site/default/master/www.nav.no/
mapping.legacy.idProvider.system = default

mapping.legacydraft.host = localhost
mapping.legacydraft.source = /_/legacy/draft
mapping.legacydraft.target = /site/default/draft/www.nav.no/
mapping.legacydraft.idProvider.system = default
```

##### q/prod:

```
mapping.next.host = portal-admin<-q-n>.oera.no
mapping.next.source = /_next
mapping.next.target = /_/service/no.nav.navno/nextProxy
mapping.next.idProvider.adfs = default

mapping.draft.host = www<-q-n>.nav.no
mapping.draft.source = /_/draft
mapping.draft.target = /site/default/draft/www.nav.no/
mapping.draft.idProvider.adfs = default

mapping.legacy.host = www<-q-n>.nav.no
mapping.legacy.source = /_/legacy
mapping.legacy.target = /site/default/master/www.nav.no/
mapping.legacy.idProvider.adfs = default

mapping.legacydraft.host = www<-q-n>.nav.no
mapping.legacydraft.source = /_/legacy/draft
mapping.legacydraft.target = /site/default/draft/www.nav.no/
mapping.legacydraft.idProvider.adfs = default

# this is for pre-release compatibility only
mapping.draftlocal.host = www<-q-n>.nav.no
mapping.draftlocal.source = /draft
mapping.draftlocal.target = /site/default/draft/www.nav.no/
mapping.draftlocal.idProvider.system = default
```

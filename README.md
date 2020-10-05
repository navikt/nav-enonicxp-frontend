React/[Next.js](https://nextjs.org/) frontend for Enonic XP headless CMS. 

## Lokal kjøring

Kjører lokalt på [http://localhost:3000](http://localhost:3000). Appen er avhengig av en lokalt tilgjengelig instans av Enonic XP.

Secrets i legges inn i .env.local 

#### Development mode:
```
npm run dev
```

#### Production mode:
Kopier først innhold fra .env.development til .env.local

```
npm run build && npm start
```

#### vhost config
Oppsett for lokal enonic sandbox i home/config/com.enonic.xp.web.host.cfg:

```
enabled = true 

mapping.public.host = localhost
mapping.public.source = /
mapping.public.target = /site/default/master/www.nav.no/
mapping.public.idProvider.system = default

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

mapping.next.host = localhost
mapping.next.source = /_next
mapping.next.target = /_/service/no.nav.navno/nextProxy
mapping.next.idProvider.system = default

mapping.webapp.host = localhost
mapping.webapp.source = /webapp
mapping.webapp.target = /webapp
mapping.webapp.idProvider.system = default

mapping.admin.host = localhost
mapping.admin.source = /admin
mapping.admin.target = /admin
mapping.admin.idProvider.system = default
```



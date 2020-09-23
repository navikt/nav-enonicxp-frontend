React/[Next.js](https://nextjs.org/) frontend for Enonic XP headless CMS. 

## Lokal kjøring

Kjører lokalt på [http://localhost:3000](http://localhost:3000). Appen er avhengig av en lokalt tilgjengelig instans av Enonic XP.

Secrets i legges inn i .env.local 

####Development mode:
```bash
npm run dev
```

####Production mode:
Kopier først innhold fra .env.development til .env.local

```bash
npm run build && npm start
```

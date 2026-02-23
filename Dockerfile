FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:24-slim

ENV NODE_ENV=production
ENV NPM_CONFIG_CACHE=/tmp/npm-cache

WORKDIR /app

COPY package*.json .env ./

COPY packages/nextjs/package*.json packages/nextjs/next.config.js .env ./nextjs/
COPY packages/nextjs/.next ./nextjs/.next/
COPY packages/nextjs/public ./nextjs/public/

COPY node_modules ./node_modules/

COPY .env ./server/
COPY packages/server/package*.json ./server/
COPY packages/server/.dist ./server/.dist/

USER nextjs

EXPOSE 3000
ENTRYPOINT ["node"]
CMD ["server/.dist/server.cjs"]

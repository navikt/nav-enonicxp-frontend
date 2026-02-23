FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:24-slim

ENV NODE_ENV=production
ENV NPM_CONFIG_CACHE=/tmp/npm-cache

# Tving k8s-vennlig binding og port
ENV PORT=3000
ENV HOST=0.0.0.0
ENV HOSTNAME=0.0.0.0

# Kjekt å ha for mange libs som skriver til tmp
ENV TMPDIR=/tmp

WORKDIR /app

COPY package*.json .env ./

COPY packages/nextjs/package*.json packages/nextjs/next.config.js .env ./nextjs/
COPY packages/nextjs/.next ./nextjs/.next/
COPY packages/nextjs/public ./nextjs/public/

COPY node_modules ./node_modules/

COPY .env ./server/
COPY packages/server/package*.json ./server/
COPY packages/server/.dist ./server/.dist/

EXPOSE 3000

WORKDIR /app/server
ENTRYPOINT ["node"]
CMD [".dist/server.cjs"]
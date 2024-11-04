FROM node:20-bullseye-slim

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

WORKDIR /app

COPY package*.json packages/nextjs/next.config.js .env /app/
COPY packages/nextjs/.next /app/.next/
COPY packages/nextjs/public /app/public/
COPY node_modules /app/node_modules/

COPY packages/server/package*.json /app/server/
COPY node_modules /app/server/node_modules/
COPY packages/server/.dist /app/server/.dist/

USER nextjs

EXPOSE 3000
CMD ["npm", "start"]

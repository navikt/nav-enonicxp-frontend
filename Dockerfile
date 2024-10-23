FROM node:20-bullseye-slim

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

WORKDIR /app

COPY packages/nextjs/package*.json packages/nextjs/next.config.js packages/nextjs/.env /app/
COPY build/.next /app/.next/
COPY packages/nextjs/public /app/public/
COPY packages/nextjs/node_modules /app/node_modules/

COPY packages/server/package*.json /app/server/
COPY build/.server /app/server/.dist/

USER nextjs

EXPOSE 3000
CMD ["npm", "start"]

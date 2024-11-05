FROM node:20-bullseye-slim

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

WORKDIR /app

COPY package*.json /app/

COPY .env /app/packages/nextjs/
COPY packages/nextjs/package*.json packages/nextjs/next.config.js /app/packages/nextjs/
COPY packages/nextjs/.next /app/packages/nextjs/.next/
COPY packages/nextjs/public /app/packages/nextjs/public/

COPY node_modules /app/node_modules/

COPY .env /app/packages/server/
COPY packages/server/package*.json /app/packages/server/
COPY packages/server/node_modules /app/packages/server/node_modules/
COPY packages/server/.dist /app/packages/server/.dist/

USER nextjs

EXPOSE 3000
CMD ["npm", "start"]

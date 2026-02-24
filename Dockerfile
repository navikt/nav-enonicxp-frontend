FROM node:24-alpine

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

WORKDIR /app

COPY packages/nextjs/package*.json packages/nextjs/next.config.js .env /app/nextjs/
COPY packages/nextjs/.next /app/nextjs/.next/
COPY packages/nextjs/public /app/nextjs/public/

COPY nonsymlink/server/node_modules /app/server/node_modules/
COPY nonsymlink/nextjs/node_modules /app/nextjs/node_modules/
COPY nonsymlink/shared/node_modules /app/shared/node_modules/

COPY .env /app/server/
COPY packages/server/package*.json /app/server/
COPY packages/server/.dist /app/server/.dist/

USER nextjs

ENV NODE_PATH=/app/server/node_modules

EXPOSE 3000
CMD ["node", "-r", "dotenv/config", "server/.dist/server.cjs", "dotenv_config_path=./.env"]
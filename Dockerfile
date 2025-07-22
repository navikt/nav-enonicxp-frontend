FROM node:22-alpine

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

WORKDIR /app

COPY package*.json .env /app/

COPY packages/nextjs/package*.json packages/nextjs/next.config.js .env /app/nextjs/
COPY packages/nextjs/.next /app/nextjs/.next/
COPY packages/nextjs/public /app/nextjs/public/

COPY node_modules /app/node_modules/

COPY .env /app/server/
COPY packages/server/package*.json /app/server/
COPY packages/server/.dist /app/server/.dist/

USER nextjs

ENV NODE_OPTIONS="--trace-warnings"
ENV DEBUG="next:*"

EXPOSE 3000
CMD ["npm", "run", "start-in-docker"]

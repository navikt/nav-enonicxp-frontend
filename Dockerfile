FROM node:20-bullseye-slim

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

WORKDIR /app

COPY package*.json /app/
COPY node_modules /app/node_modules/

COPY .next /app/.next/
COPY public /app/public/
COPY src /app/src/

COPY next.config.js .env /app/
COPY .serverDist /app/.serverDist/
COPY tsconfig.json next-env.d.ts /app/

USER nextjs

EXPOSE 3000
CMD ["npm", "run", "start"]

FROM node:20-bullseye-slim

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

WORKDIR /app

COPY package*.json next.config.js .env /app/
COPY .next /app/.next/
COPY public /app/public/
COPY node_modules /app/node_modules/

COPY /server/package*.json /app/server/
COPY /server/.dist /app/server/.dist/

USER nextjs

EXPOSE 3000
CMD ["npm", "start"]

FROM node:20-bullseye-slim

WORKDIR /tmp

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY package*.json /tmp/
COPY node_modules /tmp/node_modules/

COPY .next /tmp/.next/
COPY public /tmp/public/
COPY src /tmp/src/

COPY next.config.js .env /tmp/
COPY .serverDist /tmp/.serverDist/
COPY tsconfig.json next-env.d.ts /tmp/

USER nextjs

EXPOSE 3000
CMD ["npm", "run", "start"]

FROM node:16-alpine

WORKDIR /app

ARG READER_TOKEN

COPY package*.json /app/
COPY /failover/.npmrc /app/
RUN npm ci

RUN rm -f .npmrc

COPY /failover/server.js /app/server/server.js
COPY .next-static /app/.next-static/
COPY public /app/public/

COPY next.config.js /app/
COPY /failover/.env /app/.env
COPY image-manifest /tmp/images/

EXPOSE 3000
CMD ["npm", "run", "start"]

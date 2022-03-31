FROM node:16-alpine

WORKDIR /app

ARG READER_TOKEN

COPY package*.json /app/
COPY /failover/.npmrc /app/.npmrc
RUN npm ci

RUN rm -f .npmrc

COPY .next-static /app/.next-static/
COPY public /app/public/

COPY next.config.js /app/
COPY .env /app/.env
COPY /tmp/image-cache/ /tmp/image-cache/

EXPOSE 3000
CMD ["npm", "run", "start-next"]

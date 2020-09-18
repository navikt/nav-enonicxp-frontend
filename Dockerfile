FROM navikt/node-express:12.2.0-alpine

ENV NODE_ENV production

WORKDIR /app
COPY . /app

RUN npm install

RUN npm run build
EXPOSE 8080
CMD npm run start

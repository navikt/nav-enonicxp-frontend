FROM node:16-alpine

WORKDIR /app

COPY package*.json /app/
COPY node_modules /app/node_modules/
RUN npm install sharp

COPY .next /app/.next/
COPY public /app/public/

COPY next.config.js .env image-manifest* /app/
COPY server /app/server/

EXPOSE 3000
CMD ["npm", "run", "start"]

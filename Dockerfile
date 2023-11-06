FROM node:20-bullseye-slim

WORKDIR /app

COPY package*.json /app/
COPY node_modules /app/node_modules/

COPY .next /app/.next/
COPY public /app/public/

COPY next.config.js .env image-manifest* /app/
COPY .serverDist /app/.serverDist/

EXPOSE 3000
CMD ["npm", "run", "start"]

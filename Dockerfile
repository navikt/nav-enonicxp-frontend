FROM node:16-bullseye-slim

WORKDIR /app

COPY package*.json /app/
COPY node_modules /app/node_modules/

# Install this package here to ensure the correct binaries are installed
# for the container OS + CPU architecture
RUN npm install sharp@0.30.4

COPY .next /app/.next/
COPY public /app/public/

COPY next.config.js .env image-manifest* /app/
COPY server /app/server/

EXPOSE 3000
CMD ["npm", "run", "start"]

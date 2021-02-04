FROM node:12.18-alpine

# Create app directory
WORKDIR /app

# Installing dependencies
COPY package*.json /app/
RUN npm ci

# Copying build files from workflow
COPY public /app/public/
COPY .next /app/.next/
COPY [".env", "next.config.js", "/app/"]

# Start app
EXPOSE 3000
CMD ["npm", "run", "start"]

FROM node:16-alpine

# Create app directory
WORKDIR /app

# Installing dependencies
COPY package*.json /app/
RUN npm ci

# Copying build folders
COPY .next /app/.next/
COPY public /app/public/

# Copy necesarry files
COPY next.config.js /app/
COPY .env  /app/

# Start app
EXPOSE 3000
CMD ["npm", "run", "start"]

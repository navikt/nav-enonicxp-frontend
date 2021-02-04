FROM node:12.18-alpine

# Create app directory
WORKDIR /app

# Installing dependencies
COPY package*.json /app/
RUN npm ci

# Copying build folders
COPY .next /app/.next/
COPY public /app/public/

# Copy necesarry files
COPY .env /app/
COPY next.config.js /app/
COPY url-lookup-table.json /app/

# Start app
EXPOSE 3000
CMD ["npm", "run", "start"]

FROM node:16-alpine

# Create app directory
WORKDIR /app

# Installing dependencies
COPY package*.json /app/
RUN npm ci

# Copying build folders
COPY .next /app/.next/
COPY public /app/public/

# Copy necessary files
COPY next.config.js /app/
COPY .env  /app/

# Set permission/ownership needed for nextjs html/json cache
# (1069 is the uid for the app process in containers on nais)
RUN chown -R 1069 /app/.next

# Start app
EXPOSE 3000
CMD ["npm", "run", "start"]

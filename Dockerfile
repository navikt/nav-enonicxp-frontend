FROM node:16-alpine

ARG NEXT_VERSION
RUN echo $NEXT_VERSION

# Create app directory
WORKDIR /app

# Installing dependencies
COPY package*.json /app/
COPY node_modules /app/node_modules/

# Copying build folders
COPY .next /app/.next/
COPY public /app/public/

# Copy necessary files
COPY next.config.js /app/
COPY .env  /app/
COPY server /app/server/

# Start app
EXPOSE 3000
CMD ["npm", "run", "start"]

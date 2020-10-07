FROM node:14
ENV NODE_ENV production

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json /usr/src/app/
RUN npm ci

# Copying build files from workflow
COPY public /usr/src/app/public/
COPY .next /usr/src/app/.next/
COPY .env /usr/src/app/
RUN cat /usr/src/app/.env

# Start app
EXPOSE 3000
CMD "npm" "start"

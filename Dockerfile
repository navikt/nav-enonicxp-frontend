FROM node:14

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json /usr/src/app/
RUN npm ci

COPY src /usr/src/app/src/
COPY public /usr/src/app/public/
COPY [".env", "next.config.js", "next-env.d.ts", "/usr/src/app/"]
RUN npm run build

ENV NODE_ENV production
# Start app
EXPOSE 3000
CMD "npm" "start"

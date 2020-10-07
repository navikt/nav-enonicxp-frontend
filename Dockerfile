FROM node:14

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json /usr/src/app/
RUN npm ci

COPY .next /usr/src/app/.next/
COPY public /usr/src/app/public/
COPY [".env", "next.config.js", "/usr/src/app/"]

## Building app
#COPY src /usr/src/app/src/
#COPY public /usr/src/app/public/
#COPY [".env", "next.config.js", "next-env.d.ts", "/usr/src/app/"]
#RUN npm run build

# Start app
ENV NODE_ENV production
EXPOSE 3000
CMD "npm" "start"

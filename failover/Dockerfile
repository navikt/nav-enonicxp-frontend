FROM node:20-bullseye-slim

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN apt-get update
RUN apt-get --assume-yes --no-install-recommends install ca-certificates

WORKDIR /app

ARG GITHUB_PAT
ARG SERVICE_SECRET
ARG ENV_FILE

COPY package*.json /failover/.npmrc /app/
RUN npm ci --force --ignore-scripts
RUN rm -f .npmrc

COPY public /app/public/
COPY server /app/server/
COPY src /app/src/
COPY next.config.js tsconfig.json .eslintrc.json /app/
COPY "/failover/$ENV_FILE" /app/.env

RUN npm run build

# Multistage build to avoid leaking secrets to the final image
FROM node:20-bullseye-slim

WORKDIR /app

COPY --from=0 app /app/
COPY --from=0 /tmp/images/image-manifest /tmp/images/image-manifest

USER nextjs

EXPOSE 3000
CMD ["npm", "run", "start"]

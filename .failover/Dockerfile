FROM node:20-bullseye-slim

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN apt-get update
RUN apt-get --assume-yes --no-install-recommends install ca-certificates && apt-get clean

WORKDIR /app

ARG GITHUB_PAT
ARG SERVICE_SECRET
ARG ENV_FILE

COPY package*.json .failover/.npmrc /app/

COPY packages/server /app/packages/server/
COPY packages/nextjs /app/packages/nextjs/
COPY packages/shared /app/packages/shared/

RUN npm ci --ignore-scripts
RUN rm -f .npmrc

COPY ".failover/${ENV_FILE}" /app/.env
# Also copy this .env file to the nextjs and server packages so they can
# pick the environment variables as needed.
COPY /app/.env /app/packages/nextjs/.env
COPY /app/.env /app/packages/server/.env

RUN npm run build

# Multistage build to avoid leaking secrets to the final image
FROM node:20-bullseye-slim

WORKDIR /app

COPY --from=0 app /app/
COPY --from=0 /tmp/images/image-manifest /tmp/images/image-manifest

USER nextjs

EXPOSE 3000
CMD ["npm", "start"]

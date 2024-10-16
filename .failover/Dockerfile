FROM node:20-bullseye-slim

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN apt-get update
RUN apt-get --assume-yes --no-install-recommends install ca-certificates && apt-get clean

WORKDIR /app

ARG GITHUB_PAT
ARG SERVICE_SECRET
ARG ENV_FILE

COPY packages/nextjs/package*.json /.failover/.npmrc /app/nextjs/
COPY packages/server /app/server/

RUN npm ci --ignore-scripts
RUN rm -f .npmrc

COPY packages/nextjs/public /app/public/
COPY packages/nextjs/src /app/nextjs/src/
COPY packages/common /app/srcommon/
COPY packages/nextjs/next.config.js packages/nextjs/tsconfig.json packages/nextjs/.eslintrc.json /app/nextjs/
COPY "/.failover/$ENV_FILE" /app/nextjs/.env

RUN npm run build

# Multistage build to avoid leaking secrets to the final image
FROM node:20-bullseye-slim

WORKDIR /app

COPY --from=0 app /app/
COPY --from=0 /tmp/images/image-manifest /tmp/images/image-manifest

USER nextjs

EXPOSE 3000
CMD ["npm", "start"]

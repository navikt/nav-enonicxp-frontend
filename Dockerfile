FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:24-slim

WORKDIR /app

COPY .env /app/

COPY packages/nextjs/next.config.js /app/nextjs/
COPY packages/nextjs/.next /app/nextjs/.next/
COPY packages/nextjs/public /app/nextjs/public/

# Merge all production dependencies into a single shared node_modules.
# Both server (/app/server/.dist/) and nextjs (/app/nextjs/) resolve
# modules by walking up to /app/node_modules/ — one React instance.
COPY nonsymlink/server/node_modules /app/node_modules/
COPY nonsymlink/nextjs/node_modules /app/node_modules/

COPY .env /app/server/
COPY packages/server/.dist /app/server/.dist/

USER nonroot

EXPOSE 3000
CMD ["-r", "dotenv/config", "server/.dist/server.cjs", "dotenv_config_path=./.env"]
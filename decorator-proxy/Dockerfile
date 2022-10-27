FROM node:18-alpine

WORKDIR /app

COPY package*.json /app/
COPY node_modules /app/node_modules/
COPY dist /app/dist/

# Start app
EXPOSE 3001
CMD ["npm", "run", "start"]

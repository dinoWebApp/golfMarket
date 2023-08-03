FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY TGolShop/dist routes server.js ./

ENTRYPOINT [ "node", "server.js" ]
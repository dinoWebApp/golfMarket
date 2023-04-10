FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci
ENV NODE_ENV production

USER node
COPY server.js .

EXPOSE 3000

ENTRYPOINT [ "node", "server.js" ]

CMD [ "npm", "start" ]
FROM node:16-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm ci 

RUN npm install -g nodemon

COPY . .

EXPOSE 3000

CMD [ "nodemon", "server.js" ]
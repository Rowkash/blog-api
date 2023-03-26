FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

COPY ./dist ./dist

CMD [ "pnpm", "run", "start:dev" ]
FROM node:18

WORKDIR /app

COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

COPY ./dist ./dist

CMD [ "pnpm", "run", "start:dev" ]
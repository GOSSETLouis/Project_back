FROM node:16-alpine3.15 as build

RUN npm install -g pnpm 

WORKDIR /app

COPY ./package.json ./pnpm-lock.yaml ./
COPY ./tsconfig.json .

RUN pnpm install 

COPY ./src ./src

RUN pnpm compile



FROM node:16-alpine3.15 as production-deps

RUN npm install -g pnpm 

WORKDIR /app

COPY ./package.json ./pnpm-lock.yaml ./

RUN pnpm install --production



FROM node:16-alpine3.15 as run

WORKDIR /app

COPY --from=production-deps /app/node_modules ./node_modules
COPY --from=build /app/build ./build

CMD [ "node" , "/app/build/src/index.js" ]
# build
FROM node:23-alpine3.20 AS build

ENV NODE_ENV=build

RUN mkdir /app
WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

#Production stage
FROM node:23-alpine3.20 AS production

WORKDIR /app

COPY package*.json .
COPY tsconfig.json ./
COPY ./prisma ./prisma
COPY ./src ./

RUN npm ci --only=production

COPY --from=build /app/build ./build

CMD ["sh", "-c", "npm run db:deploy"]
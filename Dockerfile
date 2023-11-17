FROM node:20-alpine

ENV MONGO_INITDB_ROOT_USERNAME admin
ENV MONGO_INITDB_ROOT_PASSWORD password

WORKDIR /app

COPY ./mongo-init.js /docker-entrypoint-initdb.d/

COPY . .

RUN npm install
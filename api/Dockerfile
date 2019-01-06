FROM node:10.15.0-alpine

ENV NODE_ENV=development

WORKDIR /usr/src/instagram-feed/api

COPY package.json .
COPY yarn.lock .

RUN yarn install --frozen-lockfile

COPY . .

FROM node:10.15.0-alpine

ENV NODE_ENV=production

WORKDIR /usr/src/instagram-feed/api

COPY package.json .
COPY yarn.lock .

RUN yarn install --prod --frozen-lockfile

COPY . .

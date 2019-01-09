FROM node:10.15.0-alpine

ENV NODE_ENV=development

WORKDIR /usr/src/instagram-feed/web-spa-nextjs

COPY package.json .
COPY yarn.lock .

# RUN yarn install --prod --frozen-lockfile
RUN yarn install --frozen-lockfile

COPY . .

CMD ["yarn", "dev"]

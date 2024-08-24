FROM node:16.19.1-slim

WORKDIR /usr/app

COPY package.json .

RUN yarn install

COPY . .

RUN yarn build
RUN yarn generate-docs
CMD yarn start

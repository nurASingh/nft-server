FROM node:lts-alpine3.14


COPY bin .
COPY models .
COPY public .
COPY routes .
COPY typings .
COPY view .
COPY app.js .
COPY config.js .
COPY package.json .
COPY typing.json .
COPY verify.json .
COPY Procfile .

npm install

npm start
FROM node:16-alpine3.11

WORKDIR /usr/src/app

COPY . /usr/src/app



RUN file="$(ls -1 /usr/src/app)" && echo $file

RUN npm install

EXPOSE 8080

CMD [ "npm", "start" ]
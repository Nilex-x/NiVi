FROM node:alpine

WORKDIR /usr/src/app

COPY ./ /usr/src/app/

RUN cd /usr/src/app && npm install && rm dockerfile

RUN npm run build

RUN npm install -g serve

EXPOSE 3000

CMD [ "serve", "-s", "build", "-l", "3000" ]
FROM node:alpine

WORKDIR /usr/src/app

COPY ./ /usr/src/app/

RUN npm install -g npm@8.0.0

RUN cd /usr/src/app && npm install && rm dockerfile

ENV BROWSER="none"

ENV URL_GRAPHQL="http://graphql/graphql"

CMD [ "npm", "start" ]
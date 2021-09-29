FROM node

WORKDIR /app

ENV MYSQL_HOST=localhost
ENV MYSQL_DATABASE=database
ENV MYSQL_USER=admin
ENV MYSQL_PASSWORD=password

ENV HTTP_PORT=8080
ENV NODE_ENV=production

COPY ./src /app

RUN yarn

EXPOSE ${HTTP_PORT}

CMD yarn start

FROM node

WORKDIR /app

ENV MYSQL_HOST=localhost
ENV MYSQL_DATABASE=database
ENV MYSQL_USER=admin
ENV MYSQL_PASSWORD=password

ENV NODE_ENV=production
ENV PORT=8080

COPY ./src /app

RUN yarn

EXPOSE ${PORT}

CMD yarn start

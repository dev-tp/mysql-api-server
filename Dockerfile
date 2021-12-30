FROM ubuntu

WORKDIR /root

ENV TZ America/Los_Angeles
RUN ln -snf /usr/share/zoneinfo/${TZ} /etc/localtime
RUN echo ${TZ} > /etc/timezone

RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y mysql-client mysql-server

RUN curl -sL https://deb.nodesource.com/setup_16.x | bash
RUN apt-get install -y nodejs
RUN npm install -g yarn

COPY .env /root
COPY schema.sql /root
COPY setup.sh /root
COPY src /root/src

RUN printf "\n[mysqld]\nbind-address = 0.0.0.0\n" >> /etc/mysql/my.cnf
RUN bash setup.sh

EXPOSE 3306 8080

CMD node src/index.js & mysqld

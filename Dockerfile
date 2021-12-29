FROM ubuntu

WORKDIR /root

ENV TZ America/Los_Angeles
RUN ln -snf /usr/share/zoneinfo/${TZ} /etc/localtime
RUN echo ${TZ} > /etc/timezone

RUN apt-get update
RUN apt-get install -y mysql-client mysql-server
RUN apt-get install -y npm nodejs

RUN npm install -g yarn

COPY init.sh /root
COPY src /root/src

EXPOSE 8080

# CMD /bin/bash init.sh

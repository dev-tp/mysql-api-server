FROM ubuntu

RUN apt-get update
RUN apt-get install -y cron
RUN apt-get install -y mysql-client mysql-server

RUN printf "\n[mysqld]\nbind-address = 0.0.0.0\n" >> /etc/mysql/my.cnf

COPY . /

RUN chmod +x /init.sh

EXPOSE 3306 33060
ENTRYPOINT [ "/init.sh" ]

CMD [ "mysqld" ]

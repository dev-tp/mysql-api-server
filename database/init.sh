#!/bin/bash

execute_sql() {
  mysql -uroot -e "$@"
}

if [[ -z $MYSQL_USER ]] || [[ -z $MYSQL_PASSWORD ]] &&
   [[ -z $MYSQL_ROOT_PASSWORD ]]
then
  echo "You must at least declare MYSQL_ROOT_PASSWORD or MYSQL_USER and MYSQL_PASSWORD."
  exit
fi

mkdir -p /nonexistent/

echo "Starting temporary server..."
service mysql start > /dev/null

if [[ -n $MYSQL_USER ]] && [[ -n $MYSQL_PASSWORD ]]; then
  execute_sql "CREATE USER '$MYSQL_USER'@'%' IDENTIFIED WITH mysql_native_password BY '$MYSQL_PASSWORD'"
  execute_sql "GRANT ALL ON *.* TO '$MYSQL_USER'@'%'"

  if [[ -n $MYSQL_DATABASE ]]; then
    execute_sql "CREATE DATABASE \`$MYSQL_DATABASE\`"

    if [ -f "init.sql" ]; then
      mysql -uroot < init.sql
    fi

    mkdir -p /backup/

    echo "0 * * * * mysqldump -u$MYSQL_USER -p$MYSQL_PASSWORD --skip-triggers --databases $MYSQL_DATABASE > /backup/$MYSQL_DATABASE.sql" > job

    crontab job
    rm job

    service cron start > /dev/null
  fi
fi

if [[ -n $MYSQL_ROOT_PASSWORD ]]; then
  execute_sql "ALTER USER 'root'@'localhost' IDENTIFIED BY '$MYSQL_ROOT_PASSWORD'"
else
  execute_sql "UPDATE mysql.user SET plugin = '' WHERE user = 'root' AND host = 'localhost'"
fi

echo "Stopping temporary server..."
service mysql stop > /dev/null

echo "MySQL server running."
mysqld

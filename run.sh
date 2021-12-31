#!/bin/bash

set -o allexport
source .env
set +o allexport

mysqld &

if [[ $NODE_ENV == 'production' ]]; then
  yarn --cwd src start
else
  yarn --cwd src start:dev
fi

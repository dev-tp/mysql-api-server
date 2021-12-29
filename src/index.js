import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import mysql from 'mysql';

export default class MySQLServer {
  constructor() {
    dotenv.config({ path: '../.env' });

    this.connection = mysql.createPool({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });

    this.app = express();
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(helmet());
  }

  listen(callback) {
    this.app.listen(8080, callback);
  }

  query(query) {
    return new Promise((resolve, reject) => {
      this.connection.query(query, (error, results) => {
        if (error) {
          reject(error);
        }

        resolve(results);
      });
    });
  }

  route(route) {
    return this.app.route(route);
  }
}

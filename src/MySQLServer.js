import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import mysql from 'mysql';

export default class MySQLServer {
  constructor({ host, user, password, database }) {
    this.app = express();
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(helmet());

    this.connection = mysql.createPool({ host, user, password, database });
  }

  listen(callback) {
    this.app.listen(8080, callback);
  }

  query(query, values) {
    return new Promise((resolve, reject) => {
      this.connection.query(query, values, (error, results) => {
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

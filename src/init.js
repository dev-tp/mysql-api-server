import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import mysql from 'mysql';

export default class MySqlServer {
  constructor(port = 8080) {
    this.port = port;

    dotenv.config({ path: '../.env' });

    this.connection = mysql.createPool({
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
    });

    this.app = express();
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(helmet());
  }

  listen(callback) {
    this.app.listen(this.port, callback);
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

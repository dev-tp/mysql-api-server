import compression from 'compression';
import express from 'express';
import mysql from 'mysql';

class MySQLServer {
  constructor(config) {
    this.database = mysql.createConnection(config);
    this.database.connect();

    this.server = express();
    this.server.use(compression());
    this.server.use(express.json());
  }

  listen() {
    this.server.on('close', () => this.database.end());

    const port = process.env.HTTP_PORT || 8080;

    const server = this.server.listen(port, () =>
      console.log(`Listening on port ${port}`)
    );

    process.on('SIGINT', () => server.close());
  }

  query(query, params) {
    return new Promise((resolve, reject) => {
      this.database.query(query, params, (error, results) => {
        if (error) {
          return reject({ error });
        }

        resolve({ ...results });
      });
    });
  }

  route(prefix) {
    return this.server.route(prefix);
  }
}

const server = new MySQLServer({
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
});

server.route('/api').get((_, response) =>
  server
    .query('SELECT "Hello, World!"')
    .then((result) => response.send(result))
    .catch((error) => response.send(error))
);

server.listen();

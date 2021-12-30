import dotenv from 'dotenv';
import path from 'path';
import url from 'url';

import MySQLServer from './MySQLServer.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const server = new MySQLServer({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

server.route('/api').get((_, response) =>
  server
    .query('SELECT now() AS time')
    .then((results) => response.send(results[0]))
    .catch((error) => response.send({ error }))
);

server.listen();

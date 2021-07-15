const { Client } = require('pg');

const client = new Client();

client
  .connect()
  .then(() => console.log('PostgreSQL database connection established!'))
  .catch((err) => console.log('PostgreSQL database connection error', err.stack));
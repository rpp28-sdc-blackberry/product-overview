const { Client } = require('pg');

const client = new Client({
  database: 'product_overview',
});

client
  .connect()
  .then(() => console.log('PostgreSQL database connection established!'))
  .catch((err) => console.log('PostgreSQL database connection error', err.stack));

module.exports.client = client;
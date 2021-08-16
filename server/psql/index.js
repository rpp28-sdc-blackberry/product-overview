const { Client } = require('pg');
const cred = require('../../config.js');

// const client = new Client({
//   database: 'product_overview',
// });

const client = new Client ({
  connectionString: cred.credentials
});

client
  .connect()
  .then(() => console.log('PostgreSQL database connection established!'))
  .catch((err) => console.log('PostgreSQL database connection error', err.stack));

module.exports.client = client;
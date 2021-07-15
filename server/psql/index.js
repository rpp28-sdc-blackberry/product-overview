const { Client } = require('pg');

const client = new Client();
client
  .connect()
  .then(() => console.log('connected'))
  .catch((err) => console.log('connection error', err.stack));
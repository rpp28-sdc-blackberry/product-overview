require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

app.get('/products', (req, res) => {
  // TODO
  res.send();
});

app.get('/products/:product_id', (req, res) => {
  let productId = req.params.product_id;
  // TODO
  res.send();
});

app.get('/products/:product_id/styles', (req, res) => {
  let productId = req.params.product_id;
  // TODO
  res.send();
});

app.get('/products/:product_id/related', (req, res) => {
  let productId = req.params.product_id;
  // TODO
  res.send();
});

app.listen(process.env.SVPORT, () => {
  console.log(`Listening at http://localhost:${process.env.SVPORT}`);
});
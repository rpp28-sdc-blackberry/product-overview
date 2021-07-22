require('dotenv').config();
const express = require('express');
const db = require('./psql/models.js');
const app = express();
app.use(express.json());

app.get('/products', (req, res) => {
  let { page, count } = req.query;
  page = page || 1;
  count = count || 5;
  db.getAllProducts(page, count)
    .then(results => res.status(200).send(results))
    .catch(error => res.status(500).send(error));
});

app.get('/products/:product_id', (req, res) => {
  let productId = req.params.product_id;
  db.getProductById(productId)
    .then(results => res.status(200).send(results))
    .catch(error => res.status(500).send(error));
});

app.get('/products/:product_id/styles', (req, res) => {
  let productId = req.params.product_id;
  db.getProductStyleById(productId)
    .then(results => res.status(200).send(results))
    .catch(error => res.status(500).send(error));
});

app.get('/products/:product_id/related', (req, res) => {
  let productId = req.params.product_id;
  db.getRelatedProducts(productId)
    .then(results => res.status(200).send(results))
    .catch(error => res.status(500).send(error));
});

app.listen(process.env.SVPORT, () => {
  console.log(`Listening at http://localhost:${process.env.SVPORT}`);
});
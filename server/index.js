require('dotenv').config();
const express = require('express');
const db = require('./psql/models.js');
const app = express();
const redis = require('redis');

const REDIS_PORT = 6379;
const client = redis.createClient(REDIS_PORT);

app.use(express.json());

app.get('/products', (req, res) => {
  client.get('products', (err, data) => {
    if (err) {
      throw err;
    }
    if (data) {
      res.status(200).send(JSON.parse(data));
    } else {
      let { page, count } = req.query;
      page = page || 1;
      count = count || 5;
      db.getAllProducts(page, count)
        .then(results => {
          const products = results;
          client.setex('users', 600, JSON.stringify(products));
          res.send(results);
        })
        .catch(error => res.send(error));
    }
  });
});

app.get('/products/:product_id', (req, res) => {
  let productId = req.params.product_id;
  client.get('products/' + productId, (err, data) => {
    if (err) {
      throw err;
    }
    if (data) {
      res.status(200).send(JSON.parse(data));
    } else {
      db.getProductById(productId)
        .then(results => {
          const product = results;
          client.setex('products/' + productId, 600, JSON.stringify(product));
          res.send(results);
        })
        .catch(error => res.send(error));
    }
  });
});

app.get('/products/:product_id/styles', (req, res) => {
  let productId = req.params.product_id;
  client.get('products/' + productId + '/styles', (err, data) => {
    if (err) {
      throw err;
    }
    if (data) {
      res.status(200).send(JSON.parse(data));
    } else {
      db.getProductStyleById(productId)
        .then(results => {
          const styles = results;
          client.setex('products/' + productId + '/styles', 600, JSON.stringify(styles));
          res.send(results);
        })
        .catch(error => res.send(error));
    }
  });
});

app.get('/products/:product_id/related', (req, res) => {
  let productId = req.params.product_id;
  client.get('products/' + productId + '/related', (err, data) => {
    if (err) {
      throw err;
    }
    if (data) {
      res.status(200).send(JSON.parse(data));
    } else {
      db.getRelatedProducts(productId)
        .then(results => {
          const relatedProducts = results;
          client.setex('products/' + productId + '/related', 600, JSON.stringify(relatedProducts));
          res.send(results);
        })
        .catch(error => res.send(error));
    }
  });
});

app.get('/loaderio-3c86c143a41f84026cbc715440b64087', (req, res) => {
  res.send('loaderio-3c86c143a41f84026cbc715440b64087');
});

app.listen(process.env.SVPORT, () => {
  console.log(`Listening at http://localhost:${process.env.SVPORT}`);
});
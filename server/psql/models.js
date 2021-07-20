const db = require('./index.js');

module.exports = {
  getAllProducts: (page, count) => {
    let offset = (page - 1) * count;
    let queryString = 'SELECT * FROM products OFFSET $1 LIMIT $2';
    let values = [offset, count];
    return db.client
      .query(queryString, values)
      .then(results => results.rows)
      .catch(error => error);
  },
  getProductById: (productId) => {
    let queryString = 'SELECT * FROM products WHERE id = $1';
    let values = [productId];
    return db.client
      .query(queryString, values)
      .then(results => console.log('results: ', results))
      .catch(error => console.log('error: ', error));
  }
};

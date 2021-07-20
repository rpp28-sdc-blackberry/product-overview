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
    let queryString1 = 'SELECT * FROM products WHERE id = $1';
    let queryString2 = 'SELECT feature, value FROM features WHERE product_id = $1';
    let values = [productId];
    return Promise.all([
      db.client.query(queryString1, values),
      db.client.query(queryString2, values)])
      .then(results => {
        let productInfo = results[0].rows[0];
        let productFeatures = results[1].rows;
        productInfo.features = productFeatures;
        return productInfo;
      })
      .catch(error => error);
  }
};

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
  },
  getProductStyleById: (productId) => {
    let queryString1 = 'SELECT id, name, sale_price, original_price, default_style FROM styles WHERE product_id = $1';
    let queryString2 = 'SELECT p.style_id, thumbnail_url, url FROM photos p, styles s WHERE p.style_id = s.id AND s.product_id = $1';
    let queryString3 = 'SELECT k.style_id, k.id, quantity, size FROM skus k, styles s WHERE k.style_id = s.id AND s.product_id = $1';
    let values = [productId];
    return Promise.all([
      db.client.query(queryString1, values),
      db.client.query(queryString2, values),
      db.client.query(queryString3, values)])
      .then(results => {
        let styles = results[0].rows;
        let photos = results[1].rows;
        let skus = results[2].rows;
        let temp = {};
        photos.forEach(photo => {
          let modifiedPhoto = { 'thumbnail_url': photo.thumbnail_url, 'url': photo.url };
          if (temp[photo.style_id] === undefined) {
            let init = { photos: [modifiedPhoto], skus: {}};
            temp[photo.style_id] = init;
          } else {
            temp[photo.style_id].photos.push(modifiedPhoto);
          }
        });
        skus.forEach(sku => {
          let modifiedSku = { quantity: sku.quantity, size: sku.size };
          if (temp[sku.style_id] === undefined) {
            let init = { photos: [], skus: { [sku.id]: modifiedSku }};
            temp[sku.style_id] = init;
          } else {
            temp[sku.style_id].skus[sku.id] = modifiedSku;
          }
        });
        styles.forEach(style => {
          style['default?'] = style.default_style;
          style.photos = temp[style.id].photos;
          style.skus = temp[style.id].skus;
          delete style.default_style;
        });
        return { 'product_id': productId, 'results': styles };
      })
      .catch(error => error);
  },
  getRelatedProducts: (productId) => {
    let queryString = 'SELECT * FROM related_products WHERE current_product_id = $1';
    let values = [productId];
    return db.client
      .query(queryString, values)
      .then(results => results.rows.map(relation => relation.related_product_id))
      .catch(error => error);
  }
};

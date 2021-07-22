require('dotenv').config();
const frisby = require('frisby');
const baseURL = `http://localhost:${process.env.SVPORT}`;

describe('/products/:product_id/related endpoint', () => {
  it('should return a status of 200', function () {
    return frisby
      .timeout(30000)
      .get(`${baseURL}/products/3/related`)
      .expect('status', 200);
  });
});
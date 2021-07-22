require('dotenv').config();
const frisby = require('frisby');
const baseURL = `http://localhost:${process.env.SVPORT}`;

describe('/products/:product_id/styles endpoint', () => {
  it('should return a status of 200', function () {
    return frisby
      .timeout(30000)
      .get(`${baseURL}/products/2/styles`)
      .expect('status', 200);
  });
});
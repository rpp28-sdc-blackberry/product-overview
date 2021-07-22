require('dotenv').config();
const frisby = require('frisby');
const baseURL = `http://localhost:${process.env.SVPORT}`;

describe('/products/:product_id/related endpoint', () => {
  it('should return a status of 200 for a valid product id', function () {
    return frisby
      .timeout(30000)
      .get(`${baseURL}/products/3/related`)
      .expect('status', 200);
  });
  xit('should return a status of 500 for an invalid product id', function () {
    return frisby
      .timeout(30000)
      .get(`${baseURL}/products/-1/related`)
      .expect('status', 500);
  });
  it('should return the correct related product ids', () => {
    return frisby
      .timeout(30000)
      .get(`${baseURL}/products/1/related`)
      .then(res => {
        expect(res.json).toEqual([2, 3, 8, 7]);
      });
  });
});
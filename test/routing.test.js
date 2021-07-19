require('dotenv').config();
const frisby = require('frisby');
const baseURL = `http://localhost:${process.env.SVPORT}`;

xdescribe('/products endpoint', () => {
  it('should return a status of 200', function () {
    return frisby
      .get(`${baseURL}/products`)
      .expect('status', 200);
  });
});

xdescribe('/products/:product_id endpoint', () => {
  it('should return a status of 200', function () {
    return frisby
      .get(`${baseURL}/products/1`)
      .expect('status', 200);
  });
});

xdescribe('/products/:product_id/styles endpoint', () => {
  it('should return a status of 200', function () {
    return frisby
      .get(`${baseURL}/products/2/styles`)
      .expect('status', 200);
  });
});

xdescribe('/products/:product_id/related endpoint', () => {
  it('should return a status of 200', function () {
    return frisby
      .get(`${baseURL}/products/3/related`)
      .expect('status', 200);
  });
});
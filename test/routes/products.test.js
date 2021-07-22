require('dotenv').config();
const frisby = require('frisby');
const baseURL = `http://localhost:${process.env.SVPORT}`;

describe('/products endpoint', () => {
  it('should return a status of 200', function () {
    return frisby
      .timeout(30000)
      .get(`${baseURL}/products`)
      .expect('status', 200);
  });
});
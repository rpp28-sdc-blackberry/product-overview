require('dotenv').config();
const frisby = require('frisby');
const server = require('../../server/index.js');
const baseURL = `http://localhost:${process.env.SVPORT}`;

describe('/products endpoint', () => {
  it('should return a status of 200', function () {
    return frisby
      .timeout(30000)
      .get(`${baseURL}/products`)
      .expect('status', 200);
  });
  it('should start at product id 1 by default', () => {
    return frisby
      .timeout(30000)
      .get(`${baseURL}/products`)
      .then(res => {
        expect(res.json[0].id).toBe(1);
      });
  });
  it('should return 5 products by default', () => {
    return frisby
      .timeout(30000)
      .get(`${baseURL}/products`)
      .then(res => {
        expect(res.json.length).toBe(5);
      });
  });
  it('should start at at appropriate product id when page is specified', () => {
    return frisby
      .timeout(30000)
      .get(`${baseURL}/products?page=2`)
      .then(res => {
        expect(res.json[0].id).toBe(6);
      });
  });
  it('should return an appropriate number of products when count is specified', () => {
    return frisby
      .timeout(30000)
      .get(`${baseURL}/products?count=10`)
      .then(res => {
        expect(res.json.length).toBe(10);
      });
  });
  xit('should handle page and count parameters concurrently', () => {
    return frisby
      .timeout(30000)
      .get(`${baseURL}/products?page=3&count=15`)
      .then(res => {
        expect(res.json[0].id).toBe(31);
        expect(res.json.length).toBe(15);
      });
  });
});
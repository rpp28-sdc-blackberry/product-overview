require('dotenv').config();
const frisby = require('frisby');
const baseURL = `http://localhost:${process.env.SVPORT}`;

describe('/products/:product_id/styles endpoint', () => {
  it('should return a status of 200 for a valid product id', function () {
    return frisby
      .timeout(30000)
      .get(`${baseURL}/products/5/styles`)
      .expect('status', 200);
  });
  xit('should return a status of 500 for an invalid product id', () => {
    return frisby
      .timeout(30000)
      .get(`${baseURL}/products/-5/styles`)
      .expect('status', 500);
  });
  xit('should return the correct product id', () => {
    return frisby
      .timeout(30000)
      .get(`${baseURL}/products/5/styles`)
      .then(res => {
        expect(res.json.product_id).toBe(5);
      });
  });
  it('should return the correct number of styles', () => {
    return frisby
      .timeout(30000)
      .get(`${baseURL}/products/5/styles`)
      .then(res => {
        expect(res.json.results.length).toBe(4);
      });
  });
  it('should return the correct style id', () => {
    return frisby
      .timeout(30000)
      .get(`${baseURL}/products/5/styles`)
      .then(res => {
        expect(res.json.results[0].id).toBe(26);
      });
  });
  it('should return the correct style name', () => {
    return frisby
      .timeout(30000)
      .get(`${baseURL}/products/5/styles`)
      .then(res => {
        expect(res.json.results[0].name).toBe('White & White');
      });
  });
  it('should return the correct style sale price', () => {
    return frisby
      .timeout(30000)
      .get(`${baseURL}/products/5/styles`)
      .then(res => {
        expect(res.json.results[0].sale_price).toBe('null');
      });
  });
  it('should return the correct style original price', () => {
    return frisby
      .timeout(30000)
      .get(`${baseURL}/products/5/styles`)
      .then(res => {
        expect(res.json.results[0].original_price).toBe('99');
      });
  });
  it('should return the correct style default', () => {
    return frisby
      .timeout(30000)
      .get(`${baseURL}/products/5/styles`)
      .then(res => {
        expect(res.json.results[0]['default?']).toBe(true);
      });
  });
  it('should return the correct style photos', () => {
    return frisby
      .timeout(30000)
      .get(`${baseURL}/products/3/styles`)
      .then(res => {
        expect(Object.keys(res.json.results[0].photos[0])).toContain('thumbnail_url');
        expect(Object.keys(res.json.results[0].photos[0])).toContain('url');
      });
  });
  it('should return the correct style skus', () => {
    return frisby
      .timeout(30000)
      .get(`${baseURL}/products/3/styles`)
      .then(res => {
        expect(Object.keys(res.json.results[0].skus['37'])).toContain('quantity');
        expect(Object.keys(res.json.results[0].skus['37'])).toContain('size');
      });
  });
});
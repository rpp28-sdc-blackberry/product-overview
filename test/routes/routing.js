require('dotenv').config();
const frisby = require('frisby');
const baseURL = `http://localhost:${process.env.SVPORT}`;

describe('/products endpoint', () => {
  it('should return a status of 200', function () {
    return frisby
      .get(`${baseURL}/products`)
      .expect('status', 200);
  });
});

describe('/products/:product_id endpoint', () => {
  it('should return a status of 200', () => {
    return frisby
      .get(`${baseURL}/products/1`)
      .expect('status', 200);
  });
  it('should return the correct product id', () => {
    return frisby
      .get(`${baseURL}/products/1`)
      .then(res => {
        expect(res.json.id).toBe(1);
      });
  });
  it('should return the correct product name', () => {
    return frisby
      .get(`${baseURL}/products/1`)
      .then(res => {
        expect(res.json.name).toBe('Camo Onesie');
      });
  });
  it('should return the correct product slogan', () => {
    return frisby
      .get(`${baseURL}/products/1`)
      .then(res => {
        expect(res.json.slogan).toBe('Blend in to your crowd');
      });
  });
  it('should return the correct product description', () => {
    let description = 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.';
    return frisby
      .get(`${baseURL}/products/1`)
      .then(res => {
        expect(res.json.description).toBe(description);
      });
  });
  it('should return the correct product category', () => {
    return frisby
      .get(`${baseURL}/products/1`)
      .then(res => {
        expect(res.json.category).toBe('Jackets');
      });
  });
  it('should return the correct product default price', () => {
    return frisby
      .get(`${baseURL}/products/1`)
      .then(res => {
        expect(res.json.default_price).toBe('140');
      });
  });
});

describe('/products/:product_id/styles endpoint', () => {
  it('should return a status of 200', function () {
    return frisby
      .timeout(30000)
      .get(`${baseURL}/products/2/styles`)
      .expect('status', 200);
  });
});

describe('/products/:product_id/related endpoint', () => {
  it('should return a status of 200', function () {
    return frisby
      .timeout(30000)
      .get(`${baseURL}/products/3/related`)
      .expect('status', 200);
  });
});
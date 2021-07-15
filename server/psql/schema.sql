DROP TABLE IF EXISTS features;
DROP TABLE IF EXISTS related_products;
DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS skus;
DROP TABLE IF EXISTS styles;
DROP TABLE IF EXISTS products;

CREATE TABLE products (
  id             INT       NOT NULL   PRIMARY KEY,
  name           VARCHAR   NOT NULL,
  slogan         VARCHAR   NOT NULL,
  description    VARCHAR   NOT NULL,
  category       VARCHAR   NOT NULL,
  default_price  VARCHAR   NOT NULL
);

CREATE TABLE features (
  id             INT       NOT NULL   PRIMARY KEY,
  product_id     INT       NOT NULL   REFERENCES products(id),
  feature        VARCHAR   NOT NULL,
  VALUE          VARCHAR   NOT NULL
);

CREATE TABLE related_products (
  id                    INT       NOT NULL   PRIMARY KEY,
  root_product_id       INT       NOT NULL   REFERENCES products(id),
  related_product_id    INT       NOT NULL   REFERENCES products(id)
);

CREATE TABLE styles (
  id              INT       NOT NULL   PRIMARY KEY,
  product_id      INT       NOT NULL   REFERENCES products(id),
  name            VARCHAR   NOT NULL,
  original_price  VARCHAR   NOT NULL,
  sale_price      VARCHAR   NOT NULL,
  place_holder    BOOLEAN   NOT NULL
);

CREATE TABLE photos (
  id              INT       NOT NULL   PRIMARY KEY,
  style_id        INT       NOT NULL   REFERENCES styles(id),
  thumbnail_url   VARCHAR   NOT NULL,
  url             VARCHAR   NOT NULL
);

CREATE TABLE skus (
  id          INT       NOT NULL   PRIMARY KEY,
  style_id    INT       NOT NULL   REFERENCES styles(id),
  sku         VARCHAR   NOT NULL,
  quantity    INT       NOT NULL,
  size        VARCHAR   NOT NULL
);





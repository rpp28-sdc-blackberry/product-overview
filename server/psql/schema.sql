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
  product_id     INT       NOT NULL   REFERENCES products(id)  DEFERRABLE INITIALLY IMMEDIATE,
  feature        VARCHAR   NOT NULL,
  value          VARCHAR   NOT NULL
);

CREATE TABLE related_products (
  id                    INT       NOT NULL   PRIMARY KEY,
  current_product_id    INT       NOT NULL   REFERENCES products(id)  DEFERRABLE INITIALLY IMMEDIATE,
  related_product_id    INT       NOT NULL
);

CREATE TABLE styles (
  id              INT       NOT NULL   PRIMARY KEY,
  product_id      INT       NOT NULL   REFERENCES products(id)  DEFERRABLE INITIALLY IMMEDIATE,
  name            VARCHAR   NOT NULL,
  sale_price      VARCHAR   NOT NULL,
  original_price  VARCHAR   NOT NULL,
  default_style   BOOLEAN   NOT NULL
);

CREATE TABLE photos (
  id              INT       NOT NULL   PRIMARY KEY,
  style_id        INT       NOT NULL   REFERENCES styles(id)   DEFERRABLE INITIALLY IMMEDIATE,
  url             VARCHAR   NOT NULL,
  thumbnail_url   VARCHAR   NOT NULL
);

CREATE TABLE skus (
  id          INT       NOT NULL   PRIMARY KEY,
  style_id    INT       NOT NULL   REFERENCES styles(id)  DEFERRABLE INITIALLY IMMEDIATE,
  size        VARCHAR   NOT NULL,
  quantity    INT       NOT NULL
);

DO
$$
DECLARE
  record        RECORD;
  table_copy    TEXT;
BEGIN
  SET CONSTRAINTS ALL DEFERRED;
  FOR record IN SELECT table_name
                FROM information_schema.tables
                WHERE table_schema = 'public'
  LOOP
    table_copy := record.table_name || '_copy';
    RAISE NOTICE 'currently transferring: %', table_copy;
    EXECUTE FORMAT('DROP TABLE IF EXISTS %I', table_copy);
    EXECUTE FORMAT('CREATE TABLE %I AS TABLE %I WITH NO DATA', table_copy, record.table_name);
    EXECUTE FORMAT('COPY %I FROM ''/Users/tchitrakorn/Documents/HackReactor/sdc/data/%I.csv'' DELIMITER '','' CSV HEADER', table_copy, record.table_name);
    EXECUTE FORMAT('INSERT INTO %I SELECT * FROM %I', record.table_name, table_copy, table_copy);
    EXECUTE FORMAT('DROP TABLE %I', table_copy);
    RAISE NOTICE 'completed transferring for: %', table_copy;
  END LOOP;
  COMMIT;
END;
$$
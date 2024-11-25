CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(128) NOT NULL,
    password VARCHAR(128) NOT NULL,
    wallet INTEGER NOT NULL DEFAULT 100000
);
CREATE TABLE IF NOT EXISTS products(
   id SERIAL PRIMARY KEY,
   name TEXT NOT NULL,
   price INTEGER NOT NULL,
   stock INTEGER NOT NULL DEFAULT 1
);
CREATE TABLE IF NOT EXISTS cart(
   id SERIAL PRIMARY KEY,
   user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
   product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
   quantity INTEGER NOT NULL CHECK (quantity > 0),
   total INTEGER NOT NULL
);
INSERT INTO products(name, price, stock) VALUES('MacBook', 1000, 100);
INSERT INTO products(name, price, stock) VALUES('PlayStation 5', 800, 100);
INSERT INTO products(name, price, stock) VALUES('RTX 4090', 900, 100);
INSERT INTO products(name, price, stock) VALUES('Logitech Superlight', 100, 100);
INSERT INTO products(name, price, stock) VALUES('Sony XM4', 200, 100);
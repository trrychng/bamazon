CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	 id INT NOT NULL AUTO_INCREMENT,
	 product_name VARCHAR (325) NOT NULL,
	 department_name VARCHAR (252) NOT NULL,
	 price DECIMAL (10,2) NOT NULL,
	 stock_quantity INT NOT NULL,
 PRIMARY KEY (id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('MSI Geforce 1080TI', 'Computer Parts', 699.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('AMD RYZEN 1800X', 'Computer Parts', 299.00, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Tickle Me Elmo', 'Toys', 10.99, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Nintendo Switch', 'Video Games', 295.95, 210);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('PlayStation 4 Pro', 'Video Games', 295.95, 220);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Dell 34 Ultrawide', 'TV and Monitors', 675.95, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Milk', 'Food', 3.95, 1230);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Cheese', 'Food', 1.95, 1334);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Ferrari', 'Cars', .95, 13334);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('YOUR HOUSE', 'Home', .55, 14634);

SELECT * FROM bamazon.products;
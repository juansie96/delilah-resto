-- Tables Creation

CREATE TABLE users (
    `user_id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `username` VARCHAR(60) NOT NULL,
    `password` VARCHAR(150) NOT NULL,
    `fullname` VARCHAR(60) NOT NULL,
    `email` VARCHAR(60) NOT NULL,
    `phone` VARCHAR(60) NOT NULL,
    `address` VARCHAR(60) NOT NULL,
    `is_admin` BOOLEAN NOT NULL DEFAULT FALSE,
    UNIQUE (`email`),
    UNIQUE (`username`)
);

CREATE TABLE products (
    `product_id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `price` FLOAT NOT NULL,
    `imageUrl` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL
);

CREATE TABLE status_code (
	`status_id` INT(11) NOT NULL AUTO_INCREMENT,
	`status` VARCHAR(50) NOT NULL,
	`description` VARCHAR(300) NOT NULL,
	PRIMARY KEY (`status_id`)
);
 
CREATE TABLE payment (
	`payment_id` INT(11) NOT NULL AUTO_INCREMENT,
	`payment_method` VARCHAR(30) NOT NULL,
	PRIMARY KEY (`payment_id`)
);


CREATE TABLE orders (
    `order_id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `status_id` INT,
    `date` DATETIME NOT NULL,
    `description` VARCHAR(200) NOT NULL,
    `payment_id` INT,
    `total` FLOAT NOT NULL,
    `address` VARCHAR(200) NOT NULL,
    `user_id` INT,
    FOREIGN KEY(user_id) REFERENCES users(user_id),
    FOREIGN KEY(status_id) REFERENCES status_code(status_id),
    FOREIGN KEY(payment_id) REFERENCES payment(payment_id)
);

CREATE TABLE orders_products (
    `order_product_id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `order_id` INT,
    `product_id` INT,
    `product_quantity` INT,
    FOREIGN KEY(order_id) REFERENCES orders(order_id),
    FOREIGN KEY(product_id) REFERENCES products(product_id)
);


-- Populate Users

INSERT INTO users VALUES (
    NULL,
    "admin",
    "$2a$10$3DEoitH3XgcN7/xHd.EKie3mPzLAOFI3I1QYRKROReAyN4fBFeaT6",
    "Administrator",
    "admin@admin.com",
    "1234354352",
    "Admin Street 173",
    TRUE
);

INSERT INTO users VALUES (
    NULL,
    "juanmsierra",
    "$2a$10$ZV0D.ULYR24hLRChP6mSZe/feRr6oYjCx.KUXl9SqKwGc6nlJI1i.",
    "Juan Sierra",
    "juanmsierra96@gmail.com",
    "3875125975",
    "Peredo 173",
    FALSE
);

INSERT INTO users VALUES (
    NULL,
    "anasolgon",
    "2a$10$YyvYvFzn5glfsepOoLMuc.JXlOd4Okva2ipfznt1LtNp6ssiK6Euq",
    "Ana Gonzalez",
    "anasolgonzalez@gmail.com",
    "3515123412",
    "O'higgins 241",
    FALSE
);

INSERT INTO users VALUES (
    NULL,
    "elonmusk",
    "$2a$10$dbPXUqw66KneUhlSgMmMDuVA0hR9GCjdpdisCGUcw.Lww7gbKTOxW",
    "Elon Musk",
    "elonmusk@spacex.com",
    "1134353453",
    "Washington Street 12 5",
    FALSE
);


-- Populate Products

INSERT INTO products VALUES (
    NULL,
    "Double Cheese Burger",
    350,
    "https://images.eatthismuch.com/site_media/img/172049_tabitharwheeler_e335efef-e359-422a-bd61-63fdee131fc7.jpg",
    "Two 150gr burgers, double cheese, onion, ketchup, secret sauce"
);

INSERT INTO products VALUES (
    NULL,
    "Pepperoni Pizza",
    520,
    "https://placeralplato.com/files/2016/01/Pizza-con-pepperoni.jpg",
    "Tomato Sauce, Mozarella cheese, Pepperoni, ideal for 3 persons!"
);

INSERT INTO products VALUES (
    NULL,
    "Milanesa Napolitana",
    420,
    "https://www.paulinacocina.net/wp-content/uploads/2015/03/P1150541-e1439164269502.jpg",
    "Large Milanesa Napolitana! (Beef w/ cheese, tomato sauce, jam)"
);

INSERT INTO products VALUES (
    NULL,
    "Garlic Chicken with Salad",
    300,
    "https://tatyanaseverydayfood.com/wp-content/uploads/2016/02/Garlic-Chicken-Salad-3.jpg",
    "Healthy and tasty Garlic Chicken with an incredible Salad"
);

INSERT INTO products VALUES (
    NULL,
    "Coke 500ml",
    100,
    "https://www.mancunianfoods.com/wp-content/uploads/2019/04/1.25-coke-bottle.jpg",
    "Fresh regular coke"
);

INSERT INTO products VALUES (
    NULL,
    "Water",
    80,
    "https://http2.mlstatic.com/agua-evian-500-ml-mineral-sin-gas-staac-D_NQ_NP_633056-MLA42305615160_062020-F.webp",
    "Just regular water"
);

-- Populate StatusCode

INSERT INTO status_code VALUES 
(NULL, "new", "Order created successfully"),
(NULL, "confirmed", "The order was confimed"),
(NULL, "cooking", "Preparing the order"),
(NULL, "sending", "Order in the way"), 
(NULL, "delivered", "The order was successfully delivered"),
(NULL, "canceled", "Order cancelled");

-- Populate Payment

INSERT INTO payment VALUES 
(NULL, "cash"),
(NULL, "creditcard"),
(NULL, "debit");

-- Populate Orders

INSERT INTO orders VALUES (
    NULL,
    1,
    NOW(),
    "2x DoubleCheeseBurger, 2x Coke500ml",
    1,
    900,
    "Peredo St 231",
    1
);

INSERT INTO orders VALUES (
    NULL,
    2,
    NOW(),
    "1x PepperoniPizza, 2x Coke500ml",
    2,
    720,
    "Admin Street 173",
    2
);

INSERT INTO orders VALUES (
    NULL,
    3,
    NOW(),
    "1x MilanesaNapolitana, 1x Coke500ml",
    3,
    520,
    "Av. Sarmiento 1411",
    3
);

INSERT INTO orders VALUES (
    NULL,
    4,
    NOW(),
    "1x ChickenWithSalad, 1x Water",
    1,
    380,
    "25 de mayo 7642",
    1
);

INSERT INTO orders VALUES (
    NULL,
    5,
    NOW(),
    "1x DoubleCheeseBurger, 1x PepperoniPizza, 3x Coke500ml",
    2,
    1170,
    "O'higgins 567",
    1
);

-- Populate Orders_Products

INSERT INTO 
    orders_products 
VALUES 
    (NULL,1,2,2),
    (NULL,1,5,2),
    (NULL,2,2,1),
    (NULL,2,5,2),
    (NULL,3,3,1),
    (NULL,3,5,1),
    (NULL,4,4,1),
    (NULL,4,6,1),
    (NULL,5,1,1),
    (NULL,5,2,1),
    (NULL,5,5,3);

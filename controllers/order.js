const db = require('../db/database');
const moment = require('moment');
const {
    QueryTypes
} = require('sequelize');

exports.addOrder = (req, res) => {
    const {
        products,
        payment_id,
        address
    } = req.body;

    let totalPrice;
    let description;

    const date = moment(new Date());
    const dateSQL = date.format('YYYY-MM-DD HH:mm:ss');

    // Get the products from the DB based on the products id indicated on the request
    Promise.all(
            products.map(product => {
                return db.query('SELECT product_id, name, price, description FROM products WHERE product_id = ?', {
                    type: QueryTypes.SELECT,
                    replacements: [product.product_id]
                });
            })
        ).then(prods => {
            // Format array for proper manipulation
            const productsArr = prods.map(prod => prod[0]);

            // Calculate order total price
            totalPrice = productsArr.reduce((acc, cur, idx) => acc + (cur.price * products[idx].quantity), 0);

            // Create string description with specific format (e.g x2 DoubleCheeseBurger, x1 MilanesaNapolitana, x2 Coke500ml) 
            description = productsArr.reduce((description, prod, idx) => {
                return description += 'x' + products[idx].quantity + " " + prod.name.split(" ").join("") + ', ';
            }, "");
            description = description.slice(0, description.length - 2);
        })
        .then(() => {
            db.query('INSERT INTO orders (status_id, date, description, payment_id, total, address, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)', {
                    type: QueryTypes.INSERT,
                    replacements: [1, dateSQL, description, payment_id, totalPrice, address, req.token_info.user_id]
                })
                .then(result => {
                    res.status(201).json({
                        success: true,
                        msg: "Order created successfully",
                        order: {
                            status: "new",
                            date: dateSQL,
                            description: description,
                            payment_id: payment_id,
                            total: totalPrice,
                            address: address,
                            username: req.token_info.username
                        }
                    });
                });

        })
        .catch(error => res.status(500).json({
            error: "Server Internal Error",
            errorData: error,
            success: false
        }));
};

exports.updateOrderStatus = (req, res) => {

    const order_id = req.params.orderId;
    const {
        status_id
    } = req.body;

    db.query('UPDATE orders SET status_id = ? WHERE order_id = ?', {
        type: QueryTypes.UPDATE,
        replacements: [status_id, order_id]
    })
    .then(() => {
        res.json({
            success: true,
            msg: "Order Status updated successfully"
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            success: false,
            error: 'Server internal error'
        })
    });

};
const {
    QueryTypes
} = require('sequelize');
const db = require('../db/database');

exports.getProducts = (req, res) => {
    console.log(req.token_info);
    db.query('SELECT * FROM products', {
            type: QueryTypes.SELECT
        })
        .then(products => res.json(products))
        .catch(error => res.status(500).json({
            error: "Server Internal Error",
            success: false
        }));
};

exports.addNewProduct = (req, res) => {
    const product = req.body;
    const {name, price, imageUrl, description} = req.body;

    db.query('INSERT INTO products (name, price, imageUrl, description) VALUES (?, ? ,? ,?)', {
            type: QueryTypes.INSERT,
            replacements: [name, price, imageUrl, description]
        })
        .then(() => {
            res.status(201).json({
                success: true,
                msg: "Product created",
                product: product
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                success: false,
                error: 'Server internal error'
            });
        });
};

exports.getProductById = (req, res) => {
    const {productId} = req.params;

     db.query('SELECT * FROM products WHERE product_id = ?', {
             type: QueryTypes.SELECT,
             replacements: [productId]
         })
         .then(products => res.json(products[0]))
         .catch(error => res.status(500).json({
             error: "Server Internal Error",
             success: false
         }));
};
const {
    QueryTypes
} = require('sequelize');
const db = require('../db/database');

exports.getProducts = (req, res) => {
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
                msg: "Product created successfully",
                product: product
            });
        })
        .catch(err => {
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

exports.editProductById = (req, res) => {
    const product = req.body;
    const {productId} = req.params;
    const {
        name,
        price,
        imageUrl,
        description
    } = req.body;

    db.query('UPDATE products SET name = ?, price = ?, imageUrl = ?, description = ? WHERE product_id = ?', {
            type: QueryTypes.UPDATE,
            replacements: [name, price, imageUrl, description, productId]
        })
        .then(() => {
            res.status(200).json({
                success: true,
                msg: "Product updated successfully",
                product: product
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                error: 'Server internal error'
            });
        });
}

exports.deleteProductById = (req, res) => {
    const {
        productId
    } = req.params;

    db.query('DELETE FROM products WHERE product_id = ?', {
            type: QueryTypes.DELETE,
            replacements: [productId]
        })
        .then(products => res.json({
            success: true,
            msg: "Product deleted successfully"
        }))
        .catch(error => res.status(500).json({
            error: "Server Internal Error",
            success: false
        }));
};


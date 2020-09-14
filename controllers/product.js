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
            msg: "Error fetching products",
            errorData: error,
            success: false
        }));
};
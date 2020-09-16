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
            msg: "Server Internal Error",
            errorData: error,
            success: false
        }));
};
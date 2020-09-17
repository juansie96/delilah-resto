const db = require("../db/database");
const {
    QueryTypes
} = require("sequelize");

exports.orderBody = (req, res, next) => {
    const {
        products,
        payment_id,
        address
    } = req.body;

    if (products && payment_id && address) {
        next();
    } else {
        res.status(422).json({
            success: false,
            error: "The body request has semantic errors",
            schemaExample: {
                products: [{
                        id_product: 3,
                        quantity: 2
                    },
                    {
                        id_product: 8,
                        quantity: 1
                    }
                ],
                payment_id: 1,
                address: "Croacia 2919"
            }
        });
    }
};

exports.orderStatusBody = (req, res, next) => {
    const {
        status_id
    } = req.body;

    if (status_id) {
        next();
    } else {
        res.status(422).json({
            success: false,
            error: "The body request has semantic errors",
            schemaExample: {
                id_status: 2
            }
        });
    }
};

exports.orderIdExists = (req, res, next) => {
    const {
        orderId
    } = req.params;

    db.query('SELECT * FROM orders WHERE order_id = ?', {
            type: QueryTypes.SELECT,
            replacements: [orderId]
        })
        .then(orders => {

            if (!orders.length) {
                res.status(404).json({
                    success: false,
                    error: "Order id not found"
                });
            } else {
                req.params.order = orders[0];
                next();
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                success: false,
                error: 'Server internal error'
            });
        });
};

exports.orderStatusIdExists = (req, res, next) => {
    const {
        status_id
    } = req.body;

    db.query('SELECT * FROM status_code WHERE status_id = ?', {
            type: QueryTypes.SELECT,
            replacements: [status_id]
        })
        .then(result => {
            const status = result[0];
            if (status) {
                next();
            } else {
                res.status(404).json({
                    success: false,
                    error: "status_id not valid"
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                error: 'Server internal error'
            });
        });

};

exports.validateUserOrder = (req, res, next) => {
    const {
        orderId
    } = req.params;

    const {
        user_id,
        is_admin
    } = req.token_info;

    db.query('SELECT * FROM orders WHERE order_id = ?', {
            type: QueryTypes.SELECT,
            replacements: [orderId]
        })
        .then(response => {
            const order = response[0];
            if (order.user_id === user_id || is_admin) {
                next();
            } else {
                res.status(401).json({
                    success: false,
                    error: "You don't have authorization to see other users orders"
                });
            }
        })
        .catch(error => res.status(500).json({
            error: "Server Internal Error",
            success: false
        }));
};
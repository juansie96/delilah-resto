const db = require("../db/database");
const {
    QueryTypes
} = require("sequelize");

exports.validateMailUsername = (req, res, next) => {
    const {
        username,
        email
    } = req.body;

    db.query('SELECT * FROM users WHERE username = ? OR email = ?', {
            type: QueryTypes.SELECT,
            replacements: [username, email]
        })
        .then(users => {
            if (!users.length) {
                next();
            } else {
                if (users.find(user => user.username === username)) {
                    res.status(409).json({
                        success: false,
                        error: 'Username already exists'
                    });
                } else if (users.find(user => user.email === email)) {
                    res.status(409).json({
                        success: false,
                        error: 'Mail already exists'
                    });
                }
            }
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                error: 'Server internal error'
            });
        });

};

exports.registerBody = (req, res, next) => {
    const {
        username,
        password,
        fullname,
        email,
        phone,
        address
    } = req.body;

    if (username && password && fullname && email && phone && address) {
        next();
    } else {
        res.status(422).json({
            success: false,
            error: "The body request has semantic errors",
            schemaExample: {
                username: "liomessi",
                password: "fcb123",
                fullname: "Lionel Messi",
                email: "liomessi@gmail.com",
                phone: "3213435312",
                address: "España 1234"
            }
        });
    }
};

exports.loginBody = (req, res, next) => {
    const {
        username,
        password
    } = req.body;

    if (!username) {
        res.status(422).json({
            success: false,
            error: "You must provide a username",
        });
        next();
    }
    else if (!password) {
        res.status(422).json({
            success: false,
            error: "You must provide a password",
        });
    } else {
        next();
    }
};

exports.validateUserId = (req, res, next) => {
    const {userId} = req.params;
    const {user_id, is_admin} = req.token_info;
    if (is_admin || user_id == userId) {
        next();
    } else {
        res.status(401).json({
            success: false,
            msg: "Not authorized to make this request"
        });
    }
};

exports.userIdExists = (req, res, next) => {
    const {
        userId
    } = req.params;

    db.query('SELECT * FROM users WHERE user_id = ?', {
            type: QueryTypes.SELECT,
            replacements: [userId]
        })
        .then(users => {

            if (!users.length) {
                res.status(404).json({
                    success: false,
                    error: "User id not found"
                });
            } else {
                // req.params.order = users[0];
                next();
            }
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                error: 'Server internal error'
            });
        });
};

exports.getUserOrders = (req, res, next) => {
    const {
        userId
    } = req.params;

    db.query('SELECT * FROM orders WHERE user_id = ?', {
            type: QueryTypes.SELECT,
            replacements: [userId]
        })
        .then(orders => {
            req.params.orders = orders;
            next();
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                error: 'Server internal error'
            });
        });
};
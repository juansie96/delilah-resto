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
            console.log(err);
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
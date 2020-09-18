const bcrypt = require('bcryptjs');
const {
    generateToken,
    validateToken
} = require('../util/jwt');
const saltRounds = 10;

const db = require('../db/database');
const {
    QueryTypes
} = require('sequelize');

exports.login = (req, res) => {
    const {
        username,
        password
    } = req.body;
    db.query('SELECT * FROM users WHERE username = ?', {
            type: QueryTypes.SELECT,
            replacements: [username]
        })
        .then((queryResponse) => {
            const user = queryResponse[0];
            if (user) {
                const pwCorrect = bcrypt.compareSync(password, user.password);
                if (pwCorrect) {
                    // 1. Generate Token
                    const token = generateToken({
                        user_id: user.user_id,
                        username: user.username,
                        is_admin: Boolean(user.is_admin)
                    });
                    // 2. Send user and token to client
                    res.status(200).json({
                        success: true,
                        user_id: user.user_id,
                        accessToken: token,
                        username: user.username,
                        is_admin: Boolean(user.is_admin)
                    });
                } else {
                    res.status(401).json({
                        success: false,
                        error: "Password incorrect"
                    });
                }
            } else {
                res.status(401).json({
                    success: false,
                    error: `Username (${username}) not found`
                });
            }
        })
        .catch(error => res.status(500).json({
            error: "Server Internal Error",
            errorData: error,
            success: false
        }));
};

exports.register = (req, res) => {
    const {
        username,
        password,
        fullname,
        email,
        phone,
        address,
        is_admin
    } = req.body;

    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    db.query('INSERT INTO users (username, password, fullname, email, phone, address) VALUES (?, ?, ?, ?, ?, ?)', {
        type: QueryTypes.INSERT,
        replacements: [username, hashedPassword, fullname, email, phone, address]
    })
    .then((response) => {
        res.status(201).json({
            success: true,
            msg: "User created successfully"
        });
    })
    .catch(error => res.status(500).json({
        error: "Server Internal Error",
        errorData: error,
        success: false
    }));
};

exports.getAllUsers = (req, res) => {
    db.query('SELECT * FROM users', {
            type: QueryTypes.SELECT
        })
        .then(users => res.json(users))
        .catch(error => res.status(500).json({
            error: "Server Internal Error",
            success: false
        }));
};

exports.getUserById = (req, res) => {
    const {
        userId,
        orders
    } = req.params;

    console.log(orders);

    db.query('SELECT * FROM users WHERE user_id = ?', {
            type: QueryTypes.SELECT,
            replacements: [userId]
        })
        .then(users => res.json({
            user: users[0],
            userOrders: orders
        }))
        .catch(error => res.status(500).json({
            error: "Server Internal Error",
            success: false
        }));
};

exports.editUserById = (req, res) => {
 
    const {
        userId
    } = req.params;

    const {
        username,
        password,
        fullname,
        email,
        phone,
        address
    } = req.body;
    
    const hashedPassword = bcrypt.hashSync(password, 10);
    db.query('UPDATE users SET username = ?, password = ?, fullname = ?, email = ?, phone = ?, address = ? WHERE user_id = ?', {
            type: QueryTypes.UPDATE,
            replacements: [username, hashedPassword, fullname, email, phone, address, userId]
        })
        .then(() => {
            res.status(201).json({
                success: true,
                msg: "User updated successfully",
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                error: 'Server internal error'
            });
        });
};

exports.deleteUserById = (req, res) => {
    const {
        userId,
        user
    } = req.params;

    db.query('DELETE FROM users WHERE user_id = ?', {
            type: QueryTypes.DELETE,
            replacements: [userId]
        })
        .then(() => res.json({
            success: true,
            msg: "User deleted successfully",
            deletedUser: user
        }))
        .catch(error => res.status(500).json({
            error: "Server Internal Error",
            success: false
        }));
};
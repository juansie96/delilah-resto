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

exports.getUsers = () => {

};

exports.login = (req, res) => {
    const {
        username,
        password
    } = req.body;
    db.query('SELECT * FROM users WHERE username = :username', {
            type: QueryTypes.SELECT,
            replacements: {
                username: username
            }
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
            msg: "Server Internal Error",
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
        msg: "Server Internal Error",
        errorData: error,
        success: false
    }));
};
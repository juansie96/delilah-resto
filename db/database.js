const {Sequelize} = require('sequelize');

const db = new Sequelize({
    database: 'delilah_resto',
    username: 'root',
    password: '',
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = db;
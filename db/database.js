const {Sequelize} = require('sequelize');

const db = new Sequelize({
    database: 'delilah_resto',
    username: 'root',
    password: 'mqos258pdk',
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = db;
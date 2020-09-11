const express = require('express');
const bodyParser = require('body-parser');

var bcrypt = require('bcryptjs');
const saltRounds = 10;

const db = require('./db/database');

const server = express();


/* bcrypt.hash('', saltRounds)
.then(function (hash, err) {
    return hash;
})
.then((hash) => {
    console.log(hash);
    return bcrypt.compare('', hash);
})
.then((res,err) => console.log(res));
 */


db.authenticate().then(() => {
    console.log('Connected to the DB');
}).catch(console.error);



server.listen(3000);


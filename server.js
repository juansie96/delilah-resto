const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/database');

const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');

const server = express();

// var bcrypt = require('bcryptjs');
// const saltRounds = 10;
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

server.set('port', process.env.PORT || 3000);


server.use('/users', userRoutes);
server.use('/orders', orderRoutes);
server.use('/products', productRoutes);


db.authenticate().then(() => {
        console.log('Connection to DB successful, initializing Server');
    })
    .then(() => {
        server.listen(server.get('port'), () => {
            console.log(`Server initialized, listening on port ${server.get('port')}`);
        });
    })
    .catch(() => console.error('There was an error initializing DB and Server', error));
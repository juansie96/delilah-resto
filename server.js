const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/database');

const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');

const bcrypt = require('bcryptjs');

const server = express();

server.set('port', process.env.PORT || 3000);

server.use(bodyParser.json());


server.use('/users', userRoutes);
server.use('/orders', orderRoutes);
server.use('/products', productRoutes);

server.get('/', (req, res) => { 
    console.log(bcrypt.hashSync('admin', 10));
});

db.authenticate().then(() => {
        console.log('Connection to DB successful, initializing Server');
    })
    .then(() => {
        server.listen(server.get('port'), () => {
            console.log(`Server initialized, listening on port ${server.get('port')}`);
        });
    })
    .catch(() => console.error('There was an error initializing DB and Server', error));
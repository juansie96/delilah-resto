const db = require("../db/database");
const {
    QueryTypes
} = require("sequelize");

exports.productBody = (req, res, next) => {
    const {
        name,
        price,
        imageUrl,
        description
    } = req.body;

    if (name && price && imageUrl && description) {
        next();
    } else {
        res.status(422).json({
            success: false,
            error: "The body request has semantic errors",
            schemaExample: {
                "name": "Ravioles",
                "price": 200,
                "imageUrl": "http://delilahresto.com/raviolesimg1.png",
                "description": "Best Ravioles in town, with red sauce!"
            }
        });
    }
};

exports.productNameExists = (req, res, next) => {
    const {
        name
    } = req.body;

    db.query('SELECT * FROM products WHERE name = ?', {
        type: QueryTypes.SELECT,
        replacements: [name]
    })
    .then(result => {
        const product = result[0];

        if (product) {
            res.status(409).json({
                success: false,
                error: "Product name already exists"
            });
        } else {
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

exports.validateProductId = (req, res, next) => {
    const {productId} = req.params;

     db.query('SELECT * FROM products WHERE product_id = ?', {
             type: QueryTypes.SELECT,
             replacements: [productId]
         })
         .then(result => {
             const product = result[0];

             if (!product) {
                 res.status(409).json({
                     success: false,
                     error: "The product specified by id doesn't exist"
                 });
             } else {
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
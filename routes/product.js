const router = require('express').Router();

const productController = require('../controllers/product');
const {
    validateAccessToken,
    validateAdmin
} = require('../middlewares/authorization');
const {
    productBody,
    productNameExists,
    validateProductId
} = require('../middlewares/product');

router.get('/', validateAccessToken, productController.getProducts);
router.post('/', [validateAccessToken, validateAdmin, productBody, productNameExists], productController.addNewProduct);
// get by id (productIdExists)
router.get('/:productId', [validateAccessToken, validateProductId], productController.getProductById);

// delete by id
// put by id

module.exports = router;
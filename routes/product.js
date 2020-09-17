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
router.get('/:productId', [validateAccessToken, validateProductId], productController.getProductById);
router.put('/:productId', [validateAccessToken, validateAdmin, productBody, validateProductId], productController.editProductById);
router.delete('/:productId', [validateAccessToken, validateAdmin, validateProductId], productController.deleteProductById);


module.exports = router;
const router = require('express').Router();

const productController = require('../controllers/product');
const { validateAccessToken, validateAdmin } = require('../middlewares/middlewares');

router.get('/', validateAccessToken, productController.getProducts);

module.exports = router;
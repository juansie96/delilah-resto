const router = require('express').Router();

const orderController = require('../controllers/order');
const { validateAccessToken, validateAdmin } = require('../middlewares/authorization');
const { orderBody, orderStatusBody, orderIdExists, orderStatusIdExists } = require('../middlewares/order');

router.get('/', () => {

});

router.post('/', [validateAccessToken, orderBody], orderController.addOrder);

router.patch('/:orderId', [validateAccessToken, validateAdmin, orderStatusBody, orderIdExists, orderStatusIdExists], orderController.updateOrderStatus);

module.exports = router;
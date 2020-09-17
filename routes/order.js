const router = require('express').Router();

const orderController = require('../controllers/order');
const { validateAccessToken, validateAdmin } = require('../middlewares/authorization');
const { orderBody, orderStatusBody, orderIdExists, orderStatusIdExists, validateUserOrder } = require('../middlewares/order');

router.post('/', [validateAccessToken, orderBody], orderController.addOrder);
router.get('/', [validateAccessToken, validateAdmin], orderController.getAllOrders);
router.get('/:orderId', [validateAccessToken, orderIdExists, validateUserOrder], orderController.getOrderById);
router.patch('/:orderId', [validateAccessToken, validateAdmin, orderStatusBody, orderIdExists, orderStatusIdExists], orderController.updateOrderStatus);
router.delete('/:orderId', [validateAccessToken, validateAdmin, orderIdExists,], orderController.deleteOrderById);

module.exports = router;
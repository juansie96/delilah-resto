const router = require('express').Router();

const orderController = require('../controllers/order');
const { validateAccessToken, validateAdmin } = require('../middlewares/middlewares');

router.get('/', () => {

});

router.post('/', validateAccessToken, orderController.addOrder);

router.patch('/:orderId', validateAccessToken, validateAdmin, orderController.updateOrderStatus);

module.exports = router;
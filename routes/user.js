const router = require('express').Router();

const userController = require('../controllers/user');
const { validateMailUsername, registerBody, loginBody, validateUserId, userIdExists, getUserOrders } = require('../middlewares/user');
const {
    validateAccessToken,
    validateAdmin
} = require('../middlewares/authorization');

router.get('/', [validateAccessToken, validateAdmin], userController.getAllUsers);
router.post('/login', [loginBody], userController.login);
router.post('/register', [validateMailUsername, registerBody], userController.register);
router.get('/:userId', [validateAccessToken, validateUserId, userIdExists, getUserOrders], userController.getUserById);
// getOrders
// router.put('/:idUser', [validateToken, allUsersId, userBody, userId], editUserById);
// router.delete('/:idUser', [validateToken, validateAdmin, userId], deleteUserById);

module.exports = router;
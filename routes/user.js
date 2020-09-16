const router = require('express').Router();

const userController = require('../controllers/user');
const { validateMailUsername, registerBody, loginBody } = require('../middlewares/user');

router.post('/login', [loginBody], userController.login);
router.post('/register', [validateMailUsername, registerBody], userController.register);

module.exports = router;
const router = require('express').Router();

const UserController = require('../controller/UserController');
const { authenticate } = require('../controller/authController');

router.get('/', authenticate, UserController.getUserAccount);

module.exports = router;

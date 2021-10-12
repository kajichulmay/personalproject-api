const router = require('express').Router();

const UserController = require('../controller/UserController');
const { authenticate } = require('../controller/authController');

router.get('/', authenticate, UserController.getUserAccount);
router.put('/:id', authenticate, UserController.updateUserAccount);
router.put('/address/:id', authenticate, UserController.updateUserAccountAddress);

module.exports = router;

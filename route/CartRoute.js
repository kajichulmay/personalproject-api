const router = require('express').Router();
const { authenticate, checkAdmin } = require('../controller/authController');
const CartController = require('../controller/CartController');

router.get('/', authenticate, CartController.getAllCart);
router.post('/', authenticate, CartController.createCart);
router.put('/:id', authenticate, CartController.updateCart);
router.put('/:id', authenticate, CartController.updateStatusCart);
router.delete('/:id', authenticate, CartController.deleteCart);

module.exports = router;

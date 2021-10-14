const router = require('express').Router();

const OrderController = require('../controller/OrderController');
const { authenticate, checkAdmin } = require('../controller/authController');

router.get('/myorder', authenticate, OrderController.getAllOrderByUserId);
router.get('/all', authenticate, OrderController.getAllOrder);
router.get('/byId', authenticate, OrderController.getOrderByUserIdNotPaid);
router.post('/', authenticate, OrderController.createOrder);

module.exports = router;

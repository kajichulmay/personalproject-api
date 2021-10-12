const router = require('express').Router();
const OrderItemController = require('../controller/OrderItemController');
const { authenticate } = require('../controller/authController');

router.get('/', authenticate, OrderItemController.getAllOrderItem);
router.get('/:id', authenticate, OrderItemController.getOrderItemById);
router.post('/book', authenticate, OrderItemController.createOrderItem);
router.put('/:id', authenticate, OrderItemController.updateOrderItem);
router.delete('/:id', authenticate, OrderItemController.deleteOrderItem);

module.exports = router;

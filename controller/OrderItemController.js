const { OrderItem, Order, User } = require('../models');

exports.getAllOrderItem = async (req, res, next) => {
  try {
    const orderAll = OrderItem.findAll({
      include: [
        {
          model: Order,
          require: true,
        },
        {
          model: User,
          require: true,
        },
      ],
    });
    res.status(200).json({ orderAll });
  } catch (err) {
    next(err);
  }
};

exports.getOrderItemById = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

exports.createOrderItem = async (req, res, next) => {
  try {
    const { amount, price, orderId, bookId } = req.body;

    const newOrderItem = await OrderItem.create({
      amount,
      price,
      orderId,
      bookId,
    });

    res.status(200).json({ newOrderItem });
  } catch (err) {
    next(err);
  }
};

exports.updateOrderItem = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

exports.deleteOrderItem = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

const { Order, Cart, OrderItem, User } = require('../models');

exports.getAllOrderByUserId = async (req, res, next) => {
  try {
    const NoticOrder = await Order.findAll({
      where: {
        userId: req.user.id,
      },
      include: {
        model: User,
      },
    });
    // console.log(NoticOrder);
    res.status(200).json({ NoticOrder });
  } catch (err) {
    next(err);
  }
};
exports.getAllOrder = async (req, res, next) => {
  try {
    const AllOrder = await Order.findAll({
      include: {
        model: User,
      },
    });
    // console.log(NoticOrder);
    res.status(200).json({ AllOrder });
  } catch (err) {
    next(err);
  }
};

exports.getOrderByUserIdNotPaid = async (req, res, next) => {
  try {
    // console.log('test');
    const myOrder = await Order.findOne({
      where: {
        userId: req.user.id,
        status: false,
      },
    });
    // console.log('myOrder', myOrder);
    res.status(200).json({ myOrder });
  } catch (err) {
    next(err);
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    const cart = await Cart.findAll({ where: { userId: req.user.id } });
    const newCart = JSON.parse(JSON.stringify(cart));
    const { sumPrice, isConfirm } = req.body;

    const order = await Order.create({
      status: false,
      sumPrice,
      date: new Date(),
      userId: req.user.id,
    });
    const newOrderItems = newCart.map(item => ({
      bookId: item.bookId,
      amount: item.sumAmount,
      price: item.sumPrice,
      orderId: order.id,
    }));
    // const updateCartID = newCart.map(item => item.id);
    // const [updateStatusCart] = await Cart.update({ isConfirm: true }, { where: { id: updateCartID } });
    const orderItem = await OrderItem.bulkCreate(newOrderItems);
    res.status(200).json({ orderItem, order });
  } catch (err) {
    next(err);
  }
};

const { NoticePayment, Order, Bank, Cart, Book } = require('../models');
const fs = require('fs');
const util = require('util');
const cloundinary = require('cloudinary').v2;
const uploadPromise = util.promisify(cloundinary.uploader.upload);
const { Op } = require('sequelize');
exports.getAllNoticPayment = async (req, res, next) => {
  try {
    const getNotic = await NoticePayment.findAll({
      include: [
        {
          model: Order,
          require: true,
        },
        {
          model: Bank,
          require: true,
        },
      ],
    });
    res.status(200).json({ getNotic });
  } catch (err) {
    next();
  }
};

exports.createNoticPayment = async (req, res, next) => {
  try {
    const { bankId, orderId, paidTime } = req.body;

    const result = await uploadPromise(req.file.path, { timeout: 600000 });
    const cart = await Cart.findAll({ where: { userId: req.user.id } });
    const newCart = JSON.parse(JSON.stringify(cart));
    const newNotic = await NoticePayment.create({
      ...req.body,

      imageUrl: result.secure_url,
    });
    fs.unlinkSync(req.file.path);
    const updateCartID = newCart.map(item => item.id);
    const updateBookID = newCart.map(item => item.bookId);
    const updatesumAountInCart = newCart.map(item => ({ sumAmount: item.sumAmount, bookId: item.bookId }));
    console.log(updatesumAountInCart);
    const [updateStatusCart] = await Cart.update({ isConfirm: true }, { where: { id: updateCartID } });
    const [updateStatusOrder] = await Order.update({ status: true }, { where: { userId: req.user.id } });

    const updatePromise = updatesumAountInCart.map(async item => {
      const book = await Book.findOne({ where: { id: item.bookId } });
      book.amount = book.amount - item.sumAmount;
      await book.save();
    });

    await Promise.all(updatePromise);

    res.status(200).json({ newNotic });
  } catch (err) {
    next(err);
  }
};

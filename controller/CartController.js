const { Cart, Book } = require('../models');

exports.getAllCart = async (req, res, next) => {
  try {
    const getAll = await Cart.findAll({
      where: { userId: req.user.id, isConfirm: false },
      include: {
        model: Book,
      },
    });

    res.status(200).json({ getAll });
  } catch (err) {
    next(err);
  }
};

exports.createCart = async (req, res, next) => {
  try {
    const { bookId, sumPrice, sumAmount, userId, isConfirm } = req.body;
    // console.log(req.body);
    const book = await Book.findOne({ where: { id: bookId } });
    // console.log(book);
    const oldCart = await Cart.findOne({ where: { userId: req.user.id, bookId, isConfirm: false } });

    if (oldCart) {
      oldCart.sumAmount += sumAmount;

      oldCart.sumPrice = (oldCart.sumAmount * Number(book.price)).toFixed(2);

      await oldCart.save();
      res.status(200).json({ cart: oldCart });
    } else {
      const cart = await Cart.create({
        bookId,
        sumPrice,
        sumAmount,
        isConfirm,
        userId,
      });

      res.status(200).json({ cart });
    }
  } catch (err) {
    next(err);
  }
};

exports.updateStatusCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isConfirm } = req.body;

    const [updateCart] = await Cart.update(
      {
        isConfirm,
      },
      {
        where: {
          id,
        },
      }
    );

    if (updateCart === 0) {
      return res.status(400).json({ message: 'fail to update Status Cart' });
    }
    res.status(200).json({ message: 'update  Status cart isConfirm completed' });
  } catch (err) {
    next(err);
  }
};

exports.updateCart = async (req, res, next) => {
  const { id } = req.params;
  const { sumPrice, sumAmount } = req.body;

  const [updateCart] = await Cart.update(
    {
      sumPrice,
      sumAmount,
    },
    {
      where: {
        id,
      },
    }
  );

  if (updateCart === 0) {
    return res.status(400).json({ message: 'fail to update Cart' });
  }
  res.status(200).json({ message: 'update cart completed' });
};

exports.deleteCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const delCart = await Cart.destroy({ where: { id } });

    if (delCart === 0) {
      return res.status(400).json({ message: 'fail to delete Cart' });
    }

    res.status(204).json();
  } catch (err) {
    next(err);
  }
};

const { User } = require('../models');

exports.getUserAccount = async (req, res, next) => {
  try {
    const account = await User.findOne({
      where: { id: req.user.id },
      attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'isAdmin'] },
    });
    res.json({ account });
  } catch (err) {
    next(err);
  }
};

exports.updateUserAccount = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;

    const [rows] = await User.update(
      {
        firstName,
        lastName,
        email,
      },
      {
        where: {
          id,
          id: req.user.id,
        },
      }
    );
    if (rows === 0) {
      return res.status(400).json({ UpdateUserFali: 'fail to update user' });
    }
    res.status(200).json({ message: 'update User completed' });
  } catch (err) {
    next(err);
  }
};

exports.updateUserAccountAddress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { address } = req.body;

    const [rows] = await User.update(
      {
        address,
      },
      {
        where: {
          id,
          id: req.user.id,
        },
      }
    );
    if (rows === 0) {
      return res.status(400).json({ message: 'fail to update address' });
    }
    res.status(200).json({ message: 'update address completed' });
  } catch (err) {
    next(err);
  }
};

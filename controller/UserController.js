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

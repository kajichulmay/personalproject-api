const { Category } = require('../models');

exports.getCategory = async (req, res, next) => {
  try {
    const category = await Category.findAll({
      attributes: ['name', 'id'],
    });
    res.status(200).json({ category });
  } catch (err) {
    next(err);
  }
};
exports.createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name || typeof name !== 'string')
      return res.status(400).json({ message: 'name is required and must be a string' });

    const category = await Category.create({ name });
    res.status(200).json({ message: 'create Category Success', category });
  } catch (err) {
    next(err);
  }
};

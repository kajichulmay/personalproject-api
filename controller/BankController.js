const fs = require('fs');
const util = require('util');
const cloundinary = require('cloudinary').v2;
const uploadPromise = util.promisify(cloundinary.uploader.upload);
const { Bank } = require('../models');

exports.getAllBank = async (req, res, next) => {
  try {
    const getBank = await Bank.findAll();

    res.status(200).json({ getBank });
  } catch (err) {
    next(err);
  }
};

exports.createBank = async (req, res, next) => {
  try {
    const { name } = req.body;
    const result = await uploadPromise(req.file.path, { timeout: 60000000 });
    console.log(result);
    const bank = await Bank.create({
      name,
      imageUrl: result.secure_url,
    });
    // delete from folder
    fs.unlinkSync(req.file.path);

    res.status(200).json({ bank });
  } catch (err) {
    next(err);
  }
};

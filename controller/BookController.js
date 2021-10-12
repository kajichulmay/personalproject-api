const { Book, Category } = require('../models');
const fs = require('fs');
const util = require('util');
const cloundinary = require('cloudinary').v2;
const uploadPromise = util.promisify(cloundinary.uploader.upload);
exports.getAllBook = async (req, res, next) => {
  try {
    const bookAll = await Book.findAll({
      include: {
        model: Category,
        require: true,
      },
    });
    res.status(200).json({ bookAll });
  } catch (err) {
    next(err);
  }
};
exports.getBookById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const BookOne = await Book.findOne({
      where: {
        id,
      },
    });
    res.status(200).json({ BookOne });
  } catch (err) {
    next(err);
  }
};
exports.createBook = async (req, res, next) => {
  try {
    const { name, volumn, categoryId, price, amount, description, status } = req.body;
    // if (!name || !volumn || !categoryId || !price || !amount || !imageUrl) {
    //   res.status(400).json({ message: 'กรุณาใส่ ชื่อสินค้า ,เล่มที่ , ประเภท  , ราคา , จำนวนเล่ม , รูปภาพปกหนังสือ' });
    // }
    const result = await Promise.all(req.files.map(item => uploadPromise(item.path, { timeout: 600000 })));
    const imageUrl = result[0].secure_url;
    const imageCoverUrl = result[1] ? result[1].secure_url : null;
    const Bookupload = await Book.create({
      name,
      volumn,
      categoryId,
      price,
      amount,
      imageUrl,
      imageCoverUrl,
      description,
      status,
    });
    req.files.map(item => fs.unlinkSync(item.path));
    res.json({ Bookupload });
  } catch (err) {
    next(err);
  }
};
exports.deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    const rows = await Book.destroy({
      where: {
        id,
      },
    });

    if (rows === 0) {
      return res.status(400).json({ message: 'fail to delete Book' });
    }

    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
exports.editBook = async (req, res, next) => {
  try {
    const { name, volumn, categoryId, price, amount, description, status } = req.body;
    const { id } = req.params;
    const result = await Promise.all(req.files.map(item => uploadPromise(item.path, { timeout: 600000 })));
    const imageUrl = result[0].secure_url;
    const imageCoverUrl = result[1] ? result[1].secure_url : null;
    const [rows] = await Book.update(
      {
        name,
        volumn,
        categoryId,
        price,
        amount,
        imageUrl,
        imageCoverUrl,
        description,
        status,
      },
      {
        where: {
          id,
        },
      }
    );
    if (rows === 0) {
      return res.status(400).json({ UpdateFaliBook: 'fail to edit book' });
    }
    req.files.map(item => fs.unlinkSync(item.path));
    res.status(200).json({ message: 'update Book completed' });
  } catch (err) {
    next(err);
  }
};

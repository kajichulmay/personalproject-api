const { Book } = require('../models');
const fs = require('fs');
const util = require('util');
const cloundinary = require('cloudinary').v2;
const uploadPromise = util.promisify(cloundinary.uploader.upload);
exports.getAllBook = async (req, res, next) => {
  try {
  } catch (err) {}
};
exports.getBookById = async (req, res, next) => {
  try {
  } catch (err) {}
};
exports.createBook = async (req, res, next) => {
  try {
    const { name, volumn, categoryId, price, amount, description, status } = req.body;
    if (!name || !volumn || !categoryId || !price || !amount || !imageUrl) {
      res.status(400).json({ message: 'กรุณาใส่ ชื่อสินค้า ,เล่มที่ , ประเภท  , ราคา , จำนวนเล่ม , รูปภาพปกหนังสือ' });
    }
    const result = await Promise.all(req.files.map(item => uploadPromise(item.path, { timeout: 6000000 })));
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
  } catch (err) {}
};
exports.editBook = async (req, res, next) => {
  try {
  } catch (err) {}
};

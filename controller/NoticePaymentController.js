const { NoticPayment } = require('../models');

exports.getAllNoticPayment = (req, res, next) => {
  try {
  } catch (err) {
    next();
  }
};

exports.getNoticPaymentById = (req, res, next) => {
  try {
  } catch (err) {
    next();
  }
};

exports.createNoticPayment = async (req, res, next) => {
  try {
    // const { bankId, orderId, imageUrl, paidTime } = req.body;
    // const result = await Promise.all(req.files.map(item => uploadPromise(item.path, { timeout: 600000 })));
    // const imageUrl = result[0].secure_url;
    // const notice = NoticPayment.create({
    //   bankId,
    //   orderId,
    //   imageUrl,
    //   paidTime,
    // });

    res.status(200).json({ notice });
  } catch (err) {
    next();
  }
};

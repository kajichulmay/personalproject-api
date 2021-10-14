const router = require('express').Router();
const { authenticate, checkAdmin } = require('../controller/authController');
const NoticePaymentController = require('../controller/NoticePaymentController');
const { upload } = require('../middleware/upload');

// router.get('/', authenticate, NoticePaymentController.getAllNoticPayment);

router.post('/', authenticate, upload.single('picture'), NoticePaymentController.createNoticPayment);

module.exports = router;

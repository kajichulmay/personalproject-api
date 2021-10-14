const router = require('express').Router();
const BankController = require('../controller/BankController');
const { authenticate, checkAdmin } = require('../controller/authController');
const { upload } = require('../middleware/upload');

router.get('/', authenticate, BankController.getAllBank);

router.post('/addBank', authenticate, checkAdmin, upload.single('picture'), BankController.createBank);

module.exports = router;

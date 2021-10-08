const router = require('express').Router();
const BookController = require('../controller/BookController');
const { authenticate, checkAdmin } = require('../controller/authController');
const { upload } = require('../middleware/upload');

router.get('/', BookController.getAllBook);
router.get('/all-series', BookController.getAllBook);
router.get('/manga', BookController.getAllBook);
router.get('/light-novel', BookController.getAllBook);

router.get('/book:id', BookController.getBookById);

router.get('/update-stock', authenticate, checkAdmin, BookController.getAllBook);
router.delete('/update-stock', authenticate, checkAdmin, BookController.deleteBook);

router.post('/add-book-stock', authenticate, checkAdmin, upload.array('picture'), BookController.createBook);
router.put('/edit-book-stock', authenticate, checkAdmin, BookController.editBook);

module.exports = router;

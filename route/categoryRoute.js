const router = require('express').Router();
const categoryController = require('../controller/categoryController');

router.get('/', categoryController.getCategory);
router.post('/', categoryController.createCategory);

module.exports = router;

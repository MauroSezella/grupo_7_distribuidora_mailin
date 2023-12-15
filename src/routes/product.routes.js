const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const productController = require('../controllers/productController');


router.get('/', productController.index);
router.get('/create', productController.create);
router.post('/', upload.single('img'), productController.store)
router.get('/:id',productController.detail);


router.get('/cart', productController.getCarrito);


module.exports = router;
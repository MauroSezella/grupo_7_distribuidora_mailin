const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const productController = require('../controllers/productController');


router.get('/', productController.index)


router.get('/cart', productController.getCarrito);
router.get('/create', productController.getCreate);
router.get('/:id',productController.getProduct);


module.exports = router;
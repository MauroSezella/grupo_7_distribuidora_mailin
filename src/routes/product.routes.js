const express = require('express');
const router = express.Router();
const path = require('path');
const productController = require('../controllers/productController');

router.get('/cart', productController.getCarrito);
router.get('/:id',productController.getProduct);


module.exports = router;
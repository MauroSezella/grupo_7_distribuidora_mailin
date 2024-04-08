const express = require('express');
const router = express.Router();
const productAPIController = require('../../controllers/api/productAPIController');

//API Products
router.get('/products', productAPIController.list);
router.get('/products/:id', productAPIController.productById);

router.post('/checkout', productAPIController.checkout);

module.exports = router;
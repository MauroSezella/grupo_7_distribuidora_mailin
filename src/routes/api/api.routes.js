const express = require('express');
const router = express.Router();
const productAPIController = require('../../controllers/api/productAPIController');

//API Products
router.get('/products', productAPIController.allProducts);
router.get('/products/:id', productAPIController.productById)

module.exports = router;
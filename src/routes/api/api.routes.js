const express = require('express');
const router = express.Router();
const productAPIController = require('../../controllers/api/productAPIController');
const userApiController = require ('../../controllers/api/userApiController')

//API Products
router.get('/products', productAPIController.list);
router.get('/products/:id', productAPIController.productById);
router.get('/last-product', productAPIController.lastProduct);

router.post('/carrito', productAPIController.checkout);


//API Users
router.get('/users', userApiController.list)
router.get('/users/:id', userApiController.userById)




module.exports = router;
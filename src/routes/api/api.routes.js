const express = require('express');
const router = express.Router();
const apiController = require('../../controllers/api/apiController');

router.get('/products', apiController.allProducts);
router.get('/products/:id', apiController.productById)

module.exports = router;
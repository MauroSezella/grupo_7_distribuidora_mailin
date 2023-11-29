const express = require('express');
const router = express.Router();
const path = require('path');

const routerProduct = require('./product.routes');
const routerMain = require('./main.routes');
const routerUser = require('./user.routes');


router.use('/', routerMain);
router.use('/user', routerUser);
router.use('/productos', routerProduct);


module.exports = router;
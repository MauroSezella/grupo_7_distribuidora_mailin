const express = require('express');
const router = express.Router();
const path = require('path');
const userController = require('../controllers/userController');
const uploadUser = require('../middlewares/userMulter')


router.get('/login',userController.login);
router.get('/register',userController.register);
router.post('/register',uploadUser.single('avatar'),userController.processRegister);



module.exports = router;
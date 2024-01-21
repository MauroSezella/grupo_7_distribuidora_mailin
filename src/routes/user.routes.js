const express = require('express');
const router = express.Router();
const path = require('path');
const userController = require('../controllers/userController');
const upload = require('../middlewares/userMulter');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

const validationsRegister= require('../middlewares/validationRegister');
const validationsLogin= require('../middlewares/validationLogin');


router.get('/login',guestMiddleware, userController.login);
router.post('/login', validationsLogin,userController.processLogin);

router.get('/register',guestMiddleware, userController.register);
router.post('/register', upload.single('avatar'), validationsRegister,userController.processRegister);

router.get('/perfil',authMiddleware, userController.perfil);

router.get('/admin',authMiddleware, userController.admin);

router.get('/logout/',userController.logout);


module.exports = router;
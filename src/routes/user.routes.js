const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const upload = require('../middlewares/userMulter');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

const validations= require('../middlewares/usersValidations');
const validationsLogin= require('../middlewares/validationLogin');
const validationsEditUser= require('../middlewares/validationEditUser');
const validationsPassword= require('../middlewares/validationPassword');
const validationsEmail= require('../middlewares/validationEmail');

router.get('/login',guestMiddleware, userController.login);
router.post('/login', validationsLogin,userController.processLogin);

//CREAR
router.get('/register',guestMiddleware, userController.register);
router.post('/register', upload.single('avatar'), validations.register,userController.processRegister);

router.get('/profile',authMiddleware, userController.profile);
//EDITAR
router.get('/profile/edit',authMiddleware, userController.edit);
router.put('/profile/edit',upload.single('avatar'), validationsEditUser, userController.update);
router.get('/resetpassword', userController.resetPassword);
router.put('/resetpassword', validationsPassword, userController.updatePassword);
router.post('/verification', validationsEmail,userController.verification);

router.delete('/delete', authMiddleware, userController.delete); 

router.get('/admin',adminMiddleware, userController.admin);

router.get('/logout/',userController.logout);


module.exports = router;
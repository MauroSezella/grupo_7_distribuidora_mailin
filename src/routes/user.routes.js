const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const upload = require('../middlewares/userMulter');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const validations= require('../middlewares/usersValidations');

router.get('/login',guestMiddleware, userController.login);
router.post('/login', validations.login,userController.processLogin);

router.get('/register',guestMiddleware, userController.register);
router.post('/register', upload.single('avatar'), validations.register,userController.processRegister);

router.get('/profile',authMiddleware, userController.profile);

router.get('/profile/edit',authMiddleware, userController.edit);
router.put('/profile/edit/:id',upload.single('avatar'), validations.edit, userController.update);
router.get('/resetpassword',authMiddleware, userController.resetPassword);
router.put('/resetpassword/:id', validations.password, userController.updatePassword);
router.post('/verification', validations.email,userController.verification);

router.delete('/delete', authMiddleware, userController.delete); 
router.get('/logout/',userController.logout);


module.exports = router;
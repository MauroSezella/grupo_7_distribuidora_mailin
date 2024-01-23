
const path = require('path');
const { check } = require('express-validator');

const validationLogin= [
	check('email')
		.notEmpty().withMessage('Ingrese su correo electrónico').bail()
		.isEmail().withMessage('Debes escribir un formato de correo válido'),
	check('password')
    .notEmpty().withMessage('Tienes que escribir una contraseña').bail()
    .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),

];

module.exports = validationLogin;
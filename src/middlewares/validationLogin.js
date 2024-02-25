
const path = require('path');
const { check } = require('express-validator');

const validationLogin= [
	check('email')
		.notEmpty().withMessage('Ingrese su correo electrónico').bail()
		.isEmail().withMessage('Debes escribir un formato de correo válido'),
	check('password')
    .notEmpty().withMessage('Tienes que escribir una contraseña').bail()
];

module.exports = validationLogin;
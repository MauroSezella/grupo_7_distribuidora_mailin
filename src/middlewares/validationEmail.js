
const path = require('path');
const { check } = require('express-validator');

const validationEmail= [
	check('email')
		.notEmpty().withMessage('Ingrese su correo electrónico').bail()
		.isEmail().withMessage('Debes escribir un formato de correo válido'),
];

module.exports = validationEmail;
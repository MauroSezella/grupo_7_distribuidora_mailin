const path = require('path');
const { check } = require('express-validator');

const validationPassword = [
	check('password')
    .notEmpty().withMessage('Elegí una contraseña para ingresar a tu cuenta. ').bail()
    .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 carácteres'),

    check('confirmPassword')
      .notEmpty().withMessage('Debes confirmar tu contraseña').bail()
      .custom((value, { req }) => {
        if (req.body.password && req.body.password.length < 8) {
            return true;
          }
        if (value !== req.body.password) {
          throw new Error('Las contraseñas no coinciden');
        }
        return true;
    }),
	
];

module.exports = validationPassword;
const path = require('path');
const { check } = require('express-validator');
const userService = require ('../model/services/userService')

const register = [
	check('nombre')
    .notEmpty().withMessage('Ingrese su nombre').bail()
    .trim().isLength({min:2}).withMessage('Debe contener al menos 2 carácteres.'),
  check('apellido').notEmpty().withMessage('Ingrese su apellido.').bail()
    .trim().isLength({min:2}).withMessage('Debe contener al menos 2 carácteres.'),
	check('email')
		.notEmpty().withMessage('Ingrese su correo electrónico.').bail()
		.isEmail().withMessage('Ingresá un email válido.').bail()
    .custom(async(value)=>{
        let userInDB = await userService.getByEmail(value)
        if (userInDB) {
              throw new Error('Este email está registrado.')
        }
        return true
    }),

	check('password')
    .notEmpty().withMessage('Elegí una contraseña para ingresar a tu cuenta. ').bail()
    .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 carácteres,'),

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
	
    check('avatar').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['".jpg"', '".png"', '".jpeg"', '".gif"'];
    
        if (file) {
          let fileExtension = path.extname(file.originalname);
          if (!acceptedExtensions.includes(fileExtension)) {
              throw new Error(`Las extensiones de archivo permitidas: ${acceptedExtensions.join(', ')}`);
          }
      }
      return true;
      }),

    check('aceptaTerminos')
    .notEmpty().withMessage('Para continuar, debes aceptar los términos y condiciones.')
];

module.exports = {register};
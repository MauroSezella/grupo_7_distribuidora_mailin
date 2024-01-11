const path = require('path');
const { check } = require('express-validator');

const validationRegister = [
	check('nombre').notEmpty().withMessage('Ingrese su nombre'),
	check('apellido').notEmpty().withMessage('Ingrese su apellido'),
	check('email')
		.notEmpty().withMessage('Ingrese su correo electrónico').bail()
		.isEmail().withMessage('Ingresá un email válido'),
	check('password')
    .notEmpty().withMessage('Elegí una contraseña para ingresar a tu cuenta. ').bail()
    .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 carácteres'),

    check('confirmPassword')
      .notEmpty().withMessage('Debes confirmar tu contraseña').bail()
      .custom((value, { req }) => {
        if (req.body.password && req.body.password.length < 8) {
            // Si hay un error en 'password', no mostrar el mensaje de longitud mínima en 'confirmPassword'
            return true;
          }
        // Compara las contraseñas
        if (value !== req.body.password) {
          throw new Error('Las contraseñas no coinciden');
        }
        return true;
      }),
	
    check('avatar').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png'];
    
        if (!file) {
          req.file = {
            filename: 'default.png'
          }; 
          return true;
          
        } else {
          let fileExtension = path.extname(file.originalname);
          if (!acceptedExtensions.includes(fileExtension)) {
            throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
          }
          return true;
        }
      }),

    check('aceptaTerminos')
    .notEmpty().withMessage('Acepta los términos y condiciones para continuar ')
];

module.exports = validationRegister;
const path = require('path');
const { check } = require('express-validator');

const validationEditUser = [
	check('nombre').notEmpty().withMessage('Ingrese su nombre'),
	check('apellido').notEmpty().withMessage('Ingrese su apellido'),
	check('email')
		.notEmpty().withMessage('Ingrese su correo electrónico').bail()
		.isEmail().withMessage('Ingresá un email válido'),
	
  check('avatar').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png'];
    
        if (file) {
          let fileExtension = path.extname(file.originalname);
          if (!acceptedExtensions.includes(fileExtension)) {
              throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
          }
      }
      return true;
  }),

  
];

module.exports = validationEditUser;
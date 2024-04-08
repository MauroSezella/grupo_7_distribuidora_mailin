const path = require('path');
const { check } = require('express-validator');
const userService = require('../model/services/userService')

const register = [
  check('nombre')
    .notEmpty().withMessage('Ingrese su nombre').bail()
    .trim().isLength({ min: 2 }).withMessage('Debe contener al menos 2 carácteres.'),
  check('apellido').notEmpty().withMessage('Ingrese su apellido.').bail()
    .trim().isLength({ min: 2 }).withMessage('Debe contener al menos 2 carácteres.'),
  check('email')
    .notEmpty().withMessage('Ingrese su correo electrónico.').bail()
    .isEmail().withMessage('Debe ingresar un email válido').bail()
    .custom(async (value) => {
      let userInDB = await userService.getByEmail(value)
      if (userInDB) {
        throw new Error('Este email está registrado.')
      }
      
      return true
    }),

  check('password')
    .notEmpty().withMessage('Elegí una contraseña para ingresar a tu cuenta. ').bail()
    .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 carácteres'),

  check('confirmPassword')
    .notEmpty().withMessage('Debe confirmar la contraseña').bail()
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
    let acceptedExtensions = ['.jpg', '.png', '.jpeg', '.gif'];

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

const login = [
  check('email')
    .notEmpty().withMessage('Ingrese su correo electrónico').bail()
    .isEmail().withMessage('Debe ingresar un email válido').bail()
    .custom(async (value, { req }) => {
      let userInDB = await userService.getByEmail(value)
      if (userInDB) {
       if ( req.body.password) {
         let passwordOk = await userService.comparePasswords(req.body.password, userInDB.password);
         if (!passwordOk) {
          throw new Error(' ')
         }
       }
        return true
      } else {
        throw new Error(' ')
      }
    }),

  check('password')
    .notEmpty().withMessage('Debe ingresar una contraseña').bail()
    .custom(async (value, { req }) => {
      let userInDB = await userService.getByEmail(req.body.email);
      if (userInDB) {
        let passwordOk = await userService.comparePasswords(value, userInDB.password);
        if (!passwordOk) {
          throw new Error('Credenciales inválidas')
       
        }
        return true
      } else {
        throw new Error('Credenciales inválidas')
      };
    })
];

const email = [
  check('email')
    .notEmpty().withMessage('Ingrese su correo electrónico').bail()
    .isEmail().withMessage('Debe ingresar un email válido').bail()
    .custom(async (value) => {
      let userInDB = await userService.getByEmail(value)
      if (!userInDB) {
        throw new Error('Este email no está registrado.')
      }
      return true
    })
];

const password = [
  check('password')
    .notEmpty().withMessage('Elegí una contraseña para ingresar a tu cuenta. ').bail()
    .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 carácteres'),

  check('confirmPassword')
    .notEmpty().withMessage('Debe confirmar la contraseña').bail()
    .custom((value, { req }) => {
      if (req.body.password && req.body.password.length < 8) {
        return true;
      }
      if (value !== req.body.password) {
        throw new Error('Las contraseñas no coinciden');
      }
      return true;
    })
];

const edit = [
  check('nombre')
    .notEmpty().withMessage('Ingrese su nombre').bail()
    .trim().isLength({ min: 2 }).withMessage('Debe contener al menos 2 carácteres.'),
  check('apellido').notEmpty().withMessage('Ingrese su apellido.').bail()
    .trim().isLength({ min: 2 }).withMessage('Debe contener al menos 2 carácteres.'),
  check('email')
    .notEmpty().withMessage('Ingrese su correo electrónico.').bail()
    .isEmail().withMessage('Debe ingresar un email válido').bail()
    .custom(async (value, {req}) => {
      let userInDB = await userService.getByEmail(value);
      let userLogged =req.session.userLogged
      if (userInDB && userInDB.email !== userLogged.email) {
          throw new Error("Este email ya está registrado");
      }
      return true
    }),

  check('avatar').custom((value, { req }) => {
    let file = req.file;
    let acceptedExtensions = ['.jpg', '.png', '.jpeg"', '.gif'];

    if (file) {
      let fileExtension = path.extname(file.originalname);
      if (!acceptedExtensions.includes(fileExtension)) {
        throw new Error(`Las extensiones de archivo permitidas: ${acceptedExtensions.join(', ')}`);
      }
    }
    return true;
  })
  
];

module.exports = { register, login, email, password, edit };
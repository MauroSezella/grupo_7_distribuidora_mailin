const userService = require('../model/services/userService');
const productService = require('../data/productService')

const { validationResult } = require('express-validator');

let userController = {

    login: (req, res) => {
        res.render('./users/login');
    },

    register: (req, res) => {
        res.render('./users/register');
    },

    processLogin: async (req, res) => {
        try {
            const resultValidation = validationResult(req);

            if (resultValidation.errors.length > 0) {
                return res.render('./users/login', {
                    errors: resultValidation.mapped(),
                    oldData: req.body
                });
            };

            let userToLogin = await userService.authLogin(req);

            req.session.userLogged = userToLogin ///guardar en session

            if (req.body.recordarUsuario) {
                res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 });
            };
            
            return res.redirect('/user/perfil');

        } catch (error) {
            console.error("Error en la autenticación: ", error.message);
            res.render("./users/login", {
              errors: {
                email: {msg: null},
                password: {msg: null},
                general: { msg: error.message},
              },
              oldData: req.body,
            });
        }
        
    },

    processRegister: (req, res) => {

        const resultValidation = validationResult(req);


        if (resultValidation.errors.length > 0) {
            return res.render('./users/register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }

        let userInDB = userService.findByField('email', req.body.email)

        if (userInDB) {
            return res.render('./users/register', {
                errors: {
                    email: {
                        msg: 'Este email ya está registrado'
                    }
                },
                oldData: req.body
            });

        }

        res.render('./users/login', { user: userService.create(req), mensaje: '¡Registro exitoso! Por favor, inicia sesión con tu nueva cuenta.' });

    },

    perfil: (req, res) => {
        res.render('./users/perfil', {
            user: req.session.userLogged
        })

    },

    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/')
    },
    admin: (req, res) => {
        res.render('./users/admin', { products: productService.getAll() })
    }

}

module.exports = userController;
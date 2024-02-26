const userService = require('../model/services/userService');
const productService = require('../data/productService')

const { validationResult } = require('express-validator');

let userController = {

    login: (req, res) => {
        if (req.query.action == "resetpassword") {
            res.render("./users/emailVerification");
        } else {
            res.render("./users/login");
        }
    },

    register: (req, res) => {
        res.render('./users/register');
    },

    profile: (req, res) => {
        res.render('./users/profile', {
            user: req.session.userLogged
        })
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

            return res.redirect('/user/profile');

        } catch (error) {
            console.error("Error en la autenticación: ", error.message);
            res.render("./users/login", {
                errors: {
                    email: { msg: null },
                    password: { msg: null },
                    general: { msg: error.message },
                },
                oldData: req.body,
            });
        }

    },
    ///CREAR
    processRegister: async (req, res) => {
    try {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render('./users/register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }
        let newUser = await userService.create(re);
        req.session.userLogged =newUser
        return res.redirect('/user/profile')
      
    }catch(error){
        return res.render("./users/register", {
            user: req.session.userLogged,
            errors: {
                
                email: error.message.includes("Este email ya está registrado") ? { msg: error.message } : null
            },
            oldData: req.body,
        });
    }
    },

    edit: (req, res) => {
        res.render('./users/editProfile', {
            user: req.session.userLogged
        })

    },

    update: async (req, res) => {
        try {
            const resultValidation = validationResult(req);

            if (resultValidation.errors.length > 0) {
                return res.render('./users/editProfile', {
                    user: req.session.userLogged,
                    errors: resultValidation.mapped(),
                    oldData: req.body
                });
            };
            await userService.update(req);
            return res.redirect("/user/profile")
        } catch (error) {
            return res.render("./users/editProfile", {
                user: req.session.userLogged,
                errors: {
                    general: {
                        msg: error.message.includes("Hubo un problema para procesar tu solicitud. Por favor, inténtalo más tarde.") ? error.message : null
                    },
                    email: error.message.includes("Este email ya está registrado") ? { msg: error.message } : null
                },
                oldData: req.body,
            });
        }
    },
    resetPassword: async (req, res) => {
        res.render("./users/resetPassword", { user: req.session.userLogged });
    },

    updatePassword: async (req, res) => {
        try {
            const resultValidation = validationResult(req);

            if (resultValidation.errors.length > 0) {
                return res.render('./users/resetPassword', {
                    user: req.session.userLogged || req.body,
                    errors: resultValidation.mapped(),
                    oldData: req.body
                });
            };
         
            if (req.body.id) {
                let result = await userService.updatePassword(req);
                return res.render("./users/login", {message: result});
                
            }else{
                await userService.update(req);
                return res.redirect("/user/profile")
            }
        } catch (error) {
            return res.render("./users/resetPassword", {
                user: req.session.userLogged || req.body,
                errors: {
                    general: {
                        msg: error.message
                    },
                },
                oldData: req.body,
            });
        }
    },
    verification: async (req, res) => {
        try {
            const resultValidation = validationResult(req);

            if (resultValidation.errors.length > 0) {
                return res.render("./users/emailVerification", {
                    errors: resultValidation.mapped(),
                    oldData: req.body,
                });
            }

            let userInDB = await userService.getByEmail(req.body.email);

            if (userInDB) {
                return res.render("./users/resetPassword", {
                    user: userInDB,
                });
            } else {
                return res.render("./users/emailVerification", {
                    errors: {
                        email: {
                            msg: "Este email no registrado. Por favor, crea una cuenta",
                        },
                    },
                });
            }
        } catch (error) {
            console.error("Error: ", error.message);
            return res.render("./users/emailVerification", {
                errors: {
                    general: {
                        msg: error.mensaje,
                    },
                },
            });
        }
    },




    delete: async (req, res) => {
        try {
           let result = await userService.delete(req);
           console.log(result)
            res.clearCookie('userEmail');
            req.session.destroy();
            return res.redirect('/')
        } catch (error) {
            console.error("Error: ", error.message);
            return res.render("./users/profile", {
                user: req.session.userLogged,
            });
        }

    },

    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/')
    },

    /*   admin: (req, res) => {
          res.render('./users/admin', { products: productService.getAll() })
      } */

}

module.exports = userController;
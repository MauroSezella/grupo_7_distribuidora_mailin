const userService = require('../model/services/userService');
const productService = require('../model/services/productService');
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
            const userToLogin = await userService.authLogin(req.body.email);

            const resultValidation = validationResult(req);
            if (resultValidation.errors.length > 0) {
                return res.render('./users/login', {
                    errors: resultValidation.mapped(),
                    oldData: req.body
                });
            };
    
            req.session.userLogged = userToLogin ///guardar en session
    
            if (req.body.recordarUsuario) {
                res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 });
            };
    
            return res.redirect('/user/profile');

        } catch (error) {
            return res.render("./users/login", {
                errors: {
                    general: { msg: error.message },
                },
                oldData: req.body,
            });
        }

    },

    processRegister: async (req, res) => {
        try {
            const resultValidation = validationResult(req);
            if (resultValidation.errors.length > 0) {
                if (req.file) {
                    userService.deleteAvatar(req.file.filename)
                }
                return res.render('./users/register', {
                    errors: resultValidation.mapped(),
                    oldData: req.body
                });
            };
            let newUser = await userService.create(req);
            req.session.userLogged = newUser;
            return res.redirect('/user/profile')

        } catch (error) {
            return res.render("./users/register", {
                errors: {
                    general: {
                        msg: error.message
                    },
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
                if (req.file) {
                    userService.deleteAvatar(req.file.filename)
                }
                return res.render('./users/editProfile', {
                    user: req.session.userLogged,
                    errors: resultValidation.mapped(),
                    oldData: req.body
                });
            };
           let user =  await userService.update(req);
           req.session.userLogged = user
            return res.redirect("/user/profile")
        } catch (error) {
            return res.render("./users/editProfile", {
                user: req.session.userLogged,
                errors: {
                    general: {msg: "Hubo un problema al procesar tu solicitud. Por favor, inténtalo nuevamente."}},
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
                    user: req.session.userLogged || req.params.id,
                    errors: resultValidation.mapped(),
                    oldData: req.body
                });
            };

            if (req.session && req.session.userLogged) {
                let user =  await userService.update(req);
                req.session.userLogged = user
                return res.redirect("/user/profile")
            }else{
                let result = await userService.updatePassword(req);
                return res.render("./users/login", { message: result });
            }
         
        } catch (error) {
            return res.render("./users/resetPassword", {
                user: req.session.userLogged || req.params.id,
                errors: {
                    general: {msg: "Hubo un problema al procesar tu solicitud. Por favor, inténtalo nuevamente."}
                },
                oldData: req.body,
            });
        }
    },
    verification: async (req, res) => {
        try {
            let userInDB = await userService.authLogin(req.body.email);
            const resultValidation = validationResult(req);

            if (resultValidation.errors.length > 0) {
                return res.render("./users/emailVerification", {
                    errors: resultValidation.mapped(),
                    oldData: req.body,
                });
            }

            return res.render("./users/resetPassword", {user: userInDB})
        } catch (error) {
            return res.render("./users/emailVerification", {
                errors: {
                    general: {msg: error.message}
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
    }

}

module.exports = userController;
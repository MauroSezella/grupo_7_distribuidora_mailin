const path = require('path');
const userService = require('../data/userService');
const productService= require('../model/services/productService');

const { validationResult } = require('express-validator');


let userController = {

    login: (req,res) => {
        res.render('./users/login');
    },

    register: (req, res) =>{
    
        res.render('./users/register')
    },

    processLogin: (req, res)=>{
        const resultValidation = validationResult(req);

		if (resultValidation.errors.length > 0) {
			    return res.render('./users/login', {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}

        let userToLogin= userService.findByField('email', req.body.email)

        if (userToLogin){

            const okPassword = userService.comparePasswords(req.body.password, userToLogin.password);

            if (okPassword){

                delete userToLogin.password
                req.session.userLogged=userToLogin ///guardar en session

                if(req.body.recordarUsuario){
                res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 } )
                }

                return res.redirect('/user/perfil');
            }
        }

        res.render('./users/login', {
            errors: {
                email:{
                    msg:null
                    },
                password:{
                msg:'Email y/o contraseña inválidos.'
                }
            }
        })

        /*if (userToLogin){

            const okPassword = userService.comparePasswords(req.body.password, userToLogin.password);

            if (okPassword){

                delete userToLogin.password
                req.session.userLogged=userToLogin ///guardar en session

                if(req.body.recordarUsuario){
                res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 } )
                }

                res.redirect('/user/perfil')

            }else{

                res.render('./users/login', {
                errors: {
                    email:{
                    msg:'Las credenciales son inválidas'
                    }
                }
            })
        }
        }else{
            res.render('./users/login', {
            errors: {
                email:{
                msg:'Usuario no registrado'
                }
            }
        })
    }*/
   
    },

    processRegister: (req, res) =>{

        const resultValidation = validationResult(req);

       
		if (resultValidation.errors.length > 0) {
			return res.render('./users/register', {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}

        let userInDB= userService.findByField('email', req.body.email)

        if (userInDB){
            return res.render('./users/register', {
				errors: {
                    email:{
                        msg: 'Este email ya está registrado'
                    }
                },
				oldData: req.body
			});

        }
      
        res.render('./users/login', { user: userService.create(req), mensaje: '¡Registro exitoso! Por favor, inicia sesión con tu nueva cuenta.'});
     
    },
    
    perfil: (req, res) =>{
        res.render('./users/perfil',{
            user:req.session.userLogged
        })

    },

    logout: (req, res)=>{
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/')
    },
    admin: (req,res)=>{
        res.render('./users/admin',{products: productService.getAll()} )
    }
   
}

module.exports = userController;
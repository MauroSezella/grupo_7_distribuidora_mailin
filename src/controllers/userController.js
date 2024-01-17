const path = require('path');
const userService= require ('../data/userService');

const { validationResult } = require('express-validator');

let userController = {

    login: (req,res) => {
        res.render('./users/login');
    },

    register: (req, res) =>{
        res.render('./users/register')
    },

    processRegister: (req, res) => {
        const errors = validationResult(req);
    
        if (errors.errors.length > 0) {
            return res.render('./users/register', { errors: errors.mapped(), oldData: req.body });
        }
    
        let userInDB = userService.findByField('email', req.body.email);
    
        if (userInDB) {
            return res.render('./users/register', { errors: { email: { msg: 'Este email ya está registrado' } }, oldData: req.body });
        }
    
      // res.render('./users/perfil', {user: userService.create(req)})
        res.render('./users/login', { user: userService.create(req), mensaje: '¡Registro exitoso! Por favor, inicia sesión con tu nueva cuenta.' });
    },

    perfil: (req, res)=>{
        res.render('./users/perfil')
    }
    

}

module.exports = userController;
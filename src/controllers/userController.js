const path = require('path');
const userService= require ('../data/userService');
const bcryptjs= require('bcryptjs');
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
    
        let userData = {
            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10),
            confirmPassword: bcryptjs.hashSync(req.body.password, 10),
            avatar: req.file.filename,
            rol: "cliente"
        };

       //res.render('./users/perfil', {user: userService.create(userData)})
       res.render('./users/login', { user: userService.create(userData), mensaje: '¡Registro exitoso! Por favor, inicia sesión con tu nueva cuenta.' });
    },

    perfil: (req, res)=>{
        res.render('./users/perfil')
    }
    

}

module.exports = userController;
const path = require('path');
const { validationResult } = require('express-validator');

let userController = {

    login: (req,res) => {
        res.render('./users/login');
    },

    register: (req, res) =>{
        res.render('./users/register')
    },
    processRegister: (req, res) =>{

        if (validationResult(req).errors.length > 0){
            res.render('./users/register', {errors: validationResult(req).mapped(), oldData: req.body});
        }else{
            res.render('./users/login', {mensaje: '¡Registro exitoso! Por favor, inicia sesión con tu nueva cuenta.'});
        }
    }

}

module.exports = userController;
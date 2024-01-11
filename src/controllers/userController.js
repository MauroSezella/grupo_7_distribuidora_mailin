const path = require('path');

let userController = {

    login: (req,res) => {
        res.render('./users/login');
    },

    register: (req, res) =>{
        res.render('./users/register')
    },
    processRegister: (req, res) =>{
        res.send({
            body: req.body,
            file: req.file
        })
    }

}

module.exports = userController;
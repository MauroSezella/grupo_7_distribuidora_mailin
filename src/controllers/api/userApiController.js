const userService = require('../../model/services/userService');

let userAPIController = {
    list: async (req, res) => {

        try {
            let results = await userService.getAllApi();
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    
    userById: async (req, res) => {

        try {
            let result = await userService.getByPK(req.params.id);
            let {password,rol, ...userData}= result;

            userData.url_imagen = `/images/users/${userData.avatar}`;
            
            res.status(200).json(userData);
        } catch (error) {
            res.status(500).json(error);
        }
    },
   
   /*  getOne: */
};

module.exports = userAPIController;
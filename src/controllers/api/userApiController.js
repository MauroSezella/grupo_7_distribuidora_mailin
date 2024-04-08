const userService = require('../../model/services/userService');

let userAPIController = {
    list: async (req, res) => {
        page = req.query.page ? parseInt(req.query.page) : 1;
        try {
            let results = await userService.getAllApi(page);
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
   
    
}
module.exports = userAPIController;
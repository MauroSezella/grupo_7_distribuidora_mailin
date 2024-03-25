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
   /*  getOne: */
};

module.exports = userAPIController;
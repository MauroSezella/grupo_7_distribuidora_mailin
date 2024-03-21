const userService = require('../../model/services/userService');
const productService = require('../../model/services/productService');

let apiController = {
    allProducts: async (req, res) => {
       let results = await productService.getAllApiProducts();
       res.json(results)
    },
    productById: async (req, res) => {
        let result = await productService.getBy(req.params.id);
        res.json(result)
    }
};

module.exports = apiController;
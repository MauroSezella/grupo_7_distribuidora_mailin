const userService = require('../../model/services/userService');
const productService = require('../../model/services/productService');

let productAPIController = {
    allProducts: async (req, res) => {

        try {
            let results = await productService.getAllApiProducts();
            res.json(results);
        } catch (error) {
            res.json(error);
        }
       
    },
    productById: async (req, res) => {
        try {
            let result = await productService.getBy(req.params.id);

            result.dataValues.url_imagen = `/images/products/${result.imagen}`;
            
            res.json(result);
        } catch (error) {
            res.json(error);
        }
       
       
    }
};

module.exports = productAPIController;
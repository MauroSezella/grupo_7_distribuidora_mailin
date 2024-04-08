const userService = require('../../model/services/userService');
const productService = require('../../model/services/productService');

let productAPIController = {
    list: async (req, res) => {

        page = req.query.page ? parseInt(req.query.page) : 1;

        try {
            let results = await productService.getAllApiProducts(page);
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
const productService = require('../../model/services/productService');

let productAPIController = {
    list: async (req, res) => {

        page = req.query.page ? parseInt(req.query.page) : 1;
        console.log(page);

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
    },

    checkout: async (req, res)=>{
        try {
            await productService.createCart(req)
            res.json({ok: true, status:200})
        } catch (error) {
            res.json({ok: false, status: 500})
        }
    }
};

module.exports = productAPIController;
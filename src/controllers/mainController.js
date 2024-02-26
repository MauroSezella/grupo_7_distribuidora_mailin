const path = require('path');
const productService = require('../data/productService');

let mainController = {

    index: async function(req,res){

        try {
            res.render('index', {products: await productService.getProductosEnOferta()});
        } catch (error) {
            console.log(error);
        }
       
    },

    search: async function (req, res) {
		const keywords = req.query.keywords;

        try {
            res.render('products/results', {products: await productService.search( keywords), keywords: keywords});
        } catch (error) {
            console.log(error);
        }

		
	},

}

module.exports = mainController;
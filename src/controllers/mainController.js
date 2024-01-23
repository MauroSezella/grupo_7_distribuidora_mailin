const path = require('path');
const productService = require('../data/productService');

let mainController = {

    index: (req,res) => {
        res.render('index', {products: productService.getProductosEnOferta()});
    },
    search: (req, res) => {
		const keywords = req.query.keywords;
		res.render('products/results', {products: productService.search( keywords), keywords: keywords});
		
	},

}

module.exports = mainController;
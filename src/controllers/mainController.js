const path = require('path');
const productService = require('../data/productService');

let mainController = {

    index: (req,res) => {
        res.render('index', {products: productService.getProductosEnOferta()});
    }

}

module.exports = mainController;
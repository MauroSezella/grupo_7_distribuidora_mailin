const path = require('path');
const productService = require('../data/productService');

let productController = {

    index: (req,res)=>{
        res.render('./products/products', {products: productService.getAll()})
    },

    getProduct: (req,res) => {
        res.render('./products/productDetail');
    },

    getCarrito: (req,res)=>{
        res.render('./products/productCart')
    },

    getCreate: (req,res)=>{
        res.render('./products/productForm')
    }

 
}

module.exports = productController;
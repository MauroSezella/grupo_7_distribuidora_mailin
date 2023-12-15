const path = require('path');
const productService = require('../data/productService');

let productController = {

    index: (req,res)=>{
        res.render('./products/products', {products: productService.getAll()})
    },

    detail: (req,res) => {
        res.render('./products/productDetail',{product: productService.getOne(req.params.id), products: productService.getProductosRelacionados(req.params.id)});
    },

    getCarrito: (req,res)=>{
        res.render('./products/productCart')
    },

    getCreate: (req,res)=>{
        res.render('./products/productForm')
    }

 
}

module.exports = productController;
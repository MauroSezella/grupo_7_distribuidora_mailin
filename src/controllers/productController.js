const path = require('path');

let productController = {

    getAll: (req,res)=>{
        res.render('./products/products')
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
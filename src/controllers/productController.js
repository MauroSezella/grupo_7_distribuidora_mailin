const path = require('path');

let productController = {

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
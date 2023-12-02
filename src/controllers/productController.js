const path = require('path');

let productController = {

    getProduct: (req,res) => {
        res.render('./products/productDetail');
    },

    getCarrito: (req,res)=>{
        res.render('./products/productCart')
    }

 
}

module.exports = productController;
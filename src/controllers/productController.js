const path = require('path');
const productService = require('../data/productService');

let productController = {

    index: (req,res)=>{
        res.render('./products/products', {products: productService.getAll(), categorias: productService.getCategorias()})
    },

    detail: (req,res) => {
        res.render('./products/productDetail',{product: productService.getOne(req.params.id), products: productService.getProductosRelacionados(req.params.id)});
    },

    getCarrito: (req,res)=>{
        res.render('./products/productCart');
    },

    create: (req,res)=>{
        res.render('./products/productForm', {products: productService.getCategorias()});//agrego
    },

    store:(req, res)=>{
       productService.save(req);
       res.redirect('/productos');
    },

    edit:(req,res)=>{
        res.render('./products/productEditForm',{product: productService.getOne(req.params.id), products: productService.getCategorias()});
        //agrego 
    },

    update:(req,res)=>{
        productService.update(req);
        res.redirect('/productos');
    },

    destroy:(req,res)=>{
        productService.delete(req.params.id);
        res.redirect('/productos');
    }


}

module.exports = productController;
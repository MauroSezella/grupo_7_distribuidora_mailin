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

    
    filter: (req,res)=>{
       
        res.render('./products/filter', {categorias: productService.getCategorias() , products: productService.getByCategory(req.params.categoria), categoria: req.params.categoria})
    },

    create: (req,res)=>{
        res.render('./products/productForm', {categorias: productService.getCategorias()});
    },

    store:(req, res)=>{
       productService.save(req);
       res.redirect('/productos');
    },

    edit:(req,res)=>{
        res.render('./products/productEditForm',{product: productService.getOne(req.params.id), categorias: productService.getCategorias()});
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
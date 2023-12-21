const path = require('path');
const productService = require('../data/productService');

let productController = {

    index: (req,res)=>{
        res.render('./products/products', {products: productService.getAll(), categorias: productService.getCategorias()})
    },

    detail: (req,res) => {

    let id=req.params.id;
        res.render('./products/productDetail',{product: productService.getOne(id), products: productService.getProductosRelacionados(id), categorias: productService.getCategorias()});
    },

    getCarrito: (req,res)=>{
        res.render('./products/productCart', {categorias: productService.getCategorias()});
    },

    filter: (req, res) => {
        const categoriasSeleccionadas = req.query.categorias || [];
        const ofertasSeleccionadas = req.query.ofertas || [];
        res.render('./products/filter', { products: productService.filtrarProductos(categoriasSeleccionadas, ofertasSeleccionadas), categorias: productService.getCategorias(), enOferta:ofertasSeleccionadas, categoriasSeleccionadas:categoriasSeleccionadas});
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
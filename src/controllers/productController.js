const path = require('path');
const productService = require('../model/services/productService');
const { log } = require('console');

let productController = {

    list: async function(req, res) {
        try {
            let productos = await productService.getAll();
            res.render('./products/products', {products: productos})
        } catch (error) {
            console.log(error);
            res.render('./products/products', {products: productos})
        }
    },

    detail: async function (req,res) {
  
    try {
        let product = await productService.getBy(req.params.id);
        res.render('./products/productDetail',{product: product, products: await productService.getProductosRelacionados(product)});

    } catch (error) {
        console.log(error);
        res.redirect('/productos');
    }    

    },

    getCarrito: (req,res)=>{
        res.render('./products/productCart');
    },

    filter: async function(req, res) {

        let categoriasSeleccionadas;

        if(typeof req.query.categorias !== 'string'){
            categoriasSeleccionadas = req.query.categorias || [];
        }else{
            categoriasSeleccionadas = [req.query.categorias];
        }

        let ofertasSeleccionadas = req.query.ofertas;

        try {
            res.render('./products/filter', { products: await productService.filtrarProductos(categoriasSeleccionadas, ofertasSeleccionadas), enOferta:ofertasSeleccionadas, categoriasSeleccionadas:categoriasSeleccionadas});
        } catch (error) {
            console.log(error);
            res.redirect('/productos');
        }

       
      },
    
    create: (req,res)=>{
        res.render('./products/productForm');
    },

    store: async function(req, res) {
       try {
            await productService.add(req.body, req.file);
            res.redirect('/productos');
       } catch (error) {
            console.log(error);
            res.redirect('/productos');
       }
       
    },

    edit: async function (req,res) {
        try {
            res.render('./products/productEditForm',{product: await productService.getBy(req.params.id)});
        } catch (error) {
            console.log(error);
            res.redirect('/productos');
        }
       
    },

    update: async function (req,res){
        try {
            await productService.update(req);
            res.redirect('/productos');
        } catch (error) {
            console.log(error);
            res.redirect('/productos');
        }
        
    },

    destroy:(req,res)=>{
        productService.delete(req.params.id);
        res.redirect('/productos');
    }

}

module.exports = productController;
const path = require('path');
const productService = require('../data/productService');

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

        res.render('./products/filter', { products: await productService.filtrarProductos(categoriasSeleccionadas, ofertasSeleccionadas), enOferta:ofertasSeleccionadas, categoriasSeleccionadas:categoriasSeleccionadas});
      },
    
    create: (req,res)=>{
        res.render('./products/productForm');
    },

    store:(req, res)=>{
       productService.save(req);
       res.redirect('/productos');
    },

    edit:(req,res)=>{
        res.render('./products/productEditForm',{product: productService.getOne(req.params.id)});
    },

    update:(req,res)=>{
        productService.update(req);
        res.redirect('/user/admin');
    },

    destroy:(req,res)=>{
        productService.delete(req.params.id);
        res.redirect('/productos');
    }


}

module.exports = productController;
const path = require('path');
const productService = require('../model/services/productService');
const { validationResult } = require('express-validator');

let productController = {

    list: async function (req, res) {
        page = parseInt(req.query.page) || 1;
        try {
            const results = await productService.getAll(page);
            res.render('./products/products', { products: results.productos, previous: results.previous, next: results.next, page })
        } catch (error) {
            console.log(error);
            res.render('./products/products', { products: [] })
        }
    },

    detail: async function (req, res) {

        try {
            let product = await productService.getBy(req.params.id);
            res.render('./products/productDetail', { product: product, products: await productService.getProductosRelacionados(product) });

        } catch (error) {
            console.log(error);
            res.redirect('/productos');
        }

    },

    getCarrito: (req, res) => {
        res.render('./products/productCart');
    },

    filter: async function (req, res) {

        if(!req.query.categorias && !req.query.ofertas && !req.query.orden){
            res.redirect('/productos')
        }

        let categoriasSeleccionadas;
        if (typeof req.query.categorias !== 'string') {
            categoriasSeleccionadas = req.query.categorias || [];
        } else {
            categoriasSeleccionadas = [req.query.categorias];
        }

        ofertas = req.query.ofertas? 1 : 0;
        orden = req.query.orden || 'stock-DESC';

        try {
            res.render('./products/filter', { products: await productService.filtrarProductos(categoriasSeleccionadas,ofertas, orden), categoriasSeleccionadas: categoriasSeleccionadas,ofertas: ofertas, orden: orden });
        } catch (error) {
            console.log(error);
            res.redirect('/productos');
        }
    },

    create: (req, res) => {
        res.render('./products/productForm');
    },

    store: async function (req, res) {
        try {
            const resultValidation = validationResult(req);
            if (resultValidation.errors.length > 0) {
                return res.render('./products/productForm', {
                    errors: resultValidation.mapped(),
                    oldData: req.body
                });
            }
            await productService.add(req.body, req.file);
            res.redirect('/productos');
        } catch (error) {
            return res.render("./products/productForm", {
                errors: {
                    general: {
                        msg: error.message.includes("Hubo un problema al procesar tu solicitud. Por favor, inténtalo nuevamente.") ? error.message : null
                    }
                },
                oldData: req.body,
            });
        }

    },

    edit: async function (req, res) {
        try {
            res.render('./products/productEditForm', { product: await productService.getBy(req.params.id) });
        } catch (error) {
            console.log(error);
            res.redirect('/productos');
        }

    },

    update: async function (req, res) {
        try {
            const resultValidation = validationResult(req);
            console.log(resultValidation);
            if (resultValidation.errors.length > 0) {
                return res.render('./products/productEditForm', {
                    errors: resultValidation.mapped(),
                    oldData: req.body,
                    product: await productService.getBy(req.params.id)
                });
            }

            await productService.update(req);
            res.redirect('/productos');
        } catch (error) {
            return res.render("./products/productEditForm", {
                errors: {
                    general: {
                        msg: error.message.includes("Hubo un problema al procesar tu solicitud. Por favor, inténtalo nuevamente.") ? error.message : null
                    }
                },
                oldData: req.body,
                product: await productService.getBy(req.params.id)
            });
        }

    },

    destroy: async function (req, res) {
        try {
            await productService.delete(req.params.id);
            res.redirect('/productos');
        } catch (error) {
            console.log(error);
            res.redirect('/productos');
        }

    }

}

module.exports = productController;
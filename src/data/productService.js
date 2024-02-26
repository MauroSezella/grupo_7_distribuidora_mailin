const fs = require("fs");
const path = require("path");
const User = require("./userService");
const db = require('../model/database/models');
const { Op } = require("sequelize");

const productService = {

    getAll: async function () {
        try {
            return await db.Productos.findAll({include: 'categoria'})
        } catch (error) {
            console.log(error);
            return [];
        }
    },

    getBy: async function (id) {
        try {
            return await db.Productos.findByPk(id, {
                include: 'categoria'
            })
        } catch (error) {
            console.log(error);
        }
    },

    getProductosRelacionados: async function (product) {
        
        categoria = product.categoria.id;

        try {
            return await db.Productos.findAll({where: {categoria_id : categoria}, include: 'categoria'})
        } catch (error) {
            console.log(error);
            return [];
        }
    },

    getProductosEnOferta: async function () {

        try {   
            return await db.Productos.findAll({where: {en_oferta : 1}, include: 'categoria'});
        } catch (error) {
            console.log(error);
            return [];
        }
    },

    getCategorias: async function () { 
        try {   
            return await db.Categorias.findAll();
        } catch (error) {
            console.log(error);
            return [];
        }

    },

    filtrarProductos: async function (categoriasSeleccionadas, ofertasSeleccionadas) {

        //Pregunto si se seleccionaron categorias y si se filtraron por ofertas
        if(categoriasSeleccionadas.length > 0 && ofertasSeleccionadas === 'si'){

        try {
                return await db.Productos.findAll({where: 
                {categoria_id : {[Op.in] : categoriasSeleccionadas},
                en_oferta : 1
                },
                 include: 'categoria'
                })
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    //Pregunto no se seleccionaron categorias y si se filtraron por ofertas
    if(categoriasSeleccionadas.length == 0 && ofertasSeleccionadas === 'si'){

        try {
            return await db.Productos.findAll({where: 
            {en_oferta : 1},
             include: 'categoria'
            })
         } catch (error) {
            console.log(error);
            return [];
        }

    }

    //Caso por defecto, no se filtraron por categorias ni por ofertas, o solo por categorias
    try {
        return await db.Productos.findAll({where: 
        {categoria_id : {[Op.in] : categoriasSeleccionadas}},
         include: 'categoria'
        })
        } catch (error) {
            console.log(error);
            return [];
        }

    },
    

    search: async function (keywords) {

        try {
            
            return await db.Productos.findAll({where: 
                {[Op.or]:[
                    {nombre : {[Op.like] : '%'+keywords+'%'}},
                    {'$categoria.nombre$' : {[Op.like] : '%'+keywords+'%'}}

                ]},
                 include: 'categoria'
                })
        } catch (error) {
            console.log(error);
            return [];
        }


    },

    save: function (req) {

        let product = req.body;
        let imagen = req.file;

        if (imagen != undefined) {
            product.img = imagen.filename
        }

        let maxId = this.products.reduce((valorMax, valorActual) => {
            return valorActual.id > valorMax ? valorActual.id : valorMax;
        }, 0);

        product.stock = parseInt(product.stock);
        product.precio = parseFloat(product.precio);
        if (product.descuento == null) {
            product.descuento = 0;
        } else {
            product.descuento = parseInt(product.descuento);
        }
        product.id = maxId + 1;

        this.products.push(product);
        fs.writeFileSync(productsFilePath, JSON.stringify(this.products, null, ' '), 'utf-8');

    },


    update: function (req) {
        let product = this.getOne(req.params.id);
        let productEdit = req.body;
        let imagen = req.file;

        product.nombre = productEdit.nombre;
        product.descripcion = productEdit.descripcion;
        product.categoria = productEdit.categoria;
        product.enOferta=productEdit.enOferta
        product.precio = parseFloat(productEdit.precio);
        product.stock = parseInt(productEdit.stock);
        product.descuento = parseInt(productEdit.descuento);

        if (imagen !== undefined) {
            this.eliminarImagen(product.img)
            product.img = imagen.filename
        }
        let index = this.products.findIndex((elem) => elem.id == req.params.id);
        this.products[index] = product;
        fs.writeFileSync(productsFilePath, JSON.stringify(this.products, null, ' '), "utf-8");

    },

    delete: function (id) {
    let product = this.getOne(id)
    this.eliminarImagen(product.img);
    const index = this.products.findIndex((elem) => elem.id == id);
    this.products.splice(index, 1);
    fs.writeFileSync(productsFilePath, JSON.stringify(this.products, null, ' '), "utf-8");
    console.log(`Producto con id ${id} eliminado correctamente.`);
    },
    
    eliminarImagen: function (nombreArchivo) {
        const rutaArchivo = path.join(__dirname, `../../public/images/products/${nombreArchivo}`);
        console.log(rutaArchivo) 
        fs.unlinkSync(rutaArchivo);
        console.log(`Imagen ${nombreArchivo} eliminada del servidor.`);
    
    }

}

   
module.exports = productService;
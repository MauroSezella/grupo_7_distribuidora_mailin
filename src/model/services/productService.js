const fs = require("fs");
const path = require("path");
const User = require("../../data/userService");
const db = require('../database/models');
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

    //Caso por defecto, no se filtraron por ofertas solo por categorias
    if(categoriasSeleccionadas.length > 0){
        try {
            return await db.Productos.findAll({where: 
            {categoria_id : {[Op.in] : categoriasSeleccionadas}},
            include: 'categoria'
            })
            } catch (error) {
                console.log(error);
                return [];
            }

    }else{
        return await this.getAll();
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

    add: async function(body, imagen){
        try {
            const producto = new Producto(body, imagen);
            return await db.Productos.create(producto);
        } catch (error) {
            console.log(error);
        }
    },
    
    update: async function (req) {

        let productId = req.params.id;
        let imagen = req.file;

        if(imagen !== undefined){

            try {
                let product = await this.getBy(productId);
                this.eliminarImagen(product.imagen);

            } catch (error) {
                console.log(error);
            }
            
            try {
                return await db.Productos.update({
                    nombre: req.body.nombre,
                    descripcion: req.body.descripcion,
                    imagen: imagen.filename,
                    categoria_id: req.body.categoria,
                    stock: req.body.stock,
                    en_oferta: req.body.en_oferta == null ? 0 : req.body.en_oferta,
                    precio: req.body.precio,
                    descuento: req.body.descuento
    
                },
                {
                    where: {id: productId}
                })
            } catch (error) {
                console.log(error);
            }

        }else{

            try {
                return await db.Productos.update({
                    nombre: req.body.nombre,
                    descripcion: req.body.descripcion,
                    categoria_id: req.body.categoria,
                    stock: req.body.stock,
                    en_oferta: req.body.en_oferta == null ? 0 : req.body.en_oferta,
                    precio: req.body.precio,
                    descuento: req.body.descuento
    
                },
                {
                    where: {id: productId}
                })
            } catch (error) {
                console.log(error);
            }
        }

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
        console.log(rutaArchivo); 
        fs.unlinkSync(rutaArchivo);
        console.log(`Imagen ${nombreArchivo} eliminada del servidor.`);
    
    }

}

function Producto({nombre, descripcion, categoria, stock, en_oferta, precio, descuento}, imagen) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.imagen = imagen.filename;
    this.categoria_id = categoria;
    this.stock= stock;
    this.en_oferta = en_oferta == null ? 0 : en_oferta;
    this.precio = precio;
    this.descuento = descuento;
    this.estado = 1;
}


   
module.exports = productService;
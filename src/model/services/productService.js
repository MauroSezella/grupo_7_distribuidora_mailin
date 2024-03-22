const fs = require("fs");
const path = require("path");
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
            return await db.Productos.findAll({where:  { descuento : {[Op.gt]: 0}}, include: 'categoria'});
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

    getCategoriaBy: async function (id) { 
        try {   
            return await db.Categorias.findByPk(id);
        } catch (error) {
            console.log(error);
            return null;
        }

    },

    filtrarProductos: async function (categoriasSeleccionadas, ofertasSeleccionadas) {

        //Pregunto si se seleccionaron categorias y si se filtraron por ofertas
        if(categoriasSeleccionadas.length > 0 && ofertasSeleccionadas === 'si'){

        try {
                return await db.Productos.findAll({where: 
                {categoria_id : {[Op.in] : categoriasSeleccionadas},
                descuento : {[Op.gt]: 0}
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
            { descuento : {[Op.gt]: 0}},
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
     try {
        return db.Productos.destroy({
            where: {
                id: id
            }
        });
     } catch (error) {
        console.log(error);
     }
    },
    
    eliminarImagen: function (nombreArchivo) {
        const rutaArchivo = path.join(__dirname, `../../public/images/products/${nombreArchivo}`);
        console.log(rutaArchivo); 
        fs.unlinkSync(rutaArchivo);
        console.log(`Imagen ${nombreArchivo} eliminada del servidor.`);
    
    },

    getAllByCategory: async function (id) { 
        try {   
            let products = await db.Productos.findAll({
                where: {categoria_id: id}
            });
            return products.length
        } catch (error) {
            console.log(error);
            return null;
        }

    },

    getAllApiProducts: async function () {
        try {
            let products = await productService.getAll();
            let category1 = await productService.getAllByCategory(1);
            let category2 = await productService.getAllByCategory(2);
            let category3 = await productService.getAllByCategory(3);
            let category4 = await productService.getAllByCategory(4);

            products.map((product)=>{product.dataValues.detail = `/api/products/${product.id}`});

            console.log(products);

            let results = {

                count:products.length,

                countByCategory: {
                    Galletas: category1,
                    Alfajores: category2,
                    Caramelos: category3,
                    Chupetines: category4
                },

                products: products,

               };

            return results;

        } catch (error) {
            console.log(error);
            return [];
        }
    },

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
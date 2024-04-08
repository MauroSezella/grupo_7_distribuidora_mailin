const fs = require("fs");
const path = require("path");
const db = require('../database/models');
const { Op } = require("sequelize");
const { error } = require("console");

const productService = {

    getAll: async function (page) {
        let limit = 8;
        let offset = (page - 1) * limit;
        try {
            let { count, rows } = await db.Productos.findAndCountAll({
                order: [['categoria_id', 'ASC'],['stock', 'DESC']],
                include: 'categoria',
                limit: limit,
                offset: offset
            })

            let previous = page > 1 ? page - 1 : null;
            let next = count - (offset + limit) > 0 ? page + 1 : null;

            return { productos: rows, previous, next }
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
            return await db.Productos.findAll({ where: { categoria_id: categoria }, include: 'categoria', order: [['stock', 'DESC']], })
        } catch (error) {
            console.log(error);
            return [];
        }
    },

    getProductosEnOferta: async function () {

        try {
            return await db.Productos.findAll({ where: { descuento: { [Op.gt]: 0 } }, include: 'categoria', order: [['stock', 'DESC']], });
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

    filtrarProductos: async function (categoriasSeleccionadas, ofertas, ordenSeleccionado) {
        try {
            let productos = await db.Productos.findAll({
                where: {
                    categoria_id: {
                        [Op.or]: categoriasSeleccionadas
                    },
                    descuento: {
                        [Op.gt]: ofertas
                    }
                },
                order: [ordenSeleccionado.split('-')],
                include: 'categoria',
            })
            return productos
        } catch {
            console.error(error.message)

        }
    },

    search: async function (keywords) {

        try {

            return await db.Productos.findAll({
                where:
                {
                    [Op.or]: [
                        { nombre: { [Op.like]: '%' + keywords + '%' } },
                        { '$categoria.nombre$': { [Op.like]: '%' + keywords + '%' } }

                    ]
                },
                include: 'categoria'
            })
        } catch (error) {
            console.log(error);
            return [];
        }


    },

    add: async function (body, imagen) {
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

        if (imagen !== undefined) {

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
                        where: { id: productId }
                    })
            } catch (error) {
                console.log(error);
            }

        } else {

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
                        where: { id: productId }
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
                where: { categoria_id: id }
            });
            return products.length
        } catch (error) {
            console.log(error);
            return null;
        }

    },

    getAllApiProducts: async function (page) {

        try {

            const offset = (page - 1) * 10;
            const limit = 10;

            const { count, rows } = await db.Productos.findAndCountAll({
                offset: offset,
                limit: limit,
                attributes: [
                    'id', 'nombre', 'descripcion'
                ],
                include: 'categoria'
            });

            let category1 = await productService.getAllByCategory(1);
            let category2 = await productService.getAllByCategory(2);
            let category3 = await productService.getAllByCategory(3);
            let category4 = await productService.getAllByCategory(4);

            rows.map((product) => { product.dataValues.detail = `/api/products/${product.id}` });

            let results = {

                count: count,

                countByCategory: [
                    {
                        nombre: "Galletas",
                        cantidad: category1
                    },
                    {
                        nombre: "Alfajores",
                        cantidad: category2
                    },
                    {
                        nombre: "Caramelos",
                        cantidad: category3
                    },
                    {
                        nombre: "Chupetines",
                        cantidad: category4
                    },
                    
                ],

                products: rows,

            };

            if (page > 1) {
                let previous = `/api/products/?page=${page - 1}`
                results.previous = previous;
            }

            if (count - (offset + limit) > 0) {
                let next = `/api/products/?page=${page + 1}`
                results.next = next;
            }

            return results;

        } catch (error) {
            console.log(error);
            return [];
        }


    },

    getLastProduct: async function () {
        try {
            let product = await db.Productos.findAll({
                order: [['id', 'DESC']],
                include: 'categoria',
                limit: 1
            })

            return product;

        } catch (error) {
            console.log(error);
            return [];
        }
    }

}

function Producto({ nombre, descripcion, categoria, stock, en_oferta, precio, descuento }, imagen) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.imagen = imagen.filename;
    this.categoria_id = categoria;
    this.stock = stock;
    this.en_oferta = en_oferta == null ? 0 : en_oferta;
    this.precio = precio;
    this.descuento = descuento;
    this.estado = 1;
}



module.exports = productService;
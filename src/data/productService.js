const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");

const productService = {

    products: JSON.parse(fs.readFileSync(productsFilePath, "utf-8")),

    getAll: function(){
        return this.products;
    },

    getOne: function (id) {
        product = this.products.find((elem) => elem.id == id);
        return product;
    },

    getProductosRelacionados: function(id){
        product = this.getOne(id);
        categoria = product.categoria;
        productsRelacionados = this.products.filter((product)=>product.categoria == categoria);

        return productsRelacionados;
    },

    getProductosEnOferta: function(){

        productosEnOferta = this.products.filter((product)=>product.enOferta == "si");

        return productosEnOferta;
    }


};

module.exports = productService;
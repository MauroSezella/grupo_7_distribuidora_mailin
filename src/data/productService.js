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
    },

    save: function(req){
        let product= req.body;
        let imagen= req.file;

        if (imagen != undefined ){
            product.img=imagen.filename
        }

        let maxId= this.products.reduce((valorMax, valorActual)=>{
            return valorActual.id > valorMax? valorActual.id: valorMax;
        }, 0);

        product.id=maxId++;
        this.products.push(product);
        fs.writeFileSync(productsFilePath, JSON.stringify(this.products), 'utf-8');
        
    }


};

module.exports = productService;
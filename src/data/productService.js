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

    getCategorias:  function(){ //array solo de categorias
        let categorias =[];

        this.products.forEach(product => {
            if(!categorias.includes(product.categoria )){
                categorias.push(product.categoria)
            }
        });

        return categorias;
        
    },

    getByCategory(categoria) {
        let products = this.products.filter((product) => {
            return product.categoria == categoria;
        });
    
        return products;
    },

    search: function (keywords) {
        return this.products.filter((product) => {
                 productSearch=product.nombre.toLowerCase().includes(keywords.toLowerCase());
                categoriaSearch= product.categoria.toLowerCase().includes(keywords.toLowerCase());
                return categoriaSearch || productSearch;
           })
        
    } ,

    save: function(req){
        
        let product= req.body;
        let imagen= req.file;
        
        if (imagen != undefined ){
            product.img=imagen.filename
        }
        
        let maxId= this.products.reduce((valorMax, valorActual)=>{
            return valorActual.id > valorMax? valorActual.id: valorMax;
        }, 0);

        if (product.enOferta === 'on'){
            product.enOferta='si';
        }else{
            product.enOferta='no';
        }
        product.stock = parseInt(product.stock);
        product.precio = parseFloat(product.precio);
        if (product.descripciones==null){ 
            product.descuento=0;
        }else{
        product.descuento = parseInt(product.descuento);
        }
        product.id=maxId+1;

        this.products.push(product);
        fs.writeFileSync(productsFilePath, JSON.stringify(this.products), 'utf-8');

    },

    update: function(req){

        let product = this.getOne(req.params.id);

        let productEdit = req.body;
    
        product.nombre = productEdit.nombre;
        product.descripcion = productEdit.descripcion;
        product.categoria = productEdit.categoria;

        if (productEdit.enOferta === 'on'){
            product.enOferta='si';
        }else{
            product.enOferta='no';
        }
        product.stock = parseInt(productEdit.stock);
        product.precio = parseFloat(productEdit.precio);
        product.descuento = parseInt(productEdit.descuento);
        let index = this.products.findIndex((elem) => elem.id == req.params.id);

        this.products[index] = product;
    
        fs.writeFileSync(productsFilePath, JSON.stringify(this.products), "utf-8");

    },

    delete: function(id){
        
        index = this.products.findIndex((elem)=>elem.id == id);
        this.products.splice(index,1);
        fs.writeFileSync(productsFilePath, JSON.stringify(this.products), "utf-8");
    },

    


};

module.exports = productService;
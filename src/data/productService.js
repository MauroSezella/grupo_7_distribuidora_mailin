const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");

const productService = {

    products: JSON.parse(fs.readFileSync(productsFilePath, "utf-8")),

    getAll: function(){
        return this.products;
    }


};

module.exports = productService;
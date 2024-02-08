let modelProducto = (sequelize, DataTypes) => {
    let alias = "Productos";
    let columns = {
        id : {
            type : DataTypes.INTEGER , 
            allowNull : false ,
            primaryKey : true ,
            autoIncrement : true ,
        },
        nombre : DataTypes.STRING ,
        descripcion : DataTypes.STRING ,
        en_oferta : DataTypes.INTEGER ,
        precio : DataTypes.DECIMAL ,
        descuento : DataTypes.INTEGER ,
        stock : DataTypes.INTEGER ,
        imagen : DataTypes.STRING ,
        estado : DataTypes.INTEGER ,
    };
    let config = {
        tableName : "productos",
        timestamps : false
    };
    let Producto = sequelize.define(alias, columns, config);
        return Producto
}

module.exports = modelProducto ;
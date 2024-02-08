let modelProductoCarrito = (sequelize, DataTypes) => {
    let alias = "Productos_Carrito";
    let columns = {
        id : {
            type : DataTypes.INTEGER , 
            allowNull : false ,
            primaryKey : true ,
            autoIncrement : true ,
        },
        cantidad : DataTypes.INTEGER ,
        subtotal : DataTypes.DECIMAL ,
        
        
    };
    let config = {
        tableName : "productos_carrito",
        timestamps : false
    };
    let ProductoCarrito = sequelize.define(alias, columns, config);


    
        return ProductoCarrito
}

module.exports = modelProductoCarrito ;
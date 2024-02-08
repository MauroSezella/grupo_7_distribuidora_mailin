let modelCarrito = (sequelize, DataTypes) => {
    let alias = "Carritos";
    let columns = {
        id : {
            type : DataTypes.INTEGER , 
            allowNull : false ,
            primaryKey : true ,
            autoIncrement : true ,
        },
        total : DataTypes.DECIMAL ,
        fecha_pedido : DataTypes.DATE ,
        estado : DataTypes.INTEGER ,
        
    };
    let config = {
        tableName : "carritos",
        timestamps : false
    };
    let Carrito = sequelize.define(alias, columns, config);


    
        return Carrito
}

module.exports = modelCarrito ;
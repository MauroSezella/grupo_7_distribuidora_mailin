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

    ProductoCarrito.associate = (models) => {
        ProductoCarrito.belongsTo (models.Cupones, {
            as : "cupon",
            foreignKey : "cupon_id"
        })
    
        ProductoCarrito.belongsTo (models.Carritos, {
            as : "carrito",
            foreignKey : "carrito_id"
        })

        ProductoCarrito.belongsTo (models.Productos, {
            as : "producto",
            foreignKey : "producto_id"
        })
    }
        return ProductoCarrito
}

module.exports = modelProductoCarrito ;
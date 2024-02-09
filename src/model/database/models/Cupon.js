let modelCupon = (sequelize, DataTypes) => {
    let alias = "Cupones";
    let columns = {
        id : {
            type : DataTypes.INTEGER , 
            allowNull : false ,
            primaryKey : true ,
            autoIncrement : true ,
        },
        codigo : DataTypes.STRING ,
        descuento : DataTypes.INTEGER ,
        estado : DataTypes.INTEGER ,
        fecha_expiracion : DataTypes.DATE ,
                
    };
    let config = {
        tableName : "cupones",
        timestamps : false
    };
    let Cupon = sequelize.define(alias, columns, config);

    Cupon.associate = (models) => {
        Cupon.hasMany (models.Productos_Carrito, {
            as : "cuponProductoCarrito",
            foreignKey : "cupon_id"
        })
    }
    
    
        return Cupon
}

module.exports = modelCupon ;
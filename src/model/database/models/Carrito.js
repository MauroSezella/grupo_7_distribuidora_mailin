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
        estado : DataTypes.STRING,   
    };
    let config = {
        tableName : "carrito",
        timestamps : false
    };
    let Carrito = sequelize.define(alias, columns, config);

    Carrito.associate = (models) => {
        Carrito.belongsToMany (models.Productos, {
            as : "productos",
            through : models.Productos_Carrito,
            foreignKey: "carrito_id",
            otherKey: "producto_id"
        })    
        Carrito.belongsTo (models.Usuarios, {
            as : "carrito",
            foreignKey : "usuario_id"
        })

    }
    
        return Carrito
}

module.exports = modelCarrito ;
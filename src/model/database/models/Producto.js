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


    Producto.associate = (models) => {
        Producto.belongsTo (models.Categorias, {
            as : "categoria",
            foreignKey : "categoria_id"
        })
        Producto.belongsToMany (models.Carritos, {
            as : "carritos",
            through : models.Productos_Carrito,
            foreignKey: "producto_id",
            otherKey: "carrito_id"
        })    
        
    }
        return Producto
}

module.exports = modelProducto ;
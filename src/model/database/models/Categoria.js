let modelCategoria = (sequelize, DataTypes) => {
    let alias = "Categorias";
    let columns = {
        id : {
            type : DataTypes.INTEGER , 
            allowNull : false ,
            primaryKey : true ,
            autoIncrement : true ,
        },
        nombre : DataTypes.STRING ,
        estado : DataTypes.INTEGER ,
    };
    let config = {
        tableName : "categorias",
        timestamps : false
    };
    let Categoria = sequelize.define(alias, columns, config);
        return Categoria
}

module.exports = modelCategoria ;
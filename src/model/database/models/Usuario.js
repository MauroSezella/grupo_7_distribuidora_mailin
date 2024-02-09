let modelUsuarios = (sequelize, DataTypes) => {
    let alias = "Usuarios";
    let columns = {
        id : {
            type : DataTypes.INTEGER , 
            allowNull : false ,
            primaryKey : true ,
            autoIncrement : true ,
        },
        nombre : DataTypes.STRING ,
        apellido : DataTypes.STRING ,
        email : DataTypes.STRING ,
        password : DataTypes.STRING ,
        avatar : DataTypes.STRING ,
        rol : DataTypes.STRING ,
        estado : DataTypes.INTEGER ,
    };
    let config = {
        tableName : "usuarios",
        timestamps : false
    };
    let Usuario = sequelize.define(alias, columns, config);

    Usuario.associate = (models) => {
        Usuario.hasMany (models.Carritos, {
            as : "carritos",
            foreignKey : "usuario_id"
        })
    }
    
    
        return Usuario
}

module.exports = modelUsuario ;
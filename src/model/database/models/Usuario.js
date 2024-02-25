let modelUsuario = (sequelize, DataTypes) => {
    let alias = "Usuarios";
    let columns = {
        id : {
            type : DataTypes.INTEGER , 
            allowNull : false ,
            primaryKey : true ,
            autoIncrement : true ,
        },
        nombre : {
            type : DataTypes.STRING, 
            allowNull : false ,
        },
        apellido : {
            type : DataTypes.STRING, 
            allowNull : false ,
        },
        email : {
            type : DataTypes.STRING, 
            allowNull : false ,
            unique: true,
        },
        password : {
            type : DataTypes.STRING, 
            allowNull : false ,
        },
        avatar : DataTypes.STRING ,
        rol :{
            type : DataTypes.STRING, 
            allowNull : false ,
        },
        estado : {
            type: DataTypes.INTEGER,
            allowNull : false ,
        }
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
const fs = require("fs");
const path = require("path");
const bcryptjs = require("bcryptjs");
const db = require("../database/models/");

const User = {
    getAll: async function () {
        try {
            return await db.Usuarios.findAll({
                raw: true,
                nest: true,
            });
        } catch (error) {
            console.error("Error al obtener Usuarios: ", error.message);
            return [];
        }
    },

    getByPK: async function (id) {
        try {
            return await db.Usuarios.findByPk(id, {
                raw: true,
                nest: true,
            });
        } catch (error) {
            console.error(`Error al obtener usuario por Pk ${id}: `, error.message);
            throw new Error("Hubo un problema al procesar tu solicitud. Por favor, inténtalo nuevamente.");
        }
    },

    getByEmail: async function (data) {
        try {
            return await db.Usuarios.findOne({
                where: {
                    email: data,
                },
                raw: true,
                nest: true,
            });
        } catch (error) {
            console.error("Error al obtener usuario por email: ", error.message);
            throw new Error("Hubo un problema al procesar tu solicitud. Por favor, inténtalo nuevamente.");
        }
    },

    authLogin: async function (req) {
        try {
            let userInDB = await this.getByEmail(req.body.email);
            if (!userInDB) {
                throw new Error("Los datos son incorrectos. Revísalos y vuelve a intentarlo.");
            }

            let okPassword = this.comparePasswords(req.body.password, userInDB.password);
            if (okPassword) {
                delete userInDB.password;
                return userInDB;
            } else {
                throw new Error("Los datos son incorrectos. Revísalos y vuelve a intentarlo.");
            }

        } catch (error) {
            console.error("Error en la autenticación: ", error.message);
            throw error
        }
    },

    comparePasswords: (password, hashedPassword) => {
        return bcryptjs.compareSync(password, hashedPassword);
    },

    create: async function (req) {
        try {
            let userInDB = await this.getByEmail(req.body.email)
            if (userInDB){
                throw new Error('Este email está registrado')
            }
            let data= {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email,
                avatar: req.file ? req.file.filename : "avatar_default.png",
                password: bcryptjs.hashSync(req.body.password, 10),
                rol: "CLIENTE",
                estado: 1,
              };
             let newUser= await db.Usuarios.create(data, {raw: true, 
                nest: true,})

            delete newUser.password;
            return newUser
        } catch (error) {
            console.error('Error en registro:', error.message)
            throw error
            
        
                
    } 
         
              
    },

    update: async function (req) {
        try {
            let userLogged = req.session.userLogged;
            //verifico si el email ingresado esta registrado en db
            if (req.body.email) {
                let userInDB = await this.getByEmail(req.body.email);
                if (userInDB && userInDB.email !== userLogged.email) {
                    console.log('usuario registrado')
                  throw new Error("Este email ya está registrado");
                }
              }
            
            let oldData = await this.getByPK(userLogged.id);
            let image = oldData.avatar
            let deleteImage = null;

            if (req.file) {
                image = req.file.filename;
                deleteImage = oldData.avatar
            }

            let result = await db.Usuarios.update({
                nombre: req.body.nombre ? req.body.nombre : oldData.nombre,
                apellido: req.body.apellido ? req.body.apellido : oldData.apellido,
                email: req.body.email ? req.body.email : oldData.email,
                avatar: image,
                password: req.body.password ? bcryptjs.hashSync(req.body.password, 10) : oldData.password,
            }, {
                where: { id: oldData.id }
            });

            if (result == 1) {
               if (deleteImage) {
                   this.deleteAvatar(deleteImage);
               };
            };
            let updatedUser= await this.getByPK(oldData.id);
            delete updatedUser.password;
            req.session.userLogged = updatedUser //actualizo session
            console.log('usuario actualizado')
            return updatedUser;
        } catch (error) {
            console.error("Error al modificar usuario: ", error.message);
            throw error;
        }
    },
    updatePassword: async function (req) {
        try {
              let  oldData= await this.getByPK(req.body.id); //modificar password de usuario no logueado
            let result = await db.Usuarios.update({
                password: req.body.password ? bcryptjs.hashSync(req.body.password, 10) : oldData.password,
            }, {
                where: { id: oldData.id }
            });

            if (result==1) {
                return 'Tu contraseña ha sido restablecida con éxito';
            }
            return null
        } catch (error) {
            console.error("Error al modificar usuario: ", error.message);
            throw error;
        }
    },

    delete: async function (req) {
        try {
          let userLogged = req.session.userLogged;
          await db.Usuarios.destroy({
              where: {
                  id: userLogged.id,
              },
          });
           this.deleteAvatar(userLogged.avatar);
            return 'usuario eliminado'
    
      } catch (error) {
          console.error("error al eliminar el usuario: ", error.message);
        }
      },

    deleteAvatar: function (image) {
        const rutaArchivo = path.resolve("public", "images", "users", image);
        if (image !== "avatar_default.png") {
          fs.unlinkSync(rutaArchivo);
          console.log(`Imagen ${image} eliminada.`);
        }
      },
};

module.exports = User;

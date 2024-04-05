const fs = require("fs");
const path = require("path");
const bcryptjs = require("bcryptjs");
const db = require("../database/models/");
const {fn, col} = require ('sequelize')

const User = {
    getAllApi: async function (page){
        try {

            const offset = (page-1)*10;
            const limit = 10;

            const {count , rows} = await db.Usuarios.findAndCountAll({
                attributes: [
                    'id',
                    [fn('concat', col('nombre'), ' ', col('apellido')), 'name'],
                    'email',
                ],
                raw: true,
            })
    
            let users = rows.map(user => ({
                ...user,
                detail : `/api/users/${user.id}`
            }))

            if(page > 1){
                let previous = `/api/users/?page=${page-1}`
                results.previous = previous;
             }

            if(count - (offset + limit) > 0){
                let next = `/api/users/?page=${page + 1}`
                results.next = next;
            }
    
            return {count,users}
        } catch (error) {
            console.error(error);
            return []
        }
    },

    getAll: async function () {
        try {
            return await db.Usuarios.findAll({
                raw: true
            });
        } catch (error) {
            console.error("Error al obtener Usuarios: ", error.message);
            return []

        }
    },

    getByPK: async function (id) {
        try {
            return await db.Usuarios.findByPk(id, {
                raw: true
            });
        } catch (error) {
            console.error(`Error al obtener usuario por Pk ${id}: `, error.message);
            return null 
        }
    },
    
    getByEmail: async function (data) {
        try {
           return await db.Usuarios.findOne({
                where: {
                    email: data,
                },
                raw: true,
            });
        } catch (error) {
            console.error("Error al obtener usuario por email: ", error.message);
            return null
        }
    },

    authLogin: async function (data) {
        try {
            let userToLogin =  await db.Usuarios.findOne({
                where: {
                    email: data,
                },
                raw: true,
            })

            if (userToLogin) {
                delete userToLogin;
                return userToLogin;
            }
        } catch (error) {
            console.error("Error en la autenticación: ", error.message);
            throw new Error("Hubo un problema al procesar tu solicitud. Por favor, inténtalo nuevamente.");
        }
    },

    comparePasswords: (password, hashedPassword) => {
        return bcryptjs.compareSync(password, hashedPassword);
    },

    create: async function (req) {
        const data = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            avatar: req.file ? req.file.filename : "avatar_default.png",
            password: bcryptjs.hashSync(req.body.password, 10),
            rol: "CLIENTE",
            estado: 1,
        };
        try {
            let newUser = await db.Usuarios.create(data, {
                raw: true,
            })

            delete newUser.password;
            return newUser

        } catch (error) {
            console.error('Error en registro:', error.message)
            throw new Error("Hubo un problema al procesar tu solicitud. Por favor, inténtalo nuevamente.");
        }
    },

    update: async function (req) {
        try {
            let userLogged = req.session.userLogged;
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
            let updatedUser = await this.getByPK(oldData.id);
            delete updatedUser.password;
            req.session.userLogged = updatedUser //actualizo session
            console.log('usuario actualizado')
            return updatedUser;
        } catch (error) {
            console.error("Error al modificar usuario: ", error.message);
            throw new Error("Hubo un problema al procesar tu solicitud. Por favor, inténtalo nuevamente.");
        }
    },
    updatePassword: async function (req) {
        try {
            let oldData = await this.getByPK(req.body.id); //modificar password de usuario no logueado
            let result = await db.Usuarios.update({
                password: req.body.password ? bcryptjs.hashSync(req.body.password, 10) : oldData.password,
            }, {
                where: { id: oldData.id }
            });

            if (result == 1) {
                return 'Tu contraseña ha sido restablecida con éxito';
            }
            return null
        } catch (error) {
            console.error("Error al modificar usuario: ", error.message);
            throw new Error("Hubo un problema al procesar tu solicitud. Por favor, inténtalo nuevamente.");
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
    }


};

module.exports = User;

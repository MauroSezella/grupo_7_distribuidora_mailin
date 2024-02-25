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

    create: function (req) {
        let allUsers = this.findAll();
        delete req.body.confirmPassword;

        let newUser = {
            id: this.generateId(),
            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10),
            avatar: req.file ? req.file.filename : "default.png",
            rol: "cliente",
        };

        allUsers.push(newUser);
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, " "));
        return newUser;
    },

    delete: function (id) {
        let allUsers = this.findAll();
        let finalUser = allUsers.filter((oneUser) => oneUser.id !== id);
        fs.writeFileSync(this.fileName, JSON.stringify(finalUser, null, " "));
        return true;
    },
};

module.exports = User;

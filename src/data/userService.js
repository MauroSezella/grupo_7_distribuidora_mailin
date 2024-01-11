
const fs = require("fs");
const path = require("path");

const User = {
    fileName: path.join(__dirname, "../data/usersDataBase.json"),

    users: function () {
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'))
    },

    generateId: function () {
        let lastUser = this.users().pop();
        if (lastUser) {
            return lastUser.id + 1;
        }
        return 1;
    },

    findById: function (id) {
        let userFound = this.users().find(oneUser => oneUser.id === id);
        return userFound;
    },

    findByField: function (field, text) { 
         let userFound = this.users().find(oneUser => oneUser[field] === text);
         return userFound;
    },

    create: function (userData) {
        let allUsers = this.users();
       // delete userData.confirmPassword;

        let newUser = {
            id: this.generateId(),
            ...userData,
        }
        allUsers.push(newUser);
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ' '));
        return newUser;
    },

    delete: function (id) {
        let finalUser = this.users().filter(oneUser => oneUser.id !== id);
        fs.writeFileSync(this.fileName, JSON.stringify(finalUser, null, ' '));
        return true
    }

}

module.exports = User;
const bcryptjs= require('bcryptjs')

const fs = require("fs");
const path = require("path");

const User={
    fileName: path.join(__dirname, "../data/usersDataBase.json") ,

    getData: function (){
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'))
    },

    generateId: function(){
        let allUsers= this.findAll();
        let lastUser= allUsers.pop();
        if(lastUser){
            return lastUser.id + 1 ;
        }
        return 1;
   },

    findAll: function(){
        return this.getData()
    },

    findByPK: function(id){
        let allUsers= this.findAll();
        let userFound= allUsers.find(oneUser=> oneUser.id==id);
        return userFound;
    },

    findByField: function(field, text){
        let allUsers= this.findAll();
        let userFound= allUsers.find(oneUser=> oneUser[field]===text);
        return userFound;
    },

    comparePasswords: (password, hashedPassword) => {
        return bcryptjs.compareSync(password, hashedPassword);
    },


    create: function(req){

        let allUsers= this.findAll();
        delete req.body.confirmPassword
        
        let newUser = {
            id: this.generateId(),
            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10),
            avatar: req.file ? req.file.filename : 'default.png',
            rol: 'cliente'
        }

        allUsers.push(newUser);
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ' '));
        return newUser;
    },


    delete: function(id){
        let allUsers= this.findAll();
        let finalUser = allUsers.filter(oneUser => oneUser.id !== id);
        fs.writeFileSync(this.fileName, JSON.stringify(finalUser, null, ' '));
        return true
    }
}

module.exports = User;
require('dotenv').config();
console.log(process.env);

let config={
  "development": {
    "username": "root",
    "password": "root",
    "database": "golosinas_mailin",
    "host": "127.0.0.1",
    "dialect": "mysql"
    
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
  
}

module.exports=config;
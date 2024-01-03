const express = require('express');
const path = require('path');
const app = express();
const methodOverride =  require('method-override');

const indexRouter = require('./routes/index.routes');

app.listen(3030, ()=> console.log('Servidor corriendo en el puerto 3030, http://localhost:3030/'));

//Middlewares
app.use(express.static(path.resolve(__dirname,'../public')));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));

//Template Engine 
app.set('view engine','ejs');
app.set('views', path.join(__dirname, '/views'));

app.use('/', indexRouter);



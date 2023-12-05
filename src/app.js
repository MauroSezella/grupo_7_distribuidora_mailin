const express = require('express');
const path = require('path');
const app = express();

const indexRouter = require('./routes/index.routes');

app.listen(3030, ()=> console.log('Servidor corriendo en el puerto 3030'));

app.use(express.static(path.resolve(__dirname,'../public')));

app.set('view engine','ejs');
app.set('views', path.join(__dirname, '/views'));

app.use('/', indexRouter);



const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
const methodOverride =  require('method-override');

const cookies= require('cookie-parser')

const indexRouter = require('./routes/index.routes');

const userLoggedMiddleware= require('./middlewares/userLogged')

app.listen(3030, ()=> console.log('Servidor corriendo en el puerto 3030, http://localhost:3030/'));

//Middlewares
app.use(express.static(path.resolve(__dirname,'../public')));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(session({
	secret: "Shhh, It's a secret",
	resave: false,
	saveUninitialized: false,
}));


//Template Engine 
app.set('view engine','ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(cookies())

app.use(userLoggedMiddleware); 

app.use('/', indexRouter);

app.use((req,res,next)=>{
	res.status(404).render('not-found');
})



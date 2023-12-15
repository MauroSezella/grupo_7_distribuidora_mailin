const express = require('express');
const path = require('path');
const app = express();

app.listen(3030, () => console.log('Servidor Corriendo'));

app.use(express.static('public'));

app.get('/',(req,res) => res.sendFile(path.resolve("./views/index.html")));
app.get('/login',(req,res) => res.sendFile(path.resolve("./views/login.html")));
app.get('/productDetail',(req,res) => res.sendFile(path.resolve("./views/productDetail.html")));
app.get('/productCart',(req,res) => res.sendFile(path.resolve("./views/productCart.html")));
app.get('/register',(req,res) => res.sendFile(path.resolve("./views/register.html")));

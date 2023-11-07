const express = require('express');
const path = require('path');
const app = express();

app.listen(3030, () => console.log('Servidor Corriendo'));

app.use(express.static('public'));

app.get('/productCart',(req,res) => res.sendFile(path.resolve("./views/productCart.html")));
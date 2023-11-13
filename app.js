const express = require('express');
const path = require('path');
const app = express();

app.listen(3030, () => console.log('Servidor Corriendo en el puerto ' + port));

app.use(express.static('public'));

app.get('/',(req,res) => res.sendFile(path.resolve("./views/index.html")));
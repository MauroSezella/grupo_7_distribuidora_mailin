const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
       cb(null, './public/images/products'); 
    }, 
    filename: function (req, file, cb) { 
       cb(null, `img_${path.extname(file.originalname)}`);  } //Aqui tenemos que setear como queremos se guardan las imagenes.
  })

const upload = multer({ storage : storage });

module.exports = upload;
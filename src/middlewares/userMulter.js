const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
       cb(null, './public/images/users'); 
    }, 
    filename: function (req, file, cb) { 
       cb(null, file.fieldname +'_'+ Date.now() + '_'+ path.extname(file.originalname));
    } 
  })

const uploadUser = multer({ storage : storage });

module.exports = uploadUser;
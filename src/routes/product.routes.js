const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const productController = require('../controllers/productController');

/*** TRAER TODOS LOS PRODUCTOS***/ 
router.get('/', productController.index);
router.get('/cart', productController.getCarrito);
router.get('/filter', productController.filter);

/*** CREAR UN PRODUCTO ***/ 
router.get('/create', productController.create);
router.post('/', upload.single('img'), productController.store)

/*** VER DETALLE DE UN PRODUCTO ***/ 
router.get('/:id',productController.detail);

/*** EDITAR UN PRODUCTO ***/ 
router.get('/edit/:id', productController.edit); 
router.put('/edit/:id',upload.single('img'), productController.update); 

/*** ELIMINAR UN PRODUCTO ***/
router.delete('/:id', productController.destroy);




module.exports = router;
const path = require('path');
const { check } = require('express-validator');
const productService = require('../model/services/productService');

const validationProduct = [
    check('nombre')
        .notEmpty().withMessage('Ingrese un nombre para el producto').bail()
        .isLength({min: 5}).withMessage('El nombre debe tener al menos 5 caracteres').bail(),

    check('descripcion')
        .notEmpty().withMessage('Ingrese una descripcion para el producto').bail()
        .isLength({min: 20}).withMessage('El nombre debe tener al menos 20 caracteres').bail(),
    
    check('categoria')
        .notEmpty().withMessage('Ingrese una categoria').bail()
        .custom(async function (value){ 
                categoria = await productService.getCategoriaBy(value);
                if(!categoria){
                    throw new Error('Ingrese una categoria valida');   
                }
                return true
        }), 
    
    check('stock')
        .notEmpty().withMessage('Ingrese un valor para el stock').bail()
        .isNumeric().withMessage('Stock debe ser un numero').bail(),    
    
    check('precio')
        .notEmpty().withMessage('Ingrese un valor para el precio').bail()
        .isNumeric().withMessage('El precio debe ser un numero').bail(),

    check('descuento')
        .notEmpty().withMessage('Ingrese un valor para el descuento').bail()
        .isNumeric().withMessage('Descuento debe ser un numero').bail(),     

    check('en_oferta')
        .custom((value)=>{
            if(value == undefined || value == 1){
                return true;
            }
            throw new Error('Valor incorrecto'); 
        }),       

    check('imagen').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.jpeg'];
        
        if (file) {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
               throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }
        return true;
        }), 
        
        
];

module.exports = validationProduct;
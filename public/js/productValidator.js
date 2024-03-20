window.addEventListener('load',function(){

    let formulario = document.querySelector('.formulario');
    let btnSubmit = document.querySelector('.btn-guardar');

    const exprNumber = /^[0-9]+([.][0-9]+)?$/;
    const acceptedExtensions = ['jpg', 'png', 'jpeg'];
    const esImagenValida = (val) => {
    if (val) {
        const array = val.split(".")
        const lastItem = array.pop()
       return acceptedExtensions.includes(lastItem)  
     }
    }
    
    btnSubmit.addEventListener('click', e => {

        let errores = 0;

        formulario.nombre.classList.remove('is-invalid');
        errorNombre.innerHTML = '';

        formulario.descripcion.classList.remove('is-invalid');
        errorDescripcion.innerHTML = '';

        formulario.stock.classList.remove('is-invalid');
        errorStock.innerHTML = '';

        formulario.precio.classList.remove('is-invalid');
        errorPrecio.innerHTML = '';

        formulario.descuento.classList.remove('is-invalid');
        errorDescuento.innerHTML = '';

        formulario.imagen.classList.remove('is-invalid');
        errorImagen.innerHTML = '';
       
        if (formulario.nombre.value == ""){
            formulario.nombre.classList.add('is-invalid');
            errorNombre.innerHTML += 'El nombre no puede estar vacio';
            errores++;
        } else if(formulario.nombre.value.length < 5){
            formulario.nombre.classList.add('is-invalid');
            errorNombre.innerHTML += 'El nombre tiene que tener al menos 5 caracteres';
            errores++;
        } 

        if (formulario.descripcion.value == ""){
            formulario.descripcion.classList.add('is-invalid');
            errorDescripcion.innerHTML += 'La descripcion no puede estar vacia';
            errores++;
        } else if(formulario.descripcion.value.length < 20){
            formulario.descripcion.classList.add('is-invalid');
            errorDescripcion.innerHTML += 'La descripcion tiene que tener al menos 20 caracteres';
            errores++;
        } 

        if (formulario.stock.value == ""){
            formulario.stock.classList.add('is-invalid');
            errorStock.innerHTML += 'El stock no puede estar vacio';
            errores++;
        } else if(!exprNumber.test(formulario.stock.value)){
            formulario.stock.classList.add('is-invalid');
            errorStock.innerHTML += 'El stock debe ser un numero';
            errores++;
        } 

        if (formulario.precio.value == ""){
            formulario.precio.classList.add('is-invalid');
            errorPrecio.innerHTML += 'El precio no puede estar vacio';
            errores++;
        } else if(!exprNumber.test(formulario.precio.value)){
            formulario.precio.classList.add('is-invalid');
            errorPrecio.innerHTML += 'El precio debe ser un numero';
            errores++;
        } 

        if (formulario.descuento.value == ""){
            formulario.descuento.classList.add('is-invalid');
            errorDescuento.innerHTML += 'El descuento no puede estar vacio';
            errores++;
        } else if(!exprNumber.test(formulario.descuento.value)){
            formulario.descuento.classList.add('is-invalid');
            errorDescuento.innerHTML += 'El descuento debe ser un numero';
            errores++;
        } 

        if(formulario.imagen.value && !esImagenValida(formulario.imagen.value)){
            formulario.imagen.classList.add('is-invalid');
            errorImagen.innerHTML += 'Solo se admiten formatos .jpg, .png, .jpeg';
            errores++;
        }

        if(errores){
            e.preventDefault();
        }
       

    })
    
})
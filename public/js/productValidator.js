window.addEventListener('load',function(){

    let formulario = document.querySelector('.formulario');
    let btnSubmit = document.querySelector('.btn-guardar');
    let errorNombre = document.querySelector('#errorNombre');
    
    btnSubmit.addEventListener('click', e => {
        e.preventDefault()
        let errores = []
        
        if (formulario.nombre == "" ) {
            errorNombre.innerText += "'nombre' no puede estar vacío"
        }
    })
    
})
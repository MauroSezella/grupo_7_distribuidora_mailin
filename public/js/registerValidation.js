window.addEventListener('load', function () {
    let btnSubmit = document.getElementById('btnSubmit');
    let inputNombre = document.getElementById('nombre');
    let inputApellido = document.getElementById('apellido');
    let inputEmail = document.getElementById('email');
    let inputPassword = document.getElementById('password');
    let inputConfirmar = document.getElementById('confirmPassword')
    let inputArchivo = document.getElementById('avatar');
    let erNombre = document.getElementById('erNombre');
    let erApellido = document.getElementById('erApellido');
    let erEmail = document.getElementById('erEmail');
    let erPassword = document.getElementById('erPassword');
    let erConfirmar = document.getElementById('erConfirmar');
    let erArchivo = document.getElementById('erArchivo');
    let registerForm = document.getElementById('form');

    const validacion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   
    const acceptedExtensions = ['jpg', 'png', 'jpeg', 'gif'];
    const esImagenValida = (val) => {
        if (val) {
            const array = val.split(".")
            const lastItem = array.pop()
           return acceptedExtensions.includes(lastItem)  
        }
   }

    btnSubmit.addEventListener('click', function (e) {
        
        e.preventDefault();
        let errores = {};

        

        if (inputNombre.value.length < 4) {
            errores.nombre = 'El nombre debe tener al menos 4 caracteres';
        }

        if (inputApellido.value.length < 4) {
            errores.apellido = 'El apellido debe tener al menos 4 caracteres';
        }

        if (inputEmail.value.length < 1 ||  !validacion.test(inputEmail.value) ) {
            errores.email = 'Debe ingresar un email válido que no esté registrado previamente';
        }

        if (inputPassword.value.length < 8) {
            errores.password = 'La contraseña debe tener al menos 8 caracteres';
        }

        if (inputConfirmar.value !== inputPassword.value) {
            errores.confirmPassword = 'Las contraseñas no coinciden';
        }
    
        if (inputArchivo.value && !esImagenValida(inputArchivo.value)) {
                errores.archivo = `Las extensiones de archivo permitidas: ${acceptedExtensions.join(', ')}`
         }

        console.log(errores, erNombre)
        if (Object.keys(errores).length >= 1) {
            erNombre.innerText = (errores.nombre) ? errores.nombre : "";
            erApellido.innerText = (errores.apellido) ? errores.apellido : "";
            erEmail.innerText = (errores.email) ? errores.email : "";
            erPassword.innerText = (errores.password) ? errores.password : "";
            erConfirmar.innerText = (errores.confirmPassword) ? errores.confirmPassword : "";
            erArchivo.innerText = (errores.archivo) ? errores.archivo : "";
        } else {
            registerForm.submit();
        }
    });
});
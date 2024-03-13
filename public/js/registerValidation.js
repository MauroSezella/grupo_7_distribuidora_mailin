window.addEventListener('load', function () {
    let btnSubmit = document.getElementById('btnSubmit');
    let inputNombre = document.getElementById('nombre');
    let inputApellido = document.getElementById('apellido');
    let inputEmail = document.getElementById('email');
    let inputPassword = document.getElementById('password');
    let inputConfirmar = document.getElementById('confirmPassword')
    let inputArchivo = document.getElementById('avatar');
    let inputTerminos = document.getElementById('aceptaTerminos');  
    
    let erNombre = document.getElementById('erNombre');
    let erApellido = document.getElementById('erApellido');
    let erEmail = document.getElementById('erEmail');
    let erPassword = document.getElementById('erPassword');
    let erConfirmar = document.getElementById('erConfirmar');
    let erArchivo = document.getElementById('erArchivo');  
    let erTerminos = document.getElementById('erAcepTerminos');  
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
    
    const erEmailBack = document.getElementById('erEmail-back');
    inputEmail.addEventListener('input', function () {
        if (erEmailBack.innerHTML !== '') {
            erEmailBack.innerHTML = '';
            inputEmail.classList.remove('is-invalid')
        }
    });
    
    btnSubmit.addEventListener('click', function (e) {
        
        e.preventDefault();
        let errores = {};


        if (inputNombre.value.trim().length < 2) {
            errores.nombre = 'El nombre debe tener al menos 2 caracteres';
            inputNombre.classList.add('is-invalid')
        }else{
            inputNombre.classList.remove('is-invalid')
        }

        if (inputApellido.value.length < 2) {
            errores.apellido = 'El apellido debe tener al menos 2 caracteres';
            inputApellido.classList.add('is-invalid')
        }else{
            inputApellido.classList.remove('is-invalid')
        }

        if (!validacion.test(inputEmail.value)) {
            errores.email = 'Debe ingresar un email válido';
            inputEmail.classList.add('is-invalid')
        } else {
            inputEmail.classList.remove('is-invalid')
        }


        if (inputConfirmar.value == '') {
            errores.confirmPassword = 'Debe confirmar la contraseña';
            inputConfirmar.classList.add('is-invalid');
           
            }
     
        if (inputPassword.value.length >= 8) {
            if (inputConfirmar.value !== '') {
                if (inputConfirmar.value !== inputPassword.value) {
                    errores.confirmPassword = 'Las contraseñas no coinciden';
                    inputConfirmar.classList.add('is-invalid');
                    inputPassword.classList.add('is-invalid');
                } else {
                    inputConfirmar.classList.remove('is-invalid');
                    inputPassword.classList.remove('is-invalid');
                }
            } else {
                errores.confirmPassword = 'Debe confirmar la contraseña';
                inputConfirmar.classList.add('is-invalid');
            }
        } else {
            errores.password = 'La contraseña debe tener al menos 8 caracteres';
            inputPassword.classList.add('is-invalid');
        }
 
        if (inputArchivo.value && !esImagenValida(inputArchivo.value)) {
            errores.archivo = `Las extensiones de archivo permitidas: ${acceptedExtensions.join(', ')}`
            inputArchivo.classList.add('is-invalid')
        } else {
            inputArchivo.classList.remove('is-invalid')
        }

        if (!inputTerminos.checked) {
            errores.terminos = 'Debe aceptar los términos y condiciones';
        }

        console.log(errores, erNombre)
        if (Object.keys(errores).length >= 1) {
            erNombre.innerText = (errores.nombre) ? errores.nombre : "";
            erApellido.innerText = (errores.apellido) ? errores.apellido : "";
            erEmail.innerText = (errores.email) ? errores.email : "";
            erPassword.innerText = (errores.password) ? errores.password : "";
            erConfirmar.innerText = (errores.confirmPassword) ? errores.confirmPassword : "";
            erArchivo.innerText = (errores.archivo) ? errores.archivo : "";
            erTerminos.innerText = (errores.terminos) ? errores.terminos : "";
        } else {
            registerForm.submit();
        }
    });
});
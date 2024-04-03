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

    // Validaciones on time
    inputNombre.addEventListener('blur', () => {
        if (inputNombre.value.trim()=='') {
            erNombre.innerText = 'El campo nombre no puede quedar vacío'
            inputNombre.classList.add('is-invalid')
        }
        else if (inputNombre.value.trim().length < 2) {
            erNombre.innerText = 'El nombre debe tener al menos 2 caracteres'
            inputNombre.classList.add('is-invalid')
        }
        else {
            erNombre.innerText = ''
            inputNombre.classList.remove('is-invalid')
        }
    })

    inputApellido.addEventListener('blur', () => {
        if (inputApellido.value.trim()=='') {
            erApellido.innerText = 'El campo apellido no puede quedar vacío'
            inputApellido.classList.add('is-invalid')
        }
        else if (inputApellido.value.trim().length < 2) {
            erApellido.innerText = 'El apellido debe tener al menos 2 caracteres'
            inputApellido.classList.add('is-invalid')
        }
        else {
            erApellido.innerText = ''
            inputApellido.classList.remove('is-invalid')
        }
    })

    inputEmail.addEventListener('blur', () => {
        if (inputEmail.value.trim()=='') {
            erEmail.innerText = 'El campo email no puede quedar vacío';
            inputEmail.classList.add('is-invalid')
        }
        else if (!validacion.test(inputEmail.value)) {
            erEmail.innerText = 'Debe ingresar un email válido';
            inputEmail.classList.add('is-invalid')
        } else {
            erEmail.innerText = '';
            inputEmail.classList.remove('is-invalid')
        }
    })

    inputPassword.addEventListener('blur', () => {
        if (inputPassword.value.trim()=='') {
            erPassword.innerText = 'Debes ingresar una contraseña'
            inputPassword.classList.add('is-invalid')
        }
        else if (inputPassword.value.trim().length < 8) {
            erPassword.innerText = 'La contraseña debe tener al menos 8 caracteres'
            inputPassword.classList.add('is-invalid')
        }
        else {
            erPassword.innerText = ''
            inputPassword.classList.remove('is-invalid')
        }
    })

    inputConfirmar.addEventListener('blur', () => {
        if (inputConfirmar.value.trim()=='') {
            erConfirmar.innerText = 'Debes ingresar una contraseña'
            inputConfirmar.classList.add('is-invalid')
        }
        else if (inputConfirmar.value.trim().length < 8) {
            erConfirmar.innerText = 'La contraseña debe tener al menos 8 caracteres'
            inputConfirmar.classList.add('is-invalid')
        }
        else {
            erConfirmar.innerText = ''
            inputConfirmar.classList.remove('is-invalid')
        }
    })
    
    // Validaciones en submit
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
window.addEventListener('load', function () {
    let btnSubmit = document.getElementById('btnSubmit');

    let inputEmail = document.getElementById('email');
    let inputPassword = document.getElementById('password');


    let erEmail = document.getElementById('erEmail');
    let erPassword = document.getElementById('erPassword');

    let LoginForm = document.getElementById('form');

    const validacion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let erEmailBack = document.getElementById('erEmail-back');
    inputEmail.addEventListener('input', function () {
        if (erEmailBack.innerHTML !== '') {
            erEmailBack.innerHTML = '';
            inputEmail.classList.remove('is-invalid')
        }
    });
    let erPassBack= document.getElementById('erPass-back');
    inputPassword.addEventListener('input', function () {
        if (erPassBack.innerHTML !== '') {
            erPassBack.innerHTML = '';
            inputPassword.classList.remove('is-invalid')
        }
    });

    // Validaciones on time
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
            erPassword.innerHTML = 'Debe ingresar una contraseña';
            inputPassword.classList.add('is-invalid')
            if (erPassBack.innerHTML !== '') {
                erPassBack.innerHTML = '';
            }
        } else {
            erPassword.innerHTML = '';
            inputPassword.classList.remove('is-invalid')
        }
    })

    // Validacion al hacer submit
    btnSubmit.addEventListener('click', function (e) {

        e.preventDefault();
        let errores = {};

        if (inputEmail.value.trim()=='') {
            errores.email = 'El campo email no puede quedar vacío';
            inputEmail.classList.add('is-invalid')
        }
        else if (!validacion.test(inputEmail.value)) {
            errores.email = 'Debe ingresar un email válido';
            inputEmail.classList.add('is-invalid')
        } else{
            inputEmail.classList.remove('is-invalid')
        }

        if (inputPassword.value.trim()=='') {
            errores.password = 'Debe ingresar una contraseña';
            inputPassword.classList.add('is-invalid')
                if (erPassBack.innerHTML !== '') {
                    erPassBack.innerHTML = '';
                }
        }else{
            inputPassword.classList.remove('is-invalid')
        }

        if (Object.keys(errores).length >= 1) {
            erEmail.innerText = (errores.email) ? errores.email : "";
            erPassword.innerText = (errores.password) ? errores.password : "";
        } else {
            LoginForm.submit();
        }

    });


    let mostrarPassword = document.getElementById('mostrarPassword')

    mostrarPassword.addEventListener('click', ()=>{
        if (inputPassword.type === 'password') {
            inputPassword.type = 'text';
            mostrarPassword.classList.remove('fa-eye');
            mostrarPassword.classList.add('fa-eye-slash');
        } else {
            inputPassword.type = 'password';
            mostrarPassword.classList.remove('fa-eye-slash');
            mostrarPassword.classList.add('fa-eye');
        }
    })



});
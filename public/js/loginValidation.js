window.addEventListener('load', function () {
    let btnSubmit = document.getElementById('btnSubmit');
    
    let inputEmail = document.getElementById('email');
    let inputPassword = document.getElementById('password');
    
    
    let erEmail = document.getElementById('erEmail');
    let erPassword = document.getElementById('erPassword');
   
    let registerForm = document.getElementById('form');

    const validacion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
   

    btnSubmit.addEventListener('click', function (e) {
        
        e.preventDefault();
        let errores = {};   
        
        if (inputEmail.value.length < 1 ||   !validacion.test(inputEmail.value) ) {
            errores.email = 'Debe ingresar un email válido registrado previamente';
        }

        if (inputPassword.value.length < 8) {
            errores.password = 'La contraseña debe tener al menos 8 caracteres';
        }

        
        
        if (Object.keys(errores).length >= 1) {
            
            erEmail.innerText = (errores.email) ? errores.email : "";
            erPassword.innerText = (errores.password) ? errores.password : "";
            
        } else {
            registerForm.submit();
        }
    });
});
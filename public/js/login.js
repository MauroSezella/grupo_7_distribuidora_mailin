window.addEventListener('load', () => {
    let mostrarPassword = document.getElementById('mostrarPassword')
    let inputPassword = document.getElementById('password')

    mostrarPassword.addEventListener('click', ()=>{
        if (inputPassword.type === 'password') {
            inputPassword.type = 'text';
            mostrarPassword.classList.remove('fa-eye-slash');
            mostrarPassword.classList.add('fa-eye');
        } else {
            inputPassword.type = 'password';
            mostrarPassword.classList.remove('fa-eye');
            mostrarPassword.classList.add('fa-eye-slash');
        }
    })


});

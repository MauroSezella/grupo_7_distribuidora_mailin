window.addEventListener('load', () => {
    let perfil = document.querySelector('#enlace-perfil');
    let pedido = document.querySelector('#enlace-pedidos'); 
   // let sectionPedidos = document.getElementById('pedidos');
    let sectionPerfil = document.getElementById('perfil'); 
    let sectionCompras = document.getElementById('compras');

  
    sectionCompras.style.display = 'none';
    perfil.classList.add('active');
    pedido.classList.remove('active');

    perfil.addEventListener('click', (event) => {
        event.preventDefault();
        sectionCompras.style.display = 'none';
        sectionPerfil.style.display = 'block';
        perfil.classList.add('active');
        pedido.classList.remove('active');
    });

    pedido.addEventListener('click', (event) => {
        event.preventDefault();
        sectionPerfil.style.display = 'none';
       // sectionPedidos.style.display = 'block';
       sectionCompras.style.display = 'flex';
        pedido.classList.add('active');
        perfil.classList.remove('active');
    });

    let deleteUser = document.querySelector('.form-delete')

    deleteUser.addEventListener('click', ()=>{
        if (confirm('¿Estás seguro de que quieres eliminar tu Cuenta?')) {
            deleteUser.submit();
        }
    })


});

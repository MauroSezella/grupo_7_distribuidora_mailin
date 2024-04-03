window.addEventListener('load', () =>{
    console.log('estoy vinculado')

    // captura de elementos DOM
    let btnAñadirCarrito = document.querySelector('.agregar-carrito');
    let inputCantidad = document.querySelector('.cantidad-item');

    btnAñadirCarrito.addEventListener('click', (event)=> {
        event.preventDefault()
        console.log('boton funcionando');
        console.log(inputCantidad.value);

        if (localStorage.carrito) {
            let carrito = JSON.parse(localStorage.carrito);
            let index = carrito.findIndex( 
                (prod) => ( prod.id ==  event.target.dataset.id));
            if (index !== -1) {
                carrito[index].cantidad = parseInt(carrito[index].cantidad) + parseInt(inputCantidad.value)
            } else {
                carrito.push({id:event.target.dataset.id, cantidad:inputCantidad.value})
            };
            localStorage.setItem("carrito", JSON.stringify(carrito))
        } else {
            localStorage.setItem("carrito", JSON.stringify([{id:event.target.dataset.id, cantidad:parseInt(inputCantidad.value)}]))
        }; 
    })
})

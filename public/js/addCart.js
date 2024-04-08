window.addEventListener('load', () => {
    let precios = document.querySelectorAll('.formatoPrecio');
    precios.forEach(precio=>{
        valor = parseFloat(precio.textContent);
        precio.textContent = valor.toLocaleString('es-AR', {
            style: 'currency',
            currency: 'ARS'
        });
    })

    let mostrarCantidad = document.querySelector('.mostrarCantidad');
    mostrarCantidad.innerHTML = productosEnCarrito() ;
    
    let btnAddCart = document.querySelectorAll('.btnAddCart');
    btnAddCart.forEach(btn => {
        btn.addEventListener('click', (event) => {
            idProduct = event.target.dataset.id;
            if (localStorage.carrito) {
                let carrito = JSON.parse(localStorage.carrito);
                let index = carrito.findIndex(producto => (parseInt(producto.id) === parseInt(idProduct)));
                if (index !== -1) {
                    carrito[index].cantidad += 1
                } else {
                    carrito.push({
                        id: idProduct,
                        cantidad: 1
                    })
                };
                localStorage.setItem("carrito", JSON.stringify(carrito))
            } else {
                localStorage.setItem("carrito", JSON.stringify([{ id: idProduct, cantidad: 1 }]))
            };
            mostrarCantidad.innerHTML = productosEnCarrito()
        });
    });

    let btnAddCartDetail = document.querySelector('.btnAddCartDetail');
    let inputCantidad = document.querySelector('.cantidad-item');

    btnAddCartDetail.addEventListener('click', (event) => {
        event.preventDefault()
        idProduct = event.target.dataset.id;
        if (localStorage.carrito) {
            let carrito = JSON.parse(localStorage.carrito);
            let index = carrito.findIndex(producto => (parseInt(producto.id) === parseInt(idProduct)));
            if (index !== -1) {
                carrito[index].cantidad += parseInt(inputCantidad.value)
            } else {
                carrito.push({
                    id: idProduct,
                    cantidad: parseInt(inputCantidad.value)
                });
            };
            localStorage.setItem("carrito", JSON.stringify(carrito))
        } else {
            localStorage.setItem("carrito", JSON.stringify([{ id: idProduct, cantidad: parseInt(inputCantidad.value) }]))
        };
        mostrarCantidad.innerHTML = productosEnCarrito()
    });


});

function productosEnCarrito() {
    if (localStorage.carrito) {
        let carrito = JSON.parse(localStorage.carrito);
        return carrito.reduce((acum, producto) => {
            return acum + producto.cantidad;
        }, 0);
    } else {
        return 0;
    }
};


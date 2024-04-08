window.addEventListener('load', () =>{
    // captura de elementos DOM, todos los botones del slider y products
    let btnAddCart = document.querySelectorAll('.btnAddCart');
    btnAddCart.forEach(btn =>{
        btn.addEventListener('click', (event)=>{
            idProduct = event.target.dataset.id;
            if (localStorage.carrito) {
                let carrito = JSON.parse(localStorage.carrito);
                let index = carrito.findIndex(producto => (producto.id == idProduct));
                if (index !== -1) {
                    carrito[index].cantidad += 1
                } else {
                    carrito.push({
                        id: idProduct,
                        cantidad:1
                    })
                };
                localStorage.setItem("carrito", JSON.stringify(carrito))
            } else {
                localStorage.setItem("carrito", JSON.stringify([{id: idProduct, cantidad: 1}]))
            }; 
        });
    });

    //boton de product detail
    let btnAddCartDetail = document.querySelector('.btnAddCartDetail');
    let inputCantidad = document.querySelector('.cantidad-item');

    btnAddCartDetail.addEventListener('click', (event)=> {
        event.preventDefault()
        idProduct = event.target.dataset.id;
            if (localStorage.carrito) {
                let carrito = JSON.parse(localStorage.carrito);
                let index = carrito.findIndex( producto => ( producto.id == idProduct));
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
                localStorage.setItem("carrito", JSON.stringify([{id:idProduct, cantidad: parseInt(inputCantidad.value)}]))
            }; 
    });
});

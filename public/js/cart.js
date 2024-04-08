let totalCarrito;
let total;
window.addEventListener('load', () => {
    totalCarrito = document.querySelector('.totalCarrito');
    let products = [];

    if (localStorage.carrito) {
        let carrito = JSON.parse(localStorage.carrito);
        carrito.forEach(async (item, index) => {
            await fetchProduct(carrito, item, index, products);
            total= calcularTotal(products)
            totalCarrito.innerHTML = `${formatoPesos(total)}`;
        });
    } else {
        setCarritoVacio();
    };

    let formCart = document.querySelector("#form-cart");

    formCart.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = {
            orderItems: products,
            total: calcularTotal(products),
        };
        fetch("/api/carrito", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((res) => {
                if (res.ok) {
                    vaciarCarrito();
                    location.href = `/productos`;
                }else{
                    location.href = `/productos/cart`;
                }
            })
            .catch((error) => console.log(error));
    });
});

async function fetchProduct(carrito, item, index, products) {
    let cardRows = document.querySelector('.cardRows');
    let response = await fetch(`/api/products/${item.id}`);
    let product = await response.json();

    if (product) {
        let precioFinal = calcularPrecio(product);
        cardRows.innerHTML += `
        <tr class="item-producto" id="row${index}">
             <td class="col-product" colspan="3">
                 <div class="contenedor_product">
                     <button class="boton-cancelar" onclick="removeItem(${index})">
                         <i class="fa-solid fa-x boton-cancelar__icono"></i>
                     </button>
                     <a href="/productos/${product.id}" class="col-img_produc">
                         <img src="/images/products/${product.imagen}" alt="">
                     </a>
                     <div class="col-name_product">
                         <a href="/productos/${product.id}">${product.nombre}</a>
                         <div class="contenedor_movil">
                             <span class="movil_cantidad">${item.cantidad} x </span>
                             <span class="movil_precio">${formatoPesos(precioFinal)}</span>
                         </div>
                     </div>
                 </div>
             </td>
             <td class="col-precio"><span>${formatoPesos(precioFinal)}</span></td>
             <td class="col-cantidad">
                <div class="cantidad">
                    <input type="number" value="${item.cantidad}"  class="carrito_input-cantidad "id="cantidad_product${index}" min="1" max="10" onchange="actualizarSubtotal(${index})"/>
                </div>
             </td>
             <td class="col-subtotal"><span>${formatoPesos((item.cantidad * precioFinal).toFixed(2))}</span></td>
         </tr>`;

        products.push({
            id: product.id,
            cantidad: item.cantidad,
            subtotal: (precioFinal * item.cantidad).toFixed(2),
        });

    } else {
        carrito.splice(index, 1);
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    return products;
};

function calcularPrecio(product) {
    let precio = product.precio - (product.precio * (product.descuento / 100));
    return precio.toFixed(2);
}

function calcularTotal(products) {
    let total = products.reduce((acum, product) => {
        return acum + parseFloat(product.subtotal);
    }, 0);

    return total.toFixed(2);
};

function setCarritoVacio() {
    let contenedorCarrito = document.querySelector('.contenedor-carrito');
    let seguirFinalizar = document.querySelector('.seguir-finalizar');
    let CarritoVacio = document.querySelector('.contendor_carrito-vacio');
    contenedorCarrito.style.display = 'none';
    seguirFinalizar.style.display = 'none';
    CarritoVacio.style.display = 'flex';
}

function removeItem(index) {
    let carrito = JSON.parse(localStorage.carrito);
    if (carrito.length > 1) {
        carrito.splice(index, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
    } else {
        localStorage.removeItem("carrito");
        setCarritoVacio();
    }
    window.location.reload();
}
function actualizarSubtotal(index) {
    let cantidadInput = document.getElementById(`cantidad_product${index}`);
    let carrito = JSON.parse(localStorage.getItem('carrito'));
    carrito[index].cantidad = parseInt(cantidadInput.value);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    window.location.reload()
}

function formatoPesos(precio) {
    precio = parseFloat(precio)
    return precio.toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS'
    })
}

function vaciarCarrito(){
    localStorage.removeItem('carrito');
}

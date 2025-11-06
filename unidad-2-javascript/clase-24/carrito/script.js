// Carrito de productos de Boca Juniors
const cart = [
    {
        id: 1,
        title: "Camiseta Titular Boca Juniors",
        price: 25000,
        quantity: 1
    },
    {
        id: 2,
        title: "Camiseta Suplente Boca Juniors",
        price: 23000,
        quantity: 1
    },
    {
        id: 3,
        title: "Campera Boca Juniors",
        price: 35000,
        quantity: 1
    },
    {
        id: 4,
        title: "Gorra Boca Juniors",
        price: 8000,
        quantity: 1
    },
    {
        id: 5,
        title: "Bufanda Boca Juniors",
        price: 6000,
        quantity: 1
    }
]

const cart_conteiner = document.getElementById('cart-conteiner')
const button_eliminar_carrito = document.getElementById('button-eliminar-carrito')
const precio_total = document.getElementById('Total')

// Variables para el modal
const modalContainer = document.querySelector('.modal-container')
const modal = document.querySelector('.modal')

function findProductById(product_id) {
    for (const product of cart) {
        if (product.id === product_id) {
            return product
        }
    }
    return null
}

// Función para simular fallas del servidor
function simularFallo(tasaFallo) {
    const random = Math.random() * 100
    return random < tasaFallo
}

// Funciones del modal
function renderModal(title, text) {
    modal.innerHTML = `
        <button class="btn-close">X</button>
        <h2>${title}</h2>
        <p>${text}</p>
    `

    const btnCloseModal = document.querySelector('.btn-close');
    btnCloseModal.addEventListener('click', handleCloseModal);

    handleOpenModal();
}

function handleOpenModal() {
    modalContainer.classList.remove('close')
}

function handleCloseModal() {
    modalContainer.classList.add('close')
}

function renderizarCarrito() {
    let plantilla_html = ''
    for (const product of cart) {
        plantilla_html = plantilla_html + `
            <div>
                <h3>${product.title}</h3>
                    <p>Precio unitario: $${product.price}</p>
                    <p>Subtotal: $${product.price * product.quantity}</p>
                <button class="btn-decrementar" data-product_id="${product.id}">-</button>
                <p class="contador-productos">${product.quantity}</p>
                <button class="btn-incrementar" data-product_id="${product.id}">+</button>
                <button class="btn-eliminar" data-product_id="${product.id}">Eliminar</button>
            </div>
        `
    }
    cart_conteiner.innerHTML = plantilla_html

    const btn_incrementar = cart_conteiner.getElementsByClassName('btn-incrementar')

    for (const btnI of btn_incrementar) {
        btnI.addEventListener(
            "click",
            incrementProductQuantity
        )
    }
    const btn_decrementar = cart_conteiner.getElementsByClassName('btn-decrementar')
    for (const btnD of btn_decrementar) {
        btnD.addEventListener(
            "click",
            decrementProductQuantity
        )
    }
    const btn_eliminar = cart_conteiner.getElementsByClassName('btn-eliminar')
    for (const btnE of btn_eliminar) {
        btnE.addEventListener(
            "click",
            handleDeleteProduct
        )
    }
    calcularTotal()
}

function incrementProductQuantity(event) {
    try {
        // Simular fallo del servidor con 10% de probabilidad
        if (simularFallo(10)) {
            throw new Error("Fallo del servidor al incrementar")
        }

        const product_id = Number(event.target.dataset.product_id)
        const product = findProductById(product_id)
        product.quantity = product.quantity + 1
        renderizarCarrito()

    } catch (error) {
        renderModal(
            "Fallo del servidor",
            "no has podido agregar el producto al carrito"
        )
    }
}

function decrementProductQuantity(event) {
    try {
        // Simular fallo del servidor con 30% de probabilidad
        if (simularFallo(30)) {
            throw new Error("Fallo del servidor al decrementar")
        }

        const product_id = Number(event.target.dataset.product_id)
        const product = findProductById(product_id)
        if (product.quantity <= 1) {
            deleteProductById(product_id)
        } else {
            product.quantity = product.quantity - 1
        }
        renderizarCarrito()

    } catch (error) {
        renderModal(
            "Fallo del servidor",
            "no has podido quitar el producto del carrito"
        )
    }
}

function handleDeleteProduct(event) {
    try {
        // Simular fallo del servidor con 80% de probabilidad
        if (simularFallo(80)) {
            throw new Error("Fallo del servidor al eliminar")
        }

        const product_id = Number(event.target.dataset.product_id)
        deleteProductById(product_id)

    } catch (error) {
        renderModal(
            "Fallo del servidor",
            "no has podido eliminar el producto del carrito"
        )
    }
}

function deleteProductById(product_id) {
    const product = findProductById(product_id)
    const product_index = cart.indexOf(product)
    if (product_index > -1) {
        cart.splice(product_index, 1)
    }
    renderizarCarrito()
}

function eliminarCarrito() {
    if(cart.length===0){
        return alert("Carrito vacio")
    }
    cart.length = 0
    renderizarCarrito()
}

function calcularTotal() {
    let total = 0
    for (const product of cart){
        const productoSubtotal = product.price * product.quantity
        total = total + productoSubtotal
    }

    precio_total.innerText = total
}

button_eliminar_carrito.addEventListener("click", eliminarCarrito)

// Renderizar carrito al cargar la página
renderizarCarrito()
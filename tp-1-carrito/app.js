// ========== ESTADOS DE LA APLICACIÓN ==========
let carrito = [];
let productos = [];
let cargandoProductos = false;
let errorServidor = null;

// ========== SETTERS (Modifican estado + llaman renders) ==========

function setCarrito(nuevoCarrito) {
    carrito = nuevoCarrito;
    renderCarrito();
    renderTotal();
    renderProducts(); // Para actualizar botones en productos
}

function setProductos(nuevosProductos) {
    productos = nuevosProductos;
    renderProducts();
}

function setCargandoProductos(valorBooleano) {
    cargandoProductos = valorBooleano;
    renderProducts();
}

function setErrorServidor(error) {
    errorServidor = error;
    renderError();
}

// ========== FUNCIONES AUXILIARES ==========

function encontrarProductoEnCarrito(productId) {
    return carrito.find(item => item.id === productId);
}

function encontrarProductoPorId(productId) {
    return productos.find(product => product.id === productId);
}

function calcularTotal() {
    return carrito.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// ========== FUNCIONES DEL CARRITO ==========

function agregarAlCarrito(productId) {
    const producto = encontrarProductoPorId(productId);
    if (!producto) return;

    const itemEnCarrito = encontrarProductoEnCarrito(productId);
    
    if (itemEnCarrito) {
        // Si ya está en el carrito, incrementar cantidad
        incrementarCantidad(productId);
    } else {
        // Si no está, agregarlo
        const nuevoItem = {
            id: producto.id,
            title: producto.title,
            price: producto.price,
            quantity: 1
        };
        setCarrito([...carrito, nuevoItem]);
    }
}

function quitarDelCarrito(productId) {
    const nuevoCarrito = carrito.filter(item => item.id !== productId);
    setCarrito(nuevoCarrito);
}

function incrementarCantidad(productId) {
    const producto = encontrarProductoPorId(productId);
    const itemEnCarrito = encontrarProductoEnCarrito(productId);
    
    if (!producto || !itemEnCarrito) return;
    
    // Verificar stock
    if (itemEnCarrito.quantity < producto.stock) {
        const nuevoCarrito = carrito.map(item => 
            item.id === productId 
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
        setCarrito(nuevoCarrito);
    }
}

function decrementarCantidad(productId) {
    const itemEnCarrito = encontrarProductoEnCarrito(productId);
    if (!itemEnCarrito) return;
    
    if (itemEnCarrito.quantity === 1) {
        // Si la cantidad es 1, eliminar del carrito
        quitarDelCarrito(productId);
    } else {
        // Si es mayor a 1, decrementar
        const nuevoCarrito = carrito.map(item => 
            item.id === productId 
                ? { ...item, quantity: item.quantity - 1 }
                : item
        );
        setCarrito(nuevoCarrito);
    }
}

function vaciarCarrito() {
    setCarrito([]);
}

function confirmarCarrito() {
    const total = calcularTotal();
    alert(`El total de tu compra es $${total.toFixed(2)}`);
    vaciarCarrito();
}

// ========== FUNCIONES DE RENDER ==========

function renderProducts() {
    const container = document.getElementById('products-container');
    
    if (cargandoProductos) {
        container.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                Cargando productos...
            </div>
        `;
        return;
    }
    
    if (productos.length === 0) {
        container.innerHTML = '<div class="loading">No hay productos disponibles</div>';
        return;
    }
    
    container.innerHTML = productos.map(product => {
        const itemEnCarrito = encontrarProductoEnCarrito(product.id);
        const enCarrito = !!itemEnCarrito;
        const cantidadEnCarrito = itemEnCarrito ? itemEnCarrito.quantity : 0;
        
        return `
            <div class="product-card">
                <img src="${product.thumbnail}" alt="${product.title}" class="product-image">
                <div class="product-title">${product.title}</div>
                <div class="product-price">$${product.price}</div>
                <div class="product-stock">Stock: ${product.stock}</div>
                
                <div class="product-controls">
                    ${enCarrito ? `
                        <div class="quantity-controls">
                            <button class="btn btn-small" onclick="decrementarCantidad(${product.id})">-</button>
                            <div class="quantity-display">${cantidadEnCarrito}</div>
                            <button class="btn btn-small" onclick="incrementarCantidad(${product.id})" 
                                    ${cantidadEnCarrito >= product.stock ? 'disabled' : ''}>+</button>
                        </div>
                        <button class="btn btn-danger" onclick="quitarDelCarrito(${product.id})">
                            Quitar del carrito
                        </button>
                    ` : `
                        <button class="btn btn-primary" onclick="agregarAlCarrito(${product.id})" 
                                ${product.stock === 0 ? 'disabled' : ''}>
                            ${product.stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
                        </button>
                    `}
                </div>
            </div>
        `;
    }).join('');
}

function renderCarrito() {
    const container = document.getElementById('cart-container');
    
    if (carrito.length === 0) {
        container.innerHTML = '<div class="cart-empty">Tu carrito está vacío</div>';
        return;
    }
    
    container.innerHTML = carrito.map(item => `
        <div class="cart-item">
            <div class="cart-item-title">${item.title}</div>
            <div class="cart-item-price">$${item.price} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}</div>
            <div class="cart-item-controls">
                <div class="quantity-controls">
                    <button class="btn btn-small" onclick="decrementarCantidad(${item.id})">-</button>
                    <div class="quantity-display">${item.quantity}</div>
                    <button class="btn btn-small" onclick="incrementarCantidad(${item.id})">+</button>
                </div>
                <button class="btn btn-danger" onclick="quitarDelCarrito(${item.id})">Quitar</button>
            </div>
        </div>
    `).join('');
}

function renderTotal() {
    const container = document.getElementById('total-container');
    
    if (carrito.length === 0) {
        container.innerHTML = '';
        return;
    }
    
    const total = calcularTotal();
    
    container.innerHTML = `
        <div class="cart-total">
            Total: $${total.toFixed(2)}
        </div>
        <div class="cart-actions">
            <button class="btn btn-confirm btn-large" onclick="confirmarCarrito()">
                Confirmar carrito
            </button>
            <button class="btn btn-danger btn-large" onclick="vaciarCarrito()">
                Vaciar carrito
            </button>
        </div>
    `;
}

function renderError() {
    const container = document.getElementById('error-container');
    
    if (!errorServidor) {
        container.innerHTML = '';
        return;
    }
    
    container.innerHTML = `
        <div class="error-message">
            ⚠️ Error: ${errorServidor}
        </div>
    `;
}

// ========== CONSUMO DE API ==========

async function cargarProductos() {
    try {
        setCargandoProductos(true);
        setErrorServidor(null);
        
        const response = await fetch('https://dummyjson.com/products');
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        setProductos(data.products);
        
    } catch (error) {
        console.error('Error al cargar productos:', error);
        setErrorServidor(`No se pudieron cargar los productos: ${error.message}`);
        setProductos([]);
    } finally {
        setCargandoProductos(false);
    }
}

// ========== INICIALIZACIÓN ==========

// Cargar productos al iniciar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    
    // Renderizar estado inicial
    renderCarrito();
    renderTotal();
    renderError();
});
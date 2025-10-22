  // Array del carrito con los productos
        let cart = [
            {
                id: 1,
                name: "Mouse gamer",
                unitPrice: 4000,
                quantity: 2
            },
            {
                id: 2,
                name: "Mouse gamer 2",
                unitPrice: 4000,
                quantity: 2
            }
        ];

        // Función para buscar producto por ID
        function findProductFromCartById(product_id) {
            return cart.find(product => product.id === product_id);
        }

        // Función para obtener el precio total
        function getTotalPrice() {
            return cart.reduce((total, product) => {
                return total + (product.unitPrice * product.quantity);
            }, 0);
        }

        // Función para eliminar producto por ID
        function deleteProductById(product_id) {
            cart = cart.filter(product => product.id !== product_id);
            renderCart();
        }

        // Función para incrementar cantidad del producto
        function incrementProductById(product_id) {
            const product = findProductFromCartById(product_id);
            if (product) {
                product.quantity++;
                renderCart();
            }
        }

        // Función para decrementar cantidad del producto
        function decrementProductById(product_id) {
            const product = findProductFromCartById(product_id);
            if (product) {
                if (product.quantity === 1) {
                    // Si la cantidad es 1, elimina el producto
                    deleteProductById(product_id);
                } else {
                    // Si es mayor a 1, decrementa la cantidad
                    product.quantity--;
                    renderCart();
                }
            }
        }

        // Función para vaciar el carrito
        function restartCart() {
            cart = [];
            renderCart();
        }

        // Event listeners usando delegación de eventos
        function setupEventListeners() {
            const cartContainer = document.getElementById('cartItems');
            const actionButton = document.getElementById('actionButton');

            // Event listener para el botón principal (borrar carrito / volver a tienda)
            actionButton.addEventListener('click', function() {
                if (cart.length === 0) {
                    // Si el carrito está vacío, simular ir a la tienda
                    alert('Redirigiendo a la tienda...');
                    // Aquí podrías agregar: window.location.href = '/tienda';
                } else {
                    // Si hay productos, borrar carrito
                    restartCart();
                }
            });

            // Delegación de eventos para los botones del carrito
            cartContainer.addEventListener('click', function(event) {
                const target = event.target;
                const productItem = target.closest('.product-item');
                
                if (!productItem) return;
                
                const productId = parseInt(productItem.dataset.id);

                if (target.classList.contains('btn-increment')) {
                    incrementProductById(productId);
                } else if (target.classList.contains('btn-decrement')) {
                    decrementProductById(productId);
                } else if (target.classList.contains('btn-remove')) {
                    deleteProductById(productId);
                }
            });
        }

        // Función para renderizar el carrito en el HTML
        function renderCart() {
            const cartContainer = document.getElementById('cartItems');
            const totalElement = document.getElementById('totalPrice');

            if (cart.length === 0) {
                cartContainer.innerHTML = '<div class="empty-cart">El carrito está vacío</div>';
                totalElement.textContent = 'Total: $0';
                return;
            }

            cartContainer.innerHTML = cart.map(product => {
                const totalPrice = product.unitPrice * product.quantity;
                return `
                    <div class="product-item" data-id="${product.id}">
                        <div class="product-name">${product.name}</div>
                        <div class="product-info">Precio unitario: ${product.unitPrice}</div>
                        <div class="product-info">Precio: ${totalPrice}</div>
                        <div class="controls">
                            <div class="quantity-controls">
                                <button class="btn-decrement">-</button>
                                <div class="quantity-display">${product.quantity}</div>
                                <button class="btn-increment">+</button>
                            </div>
                            <button class="btn-remove">Quitar</button>
                        </div>
                    </div>
                `;
            }).join('');

            totalElement.textContent = `Total: $${getTotalPrice()}`;
        }

        // Renderizar el carrito al cargar la página
        renderCart();

        // Configurar event listeners cuando se carga la página
        document.addEventListener('DOMContentLoaded', setupEventListeners);
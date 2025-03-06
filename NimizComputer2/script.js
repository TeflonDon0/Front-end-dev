document.addEventListener('DOMContentLoaded', function () {
    // --- Helper Functions ---
    function getCart() {
        return JSON.parse(localStorage.getItem('cart') || '[]');
    }

    function saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function updateCartDisplay() {
        let cart = getCart();
        let cartQuantity = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);

        const cartIcon = document.querySelector('.cart-icon');
        if (cartIcon) {
            cartIcon.innerHTML = `<i class="fas fa-shopping-cart"></i><span class="cart-count">${cartQuantity}</span>`;
        }

        // Update cart count on all pages
        document.querySelectorAll('.cart-count').forEach(el => el.textContent = cartQuantity);
    }

    // --- Add to Cart Functionality ---
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productId = this.dataset.productId;
            // -- Placeholder: Fetch product details from a database or product data --
            const productDetails = {
                id: productId,
                name: `Product ${productId}`,
                price: 99.99, // Example price
                image: `image${productId}.jpg` // Example image
            };

            let cart = getCart();
            // Check if the product is already in the cart
            const existingItemIndex = cart.findIndex(item => item.id === productId);

            if (existingItemIndex > -1) {
                // If it exists, increase the quantity
                cart[existingItemIndex].quantity += 1;
            } else {
                // If not, add it to the cart with quantity 1
                cart.push({ ...productDetails, quantity: 1 });
            }

            saveCart(cart);
            updateCartDisplay();
            alert(`Product ${productId} added to cart!`);
        });
    });

    // --- Search Functionality ---
    const searchIcon = document.querySelector('.search-icon');
    searchIcon.addEventListener('click', function () {
        const searchTerm = prompt('Enter search term:');
        if (searchTerm) {
            alert(`Searching for: ${searchTerm}`);
            // In a real application, you would perform the search and display results
        }
    });

    // --- Cart Icon Click ---
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', function () {
            window.location.href = 'cart.html';
        });
    } else {
        console.error('Cart icon element not found!');
    }

    // --- Cart Page Population ---
    if (window.location.pathname.includes('cart.html')) {
        populateCart();
    }

    function populateCart() {
        const cart = getCart();
        const cartItems = document.getElementById('cart-items');
        const cartTotalElement = document.getElementById('cart-total');
        let total = 0;

        if (!cartItems || !cartTotalElement) {
            console.error('Cart elements not found on cart.html');
            return;
        }

        if (cart.length === 0) {
            cartItems.innerHTML = '<p>Your cart is empty.</p>';
            cartTotalElement.innerHTML = '';
            return;
        }

        cartItems.innerHTML = ''; // Clear existing content

        cart.forEach((product, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px;">
                <span>${product.name}</span>
                <span>$${product.price} x ${product.quantity}</span>
                <span>$${(product.price * product.quantity).toFixed(2)}</span>
                <button class="remove-from-cart" data-index="${index}">Remove</button>
            `;
            cartItems.appendChild(itemDiv);
            total += product.price * product.quantity;
        });

        cartTotalElement.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;

        // --- Remove from Cart ---
        cartItems.addEventListener('click', function (event) {
            if (event.target.classList.contains('remove-from-cart')) {
                const index = event.target.dataset.index;
                removeFromCart(index);
            }
        });
    }

    function removeFromCart(index) {
        let cart = getCart();
        cart.splice(index, 1);
        saveCart(cart);
        populateCart(); // Repopulate the cart display
        updateCartDisplay(); // Update the cart display after removing
    }

    // --- Image Zoom Functionality ---
    document.querySelectorAll('.zoomable-image').forEach(img => {
        img.addEventListener('mousemove', function (e) {
            const zoomer = e.currentTarget;
            const x = (e.offsetX / zoomer.offsetWidth) * 100;
            const y = (e.offsetY / zoomer.offsetHeight) * 100;
            zoomer.style.backgroundPosition = x + '% ' + y + '%';
        });
    });

    // --- Lazy Loading ---
    let lazyImages = [].slice.call(document.querySelectorAll("img.lazy-load"));

    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove("lazy-load");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function (lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }

    // --- Initial Cart Display Update ---
    updateCartDisplay();
});

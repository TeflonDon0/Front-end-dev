document.addEventListener('DOMContentLoaded', function() {
    // Function to add to cart
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.productId;
            // Placeholder: In a real application, you would fetch product details (name, price, image) from a database or product data.
            const productDetails = {
                id: productId,
                name: `Product ${productId}`,
                price: 99.99, // Example price
                image: `image${productId}.jpg` // Example image
            };

            let cart = JSON.parse(localStorage.getItem('cart') || '[]');
            cart.push(productDetails);
            localStorage.setItem('cart', JSON.stringify(cart));

            updateCartDisplay(); // Update the cart display after adding
            alert(`Product ${productId} added to cart!`);
        });
    });

      // Function to add to wishlist
      const likeIcons = document.querySelectorAll('.like-icon');

    likeIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const productId = this.dataset.productId;
            let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

            // Check if the product is already in the wishlist
            const productIndex = wishlist.findIndex(item => item.id === productId);

            if (productIndex === -1) {
                // Product not in wishlist, add it
                wishlist.push({ id: productId });
                localStorage.setItem('wishlist', JSON.stringify(wishlist));
                alert(`Product ${productId} added to wishlist!`);
            } else {
                // Product already in wishlist, remove it
                wishlist.splice(productIndex, 1);
                localStorage.setItem('wishlist', JSON.stringify(wishlist));
                alert(`Product ${productId} removed from wishlist!`);
            }
        });
    });

    // Search functionality (basic placeholder)
    const searchIcon = document.querySelector('.search-icon');
    searchIcon.addEventListener('click', function() {
        alert('Search functionality is under development.');
    });

    // Cart icon click
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', function() {
            window.location.href = 'cart.html';
        });
    } else {
        console.error('Cart icon element not found!');
    }

   // Function to populate cart items on cart.html
    if (window.location.pathname.includes('cart.html')) {
        populateCart();
    }

    function populateCart() {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const cartList = document.getElementById('cart-list');
        const cartTotalElement = document.getElementById('cart-total');
        let total = 0;

        if (cart.length === 0) {
            cartList.innerHTML = '<p>Your cart is empty.</p>';
            cartTotalElement.innerHTML = '';
            return;
        }

        cartList.innerHTML = ''; // Clear existing content

        cart.forEach(product => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px;">
                <span>${product.name}</span>
                <span>$${product.price}</span>
                 <button class="remove-from-cart" data-product-id="${product.id}">Remove</button>
            `;
            cartList.appendChild(itemDiv);
            total += product.price;
        });

        cartTotalElement.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
          // Add event listeners to the "Remove" buttons
        const removeFromCartButtons = document.querySelectorAll('.remove-from-cart');
        removeFromCartButtons.forEach(button => {
            button.addEventListener('click', removeFromCart);
        });
    }

    function removeFromCart(event) {
        const productId = event.target.dataset.productId;
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        // Filter out the product to be removed
        cart = cart.filter(product => product.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        populateCart(); // Repopulate the cart display
        updateCartDisplay(); // Update the cart display after removing
    }

        function updateCartDisplay() {
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        let cartQuantity = cart.length; // Total number of items in the cart

        // Find the cart icon element and update its content
        const cartIcon = document.querySelector('.cart-icon');
        if (cartIcon) {
            cartIcon.innerHTML = `<i class="fas fa-shopping-cart"></i><span class="cart-count">${cartQuantity}</span>`;
        }
    }

          // Initial call to update cart display when the page loads
    updateCartDisplay();
});


document.querySelectorAll('.zoomable-image').forEach(img => {
    img.addEventListener('mousemove', function(e) {
        const zoomer = e.currentTarget;
        const x = (e.offsetX/zoomer.offsetWidth)*100;
        const y = (e.offsetY/zoomer.offsetHeight)*100;
        zoomer.style.backgroundPosition = x + '% ' + y + '%';
    });
});


document.addEventListener("DOMContentLoaded", function() {
    let lazyImages = [].slice.call(document.querySelectorAll("img.lazy-load"));
    
    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove("lazy-load");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }
});


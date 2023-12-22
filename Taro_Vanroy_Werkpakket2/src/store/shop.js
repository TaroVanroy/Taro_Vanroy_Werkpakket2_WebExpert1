import { defineStore } from 'pinia';

export const useShopStore = defineStore('shop', {
    state: () => ({
        products: [],
        cart: [],
        loggedInUser: null,
        users: [
            { username: "Taro Vanroy", password: "password1", address: "Elfdelinie-straat 11 Hasselt" },
            { username: "Robin Braibant", password: "password2", address: "placeholder1" },
        ],
    }),
    getters: {
        totalPrice(state) {
            const total = state.cart.reduce((totalPrice, item) => totalPrice + (item.quantity * (item.price + item.btw)), 0);
            return parseFloat(total.toFixed(2));
        },

        totalPriceNoBTW(state) {
            const total = state.cart.reduce((totalPrice, item) => totalPrice + (item.quantity * item.price), 0);
            return parseFloat(total.toFixed(2));
        },

        totalBTW(state) {
            const totalVAT = state.cart.reduce((totalBTW, item) => totalBTW + (item.quantity * item.btw), 0);
            return parseFloat(totalVAT.toFixed(2));
        },
        popularProducts(state) {
            return [...state.products].sort((a, b) => b.stock - a.stock).slice(0, 3);
        },
        isLoggedIn(state) {
            return !!state.loggedInUser;
        },
    },
    actions: {
        async fetchProducts() {
            try {
                const response = await fetch('src/assets/data.json');
                const data = await response.json();
                this.setProducts(data);
            } catch (error) {
                console.error('Error met producten op te halen:', error);
            }
        },

        setProducts(products) {
            this.products = products;
        },
        addToCart(product) {
            // Check if the product is out of stock
            if (product.stock === 0) {
                alert(`Sorry, ${product.name} is niet meer beschikbaar.`);
                return;
            }

            // Prompt the user for the quantity
            const quantityString = prompt(`Hoeveel van ${product.name} zou je willen toevoegen aan je winkelmandje?`, '1');
            const quantity = parseInt(quantityString);

            if (isNaN(quantity) || quantity <= 0) {
                alert('Voeg een geldige hoeveelheid toe.');
                return;
            }

            // Check if the requested quantity exceeds the available stock
            if (quantity > product.stock) {
                const availableQuantity = product.stock;

                const adjustedQuantityString = prompt(`Sorry, Er zijn maar${availableQuantity} units verkrijgbaar in stock. Hoeveel zou je er willen toevoegen aan je winkelmandje?`, '1');
                const adjustedQuantity = parseInt(adjustedQuantityString);

                if (isNaN(adjustedQuantity) || adjustedQuantity <= 0) {
                    alert('Voeg een geldige hoeveelheid toe.');
                    return;
                }

                // Adjust quantity based on available stock
                this.cart.push({ ...product, quantity: adjustedQuantity });

                // Update the stock in the products array
                product.stock -= adjustedQuantity;

                // Display success message after adding the product to the cart
                alert('Product toegevoegd aan winkelmandje!');
            } else {
                const isProductInCart = this.cart.some(item => item.id === product.id);

                if (isProductInCart) {
                    const existingProduct = this.cart.find(item => item.id === product.id);

                    // Check if the new quantity exceeds the available stock
                    if (existingProduct.quantity + quantity > existingProduct.stock) {
                        alert(`Sorry, Er zijn maar ${existingProduct.stock} units verkrijgbaar in stock.`);
                        return;
                    }

                    existingProduct.quantity += quantity;
                } else {
                    this.cart.push({ ...product, quantity });

                    // Update the stock in the products array
                    product.stock -= quantity;
                }

                // Display success message after adding the product to the cart
                alert('Product toegevoegd aan winkelmandje!');
            }
        },
        removeItemFromCart(productId) {
            const index = this.cart.findIndex(item => item.id === productId);
            if (index !== -1) {
                const removedProduct = this.cart[index];
                this.cart.splice(index, 1);

                // Restore stock when removing item from the cart
                const originalProduct = this.products.find(product => product.id === removedProduct.id);
                if (originalProduct) {
                    originalProduct.stock += removedProduct.quantity;
                }
            }
        },
        incrementItemQuantity(productId) {
            const product = this.cart.find(item => item.id === productId);

            if (product) {
                // Check if incrementing the quantity exceeds the available stock
                if (product.quantity + 1 > product.stock) {
                    alert(`Sorry, there are only ${product.stock} units available in stock.`);
                    return;
                }

                product.quantity += 1;
                product.stock -= 1;
            }
        },

        decrementItemQuantity(productId) {
            const product = this.cart.find(item => item.id === productId);

            if (product && product.quantity > 1) {
                product.quantity -= 1;
                product.stock += 1;
            }
        },
        setLoggedInUser(user) {
            this.loggedInUser = user;
        },
        checkout() {
            if (this.isLoggedIn) {
                console.log('Checkout successful!');
            } else {
                alert('Please log in to proceed with checkout.');

            }
        },
    },
});

export const useCheckoutStore = defineStore('checkout', {
    state: () => ({
        shippingAddress: '',
        useDifferentBilling: false,
    }),
    actions: {
        updateShippingAddress(address) {
            this.shippingAddress = address;
        },
    }
});



<template>
  <div class="cart-container">
    <h2>{{ titel }}</h2>
    <ul class="cart-items">
      <li v-for="item in cart" :key="item.id" class="cart-item">
        <div class="cart-item-info">
          <img :src="item.image" alt="Product Image" class="cart-item-image" />
          <div class="cart-item-details">
            <p>{{ item.name }}</p>
            <br />
            <p>{{ item.description }}</p>
            <br />
            <p>{{ geenBTW }} {{ item.price }}€</p>
            <br />
            <p>{{ totaalprijs }} {{ item.price_with_tax }}€</p>
            <br />
            <p class="item-quantity">{{hoeveelheid}} {{ item.quantity }}</p>

            <div class="quantity-buttons">
              <button @click="incrementQuantity(item.id)">{{plus}}</button>
              <button @click="decrementQuantity(item.id)">{{min}}</button>
            </div>
            <br />
            <button @click="removeFromCart(item.id)">{{button1}}</button>
          </div>
        </div>
      </li>
    </ul>

    <button v-if="cart.length > 0" @click="checkout" class="checkout-button">{{button2}}</button>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useShopStore } from '@/store/shop.js';
import router from "@/router";

export default {
  setup() {
    const shopStore = useShopStore();
    const cart = computed(() => shopStore.cart);

    const removeFromCart = (productId) => {
      shopStore.removeItemFromCart(productId);
    };

    const incrementQuantity = (productId) => {
      shopStore.incrementItemQuantity(productId);
    };

    const decrementQuantity = (productId) => {
      shopStore.decrementItemQuantity(productId);
    };

    const checkout = () => {
      if (!shopStore.isLoggedIn) {
        router.push('/login');
      } else {
        router.push('/Checkout');
      }
    };

    return {
      cart,
      removeFromCart,
      incrementQuantity,
      decrementQuantity,
      checkout,
      "titel": "Uw winkelmandje:",
      "geenBTW": "Prijs zonder btw: ",
      "totaalprijs": "Prijs met btw: ",
      "hoeveelheid": "Hoeveelheid: ",
      "plus": "+",
      "min": "-",
      "button1": "Verwijder",
      "button2": "Checkout"

    };
  },
};
</script>

<style scoped>
.cart-container {
  margin-top: 5rem;
  margin-left: 25%;
  margin-right: 25%;
}

.cart-container h2
{
  color: #718CFE;
  text-align: center;
}

.cart-items {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.cart-item {
  border: 5px solid rgb(188, 91, 237);
  padding: 1rem;
  margin-bottom: 1rem;
  width: calc(33.33% - 2rem);
  box-sizing: border-box;
}

.cart-item-info {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.cart-item-image {
  width: 200px; /* Ensure the image takes full width within the container */
  height: auto;
}

.cart-item-details {
  text-align: center;
}

.item-quantity {
  font-weight: bold;
  margin: 0.5rem 0;
}

.quantity-buttons button {
  background-color: #718CFE;
  color: #ffffff;
  border: none;
  padding: 0.5rem;
  margin: 0 0.2rem;
  cursor: pointer;
}

.checkout-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #718CFE;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

@media screen and (max-width: 600px)
{
  .cart-item {

    width: 100%;
  }

  .cart-container {
    margin-top: 5rem;
    padding-bottom: 3rem;
  }

  .cart-container h2
  {
    color: #718CFE;
    padding-bottom: 2rem;
    text-align: center;
  }

  .checkout-button {
 margin-left: 27%;
    margin-right: 27%;
  }


}


</style>

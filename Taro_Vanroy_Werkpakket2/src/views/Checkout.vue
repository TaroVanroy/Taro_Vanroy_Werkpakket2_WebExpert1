<template>
  <div class="checkout-container">
    <h2>{{ hoofdtitel }}</h2>

    <div class="shipping-info">
      <h3>{{ adres1 }}</h3><br>
      <label for="shippingAddress">{{ adres3 }}</label>
      <input v-model="shippingAddress" type="text" id="shippingAddress" />
      <br /><br>
      <label>
        <input type="checkbox" v-model="useDifferentBilling" />
        {{ adres2 }}<br>
      </label><br>

      <form v-if="useDifferentBilling">
        <label for="billingAddress">{{ adres4 }}</label>
        <input type="text" v-model="billingAddress" />
      </form><br>
    </div>

    <div class="order-summary">
      <h3>{{ titel2 }}</h3>
      <ul>
        <li v-for="item in cart" :key="item.id">
          {{ item.name }} - {{ item.quantity }} x {{ item.price }}
        </li>
      </ul>
      <br />
      <p>{{ extraBTW }} {{ totalBTW }}{{ euroteken }}</p>
      <br />
      <p>{{ Totaleprijs }} {{ totalPrice }}{{ euroteken }}</p>
    </div>

    <form @submit.prevent="completeCheckout">
      <button type="submit">{{ button }}</button>
    </form>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useShopStore, useCheckoutStore } from '@/store/shop.js';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const checkoutStore = useCheckoutStore();
    const shopStore = useShopStore();
    const router = useRouter();

    const { cart, totalPrice, totalBTW } = shopStore;

    // Set initial values for shippingAddress and useDifferentBilling
    const shippingAddress = ref(checkoutStore.shippingAddress || (shopStore.isLoggedIn ? shopStore.loggedInUser.address : ''));
    const useDifferentBilling = ref(checkoutStore.useDifferentBilling);
    const billingAddress = ref(checkoutStore.billingAddress || '');

    const completeCheckout = () => {
      checkoutStore.updateShippingAddress(shippingAddress.value);
      // Additional logic for completing the checkout process

      // Navigate to the confirmation page
      router.push('/Bevestiging');
    };

    return {
      shippingAddress,
      useDifferentBilling,
      billingAddress,
      completeCheckout,
      cart,
      totalPrice,
      totalBTW,
      "hoofdtitel": "Checkout",
      "adres1": "Leveringsadres: ",
      "adres2": "Gebruik ander adres: ",
      "adres3": "adres: ",
      "adres4": "ander adres: ",
      "titel2": "Bestelling oplijsting: ",
      "extraBTW": "BTW: ",
      "Totaleprijs": "Totale prijs + BTW: ",
      "euroteken": "€",
      "button": "Bestel producten"
    };
  },
});
</script>

<style scoped>
.checkout-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 800px;
  text-align: center;
  color: #718cfe;
  margin: 8rem auto 0;
}

.shipping-info,
.order-summary {
  width: 100%;
  margin-bottom: 20px;
}

.order-summary ul {
  padding: 0;
  list-style: none;
}

button {
  width: 15rem;
  height: 3rem;
  color: white;
  background: rgb(188, 91, 237);
  background: linear-gradient(270deg, rgba(188, 91, 237, 1) 0%, rgba(112, 141, 255, 1) 100%, rgba(2, 0, 36, 1) 202124%);
  border: 0;
  border-radius: 10px;
  font-size: 20px;
  font-weight: bold;
}
</style>

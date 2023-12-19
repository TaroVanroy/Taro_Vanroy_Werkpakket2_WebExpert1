<script>
import { defineComponent } from 'vue';
import { useShopStore, useCheckoutStore } from '@/store/shop.js';

export default defineComponent({
  setup() {
    const checkoutStore = useCheckoutStore();
    const shopStore = useShopStore();

    const { cart, totalPrice, totalBTW } = shopStore;

    const shippingAddress = checkoutStore.shippingAddress;
    const useDifferentBilling = checkoutStore.useDifferentBilling;
    const billingAddress = useDifferentBilling ? checkoutStore.billingAddress : '';

    return {
      shippingAddress,
      billingAddress,
      cart,
      totalPrice,
      totalBTW,
      useDifferentBilling,
      "titel1": "Bevestiging van bestelling",
      "titel2": "Leveringsadres",
      "titel3": "Betalingsadres",
      "titel4": "Bestelling oplijsting: ",
      "extraBTW": "BTW: ",
      "Totaleprijs": "Totale prijs + BTW: ",
      "euroteken": "€",
      "melding": "Bedankt voor uw aankoop!",
      "button": "terug naar home pagina"
    };
  },
});
</script>
<template>
  <div class="confirmation-container">
    <h2>{{titel1}}</h2>
    <br>


    <div class="order-summary">
      <h3>{{titel4}}</h3><br>
      <ul>
        <li v-for="item in cart" :key="item.id">
          {{ item.name }} - {{ item.quantity }} x {{ item.price }}
        </li>
      </ul>
      <br />
      <p>{{extraBTW}} {{ totalBTW }}{{euroteken}}</p>
      <br />
      <p>{{Totaleprijs}} {{ totalPrice }}{{euroteken}}</p>
    </div>
<br>
    <p class="confirmation-message">{{ melding }}</p>
    <router-link to="/" class="back-to-home">{{ button }}</router-link>
  </div>
</template>

<style scoped>
.confirmation-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 800px;
  text-align: center;
  color: #718cfe;
  margin: 8rem auto 0;
}



.order-summary ul {
  padding: 0;
  list-style: none;
}

.confirmation-message {
  font-size: 1.2rem;
  font-weight: bold;
  color: #4caf50;
}

.back-to-home {
  margin-top: 20px;
  color: #3498db;
  text-decoration: none;
  font-weight: bold;
  font-size: 1rem;
}

</style>

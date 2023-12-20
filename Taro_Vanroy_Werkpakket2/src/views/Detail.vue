<template>
  <div class="detail-container" v-if="product"><div class="links">
    <img v-if="product.image" :src="`/${product.image}`" alt="Product Image" class="product-image" />
  </div>
    <div class="rechts">
      <h2>{{ product.name }}</h2>
      <p class="description">{{ product.description }}</p><br>
      <p class="price">{{ prijs }} {{ product.price ? product.price.toFixed(2) : 'N/A' }}</p>
      <p class="price-with-tax">{{ prijsBTW }}{{ product.price_with_tax ? product.price_with_tax.toFixed(2) : 'N/A' }}</p>
      <p class="stock">{{ Stock }} {{ product.stock }}</p><br>
      <p class="creator">{{ Bedrijf }} {{ product.creator }}</p>
      <p class="release-year">{{ Jaar }} {{ product.release_year }}</p><br>
      <button @click="addToCart(product)" class="add-to-cart-button" id="button2">{{ Button1 }}</button>
    </div>
  </div>
  <div v-else>
    <p>{{ Error }}</p>
  </div>
</template>

<script>
import { useShopStore } from '@/store/shop.js';
import jsonData from "@/assets/data.json";

export default {
  props: {
    id: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      product: null,
      "prijs": "Prijs: ",
      "prijsBTW": "Prijs + BTW: ",
      "Stock": "Stock: ",
      "Bedrijf": "Bedrijf: ",
      "Jaar": "Jaar van uitkomst: ",
      "Button1": "Toevoegen aan winkelmandje",
      "Button2": "Terug",
      "Error": "Error: Product not found."


    };
  },
  async created() {
    await this.fetchProductData();
  },
  methods: {
    async fetchProductData() {
      try {
        const productId = String(this.id);
        const allProducts = jsonData;

        this.product = allProducts.find(product => String(product.id) === productId);

        if (!this.product) {
          console.error(`Product not found for id: ${productId}`);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    addToCart(product) {
      useShopStore().addToCart(product);
    },
  },
  watch: {},
  beforeRouteUpdate(to, from, next) {
    // Call fetchProductData when the route is updated
    this.fetchProductData().then(next);
  },
};
</script>

<style>
.detail-container
{
  display: flex;
  flex-direction: row;
}

.links
{
  width: 30%;
}

.links img
{
  width: 500px;
  height: auto;
  margin-top: 6rem;
  margin-left: 10rem;
}

.rechts
{
  width: 70%;
  color: #718CFE;
  margin-top: 9rem;
  margin-left: 15rem;
  font-size: 26px;
}

#button2
{
  width: 12rem;
  font-size: 16px;
}


@media screen and (max-width: 600px) {

  .detail-container
  {
    flex-direction: column;
  }

  .links img
  {
    width: 250px;
    height: auto;
    margin-left: 60%;
    margin-top: 2rem;
  }

  .rechts
  {
    margin-left: 15%;
    text-align: center;
    padding-bottom: 5rem;
    margin-top: 2rem;

  }
}

</style>

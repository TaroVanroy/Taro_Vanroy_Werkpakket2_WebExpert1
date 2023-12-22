<script>
import jsonData from "@/assets/data.json";
import { useShopStore } from '@/store/shop.js';


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
      "btw": "BTW: ",
       "prijsbtw": "prijs + btw: ",
      "Stock": "Stock: ",
      "Bedrijf": "Bedrijf: ",
      "Jaar": "Jaar van uitkomst: ",
      "Button1": "Toevoegen aan winkelmandje",
      "Button2": "Terug",
      "Error": "Error: Product not found.",
      "euroteken": "€"
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
    getStockText(stock) {
      return `Stock: ${stock}`;
    },
  },
  watch: {},
  beforeRouteUpdate(to, from, next) {
    // Call fetchProductData when the route is updated
    this.fetchProductData().then(next);
  },
};
</script>

<template>
  <div class="detail-container" v-if="product"><div class="links">
    <img v-if="product.image" :src="`/${product.image}`" alt="Product Image" class="product-image" />
  </div>
    <div class="rechts">
      <h2>{{ product.name }}</h2>
      <p class="description">{{ product.description }}</p><br>
      <p class="price">{{ prijs }} {{ euroteken }}{{ product.price ? product.price.toFixed(2) : 'N/A' }}</p>
      <p class="tax">{{ btw }}{{ euroteken }}{{ product.btw ? product.btw.toFixed(2) : 'N/A' }}</p>
      <p class="prijsbtw">{{ prijsbtw }}{{ euroteken }}{{ (product.price + product.btw).toFixed(2) }}</p>
      <p class="stock">{{ getStockText(product.stock) }}</p><br>
      <p class="creator">{{ Bedrijf }} {{ product.creator }}</p>
      <p class="release-year">{{ Jaar }} {{ product.release_year }}</p><br>
      <button @click="addToCart(product)" class="add-to-cart-button" id="button2">{{ Button1 }}</button>
    </div>
  </div>
  <div v-else>
    <p>{{ Error }}</p>
  </div>
</template>

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

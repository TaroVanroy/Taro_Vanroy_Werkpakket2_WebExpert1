<script>
import { ref, onMounted } from 'vue';
import { useShopStore } from '@/store/shop.js';

export default {
  setup() {
    const shopStore = useShopStore();
    const popularProducts = ref([]);

    // Define getStockText within the setup function
    const getStockText = (stock) => {
      return stock > 0 ? `In Stock: ${stock}` : 'Out of Stock';
    };

    onMounted(async () => {
      // Fetch popular products when the component is mounted
      await shopStore.fetchProducts();
      popularProducts.value = shopStore.popularProducts;
    });

      return {
      popularProducts,
      getStockText,
      "titel1": "Popular Products",
        "knop": "Add to cart"
    };

  },
  methods: {
    addToCart(product)
    {
      useShopStore().addToCart(product);
    }
  },
};
</script>

<template>
  <div>
    <h1>{{ titel1 }}</h1>
    <ul class="product-list">
      <li v-for="product in popularProducts" :key="product.id" class="product-item">
        <div class="product-info">
          <router-link :to="{ name: 'product-detail', params: { id: product.id } }">
            <img :src="product.image" alt="Product Image" class="product-image" /></router-link>
          <div class="product-details">
            <p>{{ product.name }}</p>
            <p class="stock">{{ getStockText(product.stock) }}</p>
            <button @click="addToCart(product)" class="add-to-cart-button">{{ knop }}</button>

          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style>

.product-list {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: space-evenly;
  margin-top: 6rem;
}

.product-item {
  margin-right: 10px;
}

.product-info {
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
}

.product-image {
  width: 300px;
  height: 300px;
  border: 5px solid #B95CED;
  border-radius: 5px;
  padding: 15px;
}

.product-details {
  max-width: 150px;
  padding-top: 1.5rem;
  color: #718CFE;
  font-weight: bold;
  font-size: 20px;
}

.stock
{
  padding-top: 1rem;
}

@media screen and (max-width: 600px) {
  .product-list {
    list-style: none;
   margin-left: 50%;
    margin-right: 50%;
    display: flex;
    justify-content: space-evenly;
    margin-top: 6rem;
    flex-direction: column;

  }

  .product-item {
  }

}

</style>

<script>
import jsonData from "@/assets/data.json";
import { useShopStore } from '@/store/shop.js';


export default {
  data() {
    return {
      products: jsonData,
      filteredProducts: jsonData,
      itemsPerPage: 8,
      currentPage: 1,
      checkedFilters: {
        yearFilter1980to1990: false,
        yearFilter1990to2000: false,
        yearFilter2000plus: false,
        companyFilterNintendo: false,
        companyFilterSega: false,
        companyFilterSony: false,
        companyFilterOther: false,
      },
      "titel1": "Jaar van uitgave",
      "titel2": "Bedrijf",
      "filter1": "1980-1990",
      "filter2": "1990-2000",
      "filter3": "2000+",
      "filter4": "Nintendo",
      "filter5": "Sega",
      "filter6": "Sony",
      "filter7": "Andere",
      "button1": "Add to cart",
      "button2": "Terug",
      "button3": "Volgende",
    };
  },
  computed: {
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      const sortedProducts = [...this.filteredProducts].sort((a, b) => a.id - b.id);
      return sortedProducts.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    },
  },
  watch: {
    checkedFilters: {
      handler: "applyFilters",
      deep: true,
      immediate: true,
    },
  },
  methods: {
    getStockText(stock) {
      return `Stock: ${stock}`;
    },

    goToPage(pageNumber) {
      this.currentPage = pageNumber;
    },

    filterByReleaseYear(minYear, maxYear) {
      this.checkedFilters.yearFilter1980to1990 = minYear === 1980 && maxYear === 1990;
      this.checkedFilters.yearFilter1990to2000 = minYear === 1990 && maxYear === 2000;
      this.checkedFilters.yearFilter2000plus = minYear === 2000 && maxYear === Infinity;
    },
    filterByCompany(company) {
      this.checkedFilters.companyFilterNintendo = company === 'Nintendo';
      this.checkedFilters.companyFilterSega = company === 'Sega';
      this.checkedFilters.companyFilterSony = company === 'Sony';
      this.checkedFilters.companyFilterOther = company === 'Other';
    },
    applyFilters() {
      this.filteredProducts = this.products.filter(product => {

        const meetsYearFilter = (
            (!this.checkedFilters.yearFilter1980to1990 || (product.release_year >= 1980 && product.release_year <= 1990)) &&
            (!this.checkedFilters.yearFilter1990to2000 || (product.release_year > 1990 && product.release_year <= 2000)) &&
            (!this.checkedFilters.yearFilter2000plus || product.release_year > 2000)
        );

        const meetsCompanyFilter = (
            (!this.checkedFilters.companyFilterNintendo || product.creator === 'Nintendo') &&
            (!this.checkedFilters.companyFilterSega || product.creator === 'Sega') &&
            (!this.checkedFilters.companyFilterSony || product.creator === 'Sony') &&
            (!this.checkedFilters.companyFilterOther || !['Nintendo', 'Sega', 'Sony'].includes(product.creator))
        );

        return meetsYearFilter && meetsCompanyFilter;
      });

      this.currentPage = 1;
    },
    addToCart(product) {

      useShopStore().addToCart(product);
    },


  }
};
</script>

<template>
  <div class="page-container">
    <div class="filter-container">
      <div class="filter-section">
        <h2>{{ titel1 }}</h2>
        <label>
          <input type="checkbox" v-model="checkedFilters.yearFilter1980to1990" />
          {{ filter1 }}
        </label>
        <label>
          <input type="checkbox"  v-model="checkedFilters.yearFilter1990to2000" />
          {{ filter2 }}
        </label>
        <label>
          <input type="checkbox"  v-model="checkedFilters.yearFilter2000plus"  />
          {{ filter3 }}
        </label>
      </div>
      <div class="filter-section">
        <h2>{{ titel2 }}</h2>
        <label>
          <input type="checkbox"  v-model="checkedFilters.companyFilterNintendo" />
          {{ filter4 }}
        </label>
        <label>
          <input type="checkbox"  v-model="checkedFilters.companyFilterSega"  />
          {{ filter5 }}
        </label>
        <label>
          <input type="checkbox" v-model="checkedFilters.companyFilterSony"  />
          {{ filter6 }}
        </label>
        <label>
          <input type="checkbox"  v-model="checkedFilters.companyFilterOther"  />
          {{ filter7 }}
        </label>
      </div>
    </div>
    <div class="product-container">
      <ul class="product-lijst">
        <li v-for="(product) in paginatedProducts" :key="product.id" class="product-item">
          <div class="product-info">
            <router-link :to="{ name: 'product-detail', params: { id: product.id } }">
              <img :src="product.image" alt="Product Image" class="productt-image"/></router-link>
            <div class="product-details">
              <p>{{ product.name }}</p>
              <p class="stock">{{ getStockText(product.stock) }}</p>
              <p class="price">${{ product.price.toFixed(2) }}</p>
              <button @click="addToCart(product)" class="add-to-cart-button">{{ button1 }}</button>
            </div>
          </div>
        </li>
      </ul>
      <div class="page-numbers">
        <button v-for="pageNumber in totalPages" :key="pageNumber" @click="goToPage(pageNumber)" :class="{ active: pageNumber === currentPage }">
          {{ pageNumber }}
        </button></div>
    </div>
  </div>

</template>

<style>
.page-container {
  display: flex;
}

.filter-container {
  width: 40%;
  margin-top: 300px;
}

.filter-section {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  color: #718cfe;
  margin-left: 175px;
  font-size: 30px;
}

.product-container {
  width: 60%;
  padding-left: 20px;
}

.page-numbers
{
  margin-left: 18rem;
  margin-top: 2rem;
}

.page-numbers button
{
  width: 50px;
  height: 50px;
  color: white;
  background: rgb(188, 91, 237);
  background: linear-gradient(270deg, rgba(188, 91, 237, 1) 0%, rgba(112, 141, 255, 1) 100%, rgba(2, 0, 36, 1) 202124%);
  border: 0;
  border-radius: 10px;
  margin: 2rem;

}

.product-lijst {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 columns */
  gap: 20px; /* Adjust the gap between products as needed */
  margin-top: 3rem;
}

.product-item {
  width: 48%;
  margin-bottom: 20px;
}

.product-info {
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
}

.productt-image {
  width: 150px;
  height: 150px;
  border: 5px solid #b95ced;
  border-radius: 5px;
  padding: 15px;
}

.product-details {
  max-width: 200px;
  padding-top: 1.5rem;
  color: #718cfe;
  font-weight: bold;
  font-size: 20px;
}

.stock {
  padding-top: 1rem;
}




.add-to-cart-button
{
  width: 8rem;
  height: 3rem;
  color: white;
  background: rgb(188, 91, 237);
  background: linear-gradient(270deg, rgba(188, 91, 237, 1) 0%, rgba(112, 141, 255, 1) 100%, rgba(2, 0, 36, 1) 202124%);
  border: 0;
  border-radius: 10px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
}

@media screen and (max-width: 600px)
{
  .filter-container {
    width: 100%;
    margin-top: 50px;
    margin-left: -85px;
    text-align: center;
  }

  .filter-section
  {
    font-size: 25px;
  }

  .product-container
  {
    width: 70%;
    margin-left: 30%;

  }

  .page-container {
    display: flex;
    flex-direction: column;
  }





  .pagination-buttons button
  {
    margin-top: 16px;
    margin-left: -40%;
  }

}
</style>

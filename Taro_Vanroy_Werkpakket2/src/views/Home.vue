<script>
import { onMounted } from 'vue';
import { useShopStore } from '@/store/shop.js';
import PopularProducts from "@/components/PopularProductsComponent.vue";
import Footer from "@/components/FooterComponent.vue";

export default {
  setup() {
    const shopStore = useShopStore();

    const teksten = {
      "Hoofdtitel": "Retro consoles",
      "Tekst": "Bij ons kan je retro consoles kopen aan de hoogste kwaliteit " +
          "voor de meest betaalbare prijs. Van de Gameboy color tot " +
          "de Nintendo DS hebben we het allemaal hier!",
      "Tussentitel": "Retro consoles in de kijker!",
      "Buttontext": "Bekijk meer"
    };

    onMounted(async () => {
      // Fetch products when the component is mounted
      await shopStore.fetchProducts();
    });

    return {
      teksten,
      shopStore,
    };
  },
  components: {
    PopularProducts,
    Footer
  }
}
</script>

<template>
  <div>
    <div id="introductie">
      <img src="@/assets/vector.png" alt="logo">
      <h1>{{ teksten.Hoofdtitel }}</h1>
      <p>{{ teksten.Tekst }}</p>
    </div>

    <h2 class="tussentitel">{{ teksten.Tussentitel }}</h2>

    <PopularProducts />

    <div class="meer">
      <router-link to="/Webshop"><p>{{ teksten.Buttontext }}</p></router-link>
    </div>

    <Footer />
  </div>
</template>
<style>

*
{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#introductie {

  width: 90%;
  height: 600px;
  background: rgb(188, 91, 237);
  background: linear-gradient(270deg, rgba(188, 91, 237, 1) 0%, rgba(112, 141, 255, 1) 100%, rgba(2, 0, 36, 1) 202124%);
  border-radius: 100px;
  margin-left: 5rem;
  margin-top: 2.5rem;
  color: #fff;
}
#introductie img
{
  width: 412px;
  height: 343px;
  margin-left: 5rem;
  margin-top: 7rem;
}

#introductie h1
{
  font-size: 75px;
  float: right;
  padding-right: 15.5rem;
  padding-top: 11rem;
}

#introductie p
{
  font-size: 25px;
  float: right;
  padding-right: 9.5rem;
  margin-top: -11rem;
  width: 50%;
}

.tussentitel
{
  text-align: center;
  color: #718CFE;
  margin-top: 7rem;
  text-decoration: underline;
  font-size: 50px;
}

#PopulaireProducten h1
{
  text-align: center;
  color: #718CFE;
  font-size: 40px;
  margin-top: 10rem;
}



.meer {
  background: rgb(188, 91, 237);
  background: linear-gradient(270deg, rgba(188, 91, 237, 1) 0%, rgba(112, 141, 255, 1) 100%, rgba(2, 0, 36, 1) 202124%);
  font-family: inter, 'sans-serif';
  border: 0;
  width: 10rem;
  height: 3rem;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5rem;
  border-radius: 5px;
}

.meer a
{
  text-decoration: none;
}

.meer a p {

  font-weight: bold;
  color: #fff;
  font-size: 20px;
  text-align: center;
  padding-top: 11px;
}



@media screen and (min-width: 2100px)
{
  #introductie {
    width: 50%;
    margin-left: 25%;
    margin-right: 25%;
  }
}

@media screen and (max-width: 600px) {
  #introductie {
    width: 90%;
    height: auto;
    border-radius: 15px;
    padding: 2rem;
    margin-left: 5%;

  }

  #introductie img {
    width: 100%;
    height: auto;
    margin: 0;
  }

  #introductie h1, #introductie p {
    font-size: 18px;
    float: none;
    padding: 0;
    margin-top: 2rem;
    width: 100%;
    text-align: left;
  }

  .tussentitel {
    font-size: 20px;
    margin-top: 2rem;
  }



}
</style>
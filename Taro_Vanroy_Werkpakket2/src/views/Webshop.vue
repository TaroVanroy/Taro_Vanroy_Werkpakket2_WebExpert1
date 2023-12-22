<script>

import {defineComponent} from "vue";
import Footer from "@/components/FooterComponent.vue";
import ProductCard from "@/components/ProductCardComponent.vue";

export default defineComponent({

  data() {
    return {
      "hoofdtitel": "Mijn Webshop",
      "inleiding": "Bij ons kan je retro consoles kopen aan de" +
          "           hoogste kwaliteit voor de meest betaalbare prijs."+
          "           Van de Gameboy color tot de nintendo DS,"+
          "           we hebben het allemaal hier!",
      "tussentitel": "Alle producten die wij aanbieden"
    }
  },
  components: {Footer, ProductCard}
})
</script>

<template>
  <div id="webshop">
    <img src="@/assets/vector.png" alt="logo">
    <h1>{{hoofdtitel}}</h1>
    <p>{{inleiding}}</p>
  </div>

  <h2 class="tussentitel">{{tussentitel}}</h2>

<ProductCard/>

  <Footer/>
</template>

<style>

#webshop {

  width: 90%;
  height: 600px;
  background: rgb(188, 91, 237);
  background: linear-gradient(270deg, rgba(188, 91, 237, 1) 0%, rgba(112, 141, 255, 1) 100%, rgba(2, 0, 36, 1) 202124%);
  border-radius: 100px;
  margin-left: 5rem;
  margin-top: 2.5rem;
  color: #fff;
}
#webshop img
{
  width: 412px;
  height: 343px;
  margin-right: 9rem;
  margin-top: 7rem;
  float: right;
}



#webshop h1
{
  font-size: 75px;
  float: left;
  padding-left: 10.6rem;
  padding-top: 11rem;
}

#webshop p
{
  font-size: 25px;
  float: left;
  padding-left: 11rem;
  margin-top: 2rem;
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

@media screen and (min-width: 2000px)
{
  #webshop {
    width: 50%;
    margin-left: 25%;
    margin-right: 25%;
  }
}

@media screen and (max-width: 600px)
{
  #webshop {
    width: 90%;
    height: auto;
    border-radius: 15px;
    padding: 2rem;
    margin-left: 5%;
  }

  #webshop img {
    width: 100%;
    height: auto;
    margin: 0;
  }

  #webshop h1  {
    font-size: 18px;
    padding: 0;
    margin-top: 2rem;
    width: 100%;
    text-align: left;
  }

  #webshop p  {
    font-size: 18px;
    float: none;
    width: 100%;
    text-align: left;
    padding-left: 0;
  }

  .tussentitel
  {
    font-size: 35px;
  }


}

</style>
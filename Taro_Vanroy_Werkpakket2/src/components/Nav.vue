<script>


export default {
  data() {
    return {



      navItems: [
        { path: "/", name: "Home", display: true },
        { path: "/Webshop", name: "Webshop", display: true },
        { path: "/Cart", name: "Cart", display: true },
        { path: "/Detail", name: "Detail", display: false },
        { path: "/Checkout", name: "Checkout", display: false },
        { path: "/Login", name: "Account", display: true },
        { path: "/Bevestiging", name: "Bevestiging", display: false },
      ],


    };
  },
  computed: {
    filteredNavItems() {
      return this.navItems.filter(item => item.display);
    },
  },
};
</script>

<template>
  <nav class="navigatie">
    <ul>
      <li v-for="navItem in filteredNavItems" :key="navItem.path">
        <router-link :to="navItem.path">{{ navItem.name }}</router-link>
      </li>
    </ul>
  </nav>
</template>



<style>



.navigatie {
  padding-top: 1rem;
  text-align: right;
  background-color: #718cfe;
  height: 3.5rem;
  width: 100%;

}

.navigatie li {
  display: inline;
  padding: 2rem;
}

.navigatie li a {
  text-decoration: none;
  color: white;
  font-size: 20px;
  font-family: inter, 'sans-serif';
  font-weight: bold;
}

.navigatie button {
  width: 7rem;
  height: 2.5rem;
  border-radius: 5px;
  font-family: inter, 'sans-serif';
  font-weight: bold;
  color: #fff;
  font-size: 16px;
  border: 0;
  background: rgb(188, 91, 237);
  background: linear-gradient(270deg, rgba(188, 91, 237, 1) 0%, rgba(112, 141, 255, 1) 100%, rgba(2, 0, 36, 1) 202124%);
}

@media screen and (max-width: 600px)
{
  .navigatie
  {
    text-align: center;

  }

  .navigatie li a{
   font-size: 16px;
  }

  .navigatie li {
    padding: 1.5rem;
  }
}

</style>

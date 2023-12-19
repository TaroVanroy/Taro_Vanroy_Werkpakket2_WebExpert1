<script>
import Nav from '@/components/Nav.vue'
import Footer from '@/components/Footer.vue'


export default {
  data() {
    return {
    }
  },
  components: {
    Nav,
    Footer,
  }
}
</script>

<template>

  <Nav/>

  <router-view></router-view>



</template>

<style>

</style>

<script>
import Nav from '@/components/HeaderComponent.vue'
import Footer from '@/components/FooterComponent.vue'

export default {
  data() {
    return {
    }
  },
  components: {
    Nav,
    Footer
  }
}
</script>

<template>

  <Nav/>

  <router-view></router-view>

  <Footer/>


</template>

<style>

</style>

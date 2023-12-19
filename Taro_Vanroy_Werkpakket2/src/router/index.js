import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Cart from "@/views/Cart.vue";
import Detail from "@/views/Detail.vue";
import Webshop from "@/views/Webshop.vue";
import Checkout from "@/views/Checkout.vue";
import Bevestiging from "@/views/Bevestiging.vue";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: Home},
        {path: "/Login", component: Login },
        {path: '/Webshop', component: Webshop ,  name: 'product-list',},
        {path: '/Cart', component: Cart},
        {path: '/Detail/:id', component: Detail, name: 'product-detail', props: true},
        {path: '/Checkout', component: Checkout},
        {path: '/Bevestiging', component: Bevestiging}


    ]
})

export default router
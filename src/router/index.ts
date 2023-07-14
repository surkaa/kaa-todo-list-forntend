import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import AuthPage from "@/views/AuthPage.vue";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/login',
        component: AuthPage
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router

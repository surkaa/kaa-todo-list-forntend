import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import RegisterComponent from "@/views/RegisterPage.vue"
import LoginComponent from "@/views/LoginPage.vue"

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/login',
        component: LoginComponent
    },
    {
        path: '/register',
        component: RegisterComponent
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router

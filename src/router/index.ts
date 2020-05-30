import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/article/:id',
        name: 'Article',
        component: () => import(/* webpackChunkName: "about" */ '../views/Article.vue')
    },
    {
        path: '/author/:id',
        name: 'Author',
        component: () => import(/* webpackChunkName: "about" */ '../views/Author.vue')
    },
    {
        path: '/category/:id',
        name: 'Category',
        component: () => import(/* webpackChunkName: "about" */ '../views/Category.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard.vue')
    }, {
        path: '/edit-article/:id',
        name: 'EditArticle',
        component: () => import(/* webpackChunkName: "about" */ '../views/EditArticle.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem("__isLoggedIn") === "true";
    if ((to.name === 'Dashboard' || to.name === 'EditArticle') && !isAuthenticated) next({ name: 'Login' })
    else next()
})

export default router

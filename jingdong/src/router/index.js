import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '',
        // 重定向
        redirect: '/login'
    },
    {
        path: '/register',
        name: 'register',
        component: () =>
            import ('../views/Register.vue')
    },
    {
        path: '/index',
        name: 'index',
        component: () =>
            import ('../views/Index.vue')
    },
    {
        path: '/botnav',
        name: 'botnav',
        component: () =>
            import ('../views/Botnav.vue'),
        // 嵌套路由  二级路由的path不用/
        children: [{
                path: '',
                redirect: 'index'
            },
            {
                path: 'index',
                name: 'index',
                component: () =>
                    import ('../views/Index.vue')
            },
            {
                path: 'list',
                name: 'list',
                component: () =>
                    import ('../views/List.vue')
            },
            {
                path: 'search',
                name: 'search',
                component: () =>
                    import ('../views/Search.vue')
            },
            {
                path: 'cart',
                name: 'cart',
                meta: {
                    // 当有这个字段的时候，我们就认为他这个路由页面是有登录权限的
                    requireAuth: true
                },
                component: () =>
                    import ('../views/Cart.vue')
            },
            {
                path: 'mine',
                name: 'mine',
                meta: {
                    // 当有这个字段的时候，我们就认为他这个路由页面是有登录权限的
                    requireAuth: true
                },
                component: () =>
                    import ('../views/Mine.vue')
            },
        ]
    }
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router
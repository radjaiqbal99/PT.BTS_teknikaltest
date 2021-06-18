import {
    createRouter,
    createWebHistory
} from 'vue-router'

const routes = [


    {
        path: '/',
        name: 'login',
        component: () => import("../components/Login.vue"),
        meta: {
            title: 'Login'
        },
    },
    {
        path: '/register',
        name: 'register',
        component: () => import("../components/register.vue"),
        meta: {
            title: 'Register'
        },
    },
    {
        path: '/checklist',
        name: 'checklist',
        component: () => import("../components/checklist.vue"),
        meta: {
            title: 'checklist'
        },
    }
    // path: '/',
    // name: 'login',
    // component: () => import("../components/Login.vue"),
    // meta: {
    //     title: 'Login'
    // }



];

const router = createRouter({
    history: createWebHistory(),
    routes
});



export default router;
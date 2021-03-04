import Vue from 'vue';
import Router from 'vue-router';
import Login from '../components/Login'
import MessagingPage from '../components/MessagingPage'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/home',
        name: 'Home',
        component: MessagingPage
    },
]
});

export default router;
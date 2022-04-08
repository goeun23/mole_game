import Vue from 'vue';
import VueRouter from 'vue-router';

//import readyPage from '@/views/ready.vue';

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/ready'
        },
        {
            path: '/ready',
            name: "ready",
            component: () => import('@/views/ready.vue')
        },
        {
            path: '/game',
            name: "game",
            component: () => import('@/views/game.vue')
        },
        {
            path: '/result',
            name: "result",
            component: () => import('@/views/result.vue')
        }, {
            path: '/score',
            name: "score",
            component: () => import('@/views/score.vue')
        }
    ]
});
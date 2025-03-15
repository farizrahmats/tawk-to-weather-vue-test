import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import DetailView from '../components/DetailView.vue';

const routes = [
    { path: '/', name: "Home", component: HomeView },
    { path: "/detail/:city", component: DetailView, props: true },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

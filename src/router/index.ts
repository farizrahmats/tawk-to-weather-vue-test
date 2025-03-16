import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import DetailView from '../components/DetailView.vue';
import WeatherDashboard from '../components/WeatherDashboard.vue';
import EditForm from '../components/EditForm.vue';

const routes = [
    { path: '/', name: "Home", component: HomeView },
    { path: "/detail/:city", component: DetailView, props: true },
    { path: "/styleguide", component: WeatherDashboard },
    { path: "/form", component: EditForm },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

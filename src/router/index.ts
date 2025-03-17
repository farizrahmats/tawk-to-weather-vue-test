import { createRouter, createWebHistory } from 'vue-router';
import WeatherDashboard from '../views/Styleguide/WeatherDashboard.vue';
import WeatherList from '../views/Weather/List/WeatherList.vue';
import WeatherlDetail from '../views/Weather/Detail/WeatherlDetail.vue';
import Form from '../views/Profile/Form.vue';

const routes = [
    { path: '/', name: "Home", component: WeatherList },
    { path: "/detail/:city", component: WeatherlDetail, props: true },
    { path: "/profile", component: Form },
    { path: "/styleguide", component: WeatherDashboard },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

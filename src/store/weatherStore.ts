import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getCityCoordinates, fetchWeather } from '../services/weatherService';

export const useWeatherStore = defineStore('weather', () => {
    const weatherData = ref(null);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const getWeather = async (city: string) => {
        loading.value = true;
        error.value = null;
        try {
            const { lat, lon } = await getCityCoordinates(city);
            weatherData.value = await fetchWeather(lat, lon);
        } catch (err) {
            error.value = 'Failed to fetch weather data';
        } finally {
            loading.value = false;
        }
    };

    return { weatherData, loading, error, getWeather };
});

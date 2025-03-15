import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useWeatherService } from "@/services/WeatherService";

export const useWeatherStore = defineStore('weather', () => {
    const { fetchWeather, fetchWeatherCity, fetchForecast } = useWeatherService();
    const weatherReports = ref<any[]>([]); // Ubah menjadi array untuk menyimpan banyak laporan
    const weatherDetail = ref<any>();
    const forecast = ref<any>(); // Ubah menjadi array untuk menyimpan banyak laporan
    const loading = ref(false);
    const error = ref<string | null>(null);

    const getWeather = async (city: string) => {
        loading.value = true;
        error.value = null;
        try {
            const weather = await fetchWeather(city);
            weatherReports.value.unshift(weather); // Tambahkan ke awal daftar (data terbaru di atas)
        } catch (err) {
            error.value = 'Failed to fetch weather data';
        } finally {
            loading.value = false;
        }
    };


    const getWeatherDetail = async (city: string) => {
        loading.value = true;
        error.value = null;
        try {
            const response = await fetchWeatherCity(city);
            weatherDetail.value = response.data;
        } catch (err) {
            error.value = 'Failed to fetch weather data';
        } finally {
            loading.value = false;
        }
    };

    const getForecastHourly = async (city: string) => {
        loading.value = true;
        error.value = null;
        try {
            const response = await fetchForecast(city);
            forecast.value = response.data;
            console.log(forecast.value)
        } catch (err) {
            error.value = 'Failed to fetch forecast data';
        } finally {
            loading.value = false;
        }
    };

    return { weatherReports, weatherDetail, forecast, loading, error, getWeather, getWeatherDetail, getForecastHourly };
});
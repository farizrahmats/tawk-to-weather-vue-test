import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useWeatherService } from "@/services/WeatherService";

export const useWeatherStore = defineStore('weather', () => {
    const { fetchWeatherCity, fetchForecast, fetchCities } = useWeatherService();
    const weatherReports = ref<any[]>([]);
    const weatherDetail = ref<any>();
    const forecast = ref<any>();
    const cities = ref<any>();
    const loading = ref(false);
    const error = ref<string | null>(null);

    const getWeather = async (city: string) => {
        loading.value = true;
        error.value = null;
        try {
            const response = await fetchWeatherCity(city);
            weatherReports.value.unshift(response.data);
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
            weatherDetail.value = { ...response.data };
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
            forecast.value = { ...response.data };
        } catch (err) {
            error.value = 'Failed to fetch forecast data';
        } finally {
            loading.value = false;
        }
    };

    const getCities = async (city: string) => {
        loading.value = true;
        error.value = null;
        try {
            const response = await fetchCities(city);
            cities.value = [...response.data];
        } catch (err) {
            error.value = 'Failed to fetch cities data';
        } finally {
            loading.value = false;
        }
    }

    return { weatherReports, weatherDetail, forecast, cities, loading, error, getWeather, getWeatherDetail, getForecastHourly, getCities };
});
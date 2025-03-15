import { ref } from 'vue';
import axios from 'axios';

const API_KEY = 'c89a7be8f65883ed3c5a518747f90f33';
const BASE_URL = 'https://api.openweathermap.org';
const weatherUri = `${BASE_URL}/data/2.5/weather`;
const forcastUri = `${BASE_URL}/data/2.5/forecast`;
const geoUri = `${BASE_URL}/geo/1.0/direct`;

// State untuk menyimpan daftar laporan cuaca
const weatherReports = ref<any[]>([]);

export const useWeatherService = () => {
    // Fetch daftar kota berdasarkan pencarian (Geocoding API)
    // const fetchCities = async (query: string) => {
    //     if (!query) return [];

    //     const apiUrl = `${BASE_URL}/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`;

    //     try {
    //         const response = await fetch(apiUrl);
    //         if (!response.ok) throw new Error('Gagal mengambil data kota');
    //         return await response.json();
    //     } catch (error) {
    //         console.error(error);
    //         return [];
    //     }
    // };

    // // Fetch data cuaca berdasarkan koordinat (Weather API)
    const fetchWeather = async (lat: number, lon: number, city: string) => {
        const apiUrl = `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error('Gagal mengambil data cuaca');
            const data = await response.json();
            data.city = city; // Tambahkan nama kota
            weatherReports.value.push(data); // Tambahkan data baru ke state
        } catch (error) {
            console.error(error);
        }
    };

    const fetchWeatherLatLong = async (lat: number, lon: number) => {
        try {
            return await axios.get(weatherUri, {
                params: { lat: lat, long: lon, appid: API_KEY, units: 'metric' }
            })
        } catch (error) {
            return error;
        }
    };

    const fetchWeatherCity = async (city: string) => {
        try {
            return await axios.get(weatherUri, {
                params: { q: city, appid: API_KEY, units: 'metric' }
            });
        } catch (error) {
            return error;
        }
    };

    const fetchForecast = async (city: string) => {
        try {
            return await axios.get(forcastUri, {
                params: { q: city, appid: API_KEY, units: 'metric' }
            })
        } catch (error) {
            return error;
        }
    }

    const fetchCities = async (city: string) => {
        try {
            return await axios.get(geoUri, {
                params: { q: city, limit: 5, appid: API_KEY }
            })
        } catch (error) {
            return error;
        }
    };

    const fetchWeatherDetail = async (city: string) => {
        try {
            const location = await axios.get(`${BASE_URL}/data/2.5/weather`, {
                params: { q: city, appid: API_KEY, units: "metric" },
            });

            const { coord } = location.data;
            const response = await axios.get(`${BASE_URL}/onecall`, {
                params: {
                    lat: coord.lat,
                    lon: coord.lon,
                    exclude: "minutely",
                    appid: API_KEY,
                    units: "metric",
                },
            });

            return response.data;
        } catch (error) {
            console.error("Error fetching detailed weather:", error);
            return null;
        }
    };

    return { weatherReports, fetchWeatherLatLong, fetchWeatherCity, fetchForecast, fetchCities, fetchWeather, fetchWeatherDetail };
};

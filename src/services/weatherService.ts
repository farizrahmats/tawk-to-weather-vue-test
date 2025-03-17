import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org';
const weatherUri = `${BASE_URL}/data/2.5/weather`;
const forcastUri = `${BASE_URL}/data/2.5/forecast`;
const geoUri = `${BASE_URL}/geo/1.0/direct`;

export const useWeatherService = () => {

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

    return { fetchWeatherLatLong, fetchWeatherCity, fetchForecast, fetchCities, fetchWeatherDetail };
};

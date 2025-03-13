import axios from 'axios';

const API_KEY = 'c89a7be8f65883ed3c5a518747f90f33';
const BASE_URL = 'https://api.openweathermap.org';

/**
 * Get latitude and longitude of a city
 */
export const getCityCoordinates = async (city: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/geo/1.0/direct`, {
            params: {
                q: city,
                limit: 1,
                appid: API_KEY,
            },
        });

        if (response.data.length === 0) {
            throw new Error('City not found');
        }

        return response.data[0]; // Mengembalikan { lat, lon, name }
    } catch (error) {
        console.error('Error fetching city coordinates:', error);
        throw error;
    }
};

/**
 * Fetch weather data using latitude and longitude
 */
export const fetchWeather = async (lat: number, lon: number) => {
    try {
        const response = await axios.get(`${BASE_URL}/data/3.0/onecall`, {
            params: {
                lat,
                lon,
                appid: API_KEY,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
};

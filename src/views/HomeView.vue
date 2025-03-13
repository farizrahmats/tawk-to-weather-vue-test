<script setup lang="ts">
import { useWeatherStore } from "../store/weatherStore";
import SearchBar from "../components/molecules/SearchBar.vue";

const weatherStore = useWeatherStore();

const searchWeather = (city: string) => {
    weatherStore.getWeather(city);
};
</script>

<template>
    <div>
        <SearchBar @search="searchWeather" />
        <div v-if="weatherStore.loading">Loading...</div>
        <div v-else-if="weatherStore.error">{{ weatherStore.error }}</div>
        <div v-else-if="weatherStore.weatherData">
            <h2>{{ weatherStore.weatherData.name }}</h2>
            <p>{{ weatherStore.weatherData.main.temp }}°C</p>
            <p>{{ weatherStore.weatherData.weather[0].description }}</p>
        </div>
    </div>
</template>

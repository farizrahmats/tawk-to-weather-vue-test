<script setup lang="ts">
import { useRouter } from "vue-router";
import { useWeatherService } from "@/services/WeatherService";
import SearchBar from "@/components/molecules/SearchBar.vue";
import WeatherCard from "@/components/WeatherCard.vue";

const router = useRouter();

const { weatherReports, fetchWeather } = useWeatherService();

const goToDetail = (city: string) => {
    router.push(`/detail/${city}`);
};
</script>

<template>
    <div>
        <SearchBar @search="fetchWeather" />

        <div class="weather-container">
            <WeatherCard
                v-for="weather in weatherReports"
                :key="weather.id"
                :city="weather.city"
                :weather="weather"
                @showDetail="goToDetail"
            />
        </div>
    </div>
</template>

<style scoped>
.weather-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 20px;
}
</style>

<template>
    <div>
        <h3>Weekly Forecast</h3>
        <div class="forecast">
            <div
                v-for="day in weeklyForecast"
                :key="day.dt"
                class="forecast-item"
            >
                <p>{{ formatDay(day.dt) }}</p>
                <img :src="getWeatherIcon(day.weather[0].icon)" />
                <p>{{ Math.round(day.main.temp) }}°C</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

defineProps<{ weeklyForecast: any[] }>();

const getWeatherIcon = (icon: string) =>
    `https://openweathermap.org/img/wn/${icon}@2x.png`;

const formatDay = (timestamp: number) =>
    new Date(timestamp * 1000).toLocaleDateString("en-US", {
        weekday: "short",
    });
</script>

<style scoped>
.forecast {
    display: flex;
    justify-content: space-around;
    gap: 10px;
    margin: 10px 0;
}
.forecast-item {
    background: #fff;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>

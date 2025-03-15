<template>
    <div>
        <h3>Hourly Forecast</h3>
        <div class="forecast">
            <div
                v-for="hour in hourlyForecast"
                :key="hour.dt"
                class="forecast-item"
            >
                <p>{{ formatHour(hour.dt) }}</p>
                <img :src="getWeatherIcon(hour.weather[0].icon)" />
                <p>{{ Math.round(hour.main.temp) }}°C</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

defineProps<{ hourlyForecast: any[] }>();

const getWeatherIcon = (icon: string) =>
    `https://openweathermap.org/img/wn/${icon}@2x.png`;

const formatHour = (timestamp: number) =>
    new Date(timestamp * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
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

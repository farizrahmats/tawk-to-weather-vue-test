<template>
    <div>
        <div
            class="flex items-center justify-between bg-blue-100 p-3 rounded-lg shadow m-2"
            v-for="day in weeklyForecast"
            :key="day.dt"
        >
            <div class="flex items-center space-x-3">
                <img
                    :src="getWeatherIcon(day.weather[0].icon)"
                    :alt="day"
                    class="w-10 h-10"
                />
                <div>
                    <p class="text-sm font-medium">{{ formatDay(day.dt) }}</p>
                    <p class="text-xs text-gray-600">
                        {{ day.weather[0].description }}
                    </p>
                </div>
            </div>
            <p class="text-lg font-bold">{{ Math.round(day.main.temp) }}°C</p>
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

<style scoped></style>

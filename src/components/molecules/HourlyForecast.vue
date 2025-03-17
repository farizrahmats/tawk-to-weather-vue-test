<template>
    <div>
        <div class="flex justify-around gap-1 space-x-4">
            <div
                class="flex flex-col items-center bg-[#f5f5f5] p-3 rounded-lg shadow"
                v-for="hour in hourlyForecast"
                :key="hour.dt"
            >
                <img
                    :src="getWeatherIcon(hour.weather[0].icon)"
                    :alt="formatHour(hour.dt)"
                    class="w-14 h-auto"
                />
                <p class="text-lg">{{ Math.round(hour.main.temp) }}°</p>
                <p class="text-sm font-medium">{{ formatHour(hour.dt) }}</p>
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

<style scoped></style>

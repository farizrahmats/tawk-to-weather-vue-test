<template>
    <div>
        <div
            class="flex items-center justify-between bg-[#d2dfff] p-3 rounded-lg shadow m-2"
            v-for="day in weeklyForecast"
            :key="day.dt"
        >
            <div class="flex items-center space-x-3">
                <span class="bg-[#9AB6FF] p-1 rounded-full shadow">
                    <img
                        :src="getWeatherIcon(day.weather[0].icon)"
                        :alt="day"
                        class="w-10 h-10"
                    />
                </span>

                <div class="flex flex-col justify-between h-10">
                    <p class="text-xs font-medium">{{ formatDay(day.dt) }}</p>
                    <p class="text-xs text-gray-600">
                        {{ day.weather[0].description }}
                    </p>
                </div>
            </div>
            <div class="flex flex-row justify-between w-1/6">
                <p class="font-medium">{{ Math.round(day.main.temp) }}°C</p>
                <img :src="carretRightIco" :alt="day" class="w-1 h-auto" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

import carretRightIco from "@/assets/carret-right.svg";

defineProps<{ weeklyForecast: any[] }>();

const getWeatherIcon = (icon: string) =>
    `https://openweathermap.org/img/wn/${icon}@2x.png`;

const formatDay = (timestamp: number) =>
    new Date(timestamp * 1000).toLocaleDateString("en-US", {
        weekday: "long",
    });
</script>

<style scoped></style>

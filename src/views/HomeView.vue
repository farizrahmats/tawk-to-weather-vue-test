<template>
    <div
        class="weather-dashboard min-h-screen bg-gray-100 flex justify-center items-top md:p-4"
    >
        <div
            class="weather-dashboard__container h-full min-h-screen w-full max-w-md bg-white p-6 rounded-xl shadow-lg"
        >
            <div class="flex justify-between w-full z-10 py-8">
                <div class="w-64 flex-auto">
                    <h1 class="weather-dashboard__title text-2xl font-bold">
                        Weather
                    </h1>
                </div>
                <!-- Profile Button -->
                <button @click="goToProfile" class="text-gray-700">
                    <img :src="userIco" alt="User Icon" class="w-5 h-5" />
                </button>
            </div>

            <!-- Search Bar -->
            <SearchBar @search="weatherStore.getWeather" />

            <!-- Weather Cards -->
            <div class="weather-dashboard__cards mt-4 space-y-4">
                <WeatherCard
                    v-for="weather in weatherStore.weatherReports"
                    :key="weather.id"
                    :city="weather.name"
                    :weather="weather"
                    @showDetail="goToDetail"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useWeatherStore } from "@/store/weatherStore";
import SearchBar from "@/components/molecules/SearchBar.vue";
import WeatherCard from "@/components/WeatherCard.vue";

import userIco from "@/assets/user.svg";

const router = useRouter();
const weatherStore = useWeatherStore();

const goToDetail = (city: string) => {
    router.push(`/detail/${city}`);
};

const goToProfile = () => {
    router.push(`/form`);
};
</script>

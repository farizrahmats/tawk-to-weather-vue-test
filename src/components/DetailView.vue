<template>
    <div
        class="weather-dashboard min-h-screen bg-gray-100 flex justify-center items-top md:p-4"
    >
        <div
            class="weather-dashboard__container h-full min-h-screen w-full max-w-md bg-white rounded-xl shadow-lg"
        >
            <!-- Weather Detail Section -->
            <div
                class="weather-detail bg-custom-gradient text-white p-6 shadow-lg text-center"
                v-if="weather"
            >
                <div class="flex flex-row justify-between justify-items-center">
                    <button @click="router.push('/')">❮</button>
                    <h2 class="weather-detail__location text-sm font-semibold">
                        {{ weather.name }}
                    </h2>
                    <img :src="trashIco" alt="Trash Icon" class="w-4 h-4" />
                </div>
                <p class="weather-detail__date text-sm mt-6">
                    {{ formattedDate }}
                </p>
                <div class="weather-detail__icon flex flex-col items-center">
                    <img
                        class="w-20 h-auto"
                        :src="getWeatherIcon(weather.weather[0].icon)"
                        :alt="weather.weather[0].description"
                    />
                    <p class="weather-detail__temperature text-xl">
                        {{ Math.round(weather.main.temp) }}°C
                    </p>
                    <p class="weather-detail__description text-xl font-bold">
                        {{ weather.weather[0].description }}
                    </p>
                </div>
                <p class="weather-detail__update text-xs mt-4">
                    Last Update: {{ formattedTime }}
                </p>
            </div>

            <div class="p-6">
                <!-- Hourly Forecast -->
                <div class="hourly-forecast mt-4">
                    <h3 class="hourly-forecast__title text-lg mb-4">
                        Hourly Forecast
                    </h3>
                    <div class="hourly-forecast__list">
                        <HourlyForecast :hourlyForecast="hourlyForecast" />
                    </div>
                </div>

                <!-- Weekly Forecast -->
                <div class="weekly-forecast mt-10">
                    <h3 class="weekly-forecast__title text-lg mb-4">
                        Weekly Forecast
                    </h3>
                    <div class="weekly-forecast__list mt-2 space-y-2">
                        <WeeklyForecast :weeklyForecast="weeklyForecast" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useWeatherStore } from "../store/weatherStore";

import HourlyForecast from "../components/molecules/HourlyForecast.vue";
import WeeklyForecast from "../components/molecules/WeeklyForecast.vue";
import trashIco from "@/assets/trash.svg";

const route = useRoute();
const router = useRouter();
const city = route.params.city as string;
const weatherStore = useWeatherStore();

const weather = computed(() => weatherStore.weatherDetail);

// Compute hourly and weekly forecasts
const hourlyForecast = computed(
    () => weatherStore.forecast?.list?.slice(0, 4) || []
);
const weeklyForecast = computed(() => {
    const days: any = {};
    return (weatherStore.forecast?.list || [])
        .filter((item: any) => {
            const date = new Date(item.dt * 1000).toDateString();
            if (!days[date]) {
                days[date] = true;
                return true;
            }
            return false;
        })
        .slice(0, 5);
});

const loading = ref(true);

// Fetch data if not available
const fetchWeatherDetail = async () => {
    loading.value = true;
    await weatherStore.getWeatherDetail(city);
    await weatherStore.getForecastHourly(city);
    loading.value = false;
};

// Ensure the data is set on refresh
onMounted(async () => {
    await fetchWeatherDetail();
});

const formattedDate = computed(() => {
    return new Date(weather.value?.dt * 1000).toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
});

const formattedTime = computed(() =>
    new Date(weather.value?.dt * 1000).toLocaleTimeString()
);

const getWeatherIcon = (icon: string) =>
    `https://openweathermap.org/img/wn/${icon}@2x.png`;
</script>

<style scoped>
.bg-custom-gradient {
    background: linear-gradient(
        118.25deg,
        #4f80fa 1.2%,
        #3764d7 59.26%,
        #335fd1 79.2%
    );
}
</style>

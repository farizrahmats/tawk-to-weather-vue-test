<template>
    <div
        class="weather-dashboard min-h-screen bg-gray-100 flex justify-center items-top md:p-4"
    >
        <div
            class="weather-dashboard__container h-full min-h-screen w-full max-w-md bg-white rounded-xl shadow-lg"
        >
            <!-- Weather Detail Section -->
            <div
                class="weather-detail bg-gradient-to-b from-blue-500 to-blue-400 text-white p-6 shadow-lg text-center"
                v-if="weather"
            >
                <button @click="router.push('/')">← Back</button>
                <h2 class="weather-detail__location text-lg font-semibold">
                    {{ weather.name }}
                </h2>
                <p class="weather-detail__date text-sm">
                    Monday, 20 December 2021
                </p>
                <div
                    class="weather-detail__icon my-4 flex flex-col items-center"
                >
                    <img
                        class="w-16 h-16"
                        :src="getWeatherIcon(weather.weather[0].icon)"
                        :alt="weather.weather[0].description"
                    />
                    <p class="weather-detail__temperature text-4xl font-bold">
                        {{ Math.round(weather.main.temp) }}°C
                    </p>
                    <p class="weather-detail__description text-lg">
                        {{ weather.weather[0].description }}
                    </p>
                </div>
                <p class="weather-detail__update text-xs">
                    Last Update: {{ formattedTime }}
                </p>
            </div>

            <div class="p-6">
                <!-- Hourly Forecast -->
                <div class="hourly-forecast mt-4">
                    <h3 class="hourly-forecast__title text-lg font-bold">
                        Hourly Forecast
                    </h3>
                    <div
                        class="hourly-forecast__list flex space-x-4 mt-2 overflow-x-auto"
                    >
                        <HourlyForecast :hourlyForecast="hourlyForecast" />
                    </div>
                </div>

                <!-- Weekly Forecast -->
                <div class="weekly-forecast mt-4">
                    <h3 class="weekly-forecast__title text-lg font-bold">
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

const route = useRoute();
const router = useRouter();
const city = route.params.city as string;
const weatherStore = useWeatherStore();

const weather = computed(() => weatherStore.weatherDetail);

// Compute hourly and weekly forecasts
const hourlyForecast = computed(
    () => weatherStore.forecast?.list?.slice(0, 6) || []
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
    if (weather.value === undefined) {
        await fetchWeatherDetail();
    }
});

// watch(
//     () => weatherDetail,
//     (newWeather) => {
//         if (newWeather) {
//             weather.value = newWeather;
//             console.log(weather.value);
//         }
//     },
//     { immediate: true }
// );

const formattedTime = computed(() =>
    new Date(weather.value?.dt * 1000).toLocaleTimeString()
);

const getWeatherIcon = (icon: string) =>
    `https://openweathermap.org/img/wn/${icon}@2x.png`;
</script>

<style scoped>
.detail-view {
    max-width: 600px;
    margin: auto;
    text-align: center;
}
button {
    margin-bottom: 20px;
}
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

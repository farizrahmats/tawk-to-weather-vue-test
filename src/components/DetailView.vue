<template>
    <div class="detail-view">
        <button @click="router.push('/')">← Back</button>

        <h2>{{ city }}</h2>

        <p v-if="loading">Loading...</p>
        <div v-if="weather">
            <p>
                <strong>Condition:</strong> {{ weather.weather[0].description }}
            </p>
            <img
                :src="getWeatherIcon(weather.weather[0].icon)"
                :alt="weather.weather[0].description"
            />
            <p>
                <strong>Temperature:</strong>
                {{ Math.round(weather.main.temp) }}°C
            </p>
            <p><strong>Last Updated:</strong> {{ formattedTime }}</p>

            <!-- Hourly Forecast Component -->
            <HourlyForecast :hourlyForecast="hourlyForecast" />

            <!-- Weekly Forecast Component -->
            <WeeklyForecast :weeklyForecast="weeklyForecast" />
        </div>
        <p v-else>Error fetching weather data.</p>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, defineProps, watchEffect, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useWeatherService } from "@/services/WeatherService";
import { useWeatherStore } from "../store/weatherStore";
import HourlyForecast from "../components/molecules/HourlyForecast.vue";
import WeeklyForecast from "../components/molecules/WeeklyForecast.vue";

const route = useRoute();
const router = useRouter();
const city = route.params.city as string;

// const { weatherReports, fetchWeather } = useWeatherService();
const {
    weatherReports,
    forecast,
    weatherDetail,
    getWeatherDetail,
    getForecastHourly,
} = useWeatherStore();
const weather = computed(() => weatherDetail);

// Compute hourly and weekly forecasts
const hourlyForecast = computed(() => forecast?.list?.slice(0, 6) || []);
const weeklyForecast = computed(() => {
    const days: any = {};
    return (forecast?.list || [])
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
    await getWeatherDetail(city);
    await getForecastHourly(city);
    loading.value = false;
};

// Ensure the data is set on refresh
onMounted(async () => {
    if (!weatherDetail) {
        await fetchWeatherDetail();
    }
    console.log(weatherDetail, forecast);
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

const formatHour = (timestamp: number) =>
    new Date(timestamp * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

const formatDay = (timestamp: number) =>
    new Date(timestamp * 1000).toLocaleDateString("en-US", {
        weekday: "short",
    });
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

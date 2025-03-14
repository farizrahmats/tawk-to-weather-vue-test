<script setup lang="ts">
import { ref, computed, watch, defineEmits } from "vue";
import type { PropType } from "vue";

const props = defineProps({
    city: String,
    weather: Object as PropType<any>, // Bisa disesuaikan jika ada interface TypeScript
});

const emit = defineEmits(["showDetail"]);

const emitDetail = () => {
    emit("showDetail", props.city);
};

const getWeatherIcon = (icon: string) => {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
};

// Hitung waktu lokal berdasarkan timezone offset dari API
const localTime = ref("");

const updateTime = () => {
    if (props.weather) {
        const timezoneOffset = props.weather.timezone; // Offset dalam detik
        const utcTime =
            new Date().getTime() + new Date().getTimezoneOffset() * 60000;
        const cityTime = new Date(utcTime + timezoneOffset * 1000);

        localTime.value = new Intl.DateTimeFormat("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            timeZoneName: "short",
        }).format(cityTime);
    }
};

// Update waktu setiap detik
watch(() => props.weather, updateTime, { immediate: true });
setInterval(updateTime, 1000);

// Konversi tekanan udara ke "derajat" berdasarkan perubahan ketinggian
const basePressure = 1013.25; // Tekanan udara standar di permukaan laut dalam hPa
const temperatureKelvin = computed(() => props.weather.main.temp + 273.15);

const highPressureDegree = computed(() => {
    const highPressure = props.weather.main.pressure + 10;
    return convertPressureToDegree(highPressure);
});

const lowPressureDegree = computed(() => {
    const lowPressure = props.weather.main.pressure - 10;
    return convertPressureToDegree(lowPressure);
});

function convertPressureToDegree(pressure: number): number {
    const R = 287.05; // J/(kg·K)
    const g = 9.80665; // m/s²
    const lapseRate = 0.0065; // K/m
    const T0 = temperatureKelvin.value; // Suhu dalam Kelvin

    const heightDifference =
        (T0 / lapseRate) *
        (1 - Math.pow(pressure / basePressure, (R * lapseRate) / g));

    // Konversi ke derajat (perkiraan)
    return heightDifference / 100;
}
</script>

<template>
    <div
        class="relative p-6 rounded-lg bg-gray-800 bg-opacity-80 text-white overflow-hidden shadow-lg"
        :style="{ backgroundImage: `url(${city})`, backgroundSize: 'cover' }"
    >
        <div class="absolute inset-0 bg-black bg-opacity-30 rounded-lg"></div>
        <div class="relative z-10">
            <p class="text-lg font-semibold">{{ city }}</p>
            <p class="text-sm text-gray-300">{{ city.location }}</p>

            <div class="flex items-center justify-between mt-3">
                <p class="text-3xl font-bold">{{ city.temp }}°</p>
                <p class="text-xs">{{ weather.weather[0].description }}</p>
            </div>

            <div class="mt-2 text-xs text-gray-300">
                H:{{ highPressureDegree.toFixed(2) }}° L:{{
                    lowPressureDegree.toFixed(2)
                }}°
            </div>
        </div>
    </div>
</template>

<!-- <template>
    <div class="weather-card" @click="emitDetail">
        <h2>{{ city }}</h2>

        Waktu Lokal
        <p class="time">{{ localTime }}</p>

        <div class="weather-info">
            <img
                :src="getWeatherIcon(weather.weather[0].icon)"
                :alt="weather.weather[0].description"
            />
            <p class="temp">{{ Math.round(weather.main.temp) }}°C</p>
        </div>

        <div class="weather-details">
            <p>
                <strong>Condition:</strong> {{ weather.weather[0].description }}
            </p>
            <p><strong>Humidity:</strong> {{ weather.main.humidity }}%</p>
            <p><strong>Wind:</strong> {{ weather.wind.speed }} m/s</p>

            High & Low Pressure dalam bentuk derajat
            <p>
                <strong>High Pressure:</strong>
                {{ highPressureDegree.toFixed(2) }}°
            </p>
            <p>
                <strong>Low Pressure:</strong>
                {{ lowPressureDegree.toFixed(2) }}°
            </p>
        </div>
    </div>
</template> -->

<style scoped>
/* .weather-card {
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    text-align: center;
    max-width: 250px;
}

h2 {
    margin: 0;
    font-size: 20px;
    color: #333;
}

.time {
    font-size: 14px;
    color: #555;
    margin: 5px 0;
}

.weather-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px 0;
}

.weather-info img {
    width: 80px;
    height: 80px;
}

.temp {
    font-size: 24px;
    font-weight: bold;
}

.weather-details p {
    margin: 5px 0;
    font-size: 14px;
} */
</style>

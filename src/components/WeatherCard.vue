<template>
    <div
        class="bg-blue-600 text-white p-4 rounded-xl shadow-lg relative"
        @click="emitDetail"
    >
        <div class="flex justify-between items-center">
            <div>
                <h2 class="text-lg font-bold">{{ city }}</h2>
                <p v-if="formattedTime" class="text-sm">{{ formattedTime }}</p>
            </div>
            <div class="text-4xl font-bold">
                {{ Math.round(weather.main.temp) }}°C
            </div>
        </div>
        <div class="flex justify-between items-center">
            <div>
                <p class="text-sm mt-1">{{ weather.weather[0].description }}</p>
            </div>
            <div class="text-xs mt-2">
                H:{{ highPressureDegree.toFixed(2) }}° L:{{
                    lowPressureDegree.toFixed(2)
                }}°
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, defineEmits } from "vue";
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

const formattedTime = computed(() => {
    return new Date(props.weather.dt * 1000).toLocaleTimeString();
});

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

<style scoped></style>

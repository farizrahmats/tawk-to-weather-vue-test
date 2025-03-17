<template>
    <div
        :style="backgroundStyle"
        class="text-white p-4 rounded-xl shadow-lg relative cursor-pointer"
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

import dayImage from "@/assets/images/day.png";
import nightImage from "@/assets/images/night.png";

const props = defineProps({
    city: String,
    weather: Object as PropType<any>, // Bisa disesuaikan jika ada interface TypeScript
});

const emit = defineEmits(["showDetail"]);

const emitDetail = () => {
    emit("showDetail", props.city);
};

const formattedTime = computed(() => {
    if (!props.weather.dt || !props.weather.timezone) return "Unknown Time";

    const utcTime = props.weather.dt * 1000; // Convert seconds to milliseconds
    const localTime = utcTime + props.weather.timezone * 1000; // ✅ Add timezone offset

    return new Date(localTime).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
});

const backgroundStyle = computed(() => {
    if (!formattedTime.value) return { backgroundImage: `url(${dayImage})` };

    const hour = parseInt(formattedTime.value.split(":")[0]);
    const isPM = formattedTime.value.includes("PM");

    // Convert to 24-hour format
    const militaryHour = isPM
        ? hour === 12
            ? 12
            : hour + 12
        : hour === 12
        ? 0
        : hour;

    return {
        backgroundImage: `url(${
            militaryHour >= 6 && militaryHour < 18 ? dayImage : nightImage
        })`,
        backgroundSize: "cover",
    };
});

const backgroundClass = computed(() => {
    if (!formattedTime.value) return "bg-gray-500"; // Default background

    // Extract hour from formattedTime (e.g., "07:30 AM")
    const hour = parseInt(formattedTime.value.split(":")[0]);
    const isPM = formattedTime.value.includes("PM");

    // Convert 12-hour format to 24-hour format
    const militaryHour = isPM
        ? hour === 12
            ? 12
            : hour + 12
        : hour === 12
        ? 0
        : hour;

    return militaryHour >= 6 && militaryHour < 18
        ? "bg-blue-500"
        : "bg-gray-800";
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

<template>
    <div class="weather-dashboard__search mt-2 relative">
        <div class="relative">
            <input
                type="text"
                v-model="searchQuery"
                placeholder="Search for a city airport"
                class="weather-dashboard__input w-full p-2 pl-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
                class="absolute left-3 top-2.5 w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-4.35-4.35m-3.65-1.65a7 7 0 1 0-10.01 0 7 7 0 0 0 10.01 0z"
                ></path>
            </svg>
        </div>
        <ul
            v-if="cityList.length"
            class="weather-dashboard__suggestions absolute w-full h-full min-h-screen bg-white mt-1 z-10"
        >
            <li
                v-for="city in cityList"
                :key="city"
                class="p-2 hover:bg-gray-100 cursor-pointer border-b border-dashed last:border-none"
                @click="selectCity(city)"
            >
                {{ city.name }}, {{ city.country }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useWeatherStore } from "@/store/WeatherStore";
import debounce from "lodash/debounce";

const weatherStore = useWeatherStore();

const searchQuery = ref("");

const cityList = computed(() => {
    return weatherStore.cities ?? [];
});

const emit = defineEmits(["search"]);

const debouncedFetchCities = debounce(async (query: string) => {
    await weatherStore.getCities(query);
}, 500);

const selectCity = (city: any) => {
    searchQuery.value = "";
    emit("search", city.name);
    weatherStore.cities = [];
};

watch(searchQuery, (newValue) => {
    debouncedFetchCities(newValue);
});
</script>

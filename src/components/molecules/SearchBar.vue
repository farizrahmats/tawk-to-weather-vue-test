<script setup lang="ts">
import { ref, watch } from "vue";
import debounce from "lodash/debounce";
import { useWeatherService } from "@/services/WeatherService";

const searchQuery = ref("");
const cityList = ref<any[]>([]);
const { fetchCities } = useWeatherService();

// Emit event ke parent
const emit = defineEmits(["search"]);

// Gunakan debounce agar request API tidak terlalu sering
const debouncedFetchCities = debounce(async (query: string) => {
    cityList.value = await fetchCities(query);
}, 500);

watch(searchQuery, (newValue) => {
    debouncedFetchCities(newValue);
});

// Saat user memilih kota
const selectCity = (city: any) => {
    searchQuery.value = city.name;
    emit("search", city.lat, city.lon, city.name);
    cityList.value = []; // Bersihkan list setelah dipilih
};
</script>

<template>
    <div class="search-container">
        <input
            v-model="searchQuery"
            type="text"
            placeholder="🔍 Search for a city"
            class="w-full p-3 mt-4 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-white focus:outline-none"
        />
        <ul v-if="cityList.length" class="suggestions">
            <li
                v-for="city in cityList"
                :key="city.lat"
                @click="selectCity(city)"
            >
                {{ city.name }}, {{ city.country }}
            </li>
        </ul>
    </div>
</template>

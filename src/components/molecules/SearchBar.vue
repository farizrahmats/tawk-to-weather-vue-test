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
            placeholder="Cari kota..."
            class="search-input"
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

<style scoped>
.search-container {
    position: relative;
    width: 100%;
    max-width: 300px;
}
.search-input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
}
.suggestions {
    list-style: none;
    padding: 0;
    margin: 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    max-height: 150px;
    overflow-y: auto;
    background: white;
    position: absolute;
    width: 100%;
}
.suggestions li {
    padding: 10px;
    cursor: pointer;
}
.suggestions li:hover {
    background: #f0f0f0;
}
</style>

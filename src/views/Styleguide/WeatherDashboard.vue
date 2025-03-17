<template>
    <div
        class="weather-dashboard min-h-screen bg-gray-100 flex justify-center items-center p-4"
    >
        <div
            class="weather-dashboard__container w-full max-w-md bg-white p-6 rounded-xl shadow-lg"
        >
            <h1 class="weather-dashboard__title text-2xl font-bold">Weather</h1>

            <!-- Search Bar -->
            <div class="weather-dashboard__search mt-2 relative">
                <div class="relative">
                    <input
                        type="text"
                        v-model="searchQuery"
                        placeholder="Search for a city or airport"
                        class="weather-dashboard__input w-full p-2 pl-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        @input="fetchSuggestions"
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
                    v-if="suggestions.length"
                    class="weather-dashboard__suggestions absolute w-full bg-white border rounded-lg mt-1 shadow-lg z-10"
                >
                    <li
                        v-for="suggestion in suggestions"
                        :key="suggestion"
                        class="p-2 hover:bg-gray-100 cursor-pointer"
                        @click="selectSuggestion(suggestion)"
                    >
                        {{ suggestion }}
                    </li>
                </ul>
            </div>

            <div class="weather-dashboard__cards mt-4 space-y-4">
                <WeatherCard2
                    location="My Location"
                    region="Bangsar South"
                    temperature="24"
                    description="Moderate Rain"
                    high="30"
                    low="25"
                />
                <WeatherCard2
                    location="Seongnam-si"
                    time="7:30 PM"
                    temperature="21"
                    description="Partly Cloudy"
                    high="29"
                    low="15"
                />
                <WeatherCard2
                    location="London"
                    time="10:30 AM"
                    temperature="9"
                    description="Not as cold tomorrow, with a high of 16°"
                    high="16"
                    low="-4"
                />
                <WeatherCard2
                    location="Milan"
                    time="11:30 AM"
                    temperature="12"
                    description="Not as cold tomorrow, with a high of 20°"
                    high="20"
                    low="0"
                />
            </div>

            <!-- Weather Detail Section -->
            <div
                class="weather-detail mt-6 bg-gradient-to-b from-blue-500 to-blue-400 text-white p-6 rounded-xl shadow-lg text-center"
            >
                <h2 class="weather-detail__location text-lg font-semibold">
                    Milan, Italy
                </h2>
                <p class="weather-detail__date text-sm">
                    Monday, 20 December 2021
                </p>
                <div
                    class="weather-detail__icon my-4 flex flex-col items-center"
                >
                    <img src="" alt="Moderate Rain" class="w-16 h-16" />
                    <p class="weather-detail__temperature text-4xl font-bold">
                        24°C
                    </p>
                    <p class="weather-detail__description text-lg">
                        Moderate Rain
                    </p>
                </div>
                <p class="weather-detail__update text-xs">
                    Last Update: 11:00 AM
                </p>
            </div>

            <!-- Hourly Forecast -->
            <div class="hourly-forecast mt-4">
                <h3 class="hourly-forecast__title text-lg font-bold">
                    Hourly Forecast
                </h3>
                <div
                    class="hourly-forecast__list flex space-x-4 mt-2 overflow-x-auto"
                >
                    <HourlyForecast time="12:00 PM" temperature="18" icon="" />
                    <HourlyForecast time="1:00 PM" temperature="19" icon="" />
                    <HourlyForecast time="2:00 PM" temperature="20" icon="" />
                    <HourlyForecast time="3:00 PM" temperature="19" icon="" />
                </div>
            </div>

            <!-- Weekly Forecast -->
            <div class="weekly-forecast mt-4">
                <h3 class="weekly-forecast__title text-lg font-bold">
                    Weekly Forecast
                </h3>
                <div class="weekly-forecast__list mt-2 space-y-2">
                    <WeeklyForecast
                        day="Monday"
                        description="Sunny"
                        temperature="30"
                        icon=""
                    />
                    <WeeklyForecast
                        day="Tuesday"
                        description="Thunderstorms"
                        temperature="19"
                        icon=""
                    />
                    <WeeklyForecast
                        day="Wednesday"
                        description="Heavy Rain"
                        temperature="17"
                        icon=""
                    />
                    <WeeklyForecast
                        day="Thursday"
                        description="Partly Cloudy"
                        temperature="20"
                        icon=""
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import WeatherCard2 from "@/views/StyleGuide/WeatherCard2.vue";
import HourlyForecast from "@/views/StyleGuide/HourlyForecast.vue";
import WeeklyForecast from "@/views/StyleGuide/WeeklyForecast.vue";

const searchQuery = ref("");
const suggestions = ref([]);

const fetchSuggestions = () => {
    if (searchQuery.value.length > 2) {
        suggestions.value = [
            "New York",
            "Los Angeles",
            "San Francisco",
            "London",
            "Milan",
        ];
    } else {
        suggestions.value = [];
    }
};

const selectSuggestion = (suggestion) => {
    searchQuery.value = suggestion;
    suggestions.value = [];
};
</script>

<style scoped></style>

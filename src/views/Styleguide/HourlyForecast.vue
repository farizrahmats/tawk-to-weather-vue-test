<template>
    <div class="flex flex-col items-center bg-white p-2 rounded-lg shadow">
        <img :src="icon" :alt="time" class="w-12 h-12" />
        <p class="text-sm font-medium">{{ time }}</p>
        <p class="text-lg font-bold">{{ temperature }}°C</p>
    </div>
</template>

<script setup>
defineProps({
    time: String,
    temperature: String,
    icon: String,
});
</script>

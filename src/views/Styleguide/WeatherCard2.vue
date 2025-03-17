<template>
    <div class="bg-blue-600 text-white p-4 rounded-xl shadow-lg relative">
        <div class="flex justify-between items-center">
            <div>
                <h2 class="text-lg font-bold">{{ location }}</h2>
                <p v-if="region" class="text-sm">{{ region }}</p>
                <p v-if="time" class="text-sm">{{ time }}</p>
                <p class="text-sm mt-1">{{ description }}</p>
            </div>
            <div class="text-4xl font-bold">{{ temperature }}°</div>
        </div>
        <div class="text-xs mt-2">H:{{ high }}° L:{{ low }}°</div>
    </div>
</template>

<script setup>
defineProps({
    location: String,
    region: String,
    time: String,
    temperature: String,
    description: String,
    high: String,
    low: String,
});
</script>

<style scoped></style>

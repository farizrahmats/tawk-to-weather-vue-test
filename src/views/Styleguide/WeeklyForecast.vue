<template>
    <div
        class="flex items-center justify-between bg-blue-100 p-3 rounded-lg shadow"
    >
        <div class="flex items-center space-x-3">
            <img :src="icon" :alt="day" class="w-10 h-10" />
            <div>
                <p class="text-sm font-medium">{{ day }}</p>
                <p class="text-xs text-gray-600">{{ description }}</p>
            </div>
        </div>
        <p class="text-lg font-bold">{{ temperature }}°C</p>
    </div>
</template>

<script setup>
defineProps({
    day: String,
    description: String,
    temperature: String,
    icon: String,
});
</script>

<style scoped></style>

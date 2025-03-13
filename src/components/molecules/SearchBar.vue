<script setup lang="ts">
import { ref } from "vue";

const searchQuery = ref("");
const emit = defineEmits(["search"]);

const search = () => {
    if (searchQuery.value.trim()) {
        emit("search", searchQuery.value);
    }
};
</script>

<template>
    <div class="search-bar">
        <input
            v-model="searchQuery"
            placeholder="Enter city..."
            @keyup.enter="search"
        />
        <button @click="search">Search</button>
    </div>
</template>

<style scoped>
.search-bar {
    display: flex;
    gap: 10px;
}
input {
    padding: 5px;
}
button {
    background-color: blue;
    color: white;
    padding: 5px 10px;
}
</style>

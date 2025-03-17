<template>
    <img
        :src="iconSrc"
        :alt="altText"
        class="w-5 h-5 cursor-pointer"
        @click="handleClick"
    />
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
    icon: String, // Path to the icon
    alt: String, // Alt text for accessibility
});

const emit = defineEmits(["click"]);

const iconSrc = computed(() => props.icon || "/default-icon.png");
const altText = computed(() => props.alt || "Icon");

const handleClick = () => {
    emit("click");
};
</script>

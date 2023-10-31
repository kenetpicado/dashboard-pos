<template>
    <div v-if="image" class="h-36 w-36">
        <img :src="image" onerror="this.src='/not-found.jpg'" alt="Imagen" class="max-h-full max-w-full rounded-lg">
    </div>
</template>

<script setup>

defineProps({
    image: {
        type: Object,
        required: true,
    },
});
</script>
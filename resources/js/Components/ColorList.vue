<template>
    <div class="col-span-2 flex items-center gap-2" style="flex-wrap: wrap;">
        <div v-for="color in colors" :key="color">
            <div class="w-6 h-6 rounded-md" role="button" :style="{ backgroundColor: color }" @click="$emit('removeColor', color)">
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    colors: {
        type: Object,
        required: false,
    },
});
</script>
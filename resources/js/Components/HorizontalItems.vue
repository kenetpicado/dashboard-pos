<template>
    <div class="container mx-auto p-4">
        <h1 class="mb-2 text-roseh-blue font-bold">{{ title }}</h1>
        <div class="flex gap-3 overflow-x-auto hide-scrollbar text-xs">
            <slot/>
        </div>
    </div>
</template>

<script setup>

defineProps({
    title: {
        type: String,
        required: true
    },
})

</script>
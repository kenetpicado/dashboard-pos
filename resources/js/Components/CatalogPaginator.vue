<template>
    <div class="mb-4 w-full" v-if="links && pageList.length > 1">
        <div class="flex justify-center items-center border-2 border-roseh-pink rounded-lg">
            <button type="button" v-for="item in pageList" @click="getThisPage(item.url)" class="flex-grow select-none font-bold py-1"
                :class="{ 'bg-roseh-pink text-white': item.active, 'text-roseh-pink': !item.active, }">
                {{ item.label }}
            </button>
        </div>
    </div>
</template>

<script setup>
import { router } from "@inertiajs/vue3";
import { computed } from "vue";

const props = defineProps({
    links: {
        type: Object,
        required: false
    }
});

const pageList = computed(() => {
    return props.links.slice(1, props.links.length - 1);
});

function getThisPage(url) {
    const searchParams = new URLSearchParams(window.location.search);
    const queryParams = {};

    const paramNames = ['category_id', 'measure'];

    paramNames.forEach(paramName => {
        const paramValue = searchParams.get(paramName);
        if (paramValue !== null) {
            queryParams[paramName] = paramValue;
        } else {
            delete queryParams[paramName];
        }
    });

    router.get(url, queryParams, {
        preserveState: true,
        preserveScroll: true
    });
}

</script>

<template>
    <div class="mb-4" v-if="links && pageList.length > 1">
        <div class="flex justify-between items-center gap-1">
            <button type="button" v-for="item in pageList" @click="getThisPage(item.url)" class="rounded-md select-none"
                :class="{ 'bg-roseh-pink text-white px-3 py-1': item.active }">
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

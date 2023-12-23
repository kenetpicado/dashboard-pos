<template>
    <div class="w-full py-2 px-4 mb-4" v-if="links && pageList.length > 1">
        <div class="flex justify-center items-center gap-2">
            <span v-for="item in pageList" @click="getThisPage(item.url)" class="px-3 rounded-md"
                :class="{ 'bg-indigo-600 text-white border-2 border-indigo-600 font-bold': item.active, 'hover:bg-indigo-50 border-2 border-indigo-300 text-indigo-300': !item.active }" role="button">
                {{ item.label }}
            </span>
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

    const paramNames = ['search', 'user_id', 'from', 'to', 'type', 'category_id'];

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

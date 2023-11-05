<template>
    <Head :title="head"></Head>

    <nav class="flex items-center bg-white h-14 sticky top-0 shadow-lg z-10">
        <div class="flex gap-4 items-center container mx-auto px-4">
            <div class="h-9 w-9">
                <img class="h-full w-full object-contain" src="/shop.png" alt="logo" />
            </div>
            <span class="font-semibold text-roseh-blue">
                {{ $page.props.app_name }}
            </span>
        </div>
    </nav>

    <slot></slot>

</template>

<script setup>
import { Head } from '@inertiajs/vue3';

defineProps({
    head: {
        type: String,
        required: false
    }
});

</script>

<style>
.hide-scrollbar::-webkit-scrollbar {
    display: none;
}

.hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
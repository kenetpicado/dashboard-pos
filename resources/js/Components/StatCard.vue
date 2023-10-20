<template>
    <div class="bg-white h-20 rounded-xl">
        <component :is="stat.href ? Link : 'div'" :href="stat.href" class="flex items-center h-full p-4 gap-3">
            <span v-if="stat.icon" class="bg-indigo-50 rounded-full p-2">
                <component :is="stat.icon ?? DEFAULT_ICON" size="30" class="text-indigo-600" />
            </span>
            <div>
                <div class="font-bold text-lg">
                    {{ stat.value }}
                </div>
                <div class="text-sm text-gray-600">
                    {{ stat.title }}
                </div>
            </div>
        </component>
    </div>
</template>

<script setup>
import { IconInfoCircle } from '@tabler/icons-vue';
import { Link } from '@inertiajs/vue3';

const DEFAULT_ICON = IconInfoCircle;

const props = defineProps({
    stat: {
        type: Object,
        required: true,
    },
})

</script>
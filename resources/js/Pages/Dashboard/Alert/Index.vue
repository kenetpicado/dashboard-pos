<template>
    <AppLayout title="Alertas" :breads="breads">
        <template #header>
            <span class="title">
                Alertas
            </span>
        </template>

        <div class="mb-6 text-end">
            <span class="text-sm" role="button" @click="markAsRead">Marcar todas como leidas</span>
        </div>

        <div class="grid grid-cols-2 gap-4">
            <div v-for="a in alerts" class="p-4 rounded-xl bg-white flex justify-between flex-col" role="alert">
                <div class="flex items-center gap-2 justify-between mb-4">
                    <h3 class="text-lg font-xl font-bold text-gray-600">{{ a.name }}</h3>
                    <IconTrash role="button" @click="destroy(a.id)" />
                </div>
                <div class="mb-4 text-normal text-gray-600">
                    {{ a.description }}
                </div>
                <div class="text-sm text-gray-400">
                    {{ Carbon.create(a.created_at).format('m/d/Y H:i') }}
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import { IconTrash } from '@tabler/icons-vue';
import { Carbon } from '@/Use/Carbon';
import { router } from "@inertiajs/vue3";

defineProps({
    alerts: {
        type: Object,
        required: true,
    }
});

const breads = [
    {
        name: 'Inicio',
        route: route('dashboard.index'),
    },
    {
        name: 'Alertas',
        route: route('dashboard.alerts.index'),
    },
];

function destroy(id) {
    router.delete(route('dashboard.alerts.destroy', id), {
        preserveState: true,
    })
}

function markAsRead() {
    router.put(route('dashboard.alerts.mark-as-read'), {
        preserveState: true,
    })
}

</script>
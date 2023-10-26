<template>
    <AppLayout title="Mas vendidos" :breads="breads">
        <template #header>
            <span class="title">
                Mas vendidos
            </span>
        </template>

        <div class="grid grid-cols-3 gap-4">
            <div v-for="(product, index) in products" class="w-full rounded-lg p-4 bg-white mb-2 border-2">
                <div class="flex gap-2">
                    <div v-if="product.image" class="h-36 w-36 flex items-center justify-center">
                        <img :src="product.image" onerror="this.src='/not-found.jpg'" alt="Imagen"
                            class="max-h-full max-w-full rounded-lg border-2">
                    </div>
                    <div class="w-full flex flex-col justify-between">
                        <div class="mb-3">
                            <div class="text-lg mb-2 uppercase" role="button">
                                {{ product.name }}
                            </div>
                            <div class="text-sm text-gray-500">
                                {{ product.sku }}
                            </div>
                        </div>

                        <div class="flex items-center justify-between">
                            <div class="flex flex-col text-end text-xl font-bold">
                                {{ product.quantity.toLocaleString() }} vendidos
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';

defineProps({
    products: {
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
        name: 'Mas vendidos',
        route: route('dashboard.best-seller'),
    },
];

</script>
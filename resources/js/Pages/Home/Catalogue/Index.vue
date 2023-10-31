<template>
    <Head title="Catalogo"></Head>

    <nav class="flex items-center bg-white h-14 sticky top-0">
        <div class="flex gap-4 items-center container mx-auto px-4">
            <div class="h-8 w-8">
                <img class="h-full w-full" src="/shop.png" alt="logo" />
            </div>
            <span class="font-semibold text-roseh-blue">
                {{ $page.props.app_name }}
            </span>
        </div>
    </nav>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 container mx-auto">
        <div v-for="product in products.data" :key="product.id" class="flex max-w-md bg-white rounded-xl overflow-hidden">
            <img :src="product.image ?? '/not-found.jpg'" onerror="this.src='/not-found.jpg'" class="w-1/3 object-cover">
            <div class="w-4/3 p-3">
                <div class="flex flex-col justify-between h-full">
                    <span>
                        <div class="text-roseh-blue font-semibold text-normal uppercase">
                            {{ cutString(product.name) }}
                        </div>
                        <p class="text-roseh-pink mt-1 text-xs">
                            {{ product.sku }}
                        </p>
                    </span>
                    <div class="flex item-center justify-between mt-3 text-roseh-blue">
                        <span class="text-lg font-bold">
                            C${{ getFirstPrice(product.inventory) }}
                        </span>
                        <span v-if="product.discount" class="badge-pink">
                            C${{ product.discount }} off
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Head } from '@inertiajs/vue3';

defineProps({
    products: {
        type: Object,
        required: true
    }
})

function getFirstPrice(inventory) {
    if (inventory.length === 0) {
        return 0
    }

    return inventory[0].unit_price
}

function cutString(cadena, longitud = 40) {
    if (cadena.length <= longitud)
        return cadena;

    return cadena.substring(0, longitud) + '...';
}

</script>
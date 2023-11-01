<template>
    <CatalogueLayout head="Catalogo">
        <div class="container mx-auto p-4">
            <h1 class="mb-2 text-roseh-blue font-bold">Categorias</h1>
            <div class="flex gap-3 overflow-x-auto hide-scrollbar">
                <button type="button" v-for="c in categories" :class="currentTab == c.id ? 'active-tab' : 'inactive-tab'"
                    @click="currentTab = c.id">
                    {{ c.name }}
                </button>
            </div>
        </div>

        <div class="container mx-auto p-4">
            <h1 class="mb-2 text-roseh-blue font-bold">Medidas</h1>
            <div class="flex gap-3 overflow-x-auto hide-scrollbar">
                <button type="button" v-for="m in measures" :class="currentTab == m.name ? 'active-tab' : 'inactive-tab'"
                    @click="currentTab = m.name">
                    {{ m.name }}
                </button>
            </div>
        </div>

        <div class="p-4 container mx-auto">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <div v-for="product in products.data" :key="product.id"
                    class="flex max-w-md bg-white rounded-xl overflow-hidden"
                    @click="$inertia.visit(route('catalogue.show', product.id))">
                    <img :src="product.image ?? '/not-found.jpg'" onerror="this.src='/not-found.jpg'"
                        class="w-1/3 object-cover">
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

            <CatalogPaginator :links="products.links" />
        </div>
    </CatalogueLayout>
</template>

<script setup>
import { ref } from 'vue';
import CatalogPaginator from '@/Components/CatalogPaginator.vue';
import CatalogueLayout from '@/Layouts/CatalogueLayout.vue';

const props = defineProps({
    products: {
        type: Object,
        required: true
    },
    categories: {
        type: Object,
        required: true
    },
    measures: {
        type: Object,
        required: true
    },
})

const currentTab = ref(null)

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
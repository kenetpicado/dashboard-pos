<template>
    <CatalogueLayout head="Catalogo">
        <HorizontalItems title="Categorias">
            <button type="button" :class="queryParams.category_id == null ? 'active-tab' : 'inactive-tab'"
                @click="queryParams.category_id = null">
                Todas
            </button>
            <button type="button" v-for="c in categories" :class="queryParams.category_id == c.id ? 'active-tab' : 'inactive-tab'"
                @click="queryParams.category_id = c.id">
                {{ c.name }}
            </button>
        </HorizontalItems>

        <HorizontalItems title="Medidas">
            <button type="button" :class="queryParams.measure == null ? 'active-tab' : 'inactive-tab'" @click="queryParams.measure = null">
                Todas
            </button>
            <button type="button" v-for="m in measures" :class="queryParams.measure == m.name ? 'active-tab' : 'inactive-tab'"
                @click="queryParams.measure = m.name">
                {{ m.name }}
            </button>
        </HorizontalItems>

        <div class="p-4 container mx-auto">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4" v-if="products.data.length > 0">
                <ProductCard v-for="product in products.data" :key="product.id" :product="product" />
            </div>
            <div v-else class="text-center text-gray-500">
                No hay productos disponibles
            </div>

            <CatalogPaginator :links="products.links" />
        </div>
    </CatalogueLayout>
</template>

<script setup>
import { watch, reactive } from 'vue';
import CatalogPaginator from '@/Components/CatalogPaginator.vue';
import CatalogueLayout from '@/Layouts/CatalogueLayout.vue';
import ProductCard from '@/Components/ProductCard.vue';
import HorizontalItems from '@/Components/HorizontalItems.vue';
import { debounce } from "lodash";
import { router } from '@inertiajs/vue3';

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

const queryParams = reactive({
    category_id: null,
    measure: null
})

const searchParams = new URLSearchParams(window.location.search);

if (searchParams.get("category_id")) {
    queryParams.category_id = searchParams.get("category_id");
}

if (searchParams.get("measure")) {
    queryParams.measure = searchParams.get("measure");
}

const debouncedSearch = debounce(([category_id, measure]) => {
    if (!category_id) {
        delete queryParams.category_id;
    }

    if (!measure) {
        delete queryParams.measure;
    }

    router.get(route('catalogue.index'), queryParams, {
        preserveState: true,
        preserveScroll: true,
        only: ["products"]
    })
}, 500);

watch(() => ([queryParams.category_id, queryParams.measure]), debouncedSearch);

</script>
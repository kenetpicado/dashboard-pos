<template>
    <CatalogueLayout head="Detalles">
        <div class="container mx-auto p-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="flex justify-center">
                    <img :src="product.image ?? '/not-found.jpg'" onerror="this.src='/not-found.jpg'"
                        class="rounded-xl m:max-h-96">
                </div>
                <div class="bg-white p-4 rounded-xl h-full flex justify-center flex-col">
                    <div class="text-roseh-blue font-semibold text-normal uppercase">
                        {{ product.name }}
                    </div>
                    <p class="text-roseh-pink mt-1 mb-2 text-md">
                        {{ product.sku }}
                    </p>
                    <div class="flex items-center gap-2 mt-3 text-roseh-blue">
                        <span class="text-xl font-bold">
                            C${{ selectedInventoy.unit_price }}
                        </span>
                        <span v-if="product.discount" class="badge-pink">
                            C${{ product.discount }} off
                        </span>
                    </div>
                    <div class="flex gap-3 overflow-x-auto hide-scrollbar mt-6 mb-4 text-xs">
                        <button type="button" v-for="i in inventory"
                            :class="selectedInventoryId == i.id ? 'active-tab' : 'inactive-tab'"
                            @click="selectedInventoryId = i.id">
                            {{ i.measure }}
                        </button>
                    </div>
                    <div v-if="selectedInventoy.colors?.length > 0">
                        <h1 class="text-roseh-blue font-bold mb-2">Colores disponibles</h1>
                        <ColorList :colors="selectedInventoy.colors" />
                    </div>
                    <div v-if="mobile" class="mt-6">
                        <a :href="`https://wa.me/505${mobile}?text=${textMessage}`"
                            class="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg font-medium text-sm text-white hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 transition ease-in-out duration-150"
                            style="background-color: #075E54;">
                            <IconBrandWhatsapp class="mr-1" /> Comprar
                        </a>
                    </div>
                </div>
            </div>
            <h1 class="my-4 text-roseh-blue font-bold">Te puede interesar</h1>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <ProductCard v-for="product in related" :key="product.id" :product="product" />
            </div>

        </div>
    </CatalogueLayout>
</template>

<script setup>
import ColorList from '@/Components/ColorList.vue';
import ProductCard from '@/Components/ProductCard.vue';
import CatalogueLayout from '@/Layouts/CatalogueLayout.vue';
import { computed, ref } from 'vue';
import { IconBrandWhatsapp } from '@tabler/icons-vue';

const props = defineProps({
    product: {
        type: Object,
        required: true
    },
    inventory: {
        type: Object,
        required: true
    },
    related: {
        type: Object,
        required: true
    },
    mobile: {
        type: String,
        required: false
    }
})

const selectedInventoryId = ref(props.inventory[0].id);

const selectedInventoy = computed(() => {
    return props.inventory.find(i => i.id == selectedInventoryId.value);
})

const textMessage = computed(() => {
	return `Hola, quiero comprar:%20${props.product.name},%20Medida: ${selectedInventoy.value.measure}`;
});

</script>
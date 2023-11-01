<template>
    <CatalogueLayout head="Detalles">
        <div class="container mx-auto p-4">
            <img :src="product.image ?? '/not-found.jpg'" onerror="this.src='/not-found.jpg'"
                class="w-full object-cover rounded-xl">
            <div class="bg-white p-4 rounded-xl mt-4">
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
                <div class="flex gap-3 overflow-x-auto hide-scrollbar mt-6 mb-4">
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
            </div>
        </div>
    </CatalogueLayout>
</template>

<script setup>
import ColorList from '@/Components/ColorList.vue';
import CatalogueLayout from '@/Layouts/CatalogueLayout.vue';
import { computed, ref } from 'vue';

const props = defineProps({
    product: {
        type: Object,
        required: true
    },
    inventory: {
        type: Object,
        required: true
    },
})

const selectedInventoryId = ref(props.inventory[0].id);

const selectedInventoy = computed(() => {
    return props.inventory.find(i => i.id == selectedInventoryId.value);
})

</script>
<template>
    <div class="flex max-w-md bg-white rounded-xl overflow-hidden" role="button"
        @click="$inertia.visit(route('catalogue.show', product.id))">
        <img :src="product.image ?? '/not-found.jpg'" onerror="this.src='/not-found.jpg'" class="w-1/3 object-cover">
        <div class="w-4/3 p-3">
            <div class="flex flex-col justify-between h-full">
                <span>
                    <div v-if="product.is_new" class="text-xs font-semibold text-roseh-pink mb-2">
                        Nuevo!
                    </div>
                    <div v-else-if="product.has_new_inventory" class="text-xs font-semibold text-roseh-pink mb-2">
                        Nuevas existencias!
                    </div>
                    <div class="text-roseh-blue font-semibold text-normal uppercase">
                        {{ cutString(product.name) }}
                    </div>
                    <p class="text-roseh-pink mt-1 text-xs">
                        {{ product.sku }}
                    </p>
                </span>
                <div class="flex item-center justify-between mt-3 text-roseh-blue">
                    <span class="text-lg font-bold">
                        C${{ product.cheap_inventory.unit_price }}
                    </span>
                    <span v-if="product.discount" class="badge-pink">
                        C${{ product.discount }} off
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

defineProps({
    product: {
        type: Object,
        required: true
    }
})

function cutString(cadena, longitud = 40) {
    if (cadena.length <= longitud)
        return cadena;

    return cadena.substring(0, longitud) + '...';
}

</script>
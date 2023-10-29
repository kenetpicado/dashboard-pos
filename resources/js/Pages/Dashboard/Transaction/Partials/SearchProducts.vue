<template>
	<div>
		<InputForm placeholder="Buscar" v-model="queryParams.search"></InputForm>
		<table class="w-full border-collapse bg-white text-left text-sm text-gray-600 rounded-lg">
			<thead class="bg-gray-50">
				<tr>
					<th>#</th>
					<th>Producto</th>
					<th>Agregar</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-gray-100 border-t border-gray-100">
				<tr v-for="(product, index) in products">
					<td>
						<div v-if="product.image" class="h-36 w-36 flex items-center justify-center">
							<img :src="product.image" onerror="this.src='/not-found.jpg'" alt="Imagen"
								class="max-h-full max-w-full rounded-lg">
						</div>
					</td>
					<td>
						<div class="uppercase">
							{{ product.name }}
						</div>
						<div class="text-gray-400 flex items-center gap-1">
							{{ product.sku }}
						</div>
					</td>
					<td>
						<button class="primary-button" type="button" @click="$emit('setProduct', product)">
							<IconShoppingCartFilled size="20" />
						</button>
					</td>
				</tr>
				<tr v-if="products.length == 0" class="text-center">
					<td colspan="3">
						<span v-if="!queryParams.search && products.length == 0">
							Escriba el nombreo SKU del producto que desea buscar
						</span>
						<span v-else>
							No se han encontrado productos
						</span>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup>
import { IconShoppingCartFilled } from '@tabler/icons-vue';
import { reactive, watch } from 'vue';
import InputForm from '@/Components/Form/InputForm.vue';
import { router } from '@inertiajs/vue3'
import { debounce } from 'lodash'

const props = defineProps({
	products: {
		type: Object,
		required: false,
	},
});

const queryParams = reactive({
	search: '',
	type: null
})

const searchParams = new URLSearchParams(window.location.search);

if (searchParams.get("search")) {
	queryParams.search = searchParams.get("search")
}

if (searchParams.get("type")) {
	queryParams.type = searchParams.get("type")
}

const debouncedSearch = debounce((value) => {
    if (!value) {
        delete queryParams.search;
    }

    router.get(route('dashboard.transactions.create'), queryParams, {
		preserveState: true,
		preserveScroll: true,
		only: ["products"]
	})
}, 500);

watch(() => queryParams.search, debouncedSearch);

</script>
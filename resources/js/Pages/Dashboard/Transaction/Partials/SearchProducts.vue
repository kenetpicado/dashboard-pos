<template>
	<div>
		<InputForm placeholder="Buscar" v-model="queryParams.search" type="search"></InputForm>
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
					<td>{{ index + 1 }}</td>
					<td>
						<div>
							{{ product.name }}
						</div>
						<div class="text-gray-400 flex items-center gap-1">
							{{ product.sku }}
						</div>
					</td>
					<td>
						<button class="primary-button" type="button"
							@click="$emit('setProduct', product)">
							<IconShoppingCartFilled size="20" />
						</button>
					</td>
				</tr>
				<tr v-if="products.length == 0" class="text-center">
					<td colspan="3">No se han encontrado productos</td>
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

const props = defineProps({
	products: {
		type: Object,
		required: false,
	},
});

const queryParams = reactive({
	search: ''
})

const searchParams = new URLSearchParams(window.location.search);

if (searchParams.get("search")) {
	queryParams.search = searchParams.get("search")
}

watch(() => queryParams.search, (value) => {
	if (!value) {
		delete queryParams.search
	}

	router.get(route('dashboard.transactions.create', 'buy'), queryParams, {
		preserveState: true,
		preserveScroll: true,
		only: ["products"]
	})
})

</script>
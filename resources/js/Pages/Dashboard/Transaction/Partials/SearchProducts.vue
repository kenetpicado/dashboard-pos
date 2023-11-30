<template>
	<div>
		<div class="flex gap-4">
			<InputForm text="Buscar" placeholder="Buscar" v-model="queryParams.search"></InputForm>
			<SelectForm text="Categoria" v-model="queryParams.category_id" required>
				<option selected value="">Todas</option>
				<template v-for="item in $page.props.categories">
					<option :value="item.id">
						{{ item.name }}
					</option>
					<option v-for="children in item.childrens" :value="children.id">
						{{ children.name }}
					</option>
				</template>
			</SelectForm>
		</div>
		<table class="w-full border-collapse bg-white text-left text-sm text-gray-600 rounded-lg">
			<thead class="bg-gray-50">
				<tr>
					<th>#</th>
					<th>Producto</th>
					<th>Agregar</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-gray-100 border-t border-gray-100">
				<tr v-for="(product, index) in products.data">
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
						<div class="text-indigo-600 flex items-center gap-1 mt-2">
							{{ product.sku }}
						</div>
					</td>
					<td>
						<button class="primary-button" type="button" @click="$emit('setProduct', product)">
							<IconShoppingCartFilled size="20" />
						</button>
					</td>
				</tr>

				<tr v-if="products.data?.length == 0" class="text-center">
					<td colspan="3">
						<span v-if="!queryParams.search && products.data?.length == 0">
							Escriba el nombreo SKU del producto que desea buscar
						</span>
						<span v-else>
							No se han encontrado productos
						</span>
					</td>
				</tr>
			</tbody>
		</table>

		<ThePaginator :links="products.links"/>
	</div>
</template>

<script setup>
import { IconShoppingCartFilled } from '@tabler/icons-vue';
import { reactive, watch } from 'vue';
import InputForm from '@/Components/Form/InputForm.vue';
import { router } from '@inertiajs/vue3'
import { debounce } from 'lodash'
import SelectForm from '@/Components/Form/SelectForm.vue';
import ThePaginator from '@/Components/ThePaginator.vue';

const props = defineProps({
	products: {
		type: Object,
		required: false,
	},
});

const queryParams = reactive({
	search: '',
	type: null,
	category_id: null,
})

const searchParams = new URLSearchParams(window.location.search);

if (searchParams.get("search")) {
	queryParams.search = searchParams.get("search")
}

if (searchParams.get("type")) {
	queryParams.type = searchParams.get("type")
}

if (searchParams.get("category_id")) {
	queryParams.category_id = searchParams.get("category_id")
}

const debouncedSearch = debounce(([search, category_id]) => {
	if (!search) {
		delete queryParams.search;
	}

	if (!category_id) {
		delete queryParams.category_id;
	}

	router.get(route('dashboard.transactions.create'), queryParams, {
		preserveState: true,
		preserveScroll: true,
		only: ["products"]
	})
}, 500);

watch(() => [queryParams.search, queryParams.category_id], debouncedSearch);

</script>
<template>
	<AppLayout title="Create" :breads="breads">
		<template #header>
			<span class="title mt-1"> Create </span>
		</template>

		<div class="grid grid-cols-2 gap-4">
			<div>
				<InputForm placeholder="Buscar"></InputForm>
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
									<IconCheck v-if="isAdded(product.id)" size="20" color="#16a34a"/>
								</div>
							</td>
							<td>
								<button class="primary-button" type="button"
									@click="setCurrentProduct(product)">
									<IconShoppingCartFilled size="20" />
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div>
				<div v-if="selectedProducts.length == 0" class="text-center text-gray-400">
					No hay productos seleccionados
				</div>
				<div v-for="(product, index) in selectedProducts" class="w-full rounded-lg p-4 bg-white mb-2">
					<div class="flex gap-2">
						<div class="h-36 w-36 flex items-center justify-center">
							<img :src="getImage(product.image)" alt="Imagen" class="max-h-full max-w-full rounded-lg">
						</div>
						<div class="w-full flex flex-col justify-between">
							<div>
								<div class="text-lg font-semibold mb-2">
									{{ product.name }} - {{ product.measure }} ({{ product.quantity }})
								</div>
								<div class="text-gray-400">
									Costo: C${{ product.cost }}, Precio: C${{ product.price }}
								</div>
							</div>

							<div class="flex items-center justify-between">
								<div>
									<IconTrash role="button" @click="removeProduct(index)" />
								</div>
								<div class="flex flex-col text-end text-xl font-bold">
									C${{ (product.quantity * product.cost).toLocaleString('en-US') }}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div v-if="total > 0">
					<div class="flex justify-end my-8">
						<div class="text-xl font-bold">
							Total: C${{ total.toLocaleString('en-US') }}
						</div>
					</div>
					<div class="flex items-center justify-end gap-4">
						<button class="secondary-button">Cancelar</button>
						<button class="primary-button" type="button">Guardar</button>
					</div>
				</div>
			</div>
		</div>

		<FormModal :show="openModal" title="Producto" @onCancel="resetValues()" @onSubmit="addProduct()">
			<div class="mb-6">
				{{ currentProduct.name }}
			</div>
			<div class="grid grid-cols-2 gap-4">
				<InputForm text="Medida" v-model="currentProduct.measure" />
				<InputForm text="Cantidad" v-model="currentProduct.quantity" type="number" />
				<InputForm text="Costo (Unidad)" v-model="currentProduct.cost" type="number" />
				<InputForm text="Precio (Unidad)" v-model="currentProduct.price" type="number" />
			</div>
		</FormModal>
	</AppLayout>
</template>

<script setup>
import InputForm from '@/Components/Form/InputForm.vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import { ref, reactive, computed } from 'vue';
import { IconTrash, IconCheck, IconShoppingCartShare } from '@tabler/icons-vue';
import FormModal from '@/Components/Modal/FormModal.vue';
import { toast } from '@/Use/toast';
import { IconShoppingCartFilled } from '@tabler/icons-vue';

defineProps({
	products: {
		type: Object,
		required: true,
	},
});

const breads = [
	{
		name: 'Home',
		route: route('dashboard.users.index'),
	},
	{
		name: 'Transaccions',
		route: route('dashboard.transactions.index'),
	},
	{
		name: 'Create',
		route: route('dashboard.transactions.create'),
	},
];

const selectedProducts = ref([]);
const openModal = ref(false);

const originalObject = {
	id: null,
	name: null,
	image: null,
	quantity: 1,
	cost: 0,
	price: 0,
	measure: null,
};

const currentProduct = reactive({ ...originalObject });

function setCurrentProduct(product) {
	const alreadyExists = selectedProducts.value.find((p) => p.id === product.id);

	if (alreadyExists) {
		toast.error("Este producto ya ha sido agregado");
		return;
	}

	Object.assign(currentProduct, product);
	openModal.value = true;
}

const total = computed(() => {
	return selectedProducts.value.reduce((acc, product) => acc + (product.quantity * product.cost), 0);
});

function addProduct() {
	if (currentProduct.quantity <= 0) {
		toast.error("La cantidad debe ser mayor a 0");
		return;
	}

	if (currentProduct.cost <= 0) {
		toast.error("El costo debe ser mayor a 0");
		return;
	}

	if (currentProduct.price <= 0) {
		toast.error("El precio debe ser mayor a 0");
		return;
	}

	if (!currentProduct.measure) {
		toast.error("La medida es requerida");
		return;
	}

	selectedProducts.value.push({
		...currentProduct,
	});
	resetValues();
}

function resetValues() {
	Object.assign(currentProduct, originalObject);
	openModal.value = false;
}

function isAdded(id) {
	return selectedProducts.value.some((product) => product.id === id);
}

function removeProduct(index) {
	selectedProducts.value.splice(index, 1);
}

function getImage(value) {
	if (value) {
		return value;
	}

	return 'https://d1fufvy4xao6k9.cloudfront.net/images/landing/hockerty/shoes_special/custom_dress_shoes.jpg';
}

</script>

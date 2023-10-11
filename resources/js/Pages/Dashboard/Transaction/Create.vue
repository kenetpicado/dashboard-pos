<template>
	<AppLayout title="Create" :breads="breads">
		<template #header>
			<span class="title mt-1">{{ transactionTypes[type] }}</span>
		</template>

		<div class="grid grid-cols-2 gap-4">
			<SearchProducts :products="products" @setProduct="setCurrentProduct" />

			<BuyProducts v-if="props.type == 'buy'"
				:products="selectedProducts"
				:type="type"
				@edit="editProduct"
				@remove="removeProduct" />
		</div>

		<!-- MODAL TRANSACTION TYPE: BUY -->
		<FormModal :show="openModal" title="Producto" @onCancel="resetValues()" @onSubmit="addProduct()">
			<div class="mb-6">
				{{ currentProduct.name }}
			</div>
			<div class="grid grid-cols-2 gap-4">
				<InputForm text="Medida" v-model="currentProduct.measure" required />
				<InputForm text="Cantidad" v-model="currentProduct.quantity" type="number" required :min="1" />
				<InputForm text="Costo (Unidad)" v-model="currentProduct.cost" type="number" required :min="1" />
				<InputForm text="Precio (Unidad)" v-model="currentProduct.price" type="number" required :min="1" />
				<div class="flex justify-end col-span-2">
					<div class="text-xl font-bold">
						Total: {{ (currentProduct.quantity * currentProduct.cost).toLocaleString() }}
					</div>
				</div>
			</div>
		</FormModal>
	</AppLayout>
</template>

<script setup>
import InputForm from '@/Components/Form/InputForm.vue';
import FormModal from '@/Components/Modal/FormModal.vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import { toast } from '@/Use/toast';
import { reactive, ref } from 'vue';
import BuyProducts from "./Partials/BuyProducts.vue";
import SearchProducts from "./Partials/SearchProducts.vue";

const props = defineProps({
	products: {
		type: Object,
		required: false,
	},
	type: {
		type: String,
		required: true
	}
});

const transactionTypes = {
	buy: "Comprar",
	sell: "Vender"
}

const breads = [
	{
		name: 'Inicio',
		route: route('dashboard.users.index'),
	},
	{
		name: transactionTypes[props.type],
		route: route('dashboard.transactions.create', props.type),
	},
];

const selectedProducts = ref([]);
const openModal = ref(false);
const isEditing = ref(false);

const originalObject = {
	id: null,
	name: null,
	image: null,
	quantity: 1,
	cost: 10,
	price: 10,
	measure: "M",
};

const currentProduct = reactive({ ...originalObject });

function setCurrentProduct(product) {
	if (selectedProducts.value.find((p) => p.id === product.id)) {
		toast.error("Este producto ya ha sido agregado");
		return;
	}

	Object.assign(currentProduct, product);
	openModal.value = true;
}

function addProduct() {
	if (isEditing.value) {
		const index = selectedProducts.value.findIndex((product) => product.id === currentProduct.id);
		selectedProducts.value[index] = {...currentProduct};
		toast.success("Producto actualizado");
	} else {
		selectedProducts.value.push({...currentProduct});
		toast.success("Producto agregado");
	}

	resetValues();
}

function resetValues() {
	Object.assign(currentProduct, originalObject);
	isEditing.value = false;
	openModal.value = false;
}

function editProduct(index) {
	Object.assign(currentProduct, selectedProducts.value[index]);
	isEditing.value = true
	openModal.value = true;
}

function removeProduct(index) {
	selectedProducts.value.splice(index, 1);
	toast.success("Producto eliminado");
}

</script>
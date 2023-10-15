<template>
	<AppLayout :title="transactionTypes[type]" :breads="breads">
		<template #header>
			<span class="title mt-1">{{ transactionTypes[type] }}</span>
		</template>

		<div class="grid grid-cols-2 gap-4">
			<SearchProducts :products="products" @setProduct="setCurrentProduct" />

			<SelectedProducts
				:products="selectedProducts"
				:type="type"
				@edit="editProduct"
				@remove="removeProduct" />
		</div>

		<FormModal :show="openModal" :title="currentProduct.name" @onCancel="resetValues()" @onSubmit="addProduct()">
			<div class="grid grid-cols-2 gap-4">
				<template v-if="type == 'buy'">
					<InputForm text="Medida" v-model="currentProduct.measure" required />
					<InputForm text="Cantidad" v-model="currentProduct.quantity" type="number" required :min="1" />
					<InputForm text="Costo (Unidad)" v-model="currentProduct.cost" type="number" required :min="1" />
					<InputForm text="Precio (Unidad)" v-model="currentProduct.price" type="number" required :min="1" />
					<div class="flex justify-end col-span-2">
						<div class="text-xl font-bold">
							Total: {{ (currentProduct.quantity * currentProduct.cost).toLocaleString() }}
						</div>
					</div>
				</template>

				<template v-if="type == 'sell'">
					<SelectForm text="Medida" v-model="selectedMeasure" required>
						<option selected disabled value="">Seleccionar medida</option>
						<option v-for="item in inventory" :value="item.id">{{ item.measure }} - C${{ item.unit_price }}</option>
					</SelectForm>

					<SelectForm text="Cantidad" v-model="currentProduct.quantity" required>
						<option selected disabled value="">Seleccionar cantidad</option>
						<option v-for="item in availableQuantity" :value="item">{{ item }}</option>
					</SelectForm>

					<InputForm text="Precio (Unidad)" v-model="currentProduct.price" type="number" required />
					<div class="flex justify-end col-span-2">
						<div class="text-xl font-bold">
							Total: C${{ (currentProduct.quantity * currentProduct.price).toLocaleString() }}
						</div>
					</div>
				</template>

			</div>
		</FormModal>
	</AppLayout>
</template>

<script setup>
import InputForm from '@/Components/Form/InputForm.vue';
import SelectForm from '@/Components/Form/SelectForm.vue';
import FormModal from '@/Components/Modal/FormModal.vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import { toast } from '@/Use/toast';
import { computed, reactive, ref, watch } from 'vue';
import SearchProducts from "./Partials/SearchProducts.vue";
import SelectedProducts from "./Partials/SelectedProducts.vue";

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
const inventory = ref([]);
const selectedMeasure = ref(null);

const originalObject = {
	id: null,
	name: null,
	image: null,
	quantity: 1,
	cost: null,
	price: null,
	measure: null,
	inventory_id: null,
};

const currentProduct = reactive({ ...originalObject });

function setCurrentProduct(product) {
	if (selectedProducts.value.find((p) => p.id === product.id)) {
		toast.error("Este producto ya ha sido agregado");
		return;
	}

	currentProduct.id = product.id;
	currentProduct.name = product.name;
	currentProduct.image = product.image;
	currentProduct.quantity = 1;

	if (props.type == 'sell') {
		inventory.value = product.inventory;
		selectedMeasure.value = inventory.value[0].id;
		currentProduct.inventory_id = inventory.value[0].id;
	}

	openModal.value = true;
}

function addProduct() {
	if (isEditing.value) {
		const index = selectedProducts.value.findIndex((product) => product.id === currentProduct.id);
		selectedProducts.value[index] = { ...currentProduct };
		toast.success("Producto actualizado");
	} else {
		selectedProducts.value.push({ ...currentProduct });
		toast.success("Producto agregado");
	}

	resetValues();
}

function resetValues() {
	Object.assign(currentProduct, originalObject);
	isEditing.value = false;
	inventory.value = [];
	selectedMeasure.value = null;
	openModal.value = false;
}

function editProduct(index) {
	currentProduct.id = selectedProducts.value[index].id;
	currentProduct.name = selectedProducts.value[index].name;
	currentProduct.image = selectedProducts.value[index].image;
	currentProduct.quantity = selectedProducts.value[index].quantity;
	currentProduct.price = selectedProducts.value[index].price;

	if (props.type == 'sell') {
		inventory.value = props.products.find((item) => item.id == currentProduct.id).inventory;
		currentProduct.inventory_id = selectedProducts.value[index].inventory_id;
		selectedMeasure.value = selectedProducts.value[index].inventory_id;
	} else {
		currentProduct.cost = selectedProducts.value[index].cost;
		currentProduct.measure = selectedProducts.value[index].measure;
	}

	isEditing.value = true
	openModal.value = true;
}

function removeProduct(index) {
	selectedProducts.value.splice(index, 1);
	toast.success("Producto eliminado");
}

watch(() => selectedMeasure.value, (value) => {
	if (!value) {
		return;
	}

	const item = inventory.value.find((item) => item.id == value);

	currentProduct.measure = item.measure;
	currentProduct.price = item.unit_price;
	currentProduct.inventory_id = item.id;
});

const availableQuantity = computed(() => {
	if (inventory.value.length == 0 || !selectedMeasure.value) {
		return [1];
	}

	const q = inventory.value.find((item) => item.id == selectedMeasure.value).quantity;

	return Array.from({ length: q }, (_, i) => i + 1);
});

</script>
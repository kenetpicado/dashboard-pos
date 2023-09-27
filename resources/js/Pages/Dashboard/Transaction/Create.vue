<template>
	<AppLayout title="Create" :breads="breads">
		<template #header>
			<span class="title mt-1">Comprar</span>
		</template>

		<div class="grid grid-cols-2 gap-4">
			<SearchProducts :products="products" @setProduct="setCurrentProduct"/>
			<ListProducts :products="selectedProducts" :type="type"/>
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
import AppLayout from '@/Layouts/AppLayout.vue';
import { ref, reactive, computed, watch } from 'vue';
import { IconTrash, IconCheck } from '@tabler/icons-vue';
import FormModal from '@/Components/Modal/FormModal.vue';
import { toast } from '@/Use/toast';
import { router, useForm } from '@inertiajs/vue3'
import SearchProducts from "./Partials/SearchProducts.vue"
import ListProducts from "./Partials/ListProducts.vue"

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

const form = useForm({
	note: "",
	total: 0,
	products: null
})

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
	const alreadyExists = selectedProducts.value.find((p) => p.id === product.id);

	if (alreadyExists) {
		toast.error("Este producto ya ha sido agregado");
		return;
	}

	Object.assign(currentProduct, product);
	openModal.value = true;
}

function addProduct() {
	if (!currentProduct.measure) {
		toast.error("La medida es requerida");
		return;
	}

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

	if (isEditing.value) {
		const index = selectedProducts.value.findIndex((product) => product.id === currentProduct.id);
		selectedProducts.value[index] = {
			...currentProduct,
		};
		toast.success("Producto actualizado");
	} else {
		selectedProducts.value.push({
			...currentProduct,
		});
		toast.success("Producto agregado");
	}
	resetValues();
}

function resetValues() {
	Object.assign(currentProduct, originalObject);
	isEditing.value = false;
	openModal.value = false;
}

function isAdded(id) {
	return selectedProducts.value.some((product) => product.id === id);
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

function storeTransaction() {
	form.products = selectedProducts.value.map(function(product) {
		return {
			product_id: product.id,
			quantity: product.quantity,
			measure: product.measure,
			value: product.cost,
			price: product.price
		}
	})

	//form.total = total.value

	form.post(route("dashboard.transactions.store", props.type), {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => {
            toast.success("Transaccion relizada correctamente");
        },
    });
}

</script>
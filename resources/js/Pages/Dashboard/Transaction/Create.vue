<template>
	<AppLayout title="Create" :breads="breads">
		<template #header>
			<span class="title mt-1">Comprar</span>
		</template>

		<div class="grid grid-cols-2 gap-4">
			<SearchProducts :products="products" @setProduct="setCurrentProduct"/>
			<div>
				<div v-if="selectedProducts.length == 0" class="h-full text-center text-gray-400 flex items-center justify-center">
					No hay productos seleccionados
				</div>
				<div v-for="(product, index) in selectedProducts" class="w-full rounded-lg p-4 bg-white mb-2 border-2">
					<div class="flex gap-2">
						<div class="h-36 w-36 flex items-center justify-center">
							<img :src="getImage(product.image)" alt="Imagen" class="max-h-full max-w-full rounded-lg">
						</div>
						<div class="w-full flex flex-col justify-between">
							<div>
								<div class="text-lg font-semibold mb-2" @click="editProduct(index)" role="button">
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
				<div v-if="total > 0" class="mt-4">
					<InputForm placeholder="Notas" v-model="form.note"></InputForm>
					<div class="flex justify-end my-8">
						<div class="text-xl font-bold">
							Total: C${{ total.toLocaleString('en-US') }}
						</div>
					</div>
					<div class="flex items-center justify-end gap-4">
						<button class="secondary-button">Cancelar</button>
						<button class="primary-button" type="button" @click="storeTransaction">
							Guardar
						</button>
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

const props = defineProps({
	products: {
		type: Object,
		required: true,
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

const total = computed(() => {
	return selectedProducts.value.reduce((acc, product) => acc + (product.quantity * product.cost), 0);
});

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

function getImage(value) {
	if (value) {
		return value;
	}

	return 'https://d1fufvy4xao6k9.cloudfront.net/images/landing/hockerty/shoes_special/custom_dress_shoes.jpg';
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

	form.total = total.value

	form.post(route("dashboard.transactions.store", props.type), {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => {
            toast.success("Transaccion relizada correctamente");
        },
    });
}

</script>
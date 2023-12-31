<template>
	<div>
		<div v-if="products.length == 0" class="h-full text-center text-gray-400 flex items-center justify-center">
			No hay productos seleccionados
		</div>
		<div v-for="(product, index) in products" class="w-full rounded-lg p-4 bg-white mb-2 border-2">
			<div class="flex gap-2">
				<div v-if="product.image" class="h-36 w-36 flex items-center justify-center">
					<img :src="product.image" onerror="this.src='/not-found.jpg'" alt="Imagen"
						class="max-h-full max-w-full rounded-lg">
				</div>
				<div class="w-full flex flex-col justify-between">
					<div class="mb-3">
						<div class="text-lg font-semibold mb-2 uppercase" @click="$emit('edit', index)" role="button">
							{{ product.name }} - {{ product.measure }} ({{ product.quantity }})
						</div>
						<div class="text-gray-400">
							<span v-if="type == 'buy'">
								Costo: C${{ product.cost }},
							</span>
							<span>
								Precio: C${{ product.price }}
							</span>
						</div>
					</div>

					<ColorList  v-if="type == 'buy'" :colors="product.colors" class="mb-2" />

					<div class="flex items-center justify-between">
						<div>
							<IconTrash role="button" @click="$emit('remove', index)" class="text-red-300" />
						</div>
						<div v-if="type == 'buy'" class="flex flex-col text-end text-xl font-bold">
							C${{ (product.quantity * product.cost).toLocaleString('en-US') }}
						</div>
						<div v-if="type == 'sell'">
							<span v-if="product.discount > 0" class="text-red-300 text-sm">
								-C${{ product.discount }}
							</span>
							<span class="text-xl font-bold">
								C${{ (product.quantity * product.price).toLocaleString('en-US') }}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-if="total > 0" class="mt-4">
			<div class="grid grid-cols-2 gap-4">
				<InputForm text="Notas (Opcional)" v-model="form.note"></InputForm>
				<template v-if="type == 'sell'">
					<InputForm text="Cliente (Opcional)" v-model="form.client" />
					<InputForm text="Descuento C$" v-model="form.discount" />
					<InputForm text="Pago C$" :placeholder="`Todo: C$${total}`" v-model="form.payment" />
				</template>
			</div>

			<div v-if="form.payment" class="text-gray-400">
				Dejar el campo vacio si desea pagar todo el monto. De lo contrario especifique la cantidad que desea abonar.
				La transaccion se guardara como PENDIENTE.
			</div>

			<div v-if="type == 'sell'">
				<button type="button" @click.prevent="downloadProforma">Descargar Proforma</button>
			</div>

			<div class="flex justify-end my-8">
				<div class="text-xl font-bold">
					Total: C${{ total.toLocaleString('en-US') }}
				</div>
			</div>
			<div class="flex items-center justify-end gap-4">
				<button class="secondary-button">Cancelar</button>
				<button class="primary-button" type="button" @click="confirmStoreTransaction">
					Guardar
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed } from 'vue';
import InputForm from '@/Components/Form/InputForm.vue';
import { IconTrash } from '@tabler/icons-vue';
import { useForm } from '@inertiajs/vue3';
import { toast } from '@/Use/toast';
import { confirmAlert } from '@/Use/helpers';
import axios from 'axios';
import { Carbon } from '@/Use/Carbon';
import ColorList from '@/Components/ColorList.vue';

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

const form = useForm({
	type: props.type,
	discount: 0,
	note: "",
	client: "",
	total: 0,
	products: null,
	payment: null,
})

const total = computed(() => {
	if (props.type == 'buy') {
		return props.products.reduce((acc, product) => acc + (product.quantity * product.cost), 0) - (form.discount ?? 0);
	}

	return props.products.reduce((acc, product) => acc + (product.quantity * product.price - product.discount), 0) - (form.discount ?? 0);
});

function confirmStoreTransaction() {
	confirmAlert({
		onConfirm: () => {
			storeTransaction();
		},
	})
}

function storeTransaction() {
	formatInformation();

	form.post(route("dashboard.transactions.store"), {
		preserveScroll: true,
		preserveState: true,
		onSuccess: () => {
			toast.success("Transaccion relizada correctamente");
		},
	});
}

function formatInformation() {
	form.products = props.products.map(function (product) {
		return {
			product_id: product.id,
			quantity: product.quantity,
			measure: product.measure,
			cost: product.cost,
			price: product.price,
			inventory_id: product.inventory_id,
			discount: product.discount ?? 0,
			name: product.name,
			expired_at: product.expired_at,
			colors: product.colorsToRemove.length > 0 ? product.colors.filter(color => !product.colorsToRemove.includes(color)) : product.colors,
		}
	})

	form.total = total.value;

	form.client = form.client ? form.client.toUpperCase() : null;
}

function downloadProforma(event) {
	event.preventDefault();

	formatInformation();

	axios.post(route('dashboard.download.proforma'), form, { responseType: 'blob' })
		.then(response => {
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', `Proforma_${Carbon.create().format('m_d_Y_H_i')}.xlsx`);
			document.body.appendChild(link);
			link.click();
		})
		.catch(() => {
			toast.error("Ocurrio un error al descargar la proforma");
		});
}

</script>
<template>
	<div>
		<div v-if="products.length == 0" class="h-full text-center text-gray-400 flex items-center justify-center">
			No hay productos seleccionados
		</div>
		<div v-for="(product, index) in products" class="w-full rounded-lg p-4 bg-white mb-2 border-2">
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
			<!-- <InputForm placeholder="Notas" v-model="form.note"></InputForm> -->
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
</template>

<script setup>
import { computed } from 'vue';
import InputForm from '@/Components/Form/InputForm.vue';
import { IconTrash } from '@tabler/icons-vue';

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

function getImage(value) {
	if (value) {
		return value;
	}

	return 'https://d1fufvy4xao6k9.cloudfront.net/images/landing/hockerty/shoes_special/custom_dress_shoes.jpg';
}

const total = computed(() => {
	return props.products.reduce((acc, product) => acc + (product.quantity * product.cost), 0);
});
	
</script>
<template>
	<AppLayout title="Create" :breads="breads">
		<template #header>
			<span class="title mt-1"> Create </span>
		</template>

		<div class="flex gap-4 mb-4">
			<div class="w-full">
				<InputForm text="Search"></InputForm>
				<table class="w-full border-collapse bg-white text-left text-sm text-gray-600 rounded-lg">
					<thead class="bg-gray-50">
						<tr>
							<th>#</th>
							<th>Product</th>
							<th>Add</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-100 border-t border-gray-100">
						<tr v-for="(product, index) in products">
							<td>{{ index + 1 }}</td>
							<td>
								<div>
									{{ product.name }}
								</div>
								<div class="text-gray-400">
									{{ product.sku }}
								</div>
							</td>
							<td>
								<button class="primary-button" type="button" @click="addProduct(product)">Add</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="w-full">
				<table class="w-full border-collapse bg-white text-left text-sm text-gray-600 rounded-lg">
					<thead class="bg-gray-50">
						<tr>
							<th>Product</th>
							<th>Cant</th>
							<th>Value</th>
							<th>Total</th>
						</tr>
					</thead>
					<tbody class="">
						<tr v-if="selectedProducts.length == 0" class="text-center">
							<td colspan="4">
								No products selected
							</td>
						</tr>
						<tr v-else v-for="(product, index) in selectedProducts">
							<td>
								<span :tooltip="product.name">
									{{ product.name }}
								</span>
							</td>
							<td>
								<InputForm v-model="product.cant"></InputForm>
							</td>
							<td>
								<InputForm v-model="product.value"></InputForm>
							</td>
							<td>
								{{ product.cant * product.value }}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<!-- <FormSection title="Create" @onSubmit="onSubmit" @onCancel="onCancel">
			<InputForm text="Search"></InputForm>
			<div class="col-span-2">
				<div class="grid grid-cols-2 gap-4">
					<table class="w-full border-collapse bg-white text-left text-sm text-gray-600">
						<thead class="bg-gray-50">
							<tr>
								<th>#</th>
								<th>Product</th>
								<th>Add</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-gray-100 border-t border-gray-100">
							<tr v-for="(product, index) in products">
								<td>{{ index + 1 }}</td>
								<td>
									<div>
										{{ product.name }}
									</div>
									<div class="text-gray-400">
										{{ product.sku }}
									</div>
								</td>
								<td>
									<button class="primary-button" type="button" @click="addProduct(product)">Add</button>
								</td>
							</tr>
						</tbody>
					</table>

					<table class="w-full border-collapse bg-white text-left text-sm text-gray-600">
						<thead class="bg-gray-50">
							<tr>
								<th>Product</th>
								<th>Cant</th>
								<th>Value</th>
								<th>Total</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-gray-100 border-t border-gray-100">
							<tr v-if="selectedProducts.length == 0" class="text-center">
								<td colspan="4">
									No products selected
								</td>
							</tr>
							<tr v-else v-for="(product, index) in selectedProducts">
								<td>
									<span :tooltip="product.name">
										{{ getResumeName(product.name) }}
									</span>
								</td>
								<td>
									<InputForm v-model="product.cant"></InputForm>
								</td>
								<td>
									<InputForm v-model="product.value"></InputForm>
								</td>
								<td>
									{{ product.cant * product.value }}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</FormSection> -->
	</AppLayout>
</template>

<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import FormSection from '@/Components/Form/FormSection.vue';
import InputForm from '@/Components/Form/InputForm.vue';
import { ref } from 'vue';
import { IconHome, IconLogout, IconUser, IconPlus } from '@tabler/icons-vue';

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

const activeTab = ref(1);
const selectedProducts = ref([]);

function getResumeName($name) {
	if ($name.length <= 20) {
		return $name;
	}
	return $name.substring(0, 20) + "...";
}

function addProduct(product) {
	selectedProducts.value
		.push({
			id: product.id,
			name: product.name,
			cant: 1,
			value: 0,
		});
}

</script>

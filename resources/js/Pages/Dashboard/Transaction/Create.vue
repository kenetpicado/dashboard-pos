<template>
	<AppLayout title="Create" :breads="breads">
		<template #header>
			<span class="title mt-1"> Create </span>
		</template>
		<FormSection title="Create" @onSubmit="onSubmit" @onCancel="onCancel">
            <InputForm text="Name" required />
            <InputForm text="Name" required />
        </FormSection>
	</AppLayout>
</template>

<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import FormSection from '@/Components/Form/FormSection.vue';
import InputForm from '@/Components/Form/InputForm.vue';
import { ref } from 'vue';
import { IconHome, IconLogout, IconUser } from '@tabler/icons-vue';


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

</script>

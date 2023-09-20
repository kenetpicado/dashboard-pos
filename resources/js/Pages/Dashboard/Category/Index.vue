<template>
    <AppLayout title="Categories" :breads="breads">

        <template #header>
            <span class="title">
                Categories
            </span>
            <AddButton @click="openModal = true" />
        </template>

        <TableSection>
            <template #header>
                <th>Nombre</th>
                <th>Acciones</th>
            </template>

            <template #body>
            	<template v-for="(category, index) in categories">
	                <tr class="hover:bg-gray-50">
	                    <td>
	                    	<span class="font-semibold">{{ category.name }}</span>
	                    </td>
	                    <td>
	                        <div class="flex gap-4">
	                            <IconPencil role="button" @click="edit(category)"/>
	                            <IconTrash role="button" @click="destroy(category.id)" />
	                        </div>
	                    </td>
	                </tr>
	                <tr class="hover:bg-gray-50" v-for="(children, index) in category.childrens">
	                    <td>
	                    	<span class="flex items-center gap-3">
	                    		<IconCornerDownRight/>
	                    		<span>{{ children.name }}</span>
	                    	</span>
	                    </td>
	                    <td>
	                        <div class="flex gap-4">
	                            <IconPencil role="button" @click="edit(children)"/>
	                            <IconTrash role="button" @click="destroy(children.id)" />
	                        </div>
	                    </td>
	                </tr>
                </template>
                <tr v-if="categories.length == 0">
                    <td colspan="3" class="text-center">No data to display</td>
                </tr>
            </template>
        </TableSection>

        <FormModal :show="openModal" title="Category" @onCancel="resetValues()" @onSubmit="onSubmit()">
            <InputForm text="Name" v-model="form.name" />
            <SelectForm v-model="form.parent_id" text="Parent category" name="parent_id">
            	<option selected value="">None</option>
            	<option v-for="category in categories" :value="category.id">{{ category.name }}</option>
            </SelectForm>
        </FormModal>

    </AppLayout>
</template>

<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import TableSection from '@/Components/TableSection.vue';
import { IconPencil, IconTrash, IconCornerDownRight } from '@tabler/icons-vue';
import AddButton from '@/Components/Buttons/AddButton.vue';
import FormModal from '@/Components/Modal/FormModal.vue';
import InputForm from '@/Components/Form/InputForm.vue';
import SelectForm from "@/Components/Form/SelectForm.vue"
import { ref } from 'vue';
import { useCategory } from '@/Composables/useCategory.js';

defineProps({
    categories: {
        type: Object,
        required: true,
    }
});

const breads = [
    {
        name: 'Home',
        route: route('dashboard.users.index'),
    },
    {
        name: 'Categories',
        route: route('dashboard.categories.index'),
    },
];

const isNew = ref(true)

const openModal = ref(false);

function edit(c) {
    form.id = c.id;
    form.name = c.name;
    form.parent_id = c.parent_id 
    openModal.value = true;
    isNew.value = false
}

function onSubmit() {
    if (isNew.value) {
        store(resetValues)
    } else {
        update(resetValues)
    }
}

const { store, update, destroy, form} = useCategory();
 
function resetValues() {
	openModal.value = false
	isNew.value = true
	form.reset()
}

</script>
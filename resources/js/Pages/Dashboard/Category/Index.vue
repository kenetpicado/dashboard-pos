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
                <th>Accciones</th>
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

        <FormModal :show="openModal" title="Category" @onCancel="resetValues()" @onSubmit="action">
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
import { useForm } from '@inertiajs/vue3';
import { toast } from '@/Use/toast';
import { confirmAlert } from '@/Use/helpers';

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

const form = useForm({
    id: '',
    name: '',
    parent_id: null
});

const openModal = ref(false);

function edit(c) {
    form.id = c.id;
    form.name = c.name;
    form.parent_id = c.parent_id
    openModal.value = true;
    isNew.value = false
}

const action = () => isNew.value ? store() : update();

function store() {
    form.post(route('dashboard.categories.store'), {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => {
            toast.success('Saved successfully');
            resetValues()
        },
    });
}

function update() {
    form.put(route('dashboard.categories.update', form.id), {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => {
            toast.success('Saved successfully');
            resetValues()
        },
    });
}

function resetValues() {
	openModal.value = false
	isNew.value = true
	form.reset()
}

function destroy(id) {
    confirmAlert({
        message: 'Are you sure you want to delete this category?',
        onConfirm: () => {
            form.delete(route('dashboard.categories.destroy', id), {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    toast.success('Deleted successfully');
                },
            });
        },
    })
}

</script>
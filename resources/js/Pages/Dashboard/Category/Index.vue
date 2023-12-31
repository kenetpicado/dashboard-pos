<template>
    <AppLayout title="Categorias" :breads="breads">

        <template #header>
            <span class="title">
                Categorias
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
                                <IconPencil role="button" @click="edit(category)" />
                                <IconTrash role="button" @click="destroy(category.id)" />
                            </div>
                        </td>
                    </tr>
                    <tr class="hover:bg-gray-50" v-for="(children, index) in category.childrens">
                        <td>
                            <span class="ml-4">
                                {{ children.name }}
                            </span>
                        </td>
                        <td>
                            <div class="flex gap-4">
                                <IconPencil size="22" role="button" @click="edit(children)" />
                                <IconTrash size="22" role="button" @click="destroy(children.id)" />
                            </div>
                        </td>
                    </tr>
                </template>
                <tr v-if="categories.length == 0">
                    <td colspan="3" class="text-center">No data to display</td>
                </tr>
            </template>
        </TableSection>

        <FormModal :show="openModal" title="Categoria" @onCancel="resetValues()" @onSubmit="onSubmit()">
            <InputForm text="Nombre" name="name" v-model="form.name" />
            <SelectForm v-model="form.parent_id" text="Categoria padre" name="parent_id">
                <option selected value="">Ninguna</option>
                <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
            </SelectForm>
        </FormModal>

    </AppLayout>
</template>

<script setup>
import AddButton from '@/Components/Buttons/AddButton.vue';
import InputForm from '@/Components/Form/InputForm.vue';
import SelectForm from "@/Components/Form/SelectForm.vue";
import FormModal from '@/Components/Modal/FormModal.vue';
import TableSection from '@/Components/TableSection.vue';
import { useCategory } from '@/Composables/useCategory.js';
import AppLayout from '@/Layouts/AppLayout.vue';
import { IconPencil, IconTrash } from '@tabler/icons-vue';
import { ref } from 'vue';

defineProps({
    categories: {
        type: Object,
        required: true,
    }
});

const breads = [
    {
        name: 'Inicio',
        route: route('dashboard.index'),
    },
    {
        name: 'Categorias',
        route: route('dashboard.categories.index'),
    },
];

const isNew = ref(true)
const { store, update, destroy, form } = useCategory();
const openModal = ref(false);

function edit(c) {
    Object.assign(form, c)
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

function resetValues() {
    openModal.value = false
    isNew.value = true
    form.reset()
}

</script>
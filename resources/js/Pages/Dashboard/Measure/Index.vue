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
            	<th>#</th>
                <th>Nombre</th>
                <th>Acciones</th>
            </template>

            <template #body>
                <template v-for="(m, index) in measures.data">
                    <tr class="hover:bg-gray-50">
                    	<td>{{ m.id }}</td>
                        <td>
                            <span class="font-semibold">{{ m.name }}</span>
                        </td>
                        <td>
                            <div class="flex gap-4">
                                <IconPencil role="button" @click="edit(m)" />
                                <IconTrash role="button" @click="destroy(m.id)" />
                            </div>
                        </td>
                    </tr>
                </template>
                <tr v-if="measures.data.length == 0">
                    <td colspan="3" class="text-center">No hay datos que mostrar</td>
                </tr>
            </template>

            <template #paginator>
                <ThePaginator :links="measures.links" />
            </template>
        </TableSection>

        <FormModal :show="openModal" title="Medida" @onCancel="resetValues()" @onSubmit="onSubmit()">
            <InputForm text="Name" v-model="form.name" />
        </FormModal>

    </AppLayout>
</template>

<script setup>
import AddButton from '@/Components/Buttons/AddButton.vue';
import InputForm from '@/Components/Form/InputForm.vue';
import FormModal from '@/Components/Modal/FormModal.vue';
import TableSection from '@/Components/TableSection.vue';
import ThePaginator from '@/Components/ThePaginator.vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import { confirmAlert } from '@/Use/helpers';
import { toast } from '@/Use/toast';
import { router, useForm } from '@inertiajs/vue3';
import { IconPencil, IconTrash } from '@tabler/icons-vue';
import { ref } from 'vue';

defineProps({
    measures: {
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
        name: 'Medidas',
        route: route('dashboard.measures.index'),
    },
];

const isNew = ref(true)
const openModal = ref(false);

const form = useForm({
    id: "",
    name: "",
});

function edit(c) {
    Object.assign(form, c)
    openModal.value = true;
    isNew.value = false
}

function onSubmit() {
    form.name = form.name.toUpperCase()
    if (isNew.value) {
        form.post(route("dashboard.measures.store"), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                toast.success("Medida agregada");
                resetValues()
            },
        });
    } else {
        form.put(route('dashboard.measures.update', form.id), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                toast.success('Medida actualizada');
                resetValues()
            },
        });
    }
}

function resetValues() {
    openModal.value = false
    isNew.value = true
    form.reset()
}

function destroy(id) {
    confirmAlert({
        onConfirm: () => {
            router.delete(route('dashboard.measures.destroy', id), {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    toast.success('Medida eliminada');
                },
            });
        },
    })
}

</script>
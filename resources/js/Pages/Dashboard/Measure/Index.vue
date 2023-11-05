<template>
    <AppLayout title="Medidas" :breads="breads">

        <template #header>
            <span class="title">
                Medidas
            </span>
            <AddButton @click="openModal = true" />
        </template>

        <div class="grid grid-cols-5 gap-4 mb-4 text-gray-600">
            <div v-for="(m, index) in measures.data" class="bg-white px-4 py-6 rounded-xl">
                <div class="flex justify-between items-center">
                    <div class="flex gap-2 items-center">
                        <span class="font-bold">{{ m.name }}</span>
                        <IconEdit size="20" role="button" @click="edit(m)" />
                    </div>
                    <span tooltip="Eliminar" role="button">
                        <IconTrash @click="destroy(m.id)" class="text-red-200" />
                    </span>
                </div>
            </div>
        </div>

        <ThePaginator :links="measures.links" />

        <FormModal :show="openModal" title="Medida" @onCancel="resetValues()" @onSubmit="onSubmit()">
            <InputForm text="Name" v-model="form.name" />
        </FormModal>

    </AppLayout>
</template>

<script setup>
import AddButton from '@/Components/Buttons/AddButton.vue';
import InputForm from '@/Components/Form/InputForm.vue';
import FormModal from '@/Components/Modal/FormModal.vue';
import ThePaginator from '@/Components/ThePaginator.vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import { confirmAlert } from '@/Use/helpers';
import { toast } from '@/Use/toast';
import { router, useForm } from '@inertiajs/vue3';
import { IconEdit, IconTrash } from '@tabler/icons-vue';
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
    form.name = form.name.toUpperCase().replace(/\s/g, "-")
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
<template>
    <AppLayout title="Usuarios" :breads="breads">

        <template #header>
            <span class="title">
                Usuarios
            </span>
            <AddButton @click="openModal = true" />
        </template>

        <TableSection>
            <template #header>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Acciones</th>
            </template>

            <template #body>
                <tr v-for="(user, index) in users" class="hover:bg-gray-50">
                    <td>
                        {{ user.id }}
                    </td>
                    <td>
                        {{ user.name }}
                    </td>
                    <td>
                        {{ user.email }}
                    </td>
                    <td>
                        <div class="flex gap-2">
                            <IconPencil role="button" @click="edit(user)" />
                            <IconTrash role="button" @click="destroy(user.id)" />
                        </div>
                    </td>
                </tr>
                <tr v-if="users.length == 0">
                    <td colspan="4" class="text-center">No hay datos que mostrar</td>
                </tr>
            </template>
        </TableSection>

        <FormModal :show="openModal" title="Usuario" @onCancel="resetValues()" @onSubmit="onSubmit">
            <InputForm text="Name" v-model="form.name" required />
            <InputForm text="Email" v-model="form.email" type="email" required />
            <template v-if="isNew">
                <InputForm text="Password" v-model="form.password" type="password" required />
                <InputForm text="Password confirmation" v-model="form.password_confirmation" type="password" required />
            </template>
        </FormModal>

    </AppLayout>
</template>

<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import TableSection from '@/Components/TableSection.vue';
import { IconPencil, IconTrash } from '@tabler/icons-vue';
import AddButton from '@/Components/Buttons/AddButton.vue';
import FormModal from '@/Components/Modal/FormModal.vue';
import InputForm from '@/Components/Form/InputForm.vue';
import { ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
import { toast } from '@/Use/toast';
import { confirmAlert } from '@/Use/helpers';

defineProps({
    users: {
        type: Object,
        required: true,
    }
});

const breads = [
    {
        name: 'Inicio',
        route: route('dashboard.users.index'),
    },
    {
        name: 'Usuarios',
        route: route('dashboard.users.index'),
    },
];

const form = useForm({
    id: null,
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
});

const openModal = ref(false);
const isNew = ref(true);

function edit(user) {
    form.id = user.id;
    form.name = user.name;
    form.email = user.email;
    openModal.value = true;
    isNew.value = false;
}

function onSubmit() {
    if (isNew.value) {
        form.post(route('dashboard.users.store'), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                toast.success('Usuario agregado');
                resetValues();
            },
        });
    } else {
        form.put(route('dashboard.users.update', form.id), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                toast.success('Usuario actualizado');
                resetValues();
            },
        });
    }
}

function destroy(id) {
    confirmAlert({
        onConfirm: () => {
            form.delete(route('dashboard.users.destroy', id), {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    toast.success('Usuario eliminado');
                },
            });
        },
    })
}

const resetValues = () => {
    openModal.value = false;
    isNew.value = true;
    form.reset();
}

</script>
<template>
    <AppLayout title="Pagos" :breads="breads">
        <template #header>
            <span class="title">
                Pagos
            </span>
            <AddButton @click="openModal = true" />
        </template>

        <TableSection>
            <template #header>
                <th>Fecha</th>
                <th>Valor</th>
                <th>Acciones</th>
            </template>

            <template #body>
                <tr v-for="(p, index) in payments" class="hover:bg-gray-50">
                    <td>
                        <DateColumn :date="p.created_at" />
                    </td>
                    <td>
                        <span class="font-bbold">C${{ p.value }}</span>
                    </td>
                    <td>
                        <div class="flex gap-2">
                            <label tooltip="Editar">
                                <IconPencil size="22" role="button" @click="edit(p)" />
                            </label>
                            <label tooltip="Eliminar">
                                <IconTrash size="22" role="button" @click="destroy(p.id)" />
                            </label>
                        </div>
                    </td>
                </tr>
                <tr v-if="payments.length == 0">
                    <td colspan="3" class="text-center">No hay datos que mostrar</td>
                </tr>
            </template>
        </TableSection>

        <FormModal :show="openModal" title="Product" @onCancel="resetValues" @onSubmit="onSubmit">
            <InputForm text="Cantidad C$" v-model="form.value" type="number" :min="1" />
        </FormModal>

    </AppLayout>
</template>

<script setup>
import AddButton from '@/Components/Buttons/AddButton.vue';
import DateColumn from "@/Components/DateColumn.vue";
import InputForm from '@/Components/Form/InputForm.vue';
import FormModal from '@/Components/Modal/FormModal.vue';
import TableSection from '@/Components/TableSection.vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import { confirmAlert } from '@/Use/helpers';
import { toast } from '@/Use/toast';
import { useForm } from '@inertiajs/vue3';
import { IconPencil, IconTrash } from '@tabler/icons-vue';
import { ref } from 'vue';

const props = defineProps({
    transaction: {
        type: Object,
        required: true,
    },
    payments: {
        type: Object,
        required: true,
    },
});

const breads = [
{
        name: 'Inicio',
        route: route('dashboard.users.index'),
    },
    {
        name: 'Pendientes',
        route: route('dashboard.pending.index'),
    },
    {
        name: 'Pagos',
        route: route('dashboard.pending.show', props.transaction.id),
    },
];

const openModal = ref(false);
const isNew = ref(true);

const form = useForm({
    id: null,
    value: 0,
    transaction_id: props.transaction.id,
});

function resetValues() {
    form.reset();
    isNew.value = true;
    openModal.value = false;
}

function onSubmit() {
    if (isNew.value) {
        form.post(route('dashboard.payments.store'), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                toast.success('Pago creado con éxito');
                resetValues();
            },
        });
    } else {
        form.put(route('dashboard.payments.update', form.id), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                toast.success('Pago actualizado con éxito');
                resetValues();
            },
        });
    }
}

function edit(payment) {
    Object.assign(form, payment);
    isNew.value = false;
    openModal.value = true;
}

function destroy(id) {
    confirmAlert({
        message: '¿Estás seguro de eliminar este pago?',
        onConfirm: () => {
            form.delete(route('dashboard.payments.destroy', id), {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    toast.success('Pago eliminado con éxito');
                },
            });
        },
    })
}

</script>
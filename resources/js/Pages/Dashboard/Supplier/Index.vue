<template>
    <AppLayout title="Suppliers" :breads="breads">

        <template #header>
            <span class="title">
                Suppliers
            </span>
            <AddButton @click="openModal = true" />
        </template>

        <TableSection>
            <template #header>
                <th>Nombre</th>
                <th>Contacto</th>
                <th>RUC</th>
                <th>Accciones</th>
            </template>

            <template #body>
                <tr class="hover:bg-gray-50" v-for="supplier in suppliers">
                    <td>
                        <span class="font-semibold">{{ supplier.name }}</span>
                    </td>
                    <td>
                        {{ supplier.contact }}
                    </td>
                    <td>
                        {{ supplier.ruc }}
                    </td>
                    <td>
                        <div class="flex gap-4">
                            <IconPencil role="button" @click="edit(supplier)"/>
	                        <IconTrash role="button" @click="destroy(supplier.id)" />
                        </div>
                    </td>
                </tr>
                <tr v-if="suppliers.length == 0">
                    <td colspan="4" class="text-center">No data to display</td>
                </tr>
            </template>
        </TableSection>

        <FormModal :show="openModal" title="Suppliers" @onCancel="resetValues()" @onSubmit="action">
            <InputForm text="Name" v-model="form.name" />
            <InputForm text="Contact" v-model="form.contact" />
            <InputForm text="RUC" v-model="form.ruc" />
             <div class="text-lg font-medium text-gray-600 mb-5 mt-6">
                Payment Terms
            </div>
            <InputForm text="Deadline" v-model="form.payment_terms.deadline" />
            <div class="grid grid-cols-2 gap-4">
                <InputForm text="Method" v-model="form.payment_terms.method" />
                <InputForm text="Currency" v-model="form.payment_terms.currency" />
            </div>
        </FormModal>
    </AppLayout>
</template>

<script setup>
import AddButton from '@/Components/Buttons/AddButton.vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import FormModal from '@/Components/Modal/FormModal.vue';
import InputForm from '@/Components/Form/InputForm.vue';
import { ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
import { toast } from '@/Use/toast';
import TableSection from '@/Components/TableSection.vue';
import { IconPencil } from '@tabler/icons-vue';
import { IconTrash } from '@tabler/icons-vue';
import { confirmAlert } from '@/Use/helpers';

defineProps({
    suppliers: {
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
        name: 'Suppliers',
        route: route('dashboard.suppliers.index'),
    },
];

const isNew = ref(true);

const form = useForm({
    id: '',
    name: '',
    contact: '',
    ruc: '',
    payment_terms: {
        deadline: '',
        method: '',
        currency: ''
    }
});

const openModal = ref(false);

function edit(supplier) {
    form.id = supplier.id;
    form.name = supplier.name;
    form.contact = supplier.contact;
    form.ruc = supplier.ruc;
    form.payment_terms.deadline = supplier.payment_terms.deadline
    form.payment_terms.method = supplier.payment_terms.method
    form.payment_terms.currency = supplier.payment_terms.currency
    openModal.value = true;
    isNew.value = false;
}

const action = () => isNew.value ? store() : update();

function store() {
    form.post(route('dashboard.suppliers.store'), {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => {
            toast.success('Saved successfully');
            resetValues()
        },
    });
}

function update() {
    form.put(route('dashboard.suppliers.update', form.id), {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => {
            toast.success('Updated successfully');
            resetValues()
        },
    });
}

function resetValues() {
    openModal.value = false;
    isNew.value = true
    form.reset();
}

function destroy(id) {
    confirmAlert({
        message: 'Are you sure you want to delete this category?',
        onConfirm: () => {
            form.delete(route('dashboard.suppliers.destroy', id), {
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
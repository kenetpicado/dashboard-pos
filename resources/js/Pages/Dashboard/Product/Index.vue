<template>
    <AppLayout title="Products" :breads="breads">
        <template #header>
            <span class="title">
                Products
            </span>
            <add-button :href="route('dashboard.products.create')" />
        </template>

        <TableSection>
            <template #header>
                <th>ID</th>
                <th>Nombre</th>
                <th>SKU</th>
                <th>Proveedor</th>
                <th>Notas</th>
                <th>Accciones</th>
            </template>

            <template #body>
                <tr v-for="(product, index) in products" class="hover:bg-gray-50">
                    <td>
                        {{ product.id }}
                    </td>
                    <td>
                        {{ product.name }}
                    </td>
                    <td>
                        {{ product.sku }}
                    </td>
                    <td>
                        {{ product.supplier ? product.supplier.name : 'N/A' }}
                    </td>
                    <td>
                        {{ product.notes }}
                    </td>
                    <td>
                        <div class="flex gap-2">
                            <IconPencil role="button" @click="edit(product)" />
                            <IconTrash role="button" @click="destroy(product.id)" />
                        </div>
                    </td>
                </tr>
                <tr v-if="products.length == 0">
                    <td colspan="4" class="text-center">No data to display</td>
                </tr>
            </template>
        </TableSection>

        <FormModal :show="openModal" title="Edit" @onCancel="openModal = false" @onSubmit="onSubmit">
            <InputForm text="Name" v-model="form.name" />
            <InputForm text="Email" v-model="form.sku" />
            <SelectForm v-model="form.supplier_id" text="Supplier" name="supplier_id">
            <option selected value="">None</option>
            <option v-for="supplier in suppliers" :value="supplier.id">{{ supplier.name }}</option>
            </SelectForm>
            <InputForm text="Description" v-model="form.description" />
            <InputForm text="Status" v-model="form.status" />
            <InputForm text="Image" v-model="form.image" />
            <InputForm text="Note" v-model="form.notes" />
        </FormModal>
    </AppLayout>
</template>

<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import AddButton from '@/Components/Buttons/AddButton.vue';
import TableSection from '@/Components/TableSection.vue';
import { IconPencil, IconTrash } from '@tabler/icons-vue';
import { useForm } from '@inertiajs/vue3';
import { confirmAlert } from '@/Use/helpers';
import { toast } from '@/Use/toast';
import FormModal from '@/Components/Modal/FormModal.vue';
import InputForm from '@/Components/Form/InputForm.vue';
import { ref } from 'vue';
import SelectForm from "@/Components/Form/SelectForm.vue"

defineProps({
    products: {
        type: Object,
        required: true,
    },
    suppliers: {
        type: Array,
        required: false,
        default: () => []
    }
});

const breads = [
    {
        name: 'Home',
        route: route('dashboard.products.index'),
    },
    {
        name: 'Products',
        route: route('dashboard.products.index'),
    },
];

const form = useForm(
    {
        index: '',
        name: '',
        sku: '',
        supplier_id: null,
        description: '',
        status: '',
        image: '',
        notes: '',
    }
);

const openModal = ref(false);

function edit(product) {
    form.id = product.id;
    form.name = product.name;
    form.sku = product.sku;
    form.supplier_id = product.supplier_id;
    form.description = product.description;
    form.status = product.status;
    form.image = product.image;
    form.notes = product.notes;
    openModal.value = true;
}

function onSubmit() {
    form.put(route('dashboard.products.update', form.id), {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => {
            toast.success('Product updated successfully');
            openModal.value = false;
        },
    });
}

function destroy(id) {
    confirmAlert({
        message: 'Are you sure you want to delete this product?',
        onConfirm: () => {
            form.delete(route('dashboard.products.destroy', id), {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    toast.success('Product deleted successfully');
                },
            });
        },
    })
}
</script>
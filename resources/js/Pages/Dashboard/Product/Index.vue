<template>
    <AppLayout title="Products" :breads="breads">
        <template #header>
            <span class="title">
                Productos
            </span>
            <AddButton @click="openModal = true" />
        </template>

        <div class="mb-3">
            <div class="grid grid-cols-5 gap-4">
                <InputForm text="Buscar" type="search" v-model="queryParams.search" />
            </div>
        </div>

        <TableSection>
            <template #header>
                <th>SKU</th>
                <th>Nombre</th>
                <th>Acciones</th>
            </template>

            <template #body>
                <tr v-for="(product, index) in products.data" class="hover:bg-gray-50">
                    <td>
                        {{ product.sku }}
                    </td>
                    <td>
                        <span class="uppercase me-3">
                            {{ product.name }}
                        </span>
                        <span v-if="product.discount" class="badge-red">
                            C${{ product.discount }} Off
                        </span>
                    </td>
                    <td>
                        <div class="flex gap-2">
                            <Link :href="route('dashboard.products.show', product.id)" tooltip="Detalles">
                                <IconEye size="22" role="button" />
                            </Link>
                            <label tooltip="Editar">
                                <IconPencil size="22" role="button" @click="edit(product)" />
                            </label>
                            <label tooltip="Eliminar">
                                <IconTrash size="22" role="button" @click="destroy(product.id)" />
                            </label>
                        </div>
                    </td>
                </tr>
                <tr v-if="products.data.length == 0">
                    <td colspan="3" class="text-center">No hay datos que mostrar</td>
                </tr>
            </template>

            <template #paginator>
                <ThePaginator :links="products.links" />
            </template>
        </TableSection>

        <FormModal :show="openModal" title="Product" @onCancel="resetValues" @onSubmit="onSubmit">
            <InputForm text="SKU" v-model="form.sku" required />
            <InputForm text="Name" v-model="form.name" required />
            <InputForm text="Image" v-model="form.image" type="url" />
            <InputForm text="Descuento" v-model="form.discount" type="number" :min="0" />
        </FormModal>

    </AppLayout>
</template>

<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import AddButton from '@/Components/Buttons/AddButton.vue';
import TableSection from '@/Components/TableSection.vue';
import { IconPencil, IconTrash, IconEye } from '@tabler/icons-vue';
import { confirmAlert } from '@/Use/helpers';
import { toast } from '@/Use/toast';
import { router, useForm } from '@inertiajs/vue3';
import ThePaginator from '@/Components/ThePaginator.vue';
import FormModal from '@/Components/Modal/FormModal.vue';
import InputForm from '@/Components/Form/InputForm.vue';
import { ref, reactive, watch } from 'vue';
import { Link } from '@inertiajs/vue3';
import { queryParams, watchSearch, setParams } from '@/Use/Search';

defineProps({
    products: {
        type: Object,
        required: true,
    }
});

const breads = [
    {
        name: 'Inicio',
        route: route('dashboard.products.index'),
    },
    {
        name: 'Productos',
        route: route('dashboard.products.index'),
    },
];



const openModal = ref(false);
const isNew = ref(true);

const form = useForm({
    id: null,
    name: null,
    sku: null,
    image: null,
    discount: 0,
});

function edit(product) {
    Object.assign(form, product);
    isNew.value = false;
    openModal.value = true;
}

function onSubmit() {
    if (isNew.value) {
        form.post(route('dashboard.products.store'), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                resetValues();
                toast.success('Producto agregado');
            },
        });
    } else {
        form.put(route('dashboard.products.update', form.id), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                resetValues();
                toast.success('Producto actualizado');
            },
        });
    }
}

function destroy(id) {
    confirmAlert({
        onConfirm: () => {
            router.delete(route('dashboard.products.destroy', id), {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    toast.success('Producto eliminado');
                },
            });
        },
    })
}

function resetValues() {
    openModal.value = false;
    isNew.value = true;
    form.reset();
}

setParams()

watchSearch(route('dashboard.products.index'), ["products"])

</script>
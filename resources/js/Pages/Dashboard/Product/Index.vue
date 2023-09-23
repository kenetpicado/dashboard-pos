<template>
    <AppLayout title="Products" :breads="breads">
        <template #header>
            <span class="title">
                Productos
            </span>
            <add-button :href="route('dashboard.products.create')" />
        </template>

        <TableSection>
            <template #header>
                <th>SKU</th>
                <th>Nombre</th>
                <th>Proveedor</th>
                <th>Acciones</th>
            </template>

            <template #body>
                <tr v-for="(product, index) in products" class="hover:bg-gray-50">
                    <td>
                        {{ product.sku }}
                    </td>
                    <td>
                        {{ product.name }}
                    </td>
                    <td>
                        {{ product.supplier ? product.supplier.name : 'N/A' }}
                    </td>
                    <td>
                        <div class="flex gap-2">
                            <IconPencil role="button" @click="edit (product.id)" />
                            <IconTrash role="button" @click="destroy(product.id)" />
                        </div>
                    </td>
                </tr>
                <tr v-if="products.length == 0">
                    <td colspan="6" class="text-center">No hay datos que mostrar</td>
                </tr>
            </template>
        </TableSection>
    </AppLayout>
</template>

<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import AddButton from '@/Components/Buttons/AddButton.vue';
import TableSection from '@/Components/TableSection.vue';
import { IconPencil, IconTrash } from '@tabler/icons-vue';
import { confirmAlert } from '@/Use/helpers';
import { toast } from '@/Use/toast';
import { router } from '@inertiajs/vue3';

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

function edit(id){
    router.visit(route('dashboard.products.edit', id));
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
</script>
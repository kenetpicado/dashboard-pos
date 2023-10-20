<template>
    <AppLayout title="Products" :breads="breads">
        <template #header>
            <span class="title">
                Productos
            </span>
            <AddButton :href="route('dashboard.products.create')"/>
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

                            <Link :href="route('dashboard.products.edit', product.id)" tooltip="Editar">
                            <IconPencil size="22" role="button" />
                            </Link>

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
    </AppLayout>
</template>

<script setup>
import AddButton from '@/Components/Buttons/AddButton.vue';
import InputForm from '@/Components/Form/InputForm.vue';
import TableSection from '@/Components/TableSection.vue';
import ThePaginator from '@/Components/ThePaginator.vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import { queryParams, setParams, watchSearch } from '@/Use/Search';
import { confirmAlert } from '@/Use/helpers';
import { toast } from '@/Use/toast';
import { Link, router } from '@inertiajs/vue3';
import { IconEye, IconPencil, IconTrash } from '@tabler/icons-vue';

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

setParams()

watchSearch(route('dashboard.products.index'), ["products"])

</script>
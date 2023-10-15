<template>
    <AppLayout title="Inventario" :breads="breads">

        <template #header>
            <span class="title">
                Inventario
            </span>
        </template>

        <TableSection>
            <template #header>
                <th>Medida</th>
                <th>Cantidad</th>
                <th>Costo (ud.)</th>
                <th>Precio (ud.)</th>
                <th>Acciones</th>
            </template>

            <template #body>
                <tr v-for="(i, index) in inventory.data" class="hover:bg-gray-50">
                    <td>
                        {{ i.measure }}
                    </td>
                    <td>
                        {{ i.quantity }}
                    </td>
                    <td>
                        C${{ i.unit_cost }}
                    </td>
                    <td>
                        C${{ i.unit_price }}
                    </td>
                    <td>

                    </td>
                </tr>
                <tr v-if="inventory.data.length == 0">
                    <td colspan="5" class="text-center">No hay datos que mostrar</td>
                </tr>
            </template>
            <template #paginator>
                <ThePaginator :links="inventory.links" />
            </template>
        </TableSection>
    </AppLayout>
</template>

<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import TableSection from '@/Components/TableSection.vue';
import ThePaginator from "@/Components/ThePaginator.vue"

const props = defineProps({
    product: {
        type: Object,
        required: true,
    },
    inventory: {
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
        name: 'Productos',
        route: route('dashboard.products.index'),
    },
    {
        name: 'Inventario',
        route: route('dashboard.products.show', props.product.id),
    },
];

</script>
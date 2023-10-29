<template>
    <AppLayout title="Proximos a vencer" :breads="breads">

        <template #header>
            <span class="title">
                Proximos a vencer
            </span>
        </template>

        <TableSection>
            <template #header>
                <th>Expira</th>
                <th>Producto</th>
                <th>Medida</th>
                <th>Cantidad</th>
            </template>

            <template #body>
                <tr v-for="(i, index) in inventory.data" class="hover:bg-gray-50">
                    <td>
                        <DateColumn :date="i.expired_at" />
                    </td>
                    <td>
                        <div class="uppercase">
                            {{ i.name }}
                        </div>
                        <div class="text-gray-400 mt-2">
                            {{ i.sku }}
                        </div>
                    </td>
                    <td>
                        {{ i.measure }}
                    </td>
                    <td>
                        {{ i.quantity }}
                    </td>
                </tr>
                <tr v-if="inventory.data.length == 0">
                    <td colspan="6" class="text-center">No hay datos que mostrar</td>
                </tr>
            </template>
            <template #paginator>
                <ThePaginator :links="inventory.links" />
            </template>
        </TableSection>
    </AppLayout>
</template>

<script setup>
import DateColumn from '@/Components/DateColumn.vue';
import TableSection from '@/Components/TableSection.vue';
import ThePaginator from "@/Components/ThePaginator.vue";
import AppLayout from '@/Layouts/AppLayout.vue';

const props = defineProps({
    inventory: {
        type: Object,
        required: true,
    },
});

const breads = [
    {
        name: 'Inicio',
        route: route('dashboard.index'),
    },
    {
        name: 'Proximos a vencer',
        route: route('dashboard.expired.index'),
    },
];

</script>
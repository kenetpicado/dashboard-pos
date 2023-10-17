<template>
    <AppLayout title="Inventario" :breads="breads">

        <template #header>
            <span class="title">
                Inventario
            </span>
        </template>

        <div class="mb-1">
            <div class="grid grid-cols-5 gap-4">
                <InputForm text="Buscar" type="search" v-model="queryParams.search" />
            </div>
        </div>

        <div class="mb-4">
            <div class="grid grid-cols-5 gap-4">
                <StatCard v-for="stat in stats" :stat="stat" :key="stat.title" />
            </div>
        </div>

        <TableSection>
            <template #header>
                <th>SKU</th>
                <th>Producto</th>
                <th>Medida</th>
                <th>Cantidad</th>
                <th>Costo (ud.)</th>
                <th>Todal</th>
            </template>

            <template #body>
                <tr v-for="(i, index) in inventory.data" class="hover:bg-gray-50">
                    <td>
                        {{ i.product.sku }}
                    </td>
                    <td class="uppercase">
                        {{ i.product.name }}
                    </td>
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
                        <span class="font-bold">C${{ (i.quantity * i.unit_cost).toLocaleString() }}</span>
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
import InputForm from '@/Components/Form/InputForm.vue';
import StatCard from '@/Components/StatCard.vue';
import TableSection from '@/Components/TableSection.vue';
import ThePaginator from "@/Components/ThePaginator.vue";
import AppLayout from '@/Layouts/AppLayout.vue';
import { IconCurrencyDollar, IconTag } from '@tabler/icons-vue';
import { queryParams, watchSearch, setParams } from '@/Use/Search';

const props = defineProps({
    inventory: {
        type: Object,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    total_quantity: {
        type: [Number, String],
        required: true,
    },
});

const breads = [
    {
        name: 'Inicio',
        route: route('dashboard.users.index'),
    },
    {
        name: 'Inventario',
        route: route('dashboard.inventory.index'),
    },
];

const stats = [
    {
        title: "Total en inventario",
        value: "C$" + props.total.toLocaleString(),
        icon: IconCurrencyDollar
    },
    {
        title: "Total de productos",
        value: props.total_quantity.toLocaleString(),
        icon: IconTag
    },
]

setParams()

watchSearch(route('dashboard.inventory.index'), ["inventory"])

</script>
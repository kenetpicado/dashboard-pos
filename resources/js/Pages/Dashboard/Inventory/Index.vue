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
                <SelectForm text="Responsable" v-model="queryParams.user_id">
                    <option selected value="">Todos</option>
                    <option v-for="item in users" :value="item.id">{{ item.name }}</option>
                </SelectForm>
            </div>
        </div>

        <div class="mb-4">
            <div class="grid grid-cols-5 gap-4">
                <StatCard v-for="stat in stats" :stat="stat" :key="stat.title" />
            </div>
        </div>

        <TableSection>
            <template #header>
                <th>Fecha</th>
                <th>Producto</th>
                <th>Medida</th>
                <th>Cantidad</th>
                <th>Costo (ud.)</th>
                <th>Todal</th>
            </template>

            <template #body>
                <tr v-for="(i, index) in inventory.data" class="hover:bg-gray-50">
                    <td>
                        <DateColumn :date="i.created_at" />
                    </td>
                    <td>
                        <div class="uppercase">
                            {{ i.product.name }}
                        </div>
                        <div class="text-gray-400 mt-2">
                            {{ i.product.sku }}
                        </div>
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
                        <span class="font-bold">C${{ i.total_cost.toLocaleString() }}</span>
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
import InputForm from '@/Components/Form/InputForm.vue';
import SelectForm from "@/Components/Form/SelectForm.vue";
import StatCard from '@/Components/StatCard.vue';
import TableSection from '@/Components/TableSection.vue';
import ThePaginator from "@/Components/ThePaginator.vue";
import AppLayout from '@/Layouts/AppLayout.vue';
import { queryParams, setParams, watchSearch, watchUser } from '@/Use/Search';
import { IconCurrencyDollar, IconTag } from '@tabler/icons-vue';
import { computed } from 'vue';

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
    users: {
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
        name: 'Inventario',
        route: route('dashboard.inventory.index'),
    },
];

const stats = computed(() => {
    return [
        {
            title: "Inventario",
            value: "C$" + props.total.toLocaleString(),
            icon: IconCurrencyDollar
        },
        {
            title: "Productos",
            value: props.total_quantity.toLocaleString(),
            icon: IconTag
        },
    ]
})

setParams()

watchSearch(route('dashboard.inventory.index'), ["inventory"])

watchUser(route('dashboard.inventory.index'), ["inventory", "total", "total_quantity"])

</script>
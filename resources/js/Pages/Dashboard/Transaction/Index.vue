<template>
    <AppLayout title="Transacciones" :breads="breads">

        <template #header>
            <span class="title">
                Transacciones
            </span>
        </template>

        <div class="mb-4">
            <div class="grid grid-cols-5 gap-4">
                <StatCard v-for="stat in stats" :stat="stat" :key="stat.title" />
            </div>
        </div>

        <TableSection>
            <template #header>
                <th>Fecha</th>
                <th>Tipo</th>
                <th>Responsable</th>
                <td>Productos</td>
                <th>Descuento</th>
                <th>Total</th>
                <th>Acciones</th>
            </template>

            <template #body>
                <tr v-for="(transaction, index) in transactions.data" class="hover:bg-gray-50">
                    <td>
                        <DateColumn :date="transaction.created_at"/>
                    </td>
                    <td>
                        <span :class="transactionClass[transaction.type]">
                            {{ transactionTypes[transaction.type] }}
                        </span>
                    </td>
                    <td>
                        {{ transaction.user.name }}
                    </td>
                    <td>
                    	{{ transaction.products_count }}
                    </td>
                    <td>
                        <span v-if="transaction.discount > 0">C${{ transaction.discount }}</span>
                    </td>
                    <td>
                        <span class="font-bold">C${{ transaction.total.toLocaleString() }}</span>
                    </td>
                    <td>
                        <div class="flex gap-2">
                            <Link :href="route('dashboard.transactions.show', transaction.id)" tooltip="Detalles">
                                <IconEye size="22" role="button" />
                            </Link>
                        </div>
                    </td>
                </tr>
                <tr v-if="transactions.data.length == 0">
                    <td colspan="7" class="text-center">No hay datos que mostrar</td>
                </tr>
            </template>
            <template #paginator>
            	<ThePaginator :links="transactions.links"/>
            </template>
        </TableSection>
    </AppLayout>
</template>

<script setup>
import DateColumn from "@/Components/DateColumn.vue";
import StatCard from '@/Components/StatCard.vue';
import TableSection from '@/Components/TableSection.vue';
import ThePaginator from "@/Components/ThePaginator.vue";
import AppLayout from '@/Layouts/AppLayout.vue';
import { Link } from '@inertiajs/vue3';
import { IconCurrencyDollar, IconCurrencyDollarOff, IconEye } from '@tabler/icons-vue';

const props = defineProps({
    transactions: {
        type: Object,
        required: true,
    },
    sell_month: {
        type: Number,
        required: true,
    },
    buy_month: {
        type: Number,
        required: true,
    },
});

const transactionTypes = {
	buy: "COMPRA",
	sell: "VENTA"
}

const breads = [
    {
        name: 'Inicio',
        route: route('dashboard.users.index'),
    },
    {
        name: 'Transacciones',
        route: route('dashboard.transactions.index'),
    },
];

const transactionClass = {
    buy: "badge-red",
    sell: "badge-indigo"
}

const stats = [
    {
        title: "Compras del mes",
        value: "C$" + props.buy_month.toLocaleString(),
        icon: IconCurrencyDollarOff
    },
    {
        title: "Ventas del mes",
        value: "C$" + props.sell_month.toLocaleString(),
        icon: IconCurrencyDollar
    },
]


</script>
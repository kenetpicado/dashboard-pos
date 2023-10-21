<template>
    <AppLayout title="Transacciones" :breads="breads">

        <template #header>
            <span class="title">
                Transacciones
            </span>
        </template>

        <TableSection>
            <template #header>
                <th>Fecha</th>
                <th>Factura #</th>
                <th>Tipo</th>
                <th>Descuento</th>
                <th>Total</th>
            </template>

            <template #body>
                <tr v-for="(transaction, index) in transactions.data" class="hover:bg-gray-50">
                    <td>
                        <DateColumn :date="transaction.created_at" />
                    </td>
                    <td>
                        #{{ transaction.id }}
                    </td>
                    <td>
                        <span>
                            {{ transactionTypes[transaction.type] }}
                        </span>
                    </td>
                    <td>
                        C${{ transaction.discount }}
                    </td>
                    <td>
                        <span class="font-bold">C${{ transaction.total.toLocaleString() }}</span>
                    </td>
                </tr>
                <tr v-if="transactions.data.length == 0">
                    <td colspan="4" class="text-center">No hay datos que mostrar</td>
                </tr>
            </template>
            <template #paginator>
                <ThePaginator :links="transactions.links" />
            </template>
        </TableSection>
    </AppLayout>
</template>

<script setup>
import DateColumn from "@/Components/DateColumn.vue";
import TableSection from '@/Components/TableSection.vue';
import ThePaginator from "@/Components/ThePaginator.vue";
import AppLayout from '@/Layouts/AppLayout.vue';

const props = defineProps({
    client: {
        type: Object,
        required: true,
    },
    transactions: {
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
        name: 'Clientes',
        route: route('dashboard.clients.index'),
    },
    {
        name: 'Transacciones',
        route: route('dashboard.clients.show', props.client.id),
    }
];

const transactionTypes = {
    buy: "COMPRA",
    sell: "VENTA"
}

</script>
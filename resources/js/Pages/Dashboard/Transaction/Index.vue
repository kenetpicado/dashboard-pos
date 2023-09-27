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
                    	{{ transactionTypes[transaction.type] }}                    	
                    </td>
                    <td>
                        {{ transaction.user.name }}
                    </td>
                    <td>
                    	{{ transaction.products_count }}
                    </td>
                    <td>
                        C${{ transaction.discount }}
                    </td>
                    <td>
                        <span :class=" transactionClass[transaction.type]">
                            C${{ transaction.total }}
                        </span>
                    </td>
                    <td>
                        <div class="flex gap-2">
                            
                        </div>
                    </td>
                </tr>
                <tr v-if="transactions.data.length == 0">
                    <td colspan="4" class="text-center">No hay datos que mostrar</td>
                </tr>
            </template>
            <template #paginator>
            	<ThePaginator :links="transactions.links"/>
            </template>
        </TableSection>
    </AppLayout>
</template>

<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import TableSection from '@/Components/TableSection.vue';
import ThePaginator from "@/Components/ThePaginator.vue"
import DateColumn from "@/Components/DateColumn.vue"

defineProps({
    transactions: {
        type: Object,
        required: true,
    }
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
    sell: "bagde-indigo"
}

</script>
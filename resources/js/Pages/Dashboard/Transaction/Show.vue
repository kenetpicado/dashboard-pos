<template>
    <AppLayout title="Detalles" :breads="breads">

        <template #header>
            <span class="title">
                Detalles
            </span>
        </template>

        <TableSection>
            <template #options>
                <div class="p-4 space-y-3 text-gray-600">
                    <div>
                        Fecha: {{ Carbon.create(transaction.created_at).format('d/m/Y H:i') }}
                    </div>
                    <div>
                        Factura: #{{ transaction.id }}
                    </div>
                    <div>
                        Tipo: {{ transactionTypes[transaction.type] }}
                    </div>
                    <div>
                        Estado: {{ transaction.status }}
                    </div>
                    <div>
                        Responsable: {{ transaction.user?.name }}
                    </div>
                    <div>
                        <a :href="route('dashboard.download.transaction', transaction.id)" class="text-indigo-600">Descargar Excel</a>
                    </div>
                </div>
            </template>
            <template #header>
                <th>Item</th>
                <th>Medida</th>
                <th>Cantidad</th>
                <th>Importe</th>
                <th>Descuento</th>
                <th>Total</th>
            </template>

            <template #body>
                <tr v-for="(product, index) in transaction.products" class="hover:bg-gray-50">
                    <td>
                        <div>
                            <div class="font-bold mb-2">
                                {{ product.name }}
                            </div>
                            <div>
                                {{ product.sku }}
                            </div>
                        </div>
                    </td>
                    <td>
                        {{ product.pivot.measure }}
                    </td>
                    <td>
                        {{ product.pivot.quantity }}
                    </td>
                    <td>
                        C${{ product.pivot.value.toLocaleString() }}
                    </td>
                    <td>
                        C${{ product.pivot.discount.toLocaleString() }}
                    </td>
                    <td>
                        C${{ product.pivot.total.toLocaleString() }}
                    </td>
                </tr>
            </template>

            <template #footer>
                <tfoot>
                    <tr>
                        <th colspan="5" class="text-end">
                            Descuento
                        </th>
                        <td>
                            C${{ transaction.discount.toLocaleString() }}
                        </td>
                    </tr>
                    <tr>
                        <th colspan="5" class="text-end">
                            Total
                        </th>
                        <td>
                            <span class="font-bold">
                                C${{ transaction.total.toLocaleString() }}
                            </span>
                        </td>
                    </tr>
                </tfoot>
            </template>
        </TableSection>

    </AppLayout>
</template>

<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import TableSection from '@/Components/TableSection.vue';
import { Carbon } from '@/Use/Carbon';

const props = defineProps({
    transaction: {
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
        route: route('dashboard.index'),
    },
    {
        name: 'Transacciones',
        route: route('dashboard.transactions.index'),
    },
    {
        name: 'Detalles',
        route: route('dashboard.transactions.show', props.transaction.id),
    }
];

</script>
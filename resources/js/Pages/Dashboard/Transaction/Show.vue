<template>
    <AppLayout title="Detalles" :breads="breads">

        <template #header>
            <span class="title">
                Detalles
            </span>
        </template>

        <TableSection>
            <template #options>
                <div class="p-4 bg-gray-50 rounded-xl m-5">
                    <div class="flex justify-between">
                        <div class="space-y-1">
                            <div class="font-bold">
                                {{ transactionTypes[transaction.type] }}
                            </div>
                            <div>
                                Responsable: {{ transaction.user.name }}
                            </div>
                            <div>
                                Cliente: {{ transaction.client ?? 'N/A' }}
                            </div>
                        </div>
                        <div class="space-y-1">
                            <div class="font-bold text-end">
                                {{ Carbon.create(transaction.created_at).format('d/m/Y H:i') }}
                            </div>
                            <div class="text-end">
                                Factura No.: #{{ transaction.id }}
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template #header>
                <th>Item</th>
                <th>Cantidad</th>
                <th>Importe (Unidad)</th>
                <th>Descuento</th>
                <th>Total</th>
            </template>

            <template #body>
                <tr v-for="(product, index) in transaction.products" class="hover:bg-gray-50">
                    <td>
                        <div>
                            <div class="font-bold">
                                {{ product.name }}
                            </div>
                            <div>
                                {{ product.sku }}
                            </div>
                        </div>
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
                        <th colspan="4" class="text-right font-bold">
                            Descuento
                        </th>
                        <td>
                            C${{ transaction.discount.toLocaleString() }}
                        </td>
                    </tr>
                    <tr class="bg-gray-50">
                        <th colspan="4" class="text-right font-bold">
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
        route: route('dashboard.users.index'),
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
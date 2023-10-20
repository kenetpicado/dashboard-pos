<template>
    <AppLayout title="Detalles" :breads="breads">

        <template #header>
            <span class="title">
                Detalles
            </span>
        </template>

        <div class="mb-4">
            <div class="grid grid-cols-5 gap-4">
                <StatCard v-for="stat in stats" :stat="stat" :key="stat.title" />
            </div>
        </div>

        <TableSection>
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
                        {{ product.pivot.value.toLocaleString() }}
                    </td>
                    <td>
                        {{ product.pivot.discount.toLocaleString() }}
                    </td>
                    <td>
                        {{ product.pivot.total.toLocaleString() }}
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
import StatCard from '@/Components/StatCard.vue';
import { IconCurrencyDollar } from '@tabler/icons-vue';

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

const stats = [
    {
        title: 'Factura',
        value: props.transaction.id.toString().padStart(5, '0'),
    },
    {
        title: 'Tipo',
        value: transactionTypes[props.transaction.type],
    },
    {
        title: 'Estado',
        value: props.transaction.status,
    },
    {
        title: 'Fecha',
        value: Carbon.create(props.transaction.created_at).format('d/m/Y H:i'),
    },
]

</script>
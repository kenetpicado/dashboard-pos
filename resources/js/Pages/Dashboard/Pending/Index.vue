<template>
    <AppLayout title="Transacciones pendientes" :breads="breads">

        <template #header>
            <span class="title">
                Transacciones pendientes
            </span>
        </template>

        <div class="mb-3">
            <div class="grid grid-cols-5 gap-4">
                <InputForm text="Buscar" v-model="queryParams.search" />
            </div>
        </div>

        <TableSection>
            <template #header>
                <th>Fecha</th>
                <th>Factura #</th>
                <th>Tipo</th>
                <th>Cliente</th>
                <th>Total</th>
                <th>Acciones</th>
            </template>

            <template #body>
                <tr v-for="(transaction, index) in transactions.data" class="hover:bg-gray-50">
                    <td>
                        <DateColumn :date="transaction.created_at" />
                    </td>
                    <td>
                        #{{ transaction.id}}
                    </td>
                    <td>
                        <span :class="transactionClass[transaction.type]">
                            {{ transactionTypes[transaction.type] }}
                        </span>
                    </td>
                    <td>
                        {{ transaction.client }}
                    </td>
                    <td>
                        <span v-if="transaction.payments_total" class="font-bold">
                            C${{ transaction.payments_total.toLocaleString() }}
                        </span>
                        <span v-else class="font-bold">
                            C${{ transaction.total.toLocaleString() }}
                        </span>
                    </td>
                    <td>
                        <div class="flex gap-2">
                            <Link :href="route('dashboard.pending.show', transaction.id)" tooltip="Pagos">
                            <IconCurrencyDollar size="22" role="button" />
                            </Link>
                        </div>
                    </td>
                </tr>
                <tr v-if="transactions.data.length == 0">
                    <td colspan="6" class="text-center">No hay datos que mostrar</td>
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
import InputForm from "@/Components/Form/InputForm.vue";
import TableSection from '@/Components/TableSection.vue';
import ThePaginator from "@/Components/ThePaginator.vue";
import AppLayout from '@/Layouts/AppLayout.vue';
import { Link, router } from '@inertiajs/vue3';
import { IconCurrencyDollar } from '@tabler/icons-vue';
import { reactive, watch } from "vue";

const props = defineProps({
    transactions: {
        type: Object,
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
        route: route('dashboard.index'),
    },
    {
        name: 'Pendientes',
        route: route('dashboard.pending.index'),
    },
];

const transactionClass = {
    buy: "badge-red",
    sell: "badge-indigo"
}

const searchParams = new URLSearchParams(window.location.search);

const queryParams = reactive({
    search: searchParams.get("search") ?? "",
})

watch(() => queryParams, () => {
    for (const key in queryParams) {
        if (!queryParams[key]) {
            delete queryParams[key];
        }
    }

    router.get(route('dashboard.pending.index'), queryParams, {
        preserveState: true,
        preserveScroll: true,
        only: ["transactions"]
    })
}, { deep: true })

</script>
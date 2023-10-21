<template>
    <AppLayout title="Transacciones" :breads="breads">

        <template #header>
            <span class="title">
                Transacciones
            </span>
        </template>

        <div class="mb-3">
            <div class="grid grid-cols-5 gap-4">
                <SelectForm text="Responsable" v-model="queryParams.user_id">
                    <option selected value="">Todos</option>
                    <option v-for="item in users" :value="item.id">{{ item.name }}</option>
                </SelectForm>
                <InputForm text="Desde" type="date" v-model="queryParams.from" />
                <InputForm text="Hasta" type="date" v-model="queryParams.to" />
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
                <th>Factura #</th>
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
                        <DateColumn :date="transaction.created_at" />
                    </td>
                    <td>
                        #{{ transaction.id }}
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
                        C${{ transaction.discount }}
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
                    <td colspan="8" class="text-center">No hay datos que mostrar</td>
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
import SelectForm from "@/Components/Form/SelectForm.vue";
import StatCard from '@/Components/StatCard.vue';
import TableSection from '@/Components/TableSection.vue';
import ThePaginator from "@/Components/ThePaginator.vue";
import AppLayout from '@/Layouts/AppLayout.vue';
import { Link, router } from '@inertiajs/vue3';
import { IconCurrencyDollar, IconCurrencyDollarOff, IconEye } from '@tabler/icons-vue';
import { computed, reactive, watch } from "vue";

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
    users: {
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
        name: 'Transacciones',
        route: route('dashboard.transactions.index'),
    },
];

const transactionClass = {
    buy: "badge-red",
    sell: "badge-indigo"
}

const queryParams = reactive({
    user_id: null,
    from: null,
    to: null,
})

const stats = computed(() => {
    return [
        {
            title: queryParams.from || queryParams.to ? "Compras" : "Compras del mes",
            value: "C$" + props.buy_month.toLocaleString(),
            icon: IconCurrencyDollarOff
        },
        {
            title: queryParams.from || queryParams.to ? "Ventas" : "Ventas del mes",
            value: "C$" + props.sell_month.toLocaleString(),
            icon: IconCurrencyDollar
        },
    ]
})

const searchParams = new URLSearchParams(window.location.search);

if (searchParams.get("user_id")) {
    queryParams.user_id = searchParams.get("user_id")
}

if (searchParams.get("from")) {
    queryParams.from = searchParams.get("from")
}

if (searchParams.get("to")) {
    queryParams.to = searchParams.get("to")
}

watch(() => queryParams.user_id, (value) => {
    if (!value) {
        delete queryParams.user_id
    }

    if (!queryParams.from) {
        delete queryParams.from
    }

    if (!queryParams.to) {
        delete queryParams.to
    }

    getData()
})

watch(() => [queryParams.from, queryParams.to], ([from, to]) => {
    if (!from) {
        delete queryParams.from
    }

    if (!to) {
        delete queryParams.to
    }

    if (!queryParams.user_id) {
        delete queryParams.user_id
    }

    getData()
})

function getData() {
    router.get(route('dashboard.transactions.index'), queryParams, {
        preserveState: true,
        preserveScroll: true,
        only: ["transactions", 'buy_month', 'sell_month']
    })
}

</script>
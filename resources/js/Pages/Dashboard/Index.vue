<template>
    <AppLayout title="Inicio" :breads="breads">
        <template #header>
            <span class="title">Inicio</span>
        </template>

        <div class="grid grid-cols-4 gap-4">
            <StatCard v-for="stat in stats" :stat="stat" :key="stat.title" />
        </div>
    </AppLayout>
</template>

<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import StatCard from '@/Components/StatCard.vue';
import { IconCurrencyDollar } from '@tabler/icons-vue';
import { IconCurrencyDollarOff } from '@tabler/icons-vue';
import { IconTag } from '@tabler/icons-vue';

const props = defineProps({
    users_count: {
        type: Number,
        default: 0,
    },
    sell_month: {
        type: Number,
        default: 0,
    },
    buy_month: {
        type: Number,
        default: 0,
    },
    total_inventory: {
        type: Number,
        default: 0,
    },
    total_quantity: {
        type: [String, Number],
        default: 0,
    },
});

const breads = [
    {
        name: 'Home',
        route: route('dashboard.index'),
    },
];

const stats = [
    {
        title: 'Compras del mes',
        value: 'C$' + props.buy_month.toLocaleString(),
        icon: IconCurrencyDollarOff,
        href: route('dashboard.transactions.index'),
    },
    {
        title: 'Ventas del mes',
        value: 'C$' + props.sell_month.toLocaleString(),
        icon: IconCurrencyDollar,
        href: route('dashboard.transactions.index'),
    },
    {
        title: 'Total en inventario',
        value: 'C$' + props.total_inventory.toLocaleString(),
        icon: IconCurrencyDollar,
        href: route('dashboard.inventory.index'),
    },
    {
        title: 'Productos en inventario',
        value: props.total_quantity.toLocaleString(),
        icon: IconTag,
        href: route('dashboard.inventory.index'),
    },
];

</script>

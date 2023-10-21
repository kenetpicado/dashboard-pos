<template>
    <aside class="w-72 p-3 bg-white flex flex-col min-h-screen">
        <div class="flex flex-col items-center my-4">
            <div class="h-14 w-14">
                <img class="h-full w-full"
                    src="/shop.png"
                    alt="" />
            </div>
            <h2 class="text-2xl font-extrabold text-gray-600">
                {{ $page.props.app_name }}
            </h2>
        </div>
        <ul class="space-y-2 text-gray-600">
            <li v-for="item in items">
                <span v-if="item.header" class="block text-xs text-gray-400 uppercase tracking-wider mt-2 px-2">
                    {{ item.header }}
                </span>
                <Link v-else :href="item.route">
                <span class="flex items-center px-2 py-3 rounded-lg gap-4" :class="getClass(item.route)">
                    <component :is="item.icon ?? DEFAULT_ICON"></component>
                    <span>{{ item.name }}</span>
                </span>
                </Link>
            </li>
            <li>
                <span @click="logout" class="flex items-center px-2 py-3 rounded-lg gap-4 hover:bg-gray-100" role="button">
                    <IconLogout></IconLogout>
                    <span>Logout</span>
                </span>
            </li>
        </ul>
    </aside>
</template>

<script setup>
import { Link, router } from '@inertiajs/vue3';
import { IconShoppingCart } from '@tabler/icons-vue';
import { IconClock } from '@tabler/icons-vue';
import { IconUserCheck } from '@tabler/icons-vue';
import { IconTag } from '@tabler/icons-vue';
import { IconShoppingBag } from '@tabler/icons-vue';
import { IconUserCog } from '@tabler/icons-vue';
import { IconHome, IconLogout, IconUser, IconCategory, IconBuildingFactory, IconClipboardList, IconEyeCheck, IconShirt } from '@tabler/icons-vue';

const DEFAULT_ICON = IconUser;

const logout = () => {
    router.post(route('logout'));
};

const items = [
    {
        header: 'Home'
    },
    {
        name: 'Dashboard',
        route: route('dashboard.index'),
        icon: IconHome
    },
    {
        header: 'Operaciones'
    },
    {
        name: 'Vender',
        route: route('dashboard.transactions.create', { type: 'sell' }),
        icon: IconShoppingCart
    },
    {
        name: 'Comprar',
        route: route('dashboard.transactions.create', { type: 'buy' }),
        icon: IconShoppingBag
    },
    {
        name: 'Transacciones',
        route: route('dashboard.transactions.index'),
        icon: IconEyeCheck
    },
    {
        name: 'Pendientes',
        route: route('dashboard.pending.index'),
        icon: IconClock
    },
    {
        header: 'Administration'
    },
    {
        name: 'Productos',
        route: route('dashboard.products.index'),
        icon: IconTag
    },
    {
        name: 'Inventario',
        route: route('dashboard.inventory.index'),
        icon: IconClipboardList
    },
    {
        name: 'Clientes',
        route: route('dashboard.clients.index'),
        icon: IconUserCheck
    },
    {
        header: 'Sistema'
    },
    {
        name: 'Usuarios',
        route: route('dashboard.users.index'),
        icon: IconUserCog
    },    {
        name: 'Categorias',
        route: route('dashboard.categories.index'),
        icon: IconCategory
    },
    {
        name: 'Perfil',
        route: route('dashboard.profile.index'),
        icon: IconUser
    },
]

function getClass(fullRoute) {
    return window.location.href == fullRoute
        ? 'bg-gray-200 font-bold'
        : 'hover:bg-gray-100';
}

</script>
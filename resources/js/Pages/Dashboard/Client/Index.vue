<template>
    <AppLayout title="Clientes" :breads="breads">

        <template #header>
            <span class="title">
                Clientes
            </span>
        </template>

        <div class="mb-3">
            <div class="grid grid-cols-5 gap-4">
                <InputForm text="Buscar" type="search" v-model="queryParams.search" />
            </div>
        </div>

        <TableSection>
            <template #header>
                <th>Registro</th>
                <th>Nombre</th>
                <th>Contacto</th>
                <th>Acciones</th>
            </template>

            <template #body>
                <tr v-for="(c, index) in clients.data" class="hover:bg-gray-50">
                    <td>
                        <DateColumn :date="c.created_at" />
                    </td>
                    <td>
                        {{ c.name}}
                    </td>
                    <td>
                        {{ c.contact ?? 'N/A' }}
                    </td>
                    <td>
                        <div class="flex gap-2">
                            <Link :href="route('dashboard.clients.show', c.id)" tooltip="Pagos">
                            <IconEye size="22" role="button" />
                            </Link>
                        </div>
                    </td>
                </tr>
                <tr v-if="clients.data.length == 0">
                    <td colspan="4" class="text-center">No hay datos que mostrar</td>
                </tr>
            </template>
            <template #paginator>
                <ThePaginator :links="clients.links" />
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
import { queryParams, setParams, watchSearch } from '@/Use/Search';
import { Link } from '@inertiajs/vue3';
import { IconEye } from "@tabler/icons-vue";

const props = defineProps({
    clients: {
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
];

setParams()

watchSearch(route('dashboard.clients.index'), ["clients"])

</script>
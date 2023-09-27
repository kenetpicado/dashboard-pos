<template>
    <AppLayout title="Inventario" :breads="breads">

        <template #header>
            <span class="title">
                Inventario
            </span>
        </template>

        <TableSection>
            <template #header>
                <th>SKU</th>
                <th>Producto</th>
                <th>Costo (ud.)</th>
                <th>Cantidad</th>
                <th>Acciones</th>
            </template>

            <template #body>
                <tr v-for="(i, index) in inventory" class="hover:bg-gray-50">
                    <td>
                        {{ i.product.sku }}
                    </td>
                    <td>
                    	{{ i.product.name }}                	
                    </td>
                    <td>
                    	C${{ i.unit_cost }}                	
                    </td>
                    <td>
                    	{{ i.quantity }} 
                    </td>
                    <td>
                        <div class="flex gap-2">
                            Actions
                        </div>
                    </td>
                </tr>
                <tr v-if="inventory.length == 0">
                    <td colspan="4" class="text-center">No hay datos que mostrar</td>
                </tr>
            </template>
            <!-- <template #paginator>
            	<ThePaginator :links="transactions.links"/>
            </template> -->
        </TableSection>
    </AppLayout>
</template>

<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import TableSection from '@/Components/TableSection.vue';
import ThePaginator from "@/Components/ThePaginator.vue"

defineProps({
    inventory: {
        type: Object,
        required: true,
    }
});

const breads = [
    {
        name: 'Inicio',
        route: route('dashboard.users.index'),
    },
    {
        name: 'Inventario',
        route: route('dashboard.inventory.index'),
    },
];

</script>
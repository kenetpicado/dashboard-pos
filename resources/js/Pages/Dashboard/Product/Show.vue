<template>
    <AppLayout title="Inventario" :breads="breads">

        <template #header>
            <div>
                <div class="text-2xl font-extrabold text-gray-600">
                    Inventario
                </div>
                <div class="mt-2 text-sm text-gray-500 uppercase">
                    {{ product.name }}
                </div>
            </div>
        </template>

        <div class="mb-4">
            <div class="grid grid-cols-5 gap-4">
                <StatCard v-for="stat in stats" :stat="stat" :key="stat.title" />
            </div>
        </div>

        <TableSection>
            <template #header>
                <th>Fecha</th>
                <th>Colors</th>
                <th>Medida</th>
                <th>Cantidad</th>
                <th>Costo (ud.)</th>
                <th>Total</th>
                <th>Precio (ud.)</th>
                <th>Acciones</th>
            </template>

            <template #body>
                <tr v-for="(i, index) in inventory.data" class="hover:bg-gray-50">
                    <td>
                        <DateColumn :date="i.created_at" />
                    </td>
                    <td>
                        <ColorList :colors="i.colors"/>
                    </td>
                    <td>
                        {{ i.measure }}
                    </td>
                    <td>
                        {{ i.quantity }}
                    </td>
                    <td>
                        C${{ i.unit_cost }}
                    </td>
                    <td>
                        <span class="font-bold">C${{ (i.quantity * i.unit_cost).toLocaleString() }}</span>
                    </td>
                    <td>
                        C${{ i.unit_price }}
                    </td>
                    <td>
                        <div class="flex justify-between gap-4">
                            <span tooltip="Editar">
                                <IconPencil size="22" role="button" @click="edit(i)" />
                            </span>
                            <span tooltip="Eliminar">
                                <IconTrash size="22" class="text-red-200" role="button" @click="destroy(i)" />
                            </span>
                        </div>
                    </td>
                </tr>
                <tr v-if="inventory.data.length == 0">
                    <td colspan="7" class="text-center">No hay datos que mostrar</td>
                </tr>
            </template>
            <template #paginator>
                <ThePaginator :links="inventory.links" />
            </template>
        </TableSection>

        <EditInventoryForm @onCancel="resetValues()"
            :openModal="openModal"
            :form="form"
            :measures="measures" />
    </AppLayout>
</template>

<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import TableSection from '@/Components/TableSection.vue';
import ThePaginator from "@/Components/ThePaginator.vue"
import { IconPencil } from '@tabler/icons-vue';
import { ref, computed, reactive } from 'vue';
import { toast } from '@/Use/toast';
import { IconTrash } from '@tabler/icons-vue';
import StatCard from '@/Components/StatCard.vue';
import { IconTag } from '@tabler/icons-vue';
import { IconCurrencyDollar } from '@tabler/icons-vue';
import DateColumn from '@/Components/DateColumn.vue';
import EditInventoryForm from '@/Components/EditInventoryForm.vue';
import ColorList from '@/Components/ColorList.vue';

const props = defineProps({
    product: {
        type: Object,
        required: true,
    },
    inventory: {
        type: Object,
        required: true,
    },
    inventoryStatus: {
        type: Object,
        required: true,
    },
    measures: {
        type: Object,
        required: true,
    }
});

const openModal = ref(false);

const form = reactive({
    id: null,
    measure: null,
    quantity: null,
    unit_price: null,
    colors: [],
})

const breads = [
    {
        name: 'Inicio',
        route: route('dashboard.index'),
    },
    {
        name: 'Productos',
        route: route('dashboard.products.index'),
    },
    {
        name: 'Inventario',
        route: route('dashboard.products.show', props.product.id),
    },
];

const edit = (i) => {
    form.id = i.id
    form.measure = i.measure
    form.quantity = i.quantity
    form.unit_price = i.unit_price
    form.colors = i.colors

    openModal.value = true;
}

const resetValues = () => {
    openModal.value = false
    form.id = null
    form.measure = null
    form.quantity = null
    form.unit_price = null
    form.colors = []
}

const destroy = (id) => {
    if (confirm('¿Estas seguro de eliminar este registro?')) {
        form.delete(route('dashboard.inventory.destroy', id), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                toast.success('Registro eliminado correctamente')
            }
        })
    }
}

const stats = computed(() => {
    return [
        {
            title: "Inventario",
            value: "C$" + props.inventoryStatus.total.toLocaleString(),
            icon: IconCurrencyDollar
        },
        {
            title: "Productos",
            value: props.inventoryStatus.quantity,
            icon: IconTag
        },
    ]
})

</script>
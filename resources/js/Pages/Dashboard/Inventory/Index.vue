<template>
    <AppLayout title="Inventario" :breads="breads">

        <template #header>
            <span class="title">
                Inventario
            </span>
        </template>

        <div class="mb-1">
            <div class="grid grid-cols-5 gap-4">
                <InputForm text="Buscar" v-model="queryParams.search" />
                <SelectForm text="Responsable" v-model="queryParams.user_id">
                    <option selected value="">Todos</option>
                    <option v-for="item in users" :value="item.id">{{ item.name }}</option>
                </SelectForm>
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
                <th>Producto</th>
                <th>Colors</th>
                <th>Medida</th>
                <th>Cantidad</th>
                <th>Costo (ud.)</th>
                <th>Todal</th>
                <th>Actions</th>
            </template>

            <template #body>
                <tr v-for="(i, index) in inventory.data" class="hover:bg-gray-50">
                    <td>
                        <DateColumn :date="i.created_at" />
                    </td>
                    <td>
                        <div class="uppercase">
                            {{ i.product.name }}
                        </div>
                        <div class="text-gray-400 mt-2">
                            {{ i.product.sku }}
                        </div>
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
                        <div class="flex justify-between gap-4">
                            <span tooltip="Editar">
                                <IconPencil size="22" role="button" @click="edit(i)" />
                            </span>
                            <span tooltip="Eliminar">
                                <IconTrash size="22" class="text-red-200" role="button" @click="destroy(i.id)" />
                            </span>
                        </div>
                    </td>
                </tr>
                <tr v-if="inventory.data.length == 0">
                    <td colspan="6" class="text-center">No hay datos que mostrar</td>
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
import ColorList from '@/Components/ColorList.vue';
import DateColumn from '@/Components/DateColumn.vue';
import EditInventoryForm from '@/Components/EditInventoryForm.vue';
import InputForm from '@/Components/Form/InputForm.vue';
import SelectForm from "@/Components/Form/SelectForm.vue";
import StatCard from '@/Components/StatCard.vue';
import TableSection from '@/Components/TableSection.vue';
import ThePaginator from "@/Components/ThePaginator.vue";
import AppLayout from '@/Layouts/AppLayout.vue';
import { confirmAlert } from '@/Use/helpers';
import { toast } from '@/Use/toast';
import { router } from '@inertiajs/vue3';
import { IconCurrencyDollar, IconPencil, IconTag, IconTrash } from '@tabler/icons-vue';
import { debounce } from "lodash";
import { computed, reactive, ref, watch } from 'vue';

const props = defineProps({
    inventory: {
        type: Object,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    total_quantity: {
        type: [Number, String],
        required: true,
    },
    users: {
        type: Object,
        required: true,
    },
    measures: {
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
        name: 'Inventario',
        route: route('dashboard.inventory.index'),
    },
];

const openModal = ref(false);

const form = reactive({
    id: null,
    measure: null,
    quantity: null,
    unit_price: null,
    colors: [],
})

const stats = computed(() => {
    return [
        {
            title: "Inventario",
            value: "C$" + props.total.toLocaleString(),
            icon: IconCurrencyDollar
        },
        {
            title: "Productos",
            value: props.total_quantity.toLocaleString(),
            icon: IconTag
        },
    ]
})

const destroy = (id) => {
    confirmAlert({
        onConfirm: () => {
            router.delete(route('dashboard.inventory.destroy', id), {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    toast.success('Eliminado correctamente');
                },
            });
        },
    })
}

function edit(i) {
    form.id = i.id
    form.measure = i.measure
    form.quantity = i.quantity
    form.unit_price = i.unit_price
    form.colors = i.colors

    openModal.value = true;
}

function resetValues() {
    form.id = null
    form.measure = null
    form.quantity = null
    form.unit_price = null
    form.colors = []

    openModal.value = false
}

//SEARCH SECTION
const queryParams = reactive({
    search: null,
    user_id: null,
});

const searchParams = new URLSearchParams(window.location.search);

if (searchParams.get("search")) {
    queryParams.search = searchParams.get("search");
}

if (searchParams.get("user_id")) {
    queryParams.user_id = searchParams.get("user_id");
}

const debouncedSearch = debounce(([search, user_id]) => {
    if (!search) {
        delete queryParams.search;
    }

    if (!user_id) {
        delete queryParams.user_id;
    }

    router.get(route('dashboard.inventory.index'), queryParams, {
        preserveState: true,
        preserveScroll: true,
        only: ["inventory", "total", "total_quantity"]
    })
}, 500);

watch(() => [queryParams.search, queryParams.user_id], debouncedSearch);
//END SEARCH SECTION

</script>
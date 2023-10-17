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

        <TableSection>
            <template #header>
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
                        <div class="flex gap-4">
                            <IconPencil size="22" role="button" @click="edit(i)" />
                            <IconTrash size="22" role="button" @click="destroy(i)" />
                        </div>
                    </td>
                </tr>
                <tr v-if="inventory.data.length == 0">
                    <td colspan="5" class="text-center">No hay datos que mostrar</td>
                </tr>
            </template>
            <template #paginator>
                <ThePaginator :links="inventory.links" />
            </template>
        </TableSection>

        <FormModal :show="openModal" title="Editar" @onCancel="resetValues()" @onSubmit="update()">
            <div class="grid grid-cols-2 gap-4">
                <InputForm text="Medida" v-model="form.measure" required />
                <InputForm text="Cantidad" v-model="form.quantity" type="number" required :min="1" />
                <InputForm text="Costo (Unidad)" v-model="form.unit_cost" type="number" required :min="1" />
                <InputForm text="Precio (Unidad)" v-model="form.unit_price" type="number" required :min="1" />
                <div class="flex justify-end col-span-2">
                    <div class="text-xl font-bold">
                        Total: {{ (form.quantity * form.unit_cost).toLocaleString() }}
                    </div>
                </div>
            </div>
        </FormModal>
    </AppLayout>
</template>

<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import TableSection from '@/Components/TableSection.vue';
import ThePaginator from "@/Components/ThePaginator.vue"
import { IconPencil } from '@tabler/icons-vue';
import { useForm } from '@inertiajs/vue3';
import { ref } from 'vue';
import FormModal from '@/Components/Modal/FormModal.vue';
import InputForm from '@/Components/Form/InputForm.vue';
import { toast } from '@/Use/toast';
import { IconTrash } from '@tabler/icons-vue';

const props = defineProps({
    product: {
        type: Object,
        required: true,
    },
    inventory: {
        type: Object,
        required: true,
    },
});

const openModal = ref(false);

const form = useForm({
    id: null,
    measure: null,
    quantity: null,
    unit_cost: null,
    unit_price: null,
})

const breads = [
    {
        name: 'Inicio',
        route: route('dashboard.users.index'),
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
    Object.assign(form, i)
    openModal.value = true;
}

const resetValues = () => {
    openModal.value = false
    form.reset()
}

const update = () => {
    form.put(route('dashboard.inventory.update', form.id), {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => {
            toast.success('Registro actualizado correctamente')
            resetValues()
        }
    })
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

</script>
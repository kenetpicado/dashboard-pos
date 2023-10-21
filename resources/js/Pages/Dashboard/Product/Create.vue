<template>
    <AppLayout title="Agregar" :breads="breads">
        <template #header>
            <span class="title">
                Agregar producto
            </span>
        </template>

        <FormSection @onSubmit="onSubmit">
            <InputForm text="SKU" v-model="form.sku" required />
            <InputForm text="Name" v-model="form.name" required />
            <InputForm text="Image" v-model="form.image" type="url" />
            <InputForm text="Descuento" v-model="form.discount" type="number" :min="0" />

            <template v-if="isNew">
                <div class="col-span-2">
                    <button class="primary-button" type="button" @click="openModal = true">
                        Agregar inventario
                    </button>
                </div>

                <div class="overflow-y-auto col-span-2">
                    <table class="w-full text-sm text-left text-gray-600 mt-5">
                        <thead class="bg-gray-50">
                            <tr>
                                <th>Medida</th>
                                <th>Cant.</th>
                                <th>Costo (ud.)</th>
                                <th>Total</th>
                                <th>Precio (ud.)</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100 border-t border-gray-100">
                            <tr v-for="(i, index) in form.inventory">
                                <td>{{ i.measure }}</td>
                                <td>{{ i.quantity }}</td>
                                <td>
                                    <span class="font-bold">C${{ i.cost }}</span>
                                </td>
                                <td>C${{ (i.quantity * i.cost).toLocaleString() }}</td>
                                <td>
                                    C${{ i.price }}
                                </td>
                                <td>
                                    <div class="flex gap-2">
                                        <IconTrash role="button" @click="remove(index)" size="20" />
                                        <IconEdit role="button" @click="edit(index)" size="20" />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td v-if="form.inventory.length == 0" colspan="6" class="text-center">
                                    No hay datos que mostrar
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="5" class="text-right font-bold">
                                    Costo total
                                </td>
                                <td class="font-bold">
                                    C${{ total.toLocaleString() }}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </template>
        </FormSection>

        <FormModal :show="openModal" title="Inventario" @onCancel="resetValues" @onSubmit="addInventory">
            <div class="grid grid-cols-2 gap-4">
                <InputForm text="Medida" v-model="currentProduct.measure" required />
                <InputForm text="Cantidad" v-model="currentProduct.quantity" type="number" required :min="1" />
                <InputForm text="Costo (Unidad)" v-model="currentProduct.cost" type="number" required :min="1" />
                <InputForm text="Precio (Unidad)" v-model="currentProduct.price" type="number" required :min="1" />
            </div>

            <div class="flex justify-end col-span-2 items-center gap-4">
                <div class="text-xl font-bold">
                    Total: C${{ (currentProduct.quantity * currentProduct.cost).toLocaleString() }}
                </div>
            </div>
        </FormModal>

    </AppLayout>
</template>

<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import { useForm } from '@inertiajs/vue3';
import { ref, reactive, computed } from 'vue';
import FormSection from '@/Components/Form/FormSection.vue';
import InputForm from '@/Components/Form/InputForm.vue';
import { IconTrash } from '@tabler/icons-vue';
import FormModal from '@/Components/Modal/FormModal.vue';
import { IconEdit } from '@tabler/icons-vue';

const props = defineProps({
    product: {
        type: Object,
        required: false,
    },
    isNew: {
        type: Boolean,
        default: true,
    },
});

const form = useForm({
    id: props.product?.id ?? null,
    sku: props.product?.sku ?? null,
    name: props.product?.name ?? null,
    image: props.product?.image ?? null,
    discount: props.product?.discount ?? null,
    inventory: [],
    total: 0,
})

const currentProduct = reactive({
    measure: null,
    quantity: null,
    cost: null,
    price: null,
});

const openModal = ref(false);
const currentIndex = ref(null);

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
        name: 'Crear',
        route: route('dashboard.products.create'),
    },
];

function addInventory() {
    if (currentIndex.value !== null) {
        form.inventory[currentIndex.value] = { ...currentProduct };
    } else {
        form.inventory.push({ ...currentProduct });
    }

    resetValues();
}

function remove(index) {
    form.inventory.splice(index, 1);
}

function edit(index) {
    currentIndex.value = index;
    currentProduct.measure = form.inventory[index].measure;
    currentProduct.quantity = form.inventory[index].quantity;
    currentProduct.cost = form.inventory[index].cost;
    currentProduct.price = form.inventory[index].price;
    openModal.value = true;
    currentIndex.value = index;
}

function resetValues() {
    currentProduct.measure = null;
    currentProduct.quantity = null;
    currentProduct.cost = null;
    currentProduct.price = null;
    openModal.value = false;
    currentIndex.value = null;
}

function onSubmit() {
    if (props.isNew) {
        form.total = total.value
        form.post(route('dashboard.products.store'), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                resetValues();
                toast.success('Producto agregado');
            },
        });
    } else {
        form.put(route('dashboard.products.update', form.id), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                resetValues();
                toast.success('Producto actualizado');
            },
        });
    }
}

const total = computed(() => {
    return form.inventory.reduce((acc, i) => acc + (i.quantity * i.cost), 0);
});

</script>
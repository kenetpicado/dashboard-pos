<template>
    <AppLayout title="Agregar" :breads="breads">
        <template #header>
            <span class="title">
                Agregar
            </span>
        </template>

        <FormSection @onSubmit="onSubmit" @onCancel="$inertia.visit(route('dashboard.products.index'))">
            <InputForm text="SKU" v-model="form.sku" required />
            <InputForm text="Nombre" v-model="form.name" required />
            <InputForm text="Imagen" v-model="form.image" type="url" />
            <InputForm text="Descuento" v-model="form.discount" type="number" :min="0" />
            <SelectForm text="Categoria" v-model="form.category_id">
                <option selected value="">Ninguna</option>
                <option v-for="item in categories" :value="item.id">{{ item.name }}</option>
            </SelectForm>

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
                                <th>Colors</th>
                                <th>Medida</th>
                                <th>Precio (ud.)</th>
                                <th>Cant.</th>
                                <th>Costo (ud.)</th>
                                <th>Total</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100 border-t border-gray-100">
                            <tr v-for="(i, index) in form.inventory">
                                <td>
                                    <ColorList :colors="i.colors" />
                                </td>
                                <td>{{ i.measure }}</td>
                                <td>
                                    C${{ i.price }}
                                </td>
                                <td>{{ i.quantity }}</td>
                                <td>
                                    <span class="font-bold">C${{ i.cost }}</span>
                                </td>
                                <td>C${{ (i.quantity * i.cost).toLocaleString() }}</td>
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
                <datalist id="measures">
                    <option v-for="item in measures" :value="item" />
                </datalist>
                <InputForm text="Medida" v-model="currentProduct.measure" required :min="1" list="measures" />
                <InputForm text="Cantidad" v-model="currentProduct.quantity" type="number" required :min="1" />
                <InputForm text="Costo (Unidad)" v-model="currentProduct.cost" type="number" required :min="1" />
                <InputForm text="Precio (Unidad)" v-model="currentProduct.price" type="number" required :min="1" />

                <div>
                    <InputForm text="Vence" v-if="is_caducable" v-model="currentProduct.expired_at" type="date" />

                    <div v-if="manage_colors">
                        <div class="flex items-center mb-4">
                            <button type="button" class="primary-button mr-4" @click="addColor">
                                Agregar color
                            </button>
                            <input type="color" v-model="colorInput" class="h-8">
                        </div>

                        <ColorList v-if="selectedColors.length > 0" :colors="selectedColors" @removeColor="removeColor" />
                    </div>
                </div>

                <ImagePreview :image="form.image"/>
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
import SelectForm from '@/Components/Form/SelectForm.vue';
import { toast } from '@/Use/toast';
import ColorList from '@/Components/ColorList.vue';
import ImagePreview from '@/Components/ImagePreview.vue';

const props = defineProps({
    product: {
        type: Object,
        required: false,
    },
    isNew: {
        type: Boolean,
        default: true,
    },
    measures: {
        type: Object,
        required: false,
    },
    categories: {
        type: Object,
        required: false,
    },
    is_caducable: {
        type: Boolean,
        default: false,
    },
    manage_colors: {
        type: Boolean,
        default: false,
    },
});

const form = useForm({
    id: props.product?.id ?? null,
    sku: props.product?.sku ?? null,
    name: props.product?.name ?? null,
    image: props.product?.image ?? null,
    discount: props.product?.discount ?? 0,
    category_id: props.product?.category_id ?? null,
    inventory: [],
    total: 0,
})

const colorInput = ref('#000000');
const selectedColors = ref([]);

const currentProduct = reactive({
    measure: null,
    quantity: null,
    cost: null,
    price: null,
    expired_at: null,
    colors: [],
});

const openModal = ref(false);
const currentIndex = ref(null);

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
        name: 'Crear',
        route: route('dashboard.products.create'),
    },
];

function addInventory() {
    currentProduct.colors = [...selectedColors.value];

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
    currentProduct.expired_at = form.inventory[index].expired_at;
    selectedColors.value = [...form.inventory[index].colors];
    openModal.value = true;
    currentIndex.value = index;
}

function resetValues() {
    currentProduct.measure = null;
    currentProduct.quantity = null;
    currentProduct.cost = null;
    currentProduct.price = null;
    currentProduct.expired_at = null;
    selectedColors.value = [];
    openModal.value = false;
    currentIndex.value = null;
}

function onSubmit() {
    if (!form.discount) {
        form.discount = 0;
    }

    if (props.isNew) {
        form.total = total.value
        form.post(route('dashboard.products.store'), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                resetValues();
                toast.success('Producto agregado');
            },
            onError: (err) => {
                console.log(err);
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

function addColor() {
    if (!colorInput.value) {
        return;
    }

    if (selectedColors.value.find((item) => item == colorInput.value)) {
        return;
    }

    selectedColors.value.push(colorInput.value);
}

function removeColor(color) {
    selectedColors.value = selectedColors.value.filter((item) => item != color);
}

</script>
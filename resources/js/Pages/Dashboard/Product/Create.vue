<template>
    <AppLayout title="Producto" :breads="breads">
        <template #header>
            <span class="title mt-1">
                {{ props.isNew ? 'Agregar' : 'Actualizar' }}
            </span>
        </template>
        <FormSection title="Producto" @onSubmit="onSubmit" @onCancel="onCancel" :isNew="isNew">
            <InputForm text="Name" v-model="form.name" required />
            <InputForm text="SKU" v-model="form.sku" required />
            <InputForm text="Description" v-model="form.description" />
            <SelectForm v-model="form.supplier_id" text="Supplier" name="supplier_id">
                <option selected value="">None</option>
                <option v-for="supplier in suppliers" :value="supplier.id">{{ supplier.name }}</option>
            </SelectForm>
            <InputForm text="Status" v-model="form.status" />
            <InputForm text="Image" v-model="form.image" type="url" />
            <InputForm text="Note" v-model="form.notes" />
        </FormSection>
    </AppLayout>
</template>

<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import FormSection from '@/Components/Form/FormSection.vue';
import InputForm from '@/Components/Form/InputForm.vue';
import { router, useForm } from '@inertiajs/vue3';
import { toast } from '@/Use/toast';
import SelectForm from "@/Components/Form/SelectForm.vue"

const props = defineProps({
    isNew: {
        type: Boolean,
        default: true,
    },
    suppliers: {
        type: Object,
        required: true,
    },
    products: {
        type: Object,
        default: () => ({}),
    }
});

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
        name: props.isNew ? 'Agregar' : 'Actualizar',
        route: props.isNew ? route('dashboard.products.create') : route('dashboard.products.edit', props.products.id),
    },
];

const form = useForm({
    name: props.products?.name ?? '',
    sku: props.products?.sku ?? '',
    description: props.products?.description ?? '',
    supplier_id: props.products?.supplier_id ?? '',
    status: props.products?.status ?? '',
    image: props.products?.image ?? '',
    notes: props.products?.notes ?? '',
});

function onSubmit() {
    if (props.isNew) {
        form.post(route('dashboard.products.store'), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                toast.success('Producto agregado');
                router.visit(route('dashboard.products.index'))
            },
        });
    } else {
        form.put(route('dashboard.products.update', props.products.id), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                toast.success('Producto actualizado');
                router.visit(route('dashboard.products.index'))
            },
        });
    }
}

function onCancel() {
    router.visit(route('dashboard.products.index'));
}

</script>
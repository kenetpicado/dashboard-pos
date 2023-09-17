<template>
    <AppLayout :title="props.isNew ? 'Create' : 'Edit'" :breads="breads">
        <template #header>
            <span class="title mt-1">
                {{ props.isNew ? 'Create' : 'Edit' }}
            </span>
        </template>
        <FormSection title="Create" @onSubmit="onSubmit" @onCancel="onCancel">
            <InputForm text="Name" v-model="form.name" required />
            <InputForm text="SKU" v-model="form.sku" required />
            <InputForm text="Description" v-model="form.description" />
            <SelectForm v-model="form.supplier_id" text="Supplier" name="supplier_id">
                <option selected value="">None</option>
                <option v-for="supplier in suppliers" :value="supplier.id">{{ supplier.name }}</option>
            </SelectForm>
            <InputForm text="Status" v-model="form.status" />
            <InputForm text="Image" v-model="form.image" />
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
        name: 'Home',
        route: route('dashboard.users.index'),
    },
    {
        name: 'Products',
        route: route('dashboard.products.index'),
    },
    {
        name: props.isNew ? 'Create' : 'Edit',
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
                toast.success('Product created successfully');
                router.visit(route('dashboard.products.index'))
            },
        });
    } else {
        form.put(route('dashboard.products.update', props.products.id), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                toast.success('Product updated successfully');
                router.visit(route('dashboard.products.index'))
            },
        });
    }
}

function onCancel() {
    router.visit(route('dashboard.products.index'));
}

</script>
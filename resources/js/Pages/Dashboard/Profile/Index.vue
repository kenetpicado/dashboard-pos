<template>
    <AppLayout title="Perfil" :breads="breads">
        <template #header>
            <span class="title mt-1">
                Perfil
            </span>
        </template>

        <FormSection title="Create" @onSubmit="onSubmit" @onCancel="onCancel" :isNew="false">
            <h1 class="text-2xl font-extrabold text-gray-600 col-span-2 mb-4">
                Datos personales
            </h1>
            <InputForm text="Name" v-model="form.name" required />
            <InputForm text="Email" v-model="form.email" type="email" required />
            <InputForm text="Password" v-model="form.password" type="password" />
            <InputForm text="Password confirmation" v-model="form.password_confirmation" type="password" />
            <div class="col-span-2 mb-2 text-end">
                <span class="text-sm text-gray-600">Dejar la contraseña en blanco si no la desea actualizar.</span>
            </div>
            <h1 class="text-2xl font-extrabold text-gray-600 col-span-2 mb-4">
                Configuraciones
            </h1>
            <InputForm text="Telefono empresarial" v-model="form.settings.mobile" type="number" :min="8" />
            <InputForm text="Alerta minimo de productos" v-model="form.settings.product_min" type="number" :min="1" />
            <SelectForm v-model="form.settings.colors" text="Colores">
                <option value="not_manage">No administrar</option>
                <option value="manage">Administrar</option>
            </SelectForm>
            <SelectForm v-model="form.settings.product_type" text="Tipo de productos">
                <option value="no_caducable">No perecederos</option>
                <option value="caducable">Perecederos</option>
            </SelectForm>

        </FormSection>
    </AppLayout>
</template>

<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import FormSection from '@/Components/Form/FormSection.vue';
import InputForm from '@/Components/Form/InputForm.vue';
import { router, useForm } from '@inertiajs/vue3';
import { toast } from '@/Use/toast';
import SelectForm from '@/Components/Form/SelectForm.vue';

const breads = [
    {
        name: 'Inicio',
        route: route('dashboard.index'),
    },
    {
        name: 'Perfil',
        route: route('dashboard.profile.index'),
    },
];

const props = defineProps({
    profile: {
        type: Object,
        required: true,
    },
    settings: {
        type: Object,
        required: true,
    },
});

const form = useForm({
    id: props.profile.id,
    name: props.profile.name,
    email: props.profile.email,
    password: '',
    password_confirmation: '',
    settings: {
        product_min: props.settings.find((setting) => setting.key === 'product_min')?.value ?? null,
        product_type: props.settings.find((setting) => setting.key === 'product_type')?.value ?? 'no_caducable',
        colors: props.settings.find((setting) => setting.key === 'colors')?.value ?? 'not_manage',
        mobile: props.settings.find((setting) => setting.key === 'mobile')?.value ?? null,
    },
});

function onSubmit() {
    if (form.password === '') {
        delete form.password;
        delete form.password_confirmation;
    }

    form.put(route('dashboard.profile.update', form.id), {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => {
            toast.success('Perfil actualizado');
        },
        onError: (err) => {
            console.log(err);
        },
    });
}

function onCancel() {
    router.visit(route('dashboard.index'));
}

</script>
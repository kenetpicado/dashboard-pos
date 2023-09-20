<template>
    <AppLayout title="Usuario" :breads="breads">
        <template #header>
            <span class="title mt-1">
                Agregar
            </span>
        </template>

        <FormSection title="Usuario" @onSubmit="onSubmit" @onCancel="onCancel">
            <InputForm text="Name" v-model="form.name" required />
            <InputForm text="Email" v-model="form.email" type="email" required />
            <InputForm text="Password" v-model="form.password" type="password" required />
            <InputForm text="Password confirmation" v-model="form.password_confirmation" type="password" required />
        </FormSection>
    </AppLayout>
</template>

<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import FormSection from '@/Components/Form/FormSection.vue';
import InputForm from '@/Components/Form/InputForm.vue';
import { router, useForm } from '@inertiajs/vue3';
import { toast } from '@/Use/toast';

const breads = [
    {
        name: 'Home',
        route: route('dashboard.users.index'),
    },
    {
        name: 'Users',
        route: route('dashboard.users.index'),
    },
    {
        name: 'Create',
        route: route('dashboard.users.create'),
    },
];

const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
});

function onSubmit() {
    form.post(route('dashboard.users.store'), {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => {
            toast.success('User created successfully');
        },
    });
}

function onCancel() {
    router.visit(route('dashboard.users.index'));
}

</script>
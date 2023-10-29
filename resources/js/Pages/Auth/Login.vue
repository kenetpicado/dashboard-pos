<script setup>
import { Head, useForm } from '@inertiajs/vue3';
import Checkbox from '@/Components/Form/Checkbox.vue';
import InputForm from '@/Components/Form/InputForm.vue';

defineProps({
    status: String,
    app_name: String,
});

const form = useForm({
    email: 'johndoe@gmail.com',
    password: 'password',
    remember: false,
});

const submit = () => {
    form.transform(data => ({
        ...data,
        remember: form.remember ? 'on' : '',
    })).post(route('login'), {
        onFinish: () => form.reset('password'),
    });
};

</script>

<template>
    <Head title="Log in" />

    <div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 px-4 lg:px-0">

        <div class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden rounded-xl">
            <div>
                <img class="mx-auto h-20 w-auto"
                    src="/shop.png"
                    alt="Workflow" />
                <h2 class="mt-4 text-center text-2xl font-extrabold text-gray-900">
                    {{ app_name }}
                </h2>
                <p class="mt-2 mb-4 text-center text-sm text-gray-600">
                    Inicia sesión
                </p>
            </div>
            <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
                {{ status }}
            </div>

            <form @submit.prevent="submit">
                <InputForm text="Correo" v-model="form.email" type="email" name="email" required autofocus />

                <InputForm text="Contraseña" v-model="form.password" type="password" name="password" required />

                <Checkbox v-model:checked="form.remember" text="Recuerdame" />

                <div class="flex items-center justify-end mt-4">
                    <button type="submit" :class="['primary-button', form.processing ? 'opacity-25' : '']"
                        :disabled="form.processing">
                        Entrar
                    </button>
                </div>
            </form>
        </div>

    </div>
</template>

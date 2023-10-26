<template>
    <FormModal :show="openModal" title="Editar" @onCancel="resetValues()" @onSubmit="update()">
        <div class="grid grid-cols-2 gap-4">
            <datalist id="measures">
                <option v-for="item in measures" :value="item" />
            </datalist>
            <InputForm text="Medida" v-model="form.measure" required list="measures" />
            <InputForm text="Cantidad" v-model="form.quantity" type="number" required :min="1" />
            <InputForm text="Precio (Unidad)" v-model="form.unit_price" type="number" required :min="1" />
        </div>

    </FormModal>
</template>

<script setup>
import { toast } from '@/Use/toast';
import FormModal from './Modal/FormModal.vue';
import { useForm } from '@inertiajs/vue3';
import InputForm from './Form/InputForm.vue';
import { watch } from 'vue';

const props = defineProps({
    measures: {
        type: Object,
        required: true,
    },
    openModal: {
        type: Boolean,
        default: false,
    },
    form: {
        type: Object,
        required: true,
    },
})

const emit = defineEmits(['onCancel'])

const form = useForm({
    id: props.form?.id ?? null,
    measure: props.form?.measure ?? null,
    quantity: props.form?.quantity ?? null,
    unit_price: props.form?.unit_price ?? null,
})

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

const resetValues = () => {
    form.reset()
    emit('onCancel')
}

watch(() => props.form, (value) => {
    form.id = value?.id ?? null
    form.measure = value?.measure ?? null
    form.quantity = value?.quantity ?? null
    form.unit_price = value?.unit_price ?? null
}, { deep: true })

</script>
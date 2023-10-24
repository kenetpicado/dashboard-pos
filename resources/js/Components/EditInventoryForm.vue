<template>
    <FormModal :show="openModal" title="Editar" @onCancel="resetValues()" @onSubmit="update()">
        <div class="grid grid-cols-2 gap-4">
            <datalist id="measures">
                <option v-for="item in measures" :value="item" />
            </datalist>
            <InputForm text="Medida" v-model="form.measure" required list="measures" />
            <InputForm text="Cantidad" v-model="form.quantity" type="number" required :min="1" />
            <InputForm text="Costo (Unidad)" v-model="form.unit_cost" type="number" required :min="1" />
            <InputForm text="Precio (Unidad)" v-model="form.unit_price" type="number" required :min="1" />
            <!-- <div class="text-gray-400 col-span-2">
                Cuidado! Esta acción debe ejecutarse con precaución en casos específicos ya que no se actualizará el total de la
                transacción a la que pertenece este registro.
            </div> -->
            <div class="flex justify-end col-span-2">
                <div class="text-xl font-bold">
                    Total: C${{ (form.quantity * form.unit_cost).toLocaleString() }}
                </div>
            </div>
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
    unit_cost: props.form?.unit_cost ?? null,
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
    form.unit_cost = value?.unit_cost ?? null
    form.unit_price = value?.unit_price ?? null
}, { deep: true })

</script>
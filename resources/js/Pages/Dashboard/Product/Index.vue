<template>
    <AppLayout title="Products" :breads="breads">
        <template #header>
            <span class="title">
                Productos
            </span>
            <AddButton :href="route('dashboard.products.create')" />
        </template>

        <div class="mb-3">
            <div class="grid grid-cols-5 gap-4">
                <InputForm text="Buscar" type="search" v-model="queryParams.search" />
            </div>
        </div>

        <TableSection>
            <template #header>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Categoria</th>
                <th>Acciones</th>
            </template>

            <template #body>
                <tr v-for="(product, index) in products.data" class="hover:bg-gray-50">
                    <td>
						<div v-if="product.image" class="h-36 w-36 flex items-center justify-center">
							<img :src="product.image" onerror="this.src='/not-found.jpg'" alt="Imagen"
								class="max-h-full max-w-full rounded-lg">
						</div>
					</td>
                    <td>
                        <span class="uppercase me-3">
                            {{ product.name }}
                        </span>
                        <span v-if="product.discount" class="badge-red">
                            C${{ product.discount }} Off
                        </span>
                        <div class="mt-2 text-indigo-600">
                            {{ product.sku }}
                        </div>
                    </td>
                    <td>
                        <span class="uppercase">
                            {{ product.category?.name ?? 'Ninguna' }}
                        </span>
                    </td>
                    <td>
                        <div class="flex gap-4">
                            <Link :href="route('dashboard.products.show', product.id)" tooltip="Detalles">
                            <IconEye size="22" role="button" />
                            </Link>

                            <Link :href="route('dashboard.products.edit', product.id)" tooltip="Editar">
                            <IconPencil size="22" role="button" />
                            </Link>
                        </div>
                    </td>
                </tr>
                <tr v-if="products.data.length == 0">
                    <td colspan="3" class="text-center">No hay datos que mostrar</td>
                </tr>
            </template>

            <template #paginator>
                <ThePaginator :links="products.links" />
            </template>
        </TableSection>
    </AppLayout>
</template>

<script setup>
import AddButton from '@/Components/Buttons/AddButton.vue';
import InputForm from '@/Components/Form/InputForm.vue';
import TableSection from '@/Components/TableSection.vue';
import ThePaginator from '@/Components/ThePaginator.vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import { Link, router } from '@inertiajs/vue3';
import { IconEye, IconPencil } from '@tabler/icons-vue';
import { reactive, watch } from 'vue';
import { debounce } from "lodash";

defineProps({
    products: {
        type: Object,
        required: true,
    }
});

const breads = [
    {
        name: 'Inicio',
        route: route('dashboard.index'),
    },
    {
        name: 'Productos',
        route: route('dashboard.products.index'),
    },
];

//SEARCH SECTION
const queryParams = reactive({
    search: null,
});

const searchParams = new URLSearchParams(window.location.search);

if (searchParams.get("search")) {
    queryParams.search = searchParams.get("search");
}

const debouncedSearch = debounce((value) => {
    if (!value) {
        delete queryParams.search;
    }

    router.get(route('dashboard.products.index'), queryParams, {
        preserveState: true,
        preserveScroll: true,
        only: ["products"]
    })
}, 500);

watch(() => queryParams.search, debouncedSearch);
//END SEARCH SECTION

</script>
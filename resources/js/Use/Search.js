import { watch, reactive } from "vue";
import { router, useForm } from "@inertiajs/vue3";

export const queryParams = reactive({
    search: null,
});

export function setParams() {
    const searchParams = new URLSearchParams(window.location.search);

    if (searchParams.get("search")) {
        queryParams.search = searchParams.get("search");
    }
}

export function watchSearch(fullRoute, array) {
    watch(
        () => queryParams.search,
        (value) => {
            if (!value) {
                delete queryParams.search;
            }

            router.get(fullRoute, queryParams, {
                preserveState: true,
                preserveScroll: true,
                only: array,
            });
        }
    );
}

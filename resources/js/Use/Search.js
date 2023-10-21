import { watch, reactive } from "vue";
import { router } from "@inertiajs/vue3";
import { debounce } from "lodash";

export const queryParams = reactive({
    search: null,
    user_id: null,
});

export function setParams() {
    const searchParams = new URLSearchParams(window.location.search);

    if (searchParams.get("search")) {
        queryParams.search = searchParams.get("search");
    }

    if (searchParams.get("user_id")) {
        queryParams.user_id = searchParams.get("user_id");
    }
}

export function getData(fullRoute, array) {
    router.get(fullRoute, queryParams, {
        preserveState: true,
        preserveScroll: true,
        only: array,
    });
}

export function watchSearch(fullRoute, array) {
    const debouncedSearch = debounce((value) => {
        if (!value) {
            delete queryParams.search;
        }

        if (!queryParams.user_id) {
            delete queryParams.user_id;
        }

        getData(fullRoute, array);
    }, 500);

    watch(() => queryParams.search, debouncedSearch);
}

export function watchUser(fullRoute, array) {
    const debouncedUser = debounce((value) => {
        if (!value) {
            delete queryParams.user_id;
        }

        if (!queryParams.search) {
            delete queryParams.search;
        }

        getData(fullRoute, array);
    }, 500);

    watch(() => queryParams.user_id, debouncedUser);
}

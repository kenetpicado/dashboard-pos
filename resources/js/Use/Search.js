import { watch, reactive } from "vue";
import { router } from "@inertiajs/vue3";
import { debounce } from "lodash";

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
    // watch(
    //     () => queryParams.search,
    //     (value) => {
    //         if (!value) {
    //             delete queryParams.search;
    //         }

    //         router.get(fullRoute, queryParams, {
    //             preserveState: true,
    //             preserveScroll: true,
    //             only: array,
    //         });
    //     }
    // );
    const debouncedSearch = debounce((value) => {
        if (!value) {
            delete queryParams.search;
        }

        router.get(fullRoute, queryParams, {
            preserveState: true,
            preserveScroll: true,
            only: array,
        });
    }, 500);

    watch(() => queryParams.search, debouncedSearch);
}

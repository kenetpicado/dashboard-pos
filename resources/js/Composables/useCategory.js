import { confirmAlert } from "@/Use/helpers";
import { toast } from "@/Use/toast";
import { useForm } from "@inertiajs/vue3";

export function useCategory() {
    const form = useForm({
        id: "",
        name: "",
        parent_id: null,
    });

    function store(onDone = null) {
        form.post(route("dashboard.categories.store"), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                toast.success("Saved successfully");
                if (onDone) onDone();
            },
        });
    }

    function update(onDone = null) {
        form.put(route('dashboard.categories.update', form.id), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                toast.success('Saved successfully');
                if (onDone) onDone();
            },
        });
    }

    function destroy(id) {
        confirmAlert({
            message: 'Are you sure you want to delete this category?',
            onConfirm: () => {
                form.delete(route('dashboard.categories.destroy', id), {
                    preserveScroll: true,
                    preserveState: true,
                    onSuccess: () => {
                        toast.success('Deleted successfully');
                    },
                });
            },
        })
    }

    return { form, store, update, destroy };
}

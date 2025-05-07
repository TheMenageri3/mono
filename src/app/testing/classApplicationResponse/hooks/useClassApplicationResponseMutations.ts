import { api } from "@/trpc/react";
import { showToast } from "@/components/ui/toast";

export const useClassApplicationResponseMutations = () => {
    const utils = api.useUtils();

    // Create class application response mutation
    const useCreateClassApplicationResponse = () => {
        const {
            mutate: createClassApplicationResponse,
            isPending,
            isSuccess,
            isError,
            error,
            reset,
        } = api.classApplicationResponse.create.useMutation({
            onSuccess: () => {
                utils.classApplicationResponse.readAll.invalidate();
                showToast.success({
                    title: "Class application response created successfully",
                    description:
                        "Your class application response has been created successfully",
                });
            },
            onError: (error) => {
                showToast.error({
                    title: "Error creating class application response",
                    description: error.message,
                });
            },
        });

        return {
            createClassApplicationResponse,
            isPending,
            isSuccess,
            isError,
            error,
            reset,
        };
    };

    // Update class application response mutation
    const useUpdateClassApplicationResponse = () => {
        const {
            mutate: updateClassApplicationResponse,
            isPending,
            isSuccess,
            isError,
            error,
            reset,
        } = api.classApplicationResponse.update.useMutation({
            onSuccess: () => {
                utils.classApplicationResponse.readAll.invalidate();
                showToast.success({
                    title: "Class application response updated successfully",
                    description:
                        "Your class application response has been updated successfully",
                });
            },
            onError: (error) => {
                showToast.error({
                    title: "Error updating class application response",
                    description: error.message,
                });
            },
        });

        return {
            updateClassApplicationResponse,
            isPending,
            isSuccess,
            isError,
            error,
            reset,
        };
    };

    // Delete class application response mutation
    const useDeleteClassApplicationResponse = () => {
        const {
            mutate: deleteClassApplicationResponse,
            isPending,
            isSuccess,
            isError,
            error,
            reset,
        } = api.classApplicationResponse.delete.useMutation({
            onSuccess: () => {
                utils.classApplicationResponse.readAll.invalidate();
                showToast.success({
                    title: "Class application response deleted successfully",
                    description:
                        "Your class application response has been deleted successfully",
                });
            },
            onError: (error) => {
                showToast.error({
                    title: "Error deleting class application response",
                    description: error.message,
                });
            },
        });

        return {
            deleteClassApplicationResponse,
            isPending,
            isSuccess,
            isError,
            error,
            reset,
        };
    };

    // Restore class application response mutation
    const useRestoreClassApplicationResponse = () => {
        const {
            mutate: restoreClassApplicationResponse,
            isPending,
            isSuccess,
            isError,
            error,
            reset,
        } = api.classApplicationResponse.restore.useMutation({
            onSuccess: () => {
                utils.classApplicationResponse.readAll.invalidate();
                showToast.success({
                    title: "Class application response restored successfully",
                    description:
                        "Your class application response has been restored successfully",
                });
            },
            onError: (error) => {
                showToast.error({
                    title: "Error restoring class application response",
                    description: error.message,
                });
            },
        });

        return {
            restoreClassApplicationResponse,
            isPending,
            isSuccess,
            isError,
            error,
            reset,
        };
    };

    return {
        useCreateClassApplicationResponse,
        useUpdateClassApplicationResponse,
        useDeleteClassApplicationResponse,
        useRestoreClassApplicationResponse,
    };
};

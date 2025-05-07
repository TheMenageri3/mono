import { api } from "@/trpc/react";
import { showToast } from "@/components/ui/toast";

export const useClassApplicationAnswerMutations = () => {
    const utils = api.useUtils();

    // Create class application answer mutation
    const useCreateClassApplicationAnswer = () => {
        const {
            mutate: createClassApplicationAnswer,
            isPending,
            isSuccess,
            isError,
            error,
            reset,
        } = api.classApplicationAnswer.create.useMutation({
            onSuccess: () => {
                utils.classApplicationAnswer.readAll.invalidate();
                showToast.success({
                    title: "Class application answer created successfully",
                    description:
                        "Your class application answer has been created successfully",
                });
            },
            onError: (error) => {
                showToast.error({
                    title: "Error creating class application answer",
                    description: error.message,
                });
            },
        });

        return {
            createClassApplicationAnswer,
            isPending,
            isSuccess,
            isError,
            error,
            reset,
        };
    };

    // Update class application answer mutation
    const useUpdateClassApplicationAnswer = () => {
        const {
            mutate: updateClassApplicationAnswer,
            isPending,
            isSuccess,
            isError,
            error,
            reset,
        } = api.classApplicationAnswer.update.useMutation({
            onSuccess: () => {
                utils.classApplicationAnswer.readAll.invalidate();
                showToast.success({
                    title: "Class application answer updated successfully",
                    description:
                        "Your class application answer has been updated successfully",
                });
            },
            onError: (error) => {
                showToast.error({
                    title: "Error updating class application answer",
                    description: error.message,
                });
            },
        });

        return {
            updateClassApplicationAnswer,
            isPending,
            isSuccess,
            isError,
            error,
            reset,
        };
    };

    // Delete class application answer mutation
    const useDeleteClassApplicationAnswer = () => {
        const {
            mutate: deleteClassApplicationAnswer,
            isPending,
            isSuccess,
            isError,
            error,
            reset,
        } = api.classApplicationAnswer.delete.useMutation({
            onSuccess: () => {
                utils.classApplicationAnswer.readAll.invalidate();
                utils.classApplicationAnswer.readDeleted.invalidate();
                showToast.success({
                    title: "Class application answer deleted successfully",
                    description:
                        "Your class application answer has been deleted successfully",
                });
            },
            onError: (error) => {
                showToast.error({
                    title: "Error deleting class application answer",
                    description: error.message,
                });
            },
        });

        return {
            deleteClassApplicationAnswer,
            isPending,
            isSuccess,
            isError,
            error,
            reset,
        };
    };

    // Restore class application answer mutation
    const useRestoreClassApplicationAnswer = () => {
        const {
            mutate: restoreClassApplicationAnswer,
            isPending,
            isSuccess,
            isError,
            error,
            reset,
        } = api.classApplicationAnswer.restore.useMutation({
            onSuccess: () => {
                utils.classApplicationAnswer.readAll.invalidate();
                utils.classApplicationAnswer.readDeleted.invalidate();
                showToast.success({
                    title: "Class application answer restored successfully",
                    description:
                        "Your class application answer has been restored successfully",
                });
            },
            onError: (error) => {
                showToast.error({
                    title: "Error restoring class application answer",
                    description: error.message,
                });
            },
        });

        return {
            restoreClassApplicationAnswer,
            isPending,
            isSuccess,
            isError,
            error,
            reset,
        };
    };

    return {
        useCreateClassApplicationAnswer,
        useUpdateClassApplicationAnswer,
        useDeleteClassApplicationAnswer,
        useRestoreClassApplicationAnswer,
    };
};

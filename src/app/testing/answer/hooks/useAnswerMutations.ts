import { api } from "@/trpc/react";
import { showToast } from "@/components/ui/toast";

export const useAnswerMutations = () => {
    const utils = api.useUtils();

    // Create answer mutation
    const useCreateAnswer = () => {
        const {
            mutate: createAnswer,
            isPending,
            isSuccess,
            isError,
            error,
            reset,
        } = api.answer.create.useMutation({
            onSuccess: () => {
                utils.answer.readAll.invalidate();
                showToast.success({
                    title: "Answer created successfully",
                    description: "Your answer has been created successfully",
                });
            },
            onError: (error) => {
                showToast.error({
                    title: "Error creating answer",
                    description: error.message,
                });
            },
        });

        return {
            createAnswer,
            isPending,
            isSuccess,
            isError,
            error,
            reset,
        };
    };

    // Update answer mutation
    const useUpdateAnswer = () => {
        const {
            mutate: updateAnswer,
            isPending,
            isSuccess,
            isError,
            error,
            reset,
        } = api.answer.update.useMutation({
            onSuccess: () => {
                utils.answer.readAll.invalidate();
                showToast.success({
                    title: "Answer updated successfully",
                    description: "Your answer has been updated successfully",
                });
            },
            onError: (error) => {
                showToast.error({
                    title: "Error updating answer",
                    description: error.message,
                });
            },
        });

        return {
            updateAnswer,
            isPending,
            isSuccess,
            isError,
            error,
            reset,
        };
    };

    // Delete answer mutation
    const useDeleteAnswer = () => {
        const {
            mutate: deleteAnswer,
            isPending,
            isSuccess,
            isError,
            error,
            reset,
        } = api.answer.delete.useMutation({
            onSuccess: () => {
                utils.answer.readAll.invalidate();
                utils.answer.readDeleted.invalidate();
                showToast.success({
                    title: "Answer deleted successfully",
                    description: "Your answer has been deleted successfully",
                });
            },
            onError: (error) => {
                showToast.error({
                    title: "Error deleting answer",
                    description: error.message,
                });
            },
        });

        return {
            deleteAnswer,
            isPending,
            isSuccess,
            isError,
            error,
            reset,
        };
    };

    // Restore answer mutation
    const useRestoreAnswer = () => {
        const {
            mutate: restoreAnswer,
            isPending,
            isSuccess,
            isError,
            error,
            reset,
        } = api.answer.restore.useMutation({
            onSuccess: () => {
                utils.answer.readAll.invalidate();
                utils.answer.readDeleted.invalidate();
                showToast.success({
                    title: "Answer restored successfully",
                    description: "Your answer has been restored successfully",
                });
            },
            onError: (error) => {
                showToast.error({
                    title: "Error restoring answer",
                    description: error.message,
                });
            },
        });

        return {
            restoreAnswer,
            isPending,
            isSuccess,
            isError,
            error,
            reset,
        };
    };

    return {
        useCreateAnswer,
        useUpdateAnswer,
        useDeleteAnswer,
        useRestoreAnswer,
    };
};

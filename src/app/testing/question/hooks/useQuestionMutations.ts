import { api } from "@/trpc/react";
import { showToast } from "@/components/ui/toast";

export const useQuestionMutations = () => {
    const utils = api.useUtils();

    // Create question mutation
    const useCreateQuestion = () => {
        const {
            mutate: createQuestion,
            isPending,
            isSuccess,
            isError,
            error,
            reset,
        } = api.question.create.useMutation({
            onSuccess: () => {
                utils.question.readAll.invalidate();
                showToast.success({
                    title: "Question created successfully",
                    description: "Your question has been created successfully",
                });
            },
            onError: (error) => {
                showToast.error({
                    title: "Error creating question",
                    description: error.message,
                });
            },
        });

        return {
            createQuestion,
            isPending,
            isSuccess,
            isError,
            error,
            reset,
        };
    };

    // Update question mutation
    const useUpdateQuestion = () => {
        const {
            mutate: updateQuestion,
            isPending,
            isSuccess,
            isError,
            error,
            reset,
        } = api.question.update.useMutation({
            onSuccess: () => {
                utils.question.readAll.invalidate();
                showToast.success({
                    title: "Question updated successfully",
                    description: "Your question has been updated successfully",
                });
            },
            onError: (error) => {
                showToast.error({
                    title: "Error updating question",
                    description: error.message,
                });
            },
        });

        return {
            updateQuestion,
            isPending,
            isSuccess,
            isError,
            error,
            reset,
        };
    };

    // Delete question mutation
    const useDeleteQuestion = () => {
        const {
            mutate: deleteQuestion,
            isPending,
            isSuccess,
            isError,
            error,
            reset,
        } = api.question.delete.useMutation({
            onSuccess: () => {
                utils.question.readAll.invalidate();
                utils.question.readDeleted.invalidate();
                showToast.success({
                    title: "Question deleted successfully",
                    description: "Your question has been deleted successfully",
                });
            },
            onError: (error) => {
                showToast.error({
                    title: "Error deleting question",
                    description: error.message,
                });
            },
        });

        return {
            deleteQuestion,
            isPending,
            isSuccess,
            isError,
            error,
            reset,
        };
    };

    // Restore question mutation
    const useRestoreQuestion = () => {
        const {
            mutate: restoreQuestion,
            isPending,
            isSuccess,
            isError,
            error,
            reset,
        } = api.question.restore.useMutation({
            onSuccess: () => {
                utils.question.readAll.invalidate();
                utils.question.readDeleted.invalidate();
                showToast.success({
                    title: "Question restored successfully",
                    description: "Your question has been restored successfully",
                });
            },
            onError: (error) => {
                showToast.error({
                    title: "Error restoring question",
                    description: error.message,
                });
            },
        });

        return {
            restoreQuestion,
            isPending,
            isSuccess,
            isError,
            error,
            reset,
        };
    };

    return {
        useCreateQuestion,
        useUpdateQuestion,
        useDeleteQuestion,
        useRestoreQuestion,
    };
};

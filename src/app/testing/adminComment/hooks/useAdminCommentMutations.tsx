import { api } from "@/trpc/react";
import { showToast } from "@/components/ui/toast";

export const useAdminCommentMutations = () => {
    const utils = api.useUtils();

    // create admin comment
    const useCreateAdminComment = () => {
        const {
            mutate: createAdminComment,
            isPending,
            error,
            reset,
        } = api.adminComment.create.useMutation({
            onSuccess: () => {
                utils.adminComment.read.invalidate();
                showToast.success({
                    title: "Admin comment created successfully",
                    description: "Your admin comment has been created successfully"
                });
            },
            onError: (error) => {
                showToast.error({
                    title: "Error creating admin comment",
                    description: error.message,
                });
            },
        });

        return {
            createAdminComment,
            isPending,
            error,
            reset,
        };
    };

    // update admin comment
    const useUpdateAdminComment = () => {
        const {
            mutate: updateAdminComment,
            isPending,
            error,
            reset,
        } = api.adminComment.update.useMutation({
            onSuccess: () => {
                utils.adminComment.read.invalidate();
                showToast.success({
                  title: "Admin comment updated successfully",
                  description: "Your admin comment has been updated successfully",
                });
              },
              onError: (error) => {
                showToast.error({
                  title: "Error updating admin comment",
                  description: error.message,
                });
              },
        });

        return {
            updateAdminComment,
            isPending,
            error,
            reset,
        };
    };

    //delete admin comment
    const useDeleteAdminComment = () => {
        const {
            mutate: deleteAdminComment,
            isPending,
            error,
            reset,
        } = api.adminComment.delete.useMutation({
            onSuccess: () => {
                utils.adminComment.read.invalidate();
                showToast.success({
                    title: "Admin comment deleted successfully",
                    description: "Your admin comment has been deleted successfully",
                });
            },
            onError: (error) => {
                showToast.error({
                    title: "Error deleting admin comment",
                    description: error.message,
                });
            },
        });

        return {
            deleteAdminComment,
            isPending,
            error,
            reset,
        };
    };

    //restore admin comment
    const useRestoreAdminComment = () => {
        const {
            mutate: restoreAdminComment,
            isPending,
            error,
            reset,
        } = api.adminComment.restore.useMutation({
            onSuccess: () => {
                utils.adminComment.read.invalidate();
                showToast.success({
                    title: "Admin comment restored successfully",
                    description: "Your admin comment has been restored successfully",
                });
            },
            onError: (error) => {
                showToast.error({
                    title: "Error restoring admin comment",
                    description: error.message,
                });
            },
        });

        return {
            restoreAdminComment,
            isPending,
            error,
            reset,
        };
    };

    return {
        useCreateAdminComment,
        useUpdateAdminComment,
        useDeleteAdminComment,
        useRestoreAdminComment,
    };
};
import { api } from "@/trpc/react";
import { showToast } from "@/components/ui/toast";

export const useTagMutations = () => {
  const utils = api.useUtils();

  const useCreateTag = () => {
    const {
      mutate: createTag,
      isPending,
      error,
      reset,
    } = api.tag.create.useMutation({
      onSuccess: () => {
        utils.tag.read.invalidate();
        showToast.success({
          title: "Tag created successfully",
          description: "Your tag has been created successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error creating tag",
          description: error.message,
        });
      },
    });

    return {
      createTag,
      isPending,
      error,
      reset,
    };
  };

  // Update tag mutation
  const useUpdateTag = () => {
    const {
      mutate: updateTag,
      isPending,
      error,
      reset,
    } = api.tag.update.useMutation({
      onSuccess: () => {
        utils.tag.read.invalidate();
        showToast.success({
          title: "Tag updated successfully",
          description: "Your tag has been updated successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error updating tag",
          description: error.message,
        });
      },
    });

    return {
      updateTag,
      isPending,
      error,
      reset,
    };
  };

  // Delete tag mutation
  const useDeleteTag = () => {
    const {
      mutate: deleteTag,
      isPending,
      error,
      reset,
    } = api.tag.delete.useMutation({
      onSuccess: () => {
        utils.tag.read.invalidate();
        showToast.success({
          title: "Tag deleted successfully",
          description: "Your tag has been deleted successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error deleting tag",
          description: error.message,
        });
      },
    });

    return {
      deleteTag,
      isPending,
      error,
      reset,
    };
  };

  // Restore tag mutation
  const useRestoreTag = () => {
    const {
      mutate: restoreTag,
      isPending,
      error,
      reset,
    } = api.tag.restore.useMutation({
      onSuccess: () => {
        utils.tag.read.invalidate();
        showToast.success({
          title: "Tag restored successfully",
          description: "Your tag has been restored successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error restoring tag",
          description: error.message,
        });
      },
    });

    return {
      restoreTag,
      isPending,
      error,
      reset,
    };
  };

  return {
    useCreateTag,
    useUpdateTag,
    useDeleteTag,
    useRestoreTag,
  };
};

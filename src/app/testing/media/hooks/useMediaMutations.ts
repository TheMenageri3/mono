import { api } from "@/trpc/react";
import { showToast } from "@/components/ui/toast";

export const useMediaMutations = () => {
  const utils = api.useUtils();

  // Create media mutation
  const useCreateMedia = () => {
    const {
      mutate: createMedia,
      isPending,
      error,
      reset,
    } = api.media.create.useMutation({
      onSuccess: () => {
        utils.media.read.invalidate();
        showToast.success({
          title: "Media created successfully",
          description: "Your media has been created successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error creating media",
          description: error.message,
        });
      },
    });

    return {
      createMedia,
      isPending,
      error,
      reset,
    };
  };

  // Update media mutation
  const useUpdateMedia = () => {
    const {
      mutate: updateMedia,
      isPending,
      error,
      reset,
    } = api.media.update.useMutation({
      onSuccess: () => {
        utils.media.read.invalidate();
        showToast.success({
          title: "Media updated successfully",
          description: "Your media has been updated successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error updating media",
          description: error.message,
        });
      },
    });

    return {
      updateMedia,
      isPending,
      error,
      reset,
    };
  };

  // Delete media mutation
  const useDeleteMedia = () => {
    const {
      mutate: deleteMedia,
      isPending,
      error,
      reset,
    } = api.media.delete.useMutation({
      onSuccess: () => {
        utils.media.read.invalidate();
        showToast.success({
          title: "Media deleted successfully",
          description: "Your media has been deleted successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error deleting media",
          description: error.message,
        });
      },
    });

    return {
      deleteMedia,
      isPending,
      error,
      reset,
    };
  };

  // Restore media mutation
  const useRestoreMedia = () => {
    const {
      mutate: restoreMedia,
      isPending,
      error,
      reset,
    } = api.media.restore.useMutation({
      onSuccess: () => {
        utils.media.read.invalidate();
        showToast.success({
          title: "Media restored successfully",
          description: "Your media has been restored successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error restoring media",
          description: error.message,
        });
      },
    });

    return {
      restoreMedia,
      isPending,
      error,
      reset,
    };
  };

  return {
    useCreateMedia,
    useUpdateMedia,
    useDeleteMedia,
    useRestoreMedia,
  };
};

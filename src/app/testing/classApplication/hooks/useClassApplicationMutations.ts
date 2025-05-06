import { api } from "@/trpc/react";
import { showToast } from "@/components/ui/toast";

export const useClassApplicationMutations = () => {
  const utils = api.useUtils();

  // Create class application mutation
  const useCreateClassApplication = () => {
    const {
      mutate: createClassApplication,
      isPending,
      error,
      reset,
    } = api.classApplication.create.useMutation({
      onSuccess: () => {
        utils.classApplication.read.invalidate();
        showToast.success({
          title: "Class application created successfully",
          description: "Your class application has been created successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error creating class application",
          description: error.message,
        });
      },
    });

    return {
      createClassApplication,
      isPending,
      error,
      reset,
    };
  };

  // Update class application mutation
  const useUpdateClassApplication = () => {
    const {
      mutate: updateClassApplication,
      isPending,
      error,
      reset,
    } = api.classApplication.update.useMutation({
      onSuccess: () => {
        utils.classApplication.read.invalidate();
        utils.classApplication.readByFilter.invalidate();
        utils.classApplication.readById.invalidate();
        showToast.success({
          title: "Class application updated successfully",
          description: "Your class application has been updated successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error updating class application",
          description: error.message,
        });
      },
    });

    return {
      updateClassApplication,
      isPending,
      error,
      reset,
    };
  };

  // Delete class application mutation
  const useDeleteClassApplication = () => {
    const {
      mutate: deleteClassApplication,
      isPending,
      error,
      reset,
    } = api.classApplication.delete.useMutation({
      onSuccess: () => {
        utils.classApplication.read.invalidate();
        utils.classApplication.readByFilter.invalidate();
        utils.classApplication.readById.invalidate();
        utils.classApplication.readDeleted.invalidate();
        showToast.success({
          title: "Class application deleted successfully",
          description: "Your class application has been deleted successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error deleting class application",
          description: error.message,
        });
      },
    });

    return {
      deleteClassApplication,
      isPending,
      error,
      reset,
    };
  };

  // Restore class application mutation
  const useRestoreClassApplication = () => {
    const {
      mutate: restoreClassApplication,
      isPending,
      error,
      reset,
    } = api.classApplication.restore.useMutation({
      onSuccess: () => {
        utils.classApplication.read.invalidate();
        utils.classApplication.readByFilter.invalidate();
        utils.classApplication.readById.invalidate();
        utils.classApplication.readDeleted.invalidate();
        showToast.success({
          title: "Class application restored successfully",
          description: "Your class application has been restored successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error restoring class application",
          description: error.message,
        });
      },
    });

    return {
      restoreClassApplication,
      isPending,
      error,
      reset,
    };
  };

  return {
    useCreateClassApplication,
    useUpdateClassApplication,
    useDeleteClassApplication,
    useRestoreClassApplication,
  };
};

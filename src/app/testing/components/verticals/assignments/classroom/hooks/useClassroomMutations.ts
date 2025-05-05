import { api } from "@/trpc/react";
import { showToast } from "@/components/ui/toast";

export const useClassMutations = () => {
  const utils = api.useUtils();

  // Create class
  const useCreateClass = () => {
    const {
      mutate: createClass,
      isPending,
      error,
      reset,
    } = api.class.create.useMutation({
      onSuccess: () => {
        utils.class.read.invalidate();
        showToast.success({
          title: "Class created successfully",
          description: "The class has been added to the system.",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Failed to create class",
          description: error.message,
        });
      },
    });

    return {
      createClass,
      isPending,
      error,
      reset,
    };
  };

  // Update class
  const useUpdateClass = () => {
    const {
      mutate: updateClass,
      isPending,
      error,
      reset,
    } = api.class.update.useMutation({
      onSuccess: () => {
        utils.class.read.invalidate();
        showToast.success({
          title: "Class updated successfully",
          description: "Class details have been updated.",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Failed to update class",
          description: error.message,
        });
      },
    });

    return {
      updateClass,
      isPending,
      error,
      reset,
    };
  };

  // Delete class
  const useDeleteClass = () => {
    const {
      mutate: deleteClass,
      isPending,
      error,
      reset,
    } = api.class.delete.useMutation({
      onSuccess: () => {
        utils.class.read.invalidate();
        showToast.success({
          title: "Class deleted",
          description: "The class has been deleted successfully.",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Failed to delete class",
          description: error.message,
        });
      },
    });

    return {
      deleteClass,
      isPending,
      error,
      reset,
    };
  };

  // Restore class
  const useRestoreClass = () => {
    const {
      mutate: restoreClass,
      isPending,
      error,
      reset,
    } = api.class.restore.useMutation({
      onSuccess: () => {
        utils.class.read.invalidate();
        showToast.success({
          title: "Class restored",
          description: "The class has been restored successfully.",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Failed to restore class",
          description: error.message,
        });
      },
    });

    return {
      restoreClass,
      isPending,
      error,
      reset,
    };
  };

  return {
    useCreateClass,
    useUpdateClass,
    useDeleteClass,
    useRestoreClass,
  };
};

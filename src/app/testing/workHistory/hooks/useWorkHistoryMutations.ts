// testing/workHistory/hooks/useWorkHistoryMutations.ts
import { api } from "@/trpc/react";
import { showToast } from "@/components/ui/toast";

export const useWorkHistoryMutations = () => {
  const utils = api.useUtils();

  const useCreateWorkHistory = () => {
    const {
      mutate: createWorkHistory,
      isPending,
      error,
      reset,
    } = api.workHistory.create.useMutation({
      onSuccess: () => {
        utils.workHistory.read.invalidate();
        showToast.success({
          title: "Work history created successfully",
          description: "The work history entry has been added.",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error creating work history",
          description: error.message,
        });
      },
    });

    return { createWorkHistory, isPending, error, reset };
  };

  const useUpdateWorkHistory = () => {
    const {
      mutate: updateWorkHistory,
      isPending,
      error,
      reset,
    } = api.workHistory.update.useMutation({
      onSuccess: () => {
        utils.workHistory.read.invalidate();
        showToast.success({
          title: "Work history updated successfully",
          description: "The work history entry has been updated.",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error updating work history",
          description: error.message,
        });
      },
    });

    return { updateWorkHistory, isPending, error, reset };
  };

  const useDeleteWorkHistory = () => {
    const {
      mutate: deleteWorkHistory,
      isPending,
      error,
      reset,
    } = api.workHistory.delete.useMutation({
      onSuccess: () => {
        utils.workHistory.read.invalidate();
        showToast.success({
          title: "Work history deleted",
          description: "The entry has been deleted successfully.",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error deleting work history",
          description: error.message,
        });
      },
    });

    return { deleteWorkHistory, isPending, error, reset };
  };

  const useRestoreWorkHistory = () => {
    const {
      mutate: restoreWorkHistory,
      isPending,
      error,
      reset,
    } = api.workHistory.restore.useMutation({
      onSuccess: () => {
        utils.workHistory.read.invalidate();
        showToast.success({
          title: "Work history restored",
          description: "The deleted entry has been restored.",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error restoring work history",
          description: error.message,
        });
      },
    });

    return { restoreWorkHistory, isPending, error, reset };
  };

  return {
    useCreateWorkHistory,
    useUpdateWorkHistory,
    useDeleteWorkHistory,
    useRestoreWorkHistory,
  };
};



import { api } from "@/trpc/react";
import { showToast } from "@/components/ui/toast";

export const useInterviewMutations = () => {
  const utils = api.useUtils();

  // Create interview mutation
  const useCreateInterview = () => {
    const {
      mutate: createInterview,
      isPending,
      error,
      reset,
    } = api.interview.create.useMutation({
      onSuccess: () => {
        utils.placement.read.invalidate();
        showToast.success({
          title: "Interview created successfully",
          description: "Your Interview has been created successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error creating interview",
          description: error.message,
        });
      },
    });

    return {
      createInterview,
      isPending,
      error,
      reset,
    };
  };

  // Update interview mutation
  const useUpdateInterview = () => {
    const {
      mutate: updateInterview,
      isPending,
      error,
      reset,
    } = api.interview.update.useMutation({
      onSuccess: () => {
        utils.interview.read.invalidate();
        utils.interview.getByData.invalidate();
        utils.interview.getById.invalidate();
        showToast.success({
          title: "Interview updated successfully",
          description: "Your interview has been updated successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error updating interview application",
          description: error.message,
        });
      },
    });

    return {
      updateInterview,
      isPending,
      error,
      reset,
    };
  };

  // Delete interview mutation
  const useDeleteInterview = () => {
    const {
      mutate: deleteInterview,
      isPending,
      error,
      reset,
    } = api.interview.delete.useMutation({
      onSuccess: () => {
        utils.interview.read.invalidate();
        utils.interview.getByData.invalidate();
        utils.interview.getById.invalidate();
        utils.interview.readDeleted.invalidate();
        showToast.success({
          title: "Interview deleted successfully",
          description: "Your interview has been deleted successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error deleting interview",
          description: error.message,
        });
      },
    });

    return {
      deleteInterview,
      isPending,
      error,
      reset,
    };
  };

  // Restore interview mutation
  const useRestoreInterview = () => {
    const {
      mutate: restoreInterview,
      isPending,
      error,
      reset,
    } = api.interview.restore.useMutation({
      onSuccess: () => {
        utils.interview.read.invalidate();
        utils.interview.getByData.invalidate();
        utils.interview.getById.invalidate();
        utils.interview.readDeleted.invalidate();
        showToast.success({
          title: "Interview restored successfully",
          description: "Your interview has been restored successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error restoring interview",
          description: error.message,
        });
      },
    });

    return {
      restoreInterview,
      isPending,
      error,
      reset,
    };
  };

  return {
    useCreateInterview,
    useUpdateInterview,
    useDeleteInterview,
    useRestoreInterview,
  };
};

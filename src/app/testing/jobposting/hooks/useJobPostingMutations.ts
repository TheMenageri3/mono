import { api } from "@/trpc/react";
import { showToast } from "@/components/ui/toast";

export const useJobPostingMutations = () => {
  const utils = api.useUtils();

  // Create job posting mutation
  const useCreateJobPosting = () => {
    const {
      mutate: createJobPosting,
      isPending,
      error,
      reset,
    } = api.jobPosting.create.useMutation({
      onSuccess: () => {
        utils.jobPosting.read.invalidate();
        showToast.success({
          title: "Job posting created successfully",
          description: "Your Job posting has been created successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error creating event",
          description: error.message,
        });
      },
    });

    return {
      createJobPosting,
      isPending,
      error,
      reset,
    };
  };

  // Update Job posting mutation
  const useUpdateJobPosting = () => {
    const {
      mutate: updateJobPosting,
      isPending,
      error,
      reset,
    } = api.jobPosting.update.useMutation({
      onSuccess: () => {
        utils.jobPosting.read.invalidate();
        showToast.success({
          title: "Job posting updated successfully",
          description: "Your Job posting has been updated successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error updating event",
          description: error.message,
        });
      },
    });

    return {
      updateJobPosting,
      isPending,
      error,
      reset,
    };
  };

  // Delete Job posting mutation
  const useDeleteJobPosting = () => {
    const {
      mutate: deleteJobPosting,
      isPending,
      error,
      reset,
    } = api.jobPosting.delete.useMutation({
      onSuccess: () => {
        utils.jobPosting.read.invalidate();
        showToast.success({
          title: "Job posting deleted successfully",
          description: "Your Job posting has been deleted successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error deleting event",
          description: error.message,
        });
      },
    });

    return {
      deleteJobPosting,
      isPending,
      error,
      reset,
    };
  };

  // Restore Job posting mutation
  const useRestoreJobPosting = () => {
    const {
      mutate: restoreJobPosting,
      isPending,
      error,
      reset,
    } = api.jobPosting.restore.useMutation({
      onSuccess: () => {
        utils.jobPosting.read.invalidate();
        showToast.success({
          title: "Job posting restored successfully",
          description: "Your Job posting has been restored successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error restoring event",
          description: error.message,
        });
      },
    });

    return {
      restoreJobPosting,
      isPending,
      error,
      reset,
    };
  };

  return {
    useCreateJobPosting,
    useUpdateJobPosting,
    useDeleteJobPosting,
    useRestoreJobPosting,
  };
};

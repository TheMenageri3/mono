import { api } from "@/trpc/react";
import { showToast } from "@/components/ui/toast";

export const useJobApplicationMutations = () => {
  const utils = api.useUtils();

  // Create application mutation
  const useCreateJobApplication = () => {
    const {
      mutate: createJobApplication,
      isPending,
      error,
      reset,
    } = api.jobApplication.create.useMutation({
      onSuccess: () => {
        utils.jobApplication.readAll.invalidate();
        showToast.success({
          title: "Application created successfully",
          description: "Your Application has been created successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error creating application",
          description: error.message,
        });
      },
    });

    return {
      createJobApplication,
      isPending,
      error,
      reset,
    };
  };

  // Update application mutation
  const useUpdateJobApplication = () => {
    const {
      mutate: updateJobApplication,
      isPending,
      error,
      reset,
    } = api.jobApplication.update.useMutation({
      onSuccess: () => {
        utils.jobApplication.readAll.invalidate();
        showToast.success({
          title: "Application updated successfully",
          description: "Your Application has been updated successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error updating application",
          description: error.message,
        });
      },
    });

    return {
      updateJobApplication,
      isPending,
      error,
      reset,
    };
  };

  // Delete application mutation
  const useDeleteJobApplication = () => {
    const {
      mutate: deleteJobApplication,
      isPending,
      error,
      reset,
    } = api.jobApplication.delete.useMutation({
      onSuccess: () => {
        utils.jobApplication.readAll.invalidate();
        showToast.success({
          title: "Application deleted successfully",
          description: "Your Application has been deleted successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error deleting application",
          description: error.message,
        });
      },
    });

    return {
      deleteJobApplication,
      isPending,
      error,
      reset,
    };
  };

  // Restore application mutation
  const useRestoreJobApplication = () => {
    const {
      mutate: restoreJobApplications,
      isPending,
      error,
      reset,
    } = api.jobApplication.restore.useMutation({
      onSuccess: () => {
        utils.jobApplication.readAll.invalidate();
        showToast.success({
          title: "Application restored successfully",
          description: "Your Application has been restored successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error restoring application",
          description: error.message,
        });
      },
    });

    return {
      restoreJobApplications,
      isPending,
      error,
      reset,
    };
  };

  return {
    useCreateJobApplication,
    useUpdateJobApplication,
    useDeleteJobApplication,
    useRestoreJobApplication,
  };
};

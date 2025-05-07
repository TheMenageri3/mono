import { api } from "@/trpc/react";
import { showToast } from "@/components/ui/toast";

export const useJobApplicationQuestionMutations = () => {
  const utils = api.useUtils();

  const useCreateJobApplicationQuestion = () => {
    const {
      mutate: createJobApplicationQuestion,
      isPending,
      error,
      reset,
    } = api.jobApplicationQuestion.create.useMutation({
      onSuccess: () => {
        utils.jobApplicationQuestion.read.invalidate();
        showToast.success({
          title: "Created successfully",
          description: "Job application question created.",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error creating",
          description: error.message,
        });
      },
    });

    return { createJobApplicationQuestion, isPending, error, reset };
  };

  const useUpdateJobApplicationQuestion = () => {
    const {
      mutate: updateJobApplicationQuestion,
      isPending,
      error,
      reset,
    } = api.jobApplicationQuestion.update.useMutation({
      onSuccess: () => {
        utils.jobApplicationQuestion.read.invalidate();
        showToast.success({
          title: "Updated successfully",
          description: "Job application question updated.",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error updating",
          description: error.message,
        });
      },
    });

    return { updateJobApplicationQuestion, isPending, error, reset };
  };

  const useDeleteJobApplicationQuestion = () => {
    const {
      mutate: deleteJobApplicationQuestion,
      isPending,
      error,
      reset,
    } = api.jobApplicationQuestion.delete.useMutation({
      onSuccess: () => {
        utils.jobApplicationQuestion.read.invalidate();
        showToast.success({
          title: "Deleted successfully",
          description: "Job application question deleted.",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error deleting",
          description: error.message,
        });
      },
    });

    return { deleteJobApplicationQuestion, isPending, error, reset };
  };

  const useRestoreJobApplicationQuestion = () => {
    const {
      mutate: restoreJobApplicationQuestion,
      isPending,
      error,
      reset,
    } = api.jobApplicationQuestion.restore.useMutation({
      onSuccess: () => {
        utils.jobApplicationQuestion.readDeleted.invalidate();
        showToast.success({
          title: "Restored successfully",
          description: "Job application question restored.",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error restoring",
          description: error.message,
        });
      },
    });

    return { restoreJobApplicationQuestion, isPending, error, reset };
  };

  return {
    useCreateJobApplicationQuestion,
    useUpdateJobApplicationQuestion,
    useDeleteJobApplicationQuestion,
    useRestoreJobApplicationQuestion,
  };
};

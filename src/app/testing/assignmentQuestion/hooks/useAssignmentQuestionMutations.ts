import { api } from "@/trpc/react";
import { showToast } from "@/components/ui/toast";

export const useAssignmentQuestionMutations = () => {
  const utils = api.useUtils();

  // Create assignment question mutation
  const useCreateAssignmentQuestion = () => {
    const {
      mutate: createAssignmentQuestion,
      isPending,
      isSuccess,
      isError,
      error,
      reset,
    } = api.assignmentQuestion.create.useMutation({
      onSuccess: () => {
        utils.assignmentQuestion.readAll.invalidate();
        showToast.success({
          title: "Assignment question created successfully",
          description: "Your assignment question has been created successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error creating assignment question",
          description: error.message,
        });
      },
    });
    return {
      createAssignmentQuestion,
      isPending,
      isSuccess,
      isError,
      error,
      reset,
    };
  };

  const useUpdateAssignmentQuestion = () => {
    const {
      mutate: updateAssignmentQuestion,
      isPending,
      isSuccess,
      isError,
      error,
      reset,
    } = api.assignmentQuestion.update.useMutation({
      onSuccess: () => {
        utils.assignmentQuestion.readAll.invalidate();
        showToast.success({
          title: "Assignment Question updated successfully",
          description: "Your assignment question has been updated successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error updating assignemnt question",
          description: error.message,
        });
      },
    });

    return {
      updateAssignmentQuestion,
      isPending,
      isSuccess,
      isError,
      error,
      reset,
    };
  };

  //Delete assignment question mutation
  const useDeleteAssignmentQuestion = () => {
    const {
      mutate: deleteAssignmentQuestion,
      isPending,
      isSuccess,
      isError,
      error,
      reset,
    } = api.assignmentQuestion.delete.useMutation({
      onSuccess: () => {
        utils.assignmentQuestion.readAll.invalidate();
        showToast.success({
          title: "Assignment question deleted successfully",
          description: "Your assignment question has been deleted successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error deleting assignment question",
          description: error.message,
        });
      },
    });

    return {
      deleteAssignmentQuestion,
      isPending,
      isSuccess,
      isError,
      error,
      reset,
    };
  };

  //Restore assignment question mutation
  const useRestoreAssignmentQuestion = () => {
    const {
      mutate: restoreAssignmentQuestion,
      isPending,
      isSuccess,
      isError,
      error,
      reset,
    } = api.assignmentQuestion.restore.useMutation({
      onSuccess: () => {
        utils.assignmentQuestion.invalidate();
        showToast.success({
          title: "Assignment Question restored successfully",
          description:
            "Your assignment question has been restored successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error restoring assignment question",
          description: error.message,
        });
      },
    });

    return {
      restoreAssignmentQuestion,
      isPending,
      isSuccess,
      isError,
      error,
      reset,
    };
  };

  return {
    useCreateAssignmentQuestion,
    useUpdateAssignmentQuestion,
    useDeleteAssignmentQuestion,
    useRestoreAssignmentQuestion,
  };
};
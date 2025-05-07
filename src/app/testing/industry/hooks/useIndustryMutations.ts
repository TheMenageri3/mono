import { api } from "@/trpc/react";
import { showToast } from "@/components/ui/toast";

export const useIndustryMutations = () => {
  const utils = api.useUtils();

  // Create industry mutation
  const useCreateIndustry = () => {
    const {
      mutate: createIndustry,
      isPending,
      error,
      reset,
    } = api.industry.create.useMutation({
      onSuccess: () => {
        utils.industry.read.invalidate();
        showToast.success({
          title: "Industry created successfully",
          description: "The industry has been created successfully.",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error creating industry",
          description: error.message,
        });
      },
    });

    return {
      createIndustry,
      isPending,
      error,
      reset,
    };
  };

  // Update industry mutation
  const useUpdateIndustry = () => {
    const {
      mutate: updateIndustry,
      isPending,
      error,
      reset,
    } = api.industry.update.useMutation({
      onSuccess: () => {
        utils.industry.read.invalidate();
        showToast.success({
          title: "Industry updated successfully",
          description: "The industry has been updated successfully.",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error updating industry",
          description: error.message,
        });
      },
    });

    return {
      updateIndustry,
      isPending,
      error,
      reset,
    };
  };

  // Delete industry mutation
  const useDeleteIndustry = () => {
    const {
      mutate: deleteIndustry,
      isPending,
      error,
      reset,
    } = api.industry.delete.useMutation({
      onSuccess: () => {
        utils.industry.read.invalidate();
        showToast.success({
          title: "Industry deleted successfully",
          description: "The industry has been deleted successfully.",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error deleting industry",
          description: error.message,
        });
      },
    });

    return {
      deleteIndustry,
      isPending,
      error,
      reset,
    };
  };

  // Restore industry mutation
  const useRestoreIndustry = () => {
    const {
      mutate: restoreIndustry,
      isPending,
      error,
      reset,
    } = api.industry.restore.useMutation({
      onSuccess: () => {
        utils.industry.read.invalidate();
        showToast.success({
          title: "Industry restored successfully",
          description: "The deleted industry has been restored.",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error restoring industry",
          description: error.message,
        });
      },
    });

    return {
      restoreIndustry,
      isPending,
      error,
      reset,
    };
  };

  return {
    useCreateIndustry,
    useUpdateIndustry,
    useDeleteIndustry,
    useRestoreIndustry,
  };
};

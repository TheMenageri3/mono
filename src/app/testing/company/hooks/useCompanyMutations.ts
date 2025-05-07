import { api } from "@/trpc/react";
import { showToast } from "@/components/ui/toast";

export const useCompanyMutations = () => {
  const utils = api.useUtils();

  // Create company mutation
  const useCreateCompany = () => {
    const {
      mutate: createCompany,
      isPending,
      error,
      reset,
      isSuccess,
      isError,
    } = api.company.create.useMutation({
      onSuccess: () => {
        utils.company.read.invalidate();
        showToast.success({
          title: "Company created successfully",
          description: "Your company has been created successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error creating company",
          description: error.message,
        });
      },
    });

    return {
      createCompany,
      isPending,
      error,
      reset,
      isSuccess,
      isError,
    };
  };

  // Update company mutation
  const useUpdateCompany = () => {
    const {
      mutate: updateCompany,
      isPending,
      error,
      reset,
      isSuccess,
      isError,
    } = api.company.update.useMutation({
      onSuccess: () => {
        utils.company.read.invalidate();
        utils.company.readById.invalidate();
        utils.company.readByIndustry.invalidate();
        utils.company.search.invalidate();
        showToast.success({
          title: "Company updated successfully",
          description: "The company has been updated successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error updating company",
          description: error.message,
        });
      },
    });

    return {
      updateCompany,
      isPending,
      error,
      reset,
      isSuccess,
      isError,
    };
  };

  // Delete company mutation
  const useDeleteCompany = () => {
    const {
      mutate: deleteCompany,
      isPending,
      error,
      reset,
      isSuccess,
      isError,
    } = api.company.delete.useMutation({
      onSuccess: () => {
        utils.company.read.invalidate();
        utils.company.readById.invalidate();
        utils.company.readByIndustry.invalidate();
        utils.company.readDeleted.invalidate();
        utils.company.search.invalidate();
        showToast.success({
          title: "Company deleted successfully",
          description: "The company has been deleted successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error deleting company",
          description: error.message,
        });
      },
    });

    return {
      deleteCompany,
      isPending,
      error,
      reset,
      isSuccess,
      isError,
    };
  };

  // Restore company mutation
  const useRestoreCompany = () => {
    const {
      mutate: restoreCompany,
      isPending,
      error,
      reset,
      isSuccess,
      isError,
    } = api.company.restore.useMutation({
      onSuccess: () => {
        utils.company.read.invalidate();
        utils.company.readById.invalidate();
        utils.company.readByIndustry.invalidate();
        utils.company.readDeleted.invalidate();
        utils.company.search.invalidate();
        showToast.success({
          title: "Company restored successfully",
          description: "The company has been restored successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error restoring company",
          description: error.message,
        });
      },
    });

    return {
      restoreCompany,
      isPending,
      error,
      reset,
      isSuccess,
      isError,
    };
  };

  // Add industry to company mutation
  const useAddIndustryToCompany = () => {
    const {
      mutate: addIndustryToCompany,
      isPending,
      error,
      reset,
      isSuccess,
      isError,
    } = api.company.addIndustry.useMutation({
      onSuccess: () => {
        utils.company.read.invalidate();
        utils.company.readById.invalidate();
        utils.company.readByIndustry.invalidate();
        showToast.success({
          title: "Industry added successfully",
          description:
            "The industry has been added to the company successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error adding industry",
          description: error.message,
        });
      },
    });

    return {
      addIndustryToCompany,
      isPending,
      error,
      reset,
      isSuccess,
      isError,
    };
  };

  // Remove industry from company mutation
  const useRemoveIndustryFromCompany = () => {
    const {
      mutate: removeIndustryFromCompany,
      isPending,
      error,
      reset,
      isSuccess,
      isError,
    } = api.company.removeIndustry.useMutation({
      onSuccess: () => {
        utils.company.read.invalidate();
        utils.company.readById.invalidate();
        utils.company.readByIndustry.invalidate();
        showToast.success({
          title: "Industry removed successfully",
          description:
            "The industry has been removed from the company successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error removing industry",
          description: error.message,
        });
      },
    });

    return {
      removeIndustryFromCompany,
      isPending,
      error,
      reset,
      isSuccess,
      isError,
    };
  };

  return {
    useCreateCompany,
    useUpdateCompany,
    useDeleteCompany,
    useRestoreCompany,
    useAddIndustryToCompany,
    useRemoveIndustryFromCompany,
  };
};

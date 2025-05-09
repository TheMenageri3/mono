import { api } from "@/trpc/react";
import { showToast } from "@/components/ui/toast";

export const useCompanyContactMutations = () => {
  const utils = api.useUtils();

  // Create company contact mutation
  const useCreateCompanyContact = () => {
    const {
      mutate: createCompanyContact,
      isPending,
      error,
      reset,
      isSuccess,
      isError,
    } = api.companyContact.create.useMutation({
      onSuccess: () => {
        utils.companyContact.read.invalidate();
        utils.companyContact.readByCompanyId.invalidate();
        utils.companyContact.readByUserId.invalidate();
        utils.companyContact.readByProfileId.invalidate();
        showToast.success({
          title: "Contact created successfully",
          description: "The company contact has been created successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error creating contact",
          description: error.message,
        });
      },
    });

    return {
      createCompanyContact,
      isPending,
      error,
      reset,
      isSuccess,
      isError,
    };
  };

  // Update company contact mutation
  const useUpdateCompanyContact = () => {
    const {
      mutate: updateCompanyContact,
      isPending,
      error,
      reset,
      isSuccess,
      isError,
    } = api.companyContact.update.useMutation({
      onSuccess: () => {
        utils.companyContact.read.invalidate();
        utils.companyContact.readById.invalidate();
        utils.companyContact.readByCompanyId.invalidate();
        utils.companyContact.readByUserId.invalidate();
        utils.companyContact.readByProfileId.invalidate();
        showToast.success({
          title: "Contact updated successfully",
          description: "The company contact has been updated successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error updating contact",
          description: error.message,
        });
      },
    });

    return {
      updateCompanyContact,
      isPending,
      error,
      reset,
      isSuccess,
      isError,
    };
  };

  // Delete company contact mutation
  const useDeleteCompanyContact = () => {
    const {
      mutate: deleteCompanyContact,
      isPending,
      error,
      reset,
      isSuccess,
      isError,
    } = api.companyContact.delete.useMutation({
      onSuccess: () => {
        utils.companyContact.read.invalidate();
        utils.companyContact.readById.invalidate();
        utils.companyContact.readByCompanyId.invalidate();
        utils.companyContact.readByUserId.invalidate();
        utils.companyContact.readByProfileId.invalidate();
        utils.companyContact.readDeleted.invalidate();
        utils.companyContact.readDeletedByCompanyId.invalidate();
        showToast.success({
          title: "Contact deleted successfully",
          description: "The company contact has been deleted successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error deleting contact",
          description: error.message,
        });
      },
    });

    return {
      deleteCompanyContact,
      isPending,
      error,
      reset,
      isSuccess,
      isError,
    };
  };

  // Restore company contact mutation
  const useRestoreCompanyContact = () => {
    const {
      mutate: restoreCompanyContact,
      isPending,
      error,
      reset,
      isSuccess,
      isError,
    } = api.companyContact.restore.useMutation({
      onSuccess: () => {
        utils.companyContact.read.invalidate();
        utils.companyContact.readById.invalidate();
        utils.companyContact.readByCompanyId.invalidate();
        utils.companyContact.readByUserId.invalidate();
        utils.companyContact.readByProfileId.invalidate();
        utils.companyContact.readDeleted.invalidate();
        utils.companyContact.readDeletedByCompanyId.invalidate();
        showToast.success({
          title: "Contact restored successfully",
          description: "The company contact has been restored successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error restoring contact",
          description: error.message,
        });
      },
    });

    return {
      restoreCompanyContact,
      isPending,
      error,
      reset,
      isSuccess,
      isError,
    };
  };

  return {
    useCreateCompanyContact,
    useUpdateCompanyContact,
    useDeleteCompanyContact,
    useRestoreCompanyContact,
  };
};

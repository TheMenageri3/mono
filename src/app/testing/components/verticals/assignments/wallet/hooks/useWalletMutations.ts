import { api } from "@/trpc/react";
import { showToast } from "@/components/ui/toast";

export const useWalletMutations = () => {
  const utils = api.useUtils();

  // Create wallet mutation
  const useCreateWallet = () => {
    const {
      mutate: createWallet,
      isPending,
      error,
      reset,
    } = api.wallet.create.useMutation({
      onSuccess: () => {
        utils.wallet.read.invalidate();
        showToast.success({
          title: "Wallet created successfully",
          description: "Your wallet has been created successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error creating wallet",
          description: error.message,
        });
      },
    });

    return {
      createWallet,
      isPending,
      error,
      reset,
    };
  };

  // Update wallet mutation
  const useUpdateWallet = () => {
    const {
      mutate: updateWallet,
      isPending,
      error,
      reset,
    } = api.wallet.update.useMutation({
      onSuccess: () => {
        utils.wallet.read.invalidate();
        showToast.success({
          title: "Wallet updated successfully",
          description: "Your wallet has been updated successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error updating wallet",
          description: error.message,
        });
      },
    });

    return {
      updateWallet,
      isPending,
      error,
      reset,
    };
  };

  // Delete wallet mutation
  const useDeleteWallet = () => {
    const {
      mutate: deleteWallet,
      isPending,
      error,
      reset,
    } = api.wallet.delete.useMutation({
      onSuccess: () => {
        utils.wallet.read.invalidate();
        showToast.success({
          title: "Wallet deleted successfully",
          description: "Your wallet has been deleted successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error deleting wallet",
          description: error.message,
        });
      },
    });

    return {
      deleteWallet,
      isPending,
      error,
      reset,
    };
  };

  // Restore wallet mutation
  const useRestoreWallet = () => {
    const {
      mutate: restoreWallet,
      isPending,
      error,
      reset,
    } = api.wallet.restore.useMutation({
      onSuccess: () => {
        utils.wallet.read.invalidate();
        showToast.success({
          title: "Wallet restored successfully",
          description: "Your wallet has been restored successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error restoring wallet",
          description: error.message,
        });
      },
    });

    return {
      restoreWallet,
      isPending,
      error,
      reset,
    };
  };

  return {
    useCreateWallet,
    useUpdateWallet,
    useDeleteWallet,
    useRestoreWallet,
  };
};

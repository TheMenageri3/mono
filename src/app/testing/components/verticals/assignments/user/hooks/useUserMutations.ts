import { api } from "@/trpc/react";
import { showToast } from "@/components/ui/toast";

export const useUserMutations = () => {
  const utils = api.useUtils();

  // Create user
  const useCreateUser = () => {
    const {
      mutate: createUser,
      isPending,
      error,
      reset,
    } = api.user.create.useMutation({
      onSuccess: () => {
        utils.user.read.invalidate();
        showToast.success({
          title: "User created successfully",
          description: "The user has been added to the system.",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Failed to create user",
          description: error.message,
        });
      },
    });

    return {
      createUser,
      isPending,
      error,
      reset,
    };
  };

  // Update user
  const useUpdateUser = () => {
    const {
      mutate: updateUser,
      isPending,
      error,
      reset,
    } = api.user.update.useMutation({
      onSuccess: () => {
        utils.user.read.invalidate();
        showToast.success({
          title: "User updated successfully",
          description: "User details have been updated.",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Failed to update user",
          description: error.message,
        });
      },
    });

    return {
      updateUser,
      isPending,
      error,
      reset,
    };
  };

  // Delete user
  const useDeleteUser = () => {
    const {
      mutate: deleteUser,
      isPending,
      error,
      reset,
    } = api.user.delete.useMutation({
      onSuccess: () => {
        utils.user.read.invalidate();
        showToast.success({
          title: "User deleted",
          description: "The user has been deleted successfully.",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Failed to delete user",
          description: error.message,
        });
      },
    });

    return {
      deleteUser,
      isPending,
      error,
      reset,
    };
  };

  // Restore user
  const useRestoreUser = () => {
    const {
      mutate: restoreUser,
      isPending,
      error,
      reset,
    } = api.user.restore.useMutation({
      onSuccess: () => {
        utils.user.read.invalidate();
        showToast.success({
          title: "User restored",
          description: "The user account has been restored.",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Failed to restore user",
          description: error.message,
        });
      },
    });

    return {
      restoreUser,
      isPending,
      error,
      reset,
    };
  };

  return {
    useCreateUser,
    useUpdateUser,
    useDeleteUser,
    useRestoreUser,
  };
};

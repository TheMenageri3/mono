import { api } from "@/trpc/react";
import { showToast } from "@/components/ui/toast";

export const useProfileMutations = () => {
  const utils = api.useUtils();

  // Create profile
  const useCreateProfile = () => {
    const {
      mutate: createProfile,
      isPending,
      error,
      reset,
    } = api.profile.create.useMutation({
      onSuccess: () => {
        utils.profile.read.invalidate();
        showToast.success({
          title: "Profile created successfully",
          description: "The profile has been added to the system.",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Failed to create profile",
          description: error.message,
        });
      },
    });

    return {
      createProfile,
      isPending,
      error,
      reset,
    };
  };

  // Update profile
  const useUpdateProfile = () => {
    const {
      mutate: updateProfile,
      isPending,
      error,
      reset,
    } = api.profile.update.useMutation({
      onSuccess: () => {
        utils.profile.read.invalidate();
        showToast.success({
          title: "Profile updated successfully",
          description: "Profile details have been updated.",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Failed to update profile",
          description: error.message,
        });
      },
    });

    return {
      updateProfile,
      isPending,
      error,
      reset,
    };
  };

  // Delete profile
  const useDeleteProfile = () => {
    const {
      mutate: deleteProfile,
      isPending,
      error,
      reset,
    } = api.profile.delete.useMutation({
      onSuccess: () => {
        utils.profile.read.invalidate();
        showToast.success({
          title: "Profile deleted",
          description: "The profile has been deleted successfully.",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Failed to delete profile",
          description: error.message,
        });
      },
    });

    return {
      deleteProfile,
      isPending,
      error,
      reset,
    };
  };

  // Restore profile
  const useRestoreProfile = () => {
    const {
      mutate: restoreProfile,
      isPending,
      error,
      reset,
    } = api.profile.restore.useMutation({
      onSuccess: () => {
        utils.profile.read.invalidate();
        showToast.success({
          title: "Profile restored",
          description: "The profile has been restored successfully.",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Failed to restore profile",
          description: error.message,
        });
      },
    });

    return {
      restoreProfile,
      isPending,
      error,
      reset,
    };
  };

  return {
    useCreateProfile,
    useUpdateProfile,
    useDeleteProfile,
    useRestoreProfile,
  };
};

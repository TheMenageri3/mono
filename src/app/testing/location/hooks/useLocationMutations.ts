import { api } from "@/trpc/react";
import { showToast } from "@/components/ui/toast";

export const useLocationMutations = () => {
  const utils = api.useUtils();

  // Create location mutation
  const useCreateLocation = () => {
    const {
      mutate: createLocation,
      isPending,
      error,
      reset,
    } = api.location.create.useMutation({
      onSuccess: () => {
        utils.location.read.invalidate();
        showToast.success({
          title: "Location created successfully",
          description: "Your location has been created successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error creating location",
          description: error.message,
        });
      },
    });

    return {
      createLocation,
      isPending,
      error,
      reset,
    };
  };

  // Update location mutation
  const useUpdateLocation = () => {
    const {
      mutate: updateLocation,
      isPending,
      error,
      reset,
    } = api.location.update.useMutation({
      onSuccess: () => {
        utils.location.read.invalidate();
        showToast.success({
          title: "Location updated successfully",
          description: "Your location has been updated successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error updating location",
          description: error.message,
        });
      },
    });

    return {
      updateLocation,
      isPending,
      error,
      reset,
    };
  };

  // Delete location mutation
  const useDeleteLocation = () => {
    const {
      mutate: deleteLocation,
      isPending,
      error,
      reset,
    } = api.location.delete.useMutation({
      onSuccess: () => {
        utils.location.read.invalidate();
        showToast.success({
          title: "Location deleted successfully",
          description: "Your location has been deleted successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error deleting location",
          description: error.message,
        });
      },
    });

    return {
      deleteLocation,
      isPending,
      error,
      reset,
    };
  };

  // Restore location mutation
  const useRestoreLocation = () => {
    const {
      mutate: restoreLocation,
      isPending,
      error,
      reset,
    } = api.location.restore.useMutation({
      onSuccess: () => {
        utils.location.read.invalidate();
        showToast.success({
          title: "Location restored successfully",
          description: "Your location has been restored successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error restoring location",
          description: error.message,
        });
      },
    });

    return {
      restoreLocation,
      isPending,
      error,
      reset,
    };
  };

  return {
    useCreateLocation,
    useUpdateLocation,
    useDeleteLocation,
    useRestoreLocation,
  };
};

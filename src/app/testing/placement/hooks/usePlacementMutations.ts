import { api } from "@/trpc/react";
import { showToast } from "@/components/ui/toast";

export const usePlacementMutations = () => {
  const utils = api.useUtils();

  // Create placement mutation
  const useCreatePlacement = () => {
    const {
      mutate: createPlacement,
      isPending,
      error,
      reset,
    } = api.placement.create.useMutation({
      onSuccess: () => {
        utils.placement.read.invalidate();
        showToast.success({
          title: "Placement created successfully",
          description: "Your placement has been created successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error creating placement",
          description: error.message,
        });
      },
    });

    return {
      createPlacement,
      isPending,
      error,
      reset,
    };
  };

  // Update placement mutation
  const useUpdatePlacement = () => {
    const {
      mutate: updatePlacement,
      isPending,
      error,
      reset,
    } = api.placement.update.useMutation({
      onSuccess: () => {
        utils.placement.read.invalidate();
        utils.placement.getByData.invalidate();
        utils.placement.getById.invalidate();
        showToast.success({
          title: "Placement updated successfully",
          description: "Your placement has been updated successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error updating placement application",
          description: error.message,
        });
      },
    });

    return {
      updatePlacement,
      isPending,
      error,
      reset,
    };
  };

  // Delete placement mutation
  const useDeletePlacement = () => {
    const {
      mutate: deletePlacement,
      isPending,
      error,
      reset,
    } = api.placement.delete.useMutation({
      onSuccess: () => {
        utils.placement.read.invalidate();
        utils.placement.getByData.invalidate();
        utils.placement.getById.invalidate();
        utils.placement.readDeleted.invalidate();
        showToast.success({
          title: "Placement deleted successfully",
          description: "Your placement has been deleted successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error deleting placement",
          description: error.message,
        });
      },
    });

    return {
      deletePlacement,
      isPending,
      error,
      reset,
    };
  };

  // Restore placement mutation
  const useRestorePlacement = () => {
    const {
      mutate: restorePlacement,
      isPending,
      error,
      reset,
    } = api.placement.restore.useMutation({
      onSuccess: () => {
        utils.placement.read.invalidate();
        utils.placement.getByData.invalidate();
        utils.placement.getById.invalidate();
        utils.placement.readDeleted.invalidate();
        showToast.success({
          title: "Placement restored successfully",
          description: "Your placement has been restored successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error restoring placement",
          description: error.message,
        });
      },
    });

    return {
      restorePlacement,
      isPending,
      error,
      reset,
    };
  };

  return {
    useCreatePlacement,
    useUpdatePlacement,
    useDeletePlacement,
    useRestorePlacement,
  };
};

import { api } from "@/trpc/react";
import { showToast } from "@/components/ui/toast";

export const useEventCompanyMutations = () => {
  const utils = api.useUtils();

  // Create event company mutation
  const useCreateEventCompany = () => {
    const {
      mutate: createEventCompany,
      isPending,
      error,
      reset,
    } = api.eventCompany.create.useMutation({
      onSuccess: () => {
        utils.eventCompany.getByEventId.invalidate();
        utils.eventCompany.getById.invalidate();
        utils.eventCompany.getByCompanyId.invalidate();
        utils.eventCompany.getByAttendanceStatus.invalidate();
        utils.eventCompany.getByAttendanceType.invalidate();
        utils.eventCompany.getAll.invalidate();
        showToast.success({
          title: "Event company created successfully",
          description: "The event company has been created successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error creating event company",
          description: error.message,
        });
      },
    });

    return {
      createEventCompany,
      isPending,
      error,
      reset,
    };
  };

  // Update event company mutation
  const useUpdateEventCompany = () => {
    const {
      mutate: updateEventCompany,
      isPending,
      error,
      reset,
    } = api.eventCompany.update.useMutation({
      onSuccess: () => {
        utils.eventCompany.getByEventId.invalidate();
        utils.eventCompany.getById.invalidate();
        utils.eventCompany.getByCompanyId.invalidate();
        utils.eventCompany.getByAttendanceStatus.invalidate();
        utils.eventCompany.getByAttendanceType.invalidate();
        utils.eventCompany.getAll.invalidate();
        showToast.success({
          title: "Event company updated successfully",
          description: "The event company has been updated successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error updating event company",
          description: error.message,
        });
      },
    });

    return {
      updateEventCompany,
      isPending,
      error,
      reset,
    };
  };

  // Delete event company mutation
  const useDeleteEventCompany = () => {
    const {
      mutate: deleteEventCompany,
      isPending,
      error,
      reset,
    } = api.eventCompany.delete.useMutation({
      onSuccess: () => {
        utils.eventCompany.getByEventId.invalidate();
        utils.eventCompany.getById.invalidate();
        utils.eventCompany.getByCompanyId.invalidate();
        utils.eventCompany.getByAttendanceStatus.invalidate();
        utils.eventCompany.getByAttendanceType.invalidate();
        utils.eventCompany.getAll.invalidate();
        showToast.success({
          title: "Event company deleted successfully",
          description: "The event company has been deleted successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error deleting event company",
          description: error.message,
        });
      },
    });

    return {
      deleteEventCompany,
      isPending,
      error,
      reset,
    };
  };

  // Restore event company mutation
  const useRestoreEventCompany = () => {
    const {
      mutate: restoreEventCompany,
      isPending,
      error,
      reset,
    } = api.eventCompany.restore.useMutation({
      onSuccess: () => {
        utils.eventCompany.getByEventId.invalidate();
        utils.eventCompany.getById.invalidate();
        utils.eventCompany.getByCompanyId.invalidate();
        utils.eventCompany.getByAttendanceStatus.invalidate();
        utils.eventCompany.getByAttendanceType.invalidate();
        utils.eventCompany.getAll.invalidate();
        showToast.success({
          title: "Event company restored successfully",
          description: "The event company has been restored successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error restoring event company",
          description: error.message,
        });
      },
    });

    return {
      restoreEventCompany,
      isPending,
      error,
      reset,
    };
  };

  return {
    useCreateEventCompany,
    useUpdateEventCompany,
    useDeleteEventCompany,
    useRestoreEventCompany,
  };
};

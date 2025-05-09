import { api } from "@/trpc/react";
import { showToast } from "@/components/ui/toast";

export const useEventAttendeeMutations = () => {
  const utils = api.useUtils();

  // Create event attendee mutation
  const useCreateEventAttendee = () => {
    const {
      mutate: createEventAttendee,
      isPending,
      error,
      reset,
    } = api.eventAttendee.create.useMutation({
      onSuccess: () => {
        utils.eventAttendee.getByEventId.invalidate();
        utils.eventAttendee.getById.invalidate();
        utils.eventAttendee.getByStatus.invalidate();
        utils.eventAttendee.getByType.invalidate();
        utils.eventAttendee.getDeleted.invalidate();
        showToast.success({
          title: "Event attendee created successfully",
          description: "The event attendee has been created successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error creating event attendee",
          description: error.message,
        });
      },
    });

    return {
      createEventAttendee,
      isPending,
      error,
      reset,
    };
  };

  // Update event attendee mutation
  const useUpdateEventAttendee = () => {
    const {
      mutate: updateEventAttendee,
      isPending,
      error,
      reset,
    } = api.eventAttendee.update.useMutation({
      onSuccess: () => {
        utils.eventAttendee.getByEventId.invalidate();
        utils.eventAttendee.getById.invalidate();
        utils.eventAttendee.getByStatus.invalidate();
        utils.eventAttendee.getByType.invalidate();
        utils.eventAttendee.getDeleted.invalidate();
        showToast.success({
          title: "Event attendee updated successfully",
          description: "The event attendee has been updated successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error updating event attendee",
          description: error.message,
        });
      },
    });

    return {
      updateEventAttendee,
      isPending,
      error,
      reset,
    };
  };

  // Delete event attendee mutation
  const useDeleteEventAttendee = () => {
    const {
      mutate: deleteEventAttendee,
      isPending,
      error,
      reset,
    } = api.eventAttendee.delete.useMutation({
      onSuccess: () => {
        utils.eventAttendee.getByEventId.invalidate();
        utils.eventAttendee.getById.invalidate();
        utils.eventAttendee.getByStatus.invalidate();
        utils.eventAttendee.getByType.invalidate();
        utils.eventAttendee.getDeleted.invalidate();
        showToast.success({
          title: "Event attendee deleted successfully",
          description: "The event attendee has been deleted successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error deleting event attendee",
          description: error.message,
        });
      },
    });

    return {
      deleteEventAttendee,
      isPending,
      error,
      reset,
    };
  };

  // Restore event attendee mutation
  const useRestoreEventAttendee = () => {
    const {
      mutate: restoreEventAttendee,
      isPending,
      error,
      reset,
    } = api.eventAttendee.restore.useMutation({
      onSuccess: () => {
        utils.eventAttendee.getByEventId.invalidate();
        utils.eventAttendee.getById.invalidate();
        utils.eventAttendee.getByStatus.invalidate();
        utils.eventAttendee.getByType.invalidate();
        utils.eventAttendee.getDeleted.invalidate();
        showToast.success({
          title: "Event attendee restored successfully",
          description: "The event attendee has been restored successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error restoring event attendee",
          description: error.message,
        });
      },
    });

    return {
      restoreEventAttendee,
      isPending,
      error,
      reset,
    };
  };

  return {
    useCreateEventAttendee,
    useUpdateEventAttendee,
    useDeleteEventAttendee,
    useRestoreEventAttendee,
  };
};

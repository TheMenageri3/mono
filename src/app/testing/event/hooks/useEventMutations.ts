import { api } from "@/trpc/react";
import { showToast } from "@/components/ui/toast";

export const useEventMutations = () => {
  const utils = api.useUtils();

  // Create event mutation
  const useCreateEvent = () => {
    const {
      mutate: createEvent,
      isPending,
      error,
      reset,
    } = api.event.create.useMutation({
      onSuccess: () => {
        utils.event.readAllEvents.invalidate();
        showToast.success({
          title: "Event created successfully",
          description: "Your event has been created successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error creating event",
          description: error.message,
        });
      },
    });

    return {
      createEvent,
      isPending,
      error,
      reset,
    };
  };

  // Update event mutation
  const useUpdateEvent = () => {
    const {
      mutate: updateEvent,
      isPending,
      error,
      reset,
    } = api.event.update.useMutation({
      onSuccess: () => {
        utils.event.readAllEvents.invalidate();
        showToast.success({
          title: "Event updated successfully",
          description: "Your event has been updated successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error updating event",
          description: error.message,
        });
      },
    });

    return {
      updateEvent,
      isPending,
      error,
      reset,
    };
  };

  // Delete event mutation
  const useDeleteEvent = () => {
    const {
      mutate: deleteEvent,
      isPending,
      error,
      reset,
    } = api.event.delete.useMutation({
      onSuccess: () => {
        utils.event.readAllEvents.invalidate();
        showToast.success({
          title: "Event deleted successfully",
          description: "Your event has been deleted successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error deleting event",
          description: error.message,
        });
      },
    });

    return {
      deleteEvent,
      isPending,
      error,
      reset,
    };
  };

  // Restore event mutation
  const useRestoreEvent = () => {
    const {
      mutate: restoreEvent,
      isPending,
      error,
      reset,
    } = api.event.restore.useMutation({
      onSuccess: () => {
        utils.event.readAllEvents.invalidate();
        showToast.success({
          title: "Event restored successfully",
          description: "Your event has been restored successfully",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Error restoring event",
          description: error.message,
        });
      },
    });

    return {
      restoreEvent,
      isPending,
      error,
      reset,
    };
  };

  return {
    useCreateEvent,
    useUpdateEvent,
    useDeleteEvent,
    useRestoreEvent,
  };
};

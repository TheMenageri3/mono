import { api } from "@/trpc/react";
import { showToast } from "@/components/ui/toast";

export const useSectionMutations = () => {
  const utils = api.useUtils();

  // Create section mutation
  const useCreateSection = () => {
	const {
	  mutate: createSection,
	  isPending,
	  error,
	  reset,
	} = api.section.create.useMutation({
	  onSuccess: () => {
		utils.section.read.invalidate();
		showToast.success({
		  title: "Section created successfully",
		  description: "Your section has been created successfully",
		});
	  },
	  onError: (error) => {
		showToast.error({
		  title: "Error creating section",
		  description: error.message,
		});
	  },
	});

	return {
	  createSection,
	  isPending,
	  error,
	  reset,
	};
  };

  // Update section mutation
  const useUpdateSection = () => {
	const {
	  mutate: updateSection,
	  isPending,
	  error,
	  reset,
	} = api.section.update.useMutation({
	  onSuccess: () => {
		utils.section.read.invalidate();
		showToast.success({
		  title: "Section updated successfully",
		  description: "Your section has been updated successfully",
		});
	  },
	  onError: (error) => {
		showToast.error({
		  title: "Error updating section",
		  description: error.message,
		});
	  },
	});

	return {
	  updateSection,
	  isPending,
	  error,
	  reset,
	};
  };

  // Delete section mutation
  const useDeleteSection = () => {
	const {
	  mutate: deleteSection,
	  isPending,
	  error,
	  reset,
	} = api.section.delete.useMutation({
	  onSuccess: () => {
		utils.section.read.invalidate();
		showToast.success({
		  title: "Section deleted successfully",
		  description: "Your section has been deleted successfully",
		});
	  },
	  onError: (error) => {
		showToast.error({
		  title: "Error deleting section",
		  description: error.message,
		});
	  },
	});

	return {
	  deleteSection,
	  isPending,
	  error,
	  reset,
	};
  };

  // Restore section mutation
  const useRestoreSection = () => {
	const {
	  mutate: restoreSection,
	  isPending,
	  error,
	  reset,
	} = api.event.restore.useMutation({
	  onSuccess: () => {
		utils.section.read.invalidate();
		showToast.success({
		  title: "Section restored successfully",
		  description: "Your section has been restored successfully",
		});
	  },
	  onError: (error) => {
		showToast.error({
		  title: "Error restoring section",
		  description: error.message,
		});
	  },
	});

	return {
	  restoreSection,
	  isPending,
	  error,
	  reset,
	};
  };

  return {
	useCreateSection,
	useUpdateSection,
	useDeleteSection,
	useRestoreSection,
  };
};

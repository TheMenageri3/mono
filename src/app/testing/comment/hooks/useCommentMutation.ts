import { api } from "@/trpc/react";
import { showToast } from "@/components/ui/toast";

export const useCommentMutations = () => {
  const utils = api.useUtils();

  // Create comment mutation
  const useCreateComment = () => {
	const {
	  mutate: createComment,
	  isPending,
	  error,
	  reset,
	} = api.comment.create.useMutation({
	  onSuccess: () => {
		showToast.success({
		  title: "Comment created successfully",
		  description: "Your comment has been created successfully",
		});
	  },
	  onError: (error) => {
		showToast.error({
		  title: "Error creating comment",
		  description: error.message,
		});
	  },
	});

	return {
	  createComment,
	  isPending,
	  error,
	  reset,
	};
  };

  // Update comment mutation
  const useUpdateComment = () => {
	const {
	  mutate: updateComment,
	  isPending,
	  error,
	  reset,
	} = api.comment.update.useMutation({
	  onSuccess: () => {
		utils.comment.readById.invalidate();
		showToast.success({
		  title: "Comment updated successfully",
		  description: "Your comment has been updated successfully",
		});
	  },
	  onError: (error) => {
		showToast.error({
		  title: "Error updating comment",
		  description: error.message,
		});
	  },
	});

	return {
	  updateComment,
	  isPending,
	  error,
	  reset,
	};
  };

  // Delete comment mutation
  const useDeleteComment = () => {
	const {
	  mutate: deleteComment,
	  isPending,
	  error,
	  reset,
	} = api.comment.delete.useMutation({
	  onSuccess: () => {
		showToast.success({
		  title: "Comment deleted successfully",
		  description: "Your comment has been deleted successfully",
		});
	  },
	  onError: (error) => {
		showToast.error({
		  title: "Error deleting comment",
		  description: error.message,
		});
	  },
	});

	return {
	  deleteComment,
	  isPending,
	  error,
	  reset,
	};
  };

  // Restore comment mutation
  const useRestoreComment = () => {
	const {
	  mutate: restoreComment,
	  isPending,
	  error,
	  reset,
	} = api.comment.restore.useMutation({
	  onSuccess: () => {
		showToast.success({
		  title: "Comment restored successfully",
		  description: "Your comment has been restored successfully",
		});
	  },
	  onError: (error) => {
		showToast.error({
		  title: "Error restoring comment",
		  description: error.message,
		});
	  },
	});

	return {
	  restoreComment,
	  isPending,
	  error,
	  reset,
	};
  };

  return {
	useCreateComment,
	useUpdateComment,
	useDeleteComment,
	useRestoreComment,
  };
};

import { api } from "@/trpc/react";
import { showToast } from "@/components/ui/toast";

export const useProjectCollaboratorMutations = () => {
    const utils = api.useUtils();

    // create Project Collaborator
    const useCreateProjectCollaborator = () => {
        const {
            mutate: createProjectCollaborator,
            isPending,
            error,
            reset,
        } = api.projectCollaborator.create.useMutation({
            onSuccess: () => {
                utils.projectCollaborator.read.invalidate();
                showToast.success({
                    title: "Project collaborator created successfully",
                    description: "Your project collaborator has been created successfully"
                });
            },
            onError: (error) => {
                showToast.error({
                    title: "Error creating project collaborator",
                    description: error.message,
                });
            },
        });

        return {
            createProjectCollaborator,
            isPending,
            error,
            reset,
        };
    };

    // update Project Collaborator
    const useUpdateProjectCollaborator = () => {
        const {
            mutate: updateProjectCollaborator,
            isPending,
            error,
            reset,
        } = api.projectCollaborator.update.useMutation({
            onSuccess: () => {
                utils.projectCollaborator.read.invalidate();
                showToast.success({
                    title: "Project Collaborator updated successfully",
                    description: "Your project collaborator has been updated successfully"
                });
            },
            onError: (error) => {
                showToast.error({
                    title: "Error updating project collaborator",
                    description: error.message,
                });
            },
        });

        return {
            updateProjectCollaborator,
            isPending,
            error,
            reset,
        };
    };

    // delete Project Collaborator
    const useDeleteProjectCollaborator = () => {
        const {
            mutate: deleteProjectCollaborator,
            isPending,
            error,
            reset,
        } = api.projectCollaborator.delete.useMutation({
            onSuccess: () => {
                utils.projectCollaborator.read.invalidate();
                showToast.success({
                    title: "Project Collaborator deleted successfully",
                    description: "Your project collaborator has been deleted successfully"
                });
            },
            onError: (error) => {
                showToast.error({
                    title: "Error deleting project collaborator",
                    description: error.message,
                });
            },
        });

        return {
            deleteProjectCollaborator,
            isPending,
            error,
            reset,
        };
    };

    // restore Project Collaborator
    const useRestoreProjectCollaborator = () => {
        const {
            mutate: restoreProjectCollaborator,
            isPending,
            error,
            reset,
        } = api.projectCollaborator.restore.useMutation({
            onSuccess: () => {
                utils.projectCollaborator.read.invalidate();
                showToast.success({
                    title: "Project collaborator restored successfully",
                    description: "Your project collaborator has been restored successfully"
                });
            },
            onError: (error) => {
                showToast.error({
                    title: "Error restoring project collaborator",
                    description: error.message,
                });
            },
        });

        return {
            restoreProjectCollaborator,
            isPending,
            error,
            reset,
        };
    };

    return {
        useCreateProjectCollaborator,
        useUpdateProjectCollaborator,
        useDeleteProjectCollaborator,
        useRestoreProjectCollaborator
    };
};

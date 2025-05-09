import { api } from "@/trpc/react";
import { showToast } from "@/components/ui/toast";

export const useProjectMutations = () => {
    const utils = api.useUtils();
    
    // create project
    const useCreateProject = () => {
        const {
            mutate: createProject,
            isPending,
            error,
            reset,
        } = api.project.create.useMutation({
            onSuccess: () => {
                utils.project.read.invalidate();
                showToast.success({
                    title: "Project created successfully",
                    description: "Your project has been created successfully"
                });
            },
            onError: (error) => {
                showToast.error({
                    title: "Error creating project",
                    description: error.message,
                });
            },
        });

        return {
            createProject,
            isPending,
            error,
            reset,
        };
    };

    // update project
    const useUpdateProject = () => {
        const {
            mutate: updateProject,
            isPending,
            error,
            reset,
        } = api.project.update.useMutation({
            onSuccess: () => {
                utils.project.read.invalidate();
                showToast.success({
                    title: "Project updated successfully",
                    description: "Your project has been updated successfully"
                });
            },
            onError: (error) => {
                showToast.error({
                    title: "Error updating project",
                    description: error.message,
                });
            },
        });

        return {
            updateProject,
            isPending,
            error,
            reset,
        };
    };

    //delete project
    const useDeleteProject = () => {
        const {
            mutate: deleteProject,
            isPending,
            error,
            reset,
        } = api.project.delete.useMutation({
            onSuccess: () => {
                utils.project.read.invalidate();
                showToast.success({
                    title: "Project deleted successfully",
                    description: "Your project has been deleted successfully"
                });
            },
            onError: (error) => {
                showToast.error({
                    title: "Error deleting project",
                    description: error.message,
                });
            },
        });

        return {
            deleteProject,
            isPending,
            error,
            reset,
        };
    };

    //restore project
    const useRestoreProject = () => {
        const {
            mutate: restoreProject,
            isPending,
            error,
            reset,
        } = api.project.restore.useMutation({
            onSuccess: () => {
                utils.project.read.invalidate();
                showToast.success({
                    title: "Project restored successfully",
                    description: "Your project has been restored successfully"
                });
            },
            onError: (error) => {
                showToast.error({
                    title: "Error restoring project",
                    description: error.message,
                });
            },
        });

        return {
            restoreProject,
            isPending,
            error,
            reset,
        };
    };

    return {
        useCreateProject,
        useUpdateProject,
        useDeleteProject,
        useRestoreProject,
    };
};

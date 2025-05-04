import { api } from "@/trpc/react";
import { showToast } from "@/components/ui/toast";

export const useUserSkillsMutations = () => {
  const utils = api.useUtils();

  // Create user skill
  const useCreateUserSkill = () => {
    const {
      mutate: createUserSkill,
      isPending,
      error,
      reset,
    } = api.userSkill.create.useMutation({
      onSuccess: () => {
        utils.userSkill.read.invalidate();
        showToast.success({
          title: "Skill added",
          description: "The skill has been successfully added.",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Failed to add skill",
          description: error.message,
        });
      },
    });

    return {
      createUserSkill,
      isPending,
      error,
      reset,
    };
  };

  // Update user skill
  const useUpdateUserSkill = () => {
    const {
      mutate: updateUserSkill,
      isPending,
      error,
      reset,
    } = api.userSkill.update.useMutation({
      onSuccess: () => {
        utils.userSkill.read.invalidate();
        showToast.success({
          title: "Skill updated",
          description: "The skill has been successfully updated.",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Failed to update skill",
          description: error.message,
        });
      },
    });

    return {
      updateUserSkill,
      isPending,
      error,
      reset,
    };
  };

  // Delete user skill
  const useDeleteUserSkill = () => {
    const {
      mutate: deleteUserSkill,
      isPending,
      error,
      reset,
    } = api.userSkill.delete.useMutation({
      onSuccess: () => {
        utils.userSkill.read.invalidate();
        showToast.success({
          title: "Skill deleted",
          description: "The skill has been deleted.",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Failed to delete skill",
          description: error.message,
        });
      },
    });

    return {
      deleteUserSkill,
      isPending,
      error,
      reset,
    };
  };

  // Restore user skill
  const useRestoreUserSkill = () => {
    const {
      mutate: restoreUserSkill,
      isPending,
      error,
      reset,
    } = api.userSkill.restore.useMutation({
      onSuccess: () => {
        utils.userSkill.read.invalidate();
        showToast.success({
          title: "Skill restored",
          description: "The skill has been restored.",
        });
      },
      onError: (error) => {
        showToast.error({
          title: "Failed to restore skill",
          description: error.message,
        });
      },
    });

    return {
      restoreUserSkill,
      isPending,
      error,
      reset,
    };
  };

  return {
    useCreateUserSkill,
    useUpdateUserSkill,
    useDeleteUserSkill,
    useRestoreUserSkill,
  };
};

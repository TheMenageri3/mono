import { api } from "@/trpc/react";
import type { z } from "zod";
import {
  createRoleSchema,
  updateRoleSchema,
  deleteRoleSchema,
  restoreRoleSchema,
} from "@/schemas/role";

type CreateRoleInput = z.infer<typeof createRoleSchema>;
type UpdateRoleInput = z.infer<typeof updateRoleSchema>;
type DeleteRoleInput = z.infer<typeof deleteRoleSchema>;
type RestoreRoleInput = z.infer<typeof restoreRoleSchema>;

export const useRoleMutations = () => {
  const useCreateRole = () => {
    const utils = api.useUtils();
    const {
      mutate: createRole,
      isPending,
      error,
      reset,
    } = api.role.create.useMutation({
      onSuccess: () => {
        utils.role.invalidate();
      },
    });
    return { createRole, isPending, error, reset };
  };

  const useUpdateRole = () => {
    const utils = api.useUtils();
    const {
      mutate: updateRole,
      isPending,
      error,
      reset,
    } = api.role.update.useMutation({
      onSuccess: () => {
        utils.role.invalidate();
      },
    });
    return { updateRole, isPending, error, reset };
  };

  const useDeleteRole = () => {
    const utils = api.useUtils();
    const {
      mutate: deleteRole,
      isPending,
      error,
      reset,
    } = api.role.delete.useMutation({
      onSuccess: () => {
        utils.role.invalidate();
      },
    });
    return { deleteRole, isPending, error, reset };
  };

  const useRestoreRole = () => {
    const utils = api.useUtils();
    const {
      mutate: restoreRole,
      isPending,
      error,
      reset,
    } = api.role.restore.useMutation({
      onSuccess: () => {
        utils.role.invalidate();
      },
    });
    return { restoreRole, isPending, error, reset };
  };

  return {
    useCreateRole,
    useUpdateRole,
    useDeleteRole,
    useRestoreRole,
  };
};
